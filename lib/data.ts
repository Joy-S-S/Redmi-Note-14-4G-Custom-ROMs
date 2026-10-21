import customRomJson from "@/data/roms-data.json";
import portedRomJson from "@/data/ported-roms.json";
import stockRomJson from "@/data/stock-roms.json";
import customModuleJson from "@/data/custom-modules.json";
import stockModuleJson from "@/data/stock-modules.json";
import debloatJson from "@/data/debloat-data.json";
import {
  customRomSchema,
  debloatCategorySchema,
  moduleSchema,
  portedRomSchema,
  stockRomSchema,
} from "@/lib/schemas";
import { siteAsset } from "@/lib/site";

export type CustomRom = ReturnType<typeof normalizeRom>;
export type PortedRom = ReturnType<typeof normalizeRom>;
export type StockRom = ReturnType<typeof normalizeStockRom>;
export type Module = ReturnType<typeof normalizeModule>;
export type DebloatApp = { name: string; package: string; description: string };

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function timestamp(value: string) {
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? 0 : time;
}

function toWebp(assetPath: string) {
  return assetPath.replace(/\.(jpg|jpeg|png)$/i, ".webp");
}

function normalizeRom(
  rom:
    | ReturnType<typeof customRomSchema.parse>
    | ReturnType<typeof portedRomSchema.parse>,
) {
  return {
    ...rom,
    slug: `${slugify(rom.name)}-${rom.id}`,
    coverUrl: siteAsset(toWebp(rom.coverPhoto)),
    originalCoverUrl: siteAsset(rom.coverPhoto),
    screenshotUrls: rom.screenshots.map((screenshot) =>
      siteAsset(toWebp(screenshot)),
    ),
    originalScreenshotUrls: rom.screenshots.map((screenshot) =>
      siteAsset(screenshot),
    ),
    changelog: rom.changelog ?? [],
    screenshots: rom.screenshots ?? [],
    romNotes: rom.romNotes ?? [],
    knownIssues: rom.knownIssues ?? [],
    flashingInstructionsUrl: rom.flashingInstructionsUrl || undefined,
    timestamp: timestamp(rom.date),
  };
}

function normalizeStockRom(rom: ReturnType<typeof stockRomSchema.parse>) {
  return {
    ...rom,
    timestamp: timestamp(rom.date),
  };
}

function normalizeModule(module: ReturnType<typeof moduleSchema.parse>) {
  return {
    ...module,
    slug: `${slugify(module.name)}-${module.id}`,
  };
}

export const customRoms = customRomSchema
  .array()
  .parse(customRomJson)
  .map(normalizeRom)
  .sort((a, b) => b.timestamp - a.timestamp);

export const portedRoms = portedRomSchema
  .array()
  .parse(portedRomJson)
  .map(normalizeRom)
  .sort((a, b) => b.timestamp - a.timestamp);

export const stockRoms = stockRomSchema
  .array()
  .parse(stockRomJson)
  .map(normalizeStockRom)
  .sort((a, b) => b.timestamp - a.timestamp);

export const customModules = moduleSchema
  .array()
  .parse(customModuleJson)
  .map(normalizeModule);

export const stockModules = moduleSchema
  .array()
  .parse(stockModuleJson)
  .map(normalizeModule);

export const debloatData = debloatCategorySchema.parse(debloatJson);

export const debloatCategoryMeta: Record<
  string,
  { label: string; description: string }
> = {
  google: {
    label: "Google apps",
    description: "Services and apps that can usually be replaced.",
  },
  xiaomi: {
    label: "Xiaomi services",
    description: "MIUI and HyperOS background services.",
  },
  amazon: {
    label: "Amazon",
    description: "Pre-installed Amazon components.",
  },
  netflix: {
    label: "Netflix",
    description: "Partner activation packages.",
  },
  opera: {
    label: "Opera",
    description: "Pre-installed browser and news components.",
  },
  facebook: {
    label: "Facebook",
    description: "Pre-installed Meta services.",
  },
  critical: {
    label: "Do not remove",
    description: "Removing these packages can break core device functions.",
  },
};

export const debloatCategories = Object.entries(debloatData)
  .filter(([key, apps]) => key !== "critical" && apps.length > 0)
  .map(([key, apps]) => ({
    id: key,
    label: debloatCategoryMeta[key]?.label ?? key,
    description: debloatCategoryMeta[key]?.description ?? "",
    apps,
  }));

export const criticalApps = debloatData.critical ?? [];

export const counts = {
  customRoms: customRoms.length,
  portedRoms: portedRoms.length,
  stockRoms: stockRoms.length,
  customModules: customModules.length,
  stockModules: stockModules.length,
  modules: customModules.length + stockModules.length,
  roms: customRoms.length + portedRoms.length + stockRoms.length,
};

export const latestCustomRoms = customRoms.slice(0, 3);

export const allRomsByDate = [...customRoms, ...portedRoms].sort(
  (a, b) => b.timestamp - a.timestamp,
);

export const featuredRom = allRomsByDate[0] ?? customRoms[0];

export const featuredScreenshots = featuredRom?.screenshotUrls.slice(0, 3) ?? [];

export const androidVersions = Array.from(
  new Set(customRoms.map((rom) => rom.androidVersion)),
).sort((a, b) => Number(b) - Number(a));

export const portedAndroidVersions = Array.from(
  new Set(portedRoms.map((rom) => rom.androidVersion)),
).sort((a, b) => Number(b) - Number(a));

export const stockAndroidVersions = Array.from(
  new Set(stockRoms.map((rom) => rom.androidVersion)),
).sort((a, b) => Number(b) - Number(a));

export const hyperosVersions = Array.from(
  new Set(stockRoms.map((rom) => rom.hyperosVersion)),
).sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));

export const regions = Array.from(
  new Set(stockRoms.map((rom) => rom.region)),
).sort();
