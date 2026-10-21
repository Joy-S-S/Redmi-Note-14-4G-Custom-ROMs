import type { Metadata } from "next";
import { ExternalLink, Video } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { VideoCard } from "@/components/site/video-card";
import { tutorials, youtubeChannel } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Video Tutorials",
  description:
    "Video tutorials for Redmi Note 14 4G (tanzanite). Learn bootloader unlocking, custom ROM installation, KernelSU root, and debloating.",
  alternates: {
    canonical: absoluteUrl("/tutorials/"),
  },
  openGraph: {
    title: "Video Tutorials | Tanzanite",
    description:
      "Video tutorials for Redmi Note 14 4G (tanzanite). Step-by-step guides by Yousef Sayed.",
    url: absoluteUrl("/tutorials/"),
  },
};

export default function TutorialsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Visual Learning"
        title="Video Tutorials"
        description="Step-by-step walkthroughs created specifically for the Redmi Note 14 4G (tanzanite), covering unlocking, flashing, root, and system maintenance."
        crumbs={[{ label: "Tutorials" }]}
        meta={
          <a
            href={youtubeChannel}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground hover:bg-muted"
          >
            <Video className="size-4" />
            <span>YouTube Channel</span>
            <ExternalLink className="size-3 text-muted-foreground ml-1" />
          </a>
        }
      />

      <div className="container-page py-10 sm:py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tutorials.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}
