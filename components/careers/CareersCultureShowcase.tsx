"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Compass, GraduationCap, Sparkles, TrendingUp, Users, LucideIcon } from "lucide-react";
import type { CareerPerk, CareerMetric } from "@/lib/services/careers.service";

const ICON_MAP: Record<string, LucideIcon> = {
  GraduationCap,
  Users,
  TrendingUp,
  Compass,
};

export default function CareersCultureShowcase({
  perks = [],
  metrics = [],
}: {
  perks?: CareerPerk[];
  metrics?: CareerMetric[];
}) {
  return (
    <div className="relative h-full">
      {/* Background ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-[#ffffff]/15 via-[#38bdf8]/10 to-transparent blur-2xl"
      />

      {/* Main Container Card */}
      <div className="relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(150deg,#1a2336_0%,#162032_60%,#121927_100%)] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        {/* Subtle hex grid pattern */}
        <div aria-hidden className="pointer-events-none absolute inset-0 tri-hex-grid opacity-30" />

        {/* Top Header Strip */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(150deg,#22d3ee,#2563eb)] text-white shadow-md shadow-[#ffffff]/30">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-white">Why Consultants Choose Trijotech</p>
              <p className="text-xs text-slate-400">Enterprise impact & engineering excellence</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
            <CheckCircle2 className="h-3.5 w-3.5" /> High-Ownership Team
          </span>
        </div>

        {/* Perks Grid from PostgreSQL */}
        <div className="relative z-10 mt-6 grid flex-1 gap-4 sm:grid-cols-2">
          {perks.map((perk, idx) => {
            const Icon = ICON_MAP[perk.icon] || GraduationCap;
            return (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -3, transition: { duration: 0.15 } }}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4.5 transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/[0.06]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.08] border border-white/15 text-[#38bdf8] shadow-sm transition-transform duration-300 group-hover:scale-110"
                    >
                      <Icon className="h-5 w-5 text-[#38bdf8]" strokeWidth={2.2} />
                    </span>
                    <span
                      className="rounded-md border border-[#60a5fa]/30 bg-[#3b82f6]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#93c5fd]"
                    >
                      {perk.badge}
                    </span>
                  </div>
                  <h4 className="mt-3.5 text-sm sm:text-base font-bold text-white transition-colors">
                    {perk.title}
                  </h4>
                  <p className="mt-1.5 text-xs leading-5 text-slate-300">{perk.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Key Metric Highlights from PostgreSQL */}
        <div className="relative z-10 mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5 text-center">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
              <p className="text-xl font-extrabold text-white">{m.value}</p>
              <p className="mt-0.5 text-[11px] font-medium text-slate-400">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
