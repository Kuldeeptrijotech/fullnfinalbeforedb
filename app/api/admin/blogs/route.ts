import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, verifyAdminSession, SESSION_COOKIE } from "@/app/lib/admin-auth";
import { defaultBlogBlockStyle, defaultFeaturedImageStyle, readBlogPosts, uniqueSlug, validateBlogPost, writeBlogStore } from "@/app/lib/blog-store";
import { logAuditEvent } from "@/lib/services/audit.service";
import type { BlogPost } from "@/lib/types/blog.types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const forbidden = () => NextResponse.json({ error: "Unauthorized." }, { status: 401 });
const sameOrigin = (request: NextRequest) => !request.headers.get("origin") || request.headers.get("origin") === request.nextUrl.origin;

function cleanPost(input: Partial<BlogPost>, posts: BlogPost[], id: string, existing?: BlogPost): BlogPost {
  const now = new Date().toISOString();
  const status = input.status === "published" ? "published" : "draft";
  const requestedSlug = typeof input.slug === "string" && input.slug.trim() ? input.slug : input.title || "blog";
  return {
    id,
    title: String(input.title || "").trim(),
    slug: uniqueSlug(requestedSlug, posts, id),
    shortDescription: String(input.shortDescription || "").trim(),
    content: String(input.content || "").trim(),
    contentImages: Array.isArray(input.contentImages) ? input.contentImages.map((image) => ({ id: String(image.id || "").trim(), src: String(image.src || "").trim(), alt: String(image.alt || "").trim(), caption: String(image.caption || "").trim() })) : [],
    contentBlocks: Array.isArray(input.contentBlocks) ? input.contentBlocks.map((block) => {
      const requestedLevel = Number(block.headingLevel);
      const headingLevel = Number.isInteger(requestedLevel) && requestedLevel >= 1 && requestedLevel <= 6
        ? requestedLevel as 1 | 2 | 3 | 4 | 5 | 6
        : block.type === "heading" ? 2 : block.type === "subheading" ? 3 : undefined;
      return { id: String(block.id || "").trim(), type: block.type, value: String(block.value || "").trim(), imageSrc: String(block.imageSrc || "").trim(), imageAlt: String(block.imageAlt || "").trim(), caption: String(block.caption || "").trim(), linkUrl: String(block.linkUrl || "").trim(), headingLevel, style: { ...defaultBlogBlockStyle(), ...(block.style || {}) } };
    }) : [],
    featuredImage: String(input.featuredImage || "").trim(),
    featuredImageStyle: { ...defaultFeaturedImageStyle(), ...(input.featuredImageStyle || {}) },
    imageAlt: String(input.imageAlt || "").trim(),
    author: String(input.author || "").trim(),
    category: String(input.category || "").trim(),
    tags: Array.isArray(input.tags) ? input.tags.map((tag) => String(tag).trim()).filter(Boolean) : [],
    publishedAt: status === "published" ? existing?.publishedAt || now : null,
    updatedAt: now,
    status,
    seoTitle: String(input.seoTitle || "").trim(),
    seoDescription: String(input.seoDescription || "").trim(),
  };
}

function refreshed(post?: BlogPost) {
  revalidatePath("/blogs");
  if (post) revalidatePath(`/blogs/${post.slug}`);
}

export async function GET(request: NextRequest) {
  if (!(await isAdminRequest(request))) return forbidden();
  return NextResponse.json({ posts: await readBlogPosts() }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  if (!(await isAdminRequest(request)) || !sameOrigin(request)) return forbidden();
  try {
    const input = (await request.json()) as Partial<BlogPost>;
    const posts = await readBlogPosts();
    const post = cleanPost(input, posts, randomUUID());
    const error = validateBlogPost(post);
    if (error) return NextResponse.json({ error }, { status: 400 });
    posts.unshift(post);
    await writeBlogStore(posts);
    refreshed(post);

    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const user = await verifyAdminSession(token);
    await logAuditEvent({
      userId: user?.id,
      action: "BLOG_CREATED",
      entityType: "BlogPost",
      entityId: post.id,
      metadata: { title: post.title, slug: post.slug, status: post.status },
      ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1",
    });

    return NextResponse.json({ success: true, post, posts, route: `/blogs/${post.slug}` }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Unable to create blog in PostgreSQL", error);
    return NextResponse.json({ error: "The blog could not be created." }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminRequest(request)) || !sameOrigin(request)) return forbidden();
  try {
    const input = (await request.json()) as Partial<BlogPost>;
    if (!input.id) return NextResponse.json({ error: "Blog ID is required." }, { status: 400 });
    const posts = await readBlogPosts();
    const index = posts.findIndex((post) => post.id === input.id);
    if (index < 0) return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    const previous = posts[index];
    const post = cleanPost(input, posts, previous.id, previous);
    const error = validateBlogPost(post);
    if (error) return NextResponse.json({ error }, { status: 400 });
    posts[index] = post;
    await writeBlogStore(posts);
    refreshed(previous);
    refreshed(post);

    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const user = await verifyAdminSession(token);
    await logAuditEvent({
      userId: user?.id,
      action: post.status === "published" && previous.status !== "published" ? "BLOG_PUBLISHED" : "BLOG_UPDATED",
      entityType: "BlogPost",
      entityId: post.id,
      metadata: { title: post.title, slug: post.slug, status: post.status },
      ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1",
    });

    return NextResponse.json({ success: true, post, posts, route: `/blogs/${post.slug}` }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Unable to update blog in PostgreSQL", error);
    return NextResponse.json({ error: "The blog could not be updated." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAdminRequest(request)) || !sameOrigin(request)) return forbidden();
  try {
    const body = (await request.json()) as { id?: string };
    const posts = await readBlogPosts();
    const post = posts.find((candidate) => candidate.id === body.id);
    if (!post) return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    const next = posts.filter((candidate) => candidate.id !== post.id);
    await writeBlogStore(next);
    refreshed(post);

    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const user = await verifyAdminSession(token);
    await logAuditEvent({
      userId: user?.id,
      action: "BLOG_DELETED",
      entityType: "BlogPost",
      entityId: post.id,
      metadata: { title: post.title, slug: post.slug },
      ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1",
    });

    return NextResponse.json({ success: true, posts: next });
  } catch (error) {
    console.error("Unable to delete blog in PostgreSQL", error);
    return NextResponse.json({ error: "The blog could not be deleted." }, { status: 500 });
  }
}
