/**
 * Test Utilities for Recruitment System
 * Functions to simulate candidate flow and verify data
 */

export const TestData = {
  // Valid dummy candidate data
  candidate: {
    fullName: 'Ahmad Fauzi',
    email: 'ahmad.fauzi@email.com',
    position: 'security-analyst',
    yearsExperience: 3,
    coverLetter: 'I am passionate about cybersecurity with 3 years of experience in penetration testing and vulnerability assessment. I have strong skills in Python, Kali Linux, and various security tools.',
    phoneNumber: '81234567890',
    countryCode: '+62',
    telegramUsername: 'ahmadfauzi_sec',
  },
  
  // Invalid data for testing
  invalidData: {
    shortName: 'Ah',
    invalidEmail: 'not-an-email',
    shortPhone: '123',
    invalidTelegram: '@me',
  },
  
  // Quiz results
  quizResult: {
    score: 12,
    total: 15,
    percentage: 80,
    passed: true,
  },
  
  // Challenge progress
  challenges: {
    solved: [0, 1, 2], // First 3 challenges
    totalScore: 450,
  },
  
  // Live defense schedule
  liveDefense: {
    preferredDate: '2024-01-25',
    preferredTime: '14:00',
    timezone: 'WIB',
    notes: 'Available on weekdays after 2 PM',
  },
};

/**
 * Clear all recruitment data from localStorage
 */
export const clearAllData = () => {
  const keys = [
    'applications',
    'quizResults',
    'quizScore',
    'quizPercentage',
    'quizPassed',
    'challengeProgress',
    'liveDefenseSchedule',
    'currentGate',
    'applicationData',
    'sentEmails',
    'currentUser',
    'quizSessionId',
  ];
  
  keys.forEach(key => localStorage.removeItem(key));
  console.log('✅ All test data cleared');
};

/**
 * Simulate complete application submission
 */
export const simulateApplication = () => {
  const { candidate } = TestData;
  
  const applicationData = {
    ...candidate,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    submittedAt: Date.now(),
    cvFileName: 'ahmad_cv.pdf',
    cvSummary: 'CV uploaded: ahmad_cv\n- File size: 1450.2 KB\n- Format: PDF\n\n[Note: Full text extraction would require PDF parsing library]',
  };
  
  // Save to applications array
  const existing = JSON.parse(localStorage.getItem('applications') || '[]');
  existing.push(applicationData);
  localStorage.setItem('applications', JSON.stringify(existing));
  
  // Save to current application
  localStorage.setItem('applicationData', JSON.stringify({
    ...candidate,
    fullPhoneNumber: `${candidate.countryCode}${candidate.phoneNumber}`,
    submittedAt: Date.now(),
  }));
  
  // Set gate
  localStorage.setItem('currentGate', '1');
  
  console.log('✅ Application submitted:', candidate.fullName);
  return applicationData;
};

/**
 * Simulate quiz completion
 */
export const simulateQuizPass = () => {
  const { quizResult } = TestData;
  
  // Save quiz results
  localStorage.setItem('quizScore', quizResult.score.toString());
  localStorage.setItem('quizPercentage', quizResult.percentage.toString());
  localStorage.setItem('quizPassed', 'true');
  
  // Add to quiz results array
  const quizResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
  quizResults.push({
    id: Date.now().toString(),
    ...quizResult,
    completedAt: new Date().toISOString(),
  });
  localStorage.setItem('quizResults', JSON.stringify(quizResults));
  
  // Advance gate
  localStorage.setItem('currentGate', '2');
  
  console.log('✅ Quiz completed:', `${quizResult.percentage}% - PASSED`);
};

/**
 * Simulate challenge completion
 */
export const simulateChallenges = () => {
  const { challenges } = TestData;
  
  localStorage.setItem('challengeProgress', JSON.stringify({
    ...challenges,
    updatedAt: new Date().toISOString(),
  }));
  
  // Mark challenges as done
  localStorage.setItem('challengeFlags', JSON.stringify({
    flag1: 'FLAG{SQL_INJECTION_101}',
    flag2: 'FLAG{XSS_MASTER_2024}',
    flag3: 'FLAG{BYPASS_EXPERT}',
  }));
  
  // Advance gate
  localStorage.setItem('currentGate', '3');
  localStorage.setItem('challengesPassed', 'true');
  
  console.log('✅ Challenges completed:', `${challenges.solved.length}/5 solved`);
};

/**
 * Simulate Live Defense scheduling with email
 */
export const simulateLiveDefense = () => {
  const { liveDefense, candidate } = TestData;
  
  const scheduleData = {
    ...liveDefense,
    scheduled: true,
    candidateInfo: {
      fullName: candidate.fullName,
      email: candidate.email,
      position: candidate.position.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      telegramUsername: candidate.telegramUsername,
    },
    scheduledAt: new Date().toISOString(),
  };
  
  localStorage.setItem('liveDefenseSchedule', JSON.stringify(scheduleData));
  localStorage.setItem('currentGate', '4');
  localStorage.setItem('liveDefenseScheduled', 'true');
  
  // Simulate sent email
  const sentEmails = JSON.parse(localStorage.getItem('sentEmails') || '[]');
  sentEmails.push({
    id: Date.now().toString(),
    to: candidate.email,
    candidateName: candidate.fullName,
    position: scheduleData.candidateInfo.position,
    date: liveDefense.preferredDate,
    time: liveDefense.preferredTime,
    timezone: liveDefense.timezone,
    telegramUsername: candidate.telegramUsername,
    googleMeetLink: 'https://meet.google.com/cyber-ventures-live',
    subject: `Live Defense Scheduled – Cyber Security Screening Confirmation - ${candidate.fullName}`,
    sentAt: new Date().toISOString(),
  });
  localStorage.setItem('sentEmails', JSON.stringify(sentEmails));
  
  console.log('✅ Live Defense scheduled:', liveDefense.preferredDate);
  console.log('✅ Confirmation email sent to:', candidate.email);
};

/**
 * Run complete candidate flow test
 */
export const runFullTest = () => {
  console.log('🚀 Starting Full Recruitment Flow Test...\n');
  
  // Step 1: Clear existing data
  clearAllData();
  
  // Step 2: Submit application
  console.log('\n📋 Step 1: Application Form');
  const app = simulateApplication();
  console.log('  Name:', app.fullName);
  console.log('  Email:', app.email);
  console.log('  Phone:', `${app.countryCode}${app.phoneNumber}`);
  console.log('  Telegram:', app.telegramUsername);
  console.log('  Position:', app.position);
  
  // Step 3: Complete quiz
  console.log('\n📝 Step 2: Technical Quiz');
  simulateQuizPass();
  
  // Step 4: Complete challenges
  console.log('\n🏆 Step 3: Hacking Challenges');
  simulateChallenges();
  
  // Step 5: Schedule Live Defense
  console.log('\n🛡️ Step 4: Live Defense Scheduling');
  simulateLiveDefense();
  
  // Summary
  console.log('\n📊 Test Summary:');
  console.log('═══════════════════════════════════════');
  console.log('Candidate:', TestData.candidate.fullName);
  console.log('Email:', TestData.candidate.email);
  console.log('Current Gate:', localStorage.getItem('currentGate'));
  console.log('Quiz Score:', localStorage.getItem('quizPercentage') + '%');
  console.log('Challenges:', '3/5 completed');
  console.log('Live Defense:', 'Scheduled for', TestData.liveDefense.preferredDate);
  console.log('Email Sent:', '✅ Yes');
  console.log('═══════════════════════════════════════');
  
  console.log('\n✅ Full test completed successfully!');
  console.log('\nNext steps:');
  console.log('1. Visit /admin/recruitment/ to see candidate in dashboard');
  console.log('2. Check localStorage "sentEmails" for email content');
  console.log('3. Visit /dashboard/ to see candidate progress');
  
  return {
    candidate: TestData.candidate,
    gate: localStorage.getItem('currentGate'),
    status: 'COMPLETED',
  };
};

/**
 * Verify data integrity
 */
export const verifyData = () => {
  console.log('\n🔍 Verifying Data Integrity...\n');
  
  const checks = [
    { name: 'Applications', key: 'applications' },
    { name: 'Current Application', key: 'applicationData' },
    { name: 'Quiz Results', key: 'quizResults' },
    { name: 'Challenge Progress', key: 'challengeProgress' },
    { name: 'Live Defense Schedule', key: 'liveDefenseSchedule' },
    { name: 'Sent Emails', key: 'sentEmails' },
    { name: 'Current Gate', key: 'currentGate' },
  ];
  
  checks.forEach(check => {
    const data = localStorage.getItem(check.key);
    const status = data ? '✅' : '❌';
    const parsed = data ? JSON.parse(data) : null;
    const count = Array.isArray(parsed) ? `(${parsed.length} items)` : '';
    console.log(`${status} ${check.name}: ${check.key} ${count}`);
  });
  
  console.log('\n✅ Data verification complete');
};

// Export all test functions
export default {
  TestData,
  clearAllData,
  simulateApplication,
  simulateQuizPass,
  simulateChallenges,
  simulateLiveDefense,
  runFullTest,
  verifyData,
};
