const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const MIME_MAP = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".avif": "image/avif",
};

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  }

  return arrayOfFiles;
}

async function seedAllImagesToDatabase() {
  console.log("Connected to Prisma for Media Assets Binary Seeding...");

  const publicDir = path.join(__dirname, "..", "public");
  const assetsDir = path.join(publicDir, "assets");

  if (!fs.existsSync(assetsDir)) {
    console.error("public/assets directory does not exist!");
    await prisma.$disconnect();
    return;
  }

  const allFiles = getAllFiles(assetsDir);
  console.log(`Found ${allFiles.length} files under public/assets to insert into PostgreSQL...`);

  let count = 0;
  for (const filePath of allFiles) {
    const relativePath = path.relative(publicDir, filePath).replace(/\\/g, "/");
    const publicUrl = `/${relativePath}`;
    const storageKey = relativePath;
    const fileName = path.basename(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const mimeType = MIME_MAP[ext] || "application/octet-stream";
    const buffer = fs.readFileSync(filePath);
    const fileSize = buffer.length;

    await prisma.mediaAsset.upsert({
      where: { storageKey },
      update: {
        fileName,
        originalName: fileName,
        mimeType,
        fileSize,
        storageType: "DATABASE_BLOB",
        publicUrl,
        data: buffer,
        updatedAt: new Date(),
      },
      create: {
        fileName,
        originalName: fileName,
        mimeType,
        fileSize,
        storageType: "DATABASE_BLOB",
        storageKey,
        publicUrl,
        data: buffer,
      },
    });

    count++;
    if (count % 50 === 0 || count === allFiles.length) {
      console.log(`✓ Stored ${count}/${allFiles.length} images into PostgreSQL binary BYTEA`);
    }
  }

  console.log(`🎉 SUCCESS: All ${count} image files are now stored directly in PostgreSQL database table "media_assets"!`);

  const stats = await prisma.$queryRaw`
    SELECT COUNT(*)::text as total, pg_size_pretty(SUM(octet_length("data"))) as total_bytes FROM "media_assets";
  `;
  console.log("Database Media Assets Summary:", stats);

  await prisma.$disconnect();
}

seedAllImagesToDatabase().catch(async (err) => {
  console.error("Error seeding media assets to database:", err);
  await prisma.$disconnect();
  process.exit(1);
});
