import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import { Reveal, StaggerReveal, StaggerRevealItem } from "@/components/motion/Reveal";
import OptimizedVideo from "@/components/ui/OptimizedVideo";
import DynamicIcon from "@/components/ui/DynamicIcon";
import type { WhyChooseUsSectionData } from "@/lib/services/homepage.service";

export type WhyChooseUsProps = WhyChooseUsSectionData;

export default function WhyChooseUs({
  eyebrow,
  title,
  description,
  stats = [],
  items = [],
}: WhyChooseUsProps) {
  const visibleItems = items.filter((item) => item.showOnHome !== false);

  const parsedStats = stats.map((stat) => ({
    ...stat,
    numeric:
      stat.numeric !== undefined
        ? stat.numeric
        : parseInt(stat.value.replace(/[^0-9]/g, ""), 10) || 0,
    suffix:
      stat.suffix !== undefined
        ? stat.suffix
        : stat.value.replace(/[0-9]/g, ""),
  }));

  return (
    <section id="why-choose-us" className="relative isolate overflow-hidden bg-[#a8c0f1] bg-[radial-gradient(circle_at_15%_20%,#85a1da_0%,transparent_45%),radial-gradient(circle_at_70%_15%,#9eb6ce_0%,transparent_50%),radial-gradient(circle_at_35%_65%,#9cafda_0%,transparent_55%),radial-gradient(circle_at_85%_70%,#97b3f0_0%,transparent_50%),radial-gradient(circle_at_10%_90%,#c2dbec_0%,transparent_40%)] bg-blend-screen py-12 sm:py-14 lg:py-16 text-slate-900 border-t border-slate-200">
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            dark={false}
            align="center"
            className="mx-auto"
            title={title}
            description={description}
          />
        </Reveal>

        {/* stats band */}
        {parsedStats.length > 0 && (
          <Reveal delay={0.08}>
            <div className="mt-6 sm:mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-white text-slate-900 p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4 sm:p-6">
              {parsedStats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center text-center">
                  <p className="text-3xl font-bold sm:text-4xl text-slate-900">
                    <AnimatedCounter
                      to={stat.numeric}
                      suffix={stat.suffix}
                      className="text-slate-900"
                    />
                  </p>
                  <p className="mt-1 max-w-[14rem] text-xs font-medium leading-tight text-slate-600">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        <StaggerReveal className="mt-6 sm:mt-8 grid gap-5 lg:grid-cols-3 items-stretch" stagger={0.08}>
          {visibleItems.map((item, index) => (
            <StaggerRevealItem key={item.title} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md">
                <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-900">
                  <OptimizedVideo
                    src={item.image}
                    alt={item.imageAlt || item.title}
                    className={`pointer-events-none absolute inset-0 h-full w-full object-cover origin-center ${
                      index > 0 ? "scale-[1.22]" : "scale-[1.02]"
                    }`}
                  />
                  <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(14,26,44,0.7)] via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 z-10 flex items-center justify-center text-cyan-200 drop-shadow-md">
                    <DynamicIcon name={item.icon} className="h-6 w-6 text-cyan-200 stroke-cyan-200" strokeWidth={2} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base sm:text-lg font-bold leading-snug text-slate-900 transition-colors">{item.title}</h3>
                  <p className="mt-2 flex-1 text-xs sm:text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              </article>
            </StaggerRevealItem>
          ))}
        </StaggerReveal>
      </Container>
    </section>
  );
}
