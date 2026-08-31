"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  FileText,
  GitMerge,
  HardDrive,
  Layers,
  RefreshCw,
  Server,
  ShieldCheck,
  Users,
  Workflow,
  LucideIcon,
} from "lucide-react";
import { Reveal, SlideReveal, StaggerReveal, StaggerRevealItem } from "@/components/motion/Reveal";
import ServiceHero from "@/components/services/ServiceHero";
import { Glass, Metric, SectionLabel, introLead } from "@/components/services/service-ui";
import Container from "@/components/ui/Container";
import type { ServiceDetailData } from "@/lib/services/services.service";

const ICON_MAP: Record<string, LucideIcon> = {
  Server,
  Users,
  HardDrive,
  FileText,
  Cloud,
  Database,
  GitMerge,
  Code2,
  RefreshCw,
  Workflow,
  ShieldCheck,
};

type ServiceItem = { title: string; description: string };

export default function SapDataIntegrationPage({
  service,
  offerings,
  impacts,
}: {
  service?: ServiceDetailData | null;
  offerings: ServiceItem[];
  impacts: ServiceItem[];
}) {
  const meta = service?.metaData || {};
  const sources: any[] = meta.sources || [
    { label: "ERP / S/4HANA", icon: "Server" },
    { label: "CRM", icon: "Users" },
    { label: "Legacy", icon: "HardDrive" },
    { label: "Files & Docs", icon: "FileText" },
    { label: "Cloud SaaS", icon: "Cloud" },
    { label: "Databases", icon: "Database" },
  ];

  const journey: any[] = meta.journey || [
    { label: "Assess & map", desc: "Inventory interfaces and map data flows across the landscape.", icon: "GitMerge" },
    { label: "Model & transform", desc: "Design mappings, validation rules, and transformation logic.", icon: "Code2" },
    { label: "Load & validate", desc: "Move data with structured validation and reconciliation.", icon: "RefreshCw" },
    { label: "Orchestrate", desc: "Compose real-time and batch flows into reliable processes.", icon: "Workflow" },
    { label: "Monitor & optimize", desc: "Gain traceability, alerts, and continuous improvement.", icon: "ShieldCheck" },
  ];

  const metrics: any[] = meta.metrics || [
    { value: "100M+", label: "Monthly Transactions" },
    { value: "Real-Time", label: "Event Streaming" },
    { value: "Zero-Loss", label: "Data Reconciliation" },
  ];

  return (
    <main className="service-detail-page public-alternating-page font-sans overflow-hidden bg-[#030713] text-white">
      {/* HERO */}
      <ServiceHero
        eyebrow="SAP Data Integration & Migration"
        title={service?.title ? `Unified Integration Pipelines & ${service.title}` : "Unified Integration Pipelines & Seamless Data Migration"}
        subtitle={service?.subtitle || "Connect on-premise, cloud, and legacy systems into high-reliability, automated enterprise workflows."}
        primaryCta={{ label: "Consult integration engineers", href: "/contact" }}
        secondaryCta={{ label: "Explore all services", href: "/services" }}
        metrics={metrics}
      />

      {/* SOURCE SYSTEMS + HERO TAIL */}
      <section className="relative bg-[#a8c0f1] bg-[radial-gradient(circle_at_15%_20%,#85a1da_0%,transparent_45%),radial-gradient(circle_at_70%_15%,#9eb6ce_0%,transparent_50%),radial-gradient(circle_at_35%_65%,#9cafda_0%,transparent_55%),radial-gradient(circle_at_85%_70%,#97b3f0_0%,transparent_50%),radial-gradient(circle_at_10%_90%,#c2dbec_0%,transparent_40%)] bg-blend-screen text-slate-900 py-16 sm:py-20 border-b border-slate-200">
        <div className="detail-split-grid mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-12">
          <div>
            <SlideReveal direction="left">
              <SectionLabel dark={false}>One reliable foundation</SectionLabel>
              <h2 className={`mt-5 ${introLead} text-slate-900`}>
                Every system, one trusted flow
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Our integration services unify SAP and non-SAP landscapes through scalable APIs, cloud integration,
                migration, and enterprise connectivity — supporting seamless operations and real-time insight.
              </p>
            </SlideReveal>

            <StaggerReveal className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3" stagger={0.07}>
              {sources.map((s) => {
                const Icon = ICON_MAP[s.icon] || Database;
                return (
                  <StaggerRevealItem key={s.label} variant="fadeIn">
                    <div className="service-surface-card flex items-center gap-2.5 rounded-xl bg-white text-slate-900 border border-slate-200 px-3.5 py-3 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md">
                      <Icon className="h-5 w-5 shrink-0 text-cyan-600 stroke-cyan-600" strokeWidth={2} />
                      <span className="text-[13px] font-bold text-slate-900">{s.label}</span>
                    </div>
                  </StaggerRevealItem>
                );
              })}
            </StaggerReveal>
          </div>

          <div className="grid grid-cols-2 gap-4 items-stretch">
            <Reveal className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                <Metric to={100} suffix="+" label="Interfaces connected" accent="text-slate-900" />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                <Metric to={99.95} suffix="%" label="Sync reliability" accent="text-slate-900" />
              </div>
            </Reveal>
            <Reveal delay={0.2} className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                <Metric to={0} label="Data loss target" accent="text-slate-900" />
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

      {/* JOURNEY (DARK) */}
      <section className="relative bg-[#050817] text-white py-20 sm:py-24 border-b border-white/10">
        <div aria-hidden className="absolute inset-0 tri-mesh opacity-50" />
        <Container className="relative">
          <Reveal className="max-w-2xl">
            <SectionLabel dark={true}>Methodology</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Structured integration delivery
            </h2>
          </Reveal>

          <div className="relative mt-14">
            <div aria-hidden className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-[#38bdf8]/70 via-[#38bdf8]/50 to-transparent lg:left-0 lg:top-8 lg:h-px lg:w-full lg:bg-gradient-to-r z-0" />
            <div className="grid gap-6 lg:grid-cols-5 relative z-10">
              {journey.map((j, i) => {
                const Icon = ICON_MAP[j.icon] || GitMerge;
                return (
                  <StaggerRevealItem key={j.label} variant="scale" className="relative pl-16 lg:pl-0 lg:pt-10">
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
                      <h3 className="mt-2 text-lg font-bold text-white">{j.label}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{j.desc}</p>
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
              <SectionLabel dark={false}>Scope of integration</SectionLabel>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Pipelines built for enterprise scale
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-xl text-lg leading-8 text-slate-600">
                Whether you need high-volume batch migration or real-time event-driven data exchange, we engineer
                reliable integrations tailored to your data standards.
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

      {/* WHY OUR INTEGRATION (DARK) */}
      <section className="relative overflow-hidden bg-[#050817] py-20 text-white sm:py-28 border-b border-white/10">
        <div aria-hidden className="absolute inset-0 tri-grid-bg opacity-50" />
        <Container className="relative">
          <div className="detail-split-grid grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <Reveal>
                <SectionLabel dark={true}>Integration impact</SectionLabel>
                <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                  Speed, accuracy, continuity
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 text-lg leading-8 text-slate-300">
                  Reliable integrations remove manual work, reduce reconciliation overhead, and ensure that decision
                  makers always have accurate information.
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
