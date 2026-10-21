"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Heart,
  ImageIcon,
  MessageCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/format";
import type { CustomRom, PortedRom } from "@/lib/data";
import { cn } from "@/lib/utils";

type Rom = CustomRom | PortedRom;

function BulletList({ items, link }: { items: string[]; link?: string }) {
  if (!items.length) {
    if (link) {
      return (
        <p className="text-sm text-muted-foreground">
          See installation instructions:{" "}
          {link.startsWith("/") ? (
            <Link
              href={link}
              className="text-primary underline hover:text-primary/80 inline-flex items-center gap-1 font-medium"
            >
              Open Interactive Guide
            </Link>
          ) : (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="text-primary underline hover:text-primary/80 inline-flex items-center gap-1 font-medium"
            >
              Open Notes & Guide <ExternalLink className="size-3 inline" />
            </a>
          )}
        </p>
      );
    }
    return <p className="text-sm text-muted-foreground">Not provided.</p>;
  }

  return (
    <ul className="space-y-2.5">
      {items.map((item, idx) => {
        const isNoteNotice =
          /read\s+(?:the|this)?\s*notes?/i.test(item) ||
          /please\s+read/i.test(item);
        const hasUrl = /(https?:\/\/[^\s]+)/.test(item);

        return (
          <li
            key={idx}
            className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
          >
            <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/60" />
            <span>
              {hasUrl ? (
                item.split(/(https?:\/\/[^\s]+)/g).map((part, pIdx) =>
                  /^https?:\/\//i.test(part) ? (
                    <a
                      key={pIdx}
                      href={part}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline hover:text-primary/80 break-all font-medium inline-flex items-center gap-0.5"
                    >
                      {part}
                      <ExternalLink className="size-3 inline" />
                    </a>
                  ) : (
                    part
                  ),
                )
              ) : isNoteNotice && link ? (
                link.startsWith("/") ? (
                  <Link
                    href={link}
                    className="font-medium text-emerald-400 underline hover:text-emerald-300 inline-flex items-center gap-1"
                  >
                    {item}
                  </Link>
                ) : (
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-emerald-400 underline hover:text-emerald-300 inline-flex items-center gap-1.5"
                  >
                    {item}
                    <ExternalLink className="size-3 inline" />
                  </a>
                )
              ) : (
                item
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export function RomDetailsSheet({
  rom,
  onOpenChange,
}: {
  rom: Rom | null;
  onOpenChange: (open: boolean) => void;
}) {
  const [activeShot, setActiveShot] = useState(0);
  const [prevRomKey, setPrevRomKey] = useState(rom?.slug);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  // Reset activeShot when changing ROMs
  if (rom?.slug !== prevRomKey) {
    setPrevRomKey(rom?.slug);
    setActiveShot(0);
  }

  // Scroll active thumbnail into view
  useEffect(() => {
    const container = thumbnailContainerRef.current;
    if (!container) return;
    const activeEl = container.children[activeShot] as HTMLElement | undefined;
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeShot]);

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    if (!rom || !rom.screenshotUrls.length) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if an input is focused
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "ArrowLeft") {
        setActiveShot((prev) =>
          prev > 0 ? prev - 1 : rom.screenshotUrls.length - 1,
        );
      } else if (e.key === "ArrowRight") {
        setActiveShot((prev) =>
          prev < rom.screenshotUrls.length - 1 ? prev + 1 : 0,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [rom]);

  const screenshots = rom?.screenshotUrls ?? [];
  const screenshot = screenshots[activeShot] ?? screenshots[0];

  return (
    <Sheet open={Boolean(rom)} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto bg-background p-0 sm:max-w-2xl"
      >
          {rom ? (
            <>
              <SheetHeader className="border-b border-border p-5 pr-12 sm:p-6 sm:pr-14">
                <div className="flex items-start gap-4">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-white/10 sm:size-20">
                    <Image
                      src={rom.coverUrl}
                      alt={`${rom.name} cover`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-1.5">
                      <Badge
                        variant="outline"
                        className="h-5 border-white/12 px-2 font-mono text-[0.6rem]"
                      >
                        Android {rom.androidVersion}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="h-5 border-white/12 px-2 text-[0.6rem]"
                      >
                        {rom.downloadGappsUrl && rom.downloadVanillaUrl
                          ? "GApps & Vanilla"
                          : rom.gapps
                            ? "GApps"
                            : "Vanilla"}
                      </Badge>
                      {"status" in rom && rom.status ? (
                        <Badge
                          variant="outline"
                          className="h-5 border-white/12 px-2 text-[0.6rem] capitalize"
                        >
                          {rom.status}
                        </Badge>
                      ) : null}
                    </div>
                    <SheetTitle className="text-xl tracking-tight">
                      {rom.name}
                    </SheetTitle>
                    <SheetDescription className="mt-1 text-xs">
                      Maintained by {rom.developer} · {formatDate(rom.date)}
                    </SheetDescription>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {rom.downloadGappsUrl && rom.downloadVanillaUrl ? (
                    <>
                      <a
                        href={rom.downloadGappsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
                      >
                        <Download className="size-4" />
                        Download (GApps)
                      </a>
                      <a
                        href={rom.downloadVanillaUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-sky-600 px-3.5 text-sm font-medium text-white transition-colors hover:bg-sky-500"
                      >
                        <Download className="size-4" />
                        Download (Vanilla)
                      </a>
                    </>
                  ) : (
                    <a
                      href={rom.downloadVanillaUrl || rom.downloadGappsUrl || rom.downloadUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
                    >
                      <Download className="size-4" />
                      Download {rom.downloadVanillaUrl || !rom.gapps ? "(Vanilla)" : "(GApps)"}
                    </a>
                  )}
                  {"vendorBootUrl" in rom && rom.vendorBootUrl ? (
                    <a
                      href={rom.vendorBootUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-3.5 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      Vendor boot
                      <ExternalLink className="size-3.5" />
                    </a>
                  ) : null}
                  {rom.supportGroup ? (
                    <a
                      href={rom.supportGroup}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-3.5 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      <MessageCircle className="size-4" />
                      Support
                    </a>
                  ) : null}
                  {rom.flashingInstructionsUrl ? (
                    rom.flashingInstructionsUrl.startsWith("/") ? (
                      <Link
                        href={rom.flashingInstructionsUrl}
                        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-3.5 text-sm font-medium transition-colors hover:bg-muted"
                      >
                        <BookOpen className="size-4" />
                        Flashing Guide
                      </Link>
                    ) : (
                      <a
                        href={rom.flashingInstructionsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-3.5 text-sm font-medium transition-colors hover:bg-muted"
                      >
                        <BookOpen className="size-4" />
                        Notes / Guide
                        <ExternalLink className="size-3.5" />
                      </a>
                    )
                  ) : null}
                  {(rom as { donateUrl?: string }).donateUrl ? (
                    <a
                      href={(rom as { donateUrl?: string }).donateUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-3.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <Heart className="size-3.5" />
                      Donate
                    </a>
                  ) : null}
                </div>
              </SheetHeader>

              <div className="space-y-7 p-5 sm:p-6">
                <section aria-label="Screenshots" className="flex flex-col items-center">
                  {screenshot ? (
                    <div className="w-full space-y-3.5">
                      {/* Main Phone Frame with Nav Overlays */}
                      <div className="relative mx-auto flex items-center justify-center">
                        {/* Prev Button */}
                        {screenshots.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setActiveShot((prev) =>
                                prev > 0 ? prev - 1 : screenshots.length - 1,
                              )
                            }
                            className="absolute -left-2 sm:-left-4 z-10 grid size-8 place-items-center rounded-full border border-border bg-card/90 text-muted-foreground shadow-md backdrop-blur-xs transition hover:bg-muted hover:text-foreground"
                            aria-label="Previous screenshot"
                          >
                            <ChevronLeft className="size-4" />
                          </button>
                        )}

                        {/* Phone Frame */}
                        <div className="phone-frame relative aspect-[9/19.5] w-[260px] max-w-full sm:w-[280px]">
                          <Image
                            src={screenshot}
                            alt={`${rom.name} screenshot ${activeShot + 1}`}
                            fill
                            sizes="280px"
                            className="object-cover"
                            priority
                          />

                          {/* Bottom counter badge */}
                          {screenshots.length > 1 && (
                            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/75 px-2.5 py-0.5 font-mono text-[0.65rem] text-white/90 backdrop-blur-xs pointer-events-none">
                              {activeShot + 1} / {screenshots.length}
                            </span>
                          )}
                        </div>

                        {/* Next Button */}
                        {screenshots.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setActiveShot((prev) =>
                                prev < screenshots.length - 1 ? prev + 1 : 0,
                              )
                            }
                            className="absolute -right-2 sm:-right-4 z-10 grid size-8 place-items-center rounded-full border border-border bg-card/90 text-muted-foreground shadow-md backdrop-blur-xs transition hover:bg-muted hover:text-foreground"
                            aria-label="Next screenshot"
                          >
                            <ChevronRight className="size-4" />
                          </button>
                        )}
                      </div>

                      {/* Horizontal Thumbnail Strip */}
                      {screenshots.length > 1 && (
                        <div
                          ref={thumbnailContainerRef}
                          className="no-scrollbar flex w-full gap-2 overflow-x-auto py-1 px-1 sm:justify-center"
                        >
                          {screenshots.map((shot, index) => {
                            const isSelected = index === activeShot;
                            return (
                              <button
                                key={shot}
                                type="button"
                                onClick={() => setActiveShot(index)}
                                className={cn(
                                  "relative aspect-[9/19.5] w-12 sm:w-14 shrink-0 overflow-hidden rounded-md border bg-muted transition-all duration-150",
                                  isSelected
                                    ? "border-primary ring-2 ring-primary/80 opacity-100 scale-105"
                                    : "border-border opacity-50 hover:opacity-90",
                                )}
                                aria-label={`Show screenshot ${index + 1}`}
                                aria-pressed={isSelected}
                              >
                                <Image
                                  src={shot}
                                  alt=""
                                  fill
                                  sizes="56px"
                                  className="object-cover"
                                />
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex min-h-40 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/30 text-muted-foreground">
                      <ImageIcon className="size-5" />
                      <p className="text-xs">No screenshots supplied</p>
                    </div>
                  )}
                </section>

                <Tabs defaultValue="overview">
                  <TabsList className="h-9 w-full justify-start bg-muted/60 p-1">
                    <TabsTrigger value="overview" className="text-xs">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="changelog" className="text-xs">
                      Changelog
                    </TabsTrigger>
                    <TabsTrigger value="issues" className="text-xs">
                      Known issues
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="pt-4">
                    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border">
                      <div className="bg-card p-3">
                        <dt className="text-[0.65rem] text-muted-foreground">
                          Android
                        </dt>
                        <dd className="mt-1 text-sm font-medium">
                          {rom.androidVersion}
                        </dd>
                      </div>
                      <div className="bg-card p-3">
                        <dt className="text-[0.65rem] text-muted-foreground">
                          Released
                        </dt>
                        <dd className="mt-1 text-sm font-medium">
                          {formatDate(rom.date)}
                        </dd>
                      </div>
                      <div className="bg-card p-3">
                        <dt className="text-[0.65rem] text-muted-foreground">
                          Google apps
                        </dt>
                        <dd className="mt-1 text-sm font-medium">
                          {rom.gapps ? "Included" : "Not included"}
                        </dd>
                      </div>
                      <div className="bg-card p-3">
                        <dt className="text-[0.65rem] text-muted-foreground">
                          Developer
                        </dt>
                        <dd className="mt-1 truncate text-sm font-medium">
                          {rom.developer}
                        </dd>
                      </div>
                      {"originalDevice" in rom && rom.originalDevice ? (
                        <div className="col-span-2 bg-card p-3">
                          <dt className="text-[0.65rem] text-muted-foreground">
                            Ported from
                          </dt>
                          <dd className="mt-1 text-sm font-medium">
                            {rom.originalDevice}
                          </dd>
                        </div>
                      ) : null}
                    </dl>

                    <div className="mt-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold">Installation notes</h3>
                        {rom.flashingInstructionsUrl ? (
                          rom.flashingInstructionsUrl.startsWith("/") ? (
                            <Link
                              href={rom.flashingInstructionsUrl}
                              className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
                            >
                              <BookOpen className="size-3.5" />
                              Interactive Flashing Guide →
                            </Link>
                          ) : (
                            <a
                              href={rom.flashingInstructionsUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
                            >
                              <BookOpen className="size-3.5" />
                              Open Notes / Guide
                              <ExternalLink className="size-3" />
                            </a>
                          )
                        ) : null}
                      </div>
                      <div className="mt-3">
                        <BulletList items={rom.romNotes} link={rom.flashingInstructionsUrl} />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="changelog" className="pt-4">
                    {rom.changelog.length ? (
                      <ol className="space-y-3">
                        {rom.changelog.map((item, index) => (
                          <li key={item} className="flex gap-3 text-sm">
                            <span className="mt-0.5 w-5 shrink-0 font-mono text-[0.65rem] text-muted-foreground">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="leading-relaxed text-muted-foreground">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No changelog was supplied for this build.
                      </p>
                    )}
                  </TabsContent>

                  <TabsContent value="issues" className="pt-4">
                    <BulletList items={rom.knownIssues} />
                  </TabsContent>
                </Tabs>
              </div>
            </>
          ) : (
            <SheetHeader className="p-6">
              <SheetTitle>ROM details</SheetTitle>
              <SheetDescription>Select a ROM to view details.</SheetDescription>
            </SheetHeader>
          )}
        </SheetContent>
      </Sheet>
  );
}
