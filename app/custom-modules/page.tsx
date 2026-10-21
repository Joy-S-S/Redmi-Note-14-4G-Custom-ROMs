import type { Metadata } from "next";
import { Callout } from "@/components/site/callout";
import { ModuleBrowser } from "@/components/site/module-browser";
import { PageHeader } from "@/components/site/page-header";
import { customModules } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Custom Modules",
  description:
    "Download Magisk and KernelSU modules for Redmi Note 14 4G (tanzanite). Audio, performance, and customization add-ons.",
  alternates: {
    canonical: absoluteUrl("/custom-modules/"),
  },
  openGraph: {
    title: "Custom Modules | Tanzanite",
    description:
      "Download Magisk and KernelSU modules for Redmi Note 14 4G (tanzanite).",
    url: absoluteUrl("/custom-modules/"),
  },
};

export default function CustomModulesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="System Addons"
        title="Custom Modules"
        description="Magisk and KernelSU enhancements developed or adapted for custom ROMs on the Redmi Note 14 4G. Includes Dolby Atmos, camera mods, thermal profiles, and system UI tweaks."
        crumbs={[{ label: "Custom Modules" }]}
      />

      <div className="container-page py-10 sm:py-12">
        <Callout variant="note" title="Module Notice" className="mb-8">
          <p>
            Always make sure you have root access (via Magisk or KernelSU) and a recovery backup
            before installing system modules. If a module causes a bootloop, you can remove it via
            TWRP file manager or Magisk Safe Mode.
          </p>
        </Callout>

        <ModuleBrowser
          modules={customModules}
          categoryLabel="Custom Modules"
        />
      </div>
    </div>
  );
}
