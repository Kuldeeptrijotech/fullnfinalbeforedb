import prisma from "@/app/lib/db";
import type { ContentEntry, ContentKind, ContentSection, PageContent, SiteContent } from "@/app/lib/content-store";

export async function getSiteContentFromDb(): Promise<SiteContent> {
  try {
    const entries = await prisma.siteContentEntry.findMany({
      orderBy: { updatedAt: "asc" },
    });

    const content: SiteContent = {
      version: 1,
      updatedAt: entries.length > 0 ? entries[entries.length - 1].updatedAt.toISOString() : null,
      global: { sections: {} },
      pages: {},
    };

    for (const record of entries) {
      const entry: ContentEntry = {
        id: record.id,
        selector: record.selector,
        kind: record.kind as ContentKind,
        value: record.value,
        attribute: record.attribute as ContentEntry["attribute"],
        label: record.label,
      };

      if (record.scope === "global") {
        content.global.sections[record.sectionKey] ??= {
          label: record.sectionLabel || "General",
          entries: [],
        };
        const section = content.global.sections[record.sectionKey];
        const existingIdx = section.entries.findIndex((e) => e.id === entry.id);
        if (existingIdx >= 0) section.entries[existingIdx] = entry;
        else section.entries.push(entry);
      } else {
        const path = record.pathname || "/";
        content.pages[path] ??= {
          label: record.pageLabel || path,
          sections: {},
        };
        const page = content.pages[path];
        page.sections[record.sectionKey] ??= {
          label: record.sectionLabel || "General",
          entries: [],
        };
        const section = page.sections[record.sectionKey];
        const existingIdx = section.entries.findIndex((e) => e.id === entry.id);
        if (existingIdx >= 0) section.entries[existingIdx] = entry;
        else section.entries.push(entry);
      }
    }

    return content;
  } catch (error) {
    console.error("Failed to load site content from PostgreSQL:", error);
    return {
      version: 1,
      updatedAt: null,
      global: { sections: {} },
      pages: {},
    };
  }
}

export async function saveSiteContentEntriesToDb({
  entries,
  scope = "page",
  pathname = "/",
  pageLabel = "",
  sectionKey = "general",
  sectionLabel = "General",
}: {
  entries: ContentEntry[];
  scope?: "global" | "page";
  pathname?: string;
  pageLabel?: string;
  sectionKey?: string;
  sectionLabel?: string;
}): Promise<SiteContent> {
  const operations = entries.map((entry) =>
    prisma.siteContentEntry.upsert({
      where: { id: entry.id },
      update: {
        scope,
        pathname: scope === "global" ? "" : pathname,
        pageLabel: scope === "global" ? "" : pageLabel,
        sectionKey,
        sectionLabel,
        selector: entry.selector,
        kind: entry.kind,
        value: entry.value,
        attribute: entry.attribute || null,
        label: entry.label,
        updatedAt: new Date(),
      },
      create: {
        id: entry.id,
        scope,
        pathname: scope === "global" ? "" : pathname,
        pageLabel: scope === "global" ? "" : pageLabel,
        sectionKey,
        sectionLabel,
        selector: entry.selector,
        kind: entry.kind,
        value: entry.value,
        attribute: entry.attribute || null,
        label: entry.label,
      },
    })
  );

  await prisma.$transaction(operations);
  return getSiteContentFromDb();
}

export async function deleteSiteContentEntriesFromDb(ids: string[]): Promise<SiteContent> {
  if (ids.length > 0) {
    await prisma.siteContentEntry.deleteMany({
      where: { id: { in: ids } },
    });
  }
  return getSiteContentFromDb();
}
