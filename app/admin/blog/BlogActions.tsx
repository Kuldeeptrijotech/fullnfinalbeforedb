import type { BlogPost } from "@/lib/types/blog.types";

export default function BlogActions({ post, busy, onSave, onCancel, onDelete }: { post: BlogPost; busy: boolean; onSave: (status: "draft" | "published", preview?: boolean) => void; onCancel: () => void; onDelete: () => void }) {
  return (
    <div className="admin-blog-actions">
      <div className="admin-blog-save-state">
        <span className={post.status} />
        <div>
          <strong>{post.status === "published" ? "Published blog" : "Draft blog"}</strong>
          <small>{busy ? "Saving changes…" : "Changes are saved only when you choose an action."}</small>
        </div>
      </div>
      <div className="admin-blog-action-buttons">
        <button type="button" className="admin-primary-button" onClick={() => onSave("published")} disabled={busy}>{busy ? "Saving…" : post.status === "published" ? "Save Changes" : "Publish"}</button>
        <button type="button" className="admin-secondary-button" onClick={() => onSave("draft")} disabled={busy}>Save Draft</button>
        <button type="button" className="admin-secondary-button" onClick={() => onSave("draft", true)} disabled={busy}>Preview</button>
        {post.status === "published" && <button type="button" className="admin-secondary-button" onClick={() => onSave("draft")} disabled={busy}>Unpublish</button>}
        <button type="button" className="admin-text-button" onClick={onCancel} disabled={busy}>Cancel</button>
        {post.id && <button type="button" className="admin-danger-button" onClick={onDelete} disabled={busy}>Delete</button>}
      </div>
    </div>
  );
}