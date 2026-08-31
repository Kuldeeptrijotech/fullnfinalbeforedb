"use client";

import { useRef, useState } from "react";

const ACCEPTED = ["image/jpeg", "image/png", "image/svg+xml", "image/webp"];
const MAX_BYTES = 5 * 1024 * 1024;

type Props = {
  id: string;
  label: string;
  value: string;
  alt: string;
  onUploaded: (path: string) => void;
  onError: (message: string) => void;
  onRemove?: () => void;
};

export default function ImageUploadField({ id, label, value, alt, onUploaded, onError, onRemove }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function upload(file?: File) {
    if (!file) return;
    if (!ACCEPTED.includes(file.type)) return onError("Use a JPG, JPEG, PNG, SVG, or WebP image.");
    if (!file.size || file.size > MAX_BYTES) return onError("Image must be smaller than 5 MB.");
    setUploading(true);
    try {
      const form = new FormData();
      form.append("image", file);
      const response = await fetch("/api/admin/images", { method: "POST", body: form });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Upload failed.");
      onUploaded(result.path);
    } catch (reason) {
      onError(reason instanceof Error ? reason.message : "The image could not be uploaded.");
    } finally {
      setUploading(false);
      if (input.current) input.current.value = "";
    }
  }

  const filename = value ? decodeURIComponent(value.split("/").pop()?.split("?")[0] || value) : "No image selected";

  return (
    <section className="admin-image-manager" aria-labelledby={id + "-label"}>
      <div className="admin-image-manager-heading">
        <div><span className="admin-eyebrow">Image Management</span><strong id={id + "-label"}>{label}</strong></div>
        <span className="admin-image-filename" title={filename}>{filename}</span>
      </div>
      {value ? <div className="admin-image-preview"><img src={value} alt={alt || label + " preview"} /></div> : <div className="admin-image-preview admin-image-preview-empty">No image selected</div>}
      <div className={"admin-image-dropzone " + (dragging ? "is-dragging" : "")} onDragEnter={(event) => { event.preventDefault(); setDragging(true); }} onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={(event) => { event.preventDefault(); setDragging(false); }} onDrop={(event) => { event.preventDefault(); setDragging(false); void upload(event.dataTransfer.files[0]); }}>
        <input ref={input} id={id} type="file" accept=".jpg,.jpeg,.png,.svg,.webp,image/jpeg,image/png,image/svg+xml,image/webp" onChange={(event) => void upload(event.target.files?.[0])} disabled={uploading} />
        <p>{uploading ? "Uploading image..." : "Drag and drop an image here"}</p>
        <small>JPG, PNG, SVG or WebP. Maximum 5 MB.</small>
        <div className="flex flex-wrap justify-center gap-2">
          <button type="button" className="admin-secondary-button" onClick={() => input.current?.click()} disabled={uploading} aria-label={(value ? "Replace " : "Upload ") + label}>{uploading ? "Uploading..." : value ? "Replace Image" : "Upload New Image"}</button>
          {value && onRemove && <button type="button" className="admin-danger-button" onClick={onRemove} disabled={uploading}>Remove Image</button>}
        </div>
      </div>
    </section>
  );
}
