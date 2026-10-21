import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  Download,
  Flame,
  HelpCircle,
  Layers,
  Smartphone,
  Terminal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  counts,
  featuredRom,
  latestCustomRoms,
} from "@/lib/data";
import { device, faqs } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const featuredHref =
    "originalDevice" in featuredRom
      ? `/ported-roms/?rom=${featuredRom.slug}`
      : `/roms/?rom=${featuredRom.slug}`;

  return (
    <div className="flex flex-col">
      {/* Asymmetric Hero Section */}
      <section className="relative overflow-hidden border-b border-border py-16 sm:py-24">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-center">
            {/* Left Column: Device Identity & Actions */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs text-muted-foreground">
                <Smartphone className="size-3.5 text-foreground" />
                <span className="font-medium text-foreground">{device.name}</span>
                <span className="text-border">|</span>
                <span className="font-mono text-[0.7rem] uppercase">{device.codename}</span>
              </div>

              <h1 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Custom ROMs, stock firmware, and mods for tanzanite.
              </h1>

              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                A community-maintained catalog of tested Android 15 & 16 builds, official HyperOS
                firmware, and Magisk modules with clear safety guidelines.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/roms/"
                  className={cn(
                    buttonVariants({ variant: "default", size: "lg" }),
                    "h-11 px-5 text-sm font-medium",
                  )}
                >
                  Browse Custom ROMs
                  <ArrowRight className="ml-1.5 size-4" />
                </Link>
                <Link
                  href="/guide/"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-11 px-5 text-sm font-medium",
                  )}
                >
                  Flashing Guide
                </Link>
                <Link
                  href="/stock-roms/"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "lg" }),
                    "h-11 px-4 text-sm font-medium text-muted-foreground hover:text-foreground",
                  )}
                >
                  Stock Firmware
                </Link>
              </div>

              {/* Coverage & Count Stats */}
              <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-8 sm:grid-cols-4 sm:gap-4">
                <div className="flex flex-col items-center text-center justify-end sm:items-start sm:text-left">
                  <p className="font-mono text-2xl font-bold leading-none tracking-tight sm:text-3xl">
                    {counts.customRoms}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">Custom ROMs</p>
                </div>
                <div className="flex flex-col items-center text-center justify-end sm:items-start sm:text-left">
                  <p className="font-mono text-2xl font-bold leading-none tracking-tight sm:text-3xl">
                    {counts.stockRoms}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">Stock Releases</p>
                </div>
                <div className="flex flex-col items-center text-center justify-end sm:items-start sm:text-left">
                  <p className="font-mono text-2xl font-bold leading-none tracking-tight sm:text-3xl">
                    {counts.portedRoms}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">Ported ROMs</p>
                </div>
                <div className="flex flex-col items-center text-center justify-end sm:items-start sm:text-left">
                  <p className="font-mono text-2xl font-bold leading-none tracking-tight sm:text-3xl">
                    15 · 16
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">Android Versions</p>
                </div>
              </div>
            </div>

            {/* Right Column: Featured Device Preview Card */}
            <div className="relative">
              <div className="surface overflow-hidden p-6 sm:p-8">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-medium text-foreground">Featured Build</span>
                  </div>
                  <Badge variant="outline" className="border-border font-mono text-[0.65rem]">
                    Android {featuredRom.androidVersion}
                  </Badge>
                </div>

                <div className="mt-5 flex gap-4">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-white/10 sm:size-24">
                    <Image
                      src={featuredRom.coverUrl}
                      alt={`${featuredRom.name} cover`}
                      fill
                      sizes="96px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-semibold tracking-tight">
                      {featuredRom.name}
                    </h2>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      by {featuredRom.developer}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Updated {formatDate(featuredRom.date)}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <Link
                        href={featuredHref}
                        className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:underline"
                      >
                        Explore details
                        <ArrowRight className="size-3" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Build Specifications Glance */}
                <div className="mt-6 border-t border-border pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="eyebrow">Build Specifications</p>
                    <span className="font-mono text-[0.65rem] text-muted-foreground">
                      Release #{featuredRom.id}
                    </span>
                  </div>
                  <dl className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="rounded-lg border border-border/60 bg-muted/30 p-2.5">
                      <dt className="text-muted-foreground">Google Apps</dt>
                      <dd className="mt-1 font-medium text-foreground truncate">
                        {featuredRom.downloadGappsUrl && featuredRom.downloadVanillaUrl
                          ? "GApps & Vanilla"
                          : featuredRom.gapps
                            ? "Included (GApps)"
                            : "Vanilla (Clean)"}
                      </dd>
                    </div>
                    <div className="rounded-lg border border-border/60 bg-muted/30 p-2.5">
                      <dt className="text-muted-foreground">Android Version</dt>
                      <dd className="mt-1 font-medium text-foreground truncate">
                        Android {featuredRom.androidVersion}
                      </dd>
                    </div>
                    <div className="rounded-lg border border-border/60 bg-muted/30 p-2.5">
                      <dt className="text-muted-foreground">Maintainer</dt>
                      <dd className="mt-1 font-medium text-foreground truncate">
                        @{featuredRom.developer}
                      </dd>
                    </div>
                    <div className="rounded-lg border border-border/60 bg-muted/30 p-2.5">
                      <dt className="text-muted-foreground">Released</dt>
                      <dd className="mt-1 font-medium text-foreground truncate">
                        {formatDate(featuredRom.date)}
                      </dd>
                    </div>
                  </dl>

                  {/* Highlights / Changelog preview if available */}
                  {featuredRom.changelog && featuredRom.changelog.length > 0 && !featuredRom.changelog[0].toLowerCase().includes("initial") ? (
                    <div className="mt-3 rounded-lg border border-border/50 bg-muted/20 p-2.5">
                      <p className="text-[0.65rem] font-semibold text-muted-foreground mb-1">Latest Changelog:</p>
                      <p className="text-xs text-foreground/90 line-clamp-2 leading-relaxed">
                        • {featuredRom.changelog[0]}
                      </p>
                    </div>
                  ) : null}

                  {/* Action Buttons */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {featuredRom.downloadGappsUrl && featuredRom.downloadVanillaUrl ? (
                      <>
                        <a
                          href={featuredRom.downloadGappsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 min-w-[120px] inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-3 text-xs font-semibold text-white transition-colors hover:bg-emerald-500 shadow-sm"
                        >
                          <Download className="size-3.5" />
                          Download (GApps)
                        </a>
                        <a
                          href={featuredRom.downloadVanillaUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 min-w-[120px] inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-sky-600 px-3 text-xs font-semibold text-white transition-colors hover:bg-sky-500 shadow-sm"
                        >
                          <Download className="size-3.5" />
                          Download (Vanilla)
                        </a>
                      </>
                    ) : (
                      <a
                        href={featuredRom.downloadVanillaUrl || featuredRom.downloadGappsUrl || featuredRom.downloadUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 min-w-[130px] inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/80 shadow-sm"
                      >
                        <Download className="size-3.5" />
                        Download {featuredRom.downloadVanillaUrl || !featuredRom.gapps ? "(Vanilla)" : "(GApps)"}
                      </a>
                    )}

                    <Link
                      href={featuredHref}
                      className="inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-border px-3.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      View Details
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Library Pillars Section */}
      <section className="border-b border-border py-16 sm:py-20">
        <div className="container-page">
          <div className="flex flex-col gap-2">
            <p className="eyebrow">Directory</p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Four curated collections
            </h2>
            <p className="max-w-xl text-sm text-muted-foreground">
              Everything you need for Redmi Note 14 4G, indexed and verified with clean links.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Custom ROMs */}
            <Link
              href="/roms/"
              className="group surface flex flex-col justify-between p-5 transition-colors hover:border-white/25"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-lg border border-border bg-muted">
                    <Flame className="size-5 text-foreground" />
                  </span>
                  <Badge variant="outline" className="border-border font-mono text-xs">
                    {counts.customRoms} builds
                  </Badge>
                </div>
                <h3 className="mt-5 text-base font-semibold group-hover:underline">
                  Custom ROMs
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  AOSP, LineageOS, and Pixel-based releases with custom feature sets and optimizations.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1 text-xs font-medium text-foreground">
                <span>View catalog</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>

            {/* Stock ROMs */}
            <Link
              href="/stock-roms/"
              className="group surface flex flex-col justify-between p-5 transition-colors hover:border-white/25"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-lg border border-border bg-muted">
                    <Layers className="size-5 text-foreground" />
                  </span>
                  <Badge variant="outline" className="border-border font-mono text-xs">
                    {counts.stockRoms} packages
                  </Badge>
                </div>
                <h3 className="mt-5 text-base font-semibold group-hover:underline">
                  Stock ROMs
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  Official Xiaomi HyperOS fastboot packages (.tgz) across Global, EEA, ID, RU, and TW regions.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1 text-xs font-medium text-foreground">
                <span>View firmware</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>

            {/* Ported ROMs */}
            <Link
              href="/ported-roms/"
              className="group surface flex flex-col justify-between p-5 transition-colors hover:border-white/25"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-lg border border-border bg-muted">
                    <Cpu className="size-5 text-foreground" />
                  </span>
                  <Badge variant="outline" className="border-border font-mono text-xs">
                    {counts.portedRoms} ports
                  </Badge>
                </div>
                <h3 className="mt-5 text-base font-semibold group-hover:underline">
                  Ported ROMs
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  Experimental ports adapted from sister devices. For experienced users seeking unique OEM skins.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1 text-xs font-medium text-foreground">
                <span>View ported builds</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>

            {/* Modules */}
            <Link
              href="/custom-modules/"
              className="group surface flex flex-col justify-between p-5 transition-colors hover:border-white/25"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-lg border border-border bg-muted">
                    <Terminal className="size-5 text-foreground" />
                  </span>
                  <Badge variant="outline" className="border-border font-mono text-xs">
                    {counts.modules} mods
                  </Badge>
                </div>
                <h3 className="mt-5 text-base font-semibold group-hover:underline">
                  System Modules
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  Magisk and KernelSU tweaks for audio processing, performance, thermal profiles, and UI addons.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1 text-xs font-medium text-foreground">
                <span>Browse modules</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Releases Section */}
      <section className="border-b border-border py-16 sm:py-20">
        <div className="container-page">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow">Fresh builds</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                Latest Custom Releases
              </h2>
            </div>
            <Link
              href="/roms/"
              className="hidden items-center gap-1 text-xs font-medium text-foreground hover:underline sm:inline-flex"
            >
              All {counts.customRoms} ROMs
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latestCustomRoms.map((rom) => (
              <article
                key={rom.id}
                className="surface group flex flex-col justify-between overflow-hidden p-5 transition-colors hover:border-white/25"
              >
                <div>
                  <div className="flex gap-4">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-muted">
                      <Image
                        src={rom.coverUrl}
                        alt={`${rom.name} cover`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <Badge
                          variant="outline"
                          className="h-5 border-border px-1.5 font-mono text-[0.6rem]"
                        >
                          Android {rom.androidVersion}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="h-5 border-border px-1.5 text-[0.6rem]"
                        >
                          {rom.gapps ? "GApps" : "No GApps"}
                        </Badge>
                      </div>
                      <h3 className="mt-2 truncate text-base font-semibold tracking-tight">
                        {rom.name}
                      </h3>
                      <p className="truncate text-xs text-muted-foreground">
                        by {rom.developer}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-muted-foreground">
                    Released on {formatDate(rom.date)}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <Link
                    href="/roms/"
                    className="text-xs font-medium text-foreground hover:underline"
                  >
                    View in catalog
                  </Link>
                  <a
                    href={rom.downloadVanillaUrl || rom.downloadGappsUrl || rom.downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-8 items-center gap-1 rounded-md bg-primary px-2.5 text-xs font-medium text-primary-foreground hover:bg-primary/80"
                  >
                    <Download className="size-3" />
                    Download {rom.downloadVanillaUrl || !rom.gapps ? "(Vanilla)" : "(GApps)"}
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/roms/"
              className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:underline"
            >
              View all {counts.customRoms} ROMs
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Preparation & Safety Path */}
      <section className="border-b border-border py-16 sm:py-20">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
            <div>
              <p className="eyebrow">Flashing Workflow</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                Prepare your phone before flashing
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Installing custom firmware on the Helio G99-Ultra requires specific step order.
                Review our comprehensive guide to avoid bricking your partition tables.
              </p>

              <div className="mt-8">
                <Link
                  href="/guide/"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "h-10 px-4 text-xs font-medium",
                  )}
                >
                  Read the step-by-step flashing guide
                  <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </div>
            </div>

            {/* Steps Visual List */}
            <div className="space-y-3">
              <div className="surface p-4 sm:p-5">
                <div className="flex items-start gap-3.5">
                  <span className="grid size-7 shrink-0 place-items-center rounded-md border border-border bg-muted font-mono text-xs font-semibold">
                    1
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold">Unlock bootloader</h4>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      Enable OEM Unlocking in Developer Options, link your Xiaomi account, and use the Mi Unlock tool.
                    </p>
                  </div>
                </div>
              </div>

              <div className="surface p-4 sm:p-5">
                <div className="flex items-start gap-3.5">
                  <span className="grid size-7 shrink-0 place-items-center rounded-md border border-border bg-muted font-mono text-xs font-semibold">
                    2
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold">Flash vendor_boot partition</h4>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      Deploy the required recovery environment across both slots via Fastboot before formatting data.
                    </p>
                  </div>
                </div>
              </div>

              <div className="surface p-4 sm:p-5">
                <div className="flex items-start gap-3.5">
                  <span className="grid size-7 shrink-0 place-items-center rounded-md border border-border bg-muted font-mono text-xs font-semibold">
                    3
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold">Format Data &amp; Sideload</h4>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      Confirm data wipe in recovery, then apply your chosen ROM zip and optional GApps via ADB sideload.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Device Specifications Section */}
      <section className="border-b border-border py-16 sm:py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">Hardware baseline</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Redmi Note 14 4G Specifications
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Verified hardware specifications for codename <code className="font-mono text-xs text-foreground">tanzanite</code>.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="surface p-4">
              <p className="text-[0.68rem] text-muted-foreground uppercase font-mono tracking-wider">Device</p>
              <p className="mt-1.5 text-sm font-semibold">{device.name}</p>
              <p className="mt-0.5 font-mono text-xs text-muted-foreground">Codename: {device.codename}</p>
            </div>

            <div className="surface p-4">
              <p className="text-[0.68rem] text-muted-foreground uppercase font-mono tracking-wider">Chipset</p>
              <p className="mt-1.5 text-sm font-semibold">{device.chipset}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">MediaTek 6nm architecture</p>
            </div>

            <div className="surface p-4">
              <p className="text-[0.68rem] text-muted-foreground uppercase font-mono tracking-wider">Display</p>
              <p className="mt-1.5 text-sm font-semibold">{device.display}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Full HD+ resolution</p>
            </div>

            <div className="surface p-4">
              <p className="text-[0.68rem] text-muted-foreground uppercase font-mono tracking-wider">Battery &amp; Charging</p>
              <p className="mt-1.5 text-sm font-semibold">{device.battery}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">USB Type-C 2.0</p>
            </div>

            <div className="surface p-4">
              <p className="text-[0.68rem] text-muted-foreground uppercase font-mono tracking-wider">Cameras</p>
              <p className="mt-1.5 text-sm font-semibold">{device.cameras}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">GCam &amp; Stock Camera supported</p>
            </div>

            <div className="surface p-4">
              <p className="text-[0.68rem] text-muted-foreground uppercase font-mono tracking-wider">Stock Operating System</p>
              <p className="mt-1.5 text-sm font-semibold">{device.build}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Xiaomi HyperOS with Android 14 base</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20">
        <div className="container-page max-w-4xl">
          <div className="flex items-center gap-2">
            <HelpCircle className="size-4 text-muted-foreground" />
            <p className="eyebrow">Frequently Asked Questions</p>
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Everything you should know
          </h2>

          <div className="mt-8">
            <Accordion className="w-full space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`faq-${index}`}
                  className="surface px-5 py-2"
                >
                  <AccordionTrigger className="text-sm font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs leading-relaxed text-muted-foreground pt-1 pb-3">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}
