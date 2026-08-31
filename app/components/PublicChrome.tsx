"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DeferredChatbot from "./chatbot/DeferredChatbot";
import ScrollReveal from "./ScrollReveal";

export default function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return <>{children}</>;
  const isLandingPage = [
    "/services",
    "/solutions",
    "/insights",
  ].includes(pathname.toLowerCase());
  const usesStandaloneTailwind =
    pathname === "/services" ||
    pathname === "/solutions" ||
    pathname === "/insights" ||
    pathname.startsWith("/industries/") ||
    pathname === "/blogs" ||
    pathname === "/videos" ||
    pathname === "/case-studies" ||
    pathname === "/careers" ||
    pathname === "/contact" ||
    pathname === "/about-us";
  const usesModernDetailTheme =
    pathname.startsWith("/services/") ||
    pathname.startsWith("/solutions/");
  return (
    <>
      <ScrollReveal />
      <Header />
      {pathname === "/" ? <div data-scroll-reveal-root>{children}</div> : usesStandaloneTailwind || usesModernDetailTheme ? (
        <div data-scroll-reveal-root className={`font-sans ${isLandingPage ? "site-landing-theme" : "site-subpage-theme"}`}>{children}</div>
      ) : (
        <div data-scroll-reveal-root className={`zip-inner-theme font-sans ${isLandingPage ? "site-landing-theme" : "site-subpage-theme"}`}>{children}</div>
      )}
      <Footer />
      <DeferredChatbot />
    </>
  );
}
