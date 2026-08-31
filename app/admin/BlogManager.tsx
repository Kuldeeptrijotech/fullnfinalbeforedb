"use client";

import { useMemo, useState } from "react";
import type { BlogPost } from "@/lib/types/blog.types";
import BlogActions from "./blog/BlogActions";
import BlogDetailsForm from "./blog/BlogDetailsForm";
import BlogPostList from "./blog/BlogPostList";

const emptyPost = (): BlogPost => ({ id: "", title: "", slug: "", shortDescription: "", content: "", contentImages: [], contentBlocks: [], featuredImage: "", featuredImageStyle: { width: "100", align: "center", maxHeight: "640", objectFit: "contain", borderRadius: "16" }, imageAlt: "", author: "Trijotech", category: "", tags: [], publishedAt: null, updatedAt: "", status: "draft", seoTitle: "", seoDescription: "" });
const slugify = (value: string) => value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 100);

export default function BlogManager({ initialPosts, onPostsChange, createOnly = false }: { initialPosts: BlogPost[]; onPostsChange: (posts: BlogPost[]) => void; createOnly?: boolean }) {
  const [posts, setPosts] = useState(initialPosts);
  const [editing, setEditing] = useState<BlogPost | null>(() => createOnly ? emptyPost() : null);
  const [query, setQuery] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [stagedImages, setStagedImages] = useState<string[]>([]);
  const visiblePosts = useMemo(() => { const search = query.trim().toLowerCase(); return search ? posts.filter((post) => `${post.title} ${post.category} ${post.status}`.toLowerCase().includes(search)) : posts; }, [posts, query]);

  const update = <K extends keyof BlogPost>(key: K, value: BlogPost[K]) => setEditing((current) => current ? { ...current, [key]: value } : current);
  const updateTitle = (title: string) => setEditing((current) => current ? { ...current, title, slug: slugTouched ? current.slug : slugify(title), seoTitle: current.seoTitle === current.title || !current.seoTitle ? title : current.seoTitle } : current);
  const startNew = () => { if (!createOnly) { window.location.assign("/admin/createblog"); return; } setEditing(emptyPost()); setSlugTouched(false); setStagedImages([]); setNotice(null); };
  const startEdit = (post: BlogPost) => { const contentBlocks = post.contentBlocks?.length ? [...post.contentBlocks] : post.content ? [{ id: `block-${crypto.randomUUID().slice(0, 10)}`, type: "content" as const, value: post.content, imageSrc: "", imageAlt: "", caption: "", linkUrl: "", style: { textAlign: "left" as const, fontSize: "medium" as const, textColor: "", backgroundColor: "", spacing: "normal" as const, imageWidth: "100" as const, imageAlign: "center" as const, borderRadius: "16" as const } }] : []; setEditing({ ...post, tags: [...post.tags], contentImages: [...(post.contentImages || [])], contentBlocks }); setSlugTouched(true); setStagedImages([]); setNotice(null); };
  const discardImages = async () => { await Promise.all(stagedImages.map((path) => fetch("/api/admin/images", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path }) }).catch(() => undefined))); setStagedImages([]); };
  const cancel = async () => { await discardImages(); if (createOnly) { window.location.assign("/admin"); return; } setEditing(null); setNotice({ type: "success", text: "Blog editing cancelled. No changes were published." }); };

  async function save(status: "draft" | "published", previewAfter = false) {
    if (!editing) return;
    const previewWindow = previewAfter ? window.open("about:blank", "_blank") : null;
    setBusy(true); setNotice(null);
    try { const response = await fetch("/api/admin/blogs", { method: editing.id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...editing, status }) }); const result = await response.json(); if (!response.ok) throw new Error(result.error || "The blog could not be saved."); if (result.post?.status !== status) throw new Error(`The blog was not saved as ${status}.`); setPosts(result.posts); onPostsChange(result.posts); setEditing(result.post); setSlugTouched(true); setStagedImages([]); setNotice({ type: "success", text: status === "published" ? `Published at /blogs/${result.post.slug}` : "Draft saved successfully." }); if (previewWindow) previewWindow.location.href = `/blogs/${result.post.slug}?adminPreview=1`; else if (status === "published") window.location.assign(`/blogs/${result.post.slug}`); }
    catch (reason) { previewWindow?.close(); setNotice({ type: "error", text: reason instanceof Error ? reason.message : "The blog could not be saved." }); }
    finally { setBusy(false); }
  }

  async function remove() {
    if (!editing?.id || !window.confirm(`Delete “${editing.title}”? This cannot be undone.`)) return;
    setBusy(true);
    try { const response = await fetch("/api/admin/blogs", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing.id }) }); const result = await response.json(); if (!response.ok) throw new Error(result.error || "Delete failed."); setPosts(result.posts); onPostsChange(result.posts); setEditing(null); setNotice({ type: "success", text: "Blog deleted successfully." }); }
    catch (reason) { setNotice({ type: "error", text: reason instanceof Error ? reason.message : "The blog could not be deleted." }); }
    finally { setBusy(false); }
  }

  return <div className="admin-blog-manager"><div className="admin-blog-toolbar"><div><p className="admin-eyebrow">Blog Studio</p><h2>{editing ? editing.id ? "Edit blog" : "Create new blog" : "Manage your blogs"}</h2><span>{editing ? "Build, style, preview, and publish your article." : "Select an existing article or begin a new one."}</span></div><button type="button" className="admin-primary-button" onClick={startNew}>Create New Blog</button></div>{notice && <div className={`admin-blog-notice ${notice.type}`} role="status">{notice.text}</div>}<div className={`admin-blog-layout ${editing ? "is-editing" : ""}`}>{!editing && <BlogPostList posts={visiblePosts} query={query} onQueryChange={setQuery} onSelect={startEdit} />}<section className="admin-blog-editor">{!editing ? <div className="admin-empty-state"><h2>Select a blog or create a new one</h2><p>Draft, preview, publish, update, or remove blog posts from this workspace.</p></div> : <><BlogDetailsForm post={editing} onUpdate={update} onTitleChange={updateTitle} onSlugChange={(slug) => { setSlugTouched(true); update("slug", slugify(slug)); }} onImageUploaded={(path, kind) => { setStagedImages((current) => [...current, path]); setNotice({ type: "success", text: `${kind === "featured" ? "Featured" : "Content"} image uploaded. Save the blog to keep it.` }); }} onError={(text) => setNotice({ type: "error", text })}/><BlogActions post={editing} busy={busy} onSave={(status, preview) => void save(status, preview)} onCancel={() => void cancel()} onDelete={() => void remove()}/></>}</section></div></div>;
}
