"use client";

import { useState } from "react";
import type { BlogPost } from "@/lib/types/blog.types";
import AdminNavbar from "../AdminNavbar";
import BlogManager from "../BlogManager";

export default function BlogsWorkspace({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [blogPosts, setBlogPosts] = useState(initialPosts);

  return (
    <main className="admin-shell" style={{ padding: "16px 28px 100px", minHeight: "100vh", background: "#f2f5f7" }}>
      <AdminNavbar activeTab="blogs" />

      <div className="admin-workspace admin-blog-workspace" style={{ width: "100%", maxWidth: "none", margin: 0 }}>
        <BlogManager initialPosts={blogPosts} onPostsChange={setBlogPosts} />
      </div>
    </main>
  );
}
