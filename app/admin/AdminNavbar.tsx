"use client";

import Link from "next/link";
import { useState } from "react";

export type AdminTab = "content" | "blogs" | "chatbot" | "createblog" | "submissions" | "users";

const tabs: Array<{ id: AdminTab; label: string; href: string }> = [
  { id: "content", label: "Page Content", href: "/admin" },
  { id: "blogs", label: "Blog Management", href: "/admin/blogs" },
  { id: "submissions", label: "Form Submissions", href: "/admin/submissions" },
  { id: "chatbot", label: "Chatbot Studio", href: "/admin/chatbot" },
  { id: "createblog", label: "Create Blog", href: "/admin/createblog" },
  { id: "users", label: "Admin Users", href: "/admin/users" },
];

const subtitles: Record<AdminTab, string> = {
  content: "Website Content Manager",
  blogs: "Blog Management Studio",
  submissions: "Contact & Career Submissions Manager",
  chatbot: "AI Chatbot & Intelligence Studio",
  createblog: "Create Blog Studio",
  users: "Administrator Access Manager",
};

export default function AdminNavbar({
  activeTab,
  subtitle,
}: {
  activeTab: AdminTab;
  subtitle?: string;
}) {
  const [signingOut, setSigningOut] = useState(false);

  async function signOut() {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      window.location.replace("/admin/login");
    }
  }

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 w-full mb-5 px-5 py-3 border border-slate-200 rounded-2xl bg-white shadow-sm font-sans">
      <div>
        <strong className="block text-slate-900 text-sm font-bold leading-tight">Trijotech Admin</strong>
        <small className="block text-slate-500 text-xs">{subtitle || subtitles[activeTab]}</small>
      </div>

      <nav className="flex flex-wrap items-center gap-1.5 p-1 border border-slate-200 rounded-xl bg-slate-50" aria-label="Admin navigation">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            aria-current={activeTab === tab.id ? "page" : undefined}
            className={`inline-flex items-center h-8.5 px-3.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? "bg-[#17233d] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => void signOut()}
        disabled={signingOut}
        className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-xs font-bold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {signingOut ? "Signing out..." : "Sign out"}
      </button>
    </header>
  );
}
