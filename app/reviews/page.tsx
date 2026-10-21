import type { Metadata } from "next";
import { ExternalLink, Video } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { VideoCard } from "@/components/site/video-card";
import { reviews, youtubeChannel } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "ROM Reviews",
  description:
    "Video reviews for custom ROMs on Redmi Note 14 4G (tanzanite). In-depth testing of battery, gaming, camera, and daily performance.",
  alternates: {
    canonical: absoluteUrl("/reviews/"),
  },
  openGraph: {
    title: "ROM Reviews | Tanzanite",
    description:
      "Video reviews for custom ROMs on Redmi Note 14 4G (tanzanite).",
    url: absoluteUrl("/reviews/"),
  },
};

export default function ReviewsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Hands-on Testing"
        title="ROM Reviews"
        description="Comprehensive video showcases testing daily usability, gaming frame rates, battery discharge curves, and camera capabilities on Redmi Note 14 4G builds."
        crumbs={[{ label: "Reviews" }]}
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {reviews.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}
