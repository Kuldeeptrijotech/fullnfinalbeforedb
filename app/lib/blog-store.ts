import type { Blog, BlogPost } from "@/lib/types/blog.types";
import { getAllBlogPostsFromDb, saveBlogPostToDb } from "./services/blog.service";

export type { Blog, BlogPost };

export const defaultBlogBlockStyle = () => ({
  textAlign: "left" as const,
  fontSize: "medium" as const,
  textColor: "",
  backgroundColor: "",
  spacing: "normal" as const,
  imageWidth: "100" as const,
  imageAlign: "center" as const,
  borderRadius: "16" as const,
  fontWeight: "400" as const,
  fontStyle: "normal" as const,
  textDecoration: "none" as const,
  lineHeight: "normal" as const,
  textTransform: "none" as const,
  padding: "0" as const,
  blockRadius: "0" as const,
  borderColor: "",
  imageMaxHeight: "auto" as const,
  imageObjectFit: "contain" as const,
  imageShadow: "soft" as const,
});

export const defaultFeaturedImageStyle = () => ({
  width: "100" as const,
  align: "center" as const,
  maxHeight: "640" as const,
  objectFit: "contain" as const,
  borderRadius: "16" as const,
});

export function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 100) || "blog"
  );
}

export function uniqueSlug(value: string, posts: BlogPost[], excludeId?: string) {
  const base = slugify(value);
  let candidate = base;
  let suffix = 2;
  while (posts.some((post) => post.id !== excludeId && post.slug === candidate)) candidate = `${base}-${suffix++}`;
  return candidate;
}

export async function readBlogPosts(): Promise<BlogPost[]> {
  try {
    const dbPosts = await getAllBlogPostsFromDb(true);
    return dbPosts;
  } catch (err) {
    console.error("Error loading blogs from PostgreSQL:", err);
    return [];
  }
}

export async function hasPersistentBlogStore(): Promise<boolean> {
  try {
    const dbPosts = await getAllBlogPostsFromDb(true);
    return dbPosts.length > 0;
  } catch {
    return false;
  }
}

export async function writeBlogStore(posts: BlogPost[]): Promise<void> {
  for (const post of posts) {
    await saveBlogPostToDb(post);
  }
}

export function toBlogCard(post: BlogPost): Blog {
  return {
    title: post.title,
    description: post.shortDescription,
    image: post.featuredImage || "/assets/heroes/blogs-blue.png",
    link: `/blogs/${post.slug}`,
    date: post.publishedAt
      ? new Intl.DateTimeFormat("en", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(post.publishedAt))
      : "Draft",
    category: post.category || "General",
    author: post.author || "Trijotech",
    readTime: "5 min read",
    badgeTone: "cyan",
  };
}

export function validateBlogPost(post: Partial<BlogPost>) {
  const required: Array<[keyof BlogPost, string]> = [
    ["title", "Title"],
    ["shortDescription", "Short description"],
    ["featuredImage", "Featured image"],
    ["imageAlt", "Image alt text"],
    ["author", "Author"],
    ["category", "Category"],
    ["seoTitle", "SEO title"],
    ["seoDescription", "SEO description"],
  ];
  for (const [key, label] of required) {
    if (typeof post[key] !== "string" || !(post[key] as string).trim()) {
      return `${label} is required.`;
    }
  }
  if (post.title!.length > 180 || post.seoTitle!.length > 180) return "Title fields must be 180 characters or fewer.";
  if (post.shortDescription!.length > 500 || post.seoDescription!.length > 500) return "Description fields must be 500 characters or fewer.";
  if (post.content && post.content.length > 200000) return "Blog content is too long.";
  if (!post.content?.trim() && (!Array.isArray(post.contentBlocks) || post.contentBlocks.length === 0)) return "Add at least one content block.";
  if (Array.isArray(post.contentBlocks) && post.contentBlocks.length > 100) return "Add no more than 100 content blocks.";
  if (post.status !== "draft" && post.status !== "published") return "Choose a valid blog status.";
  return null;
}
