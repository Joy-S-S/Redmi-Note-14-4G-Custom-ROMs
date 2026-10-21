import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Video } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { RomBrowser } from "@/components/site/rom-browser";
import { customRoms } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Custom ROMs",
  description:
    "Browse and download verified custom ROMs for Redmi Note 14 4G (tanzanite). Filter by Android version and GApps availability.",
  alternates: {
    canonical: absoluteUrl("/roms/"),
  },
  openGraph: {
    title: "Custom ROMs | Tanzanite",
    description:
      "Browse and download verified custom ROMs for Redmi Note 14 4G (tanzanite).",
    url: absoluteUrl("/roms/"),
  },
};

export default function CustomRomsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Community Releases"
        title="Custom ROMs"
        description="Tested Android 15 & 16 custom ROMs for Redmi Note 14 4G (tanzanite). Explore release changelogs, full device screenshots, and verified direct download mirrors."
        crumbs={[{ label: "Custom ROMs" }]}
        meta={
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <Link
              href="/tutorials/#custom-rom-tutorial"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Video className="size-3.5 text-foreground" />
              Watch Video Tutorial
            </Link>
            <Link
              href="/guide/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <span>Flashing Guide</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>
        }
      />

      <div className="container-page py-10 sm:py-12">
        <RomBrowser roms={customRoms} isPorted={false} />
      </div>
    </div>
  );
}
