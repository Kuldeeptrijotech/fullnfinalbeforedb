import type { Metadata } from "next";
import { getFeaturedVideosData } from "@/lib/services/videos.service";
import VideosClientView from "@/components/videos/VideosClientView";

export const metadata: Metadata = {
  title: "Videos | Trijotech",
  description:
    "Explore practitioner videos, architecture walk-throughs, and technical demos from the Trijotech team.",
};

export const dynamic = "force-dynamic";

export default async function VideosPage() {
  const videos = await getFeaturedVideosData();
  return <VideosClientView videos={videos} />;
}
