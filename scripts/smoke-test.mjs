import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../out");

console.log("Running smoke tests on exported static build in 'out/'...");

let errors = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    errors++;
  } else {
    console.log(`✓ PASS: ${message}`);
  }
}

// 1. Check critical static files
const criticalFiles = [
  "index.html",
  "roms/index.html",
  "stock-roms/index.html",
  "ported-roms/index.html",
  "custom-modules/index.html",
  "stock-modules/index.html",
  "guide/index.html",
  "debloat/index.html",
  "tutorials/index.html",
  "reviews/index.html",
  "robots.txt",
  "sitemap.xml",
  ".nojekyll",
];

for (const file of criticalFiles) {
  const filePath = path.join(outDir, file);
  assert(fs.existsSync(filePath), `Exported file exists: ${file}`);
}

// 2. Check 404 page
const notFoundPath = path.join(outDir, "_not-found/index.html");
const root404Path = path.join(outDir, "404.html");
assert(
  fs.existsSync(notFoundPath) || fs.existsSync(root404Path),
  "Custom 404 page exists in out",
);

// 3. Check legacy redirects
const requiredRedirects = [
  "Templates/roms.html",
  "Templates/stock-roms.html",
  "Templates/ported-roms.html",
  "Templates/custom-modules.html",
  "Templates/stock-modules.html",
  "Templates/debloat.html",
  "Templates/guide.html",
  "Templates/tutorials.html",
  "Templates/reviews.html",
  "roms.html",
  "stock-roms.html",
  "custom-modules.html",
];

for (const file of requiredRedirects) {
  const filePath = path.join(outDir, file);
  assert(fs.existsSync(filePath), `Redirect stub exists: ${file}`);
  if (fs.existsSync(filePath)) {
    const html = fs.readFileSync(filePath, "utf8");
    assert(
      html.includes("meta http-equiv=\"refresh\"") &&
        html.includes("window.location.replace") &&
        html.includes("search") &&
        html.includes("hash"),
      `Redirect ${file} preserves query parameters and hash anchors`,
    );
  }
}

// 4. Content assertions on rendered pages
const homeHtml = fs.readFileSync(path.join(outDir, "index.html"), "utf8");
assert(
  homeHtml.includes("Tanzanite") &&
    homeHtml.includes("Redmi Note 14 4G") &&
    homeHtml.includes("Custom ROMs"),
  "Home page contains device identity and primary pillars",
);

const customRomsHtml = fs.readFileSync(
  path.join(outDir, "roms/index.html"),
  "utf8",
);
assert(
  customRomsHtml.includes("Custom ROMs") &&
    customRomsHtml.includes("AxionOS"),
  "Custom ROMs page renders custom builds",
);

const stockRomsHtml = fs.readFileSync(
  path.join(outDir, "stock-roms/index.html"),
  "utf8",
);
assert(
  stockRomsHtml.includes("Stock ROMs") &&
    stockRomsHtml.includes("2.0.206.0.VOGMIXM"),
  "Stock ROMs page renders official firmware versions",
);

const guideHtml = fs.readFileSync(
  path.join(outDir, "guide/index.html"),
  "utf8",
);
assert(
  guideHtml.includes("vendor_boot.img") &&
    guideHtml.includes("fastboot reboot") &&
    guideHtml.includes("CRITICAL SAFETY INSTRUCTION"),
  "Flashing guide contains vendor_boot safety warnings and instructions",
);

const debloatHtml = fs.readFileSync(
  path.join(outDir, "debloat/index.html"),
  "utf8",
);
assert(
  debloatHtml.includes("Critical System Apps") &&
    debloatHtml.includes("adb shell pm uninstall --user 0"),
  "Debloat page contains critical apps safeguard and uninstall commands",
);

// 5. Check sitemap
const sitemapXml = fs.readFileSync(path.join(outDir, "sitemap.xml"), "utf8");
assert(
  sitemapXml.includes("/roms/") &&
    sitemapXml.includes("/guide/") &&
    sitemapXml.includes("/stock-roms/"),
  "Sitemap includes key routes",
);

// 6. Check image metadata & asset optimization
const imageMetaPath = path.resolve(__dirname, "../lib/image-metadata.json");
assert(
  fs.existsSync(imageMetaPath),
  "Image metadata manifest (lib/image-metadata.json) exists",
);
if (fs.existsSync(imageMetaPath)) {
  const meta = JSON.parse(fs.readFileSync(imageMetaPath, "utf8"));
  const entriesCount = Object.keys(meta).length;
  assert(
    entriesCount >= 192,
    `Image metadata manifest contains ${entriesCount} entries (>= 192)`,
  );
}

console.log("-----------------------------------------");
if (errors === 0) {
  console.log("🎉 ALL SMOKE TESTS PASSED CLEANLY!");
  process.exit(0);
} else {
  console.error(`💥 Smoke tests failed with ${errors} error(s).`);
  process.exit(1);
}
