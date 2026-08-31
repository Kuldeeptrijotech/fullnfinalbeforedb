import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import LegacyHtmlPage from "../../components/LegacyHtmlPage";
import ManagedBlogPage from "../../components/ManagedBlogPage";
import { legacyBlogPages } from "../../data/legacyPages";
import { hasPersistentBlogStore, readBlogPosts } from "@/app/lib/blog-store";
import { SESSION_COOKIE, verifySessionToken } from "@/app/lib/admin-auth";

type Slug = keyof typeof legacyBlogPages;
const asciiSlug = (slug: string) => slug.replace(/[–—]/g, "-");
const getLegacyPage = (slug: string) =>
  legacyBlogPages[slug as Slug] ??
  Object.entries(legacyBlogPages).find(([key]) => asciiSlug(key) === slug)?.[1];

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const managed = (await readBlogPosts()).find(
    (post) => post.slug === slug && post.status === "published",
  );
  if (managed)
    return {
      title: managed.seoTitle || managed.title,
      description: managed.seoDescription || managed.shortDescription,
    };
  const legacy = getLegacyPage(slug);
  return legacy ? { title: legacy.title, description: legacy.description || undefined } : {};
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [{ slug }, query, cookieStore, persistent, posts] = await Promise.all([
    params,
    searchParams,
    cookies(),
    hasPersistentBlogStore(),
    readBlogPosts(),
  ]);
  const managed = posts.find((post) => post.slug === slug);
  const adminPreview =
    query.adminPreview === "1" &&
    verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
  const hasManagedContent = Boolean(
    managed?.content?.trim() || (managed?.contentBlocks as unknown as any[])?.length,
  );
  if (managed && hasManagedContent && (managed.status === "published" || adminPreview))
    return <ManagedBlogPage post={managed} preview={managed.status === "draft"} />;
  if (managed?.status === "draft") notFound();
  const legacy = getLegacyPage(slug);
  if ((!managed && persistent) || !legacy) notFound();
  return (
    <LegacyHtmlPage
      title={legacy.title}
      description={legacy.description}
      blocks={legacy.blocks}
      className="legacy-content-page legacy-blog-page"
    />
  );
}
