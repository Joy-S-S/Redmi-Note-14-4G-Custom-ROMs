"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { VideoItem } from "@/lib/content";

export function VideoCard({ video }: { video: VideoItem }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article
        id={video.id}
        className="group scroll-mt-24 overflow-hidden rounded-xl border border-border bg-card min-w-0 max-w-full"
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative block aspect-video w-full overflow-hidden bg-muted text-left"
          aria-label={`Play ${video.title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-80 transition duration-300 group-hover:scale-[1.015] group-hover:opacity-100"
          />
          <span className="absolute inset-0 bg-black/25" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid size-12 place-items-center rounded-full border border-white/20 bg-black/60 text-white transition-transform group-hover:scale-105">
              <Play className="ml-0.5 size-4 fill-current" />
            </span>
          </span>
          <span className="absolute top-3 left-3 rounded-md bg-black/65 px-2 py-1 font-mono text-[0.6rem] tracking-wider text-white/80 uppercase">
            {video.category}
          </span>
        </button>

        <div className="p-5">
          <h2 className="text-base font-semibold tracking-tight">
            {video.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {video.description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-1.5 font-medium text-foreground hover:underline"
            >
              <Play className="size-3 fill-current" />
              Watch video
            </button>
            {video.href ? (
              <Link
                href={video.href}
                className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                {video.hrefLabel ?? "Related page"}
                <ArrowRight className="size-3" />
              </Link>
            ) : null}
          </div>
        </div>
      </article>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl overflow-hidden bg-black p-0 ring-white/10">
          <DialogTitle className="sr-only">{video.title}</DialogTitle>
          <DialogDescription className="sr-only">
            YouTube video player for {video.title}
          </DialogDescription>
          {open ? (
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
