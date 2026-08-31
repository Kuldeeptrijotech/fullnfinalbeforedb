"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatHistoryMessage, ChatResponse, ChatbotSettings } from "@/app/types/chatbot";
import { MessageCircle, RotateCcw, Send, X } from "lucide-react";

type UiMessage = ChatHistoryMessage & { id: string; error?: boolean; sources?: ChatResponse["sources"] };
type VisitorDetails = { firstName: string; lastName: string; email: string; mobile: string; address: string; country: string; queryType: string };
const emptyVisitor: VisitorDetails = { firstName: "", lastName: "", email: "", mobile: "", address: "", country: "", queryType: "" };
const welcome: UiMessage = { id: "welcome", role: "assistant", content: "Hello! I am the Trijotech AI assistant. I am here to help with our services, SAP topics, technology questions, careers, and getting in touch. What would you like to explore?" };
const conversation = () => typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `chat-${Date.now()}-${Math.random().toString(36).slice(2)}`;
const newConversation = (welcomeMessage = welcome.content): { id: string; messages: UiMessage[] } => ({ id: conversation(), messages: [{ ...welcome, content: welcomeMessage }] });

function SafeText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\(\/?[^)]+\))/g).filter(Boolean);
  return <>{parts.map((part, index) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/); if (bold) return <strong key={index}>{bold[1]}</strong>;
    const link = part.match(/^\[([^\]]+)\]\((\/[^)]+|mailto:[^\s)]+)\)$/); if (link) return <a key={index} href={link[2]}>{link[1]}</a>;
    return <span key={index}>{part.replace(/\n/g, "\n")}</span>;
  })}</>;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false); const [state, setState] = useState<{ id: string; messages: UiMessage[] } | null>(null); const [input, setInput] = useState(""); const [loading, setLoading] = useState(false); const [unread, setUnread] = useState(0);
  const [visitor, setVisitor] = useState<VisitorDetails>(emptyVisitor); const [started, setStarted] = useState(false);
  const [settings, setSettings] = useState<Pick<ChatbotSettings, "enabled" | "assistantName" | "welcomeMessage" | "suggestedQuestions" | "contactButton" | "maximumMessageLength"> | null>(null); const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null); const endRef = useRef<HTMLDivElement>(null); const abortRef = useRef<AbortController | null>(null); const lastFailed = useRef<string>("");
  const chatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let active = true;
    const hydrate = async () => {
      try {
        const response = await fetch("/api/chat/settings", { cache: "no-store" });
        const next = await response.json();
        if (!active) return;
        const normalized = {
          enabled: next.enabled !== false,
          assistantName: typeof next.assistantName === "string" && next.assistantName.trim() ? next.assistantName : "Trijotech AI Assistant",
          welcomeMessage: typeof next.welcomeMessage === "string" && next.welcomeMessage.trim() ? next.welcomeMessage : welcome.content,
          suggestedQuestions: Array.isArray(next.suggestedQuestions) && next.suggestedQuestions.length ? next.suggestedQuestions : ["Our Services", "About Trijotech", "Careers", "Contact Our Team"],
          contactButton: next.contactButton !== false,
          maximumMessageLength: Number.isFinite(next.maximumMessageLength) ? next.maximumMessageLength : 2000,
        };
        setSettings(normalized);
        setSuggestions(normalized.suggestedQuestions);
        setState((current) => current ?? newConversation(normalized.welcomeMessage));
      } catch {
        if (!active) return;
        const fallback = { enabled: true, assistantName: "Trijotech AI Assistant", welcomeMessage: welcome.content, suggestedQuestions: ["Our Services", "About Trijotech", "Careers", "Contact Our Team"], contactButton: true, maximumMessageLength: 2000 };
        setSettings(fallback);
        setSuggestions(fallback.suggestedQuestions);
        setState((current) => current ?? newConversation(fallback.welcomeMessage));
      }
    };
    void hydrate();
    return () => { active = false; };
  }, []);
  useEffect(() => { if (open) { setUnread(0); if (started) requestAnimationFrame(() => inputRef.current?.focus()); void fetch("/api/chat/analytics", { method: "POST" }); } }, [open, started]);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state?.messages, loading]);
  useEffect(() => { const key = (event: KeyboardEvent) => { if (event.key === "Escape" && open) setOpen(false); }; document.addEventListener("keydown", key); return () => document.removeEventListener("keydown", key); }, [open]);
  useEffect(() => {
    if (!open) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [open]);
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  async function send(value = input) {
    const message = value.trim(); if (!message || loading || !state || message.length > 2000) return;
    setInput(""); setLoading(true); lastFailed.current = "";
    const user: UiMessage = { id: conversation(), role: "user", content: message }; const nextMessages = [...state.messages, user]; setState({ ...state, messages: nextMessages });
    const controller = new AbortController(); abortRef.current = controller;
    try {
      const history = state.messages.filter((item) => item.id !== "welcome" && !item.error).slice(-8).map(({ role, content }) => ({ role, content }));
      const response = await fetch("/api/chat", { method: "POST", signal: controller.signal, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message, conversationId: state.id, history }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || "Sorry, I could not complete that request right now.");
      const assistant: UiMessage = { id: conversation(), role: "assistant", content: data.message, sources: data.sources }; setSuggestions(data.suggestions || settings?.suggestedQuestions || []); setState((current) => current ? { id: data.conversationId || current.id, messages: [...current.messages, assistant] } : current); if (!open) setUnread((count) => count + 1);
    } catch (error) { if ((error as Error).name !== "AbortError") { lastFailed.current = message; setState((current) => current ? { ...current, messages: [...current.messages, { id: conversation(), role: "assistant", error: true, content: navigator.onLine ? (error as Error).message : "You appear to be offline. Check your connection and try again." }] } : current); } }
    finally { if (abortRef.current === controller) abortRef.current = null; setLoading(false); }
  }
  function clear() { abortRef.current?.abort(); setState(newConversation(settings?.welcomeMessage)); setSuggestions(settings?.suggestedQuestions || []); setInput(""); setLoading(false); }
  function updateVisitor(field: keyof VisitorDetails, value: string) { setVisitor((current) => ({ ...current, [field]: value })); }
  function startChat(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setVisitor((current) => Object.fromEntries(Object.entries(current).map(([key, value]) => [key, value.trim()])) as VisitorDetails);
    setStarted(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  }
  if (!state || !settings?.enabled) return null;
  return (
    <div ref={chatRef} className="fixed bottom-6 right-6 z-[60] font-sans max-[520px]:bottom-3 max-[520px]:right-3">
      {open && (
        <section className="trijo-chat-window absolute bottom-[74px] right-0 flex w-[min(430px,calc(100vw-32px))] flex-col overflow-hidden border border-white/10 bg-[#0b1020] text-white max-[520px]:fixed max-[520px]:inset-0 max-[520px]:h-dvh max-[520px]:w-full" role="dialog" aria-modal="false" aria-label="Trijotech chat assistant">
          <header>
            <div className="trijo-chat-avatar" aria-hidden="true"><MessageCircle size={21} /></div>
            <div><strong>{settings.assistantName}</strong><span><i /> Online assistant</span></div>
            {started && <button type="button" onClick={clear} aria-label="Clear chat" title="Clear chat"><RotateCcw size={18} /></button>}
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chatbot"><X size={20} /></button>
          </header>

          {!started ? (
            <form className="flex-1 space-y-3 overflow-y-auto bg-[#080d19] p-4" onSubmit={startChat}>
              <div><h2 className="text-lg font-bold text-white">Start a conversation</h2><p className="mt-1 text-xs leading-5 text-white/55">Tell us a little about yourself so we can direct your query correctly.</p></div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="text-xs font-semibold text-white/75">First Name *<input required autoComplete="given-name" value={visitor.firstName} onChange={(event) => updateVisitor("firstName", event.target.value)} className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400" /></label>
                <label className="text-xs font-semibold text-white/75">Last Name <span className="font-normal text-white/40">(optional)</span><input autoComplete="family-name" value={visitor.lastName} onChange={(event) => updateVisitor("lastName", event.target.value)} className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400" /></label>
              </div>
              <label className="block text-xs font-semibold text-white/75">Email Address *<input required type="email" autoComplete="email" value={visitor.email} onChange={(event) => updateVisitor("email", event.target.value)} className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400" /></label>
              <label className="block text-xs font-semibold text-white/75">Mobile Number <span className="font-normal text-white/40">(optional)</span><input type="tel" autoComplete="tel" value={visitor.mobile} onChange={(event) => updateVisitor("mobile", event.target.value)} className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400" /></label>
              <label className="block text-xs font-semibold text-white/75">Address *<textarea required autoComplete="street-address" rows={2} value={visitor.address} onChange={(event) => updateVisitor("address", event.target.value)} className="mt-1 w-full resize-none rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400" /></label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="text-xs font-semibold text-white/75">Country *<select required value={visitor.country} onChange={(event) => updateVisitor("country", event.target.value)} className="mt-1 w-full rounded-lg border border-white/15 bg-[#101827] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400"><option value="">Select country</option><option>India</option><option>United States</option><option>United Kingdom</option><option>United Arab Emirates</option><option>Singapore</option><option>Australia</option><option>Canada</option><option>Germany</option><option>Other</option></select></label>
                <label className="text-xs font-semibold text-white/75">Query Type *<select required value={visitor.queryType} onChange={(event) => updateVisitor("queryType", event.target.value)} className="mt-1 w-full rounded-lg border border-white/15 bg-[#101827] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400"><option value="">Select query</option><option>Services</option><option>SAP Solutions</option><option>Project Enquiry</option><option>Support</option><option>Careers</option><option>Partnership</option><option>General Enquiry</option></select></label>
              </div>
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300">Continue to Chat <MessageCircle size={18} /></button>
              <p className="text-center text-[10px] leading-4 text-white/35">Your details are used to assist with this conversation. Do not submit confidential information.</p>
            </form>
          ) : (
            <>
              <div className="trijo-chat-messages" aria-live="polite">{state.messages.map((message) => <div key={message.id} className={`trijo-message ${message.role} ${message.error ? "error" : ""}`}><div><SafeText text={message.content} />{message.sources?.length ? <small>Sources: {message.sources.map((source, index) => <span key={source.id}>{index > 0 && " | "}{source.url ? <a href={source.url}>{source.title}</a> : source.title}</span>)}</small> : null}{message.error && lastFailed.current && <button type="button" onClick={() => send(lastFailed.current)}>Retry</button>}</div></div>)}{loading && <div className="trijo-message assistant is-typing"><div className="trijo-typing" aria-label="Assistant is typing"><i /><i /><i /></div><span className="trijo-typing-label">Trijotech is typing...</span></div>}<div ref={endRef} /></div>
              {suggestions.length > 0 && <div className="trijo-starters">{suggestions.map((question) => <button type="button" key={question} onClick={() => send(question)}>{question}</button>)}</div>}
              <form className="trijo-chat-composer" onSubmit={(event) => { event.preventDefault(); void send(); }}><textarea ref={inputRef} value={input} maxLength={settings.maximumMessageLength} rows={1} placeholder="Ask about our services..." aria-label="Chat message" onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void send(); } }} /><button type="submit" disabled={!input.trim() || loading} aria-label="Send message"><Send size={18} /></button></form>
              <p className="trijo-chat-note">AI responses may need verification. Do not share confidential information.</p>
            </>
          )}
        </section>
      )}
      <button type="button" className={`trijo-chat-launcher relative grid h-[58px] w-[58px] place-items-center rounded-full border border-cyan-300/35 bg-[linear-gradient(145deg,#111827,#071827_62%,#0891b2)] text-cyan-100 shadow-[0_16px_38px_rgba(3,7,19,.38),0_0_0_5px_rgba(34,211,238,.08)] transition ${open ? "max-[520px]:hidden" : ""}`} onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Close chat" : "Open chat"}>{open ? <X size={25} aria-hidden="true" /> : <MessageCircle size={27} aria-hidden="true" />}{unread > 0 && <b aria-label={`${unread} unread message`}>{unread}</b>}</button>
    </div>
  );
}
