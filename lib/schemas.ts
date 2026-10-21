import { z } from "zod";

const optionalUrl = z
  .string()
  .refine(
    (val) => !val || val.startsWith("/") || /^https?:\/\//i.test(val),
    { message: "Invalid URL or path" },
  )
  .optional();
const optionalText = z.string().optional();

export const customRomSchema = z.object({
  id: z.number(),
  name: z.string(),
  androidVersion: z.string(),
  gapps: z.boolean(),
  date: z.string(),
  developer: z.string(),
  coverPhoto: z.string(),
  changelog: z.array(z.string()).optional().default([]),
  screenshots: z.array(z.string()).optional().default([]),
  vendorBootUrl: optionalUrl,
  downloadUrl: z.string().url(),
  downloadGappsUrl: optionalUrl,
  downloadVanillaUrl: optionalUrl,
  supportGroup: optionalUrl,
  donateUrl: optionalUrl,
  flashingInstructionsUrl: optionalUrl,
  romNotes: z.array(z.string()).optional().default([]),
  knownIssues: z.array(z.string()).optional().default([]),
});

export const portedRomSchema = z.object({
  id: z.number(),
  name: z.string(),
  androidVersion: z.string(),
  gapps: z.boolean(),
  status: z.string().optional(),
  date: z.string(),
  developer: z.string(),
  originalDevice: optionalText,
  coverPhoto: z.string(),
  changelog: z.array(z.string()).optional().default([]),
  screenshots: z.array(z.string()).optional().default([]),
  downloadUrl: z.string().url(),
  downloadGappsUrl: optionalUrl,
  downloadVanillaUrl: optionalUrl,
  supportGroup: optionalUrl,
  flashingInstructionsUrl: optionalUrl,
  romNotes: z.array(z.string()).optional().default([]),
  knownIssues: z.array(z.string()).optional().default([]),
});

export const stockRomSchema = z.object({
  id: z.number(),
  name: z.string(),
  version: z.string(),
  androidVersion: z.string(),
  date: z.string(),
  downloadUrl: z.string().url(),
  size: z.string(),
  region: z.string(),
  hyperosVersion: z.string(),
  regionCode: z.string(),
  type: z.string().optional(),
  recoveryUrl: optionalUrl,
  recoverySize: optionalText,
  fastbootUrl: optionalUrl,
  fastbootSize: optionalText,
  miuiromRecoveryUrl: optionalUrl,
  miuiromFastbootUrl: optionalUrl,
});

export const moduleSchema = z.object({
  id: z.number(),
  name: z.string(),
  author: z.string(),
  usage: z.string(),
  downloadUrl: z.string().url(),
  sourceUrl: optionalUrl,
  type: z.string(),
});

export const debloatAppSchema = z.object({
  name: z.string(),
  package: z.string(),
  description: z.string(),
});

export const debloatCategorySchema = z.record(
  z.string(),
  z.array(debloatAppSchema),
);
