const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const dbInfo = await prisma.$queryRawUnsafe(`
    SELECT 
      current_database() as database_name, 
      current_user as user_name, 
      current_schema() as schema_name,
      inet_server_addr() as server_ip,
      inet_server_port() as server_port;
  `);
  console.log("=== CONNECTED POSTGRESQL DATABASE ===");
  console.log(dbInfo);

  const tables = await prisma.$queryRawUnsafe(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    ORDER BY table_name;
  `);
  console.log("\n=== ALL TABLES IN 'public' SCHEMA ===");
  console.table(tables);

  const rowCounts = await prisma.$queryRawUnsafe(`
    SELECT 
      relname as table_name, 
      n_live_tup as row_count 
    FROM pg_stat_user_tables 
    ORDER BY relname;
  `);
  console.log("\n=== ROW COUNTS PER TABLE ===");
  console.table(rowCounts);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
