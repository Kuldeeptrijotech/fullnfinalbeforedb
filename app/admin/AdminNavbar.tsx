"use client";

import Link from "next/link";

export type AdminTab = "content" | "blogs" | "chatbot" | "createblog" | "submissions";

const tabs: Array<{ id: AdminTab; label: string; href: string }> = [
  { id: "content", label: "Page Content", href: "/admin" },
  { id: "blogs", label: "Blog Management", href: "/admin/blogs" },
  { id: "submissions", label: "Form Submissions", href: "/admin/submissions" },
  { id: "chatbot", label: "Chatbot Studio", href: "/admin/chatbot" },
  { id: "createblog", label: "Create Blog", href: "/admin/createblog" },
];

const subtitles: Record<AdminTab, string> = {
  content: "Website Content Manager",
  blogs: "Blog Management Studio",
  submissions: "Contact & Career Submissions Manager",
  chatbot: "AI Chatbot & Intelligence Studio",
  createblog: "Create Blog Studio",
};

export default function AdminNavbar({
  activeTab,
  subtitle,
  extraActions,
}: {
  activeTab: AdminTab;
  subtitle?: string;
  extraActions?: React.ReactNode;
}) {
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.assign("/admin/login");
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

      <div className="flex items-center gap-2.5">
        {extraActions}
        <button type="button" className="inline-flex items-center justify-center h-9 px-4 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors" onClick={logout}>
          Sign out
        </button>
      </div>
    </header>
  );
}
