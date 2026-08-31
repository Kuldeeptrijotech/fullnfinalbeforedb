"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import BlogsThoughtAuroras from "@/components/ui/hero-animations/BlogsThoughtAuroras";
import type { Blog } from "@/lib/types/blog.types";

export default function BlogsListing({ blogs }: { blogs: Blog[] }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const visibleBlogs = useMemo(
    () =>
      normalizedQuery
        ? blogs.filter((blog) =>
          `${blog.title} ${blog.description}`
            .toLowerCase()
            .includes(normalizedQuery),
        )
        : blogs,
    [blogs, normalizedQuery],
  );

  return (
    <main className="public-alternating-page font-sans overflow-hidden bg-[#030713] text-white">
      {/* ──── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-[#050817] pt-24 sm:pt-28 lg:pt-24 pb-12">
        <Image
          src="/assets/heroes/blogs-blue.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-95"
        />
        {/* Slow drifting thought particles & connections */}
        <BlogsThoughtAuroras />

        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(5,8,23,0.85)_0%,rgba(5,8,23,0.45)_50%,rgba(5,8,23,0.15)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#050817] to-transparent" />
        {/* Floating orbs */}
        <div className="pointer-events-none absolute right-1/4 top-1/4 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute bottom-1/3 left-1/3 h-56 w-56 rounded-full bg-indigo-400/8 blur-3xl animate-float-reverse" />
        <div className="mx-auto flex min-h-[calc(100svh-9.5rem)] w-full max-w-7xl items-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="max-w-3xl text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Ideas that move business forward
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="mt-6 max-w-2xl text-base font-normal leading-[1.7] text-white/80 sm:text-lg"
            >
              Explore practical perspectives on SAP, analytics, integration,
              automation, and digital transformation.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.52 }}
              className="mt-9 flex flex-wrap gap-4 relative z-10"
            >
              <a
                href="#explore-blogs"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 border-0 shadow-[0_8px_20px_rgba(255,255,255,0.25)] hover:shadow-[0_12px_28px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:translate-y-0 relative z-10 hover:z-20 transition-all duration-200"
              >
                Explore blogs <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-white border border-white/20 bg-white/5 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 relative z-10 hover:z-20 transition-all duration-200"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Clean bottom separator */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/[0.08]" />
      </section>

      {/* ──── Explore Blogs ──────────────────────────────────────────── */}
      <section
        id="explore-blogs"
        className="relative isolate overflow-hidden bg-[#a8c0f1] bg-[radial-gradient(circle_at_15%_20%,#85a1da_0%,transparent_45%),radial-gradient(circle_at_70%_15%,#9eb6ce_0%,transparent_50%),radial-gradient(circle_at_35%_65%,#9cafda_0%,transparent_55%),radial-gradient(circle_at_85%_70%,#97b3f0_0%,transparent_50%),radial-gradient(circle_at_10%_90%,#c2dbec_0%,transparent_40%)] bg-blend-screen py-12 sm:py-14 lg:py-16 border-b border-slate-200 text-slate-900"
      >
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-900">
                Explore
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                Insights shaped by experience
              </h2>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                Stay current with expert thinking, implementation guidance, and
                technology updates from the Trijotech team.
              </p>
            </div>
            <label className="relative block">
              <span className="sr-only">Search blogs</span>
              <Search
                className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search articles..."
                className="h-11 w-full rounded-full border border-slate-300 bg-white pl-11 pr-4 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-300/40"
              />
            </label>
          </div>

          {visibleBlogs.length ? (
            <div className="mt-7 sm:mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3 items-stretch">
              {visibleBlogs.map((blog, i) => (
                <motion.article
                  key={blog.link}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_6px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:border-slate-400 hover:shadow-[0_16px_36px_rgba(0,0,0,0.12)]"
                >
                  <Link
                    href={blog.link}
                    className="no-underline relative m-2.5 mb-0 block aspect-[16/10] shrink-0 overflow-hidden rounded-xl bg-slate-900"
                  >
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover scale-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.12]"
                    />
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(14,26,44,0.7)] via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-2.5 py-1 text-[11px] font-semibold text-white shadow-lg">
                      <CalendarDays className="h-3 w-3 text-white" aria-hidden="true" />
                      {blog.date}
                    </span>
                  </Link>
                  <div className="flex flex-1 flex-col px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                    <Link href={blog.link} className="group/title">
                      <h3 className="text-base sm:text-lg font-bold leading-snug text-slate-900 transition-colors group-hover/title:text-slate-700">
                        {blog.title}
                      </h3>
                    </Link>
                    <p className="mt-2 line-clamp-2 flex-1 text-xs sm:text-sm leading-relaxed text-slate-600">
                      {blog.description}
                    </p>
                    <div className="mt-4 h-px bg-slate-200" />
                    <div className="mt-auto pt-3.5">
                      <Link
                        href={blog.link}
                        className="inline-flex w-fit items-center gap-1.5 text-xs sm:text-sm font-bold text-cyan-600 transition-all duration-200 hover:gap-2 hover:text-cyan-700"
                      >
                        Read article <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="mt-14 rounded-3xl border border-slate-200 bg-slate-50 px-6 py-16 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900">
                No articles found
              </h3>
              <p className="mt-3 text-slate-600">
                Try a different keyword to explore our insights.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

