import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const backupDir = path.resolve("backups");
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

const now = new Date();
const pad = (n) => String(n).padStart(2, "0");
const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;

const customArg = process.argv[2];
let zipName;
if (customArg) {
  zipName = customArg.endsWith(".zip") ? customArg : `${customArg}.zip`;
} else {
  zipName = `backup-${timestamp}-mobile-overflow-fixed.zip`;
}
const zipPath = path.join(backupDir, zipName);

const candidatePaths = [
  "app",
  "components",
  "data",
  "lib",
  "public",
  "scripts",
  "legacy-static",
  "package.json",
  "package-lock.json",
  "tsconfig.json",
  "next.config.ts",
  "eslint.config.mjs",
  "postcss.config.mjs",
  "components.json",
  ".gitignore",
  "AGENTS.md",
  "README.md",
];

const pathsToZip = candidatePaths.filter((p) => fs.existsSync(path.resolve(p)));

console.log(`Creating archive: ${zipName}...`);
const command = `powershell -NoProfile -Command "Compress-Archive -Path ${pathsToZip.join(",")} -DestinationPath '${zipPath.replace(/'/g, "''")}' -Force"`;
execSync(command, { stdio: "inherit" });

if (fs.existsSync(zipPath)) {
  const stat = fs.statSync(zipPath);
  console.log(`Success! Archive created at ${zipPath} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
} else {
  console.error("Archive creation failed");
  process.exit(1);
}
