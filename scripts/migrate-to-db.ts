import { promises as fs } from "node:fs";
import path from "node:path";
import prisma from "../app/lib/db";
import { createOrUpdateDefaultAdmin } from "../app/lib/services/user.service";
import type { SiteContent } from "../app/lib/content-store";
import type { BlogPost } from "../lib/types/blog.types";
import type { ChatbotSettings, KnowledgeEntry } from "../app/types/chatbot";

async function migrateAdmin() {
  console.log("--> Migrating Admin user...");
  const admin = await createOrUpdateDefaultAdmin();
  console.log(`✓ Admin user ready: ${admin.email} (role: ${admin.role})`);
}

async function migrateSiteContent() {
  console.log("--> Migrating siteContent.json to PostgreSQL...");
  const contentPath = path.join(process.cwd(), "app", "data", "siteContent.json");
  try {
    const raw = await fs.readFile(contentPath, "utf8");
    const content = JSON.parse(raw.replace(/^\uFEFF/, "")) as SiteContent;

    const entriesToInsert: Array<{
      id: string;
      scope: string;
      pathname: string;
      pageLabel: string;
      sectionKey: string;
      sectionLabel: string;
      selector: string;
      kind: string;
      value: string;
      attribute: string | null;
      label: string;
    }> = [];

    // Global sections
    for (const [sectionKey, section] of Object.entries(content.global?.sections || {})) {
      for (const entry of section.entries || []) {
        entriesToInsert.push({
          id: entry.id,
          scope: "global",
          pathname: "",
          pageLabel: "",
          sectionKey,
          sectionLabel: section.label || sectionKey,
          selector: entry.selector,
          kind: entry.kind,
          value: entry.value,
          attribute: entry.attribute || null,
          label: entry.label || "",
        });
      }
    }

    // Page sections
    for (const [pathname, page] of Object.entries(content.pages || {})) {
      // Ensure Page record exists
      await prisma.page.upsert({
        where: { slug: pathname },
        create: {
          slug: pathname,
          title: page.label || pathname,
          status: "published",
        },
        update: {
          title: page.label || pathname,
        },
      });

      for (const [sectionKey, section] of Object.entries(page.sections || {})) {
        await prisma.pageSection.upsert({
          where: {
            pageId_sectionKey: {
              pageId: (await prisma.page.findUnique({ where: { slug: pathname } }))!.id,
              sectionKey,
            },
          },
          create: {
            pageId: (await prisma.page.findUnique({ where: { slug: pathname } }))!.id,
            sectionKey,
            sectionType: "general",
            isVisible: true,
          },
          update: {
            isVisible: true,
          },
        });

        for (const entry of section.entries || []) {
          entriesToInsert.push({
            id: entry.id,
            scope: "page",
            pathname,
            pageLabel: page.label || pathname,
            sectionKey,
            sectionLabel: section.label || sectionKey,
            selector: entry.selector,
            kind: entry.kind,
            value: entry.value,
            attribute: entry.attribute || null,
            label: entry.label || "",
          });
        }
      }
    }

    console.log(`Found ${entriesToInsert.length} site content override entries.`);
    for (const item of entriesToInsert) {
      await prisma.siteContentEntry.upsert({
        where: { id: item.id },
        create: item,
        update: item,
      });
    }

    console.log("✓ Site content migrated to PostgreSQL successfully.");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.log("No siteContent.json found, skipping content migration.");
    } else {
      console.error("Error migrating site content:", error);
    }
  }
}

async function migrateBlogs() {
  console.log("--> Migrating blogs.json to PostgreSQL...");
  const blogsPath = path.join(process.cwd(), "app", "data", "blogs.json");
  try {
    const raw = await fs.readFile(blogsPath, "utf8");
    const parsed = JSON.parse(raw.replace(/^\uFEFF/, "")) as { posts?: BlogPost[] };
    const posts = Array.isArray(parsed.posts) ? parsed.posts : [];

    console.log(`Found ${posts.length} blog posts in blogs.json.`);
    for (const p of posts) {
      await prisma.blogPost.upsert({
        where: { slug: p.slug },
        create: {
          id: p.id,
          title: p.title,
          slug: p.slug,
          shortDescription: p.shortDescription || "",
          content: p.content || "",
          contentBlocks: (p.contentBlocks || []) as unknown as object,
          contentImages: (p.contentImages || []) as unknown as object,
          featuredImage: p.featuredImage || "",
          featuredImageStyle: (p.featuredImageStyle || {}) as unknown as object,
          imageAlt: p.imageAlt || "",
          author: p.author || "Trijotech",
          category: p.category || "General",
          tags: p.tags || [],
          status: p.status === "published" ? "published" : "draft",
          publishedAt: p.publishedAt ? new Date(p.publishedAt) : null,
          seoTitle: p.seoTitle || null,
          seoDescription: p.seoDescription || null,
        },
        update: {
          title: p.title,
          shortDescription: p.shortDescription || "",
          content: p.content || "",
          contentBlocks: (p.contentBlocks || []) as unknown as object,
          contentImages: (p.contentImages || []) as unknown as object,
          featuredImage: p.featuredImage || "",
          featuredImageStyle: (p.featuredImageStyle || {}) as unknown as object,
          imageAlt: p.imageAlt || "",
          author: p.author || "Trijotech",
          category: p.category || "General",
          tags: p.tags || [],
          status: p.status === "published" ? "published" : "draft",
          publishedAt: p.publishedAt ? new Date(p.publishedAt) : null,
          seoTitle: p.seoTitle || null,
          seoDescription: p.seoDescription || null,
        },
      });
    }

    console.log("✓ Blogs migrated to PostgreSQL successfully.");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.log("No blogs.json found, skipping blog migration.");
    } else {
      console.error("Error migrating blogs:", error);
    }
  }
}

async function migrateChatbotSettings() {
  console.log("--> Migrating chatbot-settings.json to PostgreSQL...");
  const settingsPath = path.join(process.cwd(), "app", "data", "chatbot-settings.json");
  try {
    const raw = await fs.readFile(settingsPath, "utf8");
    const settings = JSON.parse(raw.replace(/^\uFEFF/, "")) as ChatbotSettings;

    await prisma.chatbotSetting.upsert({
      where: { id: "default" },
      create: {
        id: "default",
        enabled: settings.enabled !== false,
        assistantName: settings.assistantName || "Trijotech AI Assistant",
        welcomeMessage: settings.welcomeMessage || "Hello! How can I assist you with Trijotech's SAP services and solutions today?",
        fallbackMessage: settings.fallbackMessage || "I'm sorry, I couldn't find a direct answer. Please connect with our team.",
        suggestedQuestions: settings.suggestedQuestions || [],
        contactButton: settings.contactButton !== false,
        maximumMessageLength: settings.maximumMessageLength || 2000,
      },
      update: {
        enabled: settings.enabled !== false,
        assistantName: settings.assistantName || "Trijotech AI Assistant",
        welcomeMessage: settings.welcomeMessage || "Hello! How can I assist you with Trijotech's SAP services and solutions today?",
        fallbackMessage: settings.fallbackMessage || "I'm sorry, I couldn't find a direct answer. Please connect with our team.",
        suggestedQuestions: settings.suggestedQuestions || [],
        contactButton: settings.contactButton !== false,
        maximumMessageLength: settings.maximumMessageLength || 2000,
      },
    });

    console.log("✓ Chatbot settings migrated to PostgreSQL.");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.log("No chatbot-settings.json found.");
    } else {
      console.error("Error migrating chatbot settings:", error);
    }
  }
}

async function migrateKnowledgeBase() {
  console.log("--> Migrating knowledge-base/*.json to PostgreSQL...");
  const kbDir = path.join(process.cwd(), "app", "data", "knowledge-base");
  try {
    const files = (await fs.readdir(kbDir)).filter((f) => f.endsWith(".json"));
    let total = 0;

    for (const filename of files) {
      const filePath = path.join(kbDir, filename);
      const raw = await fs.readFile(filePath, "utf8");
      try {
        const parsed = JSON.parse(raw.replace(/^\uFEFF/, ""));
        const category = path.basename(filename, ".json");

        if (Array.isArray(parsed)) {
          for (const item of parsed) {
            if (item.title && item.content) {
              await prisma.chatbotKnowledgeEntry.upsert({
                where: { id: item.id || `kb-${category}-${item.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}` },
                create: {
                  id: item.id || `kb-${category}-${item.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
                  title: item.title,
                  category: item.category || category,
                  content: item.content,
                  keywords: Array.isArray(item.keywords) ? item.keywords : [],
                  priority: Number(item.priority) || 5,
                  enabled: item.enabled !== false,
                  url: item.url || null,
                },
                update: {
                  title: item.title,
                  category: item.category || category,
                  content: item.content,
                  keywords: Array.isArray(item.keywords) ? item.keywords : [],
                  priority: Number(item.priority) || 5,
                  enabled: item.enabled !== false,
                  url: item.url || null,
                },
              });
              total++;
            }
          }
        }
      } catch (err) {
        console.warn(`Could not parse ${filename}:`, err);
      }
    }

    console.log(`✓ Migrated ${total} knowledge entries to PostgreSQL.`);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.log("No knowledge-base directory found.");
    } else {
      console.error("Error migrating knowledge base:", error);
    }
  }
}

async function migrateSiteSettings() {
  console.log("--> Migrating global site settings to PostgreSQL...");
  const defaults = [
    {
      key: "company_info",
      category: "general",
      description: "Company details and contact information",
      value: {
        companyName: "Trijotech",
        tagline: "SAP Implementation, Support & BTP Full Stack",
        contactEmail: "sales@trijotech.com",
        careersEmail: "hr@trijotech.com",
        phone: "+91 (0) 1234 567 890",
        address: "Hyderabad, India",
      },
    },
    {
      key: "seo_defaults",
      category: "seo",
      description: "Default metadata and social preview settings",
      value: {
        title: "Trijotech | SAP Enterprise Consulting & Solutions",
        description: "Transforming businesses with expert SAP consulting, implementation, and cloud-native BTP extensions from Trijotech.",
        ogImage: "/assets/brand/og-image.png",
      },
    },
  ];

  for (const s of defaults) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      create: {
        id: s.key,
        key: s.key,
        category: s.category,
        description: s.description,
        value: s.value,
      },
      update: {
        category: s.category,
        description: s.description,
      },
    });
  }

  console.log("✓ Site settings seeded.");
}

async function main() {
  console.log("==================================================");
  console.log("STARTING POSTGRESQL CONTENT MIGRATION & SEEDING");
  console.log("==================================================");
  await migrateAdmin();
  await migrateSiteContent();
  await migrateBlogs();
  await migrateChatbotSettings();
  await migrateKnowledgeBase();
  await migrateSiteSettings();
  console.log("==================================================");
  console.log("POSTGRESQL MIGRATION COMPLETED SUCCESSFULLY");
  console.log("==================================================");
}

main()
  .catch((err) => {
    console.error("Migration failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
