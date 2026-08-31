"use client";

import Image from "next/image";
import { ArrowRight, ExternalLink, Play } from "lucide-react";
import { motion } from "framer-motion";
import type { VideoData } from "@/lib/services/videos.service";

export default function VideosClientView({ videos }: { videos: VideoData[] }) {
  return (
    <main className="public-alternating-page font-sans overflow-hidden bg-[#030713] text-white">
      {/* ──── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-[#050817] pt-24 sm:pt-28 lg:pt-24 pb-12">
        <div aria-hidden className="absolute inset-0 -z-40 tri-mesh" />
        <div aria-hidden className="absolute inset-0 -z-30 tri-hex-grid opacity-40" />

        <Image
          src="/assets/heroes/videos.png"
          alt="Trijotech Practitioner Videos and Technical Demos"
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-95"
        />

        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(3,7,19,0.85)_0%,rgba(3,7,19,0.45)_50%,rgba(3,7,19,0.15)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#050817] to-transparent" />

        <div className="mx-auto flex min-h-[calc(100svh-9.5rem)] w-full max-w-7xl items-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="max-w-3xl">
            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="max-w-3xl text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Explore videos from our practitioners
            </motion.h1>

            <motion.p
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="mt-6 max-w-2xl text-base font-normal leading-[1.7] text-white/80 sm:text-lg"
            >
              Watch breakdowns, architectural deep dives, and product walkthroughs explaining modern enterprise IT.
            </motion.p>

            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-9 flex flex-wrap gap-4 relative z-10"
            >
              <a
                href="#explore-videos"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 border-0 shadow-[0_8px_20px_rgba(255,255,255,0.25)] hover:shadow-[0_12px_28px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:translate-y-0 relative z-10 hover:z-20 transition-all duration-200"
              >
                Explore videos <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </div>

        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/[0.08]" />
      </section>

      {/* ──── Explore Videos from PostgreSQL ──────────────────────────────────────────── */}
      <section
        id="explore-videos"
        className="relative isolate overflow-hidden bg-[#a8c0f1] bg-[radial-gradient(circle_at_15%_20%,#85a1da_0%,transparent_45%),radial-gradient(circle_at_70%_15%,#9eb6ce_0%,transparent_50%),radial-gradient(circle_at_35%_65%,#9cafda_0%,transparent_55%),radial-gradient(circle_at_85%_70%,#97b3f0_0%,transparent_50%),radial-gradient(circle_at_10%_90%,#c2dbec_0%,transparent_40%)] bg-blend-screen py-12 sm:py-14 lg:py-16 border-b border-slate-200 text-slate-900"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="max-w-3xl"
          >
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-900">
              Watch and learn
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Insights from the Trijotech team
            </h2>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
              Explore concise, practical videos designed to turn complex enterprise technology topics into clear business direction.
            </p>
          </motion.div>

          <div className="mt-7 sm:mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 items-stretch">
            {videos.map((video, index) => {
              const thumbnail = video.youtubeId
                ? `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`
                : "";

              return (
                <motion.div
                  key={video.id || video.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="h-full"
                >
                  <a
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-full min-h-[410px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_6px_24px_rgba(0,0,0,0.06)] sm:min-h-[440px] transition-all duration-300 hover:border-slate-400 hover:shadow-[0_16px_36px_rgba(0,0,0,0.12)]"
                  >
                    <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-slate-900">
                      {thumbnail ? (
                        <Image
                          src={thumbnail}
                          alt={video.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover transition duration-700 group-hover:scale-108"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-slate-950 text-slate-500">
                          Video preview unavailable
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 shadow-xl transition-transform duration-300 group-hover:scale-115">
                          <Play className="ml-1 h-5 w-5 fill-current" />
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900">
                        Trijotech Video
                      </p>
                      <h3 className="mt-2 flex-1 text-base sm:text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-slate-700">
                        {video.title}
                      </h3>
                      <div className="mt-auto pt-4">
                        <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-cyan-600 transition-all duration-200 group-hover:gap-2.5 group-hover:text-cyan-700">
                          Watch video <ExternalLink className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
