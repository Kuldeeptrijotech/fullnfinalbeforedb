"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import SolutionsHoloRays from "@/components/ui/hero-animations/SolutionsHoloRays";
import OptimizedVideo from "@/components/ui/OptimizedVideo";
import type { SolutionDetailData } from "@/lib/services/solutions.service";

export default function SolutionsClientView({ solutions }: { solutions: SolutionDetailData[] }) {
  return (
    <main className="public-alternating-page font-sans overflow-hidden bg-[#030713] text-white">
      {/* ──── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-[#050817] pt-24 sm:pt-28 lg:pt-24 pb-12">
        <div aria-hidden className="absolute inset-0 -z-40 tri-mesh" />
        <div aria-hidden className="absolute inset-0 -z-30 tri-hex-grid opacity-55" />

        <Image
          src="/assets/heroes/products.png"
          alt="In-house SAP solutions and products"
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-95"
        />

        <SolutionsHoloRays />

        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(5,8,23,0.85)_0%,rgba(5,8,23,0.45)_50%,rgba(5,8,23,0.15)_100%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#050817] to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_75%_55%_at_12%_55%,rgba(255, 255, 255,0.13),transparent_68%)]" />

        <div aria-hidden className="pointer-events-none absolute right-1/4 top-1/4 -z-10 h-72 w-72 rounded-full bg-[rgba(255, 255, 255,0.16)] blur-3xl animate-float-slow" />
        <div aria-hidden className="pointer-events-none absolute bottom-1/3 left-1/3 -z-10 h-56 w-56 rounded-full bg-[rgba(255, 255, 255,0.12)] blur-3xl animate-float-reverse" />

        <div className="mx-auto flex min-h-[calc(100svh-9.5rem)] w-full max-w-7xl items-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-3xl text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Purpose-built platforms for modern SAP enterprises
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 max-w-2xl text-base font-normal leading-[1.7] text-white/80 sm:text-lg"
            >
              Extend your SAP investment with specialized tools for statutory compliance, financial consolidation, and operational profitability.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-9 flex flex-wrap gap-4 relative z-10"
            >
              <a
                href="#solutions-list"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 border-0 shadow-[0_8px_20px_rgba(255,255,255,0.25)] hover:shadow-[0_12px_28px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Explore Solutions <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-white border border-white/20 bg-white/5 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Schedule Demo
              </Link>
            </motion.div>
          </div>
        </div>

        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/[0.08]" />
      </section>

      {/* ──── Solutions Grid from PostgreSQL ──────────────────────────────────────── */}
      <section id="solutions-list" className="relative isolate overflow-hidden bg-[#a8c0f1] bg-[radial-gradient(circle_at_15%_20%,#85a1da_0%,transparent_45%),radial-gradient(circle_at_70%_15%,#9eb6ce_0%,transparent_50%),radial-gradient(circle_at_35%_65%,#9cafda_0%,transparent_55%),radial-gradient(circle_at_85%_70%,#97b3f0_0%,transparent_50%),radial-gradient(circle_at_10%_90%,#c2dbec_0%,transparent_40%)] bg-blend-screen py-12 sm:py-14 lg:py-16 border-b border-slate-200 text-slate-900">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="max-w-3xl"
          >
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-900">Capabilities</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Enterprise solutions engineered for scale
            </h2>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
              Each product is built to address specific functional gaps in standard enterprise software, delivering rapid time-to-value with minimal disruption.
            </p>
          </motion.div>

          <div className="mx-auto mt-7 sm:mt-9 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 items-stretch">
            {solutions.map((solution) => (
              <article
                key={solution.slug}
                className="group flex min-w-0 h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md"
              >
                <Link href={solution.href} className="no-underline relative block h-[180px] w-full shrink-0 overflow-hidden bg-slate-900">
                  {solution.cardImage.toLowerCase().match(/\.(mp4|webm)$/) !== null ? (
                    <OptimizedVideo
                      src={solution.cardImage}
                      alt={solution.imageAlt}
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover origin-center"
                    />
                  ) : (
                    <Image
                      src={solution.cardImage || "/assets/heroes/products-blue.png"}
                      alt={solution.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover origin-center"
                    />
                  )}
                  <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(14,26,44,0.7)] via-transparent to-transparent" />
                </Link>
                <div className="flex flex-1 flex-col px-5 py-5 sm:px-6 sm:py-5">
                  <h3 className="text-base sm:text-lg font-bold leading-snug text-slate-900 group-hover:text-slate-700 transition-colors">{solution.title}</h3>
                  <p className="mt-2 flex-1 text-xs sm:text-sm leading-relaxed text-slate-600">{solution.shortDescription}</p>
                  <ul className="mt-3.5 space-y-2 border-t border-slate-200 pt-3">
                    {solution.featureCards.slice(0, 4).map((item) => (
                      <li key={item.title} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-900">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-900 shadow-xs">
                          <Check className="h-2.5 w-2.5 stroke-[3] text-slate-900" />
                        </span>
                        <span className="text-slate-800">{item.title}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4">
                    <Link
                      href={solution.href}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-cyan-600 transition-all duration-200 group-hover:gap-2.5 group-hover:text-cyan-700"
                    >
                      Explore Solution <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
