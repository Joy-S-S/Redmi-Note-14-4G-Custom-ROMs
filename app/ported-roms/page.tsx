import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import { RomBrowser } from "@/components/site/rom-browser";
import { portedRoms } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ported ROMs",
  description:
    "Download ported ROMs for Redmi Note 14 4G (tanzanite) ported from other Xiaomi, POCO, or MediaTek devices.",
  alternates: {
    canonical: absoluteUrl("/ported-roms/"),
  },
  openGraph: {
    title: "Ported ROMs | Tanzanite",
    description:
      "Download ported ROMs for Redmi Note 14 4G (tanzanite).",
    url: absoluteUrl("/ported-roms/"),
  },
};

export default function PortedRomsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Ported Builds"
        title="Ported ROMs"
        description="Builds adapted from other devices to run on Redmi Note 14 4G (tanzanite). These packages allow exploring alternative OEM skins and unique software experiences."
        crumbs={[{ label: "Ported ROMs" }]}
      />

      <div className="container-page py-10 sm:py-12">
        <RomBrowser roms={portedRoms} isPorted={true} />
      </div>
    </div>
  );
}
