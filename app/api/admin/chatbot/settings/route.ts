import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/app/lib/admin-auth";
import { readChatbotSettings, writeChatbotSettings } from "@/app/services/chatbot-settings";
import type { ChatbotSettings } from "@/app/types/chatbot";

const isAllowed = async (request: NextRequest) =>
  (await isAdminRequest(request)) &&
  (!request.headers.get("origin") || request.headers.get("origin") === request.nextUrl.origin);

export async function GET(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  return NextResponse.json(await readChatbotSettings());
}

export async function PUT(request: NextRequest) {
  if (!(await isAllowed(request))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const input = (await request.json()) as Partial<ChatbotSettings>;
  const settings: ChatbotSettings = {
    enabled: input.enabled !== false,
    assistantName: String(input.assistantName || "Trijotech AI Assistant").trim().slice(0, 80),
    welcomeMessage: String(input.welcomeMessage || "").trim().slice(0, 1000),
    fallbackMessage: String(input.fallbackMessage || "").trim().slice(0, 1000),
    suggestedQuestions: Array.isArray(input.suggestedQuestions)
      ? input.suggestedQuestions.map(String).map((item) => item.trim().slice(0, 120)).filter(Boolean).slice(0, 8)
      : [],
    contactButton: input.contactButton !== false,
    maximumMessageLength: Math.max(100, Math.min(2000, Number(input.maximumMessageLength) || 2000)),
  };
  if (!settings.welcomeMessage || !settings.fallbackMessage) {
    return NextResponse.json({ error: "Welcome and fallback messages are required." }, { status: 400 });
  }
  await writeChatbotSettings(settings);
  return NextResponse.json({ success: true, settings });
}
