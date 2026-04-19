// Prisma client with fallback for when database is not available
let prisma: any = null;

try {
  // Dynamic import to avoid errors if Prisma client is not generated
  const { PrismaClient } = require('@prisma/client');
  
  const globalForPrisma = globalThis as unknown as {
    prisma: any | undefined;
  };
  
  prisma = globalForPrisma.prisma ?? new PrismaClient();
  
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
  
  console.log('✅ Prisma client initialized');
} catch (error) {
  console.warn('⚠️ Prisma client not available. Database features disabled.');
  console.warn('   Run: npx prisma generate (requires DATABASE_URL)');
  prisma = null;
}

export { prisma };
