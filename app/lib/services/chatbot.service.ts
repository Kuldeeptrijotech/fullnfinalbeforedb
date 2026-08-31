import prisma from "@/app/lib/db";
import type { KnowledgeEntry, ChatbotSettings } from "@/app/types/chatbot";

export async function getAllKnowledgeEntriesFromDb(): Promise<KnowledgeEntry[]> {
  const entries = await prisma.chatbotKnowledgeEntry.findMany({
    orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
  });

  return entries.map((e) => ({
    id: e.id,
    title: e.title,
    category: e.category,
    content: e.content,
    keywords: e.keywords,
    priority: e.priority,
    enabled: e.enabled,
    url: e.url || undefined,
  }));
}

export async function saveKnowledgeEntryToDb(entry: KnowledgeEntry): Promise<KnowledgeEntry> {
  const saved = await prisma.chatbotKnowledgeEntry.upsert({
    where: { id: entry.id },
    create: {
      id: entry.id,
      title: entry.title,
      category: entry.category,
      content: entry.content,
      keywords: entry.keywords,
      priority: entry.priority,
      enabled: entry.enabled,
      url: entry.url || null,
    },
    update: {
      title: entry.title,
      category: entry.category,
      content: entry.content,
      keywords: entry.keywords,
      priority: entry.priority,
      enabled: entry.enabled,
      url: entry.url || null,
    },
  });

  return {
    id: saved.id,
    title: saved.title,
    category: saved.category,
    content: saved.content,
    keywords: saved.keywords,
    priority: saved.priority,
    enabled: saved.enabled,
    url: saved.url || undefined,
  };
}

export async function deleteKnowledgeEntryFromDb(id: string): Promise<boolean> {
  const result = await prisma.chatbotKnowledgeEntry.delete({
    where: { id },
  }).catch(() => null);

  return result !== null;
}

export async function getChatbotSettingsFromDb(): Promise<ChatbotSettings> {
  const record = await prisma.chatbotSetting.findUnique({
    where: { id: "default" },
  });

  if (!record) {
    return {
      enabled: true,
      assistantName: "Trijotech AI Assistant",
      welcomeMessage: "Hello! How can I assist you with Trijotech's SAP services and solutions today?",
      fallbackMessage: "I'm sorry, I couldn't find a direct answer. Please connect with our SAP specialists via our contact page.",
      suggestedQuestions: [
        "What SAP consulting services do you provide?",
        "How do you ensure Clean Core on SAP BTP?",
        "Tell me about FinLagoon Consolidation",
      ],
      contactButton: true,
      maximumMessageLength: 2000,
    };
  }

  return {
    enabled: record.enabled,
    assistantName: record.assistantName,
    welcomeMessage: record.welcomeMessage,
    fallbackMessage: record.fallbackMessage,
    suggestedQuestions: record.suggestedQuestions,
    contactButton: record.contactButton,
    maximumMessageLength: record.maximumMessageLength,
  };
}

export async function saveChatbotSettingsToDb(settings: ChatbotSettings): Promise<ChatbotSettings> {
  const saved = await prisma.chatbotSetting.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      enabled: settings.enabled,
      assistantName: settings.assistantName,
      welcomeMessage: settings.welcomeMessage,
      fallbackMessage: settings.fallbackMessage,
      suggestedQuestions: settings.suggestedQuestions,
      contactButton: settings.contactButton,
      maximumMessageLength: settings.maximumMessageLength,
    },
    update: {
      enabled: settings.enabled,
      assistantName: settings.assistantName,
      welcomeMessage: settings.welcomeMessage,
      fallbackMessage: settings.fallbackMessage,
      suggestedQuestions: settings.suggestedQuestions,
      contactButton: settings.contactButton,
      maximumMessageLength: settings.maximumMessageLength,
    },
  });

  return {
    enabled: saved.enabled,
    assistantName: saved.assistantName,
    welcomeMessage: saved.welcomeMessage,
    fallbackMessage: saved.fallbackMessage,
    suggestedQuestions: saved.suggestedQuestions,
    contactButton: saved.contactButton,
    maximumMessageLength: saved.maximumMessageLength,
  };
}
