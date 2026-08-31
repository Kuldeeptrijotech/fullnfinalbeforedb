import prisma from "../app/lib/db";
import { authenticateAdmin, verifyDbSession } from "../app/lib/services/user.service";
import { getSiteContentFromDb, saveSiteContentEntriesToDb } from "../app/lib/services/content.service";
import { getAllBlogPostsFromDb, getBlogPostBySlugFromDb } from "../app/lib/services/blog.service";
import {
  createContactSubmission,
  createCareerSubmission,
  getContactSubmissions,
  getCareerSubmissions,
  updateContactSubmissionStatus,
  updateCareerSubmissionStatus,
  getCareerResumeBuffer,
} from "../app/lib/services/form.service";
import { getRecentAuditLogs } from "../app/lib/services/audit.service";
import { getChatbotSettingsFromDb, getAllKnowledgeEntriesFromDb } from "../app/lib/services/chatbot.service";

async function runTests() {
  console.log("==================================================");
  console.log("RUNNING POSTGRESQL & SERVICE LAYER E2E TEST SUITE");
  console.log("==================================================");

  // 1. Test Admin Authentication with bcrypt & DB Session
  console.log("\n[TEST 1] Admin Authentication & Session Management");
  const authSuccess = await authenticateAdmin("123123", "127.0.0.1", "TestRunner/1.0");
  if (!authSuccess.success) {
    throw new Error(`Admin authentication failed: ${authSuccess.error}`);
  }
  console.log("✓ Admin authentication successful with bcrypt.");
  console.log(`  Session token generated: ${authSuccess.sessionToken.slice(0, 16)}...`);

  const verifiedUser = await verifyDbSession(authSuccess.sessionToken);
  if (!verifiedUser || verifiedUser.email !== "admin@trijotech.com") {
    throw new Error("DB session verification failed.");
  }
  console.log(`✓ DB session verified for user: ${verifiedUser.email} (role: ${verifiedUser.role})`);

  // Test invalid password rejection
  const authFail = await authenticateAdmin("wrong-pass", "127.0.0.1", "TestRunner/1.0");
  if (authFail.success) {
    throw new Error("Expected invalid password to fail!");
  }
  console.log(`✓ Incorrect password correctly rejected: "${authFail.error}" (HTTP ${authFail.status})`);

  // 2. Test Site Content Persistence
  console.log("\n[TEST 2] Site Content Persistence in PostgreSQL");
  const initialContent = await getSiteContentFromDb();
  console.log(`✓ Loaded site content from PostgreSQL: ${Object.keys(initialContent.pages).length} pages tracked.`);

  const testEntry = {
    id: "test-hero-title",
    selector: "#hero-title",
    kind: "html" as const,
    value: "Transforming Enterprises with SAP & Clean Core Architecture",
    label: "Hero Main Title",
  };
  await saveSiteContentEntriesToDb({
    entries: [testEntry],
    scope: "page",
    pathname: "/services/sap-consulting",
    pageLabel: "SAP Consulting",
    sectionKey: "hero",
    sectionLabel: "Hero Section",
  });
  const updatedContent = await getSiteContentFromDb();
  const savedEntry = updatedContent.pages["/services/sap-consulting"]?.sections?.["hero"]?.entries?.find(
    (e) => e.id === "test-hero-title"
  );
  if (!savedEntry || savedEntry.value !== testEntry.value) {
    throw new Error("Site content entry was not saved properly in PostgreSQL!");
  }
  console.log("✓ Site content entry upserted and retrieved from PostgreSQL successfully.");

  // 3. Test Blog Post Persistence
  console.log("\n[TEST 3] Blog Posts in PostgreSQL");
  const blogs = await getAllBlogPostsFromDb(true);
  console.log(`✓ Loaded ${blogs.length} blog posts from PostgreSQL.`);
  if (blogs.length > 0) {
    const firstBlog = blogs[0];
    const fetchedBySlug = await getBlogPostBySlugFromDb(firstBlog.slug, true);
    if (!fetchedBySlug || fetchedBySlug.id !== firstBlog.id) {
      throw new Error(`Failed to retrieve blog post by slug: ${firstBlog.slug}`);
    }
    console.log(`✓ Successfully retrieved blog post by slug: "${firstBlog.title}" (slug: ${firstBlog.slug})`);
  }

  // 4. Test Contact Submission Persistence
  console.log("\n[TEST 4] Contact Submissions Persistence in PostgreSQL");
  const contact = await createContactSubmission({
    name: "Enterprise Client",
    email: "client@enterprise.com",
    phone: "+91 9876543210",
    company: "Acme Global",
    inquiryType: "SAP S/4HANA Migration",
    subject: "S/4HANA Cloud Transition Project",
    message: "We need expert SAP consulting for our multi-entity landscape.",
    ipAddress: "127.0.0.1",
  });
  console.log(`✓ Contact submission created in PostgreSQL: ID ${contact.id} (Status: ${contact.status})`);

  const updatedContact = await updateContactSubmissionStatus(contact.id, "IN_PROGRESS", "Assigned to SAP team.");
  if (updatedContact.status !== "IN_PROGRESS") {
    throw new Error("Failed to update contact submission status.");
  }
  console.log(`✓ Contact submission status updated to: ${updatedContact.status}`);

  // 5. Test Career Submission Persistence with Resume Binary (BYTEA)
  console.log("\n[TEST 5] Career Application & Resume BYTEA Storage in PostgreSQL");
  const mockResumeContent = Buffer.from("%PDF-1.4 Mock resume binary content for automated test");
  const career = await createCareerSubmission({
    name: "Senior SAP Architect",
    email: "candidate@trijotech-careers.com",
    phone: "+91 9123456789",
    position: "Senior SAP BTP Architect",
    experience: "8.5",
    company: "Global Tech Corp",
    message: "10+ years of SAP CAP and BTP experience.",
    resumeName: "Architect_Resume.pdf",
    resumeMime: "application/pdf",
    resumeSize: mockResumeContent.length,
    resumeBuffer: mockResumeContent,
    ipAddress: "127.0.0.1",
  });
  console.log(`✓ Career submission created in PostgreSQL: ID ${career.id} (Resume: ${career.resumeName})`);

  const resumeResult = await getCareerResumeBuffer(career.id);
  if (!resumeResult || !resumeResult.buffer.equals(mockResumeContent)) {
    throw new Error("Failed to retrieve matching resume BYTEA binary from PostgreSQL!");
  }
  console.log(`✓ Resume BYTEA binary verified and matched (${resumeResult.buffer.length} bytes, MIME: ${resumeResult.mimeType}).`);

  // 6. Test Chatbot Knowledge & Settings
  console.log("\n[TEST 6] Chatbot Intelligence in PostgreSQL");
  const kbEntries = await getAllKnowledgeEntriesFromDb();
  const cbSettings = await getChatbotSettingsFromDb();
  console.log(`✓ Chatbot loaded from PostgreSQL: ${kbEntries.length} knowledge entries, Assistant: "${cbSettings.assistantName}".`);

  // 7. Test Audit Logs
  console.log("\n[TEST 7] Audit Logging in PostgreSQL");
  const auditLogs = await getRecentAuditLogs(10);
  console.log(`✓ Retrieved ${auditLogs.length} audit logs from PostgreSQL table.`);
  for (const log of auditLogs.slice(0, 3)) {
    console.log(`  - [${log.action}] on ${log.entityType || "general"} at ${log.createdAt.toISOString()}`);
  }

  console.log("\n==================================================");
  console.log("ALL POSTGRESQL INTEGRATION TESTS PASSED (7/7) ✓");
  console.log("==================================================");
}

runTests()
  .catch((err) => {
    console.error("Test Suite Failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
