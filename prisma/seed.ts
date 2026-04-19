import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...\n');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@cyber-ventures.id' },
    update: {},
    create: {
      email: 'admin@cyber-ventures.id',
      password: adminPassword,
      name: 'System Administrator',
      role: 'SUPER_ADMIN',
    },
  });
  
  console.log('✅ Admin user created:');
  console.log('   Email: admin@cyber-ventures.id');
  console.log('   Password: admin123');
  console.log('   Role: SUPER_ADMIN\n');

  // Create sample candidate
  const sampleCandidate = await prisma.candidate.upsert({
    where: { email: 'sample@example.com' },
    update: {},
    create: {
      fullName: 'Sample Candidate',
      email: 'sample@example.com',
      phoneNumber: '+6281234567890',
      countryCode: '+62',
      telegramUsername: 'sample_user',
      position: 'security-analyst',
      yearsExperience: 3,
      coverLetter: 'I am passionate about cybersecurity and excited to join Cyber Ventures.',
      cvFileName: 'sample_cv.pdf',
      currentGate: 4,
      status: 'LIVE_DEFENSE_SCHEDULED',
    },
  });

  console.log('✅ Sample candidate created:');
  console.log('   Name: Sample Candidate');
  console.log('   Email: sample@example.com');
  console.log('   Current Gate: 4');
  console.log('   Status: LIVE_DEFENSE_SCHEDULED\n');

  // Create quiz result for sample candidate
  await prisma.quizResult.upsert({
    where: { candidateId: sampleCandidate.id },
    update: {},
    create: {
      candidateId: sampleCandidate.id,
      score: 12,
      total: 15,
      percentage: 80,
      passed: true,
      timeSpent: 240,
    },
  });

  console.log('✅ Quiz result created: 80% (PASSED)\n');

  // Create challenge progress
  await prisma.challengeProgress.upsert({
    where: { candidateId: sampleCandidate.id },
    update: {},
    create: {
      candidateId: sampleCandidate.id,
      solved: [0, 1, 2, 3],
      totalScore: 750,
      flags: {
        flag1: 'FLAG{SQL_INJECTION_101}',
        flag2: 'FLAG{XSS_MASTER_2024}',
        flag3: 'FLAG{BYPASS_EXPERT}',
        flag4: 'FLAG{CRYPTO_KING}',
      },
    },
  });

  console.log('✅ Challenge progress created: 4/5 solved\n');

  // Create live defense schedule
  await prisma.liveDefenseSchedule.upsert({
    where: { candidateId: sampleCandidate.id },
    update: {},
    create: {
      candidateId: sampleCandidate.id,
      preferredDate: '2024-02-15',
      preferredTime: '14:00',
      timezone: 'WIB',
      notes: 'Available on weekdays after 2 PM',
      googleMeetLink: 'https://meet.google.com/sample-link',
      status: 'SCHEDULED',
    },
  });

  console.log('✅ Live defense scheduled: 2024-02-15 @ 14:00 WIB\n');

  // Create system settings
  const settings = [
    { key: 'quiz_enabled', value: 'true', description: 'Enable/disable technical quiz' },
    { key: 'challenges_enabled', value: 'true', description: 'Enable/disable hacking challenges' },
    { key: 'live_defense_enabled', value: 'true', description: 'Enable/disable live defense scheduling' },
    { key: 'quiz_pass_percentage', value: '60', description: 'Minimum percentage to pass quiz' },
    { key: 'challenges_required', value: '3', description: 'Number of challenges required to pass' },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  console.log('✅ System settings created\n');

  console.log('═══════════════════════════════════════');
  console.log('🎉 Database seeding completed!');
  console.log('═══════════════════════════════════════');
  console.log('\nLogin credentials:');
  console.log('   URL: /admin/login');
  console.log('   Email: admin@cyber-ventures.id');
  console.log('   Password: admin123');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
