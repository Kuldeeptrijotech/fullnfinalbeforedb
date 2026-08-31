"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Blog } from "@/lib/types/blog.types";
import BlogCard from "./common/BlogCard";

export default function LatestBlogsCarousel({ initialBlogs = [] }: { initialBlogs?: Blog[] }) {
  const [blogList, setBlogList] = useState<Blog[]>(initialBlogs);
  const viewport = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (initialBlogs.length > 0) {
      setBlogList(initialBlogs);
      return;
    }
    fetch("/api/admin/blogs")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data)) {
          const formatted: Blog[] = data
            .filter((p: any) => p.status === "published")
            .map((p: any) => ({
              title: p.title,
              category: p.category || "General",
              readTime: "5 min read",
              author: p.author || "Trijotech",
              date: p.publishedAt ? new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(p.publishedAt)) : "Recent",
              description: p.shortDescription || "",
              link: `/blogs/${p.slug}`,
              image: p.featuredImage || "/assets/heroes/blogs-blue.png",
              badgeTone: "cyan" as const,
            }));
          setBlogList(formatted);
        }
      })
      .catch(() => {});
  }, [initialBlogs]);

  const count = blogList.length;
  const move = useCallback(
    (next: number) => {
      if (count === 0) return;
      const value = (next + count) % count;
      setIndex(value);
      const first = viewport.current?.querySelector<HTMLElement>("article");
      if (viewport.current && first) {
        viewport.current.scrollTo({ left: value * (first.offsetWidth + 20), behavior: "smooth" });
      }
    },
    [count]
  );

  useEffect(() => {
    if (count <= 1) return;
    const timer = window.setInterval(() => move(index + 1), 4000);
    return () => window.clearInterval(timer);
  }, [index, move, count]);

  if (count === 0) return null;

  return (
    <section className="bg-[#162032] px-[clamp(18px,5vw,72px)] pb-[76px] pt-16 max-[640px]:px-4 max-[640px]:pb-[60px] max-[640px]:pt-12 border-t border-white/5" aria-labelledby="latest-blogs-title">
      <div className="mb-7 flex items-end justify-between p-0 max-w-7xl mx-auto">
        <div className="p-0">
          <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">Keep exploring</span>
          <h2 id="latest-blogs-title" className="text-2xl sm:text-3xl font-bold text-white mt-1">Latest <em className="text-white not-italic">Blogs</em></h2>
        </div>
        <div className="flex gap-2">
          <button className="h-9 w-9 rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/10 transition-colors flex items-center justify-center font-bold" type="button" onClick={() => move(index - 1)} aria-label="Previous blogs">‹</button>
          <button className="h-9 w-9 rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/10 transition-colors flex items-center justify-center font-bold" type="button" onClick={() => move(index + 1)} aria-label="Next blogs">›</button>
        </div>
      </div>
      <div className="overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-w-7xl mx-auto" ref={viewport}>
        <div className="flex items-stretch gap-5">
          {blogList.map((blog) => (
            <BlogCard blog={blog} variant="carousel" key={blog.link} />
          ))}
        </div>
      </div>
    </section>
  );
}
