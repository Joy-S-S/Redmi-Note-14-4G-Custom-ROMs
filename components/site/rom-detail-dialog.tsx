"use client";

import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { CopyButton } from "@/components/site/copy-button";
import { formatDate } from "@/lib/format";
import type { CustomRom, PortedRom } from "@/lib/data";

type Rom = CustomRom | PortedRom;

export function RomDetailDialog({
  rom,
  onClose,
}: {
  rom: Rom;
  onClose: () => void;
}) {
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] w-[calc(100%-1.5rem)] max-w-4xl overflow-y-auto p-0 sm:w-full">
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          <Image
            src={rom.coverUrl}
            alt={`${rom.name} cover`}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
            <p className="eyebrow text-white/70">Custom ROM</p>
            <DialogTitle className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {rom.name}
            </DialogTitle>
            <p className="mt-1 text-sm text-white/70">
              by {rom.developer} · Android {rom.androidVersion}
            </p>
          </div>
        </div>

        <div className="grid gap-6 p-5 sm:p-7 md:grid-cols-[minmax(0,1fr)_16rem]">
          <div className="space-y-6">
            <section>
              <h3 className="text-sm font-semibold">Release</h3>
              <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-border p-3">
                  <dt className="text-xs text-muted-foreground">Date</dt>
                  <dd className="mt-1 font-medium">{formatDate(rom.date)}</dd>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <dt className="text-xs text-muted-foreground">GApps Mode</dt>
                  <dd className="mt-1 font-medium">
                    {rom.downloadGappsUrl && rom.downloadVanillaUrl
                      ? "Both (GApps & Vanilla)"
                      : rom.gapps
                        ? "Included"
                        : "Vanilla (Separate)"}
                  </dd>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <dt className="text-xs text-muted-foreground">Screenshots</dt>
                  <dd className="mt-1 font-medium">
                    {rom.screenshotUrls.length}
                  </dd>
                </div>
                {"status" in rom && rom.status ? (
                  <div className="rounded-lg border border-border p-3">
                    <dt className="text-xs text-muted-foreground">Status</dt>
                    <dd className="mt-1 font-medium">{rom.status}</dd>
                  </div>
                ) : null}
              </dl>
            </section>

            {rom.changelog.length > 0 ? (
              <section>
                <h3 className="text-sm font-semibold">Changelog</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {rom.changelog.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {rom.romNotes.length > 0 || rom.flashingInstructionsUrl ? (
              <section>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Notes</h3>
                  {rom.flashingInstructionsUrl ? (
                    rom.flashingInstructionsUrl.startsWith("/") ? (
                      <Link
                        href={rom.flashingInstructionsUrl}
                        className="text-xs text-primary hover:underline font-medium"
                      >
                        Interactive Flashing Guide →
                      </Link>
                    ) : (
                      <a
                        href={rom.flashingInstructionsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-primary hover:underline font-medium"
                      >
                        Open Notes / Guide Link →
                      </a>
                    )
                  ) : null}
                </div>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {rom.romNotes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" />
                      <span>
                        {rom.flashingInstructionsUrl && (/read\s+(?:the|this)?\s*notes?/i.test(item) || /please\s+read/i.test(item)) ? (
                          <a
                            href={rom.flashingInstructionsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-emerald-400 underline hover:text-emerald-300"
                          >
                            {item}
                          </a>
                        ) : (
                          item
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {rom.knownIssues.length > 0 && rom.knownIssues[0] !== "You Tell Me" ? (
              <section>
                <h3 className="text-sm font-semibold">Known issues</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {rom.knownIssues.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-destructive" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {rom.screenshotUrls.length > 0 ? (
              <section>
                <h3 className="text-sm font-semibold">Screenshots</h3>
                <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                  {rom.screenshotUrls.map((screenshot, index) => (
                    <div
                      key={screenshot}
                      className="relative h-60 w-28 shrink-0 overflow-hidden rounded-xl border border-border bg-muted"
                    >
                      <Image
                        src={screenshot}
                        alt={`${rom.name} screenshot ${index + 1}`}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="eyebrow">Downloads</p>
              <div className="mt-3 space-y-2">
                {rom.downloadGappsUrl && rom.downloadVanillaUrl ? (
                  <div className="space-y-2">
                    <a
                      href={rom.downloadGappsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
                    >
                      <Download className="size-4" />
                      Download (GApps)
                    </a>
                    <a
                      href={rom.downloadVanillaUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-sky-600 text-sm font-medium text-white transition-colors hover:bg-sky-500"
                    >
                      <Download className="size-4" />
                      Download (Vanilla)
                    </a>
                  </div>
                ) : (
                  <a
                    href={rom.downloadVanillaUrl || rom.downloadGappsUrl || rom.downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
                  >
                    <Download className="size-4" />
                    Download {rom.downloadVanillaUrl || !rom.gapps ? "(Vanilla)" : "(GApps)"}
                  </a>
                )}
                {(rom as {vendorBootUrl?: string}).vendorBootUrl ? (
                  <a
                    href={(rom as {vendorBootUrl?: string}).vendorBootUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 items-center justify-center rounded-lg border border-border text-sm font-medium transition-colors hover:bg-muted"
                  >
                    Vendor boot
                  </a>
                ) : null}
                {rom.flashingInstructionsUrl ? (
                  rom.flashingInstructionsUrl.startsWith("/") ? (
                    <Link
                      href={rom.flashingInstructionsUrl}
                      className="flex h-10 items-center justify-center rounded-lg border border-border text-sm font-medium transition-colors hover:bg-muted"
                    >
                      Flashing Guide
                    </Link>
                  ) : (
                    <a
                      href={rom.flashingInstructionsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-10 items-center justify-center rounded-lg border border-border text-sm font-medium transition-colors hover:bg-muted"
                    >
                      Notes / Guide
                    </a>
                  )
                ) : null}
                <CopyButton value={rom.downloadGappsUrl || rom.downloadVanillaUrl || rom.downloadUrl} label="Copy link" />
              </div>
            </div>

            {rom.supportGroup || (rom as {donateUrl?: string}).donateUrl ? (
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="eyebrow">Support</p>
                <div className="mt-3 space-y-2 text-sm">
                  {rom.supportGroup ? (
                    <a
                      href={rom.supportGroup}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-lg border border-border px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      Support group
                    </a>
                  ) : null}
                  {(rom as {donateUrl?: string}).donateUrl ? (
                    <a
                      href={(rom as {donateUrl?: string}).donateUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-lg border border-border px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      Donate
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null}

            {"originalDevice" in rom && rom.originalDevice ? (
              <div className="rounded-xl border border-border bg-card p-4 text-sm">
                <p className="eyebrow">Source device</p>
                <p className="mt-2 text-muted-foreground">{rom.originalDevice}</p>
              </div>
            ) : null}
          </aside>
        </div>

        <DialogDescription className="sr-only">
          Detailed information for {rom.name}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
