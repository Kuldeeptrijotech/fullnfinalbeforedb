"use client";

import { motion } from "framer-motion";
import {
  Boxes,
  Brain,
  CheckCircle2,
  Eye,
  Landmark,
  Lightbulb,
  Sparkles,
  TrendingUp,
  Workflow,
  LucideIcon,
} from "lucide-react";
import { Reveal, SlideReveal, StaggerRevealItem } from "@/components/motion/Reveal";
import ServiceHero from "@/components/services/ServiceHero";
import { Glass, Metric, SectionLabel, introLead } from "@/components/services/service-ui";
import Container from "@/components/ui/Container";
import type { ServiceDetailData } from "@/lib/services/services.service";

const ICON_MAP: Record<string, LucideIcon> = {
  Boxes,
  Workflow,
  Brain,
  TrendingUp,
  Sparkles,
  Eye,
  Landmark,
};

type ServiceItem = { title: string; description: string };

export default function SapAiPage({
  service,
  offerings,
  impacts,
}: {
  service?: ServiceDetailData | null;
  offerings: ServiceItem[];
  impacts: ServiceItem[];
}) {
  const meta = service?.metaData || {};
  const pipeline: any[] = meta.pipeline || [
    { label: "Connect", desc: "Ingest data from SAP and surrounding systems.", icon: "Boxes" },
    { label: "Prepare", desc: "Clean, govern, and model the foundation.", icon: "Workflow" },
    { label: "Learn", desc: "Train models on trusted operational history.", icon: "Brain" },
    { label: "Predict", desc: "Anticipate trends, risks, and opportunities.", icon: "TrendingUp" },
    { label: "Act", desc: "Put insight and automation where decisions happen.", icon: "Sparkles" },
  ];

  const cases: any[] = meta.cases || [
    { title: "Demand forecasting", desc: "Improve planning accuracy with AI-driven projections across sales and supply.", icon: "TrendingUp" },
    { title: "Anomaly detection", desc: "Surface irregularities in transactions and processes before they escalate.", icon: "Eye" },
    { title: "Cash-flow prediction", desc: "Anticipate liquidity needs and optimize working capital decisions.", icon: "Landmark" },
    { title: "Intelligent automation", desc: "Automate repeatable analysis and operational decisions with AI rules.", icon: "Brain" },
  ];

  const metrics: any[] = meta.metrics || [
    { value: "Real-Time", label: "Predictive Telemetry" },
    { value: "100%", label: "Governance Compliance" },
    { value: "Scalable", label: "Enterprise Foundation" },
  ];

  return (
    <main className="service-detail-page public-alternating-page font-sans overflow-hidden bg-[#030713] text-white">
      {/* HERO */}
      <ServiceHero
        eyebrow="SAP AI & Data Intelligence"
        title={service?.title ? `Predictive AI & ${service.title}` : "Predictive AI & Real-Time Enterprise Analytics"}
        subtitle={service?.subtitle || "Turn enterprise data into forward-looking insights, automated decisioning, and measurable performance visibility."}
        primaryCta={{ label: "Consult AI specialists", href: "/contact" }}
        secondaryCta={{ label: "Explore all services", href: "/services" }}
        metrics={metrics}
      />

      {/* BUSINESS DATA + HERO TAIL */}
      <section className="relative isolate overflow-hidden bg-[#a8c0f1] bg-[radial-gradient(circle_at_15%_20%,#85a1da_0%,transparent_45%),radial-gradient(circle_at_70%_15%,#9eb6ce_0%,transparent_50%),radial-gradient(circle_at_35%_65%,#9cafda_0%,transparent_55%),radial-gradient(circle_at_85%_70%,#97b3f0_0%,transparent_50%),radial-gradient(circle_at_10%_90%,#c2dbec_0%,transparent_40%)] bg-blend-screen text-slate-900 py-16 sm:py-20 border-b border-slate-200">
        <div className="detail-split-grid mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-12">
          <div>
            <SlideReveal direction="left">
              <SectionLabel dark={false}>Trusted data first</SectionLabel>
              <h2 className={`mt-5 ${introLead} text-slate-900`}>
                Intelligence works when data is connected
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                We combine SAP data integration with AI, machine learning, and automation to surface timely insights,
                simplify decisions, and build an adaptable data foundation.
              </p>
            </SlideReveal>
          </div>

          <div className="grid grid-cols-2 gap-4 items-stretch">
            <Reveal className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm hover:border-slate-300 hover:shadow-md transition-all">
                <Metric to={35} suffix="%" label="Faster decisions" accent="text-slate-900" />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm hover:border-slate-300 hover:shadow-md transition-all">
                <Metric to={60} suffix="%" label="Manual effort reduced" accent="text-slate-900" />
              </div>
            </Reveal>
            <Reveal delay={0.2} className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm hover:border-slate-300 hover:shadow-md transition-all">
                <Metric to={90} suffix="%" label="Forecast accuracy" accent="text-slate-900" />
              </div>
            </Reveal>
            <Reveal delay={0.3} className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm hover:border-slate-300 hover:shadow-md transition-all">
                <Metric to={100} suffix="%" label="Governed data" accent="text-slate-900" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* AI PROCESS */}
      <section className="relative isolate overflow-hidden bg-[#050817] text-white py-16 sm:py-20 border-b border-white/10">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-mesh opacity-60" />
        <Container>
          <Reveal className="max-w-2xl">
            <SectionLabel dark={true}>Methodology</SectionLabel>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl text-white">
              From data to automated action
            </h2>
          </Reveal>

          <div className="relative mt-12">
            <div aria-hidden className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-[#38bdf8]/70 via-[#38bdf8]/50 to-transparent lg:left-0 lg:top-8 lg:h-px lg:w-full lg:bg-gradient-to-r z-0" />
            <div className="grid gap-4 lg:grid-cols-5 relative z-10">
              {pipeline.map((p, i) => {
                const Icon = ICON_MAP[p.icon] || Boxes;
                return (
                  <StaggerRevealItem key={p.label} variant="scale" className="relative pl-14 lg:pl-0 lg:pt-10">
                    <span
                      aria-hidden
                      className="absolute left-6 top-0 flex -translate-x-1/2 items-center justify-center lg:left-0 lg:top-8 lg:-translate-y-1/2 lg:translate-x-0 z-30"
                    >
                      <motion.span
                        className="relative z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#121927] text-white shadow-lg shadow-cyan-950/10"
                        animate={{ scale: [1, 1.12, 1] }}
                        transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                      >
                        <Icon className="h-4.5 w-4.5 text-[#38bdf8]" strokeWidth={1.9} />
                      </motion.span>
                    </span>
                    <Glass variant="frosted" tone="cyan" className="relative z-10 p-4">
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#38bdf8]">0{i + 1}</p>
                      <h3 className="mt-1 text-base font-bold text-white">{p.label}</h3>
                      <p className="mt-1.5 text-xs leading-5 text-slate-300">{p.desc}</p>
                    </Glass>
                  </StaggerRevealItem>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* CAPABILITIES */}
      <section className="relative isolate overflow-hidden bg-[#a8c0f1] bg-[radial-gradient(circle_at_15%_20%,#85a1da_0%,transparent_45%),radial-gradient(circle_at_70%_15%,#9eb6ce_0%,transparent_50%),radial-gradient(circle_at_35%_65%,#9cafda_0%,transparent_55%),radial-gradient(circle_at_85%_70%,#97b3f0_0%,transparent_50%),radial-gradient(circle_at_10%_90%,#c2dbec_0%,transparent_40%)] bg-blend-screen text-slate-900 py-16 sm:py-20 border-b border-slate-200">
        <Container>
          <div className="detail-split-grid grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <Reveal>
              <SectionLabel dark={false}>Scope of intelligence</SectionLabel>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Analytics and automation across operations
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-xl text-base leading-7 text-slate-600">
                From self-service dashboards to custom ML models, we design solutions that fit into your day-to-day
                processes and decision routines.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offerings.map((o, i) => (
              <StaggerRevealItem key={o.title} variant="scale">
                <div className="h-full rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-[11px] font-bold text-slate-900">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">{o.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{o.description}</p>
                </div>
              </StaggerRevealItem>
            ))}
          </div>
        </Container>
      </section>

      {/* USE CASES (DARK) */}
      <section className="relative isolate overflow-hidden bg-[#050817] py-16 text-white sm:py-20 border-b border-white/10">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-grid-bg opacity-40" />
        <Container className="relative">
          <Reveal className="max-w-2xl">
            <SectionLabel dark={true}>High-value use cases</SectionLabel>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl text-white">
              Where AI delivers tangible return
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cases.map((c, i) => {
              const Icon = ICON_MAP[c.icon] || TrendingUp;
              return (
                <Reveal key={c.title} delay={i * 0.08} className="h-full">
                  <div className="service-surface-card flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
                    <div>
                      <div className="flex items-center text-white">
                        <Icon className="h-6 w-6 text-white stroke-white" strokeWidth={2} />
                      </div>
                      <h3 className="mt-3.5 text-lg font-bold text-white">{c.title}</h3>
                      <p className="mt-2 text-xs leading-5 text-slate-300">{c.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}
