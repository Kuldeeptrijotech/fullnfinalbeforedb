import prisma from "@/app/lib/db";
import type { BlogPost } from "@/app/data/blogs";
import type { BlogStatus, Prisma } from "@prisma/client";

export async function getAllBlogPostsFromDb(includeDrafts = false): Promise<BlogPost[]> {
  const where: Prisma.BlogPostWhereInput = {
    deletedAt: null,
  };

  if (!includeDrafts) {
    where.status = "published";
  }

  const posts = await prisma.blogPost.findMany({
    where,
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });

  return posts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    shortDescription: p.shortDescription,
    content: p.content,
    contentBlocks: (p.contentBlocks as BlogPost["contentBlocks"]) || [],
    contentImages: (p.contentImages as BlogPost["contentImages"]) || [],
    featuredImage: p.featuredImage,
    featuredImageStyle: (p.featuredImageStyle as BlogPost["featuredImageStyle"]) || undefined,
    imageAlt: p.imageAlt || "",
    author: p.author || "Trijotech",
    category: p.category || "General",
    tags: p.tags || [],
    status: p.status as BlogPost["status"],
    publishedAt: p.publishedAt ? p.publishedAt.toISOString() : null,
    updatedAt: p.updatedAt.toISOString(),
    seoTitle: p.seoTitle || "",
    seoDescription: p.seoDescription || "",
  }));
}

export async function getBlogPostBySlugFromDb(slug: string, includeDrafts = false): Promise<BlogPost | null> {
  const where: Prisma.BlogPostWhereInput = {
    slug,
    deletedAt: null,
  };

  if (!includeDrafts) {
    where.status = "published";
  }

  const p = await prisma.blogPost.findFirst({ where });
  if (!p) return null;

  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    shortDescription: p.shortDescription,
    content: p.content,
    contentBlocks: (p.contentBlocks as BlogPost["contentBlocks"]) || [],
    contentImages: (p.contentImages as BlogPost["contentImages"]) || [],
    featuredImage: p.featuredImage,
    featuredImageStyle: (p.featuredImageStyle as BlogPost["featuredImageStyle"]) || undefined,
    imageAlt: p.imageAlt || "",
    author: p.author || "Trijotech",
    category: p.category || "General",
    tags: p.tags || [],
    status: p.status as BlogPost["status"],
    publishedAt: p.publishedAt ? p.publishedAt.toISOString() : null,
    updatedAt: p.updatedAt.toISOString(),
    seoTitle: p.seoTitle || "",
    seoDescription: p.seoDescription || "",
  };
}

export async function saveBlogPostToDb(post: BlogPost): Promise<BlogPost> {
  const data: Prisma.BlogPostUpsertArgs["create"] = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    shortDescription: post.shortDescription,
    content: post.content || "",
    contentBlocks: (post.contentBlocks || []) as unknown as Prisma.InputJsonValue,
    contentImages: (post.contentImages || []) as unknown as Prisma.InputJsonValue,
    featuredImage: post.featuredImage || "",
    featuredImageStyle: (post.featuredImageStyle || {}) as unknown as Prisma.InputJsonValue,
    imageAlt: post.imageAlt || "",
    author: post.author || "Trijotech",
    category: post.category || "General",
    tags: post.tags || [],
    status: (post.status === "published" ? "published" : "draft") as BlogStatus,
    publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
    seoTitle: post.seoTitle || null,
    seoDescription: post.seoDescription || null,
  };

  const saved = await prisma.blogPost.upsert({
    where: { id: post.id },
    create: data,
    update: {
      title: post.title,
      slug: post.slug,
      shortDescription: post.shortDescription,
      content: post.content || "",
      contentBlocks: (post.contentBlocks || []) as unknown as Prisma.InputJsonValue,
      contentImages: (post.contentImages || []) as unknown as Prisma.InputJsonValue,
      featuredImage: post.featuredImage || "",
      featuredImageStyle: (post.featuredImageStyle || {}) as unknown as Prisma.InputJsonValue,
      imageAlt: post.imageAlt || "",
      author: post.author || "Trijotech",
      category: post.category || "General",
      tags: post.tags || [],
      status: (post.status === "published" ? "published" : "draft") as BlogStatus,
      publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
      seoTitle: post.seoTitle || null,
      seoDescription: post.seoDescription || null,
      updatedAt: new Date(),
    },
  });

  return {
    id: saved.id,
    title: saved.title,
    slug: saved.slug,
    shortDescription: saved.shortDescription,
    content: saved.content,
    contentBlocks: (saved.contentBlocks as BlogPost["contentBlocks"]) || [],
    contentImages: (saved.contentImages as BlogPost["contentImages"]) || [],
    featuredImage: saved.featuredImage,
    featuredImageStyle: (saved.featuredImageStyle as BlogPost["featuredImageStyle"]) || undefined,
    imageAlt: saved.imageAlt || "",
    author: saved.author || "Trijotech",
    category: saved.category || "General",
    tags: saved.tags || [],
    status: saved.status as BlogPost["status"],
    publishedAt: saved.publishedAt ? saved.publishedAt.toISOString() : null,
    updatedAt: saved.updatedAt.toISOString(),
    seoTitle: saved.seoTitle || "",
    seoDescription: saved.seoDescription || "",
  };
}

export async function deleteBlogPostFromDb(id: string): Promise<boolean> {
  const result = await prisma.blogPost.update({
    where: { id },
    data: { deletedAt: new Date() },
  }).catch(() => null);

  return result !== null;
}
