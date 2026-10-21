import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../out");

if (!fs.existsSync(outDir)) {
  console.error("Directory 'out' does not exist. Run 'next build' first.");
  process.exit(1);
}

// 1. Ensure .nojekyll exists
fs.writeFileSync(path.join(outDir, ".nojekyll"), "");
console.log("✓ Created out/.nojekyll");

// 2. Redirect map definition
const redirects = [
  // Old Templates folder links
  { source: "Templates/roms.html", target: "/roms/" },
  { source: "Templates/stock-roms.html", target: "/stock-roms/" },
  { source: "Templates/ported-roms.html", target: "/ported-roms/" },
  { source: "Templates/custom-modules.html", target: "/custom-modules/" },
  { source: "Templates/stock-modules.html", target: "/stock-modules/" },
  { source: "Templates/debloat.html", target: "/debloat/" },
  { source: "Templates/guide.html", target: "/guide/" },
  { source: "Templates/tutorials.html", target: "/tutorials/" },
  { source: "Templates/reviews.html", target: "/reviews/" },

  // Lowercase templates aliases
  { source: "templates/roms.html", target: "/roms/" },
  { source: "templates/stock-roms.html", target: "/stock-roms/" },
  { source: "templates/ported-roms.html", target: "/ported-roms/" },
  { source: "templates/custom-modules.html", target: "/custom-modules/" },
  { source: "templates/stock-modules.html", target: "/stock-modules/" },
  { source: "templates/debloat.html", target: "/debloat/" },
  { source: "templates/guide.html", target: "/guide/" },
  { source: "templates/tutorials.html", target: "/tutorials/" },
  { source: "templates/reviews.html", target: "/reviews/" },

  // Root level legacy .html links
  { source: "roms.html", target: "/roms/" },
  { source: "stock-roms.html", target: "/stock-roms/" },
  { source: "ported-roms.html", target: "/ported-roms/" },
  { source: "custom-modules.html", target: "/custom-modules/" },
  { source: "stock-modules.html", target: "/stock-modules/" },
  { source: "debloat.html", target: "/debloat/" },
  { source: "guide.html", target: "/guide/" },
  { source: "tutorials.html", target: "/tutorials/" },
  { source: "reviews.html", target: "/reviews/" },
];

function createRedirectHtml(target) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Redirecting to ${target}...</title>
  <meta name="robots" content="noindex, follow">
  <link rel="canonical" href="${target}">
  <meta http-equiv="refresh" content="0; url=${target}">
  <script>
    (function() {
      var pathname = window.location.pathname;
      var basePath = "";
      if (pathname.indexOf("/Redmi-Note-14-4G-Custom-ROMs") !== -1) {
        basePath = "/Redmi-Note-14-4G-Custom-ROMs";
      }
      var target = "${target}";
      var fullTarget = basePath + target;
      var search = window.location.search || "";
      var hash = window.location.hash || "";
      window.location.replace(fullTarget + search + hash);
    })();
  </script>
  <style>
    body {
      background: #151619;
      color: #f4f4f5;
      font-family: system-ui, -apple-system, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      text-align: center;
    }
    a {
      color: #fafafa;
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div>
    <p>Redirecting to <a id="redirect-link" href="${target}">${target}</a>...</p>
    <script>
      (function() {
        var pathname = window.location.pathname;
        var basePath = pathname.indexOf("/Redmi-Note-14-4G-Custom-ROMs") !== -1
          ? "/Redmi-Note-14-4G-Custom-ROMs"
          : "";
        var link = document.getElementById("redirect-link");
        if (link) {
          link.href = basePath + "${target}" + (window.location.search || "") + (window.location.hash || "");
        }
      })();
    </script>
  </div>
</body>
</html>`;
}

for (const item of redirects) {
  const destPath = path.join(outDir, item.source);
  const destDir = path.dirname(destPath);

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  fs.writeFileSync(destPath, createRedirectHtml(item.target));
  console.log(`✓ Generated redirect: /${item.source} -> ${item.target}`);
}

console.log("All redirect pages successfully generated into out/");
