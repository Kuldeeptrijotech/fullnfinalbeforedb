const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.ADMIN_EMAIL || "admin@trijotech.com").toLowerCase().trim();
  const rawPassword = process.env.ADMIN_PASSWORD || "123123";
  const name = process.env.ADMIN_NAME || "Trijotech Super Admin";
  const saltRounds = 12;

  console.log(`\n🌱 Seeding Admin User into PostgreSQL Database...`);
  console.log(`📧 Email: ${email}`);

  const passwordHash = await bcrypt.hash(rawPassword, saltRounds);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      name,
      role: "SUPER_ADMIN",
      passwordHash,
      isActive: true,
      failedLoginAttempts: 0,
      lockedUntil: null,
      updatedAt: new Date(),
    },
    create: {
      email,
      name,
      role: "SUPER_ADMIN",
      passwordHash,
      isActive: true,
      failedLoginAttempts: 0,
      lockedUntil: null,
    },
  });

  console.log(`✅ Admin user seeded successfully!`);
  console.log(`   ID: ${admin.id}`);
  console.log(`   Email: ${admin.email}`);
  console.log(`   Name: ${admin.name}`);
  console.log(`   Role: ${admin.role}`);
  console.log(`   Active: ${admin.isActive}`);
  console.log(`\n✨ You can now sign in at http://localhost:3000/admin/login with:`);
  console.log(`   Email: ${admin.email}`);
  console.log(`   Password: ${rawPassword}\n`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding admin user:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
