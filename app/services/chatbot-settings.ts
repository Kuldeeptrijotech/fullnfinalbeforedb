import "server-only";
import type { ChatbotSettings } from "@/app/types/chatbot";
import { getChatbotSettingsFromDb, saveChatbotSettingsToDb } from "@/app/lib/services/chatbot.service";

export const defaultChatbotSettings: ChatbotSettings = {
  enabled: true,
  assistantName: "Trijotech AI Assistant",
  welcomeMessage: "Hi! Welcome to Trijotech — it’s lovely to have you here. What would you like to know about our company, services, or careers?",
  fallbackMessage: "Thanks for asking. I couldn’t find enough verified information to give you a reliable answer, but our Trijotech team would be happy to help.",
  suggestedQuestions: ["Our Services", "About Trijotech", "Careers", "Contact Our Team"],
  contactButton: true,
  maximumMessageLength: 2000,
};

export async function readChatbotSettings(): Promise<ChatbotSettings> {
  try {
    return await getChatbotSettingsFromDb();
  } catch (err) {
    console.warn("Falling back to default chatbot settings:", err);
    return defaultChatbotSettings;
  }
}

export async function writeChatbotSettings(value: ChatbotSettings): Promise<void> {
  await saveChatbotSettingsToDb(value);
}
