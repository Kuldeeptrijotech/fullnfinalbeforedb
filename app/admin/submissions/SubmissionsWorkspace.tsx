"use client";

import { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar";
import { Download, Mail, Phone, Building, Calendar, CheckCircle2, Clock, Archive, FileText } from "lucide-react";

type FormStatus = "NEW" | "IN_PROGRESS" | "RESOLVED" | "ARCHIVED";

type ContactItem = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  inquiryType: string | null;
  subject: string;
  message: string;
  status: FormStatus;
  notes: string | null;
  createdAt: string;
};

type CareerItem = {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  company: string | null;
  message: string;
  resumeName: string;
  status: FormStatus;
  notes: string | null;
  createdAt: string;
};

export default function SubmissionsWorkspace() {
  const [activeSubTab, setActiveSubTab] = useState<"contact" | "career">("contact");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [contactList, setContactList] = useState<ContactItem[]>([]);
  const [careerList, setCareerList] = useState<CareerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function loadData() {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/submissions", { cache: "no-store" });
      const data = await response.json();
      if (response.ok) {
        setContactList(data.contact?.submissions || []);
        setCareerList(data.careers?.submissions || []);
      }
    } catch (err) {
      console.error("Failed to load submissions:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadData();
  }, []);

  async function updateStatus(type: "contact" | "career", id: string, newStatus: FormStatus) {
    try {
      const res = await fetch("/api/admin/submissions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, id, status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed.");

      if (type === "contact") {
        setContactList((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      } else {
        setCareerList((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      }

      setNotice({ type: "success", text: `Status updated to ${newStatus}.` });
      setTimeout(() => setNotice(null), 3000);
    } catch (err) {
      setNotice({ type: "error", text: (err as Error).message });
    }
  }

  const filteredContacts = contactList.filter(
    (item) => statusFilter === "ALL" || item.status === statusFilter
  );
  const filteredCareers = careerList.filter(
    (item) => statusFilter === "ALL" || item.status === statusFilter
  );

  return (
    <main className="admin-shell" style={{ padding: "16px 28px 100px", minHeight: "100vh", background: "#f2f5f7" }}>
      <AdminNavbar activeTab="submissions" />

      <div className="w-full max-w-7xl mx-auto font-sans">
        {/* Header toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm mb-6">
          <div>
            <span className="text-xs font-bold tracking-wider uppercase text-cyan-700">SUBMISSION VAULT</span>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Form Submissions Manager</h1>
            <p className="text-sm text-slate-600">Review, manage, and process inbound Contact inquiries and Career applications stored in PostgreSQL.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => void loadData()}
              className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Refresh Data
            </button>
          </div>
        </div>

        {notice && (
          <div
            className={`p-4 rounded-xl mb-6 text-sm font-semibold ${
              notice.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            {notice.text}
          </div>
        )}

        {/* Tab & Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="inline-flex p-1 bg-slate-200/70 rounded-xl">
            <button
              onClick={() => setActiveSubTab("contact")}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === "contact" ? "bg-[#17233d] text-white shadow-sm" : "text-slate-700 hover:text-slate-900"
              }`}
            >
              Contact Enquiries ({contactList.length})
            </button>
            <button
              onClick={() => setActiveSubTab("career")}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === "career" ? "bg-[#17233d] text-white shadow-sm" : "text-slate-700 hover:text-slate-900"
              }`}
            >
              Career Applications ({careerList.length})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-600">Filter Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="NEW">New</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        </div>

        {/* Content Lists */}
        {loading ? (
          <div className="p-12 text-center text-slate-500 font-semibold bg-white rounded-2xl border border-slate-200">
            Loading PostgreSQL submissions…
          </div>
        ) : activeSubTab === "contact" ? (
          filteredContacts.length === 0 ? (
            <div className="p-12 text-center text-slate-500 font-medium bg-white rounded-2xl border border-slate-200">
              No contact enquiries match the selected filter.
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredContacts.map((c) => (
                <div key={c.id} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-slate-300 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-slate-900">{c.name}</h2>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          c.status === "NEW" ? "bg-amber-100 text-amber-800" :
                          c.status === "IN_PROGRESS" ? "bg-cyan-100 text-cyan-800" :
                          c.status === "RESOLVED" ? "bg-emerald-100 text-emerald-800" :
                          "bg-slate-100 text-slate-700"
                        }`}>
                          {c.status}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-500 mt-1">Subject: <span className="text-slate-800">{c.subject}</span></p>
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={c.status}
                        onChange={(e) => void updateStatus("contact", c.id, e.target.value as FormStatus)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-slate-50 text-slate-800"
                      >
                        <option value="NEW">Set NEW</option>
                        <option value="IN_PROGRESS">Set IN PROGRESS</option>
                        <option value="RESOLVED">Set RESOLVED</option>
                        <option value="ARCHIVED">Set ARCHIVED</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3 text-xs text-slate-600 mb-4 bg-slate-50 p-3.5 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-400" />
                      <a href={`mailto:${c.email}`} className="text-cyan-700 font-medium hover:underline">{c.email}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-slate-400" />
                      <span>{c.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-slate-400" />
                      <span>{c.company || "Individual / Not specified"}</span>
                    </div>
                  </div>

                  <div className="text-sm text-slate-800 leading-relaxed bg-white p-4 rounded-xl border border-slate-100 whitespace-pre-wrap">
                    {c.message}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-3 border-t border-slate-100">
                    <span>Inquiry Type: {c.inquiryType || "General"}</span>
                    <span>Submitted: {new Date(c.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          filteredCareers.length === 0 ? (
            <div className="p-12 text-center text-slate-500 font-medium bg-white rounded-2xl border border-slate-200">
              No career applications match the selected filter.
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredCareers.map((ca) => (
                <div key={ca.id} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-slate-300 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-slate-900">{ca.name}</h2>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          ca.status === "NEW" ? "bg-amber-100 text-amber-800" :
                          ca.status === "IN_PROGRESS" ? "bg-cyan-100 text-cyan-800" :
                          ca.status === "RESOLVED" ? "bg-emerald-100 text-emerald-800" :
                          "bg-slate-100 text-slate-700"
                        }`}>
                          {ca.status}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-500 mt-1">Applying for: <span className="text-cyan-700 font-bold">{ca.position}</span> ({ca.experience} yrs exp)</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={`/api/admin/submissions/resume/${ca.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-cyan-50 text-cyan-800 border border-cyan-200 hover:bg-cyan-100 transition-colors"
                      >
                        <Download className="h-3.5 w-3.5" /> Download Resume
                      </a>

                      <select
                        value={ca.status}
                        onChange={(e) => void updateStatus("career", ca.id, e.target.value as FormStatus)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-slate-50 text-slate-800"
                      >
                        <option value="NEW">Set NEW</option>
                        <option value="IN_PROGRESS">Set IN PROGRESS</option>
                        <option value="RESOLVED">Set RESOLVED</option>
                        <option value="ARCHIVED">Set ARCHIVED</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3 text-xs text-slate-600 mb-4 bg-slate-50 p-3.5 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-400" />
                      <a href={`mailto:${ca.email}`} className="text-cyan-700 font-medium hover:underline">{ca.email}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-slate-400" />
                      <span>{ca.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-slate-400" />
                      <span>Current: {ca.company || "Not specified"}</span>
                    </div>
                  </div>

                  {ca.message && (
                    <div className="text-sm text-slate-800 leading-relaxed bg-white p-4 rounded-xl border border-slate-100 whitespace-pre-wrap mb-3">
                      {ca.message}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-100">
                    <span>File: {ca.resumeName}</span>
                    <span>Applied: {new Date(ca.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </main>
  );
}
