"use client";

import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Headphones,
  RefreshCw,
  SearchCheck,
  ShieldCheck,
  SlidersHorizontal,
  TrendingUp,
  Wrench,
  LucideIcon,
} from "lucide-react";
import { Reveal, SlideReveal, StaggerReveal, StaggerRevealItem } from "@/components/motion/Reveal";
import ServiceHero from "@/components/services/ServiceHero";
import { Glass, Metric, SectionLabel, introLead } from "@/components/services/service-ui";
import Container from "@/components/ui/Container";
import type { ServiceDetailData } from "@/lib/services/services.service";

const ICON_MAP: Record<string, LucideIcon> = {
  Activity,
  Headphones,
  TrendingUp,
  SearchCheck,
  Wrench,
  RefreshCw,
  ShieldCheck,
  SlidersHorizontal,
};

type ServiceItem = { title: string; description: string };

export default function SapSupportPage({
  service,
  offerings,
  impacts,
}: {
  service?: ServiceDetailData | null;
  offerings: ServiceItem[];
  impacts: ServiceItem[];
}) {
  const meta = service?.metaData || {};
  const pillars: any[] = meta.pillars || [
    { label: "Monitor", desc: "Proactive 24*7 monitoring keeps critical processes visible before issues surface.", icon: "Activity" },
    { label: "Respond", desc: "SLAs, triage, and deep expertise resolve incidents quickly across every layer.", icon: "Headphones" },
    { label: "Improve", desc: "Structured enhancements help the landscape evolve with the business.", icon: "TrendingUp" },
  ];

  const process: any[] = meta.process || [
    { label: "Detect", icon: "Activity", tone: "#38bdf8" },
    { label: "Triage", icon: "SearchCheck", tone: "#ffffff" },
    { label: "Resolve", icon: "Wrench", tone: "#22d3ee" },
    { label: "Verify", icon: "RefreshCw", tone: "#67e8f9" },
    { label: "Improve", icon: "TrendingUp", tone: "#ffffff" },
  ];

  const metrics: any[] = meta.metrics || [
    { value: "24*7*365", label: "Global Coverage" },
    { value: "<15 min", label: "Critical SLA Response" },
    { value: "99.9%", label: "System Availability" },
  ];

  return (
    <main className="service-detail-page public-alternating-page font-sans overflow-hidden bg-[#030713] text-white">
      {/* HERO */}
      <ServiceHero
        eyebrow="SAP Support & Application Management"
        title={service?.title ? `24*7 Proactive AMS & ${service.title}` : "24*7 Proactive AMS, System Stability & Optimization"}
        subtitle={service?.subtitle || "Keep your SAP landscape fast, resilient, and continuously aligned with evolving business needs."}
        primaryCta={{ label: "Request support consultation", href: "/contact" }}
        secondaryCta={{ label: "Explore all services", href: "/services" }}
        metrics={metrics}
      />

      {/* SUPPORT MODEL + HERO TAIL */}
      <section className="relative bg-[#a8c0f1] bg-[radial-gradient(circle_at_15%_20%,#85a1da_0%,transparent_45%),radial-gradient(circle_at_70%_15%,#9eb6ce_0%,transparent_50%),radial-gradient(circle_at_35%_65%,#9cafda_0%,transparent_55%),radial-gradient(circle_at_85%_70%,#97b3f0_0%,transparent_50%),radial-gradient(circle_at_10%_90%,#c2dbec_0%,transparent_40%)] bg-blend-screen text-slate-900 py-16 sm:py-20 border-b border-slate-200">
        <div className="detail-split-grid mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-12">
          <div>
            <SlideReveal direction="left">
              <SectionLabel dark={false}>Our support model</SectionLabel>
              <h2 className={`mt-5 ${introLead} text-slate-900`}>
                Stable operations, flexible service
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Our SAP Support and AMS services deliver operational continuity, performance assurance, structured
                change, and ongoing value through flexible models aligned with your business.
              </p>
            </SlideReveal>
            <StaggerReveal className="mt-10 grid gap-3 sm:grid-cols-3" stagger={0.1}>
              {pillars.map((p) => {
                const Icon = ICON_MAP[p.icon] || Activity;
                return (
                  <StaggerRevealItem key={p.label} variant="fadeIn" className="h-full">
                    <div className="service-surface-card flex h-full flex-col p-5 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md">
                      <div className="flex items-center text-cyan-600">
                        <Icon className="h-7 w-7 text-cyan-600 stroke-cyan-600" strokeWidth={2} />
                      </div>
                      <h3 className="mt-4 font-bold text-slate-900 text-base sm:text-lg">{p.label}</h3>
                      <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600">{p.desc}</p>
                    </div>
                  </StaggerRevealItem>
                );
              })}
            </StaggerReveal>
          </div>

          <div className="grid grid-cols-2 gap-4 items-stretch">
            <Reveal className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                <Metric to={99.9} suffix="%" label="Availability target" accent="text-slate-900" />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                <Metric to={30} prefix="< " suffix=" min" label="Response SLA" accent="text-slate-900" />
              </div>
            </Reveal>
            <Reveal delay={0.2} className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                <Metric to={24} suffix="*7" label="Coverage" accent="text-slate-900" />
              </div>
            </Reveal>
            <Reveal delay={0.3} className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                <Metric to={100} suffix="%" label="Delivery Ownership" accent="text-slate-900" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* RESOLUTION PROCESS (DARK) */}
      <section className="relative bg-[#050817] text-white py-20 sm:py-24 border-b border-white/10">
        <div aria-hidden className="absolute inset-0 tri-mesh opacity-50" />
        <Container className="relative">
          <Reveal className="max-w-2xl">
            <SectionLabel dark={true}>Incident to resolution</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Predictable resolution lifecycle
            </h2>
          </Reveal>

          <div className="relative mt-14">
            <div aria-hidden className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-[#38bdf8]/70 via-[#38bdf8]/50 to-transparent lg:left-0 lg:top-8 lg:h-px lg:w-full lg:bg-gradient-to-r z-0" />
            <div className="grid gap-6 lg:grid-cols-5 relative z-10">
              {process.map((step, i) => {
                const Icon = ICON_MAP[step.icon] || Activity;
                return (
                  <StaggerRevealItem key={step.label} variant="scale" className="relative pl-16 lg:pl-0 lg:pt-10">
                    <span
                      aria-hidden
                      className="absolute left-6 top-0 flex -translate-x-1/2 items-center justify-center lg:left-0 lg:top-8 lg:-translate-y-1/2 lg:translate-x-0 z-30"
                    >
                      <motion.span
                        className="relative z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#121927] text-white shadow-lg shadow-cyan-950/10"
                        animate={{ scale: [1, 1.12, 1] }}
                        transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                      >
                        <Icon className="h-5 w-5 text-[#38bdf8]" strokeWidth={1.9} />
                      </motion.span>
                    </span>
                    <Glass variant="frosted" tone="cyan" className="relative z-10 p-5">
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#38bdf8]">Step 0{i + 1}</p>
                      <h3 className="mt-2 text-lg font-bold text-white">{step.label}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {i === 0 && "Automated checks and users surface issues immediately."}
                        {i === 1 && "Categorized by severity and routed to specialists."}
                        {i === 2 && "Root cause addressed with tested fixes."}
                        {i === 3 && "Business confirms full restoration before closure."}
                        {i === 4 && "Insights feed into preventive maintenance."}
                      </p>
                    </Glass>
                  </StaggerRevealItem>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* CORE OFFERINGS */}
      <section className="relative bg-[#a8c0f1] bg-[radial-gradient(circle_at_15%_20%,#85a1da_0%,transparent_45%),radial-gradient(circle_at_70%_15%,#9eb6ce_0%,transparent_50%),radial-gradient(circle_at_35%_65%,#9cafda_0%,transparent_55%),radial-gradient(circle_at_85%_70%,#97b3f0_0%,transparent_50%),radial-gradient(circle_at_10%_90%,#c2dbec_0%,transparent_40%)] bg-blend-screen text-slate-900 py-20 sm:py-24 border-b border-slate-200">
        <Container>
          <div className="detail-split-grid grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <Reveal>
              <SectionLabel dark={false}>Support scope</SectionLabel>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Comprehensive AMS coverage
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-xl text-lg leading-8 text-slate-600">
                End-to-end support covering functional modules, technical layers, integration touchpoints, and
                continuous landscape modernization.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {offerings.map((o, i) => (
              <StaggerRevealItem key={o.title} variant="scale">
                <div className="h-full rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-[11px] font-bold text-slate-900">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">{o.title}</h3>
                  </div>
                  <p className="mt-4 leading-7 text-slate-600">{o.description}</p>
                </div>
              </StaggerRevealItem>
            ))}
          </div>
        </Container>
      </section>

      {/* WHY OUR SUPPORT (DARK) */}
      <section className="relative overflow-hidden bg-[#050817] py-20 text-white sm:py-28 border-b border-white/10">
        <div aria-hidden className="absolute inset-0 tri-grid-bg opacity-50" />
        <Container className="relative">
          <div className="detail-split-grid grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <Reveal>
                <SectionLabel dark={true}>Value delivered</SectionLabel>
                <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                  Confidence across every transaction
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 text-lg leading-8 text-slate-300">
                  We treat support as an ongoing partnership — not just ticket resolution. Our consultants stay close to
                  your team to prevent problems and optimize value continuously.
                </p>
              </Reveal>
            </div>

            <StaggerReveal className="grid gap-5 sm:grid-cols-2" stagger={0.1}>
              {impacts.map((i) => (
                <StaggerRevealItem key={i.title} variant="slideRight">
                  <div className="service-surface-card h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                    <CheckCircle2 className="h-6 w-6 text-[#38bdf8]" />
                    <h3 className="mt-4 text-xl font-bold text-white">{i.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{i.description}</p>
                  </div>
                </StaggerRevealItem>
              ))}
            </StaggerReveal>
          </div>
        </Container>
      </section>
    </main>
  );
}
