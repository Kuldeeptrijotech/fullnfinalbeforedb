"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ImageSlider from "../components/common/ImageSlider";
import { motion } from "framer-motion";
import CaseStudiesVectorTrails from "@/components/ui/hero-animations/CaseStudiesVectorTrails";
import type { CaseStudyData } from "@/lib/services/case-studies.service";

export default function CaseStudiesPage({ dbStudies = [] }: { dbStudies?: CaseStudyData[] }) {
  return (
    <main className="public-alternating-page overflow-hidden bg-[#121927] text-white">
      {/* ──── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-[#050817] pt-24 sm:pt-28 lg:pt-24 pb-12">
        <Image
          src="/assets/case-studies/financial-analysis-team.png"
          alt="Business team reviewing financial analysis and performance reports"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-95"
        />
        {/* Slow ascending growth curves animation */}
        <CaseStudiesVectorTrails />

        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(5,8,23,0.85)_0%,rgba(5,8,23,0.45)_50%,rgba(5,8,23,0.15)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#050817] to-transparent" />

        {/* Floating orbs */}
        <div className="pointer-events-none absolute right-1/3 top-1/4 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute bottom-1/4 left-1/4 h-56 w-56 rounded-full bg-indigo-400/8 blur-3xl animate-float-reverse" />

        <div className="mx-auto flex min-h-[calc(100svh-9.5rem)] w-full max-w-7xl items-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Proven SAP results for global enterprises
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="mt-6 text-base font-normal leading-[1.7] text-white/80 sm:text-lg"
            >
              Explore how Trijotech helped organizations transform SAP landscapes, automate financial workflows, and unlock actionable insights.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative z-10"
            >
              <a
                href="#case-studies"
                className="mt-9 inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 border-0 shadow-[0_8px_20px_rgba(255,255,255,0.25)] hover:shadow-[0_12px_28px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:translate-y-0 relative z-10 hover:z-20 transition-all duration-200"
              >
                Explore case studies <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Clean bottom separator */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/[0.08]" />
      </section>

      {/* ──── Case Studies from Database ────────────────────────────────────────────── */}
      <div id="case-studies" className="divide-y divide-slate-200">
        {dbStudies.map((study, index) => {
          const isWhite = index % 2 === 0;
          const description = study.challenge
            ? `${study.challenge} ${study.solution}`
            : "";

          return (
            <section
              className={
                isWhite
                  ? "relative isolate overflow-hidden bg-white py-12 sm:py-14 lg:py-16 text-slate-900 border-b border-slate-200"
                  : "relative isolate overflow-hidden bg-[#050817] py-12 sm:py-14 lg:py-16 text-white border-b border-white/10"
              }
              key={study.slug || index}
            >
              <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
                <motion.div
                  initial={{ opacity: 0, x: isWhite ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  className="max-w-4xl"
                >
                  <motion.p
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className={`font-mono text-xs font-bold uppercase tracking-[0.2em] ${isWhite ? "text-slate-900" : "text-[#38bdf8]"}`}
                  >
                    Case study {String(index + 1).padStart(2, "0")} {study.industry ? `• ${study.industry}` : ""}
                  </motion.p>
                  <h2
                    className={`mt-2 text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl ${
                      isWhite ? "text-slate-900" : "text-white"
                    }`}
                  >
                    {study.title}
                  </h2>
                  {description && (
                    <p
                      className={`mt-2 max-w-3xl text-xs sm:text-sm leading-relaxed ${
                        isWhite ? "text-slate-600" : "text-slate-300"
                      }`}
                    >
                      {description}
                    </p>
                  )}
                  {study.outcome && (
                    <div className="mt-3 inline-block rounded-lg bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400">
                      <strong>Impact:</strong> {study.outcome}
                    </div>
                  )}
                </motion.div>

                {study.images && study.images.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    className="mx-auto mt-7 max-w-3xl sm:mt-9"
                  >
                    <ImageSlider images={study.images} label={`Case study ${index + 1}`} />
                  </motion.div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
