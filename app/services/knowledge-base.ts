import "server-only";
import type { KnowledgeEntry } from "@/app/types/chatbot";
import {
  getAllKnowledgeEntriesFromDb,
  saveKnowledgeEntryToDb,
  deleteKnowledgeEntryFromDb,
} from "@/app/lib/services/chatbot.service";

const stopWords = new Set(["a", "an", "and", "are", "can", "could", "do", "does", "for", "how", "i", "in", "is", "it", "me", "my", "of", "on", "please", "tell", "that", "the", "their", "to", "us", "we", "what", "when", "where", "which", "who", "why", "with", "would", "you", "your"]);
const words = (value: string) => value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9\s-]/g, " ").split(/\s+/).filter((word) => word.length > 1 && !stopWords.has(word)).map((word) => word.length > 4 && word.endsWith("ies") ? `${word.slice(0, -3)}y` : word.length > 3 && word.endsWith("s") && !word.endsWith("ss") ? word.slice(0, -1) : word);

function scoreEntry(entry: KnowledgeEntry, queryWords: Set<string>, queryText: string) {
  const title = new Set(words(entry.title));
  const keywords = new Set(entry.keywords.flatMap(words));
  const content = new Set(words(entry.content));
  let score = 0;
  for (const word of queryWords) score += title.has(word) ? 6 : keywords.has(word) ? 4 : content.has(word) ? 2 : 0;
  if (entry.title.toLowerCase().includes(queryText.toLowerCase())) score += 8;
  if (entry.content.toLowerCase().includes(queryText.toLowerCase())) score += 4;
  if (queryText && entry.keywords.some((keyword) => keyword.toLowerCase().includes(queryText.toLowerCase()))) score += 3;
  return score > 0 ? score + entry.priority / 20 : 0;
}

export async function readKnowledgeEntries(): Promise<KnowledgeEntry[]> {
  try {
    const dbEntries = await getAllKnowledgeEntriesFromDb();
    return dbEntries.filter((entry) => entry.enabled && entry.content?.trim());
  } catch (err) {
    console.error("Error reading knowledge entries from PostgreSQL:", err);
    return [];
  }
}

export async function searchKnowledge(query: string, limit = 8) {
  const queryText = query.trim().toLowerCase();
  const queryWords = new Set(words(query));
  const scored = (await readKnowledgeEntries()).map((entry) => ({ entry, score: scoreEntry(entry, queryWords, queryText) }));
  return scored.filter(({ score }) => score >= 2).sort((a, b) => b.score - a.score).slice(0, limit).map(({ entry }) => entry);
}

export async function getRelevantContext(query: string, limit = 5): Promise<string> {
  return (await searchKnowledge(query, limit)).map((entry) => `${entry.title}: ${entry.content}`).join("\n");
}

export function knowledgeFallbackAnswer(entries: KnowledgeEntry[], query = ""): string {
  if (!entries.length) return "I couldn’t find verified information about that in the Trijotech knowledge base. Please use our [contact page](/contact), and the team will help you.";
  const selected = entries.slice(0, 4);
  const intro = query ? "Here is the most relevant information I could find for your question:" : "Here are the most relevant details from the Trijotech knowledge base:";
  const bullets = selected.map((entry) => {
    const content = entry.content.replace(/\s+/g, " ").trim();
    const trimmed = content.length > 260 ? `${content.slice(0, 260)}…` : content;
    return `- **${entry.title}:** ${trimmed}`;
  }).join("\n");
  const links = selected.filter((entry) => entry.url).map((entry) => `[${entry.title}](${entry.url})`);
  return `${intro}\n\n${bullets}${links.length ? `\n\nLearn more: ${links.join(" · ")}` : ""}\n\nIf you need a more detailed or tailored answer, please use our [contact page](/contact).`;
}

export async function saveKnowledgeEntry(entry: KnowledgeEntry) {
  return saveKnowledgeEntryToDb(entry);
}

export async function deleteKnowledgeEntry(id: string) {
  return deleteKnowledgeEntryFromDb(id);
}
