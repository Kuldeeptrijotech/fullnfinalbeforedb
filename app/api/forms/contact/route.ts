import { NextResponse } from "next/server";
import { clientIp, escapeHtml, fieldRows, isRateLimited, mailer, sender, text, validEmail, validPhone, verifyCaptcha } from "@/app/lib/form-security";
import { createContactSubmission } from "@/app/lib/services/form.service";
import { logAuditEvent } from "@/app/lib/services/audit.service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const ip = clientIp(request);
    if (isRateLimited(ip)) return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
    const form = await request.formData();
    if (text(form, "website", 100)) return NextResponse.json({ error: "Unable to submit the form." }, { status: 400 });
    if (!(await verifyCaptcha(text(form, "cf-turnstile-response", 2048), ip, "contact_form"))) return NextResponse.json({ error: "Security verification failed. Please complete the check and try again." }, { status: 403 });

    const name = text(form, "name", 100), email = text(form, "email", 254), phone = text(form, "phone", 25);
    const company = text(form, "company", 120), subject = text(form, "subject", 160), inquiryType = text(form, "inquiryType", 80);
    const message = text(form, "message", 5000), consent = text(form, "consent", 10);
    if (name.length < 2 || !validEmail(email) || !validPhone(phone) || subject.length < 3 || message.length < 10 || consent !== "yes") {
      return NextResponse.json({ error: "Please complete all required fields with valid information." }, { status: 400 });
    }

    // 1. Persist in PostgreSQL
    const submission = await createContactSubmission({
      name,
      email,
      phone,
      company: company || undefined,
      inquiryType: inquiryType || undefined,
      subject,
      message,
      ipAddress: ip,
    });

    // 2. Log Audit Event
    await logAuditEvent({
      action: "CONTACT_FORM_SUBMITTED",
      entityType: "ContactSubmission",
      entityId: submission.id,
      metadata: { email, subject, inquiryType },
      ipAddress: ip,
    });

    // 3. Send email notifications (non-blocking failure safe)
    try {
      const submittedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "long", timeStyle: "short" });
      const transport = mailer(), from = sender(), to = process.env.CONTACT_TO_EMAIL || "sales@trijotech.com";
      await transport.sendMail({ from, to, replyTo: email, subject: `Contact Enquiry: ${subject}`, html: `<h2>Contact Enquiry</h2><table>${fieldRows([["Name",name],["Email",email],["Phone",phone],["Company",company],["Inquiry type",inquiryType],["Subject",subject],["Message",message],["Submitted",submittedAt]])}</table>` });
      await transport.sendMail({ from, to: email, subject: "We received your enquiry | Trijotech", html: `<p>Hello ${escapeHtml(name)},</p><p>Thank you for contacting Trijotech. We have received your enquiry and our team will respond shortly.</p><p>Regards,<br>Trijotech Team</p>` });
    } catch (emailErr) {
      console.warn("Email notification dispatch warning (submission saved in PostgreSQL):", emailErr);
    }

    return NextResponse.json({ message: "Thank you. Your enquiry has been sent successfully." });
  } catch (error) {
    console.error("Contact form submission failed", error);
    return NextResponse.json({ error: "We could not send your enquiry right now. Please try again later." }, { status: 500 });
  }
}
