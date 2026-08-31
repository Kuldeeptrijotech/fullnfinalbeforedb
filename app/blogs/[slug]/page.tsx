import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import ManagedBlogPage from "../../components/ManagedBlogPage";
import { getBlogPostBySlugFromDb } from "@/app/lib/services/blog.service";
import { SESSION_COOKIE, verifySessionToken } from "@/app/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlugFromDb(slug, true);
  if (post && post.status === "published") {
    return {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.shortDescription,
    };
  }
  return {
    title: "Blog",
    description: "Insights and technology updates from Trijotech.",
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [{ slug }, query, cookieStore] = await Promise.all([
    params,
    searchParams,
    cookies(),
  ]);

  const adminPreview =
    query.adminPreview === "1" &&
    verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);

  const post = await getBlogPostBySlugFromDb(slug, Boolean(adminPreview));

  if (!post) {
    notFound();
  }

  if (post.status === "draft" && !adminPreview) {
    notFound();
  }

  return <ManagedBlogPage post={post} preview={post.status === "draft"} />;
}
