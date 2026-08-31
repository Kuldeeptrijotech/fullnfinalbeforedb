"use client";

import { motion } from "framer-motion";
import { Award, Layers, Network, ShieldCheck, Sparkles, Users } from "lucide-react";

const pillars = [
  {
    icon: Layers,
    title: "Full-Stack SAP Architecture",
    description: "Deep expertise spanning SAP S/4HANA, BTP, SAC, PaPM, and BW/4HANA integration.",
  },
  {
    icon: Network,
    title: "Connected Data & Governance",
    description: "Unifying transactional systems and analytical models for trusted decision-making.",
  },
  {
    icon: ShieldCheck,
    title: "Accountable Delivery Ownership",
    description: "Dedicated consultant teams staying close to outcomes from strategy to run-phase.",
  },
  {
    icon: Users,
    title: "True Collaborative Partnership",
    description: "Transparent knowledge transfer and long-term client enablement at every milestone.",
  },
];

const metrics = [
  { value: "9+", label: "Years Experience" },
  { value: "100%", label: "Delivery Ownership" },
  { value: "Global", label: "Enterprise Reach" },
];

export default function AboutPillarsShowcase() {
  return (
    <div className="relative h-full">
      <div aria-hidden className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-white/15 via-[#3b82f6]/15 to-transparent blur-2xl" />
      <div className="about-pillar-shell relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(150deg,#1a2336_0%,#162032_60%,#121927_100%)] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 tri-hex-grid opacity-30" />

      {/* Header chip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(150deg,#22d3ee,#2563eb)] text-white shadow-md shadow-blue-500/20">
            <Award className="h-5 w-5" />
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white sm:text-sm">
            Delivery Pillars
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#93c5fd] bg-[#2563eb] px-3 py-1 text-[11px] font-bold text-white shadow-sm shadow-blue-950/30">
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-white" strokeWidth={2.75} /> Enterprise Excellence
        </span>
      </div>

      {/* 4 Pillars Grid */}
      <div className="relative z-10 mt-6 grid flex-1 gap-4 sm:grid-cols-2">
        {pillars.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
              className="about-pillar-card group flex min-w-0 flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-blue-400/50 hover:bg-white/[0.06]"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#93c5fd] bg-[#2563eb] text-white shadow-md shadow-blue-950/25 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#1d4ed8]">
                  <Icon className="h-4 w-4 text-white" strokeWidth={2.5} />
                </span>
                <h3 className="text-sm font-bold leading-tight text-white sm:text-base">
                  {pillar.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {pillar.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Metrics Banner */}
      <div className="relative z-10 mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5 text-center">
        {metrics.map((m, i) => (
          <div key={m.label} className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
            <div className="text-base font-extrabold text-white sm:text-lg">
              {m.value}
            </div>
            <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-400">
              {m.label}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
