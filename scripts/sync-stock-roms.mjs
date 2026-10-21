import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputFile = path.resolve(__dirname, "../data/stock-roms.json");
const cacheFile = path.resolve(__dirname, "../data/stock-cdn-cache.json");

const MIUIROM_URL = "https://miuirom.org/phones/redmi-note-14-4g";

const regionMap = {
  Global: { name: "Global", code: "GL" },
  EEA: { name: "Europe", code: "EU" },
  Europe: { name: "Europe", code: "EU" },
  Indonesia: { name: "Indonesia", code: "ID" },
  Russia: { name: "Russia", code: "RU" },
  Taiwan: { name: "Taiwan", code: "TW" },
  Turkey: { name: "Turkey", code: "TR" },
};

function normalizeDate(raw) {
  if (!raw) return "2025-01-01";
  const cleaned = raw.trim();
  const parts = cleaned.split("-");
  if (parts.length === 3) {
    const y = parts[0];
    const m = parts[1].padStart(2, "0");
    const d = parts[2].padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  return cleaned;
}

// Helper to resolve direct Xiaomi CDN link from miuirom /load page
async function resolveDirectCdn(miuiromLoadUrl, cache) {
  if (!miuiromLoadUrl) return null;
  if (cache[miuiromLoadUrl] && cache[miuiromLoadUrl].includes(".tgz")) {
    return cache[miuiromLoadUrl];
  }

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(miuiromLoadUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Referer: "https://miuirom.org/phones/redmi-note-14-4g",
        },
      });

      if (res.status === 200) {
        const html = await res.text();
        const matches = [...html.matchAll(/data-href=['"]([^'"]+)['"]/g)]
          .map((m) => {
            try {
              return Buffer.from(m[1], "base64").toString("utf8");
            } catch {
              return null;
            }
          })
          .filter((u) => u && u.endsWith(".tgz"));

        if (matches.length > 0) {
          const preferred =
            matches.find((u) => u.includes("bn.d.miui.com")) ||
            matches.find((u) => u.includes("bigota.d.miui.com")) ||
            matches[0];
          cache[miuiromLoadUrl] = preferred;
          return preferred;
        }
      }
    } catch {}
    await new Promise((r) => setTimeout(r, 400));
  }

  return null;
}

export async function fetchAndSyncStockRoms() {
  console.log(`[stock-sync] Fetching Fastboot stock ROMs from: ${MIUIROM_URL}`);

  let html;
  try {
    const res = await fetch(MIUIROM_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }
    html = await res.text();
    console.log(`[stock-sync] Fetched ${html.length} bytes successfully.`);
  } catch (err) {
    console.error(`[stock-sync] Fetch failed: ${err.message}`);
    if (fs.existsSync(outputFile)) {
      console.log(`[stock-sync] Keeping existing ${outputFile}`);
      return JSON.parse(fs.readFileSync(outputFile, "utf8"));
    }
    throw err;
  }

  let cdnCache = {};
  if (fs.existsSync(cacheFile)) {
    try {
      cdnCache = JSON.parse(fs.readFileSync(cacheFile, "utf8"));
    } catch {}
  }

  const h2Regex = /<h2[^>]*id=['"]([^'"]+)['"][^>]*>([\s\S]*?)<\/h2>/g;
  let match;
  const sections = [];
  while ((match = h2Regex.exec(html)) !== null) {
    sections.push({
      id: match[1],
      title: match[2].trim(),
      startIndex: match.index,
    });
  }

  // Fastboot releases only, keyed by `${regionCode}:${version}`
  const fastbootMap = new Map();

  for (let i = 0; i < sections.length; i++) {
    const sec = sections[i];
    const endIndex =
      i + 1 < sections.length ? sections[i + 1].startIndex : html.length;
    const secHtml = html.slice(sec.startIndex, endIndex);

    const regionInfo = regionMap[sec.id] || {
      name: sec.id,
      code: sec.id.slice(0, 2).toUpperCase(),
    };

    // 1. Featured latest dl.roms (Fastboot only)
    const dlRegex =
      /<h3[^>]*>([\s\S]*?)<\/h3>\s*<dl class=['"]roms['"]>([\s\S]*?)<\/dl>/g;
    let dlMatch;
    while ((dlMatch = dlRegex.exec(secHtml)) !== null) {
      const rawType = dlMatch[1].replace(/<[^>]+>/g, "").trim();
      if (!rawType.includes("Fastboot")) continue;

      const dlContent = dlMatch[2];

      const getField = (label) => {
        const m = dlContent.match(
          new RegExp(`<dt>${label}<\\/dt>\\s*<dd>([\\s\\S]*?)<\\/dd>`, "i"),
        );
        return m ? m[1].replace(/<[^>]+>/g, "").trim() : "";
      };
      const getLink = () => {
        const m = dlContent.match(/data-href=['"]([^'"]+)['"]/);
        if (m) {
          try {
            return Buffer.from(m[1], "base64").toString("utf8");
          } catch (e) {}
        }
        return "";
      };

      const version = getField("Version");
      const os = getField("OS");
      const android = getField("Android").replace(/Android\s*/i, "");
      const date = normalizeDate(getField("Release date"));
      const size = getField("Flash file size") || getField("File size") || "N/A";
      const link = getLink();

      if (version && link) {
        let hyperosVer = "1";
        if (version.startsWith("3.") || os.includes("3")) hyperosVer = "3";
        else if (version.startsWith("2.") || os.includes("2")) hyperosVer = "2";
        else if (version.startsWith("1.") || os.includes("1")) hyperosVer = "1";

        const relKey = `${regionInfo.code}:${version}`;
        if (!fastbootMap.has(relKey)) {
          fastbootMap.set(relKey, {
            name: `HyperOS ${hyperosVer}.0`,
            version,
            androidVersion:
              android ||
              (hyperosVer === "3" ? "16" : hyperosVer === "2" ? "15" : "14"),
            date,
            size,
            miuiromUrl: link,
            region: regionInfo.name,
            hyperosVersion: hyperosVer,
            regionCode: regionInfo.code,
          });
        }
      }
    }

    // 2. Archive / previous entries in spoiler bodies (Fastboot only)
    const prevBlockRegex =
      /<div>\s*<span class=['"]version['"]>([^<]+)<\/span>([\s\S]*?)<\/div>/g;
    let pbMatch;
    while ((pbMatch = prevBlockRegex.exec(secHtml)) !== null) {
      const verText = pbMatch[1].trim();
      const inner = pbMatch[2];

      const cleanVer = verText
        .replace(/^HyperOS\s*/i, "")
        .replace(/^MIUI\s*/i, "")
        .trim();

      let hyperosVer = "1";
      if (cleanVer.startsWith("3.") || verText.includes("HyperOS 3"))
        hyperosVer = "3";
      else if (cleanVer.startsWith("2.") || verText.includes("HyperOS 2"))
        hyperosVer = "2";
      else if (cleanVer.startsWith("1.") || verText.includes("HyperOS 1"))
        hyperosVer = "1";

      const linkRegex =
        /<span class=["']pseudo-link[^"']*["']\s*data-href=["']([^"']+)["'][^>]*>([^<]+)<\/span>\s*(?:\(([^)]+)\))?\s*(?:<br\s*\/?>)?\s*([0-9]{4}-[0-9]{1,2}-[0-9]{1,2})?/g;
      let lMatch;
      while ((lMatch = linkRegex.exec(inner)) !== null) {
        const b64 = lMatch[1];
        const linkLabel = lMatch[2].trim();
        const size = lMatch[3] ? lMatch[3].trim() : "";
        const date = normalizeDate(lMatch[4]);

        if (!linkLabel.includes("Fastboot")) continue;

        let link = "";
        try {
          link = Buffer.from(b64, "base64").toString("utf8");
        } catch (e) {}

        if (cleanVer && link) {
          const relKey = `${regionInfo.code}:${cleanVer}`;
          if (!fastbootMap.has(relKey)) {
            fastbootMap.set(relKey, {
              name: `HyperOS ${hyperosVer}.0`,
              version: cleanVer,
              androidVersion:
                hyperosVer === "3" ? "16" : hyperosVer === "2" ? "15" : "14",
              date: date || "2025-01-01",
              size: size || "N/A",
              miuiromUrl: link,
              region: regionInfo.name,
              hyperosVersion: hyperosVer,
              regionCode: regionInfo.code,
            });
          }
        }
      }
    }
  }

  const fastbootList = Array.from(fastbootMap.values());
  console.log(`[stock-sync] Found ${fastbootList.length} Fastboot releases across all regions.`);

  // Resolve any uncached Fastboot direct CDN links
  const urlsToResolve = fastbootList
    .map((r) => r.miuiromUrl)
    .filter((u) => u && (!cdnCache[u] || !cdnCache[u].includes(".tgz")));

  if (urlsToResolve.length > 0) {
    console.log(`[stock-sync] Resolving ${urlsToResolve.length} Fastboot CDN URLs...`);
    const batchSize = 6;
    for (let i = 0; i < urlsToResolve.length; i += batchSize) {
      const chunk = urlsToResolve.slice(i, i + batchSize);
      await Promise.all(chunk.map((u) => resolveDirectCdn(u, cdnCache)));
      await new Promise((r) => setTimeout(r, 100));
    }
    fs.writeFileSync(cacheFile, JSON.stringify(cdnCache, null, 2), "utf8");
  }

  // Sort by date newest first
  fastbootList.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Build clean final objects with direct Xiaomi CDN links
  const finalData = fastbootList.map((rel, idx) => {
    const directCdn =
      cdnCache[rel.miuiromUrl] ||
      rel.miuiromUrl ||
      "https://miuirom.org/phones/redmi-note-14-4g";

    return {
      id: idx + 1,
      name: rel.name,
      version: rel.version,
      androidVersion: rel.androidVersion,
      date: rel.date,
      downloadUrl: directCdn,
      size: rel.size,
      region: rel.region,
      hyperosVersion: rel.hyperosVersion,
      regionCode: rel.regionCode,
    };
  });

  fs.writeFileSync(outputFile, JSON.stringify(finalData, null, 4), "utf8");
  console.log(`[stock-sync] Wrote ${finalData.length} Fastboot releases to ${outputFile}`);

  return finalData;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  fetchAndSyncStockRoms().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
