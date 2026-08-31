import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { getPrivacyPolicyData } from "@/lib/services/privacy.service";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Privacy Policy | Trijotech",
  description: "Trijotech privacy policy and data governance practices.",
};

export const dynamic = "force-dynamic";

export default async function PrivacyPolicyPage() {
  const data = await getPrivacyPolicyData();

  return (
    <main className="privacy-policy-page font-sans overflow-hidden bg-[#030713] text-white">
      {/* ──── Hero ──── */}
      <section className="relative isolate min-h-[50vh] flex flex-col justify-center overflow-hidden bg-[#050817] pt-28 pb-12">
        <Image
          src="/assets/heroes/privacy-blue.png"
          alt="Trijotech Privacy Policy"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#030713]/90 via-[#030713]/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#030713] to-transparent" />

        <Container className="relative z-10 py-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {data.title}
            </h1>
            <p className="mt-4 text-sm font-semibold text-cyan-400">
              Last Updated: {data.lastUpdated}
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              {data.introduction}
            </p>
          </div>
        </Container>
      </section>

      {/* ──── Policy Content from PostgreSQL ──── */}
      <section className="py-16 sm:py-20 bg-[#030713] border-t border-white/10">
        <Container>
          <div className="mx-auto max-w-4xl space-y-10">
            {data.sections.map((section, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm"
              >
                <h2 className="text-xl font-bold text-white sm:text-2xl">
                  {section.heading}
                </h2>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300 whitespace-pre-line">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
