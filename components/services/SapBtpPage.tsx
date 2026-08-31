"use client";

import {
  Brain,
  CheckCircle2,
  Database,
  LayoutDashboard,
  MousePointerClick,
  Plug,
  Puzzle,
  LucideIcon,
} from "lucide-react";
import { Reveal, SlideReveal, StaggerReveal, StaggerRevealItem } from "@/components/motion/Reveal";
import ServiceHero from "@/components/services/ServiceHero";
import { Glass, Metric, SectionLabel, introLead } from "@/components/services/service-ui";
import Container from "@/components/ui/Container";
import type { ServiceDetailData } from "@/lib/services/services.service";

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  Puzzle,
  MousePointerClick,
  Plug,
  Database,
  Brain,
};

type ServiceItem = { title: string; description: string };

export default function SapBtpPage({
  service,
  offerings,
  impacts,
}: {
  service?: ServiceDetailData | null;
  offerings: ServiceItem[];
  impacts: ServiceItem[];
}) {
  const meta = service?.metaData || {};
  const tracks: any[] = meta.tracks || [
    { label: "Applications", desc: "Cloud-native apps built around specific business needs — without disrupting the core.", icon: "LayoutDashboard" },
    { label: "Extensions", desc: "Upgrade-ready side-by-side extensions using SAP Extension Suite.", icon: "Puzzle" },
    { label: "Experiences", desc: "Intuitive Fiori and UI5 interfaces that lift productivity and adoption.", icon: "MousePointerClick" },
  ];

  const triplets: any[] = meta.triplets || [
    { label: "Integration", desc: "Governed APIs, events, and connectors that unify SAP and third-party systems.", icon: "Plug" },
    { label: "Data", desc: "Model and expose enterprise data for responsive, real-time applications.", icon: "Database" },
    { label: "AI", desc: "Embed intelligence and automation into the experiences you build.", icon: "Brain" },
  ];

  const metrics: any[] = meta.metrics || [
    { value: "Clean Core", label: "Architecture Compliant" },
    { value: "Full-Stack", label: "CAP, RAP, UI5 & Fiori" },
    { value: "Secure", label: "Enterprise BTP Runtime" },
  ];

  return (
    <main className="service-detail-page public-alternating-page font-sans overflow-hidden bg-[#030713] text-white">
      {/* HERO */}
      <ServiceHero
        eyebrow="SAP BTP Full-Stack Development"
        title={service?.title ? `Custom Cloud Applications & ${service.title}` : "Custom Cloud Applications & Side-by-Side Extensions"}
        subtitle={service?.subtitle || "Build modern portals, mobile workflows, and clean-core extensions on SAP Business Technology Platform."}
        primaryCta={{ label: "Consult BTP architects", href: "/contact" }}
        secondaryCta={{ label: "Explore all services", href: "/services" }}
        metrics={metrics}
      />

      {/* WHAT WE BUILD + HERO TAIL */}
      <section className="relative bg-[#a8c0f1] bg-[radial-gradient(circle_at_15%_20%,#85a1da_0%,transparent_45%),radial-gradient(circle_at_70%_15%,#9eb6ce_0%,transparent_50%),radial-gradient(circle_at_35%_65%,#9cafda_0%,transparent_55%),radial-gradient(circle_at_85%_70%,#97b3f0_0%,transparent_50%),radial-gradient(circle_at_10%_90%,#c2dbec_0%,transparent_40%)] bg-blend-screen text-slate-900 py-16 sm:py-20 border-b border-slate-200">
        <div className="detail-split-grid mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-12">
          <div>
            <SlideReveal direction="left">
              <SectionLabel dark={false}>What we build</SectionLabel>
              <h2 className={`mt-5 ${introLead} text-slate-900`}>
                Modern apps, a clean core
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                We design cloud-native applications, side-by-side extensions, intuitive Fiori experiences, and
                automated workflows on SAP BTP — so teams work faster while keeping the SAP core clean.
              </p>
            </SlideReveal>
            <StaggerReveal className="mt-10 grid gap-3 sm:grid-cols-3" stagger={0.1}>
              {tracks.map((t) => {
                const Icon = ICON_MAP[t.icon] || LayoutDashboard;
                return (
                  <StaggerRevealItem key={t.label} variant="fadeIn" className="h-full">
                    <div className="service-surface-card flex h-full flex-col p-5 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md">
                      <div className="flex items-center text-cyan-600">
                        <Icon className="h-7 w-7 text-cyan-600 stroke-cyan-600" strokeWidth={2} />
                      </div>
                      <h3 className="mt-4 font-bold text-slate-900 text-base sm:text-lg">{t.label}</h3>
                      <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600">{t.desc}</p>
                    </div>
                  </StaggerRevealItem>
                );
              })}
            </StaggerReveal>
          </div>

          <div className="grid grid-cols-2 gap-4 items-stretch">
            <Reveal className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                <Metric to={3} suffix="x" label="Faster delivery" accent="text-slate-900" />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                <Metric to={0} label="Core disruption" accent="text-slate-900" sub="extensions live outside the core" />
              </div>
            </Reveal>
            <Reveal delay={0.2} className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                <Metric to={100} suffix="%" label="Upgrade readiness" accent="text-slate-900" />
              </div>
            </Reveal>
            <Reveal delay={0.3} className="h-full">
              <div className="h-full p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                <Metric to={60} suffix="%" label="Less custom code" accent="text-slate-900" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* THREE PILLARS (DARK) */}
      <section className="relative overflow-hidden bg-[#050817] py-20 text-white sm:py-28 border-b border-white/10">
        <div aria-hidden className="absolute inset-0 tri-hex-grid opacity-60" />
        <Container className="relative">
          <Reveal className="max-w-2xl">
            <SectionLabel dark={true}>Technology foundation</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Integration, data and AI together
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Applications are only as good as the platform underneath. We bring together integration, data models,
              and intelligent services into one coherent architecture.
            </p>
          </Reveal>

          <StaggerReveal className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.12}>
            {triplets.map((t) => {
              const Icon = ICON_MAP[t.icon] || Plug;
              return (
                <StaggerRevealItem key={t.label} variant="scale">
                  <div className="service-surface-card flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm">
                    <div>
                      <div className="flex items-center text-white">
                        <Icon className="h-7 w-7 text-white stroke-white" strokeWidth={2} />
                      </div>
                      <h3 className="mt-5 text-2xl font-bold text-white">{t.label}</h3>
                      <p className="mt-3 text-base leading-7 text-slate-300">{t.desc}</p>
                    </div>
                  </div>
                </StaggerRevealItem>
              );
            })}
          </StaggerReveal>
        </Container>
      </section>

      {/* CORE OFFERINGS */}
      <section className="relative bg-[#a8c0f1] bg-[radial-gradient(circle_at_15%_20%,#85a1da_0%,transparent_45%),radial-gradient(circle_at_70%_15%,#9eb6ce_0%,transparent_50%),radial-gradient(circle_at_35%_65%,#9cafda_0%,transparent_55%),radial-gradient(circle_at_85%_70%,#97b3f0_0%,transparent_50%),radial-gradient(circle_at_10%_90%,#c2dbec_0%,transparent_40%)] bg-blend-screen text-slate-900 py-20 sm:py-24 border-b border-slate-200">
        <Container>
          <div className="detail-split-grid grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <Reveal>
              <SectionLabel dark={false}>Development scope</SectionLabel>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                BTP solutions across your stack
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-xl text-lg leading-8 text-slate-600">
                From simple mobile apps to complex multi-system workflow engines, we build maintainable software that
                grows with your business.
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

      {/* WHY OUR BTP (DARK) */}
      <section className="relative overflow-hidden bg-[#050817] py-20 text-white sm:py-28 border-b border-white/10">
        <div aria-hidden className="absolute inset-0 tri-grid-bg opacity-50" />
        <Container className="relative">
          <div className="detail-split-grid grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <Reveal>
                <SectionLabel dark={true}>Business value</SectionLabel>
                <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                  Built to scale, built to last
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 text-lg leading-8 text-slate-300">
                  Every application we build is designed with governance, test coverage, and documentation from day one
                  — so your internal teams can maintain and extend it with confidence.
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
