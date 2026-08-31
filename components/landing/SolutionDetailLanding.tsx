"use client";

import Image from "next/image";
import OptimizedVideo from "@/components/ui/OptimizedVideo";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Boxes,
  Building2,
  Check,
  CircleDollarSign,
  Cloud,
  FileCheck,
  Landmark,
  Layers,
  Package,
  ShieldCheck,
  SlidersHorizontal,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import OtherSolutions from "@/components/solutions/OtherSolutions";
import type { SolutionDetailData as SolutionItem } from "@/lib/services/solutions.service";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

function getFeatureCardIcon(title: string, index: number) {
  const t = title.toLowerCase();
  // E-Invoicing Pro features
  if (t.includes("s/4hana") || t.includes("sap")) return Cloud;
  if (t.includes("government") || t.includes("portal")) return Landmark;
  if (t.includes("tracking") || t.includes("real-time")) return Activity;
  if (t.includes("compliance") || t.includes("regulatory")) return ShieldCheck;

  // Finlagoon Consolidation features
  if (t.includes("multi-entity") || t.includes("entity")) return Building2;
  if (t.includes("currency") || t.includes("conversion")) return CircleDollarSign;
  if (t.includes("reporting") || t.includes("customizable")) return SlidersHorizontal;
  if (t.includes("governance") || t.includes("audit")) return FileCheck;

  // Profitability Pro features
  if (t.includes("product")) return Package;
  if (t.includes("customer")) return Users;
  if (t.includes("allocation") || t.includes("automated")) return Workflow;
  if (t.includes("driver") || t.includes("mapping") || t.includes("margin")) return TrendingUp;

  // Fallback distinct icons by index
  const fallbacks = [Cloud, Landmark, Activity, ShieldCheck, Zap, Layers, BarChart3, Building2];
  return fallbacks[index % fallbacks.length];
}

type Props = {
  solution: SolutionItem;
  heroImage?: string;
  impactImage?: string;
  heroTitle?: string;
  showHeroCopy?: boolean;
  cleanImpactImage?: boolean;
  scene?: ReactNode;
  heroLayout?: "centered" | "split" | "split-reverse";
};

export default function SolutionDetailLanding({
  solution,
  heroImage = solution.heroImage,
  impactImage = solution.cardImage,
  heroTitle = solution.title,
  showHeroCopy = true,
  cleanImpactImage = false,
}: Props) {
  const renderTitle = (title: string | ReactNode) => {
    if (typeof title !== "string") return title;
    return title;
  };

  const getDefinitionTitle = () => {
    if (solution.slug === "e-invoicing-pro") {
      return "E-Invoicing";
    }
    if (solution.slug === "finlagoon-consolidation") {
      return "Finlagoon Consolidation";
    }
    if (solution.slug === "profitability-pro") {
      return "Profitability Pro";
    }
    return solution.title;
  };

  return (
    <main className="solution-detail-page public-alternating-page font-sans overflow-hidden bg-[#030713] text-white">
      {/* ──── Hero Section (Full Height & Full Width Background Image, High Visibility) ──── */}
      <section className="relative isolate flex min-h-[75vh] w-full flex-col justify-center overflow-hidden bg-[#050817] pb-16 pt-32 sm:pt-36 lg:min-h-[640px] lg:py-24">
        {/* Full width & full height image backdrop */}
        {heroImage && (
          <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
            <Image
              src={heroImage}
              alt={solution.title}
              fill
              priority
              loading="eager"
              sizes="100vw"
              className="h-full w-full object-cover object-center brightness-[0.88] contrast-[1.05]"
            />
            {/* Subtle soft gradient on left for text legibility while keeping image vibrant & visible */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#030713]/80 via-[#030713]/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#030713] to-transparent" />
          </div>
        )}

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex max-w-4xl flex-col items-start text-left">
            {/* Title */}
            <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-white drop-shadow-md sm:text-4xl lg:text-5xl">
              {renderTitle(heroTitle)}
            </h1>

            {/* Subtitle */}
            {solution.subtitle && (
              <p className="mt-5 text-lg font-semibold leading-relaxed text-white drop-shadow-md sm:text-xl">
                {solution.subtitle}
              </p>
            )}

            {/* Description */}
            {solution.shortDescription && (
              <p className="mt-4 max-w-2xl text-base font-normal leading-[1.7] text-white/90 drop-shadow sm:text-lg">
                {solution.shortDescription}
              </p>
            )}

            {/* Action buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#capabilities"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-bold text-slate-950 bg-white hover:bg-slate-100 border-0 shadow-[0_8px_20px_rgba(255,255,255,0.25)] hover:shadow-[0_12px_28px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Explore capabilities <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/solutions"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-white border border-white/20 bg-white/5 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                All solutions
              </Link>
            </div>
          </div>
        </div>

        {/* Clean bottom border */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/15" />
      </section>

      {/* ──── Overview / Definition ────────────────────────────────────────────────────── */}
      <section className="solution-definition-section relative overflow-hidden bg-[#a8c0f1] bg-[radial-gradient(circle_at_15%_20%,#85a1da_0%,transparent_45%),radial-gradient(circle_at_70%_15%,#9eb6ce_0%,transparent_50%),radial-gradient(circle_at_35%_65%,#9cafda_0%,transparent_55%),radial-gradient(circle_at_85%_70%,#97b3f0_0%,transparent_50%),radial-gradient(circle_at_10%_90%,#c2dbec_0%,transparent_40%)] bg-blend-screen py-16 sm:py-20 lg:py-24 border-b border-slate-200 text-slate-900">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="solution-detail-card min-w-0 overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 sm:p-8 lg:p-10 shadow-lg text-slate-900"
          >
            <div className="grid gap-6 lg:grid-cols-12 items-start">
              {/* Left Column: Definition Tag, Title, and Subtitle */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-slate-900">
                  <span className="h-px w-5 bg-slate-900" />
                  Definition
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.15] tracking-tight text-slate-900">
                  {getDefinitionTitle()}
                </h2>
                {solution.subtitle && (
                  <p className="mt-3 text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
                    {solution.subtitle}
                  </p>
                )}
              </div>

              {/* Right Column: Narrative Overview & Highlights */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                  {solution.overview}
                </p>

                {/* Streamlined Highlights */}
                {solution.highlights.length > 0 && (
                  <div className="mt-4 space-y-2.5 pt-4 border-t border-slate-200">
                    {solution.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-900 shadow-xs">
                          <Check className="h-3 w-3 stroke-[3] text-slate-900" />
                        </span>
                        <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">{highlight}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──── Feature Cards (At a glance) ───────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#030713] py-16 sm:py-20 lg:py-24 border-b border-white/10 text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-mesh opacity-60" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-grid-bg opacity-25" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="max-w-3xl"
          >
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#38bdf8]">
              <span className="h-px w-5 bg-[#38bdf8]" />
              At a glance
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Built for the way your teams work
            </h2>
          </motion.div>
          <div className="mt-7 sm:mt-9 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {solution.featureCards.map((item, i) => {
              const CardIcon = getFeatureCardIcon(item.title, i);
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="solution-detail-card group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-md transition-all duration-300 hover:border-white/30 hover:bg-white/[0.06] hover:shadow-xl"
                >
                  <span className="flex items-center text-cyan-200">
                    <CardIcon className="solution-card-icon h-7 w-7 text-cyan-200 stroke-cyan-200" strokeWidth={2} />
                  </span>
                  <h3 className="mt-5 text-base sm:text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2 flex-1 text-xs sm:text-sm leading-relaxed text-slate-300">{item.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──── Capabilities (Pure White) ───────────────────────────────── */}
      <section id="capabilities" className="relative isolate scroll-mt-24 bg-[#a8c0f1] bg-[radial-gradient(circle_at_15%_20%,#85a1da_0%,transparent_45%),radial-gradient(circle_at_70%_15%,#9eb6ce_0%,transparent_50%),radial-gradient(circle_at_35%_65%,#9cafda_0%,transparent_55%),radial-gradient(circle_at_85%_70%,#97b3f0_0%,transparent_50%),radial-gradient(circle_at_10%_90%,#c2dbec_0%,transparent_40%)] bg-blend-screen py-16 sm:py-20 lg:py-24 border-b border-slate-200 text-slate-900">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="max-w-3xl"
          >
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-slate-900">
              <span className="h-px w-5 bg-slate-900" />
              Capabilities
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Everything needed to move from complexity to control
            </h2>
          </motion.div>
          <div className="mt-7 sm:mt-9 space-y-6">
            {solution.sections.map((section, sectionIndex) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="solution-detail-card min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 text-slate-900"
              >
                <div className="detail-split-grid grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
                  <div>
                    <div className="mb-2.5 flex items-center gap-2.5">
                      <motion.span
                        initial={{ width: 0 }}
                        whileInView={{ width: 16 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="h-px bg-slate-900 block"
                      />
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-900">
                        Capability {String(sectionIndex + 1).padStart(2, "0")}
                      </p>
                    </div>
                    <h3 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">{section.title}</h3>
                    {section.description && (
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">{section.description}</p>
                    )}
                  </div>
                  <div className="grid items-stretch gap-3.5 sm:grid-cols-2">
                    {section.items.map((item, itemIndex) => (
                      <motion.article
                        key={item.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: itemIndex * 0.08 }}
                        className="solution-detail-card flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-5 text-slate-900 transition-all duration-300 hover:border-slate-300 hover:bg-slate-100 hover:shadow-xs"
                      >
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</h4>
                        <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600">{item.description}</p>
                      </motion.article>
                    ))}
                  </div>
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </section>

      {/* ──── Business Outcomes (Dark / Black) ───────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#030713] py-16 sm:py-20 lg:py-24 border-b border-white/10 text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-mesh opacity-60" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-grid-bg opacity-25" />
        <div className="detail-split-grid mx-auto grid w-full max-w-7xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="flex flex-col gap-6"
          >
            <div>
              <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#38bdf8]">
                <span className="h-px w-5 bg-[#38bdf8]" />
                Business outcomes
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                Business Outcomes
              </h2>
            </div>

            <div className={`relative w-full max-w-[480px] overflow-hidden rounded-2xl bg-slate-950 border border-white/10 shadow-2xl ${cleanImpactImage ? "aspect-[2.05/1]" : "aspect-[16/9]"}`}>
              {impactImage.toLowerCase().match(/\.(mp4|webm)$/) !== null ? (
                <OptimizedVideo
                  src={impactImage}
                  alt={solution.imageAlt}
                  className="pointer-events-none absolute inset-[-2px] h-[calc(100%+4px)] w-[calc(100%+4px)] object-cover scale-[1.02]"
                />
              ) : (
                <Image
                  src={impactImage}
                  alt={solution.imageAlt}
                  fill
                  sizes="(max-width:1024px) 100vw, 480px"
                  className="object-cover scale-[1.02]"
                />
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="grid gap-3"
          >
            {solution.benefits.map((benefit, i) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                whileHover={{ x: 4, transition: { duration: 0.15 } }}
                className="solution-detail-card min-w-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-5 hover:border-white/30 hover:bg-white/[0.07] transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                    <Check className="solution-card-icon h-4 w-4 stroke-[2.5]" />
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold leading-relaxed text-white">{benefit}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <OtherSolutions currentSlug={solution.slug} />
    </main>
  );
}

