import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/roms/", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/stock-roms/", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/ported-roms/", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/custom-modules/", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/stock-modules/", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/guide/", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/debloat/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/tutorials/", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/reviews/", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  const now = new Date();

  return routes.map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
