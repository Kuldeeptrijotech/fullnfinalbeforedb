"use client";

import { useRef, useState } from "react";
import type { AnimationKind } from "@/app/lib/animation-config";

const ACCEPTED = ["video/mp4", "video/webm", "image/gif"];
const MAX_BYTES = 25 * 1024 * 1024;

type Props = {
  source: string;
  type: AnimationKind;
  onUploaded: (path: string) => void;
  onRemove: () => void;
  onError: (message: string) => void;
};

export default function AnimationUploadField({ source, type, onUploaded, onRemove, onError }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function upload(file?: File) {
    if (!file) return;
    if (!ACCEPTED.includes(file.type)) return onError("Use an MP4, WebM, or GIF animation.");
    if (!file.size || file.size > MAX_BYTES) return onError("Animation must be smaller than 25 MB.");
    setUploading(true);
    try {
      const form = new FormData();
      form.append("animation", file);
      const response = await fetch("/api/admin/images", { method: "POST", body: form });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Animation upload failed.");
      onUploaded(result.path);
    } catch (error) {
      onError(error instanceof Error ? error.message : "The animation could not be uploaded.");
    } finally {
      setUploading(false);
      if (input.current) input.current.value = "";
    }
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-3">
      <p className="admin-eyebrow">Current Animation</p>
      <div className="mb-3 overflow-hidden rounded-lg border border-slate-200 bg-slate-950">
        {source ? type === "gif" ? <img src={source} alt="Current animation preview" className="h-44 w-full object-contain" /> : <video key={source} src={source} className="h-44 w-full object-contain" autoPlay loop muted playsInline /> : <div className="grid h-32 place-items-center text-xs text-slate-400">No animation selected</div>}
      </div>
      <input ref={input} type="file" className="sr-only" accept=".mp4,.webm,.gif,video/mp4,video/webm,image/gif" onChange={(event) => void upload(event.target.files?.[0])} />
      <div className="flex flex-wrap gap-2">
        <button type="button" className="admin-secondary-button" onClick={() => input.current?.click()} disabled={uploading}>{uploading ? "Uploading..." : source ? "Replace Animation" : "Add Animation"}</button>
        {source && <button type="button" className="admin-danger-button" onClick={onRemove} disabled={uploading}>Delete Animation</button>}
      </div>
      <small className="mt-2 block text-slate-500">MP4, WebM, or GIF. Maximum 25 MB.</small>
    </section>
  );
}
