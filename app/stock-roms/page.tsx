import type { Metadata } from "next";
import Link from "next/link";
import { Video } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { StockRomBrowser } from "@/components/site/stock-rom-browser";
import { stockRoms } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Stock ROMs",
  description:
    "Download official Xiaomi HyperOS stock firmware for Redmi Note 14 4G (tanzanite) across Global, EEA, ID, RU, and TW regions.",
  alternates: {
    canonical: absoluteUrl("/stock-roms/"),
  },
  openGraph: {
    title: "Stock ROMs | Tanzanite",
    description:
      "Download official Xiaomi HyperOS stock firmware for Redmi Note 14 4G (tanzanite).",
    url: absoluteUrl("/stock-roms/"),
  },
};

export default function StockRomsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Official Firmware"
        title="Stock ROMs"
        description="Official Xiaomi HyperOS fastboot firmware packages (.tgz) for Redmi Note 14 4G (tanzanite). Use these packages to restore your device to factory conditions or unbrick safely."
        crumbs={[{ label: "Stock ROMs" }]}
        meta={
          <Link
            href="/tutorials/#stock-rom-tutorial"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Video className="size-3.5 text-foreground" />
            Stock Installation Tutorial
          </Link>
        }
      />

      <div className="container-page py-10 sm:py-12">
        <StockRomBrowser roms={stockRoms} />
      </div>
    </div>
  );
}
