"use client";

import Container from "@/components/ui/Container";
import { FaLinkedinIn, FaYoutube, FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { FooterData } from "@/lib/services/navigation.service";

const socialIcons: Record<string, IconType> = {
  YouTube: FaYoutube,
  LinkedIn: FaLinkedinIn,
  X: FaXTwitter,
};

const defaultFooterData: FooterData = {
  summary: "Trijotech helps organizations modernize SAP landscapes, data platforms, and cloud applications with practical engineering teams.",
  columns: [
    {
      title: "Useful Links",
      links: [
        { label: "Home", href: "/" },
        { label: "Blogs", href: "/blogs" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "Videos", href: "/videos" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Services", href: "/services" },
        { label: "Solutions", href: "/solutions" },
        { label: "Industries", href: "/industries/retail-supply-chain" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Compliance",
      links: [{ label: "Privacy Policy", href: "/privacy-policy" }],
    },
  ],
  contact: {
    email: "sales@trijotech.com",
    phones: [
      { label: "+91 120-3506433", href: "tel:+911203506433" },
      { label: "+91 7982531976", href: "tel:+917982531976" },
    ],
    addresses: [
      {
        title: "Corporate Address",
        lines: ["C56A, Infinity Technopark, 501, 16, C Block,", "Phase 2, Sector 62, Noida,", "Uttar Pradesh 201309"],
      },
      {
        title: "Registered Address",
        lines: ["House No. 74, 2nd Floor, Block B,", "Pocket 6, Sector 7, Rohini,", "North West Delhi - 110085"],
      },
    ],
  },
  badges: [
    { label: "Trijotech Software Consulting Pvt Ltd", src: "/static/footer/trijotech-footer-logo.png", width: 500, height: 289 },
    { label: "SAP Partner", src: "/static/footer/sap-partner-logo.png", width: 130, height: 65 },
    { label: "ISO certifications", src: "/static/footer/iso-certifications.png", width: 135, height: 65 },
  ],
  socialLinks: [
    { label: "YouTube", href: "https://www.youtube.com/@trijotech" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/trijotech/" },
    { label: "X", href: "https://x.com/trijotech" },
  ],
};

export default function Footer({ initialFooter }: { initialFooter?: FooterData }) {
  const [footer, setFooter] = useState<FooterData>(initialFooter || defaultFooterData);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (!initialFooter) {
      fetch("/api/navigation")
        .then((res) => res.json())
        .then((data) => {
          if (data && data.footer) {
            setFooter(data.footer);
          }
        })
        .catch((err) => console.error("Failed to load footer data:", err));
    }
  }, [initialFooter]);

  return (
    <footer className="zip-footer bg-[#050817] font-sans text-white">
      <div className="border-t border-white/10">
        <Container className="py-10 md:py-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.35fr] lg:gap-14 xl:gap-20">
            <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
              {footer.columns.map((column) => (
                <div key={column.title}>
                  <h2 className="m-0 text-sm font-semibold leading-6 text-white">{column.title}</h2>
                  <ul className="m-0 mt-4 list-none space-y-2.5 p-0">
                    {column.links.map((link) => (
                      <li key={`${column.title}-${link.label}-${link.href}`}>
                        <Link href={link.href} className="text-sm font-medium leading-6 text-white/60 no-underline transition hover:text-cyan-300">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            <div>
              <div className="grid gap-7 sm:grid-cols-2 sm:gap-8">
                {footer.contact.addresses.map((address) => (
                  <address key={address.title} className="m-0 not-italic">
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-950/40 text-cyan-300">
                        <MapPin className="size-4" />
                      </span>
                      <h2 className="m-0 text-sm font-semibold leading-6 text-white">{address.title}</h2>
                    </div>
                    <p className="m-0 mt-3 text-sm font-medium leading-5 text-white/65">
                      {address.lines.map((line) => <span key={line} className="block">{line}</span>)}
                    </p>
                  </address>
                ))}
              </div>

              <div className="mt-6">
                <h2 className="m-0 text-sm font-semibold text-white">Talk to our team</h2>
                <div className="mt-3 flex flex-col items-stretch gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
                  <a href={`mailto:${footer.contact.email}`} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-cyan-400/50 px-4 py-1.5 text-sm font-semibold text-white no-underline transition sm:w-fit">
                    <Mail className="size-4" /> {footer.contact.email}
                  </a>
                  {footer.contact.phones.map((phone) => (
                    <a key={phone.href} href={phone.href} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-cyan-400/50 px-4 py-1.5 text-sm font-semibold text-white no-underline transition sm:w-fit">
                      <Phone className="size-4" /> {phone.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>

        <div className="border-y border-white/10 bg-white/[0.025]">
          <Container className="py-5">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-5 md:gap-7">
                {footer.badges.map((badge) => (
                  <Image key={badge.src} src={badge.src} alt={badge.label} width={badge.width} height={badge.height} className="h-auto max-h-14 w-auto max-w-32 object-contain" style={{ width: "auto", height: "auto" }} />
                ))}
              </div>
              <div className="flex items-center gap-2">
                {footer.socialLinks.map((socialLink) => {
                  const Icon = socialIcons[socialLink.label];
                  return (
                    <a key={socialLink.href} href={socialLink.href} target="_blank" rel="noreferrer" aria-label={socialLink.label} title={socialLink.label} className="flex size-10 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] text-white/60 no-underline transition hover:-translate-y-0.5 hover:border-cyan-300/50 hover:bg-white/10 hover:text-cyan-200">
                      {Icon ? <Icon className="size-4.5" /> : null}
                    </a>
                  );
                })}
              </div>
            </div>
          </Container>
        </div>

        <Container className="py-5">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
            <p className="m-0 text-sm leading-6 text-white/50">Copyright &copy; Trijotech Software Consulting Pvt. Ltd. {currentYear}. All rights reserved.</p>
            <Link href="/privacy-policy" className="text-xs font-medium text-white/45 no-underline transition hover:text-cyan-200">Privacy Policy</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}