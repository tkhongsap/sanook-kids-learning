const { PrismaClient } = require('../lib/generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function ensureAdminUser() {
  const adminEmail = process.env.ADMIN_EMAIL ?? 'tkhongsap';
  const adminName = process.env.ADMIN_NAME ?? 'Sanook Admin';
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'sthought';

  const passwordToStore = adminPasswordHash
    ? adminPasswordHash
    : await bcrypt.hash(adminPassword, 12);

  const user = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: adminName,
      password: passwordToStore,
      isAdmin: true,
    },
    create: {
      email: adminEmail,
      name: adminName,
      password: passwordToStore,
      isAdmin: true,
    },
  });

  console.log(`✅ Admin user ready: ${user.email}`);
}

async function main() {
  await ensureAdminUser();
}

main()
  .catch((error) => {
    console.error('❌ Failed to seed database', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
