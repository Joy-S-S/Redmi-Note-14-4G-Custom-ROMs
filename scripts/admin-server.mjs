import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { exec } from "node:child_process";
import sharp from "sharp";
import {
  fetchChannelPosts,
  fetchSingleTelegramPost,
  fetchScreenshotsFromGallery,
  resolveChangelogBullets,
  downloadImageFile,
} from "./lib/telegram-deep-scraper.mjs";
import { parseTelegramPost } from "./lib/rom-post-parser.mjs";
import { fetchAndSyncStockRoms } from "./sync-stock-roms.mjs";

const PORT = 3001;
const ROOT_DIR = process.cwd();
const DATA_DIR = path.join(ROOT_DIR, "data");
const ASSETS_DIR = path.join(ROOT_DIR, "public", "assets");
const ROMS_FILE = path.join(DATA_DIR, "roms-data.json");
const PORTED_ROMS_FILE = path.join(DATA_DIR, "ported-roms.json");
const STOCK_ROMS_FILE = path.join(DATA_DIR, "stock-roms.json");
const IMPORTED_IDS_FILE = path.join(DATA_DIR, "imported-telegram-ids.json");

// Helper to read JSON
function readJson(filePath, fallback = []) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err.message);
  }
  return fallback;
}

// Helper to write JSON
function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 4), "utf8");
}

// Clean slug for filesystem
function slugify(text) {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// HTML Dashboard Template
function renderDashboardHtml() {
  const htmlPath = path.join(ROOT_DIR, "scripts", "admin-dashboard.html");
  return fs.readFileSync(htmlPath, "utf8");
}

// HTTP Server
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Dashboard page
  if (url.pathname === "/" || url.pathname === "/admin") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(renderDashboardHtml());
    return;
  }

  // API: Get Stats
  if (url.pathname === "/api/stats") {
    const customRoms = readJson(ROMS_FILE);
    const portedRoms = readJson(PORTED_ROMS_FILE);
    const stockRoms = readJson(STOCK_ROMS_FILE);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        customCount: customRoms.length,
        portedCount: portedRoms.length,
        stockCount: stockRoms.length,
      })
    );
    return;
  }

  // API: Sync Stock ROMs from miuirom.org
  if (url.pathname === "/api/sync-stock-roms") {
    try {
      console.log("Triggering live sync of stock ROMs from miuirom.org...");
      const result = await fetchAndSyncStockRoms();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true, count: result.length }));
    } catch (err) {
      console.error("Error in /api/sync-stock-roms:", err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false, error: err.message }));
    }
    return;
  }

  // API: Fetch Channel Updates
  if (url.pathname === "/api/fetch-channel") {
    try {
      const pages = Number(url.searchParams.get("pages")) || 5;
      const before = url.searchParams.get("before") || "";
      console.log(`Fetching channel posts from @TanzaniteUpdate (pages: ${pages}, before: ${before || "latest"})...`);
      const rawPosts = await fetchChannelPosts("TanzaniteUpdate", pages, before);
      const importedIds = new Set(readJson(IMPORTED_IDS_FILE));
      const queue = [];

      for (const p of rawPosts) {
        if (importedIds.has(p.postId)) continue;
        const parsed = parseTelegramPost(p);
        queue.push(parsed);
      }

      // Newest posts first at the top of the queue (descending by post ID)
      queue.sort((a, b) => {
        const numA = parseInt((a.postId || "").split("/")[1] || "0", 10);
        const numB = parseInt((b.postId || "").split("/")[1] || "0", 10);
        return numB - numA;
      });

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ queue }));
    } catch (err) {
      console.error("Error in /api/fetch-channel:", err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message, queue: [] }));
    }
    return;
  }

  // API: Fetch Screenshots on Demand
  if (url.pathname === "/api/fetch-screenshots") {
    try {
      const targetUrl = url.searchParams.get("url");
      if (!targetUrl) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ screenshots: [] }));
        return;
      }
      console.log(`Fetching gallery screenshots for: ${targetUrl}`);
      const screenshots = await fetchScreenshotsFromGallery(targetUrl);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ screenshots }));
    } catch {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ screenshots: [] }));
    }
    return;
  }

  // API: Fetch Changelog Bullets on Demand
  if (url.pathname === "/api/fetch-changelog") {
    try {
      const sourceUrl = url.searchParams.get("source") || "";
      const deviceUrl = url.searchParams.get("device") || "";
      console.log(`Resolving changelog for source: ${sourceUrl}, device: ${deviceUrl}`);
      const bullets = await resolveChangelogBullets(sourceUrl, deviceUrl);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ bullets }));
    } catch {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ bullets: [] }));
    }
    return;
  }

  // API: Fetch Single Post
  if (url.pathname === "/api/fetch-single" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      try {
        const { url: postUrl } = JSON.parse(body);
        console.log(`Fetching single post for: ${postUrl}`);
        const post = await fetchSingleTelegramPost(postUrl);
        if (!post) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Post not found" }));
          return;
        }

        const parsed = parseTelegramPost(post);
        if (parsed.deviceChangelogUrl || parsed.sourceChangelogUrl) {
          const bullets = await resolveChangelogBullets(parsed.sourceChangelogUrl, parsed.deviceChangelogUrl);
          if (bullets && bullets.length > 0) {
            parsed.changelog = bullets;
          }
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ item: parsed }));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // API: Approve and Commit to Database
  if (url.pathname === "/api/approve" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      try {
        const payload = JSON.parse(body);
        const isPort = payload.category === "ported-rom";
        const targetFile = isPort ? PORTED_ROMS_FILE : ROMS_FILE;
        const currentData = readJson(targetFile);

        // Find next sequential ID
        let maxId = 0;
        for (const item of currentData) {
          if (typeof item.id === "number" && item.id > maxId) {
            maxId = item.id;
          }
        }
        const nextId = isPort ? Math.max(101, maxId + 1) : maxId + 1;

        // Folder name for assets: public/assets/Roms/<folderName>
        const cleanSlug = slugify(payload.name);
        const folderName = `${cleanSlug}-${nextId}`;
        const assetTargetDir = path.join(ASSETS_DIR, "Roms", folderName);

        if (!fs.existsSync(assetTargetDir)) {
          fs.mkdirSync(assetTargetDir, { recursive: true });
        }

        const metaOutputFile = path.join(ROOT_DIR, "lib", "image-metadata.json");
        const metadataMap = readJson(metaOutputFile, {});

        async function recordImageMeta(filePath, format) {
          try {
            if (fs.existsSync(filePath)) {
              const meta = await sharp(filePath).metadata();
              const relPath = path.relative(path.join(ROOT_DIR, "public"), filePath).replace(/\\/g, "/");
              metadataMap[relPath] = {
                width: meta.width || 0,
                height: meta.height || 0,
                format: format || meta.format || "unknown",
                size: fs.statSync(filePath).size,
                aspectRatio: meta.width && meta.height ? Number((meta.width / meta.height).toFixed(4)) : 1,
              };
            }
          } catch {}
        }

        const tasks = [];

        // 1. Parallel Cover Download & WebP generation
        let coverRelPath = `Roms/${folderName}/cover.webp`;
        if (payload.coverPhotoUrl) {
          tasks.push(
            (async () => {
              const coverJpgPath = path.join(assetTargetDir, "cover.jpg");
              const coverWebpPath = path.join(assetTargetDir, "cover.webp");
              console.log(`Downloading cover photo to ${coverJpgPath}...`);
              const ok = await downloadImageFile(payload.coverPhotoUrl, coverJpgPath);
              if (ok) {
                await recordImageMeta(coverJpgPath, "jpeg");
                try {
                  await sharp(coverJpgPath).webp({ quality: 82 }).toFile(coverWebpPath);
                  await recordImageMeta(coverWebpPath, "webp");
                  coverRelPath = `Roms/${folderName}/cover.webp`;
                } catch (sharpErr) {
                  console.warn("Could not generate cover.webp:", sharpErr.message);
                  coverRelPath = `Roms/${folderName}/cover.jpg`;
                }
              }
            })()
          );
        }

        // 2. Parallel Screenshots Download & WebP generation
        const selectedUrls = payload.selectedScreenshots || [];
        const screenshotResults = new Array(selectedUrls.length);

        selectedUrls.forEach((sUrl, i) => {
          tasks.push(
            (async () => {
              const ssJpgPath = path.join(assetTargetDir, `${i + 1}.jpg`);
              const ssWebpPath = path.join(assetTargetDir, `${i + 1}.webp`);
              console.log(`Downloading screenshot ${i + 1} to ${ssJpgPath}...`);
              const ok = await downloadImageFile(sUrl, ssJpgPath);
              if (ok) {
                await recordImageMeta(ssJpgPath, "jpeg");
                try {
                  await sharp(ssJpgPath).webp({ quality: 82 }).toFile(ssWebpPath);
                  await recordImageMeta(ssWebpPath, "webp");
                  screenshotResults[i] = `Roms/${folderName}/${i + 1}.webp`;
                } catch {
                  screenshotResults[i] = `Roms/${folderName}/${i + 1}.jpg`;
                }
              }
            })()
          );
        });

        // Await all parallel image downloads and conversions
        await Promise.all(tasks);
        const screenshotRelPaths = screenshotResults.filter(Boolean);

        // Save updated metadata map
        writeJson(metaOutputFile, metadataMap);

        // 3. Assemble JSON Entry
        const newEntry = {
          id: nextId,
          name: payload.name,
          androidVersion: payload.androidVersion,
          gapps: Boolean(payload.gapps),
          date: payload.date,
          developer: payload.developer,
          coverPhoto: coverRelPath,
          changelog: payload.changelog && payload.changelog.length ? payload.changelog : ["Initial build"],
          screenshots: screenshotRelPaths,
          vendorBootUrl: payload.vendorBootUrl || undefined,
          downloadUrl: payload.downloadUrl,
          downloadGappsUrl: payload.downloadGappsUrl || undefined,
          downloadVanillaUrl: payload.downloadVanillaUrl || undefined,
          supportGroup: payload.supportGroup || undefined,
          donateUrl: payload.donateUrl || undefined,
          flashingInstructionsUrl: payload.flashingInstructionsUrl || undefined,
          romNotes: payload.romNotes && payload.romNotes.length ? payload.romNotes : ["Read flashing instructions"],
          knownIssues: payload.knownIssues && payload.knownIssues.length ? payload.knownIssues : ["None reported"],
        };

        if (isPort) {
          newEntry.status = "stable";
          newEntry.originalDevice = "HyperOS Port Base";
        }

        // 4. Save to JSON file
        currentData.unshift(newEntry); // Add to top of list
        writeJson(targetFile, currentData);

        // 5. Update imported IDs list
        const importedIds = new Set(readJson(IMPORTED_IDS_FILE));
        if (payload.postId) {
          importedIds.add(payload.postId);
          writeJson(IMPORTED_IDS_FILE, Array.from(importedIds));
        }

        console.log(`✓ Added ${payload.name} (ID: ${nextId}) to ${path.basename(targetFile)}!`);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, id: nextId, folderName }));
      } catch (err) {
        console.error("Error approving item:", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // API: Skip Item
  if (url.pathname === "/api/skip" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const { postId } = JSON.parse(body);
        if (postId) {
          const importedIds = new Set(readJson(IMPORTED_IDS_FILE));
          importedIds.add(postId);
          writeJson(IMPORTED_IDS_FILE, Array.from(importedIds));
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end("Not Found");
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Tanzanite ROM Studio running at:`);
  console.log(`   http://localhost:${PORT}`);
  console.log(`======================================================\n`);

  // Auto open browser on Windows
  try {
    exec(`start http://localhost:${PORT}`);
  } catch {}
});
