"use client";

import Image from "next/image";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import ContactUs from "@/app/components/ContactUs";
import { motion } from "framer-motion";
import type { ContactPageData } from "@/lib/services/contact.service";

export default function ContactClientView({ data }: { data: ContactPageData }) {
  const { heroTitle, heroSubtitle, heroImage, salesEmail, phones, addresses } = data;

  return (
    <main className="public-alternating-page font-sans overflow-hidden bg-[#030713] text-white">
      {/* ──── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-[#050817] pt-24 sm:pt-28 lg:pt-24 pb-12">
        <Image
          src={heroImage}
          alt="Contact Trijotech enterprise consulting team"
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-95"
        />
        <div className="absolute inset-0 -z-10 tri-mesh opacity-50" />
        <div className="absolute inset-0 -z-10 tri-grid-bg opacity-30" />

        <div className="pointer-events-none absolute right-[8%] top-[14%] h-64 w-64 rounded-full bg-[rgba(255, 255, 255,0.14)] blur-3xl" />
        <div className="pointer-events-none absolute bottom-[16%] left-[6%] h-48 w-48 rounded-full bg-[rgba(255, 255, 255,0.12)] blur-3xl" style={{ animationDelay: "1.5s" }} />

        <div className="pointer-events-none absolute inset-0 max-lg:bg-[#050817]/65 lg:bg-[linear-gradient(to_right,rgba(5,8,23,0.85)_0%,rgba(5,8,23,0.45)_50%,transparent_85%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#050817] to-transparent" />

        <div className="mx-auto flex min-h-[calc(100svh-9.5rem)] w-full max-w-7xl items-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="max-w-3xl">
            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl"
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
              transition={{ duration: 0.5, delay: 0.52 }}
              className="mt-9 flex flex-wrap gap-4 relative z-10"
            >
              <a
                href="#contact-form"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 border-0 shadow-[0_8px_20px_rgba(255,255,255,0.25)] hover:shadow-[0_12px_28px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:translate-y-0 relative z-10 hover:z-20 transition-all duration-200"
              >
                Start a conversation <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </div>

        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/[0.08]" />
      </section>

      {/* ──── Contact Info from PostgreSQL ────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#a8c0f1] bg-[radial-gradient(circle_at_15%_20%,#85a1da_0%,transparent_45%),radial-gradient(circle_at_70%_15%,#9eb6ce_0%,transparent_50%),radial-gradient(circle_at_35%_65%,#9cafda_0%,transparent_55%),radial-gradient(circle_at_85%_70%,#97b3f0_0%,transparent_50%),radial-gradient(circle_at_10%_90%,#c2dbec_0%,transparent_40%)] bg-blend-screen py-12 sm:py-14 lg:py-16 border-b border-slate-200 text-slate-900">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="max-w-3xl"
          >
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-900">Get in touch</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Connect with our team
            </h2>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
              Reach out directly or send us an enquiry below. We are here to answer questions and explore how we can support your initiatives.
            </p>
          </motion.div>

          <div className="mt-7 sm:mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            {/* Phone */}
            <motion.article
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white text-slate-900 p-5 sm:p-6 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900 shadow-md transition-transform duration-300">
                <Phone className="h-5.5 w-5.5 text-slate-900" strokeWidth={2.2} />
              </div>
              <h3 className="mt-4 text-base font-bold leading-[1.4] text-slate-900 sm:text-lg">Call us</h3>
              <div className="mt-2 flex flex-1 flex-col gap-1.5 text-xs sm:text-sm leading-relaxed text-slate-600 [&_a]:font-normal [&_a]:text-slate-900 [&_a]:underline">
                {phones.map((phone) => (
                  <a key={phone.href} href={phone.href} className="inline-flex min-h-6 items-center pt-0.5 !font-normal leading-[1.5] text-slate-900 hover:underline">
                    {phone.label} {phone.desc ? `(${phone.desc})` : ""}
                  </a>
                ))}
              </div>
            </motion.article>

            {/* Email */}
            <motion.article
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white text-slate-900 p-5 sm:p-6 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900 shadow-md transition-transform duration-300">
                <Mail className="h-5.5 w-5.5 text-slate-900" strokeWidth={2.2} />
              </div>
              <h3 className="mt-4 text-base font-bold leading-[1.4] text-slate-900 sm:text-lg pt-0.5">Email us</h3>
              <div className="mt-2 flex flex-1 flex-col gap-1.5 text-xs sm:text-sm leading-relaxed text-slate-600 [&_a]:font-normal [&_a]:text-slate-900 [&_a]:underline">
                <a href={`mailto:${salesEmail}`} className="inline-flex min-h-6 items-center pt-0.5 !font-normal leading-[1.5] text-slate-900 hover:underline">
                  {salesEmail}
                </a>
              </div>
            </motion.article>

            {/* Address */}
            <motion.article
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.24, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white text-slate-900 p-5 sm:p-6 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900 shadow-md transition-transform duration-300">
                <MapPin className="h-5.5 w-5.5 text-slate-900" strokeWidth={2.2} />
              </div>
              <h3 className="mt-4 text-base font-bold leading-[1.4] text-slate-900 sm:text-lg">Visit us</h3>
              <div className="mt-2 flex flex-1 flex-col gap-1.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                {addresses.map((addr) => (
                  <div key={addr.title} className="mb-2 last:mb-0">
                    <p className="font-semibold text-slate-900">{addr.title}</p>
                    <p className="text-slate-600">{addr.lines.join(", ")}</p>
                  </div>
                ))}
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      {/* ──── Contact Form ────────────────────────────────────────────── */}
      <section
        id="contact-form"
        className="contact-form-section relative isolate overflow-hidden scroll-mt-24 bg-[#050817] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 border-t border-white/10 text-white"
      >
        <div className="mx-auto w-full max-w-5xl">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="mb-8 text-center"
          >
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#38bdf8]">Send an enquiry</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              How can we help you?
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-300">
              Share a few details and we will respond within one to two business days.
            </p>
          </motion.div>
          <motion.div className="w-full" initial={false}>
            <ContactUs showInquiryDropdown hideHeading />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
