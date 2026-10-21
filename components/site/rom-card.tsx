"use client";

import Image from "next/image";
import { CalendarDays, Download, ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import type { CustomRom, PortedRom } from "@/lib/data";
import { cn } from "@/lib/utils";

type Rom = CustomRom | PortedRom;

export function RomCard({
  rom,
  onOpen,
  className,
}: {
  rom: Rom;
  onOpen: (rom: Rom) => void;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group flex min-w-0 max-w-full gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-white/20",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onOpen(rom)}
        className="relative size-20 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-muted sm:size-24"
        aria-label={`View details for ${rom.name}`}
      >
        <Image
          src={rom.coverUrl}
          alt={`${rom.name} cover`}
          fill
          sizes="96px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </button>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <button
              type="button"
              onClick={() => onOpen(rom)}
              className="block max-w-full truncate text-left text-[0.95rem] font-semibold tracking-tight hover:underline"
            >
              {rom.name}
            </button>
            <p className="mt-1 truncate text-xs text-muted-foreground">
              by {rom.developer}
            </p>
          </div>
          <Badge
            variant="outline"
            className="h-6 shrink-0 border-white/12 px-2 font-mono text-[0.65rem]"
          >
            Android {rom.androidVersion}
          </Badge>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[0.7rem] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="size-3" />
            {formatDate(rom.date)}
          </span>
          <span>
            {rom.downloadGappsUrl && rom.downloadVanillaUrl
              ? "GApps & Vanilla"
              : rom.gapps
                ? "GApps included"
                : "Vanilla build"}
          </span>
          <span className="inline-flex items-center gap-1">
            <ImageIcon className="size-3" />
            {rom.screenshotUrls.length} shots
          </span>
          {"originalDevice" in rom && rom.originalDevice ? (
            <span className="truncate">From {rom.originalDevice}</span>
          ) : null}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpen(rom)}
            className="h-8"
          >
            Details
          </Button>
          {rom.downloadGappsUrl && rom.downloadVanillaUrl ? (
            <>
              <a
                href={rom.downloadGappsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-emerald-600 px-2.5 text-xs font-medium text-white transition-colors hover:bg-emerald-500"
                title="Download GApps build"
              >
                <Download className="size-3.5" />
                Download (GApps)
              </a>
              <a
                href={rom.downloadVanillaUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-sky-600 px-2.5 text-xs font-medium text-white transition-colors hover:bg-sky-500"
                title="Download Vanilla build"
              >
                <Download className="size-3.5" />
                Download (Vanilla)
              </a>
            </>
          ) : (
            <a
              href={rom.downloadVanillaUrl || rom.downloadGappsUrl || rom.downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/80"
            >
              <Download className="size-3.5" />
              Download {rom.downloadVanillaUrl || !rom.gapps ? "(Vanilla)" : "(GApps)"}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
