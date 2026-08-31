"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReveal() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.querySelector("[data-scroll-reveal-root]");
    if (!root) return;

    document.documentElement.classList.add("scroll-reveal-enabled");
    const sections = Array.from(root.querySelectorAll("section")).filter(
      (section) => !section.parentElement?.closest("section")
    );

    sections.forEach((section, index) => {
      section.classList.add("scroll-reveal-section");
      section.style.setProperty("--scroll-reveal-delay", (index % 3) * 45 + "ms");
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-scroll-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      sections.forEach((section) => {
        section.classList.remove("scroll-reveal-section", "is-scroll-revealed");
        section.style.removeProperty("--scroll-reveal-delay");
      });
      document.documentElement.classList.remove("scroll-reveal-enabled");
    };
  }, [pathname]);

  return null;
}
