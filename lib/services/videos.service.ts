import prisma from "@/app/lib/db";

export type VideoData = {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  youtubeUrl: string;
};

export async function getFeaturedVideosData(): Promise<VideoData[]> {
  try {
    const videos = await prisma.featuredVideo.findMany({
      orderBy: { sortOrder: "asc" },
    });

    return videos.map((v) => ({
      id: v.id,
      title: v.title,
      description: v.description,
      youtubeId: v.youtubeId,
      youtubeUrl: v.youtubeUrl,
    }));
  } catch (error) {
    console.error("Error fetching featured videos from PostgreSQL:", error);
    throw error;
  }
}
