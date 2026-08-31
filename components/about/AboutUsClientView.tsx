"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import AboutPillarsShowcase from "@/components/about/AboutPillarsShowcase";
import type { AboutUsPageData } from "@/lib/services/about.service";

export default function AboutUsClientView({ data }: { data: AboutUsPageData }) {
  const {
    heroTitle,
    heroSubtitle,
    heroImage,
    whoWeAreTitle,
    whoWeAreDescription1,
    whoWeAreDescription2,
    expertiseNote,
    purposes,
    values,
    leadership,
  } = data;

  return (
    <main className="about-page public-alternating-page overflow-hidden bg-[#030713] text-white">
      {/* ──── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-[#050817] pt-24 sm:pt-28 lg:pt-24 pb-12">
        <Image
          src={heroImage}
          alt="Trijotech leadership and global consultant team collaboration"
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-95"
        />

        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(5,8,23,0.85)_0%,rgba(5,8,23,0.45)_50%,rgba(5,8,23,0.15)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#050817] to-transparent" />

        {/* Ambient glow orbs */}
        <div className="pointer-events-none absolute right-1/4 top-1/4 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-1/3 left-1/3 h-56 w-56 rounded-full bg-indigo-400/8 blur-3xl" />

        <div className="mx-auto flex min-h-[calc(100svh-9.5rem)] w-full max-w-7xl items-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="mt-5 text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
              {heroTitle}
            </h1>

            <p className="mt-6 text-base font-normal leading-[1.7] text-white/80 sm:text-lg">
              {heroSubtitle}
            </p>

            <div className="mt-9 flex flex-wrap gap-4 relative z-10">
              <a
                href="#who-we-are"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-bold text-slate-950 bg-white hover:bg-slate-100 border-0 shadow-[0_8px_20px_rgba(255,255,255,0.25)] hover:shadow-[0_12px_28px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:translate-y-0 relative z-10 hover:z-20 transition-all duration-200"
              >
                Discover our story <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-white border border-white/20 bg-white/5 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 relative z-10 hover:z-20 transition-all duration-200"
              >
                Talk to our team
              </Link>
            </div>
          </div>
        </div>

        {/* narrative progress line */}
        <div className="pointer-events-none absolute inset-x-0 bottom-14">
          <div className="relative mx-auto h-px w-[min(86%,38rem)] bg-white/15">
            <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_rgba(255, 255, 255,0.9)]" />
            <span className="absolute -top-1 left-0 h-3 w-3 -translate-x-1/2 rounded-full border border-white/50" />
            <span className="absolute -top-1 right-0 h-3 w-3 translate-x-1/2 rounded-full border border-white/50" />
          </div>
        </div>

        {/* Clean bottom separator */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/[0.08]" />
      </section>

      {/* ──── Who We Are ────────────────────────────────────────────────── */}
      <section id="who-we-are" className="relative isolate overflow-hidden bg-[#a8c0f1] bg-[radial-gradient(circle_at_15%_20%,#85a1da_0%,transparent_45%),radial-gradient(circle_at_70%_15%,#9eb6ce_0%,transparent_50%),radial-gradient(circle_at_35%_65%,#9cafda_0%,transparent_55%),radial-gradient(circle_at_85%_70%,#97b3f0_0%,transparent_50%),radial-gradient(circle_at_10%_90%,#c2dbec_0%,transparent_40%)] bg-blend-screen py-20 sm:py-24 lg:py-28 border-b border-slate-200 text-slate-900">
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-12">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-900">Who we are</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {whoWeAreTitle}
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              {whoWeAreDescription1}
            </p>
            <p className="mt-4 text-base leading-8 text-slate-600">
              {whoWeAreDescription2}
            </p>
            <div className="about-expertise-note mt-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold sm:text-base text-slate-900">
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-900 shadow-sm"
              >
                <Check className="h-3.5 w-3.5 stroke-[3] text-slate-900" />
              </motion.span>
              {expertiseNote}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <AboutPillarsShowcase />
          </motion.div>
        </div>
      </section>

      {/* ──── Vision / Mission / Goals ────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#18263e] py-20 sm:py-24 lg:py-28 border-b border-white/10">
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
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#38bdf8]">Our direction</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Vision, mission and goals
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              The principles that guide every engagement and long-term client partnership.
            </p>
          </motion.div>

          <div className="mt-7 sm:mt-9 grid gap-5 md:grid-cols-3 items-stretch">
            {purposes.map((item, i) => (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="about-card flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-8 shadow-2xl transition-all duration-300 hover:border-white/50 hover:bg-white/[0.07]"
              >
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-white">{item.label}</p>
                <h3 className="mt-3 text-base sm:text-lg font-bold leading-snug text-white">{item.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-slate-300 sm:text-base">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ──── Values ────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#a8c0f1] bg-[radial-gradient(circle_at_15%_20%,#85a1da_0%,transparent_45%),radial-gradient(circle_at_70%_15%,#9eb6ce_0%,transparent_50%),radial-gradient(circle_at_35%_65%,#9cafda_0%,transparent_55%),radial-gradient(circle_at_85%_70%,#97b3f0_0%,transparent_50%),radial-gradient(circle_at_10%_90%,#c2dbec_0%,transparent_40%)] bg-blend-screen py-20 sm:py-24 lg:py-28 border-b border-slate-200 text-slate-900">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="max-w-3xl"
          >
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-900">How we work</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Simple principles, consistently applied
            </h2>
          </motion.div>

          <div className="mt-7 sm:mt-9 grid gap-5 md:grid-cols-3 items-stretch">
            {values.map((value, i) => (
              <motion.article
                key={value.number}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="about-card group relative flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-[0_6px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:border-slate-400 hover:shadow-[0_16px_36px_rgba(0,0,0,0.12)]"
              >
                <motion.span
                  className="absolute right-4 top-3 text-4xl font-bold text-slate-200 transition-colors group-hover:text-slate-700/30"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                >
                  {value.number}
                </motion.span>
                <h3 className="relative mt-8 text-base sm:text-lg font-bold text-slate-900">{value.title}</h3>
                <p className="relative mt-4 flex-1 text-sm leading-7 text-slate-600 sm:text-base">{value.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ──── Leadership ────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#050817] py-20 sm:py-24 lg:py-28 border-b border-white/10 text-white">
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
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#38bdf8]">Our leadership</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Leadership that builds trust
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              Deep SAP experience with a practical focus on predictable delivery and long-term client success.
            </p>
          </motion.div>

          <div className="mt-7 sm:mt-9 grid gap-5 md:grid-cols-3 items-stretch">
            {leadership.map((leader, i) => (
              <motion.article
                key={leader.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="about-card group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl transition-all duration-300 hover:border-white/50 hover:bg-white/[0.07]"
              >
                {leader.image ? (
                  <div className="relative aspect-[16/10] w-full shrink-0 bg-slate-900 overflow-hidden">
                    <Image
                      src={leader.image}
                      alt={`Photo of ${leader.name}`}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover object-top transition duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121927]/80 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="pt-6 px-6 sm:pt-7 sm:px-7">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#0a6ed1] to-[#0284c7] text-xl font-bold text-white shadow-lg border border-white/20">
                      {leader.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-xl font-bold text-white">{leader.name}</h3>
                  <p className="mt-0.5 text-xs sm:text-sm font-semibold text-[#38bdf8]">{leader.role}</p>
                  <p className="mt-4 flex-1 text-sm leading-7 text-slate-300 sm:text-base">{leader.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
