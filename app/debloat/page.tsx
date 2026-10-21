import type { Metadata } from "next";
import { DebloatManager } from "@/components/site/debloat-manager";
import { PageHeader } from "@/components/site/page-header";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Debloat Guide",
  description:
    "Debloat guide for Redmi Note 14 4G (tanzanite). Safe package uninstall commands for Xiaomi, Google, and partner telemetry.",
  alternates: {
    canonical: absoluteUrl("/debloat/"),
  },
  openGraph: {
    title: "Debloat Guide | Tanzanite",
    description:
      "Debloat guide for Redmi Note 14 4G (tanzanite). Safe package uninstall commands.",
    url: absoluteUrl("/debloat/"),
  },
};

export default function DebloatPage() {
  return (
    <div>
      <PageHeader
        eyebrow="System Optimization"
        title="Debloat Guide"
        description="Clean, tested ADB commands to remove unnecessary bloatware, advertisements, and background telemetry packages from your Redmi Note 14 4G."
        crumbs={[{ label: "Debloat Guide" }]}
      />

      <div className="container-page py-10 sm:py-12">
        <DebloatManager />
      </div>
    </div>
  );
}
