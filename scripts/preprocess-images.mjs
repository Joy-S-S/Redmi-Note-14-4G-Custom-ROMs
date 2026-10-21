import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.resolve(__dirname, "../public/assets");
const metaOutputFile = path.resolve(__dirname, "../lib/image-metadata.json");

function getFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

async function preprocessImages() {
  console.log("Starting image preprocessing for public/assets...");
  const allFiles = getFilesRecursively(assetsDir);
  const imageFiles = allFiles.filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return ext === ".jpg" || ext === ".jpeg" || ext === ".png";
  });

  console.log(`Found ${imageFiles.length} raster image assets.`);

  const metadataMap = {};
  let totalOriginalBytes = 0;
  let totalWebpBytes = 0;
  let convertedCount = 0;

  for (const file of imageFiles) {
    const relPath = path.relative(path.resolve(__dirname, "../public"), file).replace(/\\/g, "/");
    const stat = fs.statSync(file);
    totalOriginalBytes += stat.size;

    const image = sharp(file);
    const meta = await image.metadata();

    metadataMap[relPath] = {
      width: meta.width || 0,
      height: meta.height || 0,
      format: meta.format || "unknown",
      size: stat.size,
      aspectRatio: meta.width && meta.height ? Number((meta.width / meta.height).toFixed(4)) : 1,
    };

    // Generate WebP variant
    const ext = path.extname(file);
    const webpPath = file.slice(0, -ext.length) + ".webp";

    try {
      await image
        .webp({ quality: 82, effort: 4 })
        .toFile(webpPath);

      const webpStat = fs.statSync(webpPath);
      totalWebpBytes += webpStat.size;
      convertedCount++;

      const webpRelPath = path.relative(path.resolve(__dirname, "../public"), webpPath).replace(/\\/g, "/");
      metadataMap[webpRelPath] = {
        width: meta.width || 0,
        height: meta.height || 0,
        format: "webp",
        size: webpStat.size,
        aspectRatio: metadataMap[relPath].aspectRatio,
      };
    } catch (err) {
      console.warn(`Could not convert ${relPath} to WebP:`, err.message);
    }
  }

  fs.writeFileSync(metaOutputFile, JSON.stringify(metadataMap, null, 2));
  console.log(`✓ Saved explicit dimensions manifest to ${path.relative(process.cwd(), metaOutputFile)}`);

  const savedBytes = totalOriginalBytes - totalWebpBytes;
  const savedPercent = totalOriginalBytes > 0 ? ((savedBytes / totalOriginalBytes) * 100).toFixed(1) : 0;

  console.log("-----------------------------------------");
  console.log(`Processed: ${imageFiles.length} original images`);
  console.log(`Generated: ${convertedCount} WebP variants`);
  console.log(`Original size: ${(totalOriginalBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`WebP size: ${(totalWebpBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Reduction: ${(savedBytes / 1024 / 1024).toFixed(2)} MB (${savedPercent}%)`);
  console.log("Image preprocessing completed successfully!");
}

preprocessImages().catch((err) => {
  console.error("Image preprocessing failed:", err);
  process.exit(1);
});
