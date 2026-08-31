"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Check, ChevronDown, FileText, Upload } from "lucide-react";
const TURNSTILE_SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
function TurnstileField({ action, onTokenChange, resetSignal }) {
 const containerRef=useRef(null),widgetIdRef=useRef(null),siteKey=process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
 const [scriptReady,setScriptReady]=useState(false),[challengeState,setChallengeState]=useState("loading");
 useEffect(()=>{if(!scriptReady||!siteKey||!containerRef.current||!window.turnstile||widgetIdRef.current!==null)return;widgetIdRef.current=window.turnstile.render(containerRef.current,{sitekey:siteKey,action,theme:"light",size:"flexible",callback:(token)=>{onTokenChange(token);setChallengeState("verified");},"expired-callback":()=>{onTokenChange("");setChallengeState("expired");},"error-callback":()=>{onTokenChange("");setChallengeState("error");}});return()=>{if(widgetIdRef.current!==null&&window.turnstile)window.turnstile.remove(widgetIdRef.current);widgetIdRef.current=null;};},[action,onTokenChange,scriptReady,siteKey]);
 useEffect(()=>{if(resetSignal>0&&widgetIdRef.current!==null&&window.turnstile){window.turnstile.reset(widgetIdRef.current);onTokenChange("");setChallengeState("loading");}},[onTokenChange,resetSignal]);
 if(!siteKey)return <p className="turnstile-notice turnstile-notice-error" role="alert">Secure verification is temporarily unavailable. Please try again later.</p>;
 return <div className="turnstile-shell" aria-label="Cloudflare security verification"><Script src={TURNSTILE_SCRIPT} strategy="afterInteractive" onReady={()=>setScriptReady(true)}/><div ref={containerRef} className="turnstile-widget"/>{challengeState==="loading"&&<p className="turnstile-notice">Checking your connection securely...</p>}{challengeState==="verified"&&<p className="turnstile-notice turnstile-notice-success"><Check className="h-4 w-4"/> Security check complete</p>}{challengeState==="expired"&&<p className="turnstile-notice turnstile-notice-error">Verification expired. Please complete the check again.</p>}{challengeState==="error"&&<p className="turnstile-notice turnstile-notice-error">The security check could not load. Please refresh and try again.</p>}</div>;
}

function CustomSelect({ name, placeholder, options, required = false, controlClass }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("");
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Reset dropdown selection on form reset
    useEffect(() => {
        const form = dropdownRef.current?.closest("form");
        if (!form) return;
        const handleReset = () => setSelected("");
        form.addEventListener("reset", handleReset);
        return () => form.removeEventListener("reset", handleReset);
    }, []);

    return (
        <div ref={dropdownRef} className="relative w-full">
            <input
                type="hidden"
                name={name}
                value={selected}
                onChange={() => {}}
                tabIndex={-1}
                className="absolute inset-0 opacity-0 pointer-events-none h-full w-full"
                aria-hidden="true"
            />
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={`${controlClass} contact-custom-select-trigger flex items-center justify-between text-left cursor-pointer transition-colors !bg-slate-50 !text-slate-900 ${
                    !selected ? "!text-slate-500" : "!text-slate-900 font-semibold"
                } ${isOpen ? "!border-slate-900 ring-2 ring-slate-900/10" : "!border-slate-300"}`}
                style={{ color: "#0f172a", backgroundColor: "#f8fafc" }}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-required={required}
            >
                <span
                    className={`contact-custom-select-value truncate ${selected ? "is-selected !text-slate-900 font-semibold" : "is-placeholder !text-slate-500"}`}
                    style={{ color: selected ? "#0f172a" : "#64748b", fontWeight: selected ? 600 : 400 }}
                >
                    {selected || placeholder}
                </span>
                <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-slate-900" : "text-slate-600"
                    }`}
                />
            </button>

            {isOpen && (
                <div className="contact-custom-select-menu absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.15)]" style={{ backgroundColor: "#ffffff" }}>
                    <ul role="listbox" className="max-h-60 overflow-y-auto space-y-1 bg-white" style={{ backgroundColor: "#ffffff" }}>
                        {options.map((option) => {
                            const isSelected = selected === option;
                            return (
                                <li
                                    key={option}
                                    role="option"
                                    aria-selected={isSelected}
                                    onClick={() => {
                                        setSelected(option);
                                        setIsOpen(false);
                                    }}
                                    className={`contact-custom-select-option flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[14px] cursor-pointer transition-all duration-150 ${
                                        isSelected
                                            ? "bg-slate-100 font-bold text-slate-900"
                                            : "bg-white text-slate-900 hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                                    style={{ backgroundColor: isSelected ? "#f1f5f9" : "#ffffff", color: "#0f172a" }}
                                >
                                    <span style={{ color: "#0f172a", fontWeight: isSelected ? 700 : 500 }}>{option}</span>
                                    {isSelected && <Check className="h-4 w-4 text-slate-900" style={{ color: "#0f172a" }} />}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default function ContactUs({
    heading = "Contact Us",
    description = "Fill in the form provided, and we will contact you within one to two business days.",
    variant = "default",
    showResume = false,
    showInquiryDropdown = false,
    hideHeading = false,
}) {
    const isCareer = variant === "career" || showResume;
    const sectionClass = "w-full bg-transparent p-0 text-slate-900";
    const fieldColumn = "w-full px-2 md:w-1/2 md:max-w-1/2 md:basis-1/2";
    const fullColumn = "w-full px-2 md:max-w-full md:basis-full";
    const controlClass = "contact-form-control m-0 h-[48px] w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-[14px] font-medium text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-slate-900 focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:shadow-sm";
    const formRef = useRef(null);
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [status, setStatus] = useState({ type: "", message: "" });
    const [submitting, setSubmitting] = useState(false);
    const [turnstileToken, setTurnstileToken] = useState("");
    const [turnstileReset, setTurnstileReset] = useState(0);

    useEffect(() => {
        const form = formRef.current;
        if (!form) return;
        const handleReset = () => setSelectedFile(null);
        form.addEventListener("reset", handleReset);
        return () => form.removeEventListener("reset", handleReset);
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        setSelectedFile(file || null);
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return "";
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    async function handleSubmit(event) {
        event.preventDefault();
        setStatus({ type: "", message: "" });
        const form = event.currentTarget;
        const data = new FormData(form);
        if (!turnstileToken) { setStatus({ type: "error", message: "Please complete the security verification before submitting." }); return; }
        data.set("cf-turnstile-response", turnstileToken);
        setSubmitting(true);

        try {
            const response = await fetch(isCareer ? "/api/forms/careers" : "/api/forms/contact", {
                method: "POST",
                body: data,
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || "Unable to submit the form.");
            form.reset();
            setSelectedFile(null);
            setTurnstileReset((value) => value + 1);
            setStatus({ type: "success", message: result.message });
        } catch (error) {
            setStatus({ type: "error", message: error instanceof Error ? error.message : "Unable to submit the form." });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <section className={sectionClass}>
            <div className="w-full max-w-none p-0">
                <div className="m-0 flex flex-wrap">
                    {!hideHeading && (
                        <div className="w-full p-0 mb-8 text-center">
                            <h2 className="text-3xl font-bold text-slate-900">{heading.split(" ").slice(0, -1).join(" ")} <em className="text-slate-900 not-italic">{heading.split(" ").slice(-1)[0]}</em></h2>
                            {description && <p className="mt-3 text-slate-600 max-w-2xl mx-auto">{description}</p>}
                        </div>
                    )}
                    <div className="w-full p-0">
                        <div className="contact-form-panel mx-auto max-w-[920px] rounded-[28px] border border-slate-200 bg-white p-[clamp(20px,4vw,40px)] shadow-2xl">
                            <form ref={formRef} id={`contact-${variant}`} onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="-mx-2 flex flex-wrap gap-y-4">
                                    <div className={fieldColumn}><fieldset className="m-0"><input name="name" type="text" className={controlClass} placeholder="Full Name" minLength={2} maxLength={100} required /></fieldset></div>
                                    <div className={fieldColumn}><fieldset className="m-0"><input name="email" type="email" className={controlClass} placeholder="E-Mail Address" maxLength={254} required /></fieldset></div>
                                    <div className={fieldColumn}><fieldset className="m-0"><input name="phone" type="tel" className={controlClass} placeholder="Phone Number" pattern="[+0-9()\-\s]{7,25}" required /></fieldset></div>

                                    {!isCareer && <div className={fieldColumn}><fieldset className="m-0"><input name="company" type="text" className={controlClass} placeholder="Company Name (Optional)" maxLength={120} /></fieldset></div>}
                                    {!isCareer && <div className={fieldColumn}><fieldset className="m-0"><input name="subject" type="text" className={controlClass} placeholder="Subject" minLength={3} maxLength={160} required /></fieldset></div>}

                                    {showInquiryDropdown && (
                                        <div className={fieldColumn}>
                                            <fieldset className="m-0">
                                                <CustomSelect
                                                    name="inquiryType"
                                                    placeholder="Select Inquiry Type"
                                                    controlClass={controlClass}
                                                    options={[
                                                        "SAP Implementation",
                                                        "SAP Support",
                                                        "SAP BTP Full Stack Application",
                                                        "Products",
                                                        "Careers",
                                                        "Other"
                                                    ]}
                                                    required
                                                />
                                            </fieldset>
                                        </div>
                                    )}

                                    {isCareer && (
                                        <>
                                            <div className={fieldColumn}>
                                                <fieldset className="m-0">
                                                    <CustomSelect
                                                        name="position"
                                                        placeholder="Select Position"
                                                        controlClass={controlClass}
                                                        options={[
                                                            "SAP Functional Consultant",
                                                            "SAP Technical Consultant",
                                                            "SAP Developer",
                                                            "Business Analyst",
                                                            "Other"
                                                        ]}
                                                        required
                                                    />
                                                </fieldset>
                                            </div>
                                            <div className={fieldColumn}><fieldset className="m-0"><input name="experience" type="number" className={controlClass} placeholder="Years of Experience" min="0" max="60" step="0.5" required /></fieldset></div>
                                            <div className={fieldColumn}><fieldset className="m-0"><input name="company" type="text" className={controlClass} placeholder="Current Company (Optional)" maxLength={120} /></fieldset></div>
                                        </>
                                    )}

                                    <div className={fullColumn}><fieldset className="m-0"><textarea name="message" rows={5} className={`${controlClass} h-28 min-h-28 resize-y py-3`} placeholder={isCareer ? "Message / Cover Letter" : "Your Message"} minLength={10} maxLength={5000} required /></fieldset></div>
                                    {isCareer && (
                                        <div className={fullColumn}>
                                            <fieldset className="m-0">
                                                <label className="mb-2 block text-[13px] font-semibold text-slate-900" htmlFor="career-resume">
                                                    Upload Resume (PDF, DOC or DOCX, max 5 MB)
                                                </label>
                                                <div className="career-upload-zone group relative flex min-h-[140px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/80 p-6 text-center transition-all duration-200 hover:border-slate-400 hover:bg-slate-100/80 focus-within:border-slate-900 focus-within:ring-2 focus-within:ring-slate-900/10">
                                                    <input
                                                        ref={fileInputRef}
                                                        id="career-resume"
                                                        type="file"
                                                        name="resume"
                                                        onChange={handleFileChange}
                                                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                        required
                                                        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                                                        title=""
                                                    />

                                                    {selectedFile ? (
                                                        <div className="flex flex-col items-center justify-center gap-2">
                                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-900 ring-1 ring-slate-200 shadow-inner">
                                                                <FileText className="h-6 w-6 text-slate-900" />
                                                            </div>
                                                            <div className="text-center">
                                                                <p className="max-w-[260px] truncate text-sm font-semibold text-slate-900 sm:max-w-md">
                                                                    {selectedFile.name}
                                                                </p>
                                                                <p className="mt-0.5 text-xs text-slate-500">
                                                                    {formatFileSize(selectedFile.size)}
                                                                </p>
                                                            </div>
                                                            <div className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-900 transition-colors hover:bg-slate-50">
                                                                <Upload className="h-3.5 w-3.5" />
                                                                <span>Change File</span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col items-center justify-center gap-2.5">
                                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-900 ring-1 ring-slate-200 transition-transform duration-200 group-hover:scale-110">
                                                                <Upload className="h-5 w-5 text-slate-900" />
                                                            </div>
                                                            <div className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 border border-slate-300 shadow-sm transition-all group-hover:bg-slate-50">
                                                                <Upload className="h-4 w-4" />
                                                                <span>Choose File</span>
                                                            </div>
                                                            <p className="career-upload-help text-xs text-slate-500">
                                                                or drag and drop your file here (PDF, DOC or DOCX up to 5 MB)
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </fieldset>
                                        </div>
                                    )}
                                    <div className="pointer-events-none absolute h-px w-px overflow-hidden whitespace-nowrap [clip:rect(0_0_0_0)]" aria-hidden="true"><label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label></div>
                                    <div className={fullColumn}>
                                        <fieldset className="m-0">
                                            <label className="contact-consent flex items-start gap-2.5 text-[13px] leading-[1.45] text-slate-800 font-medium">
                                                <input className="mt-1 h-4 w-4 rounded border-slate-300 bg-white text-slate-900 accent-slate-900 focus:ring-slate-900" name="consent" type="checkbox" value="yes" required />
                                                <span>I consent to Trijotech using this information to respond to my {isCareer ? "application" : "enquiry"}.</span>
                                            </label>
                                        </fieldset>
                                    </div>
                                    <div className={fullColumn}><TurnstileField action={isCareer ? "career_form" : "contact_form"} onTokenChange={setTurnstileToken} resetSignal={turnstileReset} /></div>
                                    {status.message && (
                                        <div className={fullColumn}>
                                            <p className={`rounded-xl px-4 py-3 text-sm font-medium ${status.type === "success" ? "border border-emerald-300 bg-emerald-50 text-emerald-900" : "border border-rose-300 bg-rose-50 text-rose-900"}`} role="status" aria-live="polite">
                                                {status.message}
                                            </p>
                                        </div>
                                    )}
                                    <div className={`${fullColumn} flex justify-center mt-2`}>
                                        <fieldset className="m-0">
                                            <button type="submit" className="inline-flex items-center justify-center min-w-[200px] rounded-full px-8 py-3.5 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-900/20 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-55 disabled:shadow-none" disabled={submitting || !turnstileToken}>
                                                {submitting ? "Sending..." : isCareer ? "Submit Application" : "Send Message"}
                                            </button>
                                        </fieldset>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
