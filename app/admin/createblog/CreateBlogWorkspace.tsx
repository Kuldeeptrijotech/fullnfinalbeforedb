"use client";

import { useEffect, useState } from "react";
import type { BlogPost } from "@/lib/types/blog.types";
import AdminNavbar from "../AdminNavbar";
import BlogManager from "../BlogManager";
import styles from "./createblog.module.css";

export default function CreateBlogWorkspace({ initialPosts }: { initialPosts: BlogPost[] }) {
  return (
    <main className={styles.createBlogPage}>
      {/* Shared Admin Navigation */}
      <AdminNavbar activeTab="createblog" />

      {/* Hero Banner */}
      <header className={styles.routeHeader}>
        <div>
          <span>TRIJOTECH CONTENT STUDIO</span>
          <h1>Create a new blog</h1>
          <p>Write, design, preview, and publish from one focused workspace.</p>
        </div>
        <a href="/blogs" target="_blank" rel="noreferrer" className={styles.viewBlogs}>
          View Live Blogs
        </a>
      </header>

      {/* Full-width Block Studio */}
      <BlogManager initialPosts={initialPosts} onPostsChange={() => undefined} createOnly />
    </main>
  );
}