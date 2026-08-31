"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clapperboard, FileText, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GradientButton from "@/components/ui/GradientButton";
import HexBadge from "@/components/ui/HexBadge";
import { StaggerReveal, StaggerRevealItem } from "@/components/motion/Reveal";
import type { InsightsPageData } from "@/lib/services/insights.service";

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  FileText,
  Clapperboard,
};

export default function InsightsClientView({ data }: { data: InsightsPageData }) {
  const { heroTitle, heroSubtitle, cards } = data;

  return (
    <main className="public-alternating-page overflow-hidden bg-[#030713] text-white font-sans">
      {/* ──── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden bg-[#050817] pt-24 sm:pt-28 lg:pt-24 pb-12">
        {/* layered ambient backgrounds */}
        <div aria-hidden className="absolute inset-0 -z-40 tri-mesh" />
        <div aria-hidden className="absolute inset-0 -z-30 tri-hex-grid opacity-55" />
        <Image
          src="/assets/heroes/blogs-blue.png"
          alt="Insights at Trijotech"
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-95"
        />

        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(5,8,23,0.85)_0%,rgba(5,8,23,0.45)_50%,rgba(5,8,23,0.15)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#050817] to-transparent" />

        {/* Ambient glow orbs */}
        <div className="tri-blob -z-10 h-80 w-80" style={{ right: "15%", top: "10%", background: "radial-gradient(circle, rgba(255, 255, 255,0.18), transparent 70%)" }} />
        <div className="tri-blob -z-10 h-64 w-64" style={{ left: "5%", bottom: "15%", background: "radial-gradient(circle, rgba(255, 255, 255,0.12), transparent 70%)" }} />

        <div className="mx-auto flex min-h-[calc(100svh-9.5rem)] w-full max-w-7xl items-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="max-w-3xl">
            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="max-w-3xl text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              {heroTitle}
            </motion.h1>

            <motion.p
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="mt-6 max-w-2xl text-base font-normal leading-[1.7] text-white/80 sm:text-lg"
            >
              {heroSubtitle}
            </motion.p>

            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-9 flex flex-wrap gap-4 relative z-10"
            >
              <a
                href="#explore"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 border-0 shadow-[0_8px_20px_rgba(255,255,255,0.25)] hover:shadow-[0_12px_28px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:translate-y-0 relative z-10 hover:z-20 transition-all duration-200"
              >
                Explore Insights <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/blogs"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-white border border-white/20 bg-white/5 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 relative z-10 hover:z-20 transition-all duration-200"
              >
                Read latest blogs
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Clean bottom separator */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/[0.08]" />
      </section>

      {/* ──── Cards ────────────────────────────────────────────────────────────── */}
      <section id="explore" className="relative isolate overflow-hidden bg-[#a8c0f1] bg-[radial-gradient(circle_at_15%_20%,#85a1da_0%,transparent_45%),radial-gradient(circle_at_70%_15%,#9eb6ce_0%,transparent_50%),radial-gradient(circle_at_35%_65%,#9cafda_0%,transparent_55%),radial-gradient(circle_at_85%_70%,#97b3f0_0%,transparent_50%),radial-gradient(circle_at_10%_90%,#c2dbec_0%,transparent_40%)] bg-blend-screen py-12 sm:py-14 lg:py-16 border-b border-slate-200 text-slate-900">
        <Container className="relative">
          <StaggerReveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <StaggerRevealItem className="max-w-3xl">
              <SectionHeading
                eyebrow="Learn from practical experience"
                dark={false}
                title="Insight formats built for real-world learning"
                description="Choose from the insight formats already available across the Trijotech website."
              />
            </StaggerRevealItem>
            <StaggerRevealItem>
              <GradientButton href="/blogs" variant="outline" size="md">
                Read our blogs <ArrowRight className="h-4 w-4" />
              </GradientButton>
            </StaggerRevealItem>
          </StaggerReveal>

          <StaggerReveal className="mt-7 sm:mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 items-stretch" stagger={0.08}>
            {cards.map((card) => {
              const Icon = ICON_MAP[card.icon] || BookOpen;
              return (
                <StaggerRevealItem key={card.href} className="h-full">
                  <motion.article
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="insights-landing-card group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md"
                  >
                    <Link
                      href={card.href}
                      className="relative block aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-900"
                    >
                      <Image
                        src={card.image}
                        alt={card.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition duration-700 group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,26,44,0.7)] via-transparent to-transparent" />
                      <span className="absolute left-3.5 top-3.5">
                        <HexBadge icon={Icon} tone={card.tone} size="md" />
                      </span>
                    </Link>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h3 className="text-base sm:text-lg font-bold leading-snug text-slate-900 group-hover:text-slate-700 transition-colors">
                        {card.title}
                      </h3>
                      <p className="mt-2 flex-1 text-xs sm:text-sm leading-relaxed text-slate-600">{card.description}</p>
                      <div className="mt-auto pt-4">
                        <Link
                          href={card.href}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-cyan-600 transition-all duration-300 group-hover:gap-2.5 group-hover:text-cyan-700"
                        >
                          <span>{card.cta}</span>
                          <span aria-hidden="true" className="text-base font-bold transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                </StaggerRevealItem>
              );
            })}
          </StaggerReveal>
        </Container>
      </section>
    </main>
  );
}
