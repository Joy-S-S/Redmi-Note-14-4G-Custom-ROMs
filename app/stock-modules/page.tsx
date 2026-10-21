import type { Metadata } from "next";
import { Callout } from "@/components/site/callout";
import { ModuleBrowser } from "@/components/site/module-browser";
import { PageHeader } from "@/components/site/page-header";
import { stockModules } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Stock Modules",
  description:
    "Download modules specifically designed for official Xiaomi HyperOS on Redmi Note 14 4G (tanzanite).",
  alternates: {
    canonical: absoluteUrl("/stock-modules/"),
  },
  openGraph: {
    title: "Stock Modules | Tanzanite",
    description:
      "Download modules specifically designed for official Xiaomi HyperOS on Redmi Note 14 4G (tanzanite).",
    url: absoluteUrl("/stock-modules/"),
  },
};

export default function StockModulesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="HyperOS Addons"
        title="Stock Modules"
        description="Magisk and KernelSU modifications tested on stock Xiaomi HyperOS firmware. Safely unlock features, disable advertising services, or tweak system components without losing official OTA updates."
        crumbs={[{ label: "Stock Modules" }]}
      />

      <div className="container-page py-10 sm:py-12">
        <Callout variant="note" title="Compatibility Information" className="mb-8">
          <p>
            These packages are verified on stock HyperOS versions. Inspect the &ldquo;Source&rdquo; link
            for each module to read the author&apos;s release notes and installation instructions.
          </p>
        </Callout>

        <ModuleBrowser
          modules={stockModules}
          categoryLabel="Stock Modules"
        />
      </div>
    </div>
  );
}
