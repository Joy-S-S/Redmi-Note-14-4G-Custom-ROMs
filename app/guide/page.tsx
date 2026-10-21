import type { Metadata } from "next";
import { FlashingGuide } from "@/components/site/flashing-guide";
import { PageHeader } from "@/components/site/page-header";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Flashing Guide",
  description:
    "Complete flashing guide for Redmi Note 14 4G (tanzanite). Step-by-step instructions for unlocking bootloader, vendor_boot, and custom ROMs.",
  alternates: {
    canonical: absoluteUrl("/guide/"),
  },
  openGraph: {
    title: "Flashing Guide | Tanzanite",
    description:
      "Complete flashing guide for Redmi Note 14 4G (tanzanite). Step-by-step instructions.",
    url: absoluteUrl("/guide/"),
  },
};

export default function GuidePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Documentation"
        title="Flashing Guide"
        description="Comprehensive, verified step-by-step instructions to safely install custom recoveries and custom ROMs on your Redmi Note 14 4G (tanzanite)."
        crumbs={[{ label: "Flashing Guide" }]}
      />

      <div className="container-page py-10 sm:py-12">
        <FlashingGuide />
      </div>
    </div>
  );
}
