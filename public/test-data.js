// Test Data Generator - Run in browser console
(function() {
  console.log('🧪 Generating Test Data...\n');
  
  const testId = Date.now().toString(36);
  
  // 1. Application Data
  localStorage.setItem('applicationData', JSON.stringify({
    fullName: 'Test Candidate ' + testId,
    email: `test-${testId}@example.com`,
    position: 'Security Analyst',
    yearsExperience: '3',
    phoneNumber: '08123456789',
    countryCode: '+62',
    telegramUsername: 'testuser',
    coverLetter: 'I am passionate about cybersecurity and want to join the team.',
    submittedAt: Date.now(),
  }));
  
  // 2. Candidate Data
  localStorage.setItem('candidateData', JSON.stringify({
    email: `test-${testId}@example.com`,
    fullName: 'Test Candidate ' + testId,
    position: 'Security Analyst',
  }));
  
  // 3. Gate 1 Progress
  localStorage.setItem('currentGate', '2');
  localStorage.setItem('gate1Flag', 'CVI{1n4t_d00r_w13h_th3_f13h3d_f1l4g!}');
  localStorage.setItem('gate1Passed', 'true');
  localStorage.setItem('gate1CompletedAt', new Date().toISOString());
  
  // 4. Gate 2 Progress
  localStorage.setItem('gate2Flag', 'CVI{l0g_4n4ly5t_m4st3r_192.168.1.103_sql_injection}');
  localStorage.setItem('gate2Passed', 'true');
  localStorage.setItem('gate2CompletedAt', new Date().toISOString());
  localStorage.setItem('currentGate', '3');
  
  // 5. Gate 3 Progress
  localStorage.setItem('gate3Flags', JSON.stringify([
    'CVI{w3b_3xpl01t_101}',
    'CVI{pr1v_3sc4l4t10n}'
  ]));
  localStorage.setItem('gate3Passed', 'true');
  localStorage.setItem('currentGate', '4');
  
  // 6. Live Defense Schedule
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  localStorage.setItem('liveDefenseSchedule', JSON.stringify({
    preferredDate: tomorrow.toISOString().split('T')[0],
    preferredTime: '10:00',
    timezone: 'WIB',
    notes: 'Prefer morning session',
    scheduled: true,
    meetLink: 'https://meet.google.com/cvi-test-123',
    scheduledAt: new Date().toISOString(),
  }));
  localStorage.setItem('liveDefenseScheduled', 'true');
  
  // 7. Quiz Results
  localStorage.setItem('quizResults', JSON.stringify([{
    id: 'quiz-' + testId,
    email: `test-${testId}@example.com`,
    score: 80,
    total: 100,
    passed: true,
    completedAt: new Date().toISOString(),
  }]));
  
  console.log('✅ Test data generated successfully!\n');
  console.log('Test Candidate Email:', `test-${testId}@example.com`);
  console.log('Current Gate:', '4 (Live Defense Scheduled)');
  console.log('\n📍 Quick Links:');
  console.log('- Join Us: /join-us');
  console.log('- Gate 1: /join-us/gate-1');
  console.log('- Gate 2: /join-us/gate-2');
  console.log('- Gate 3: /join-us/gate-3');
  console.log('- Live Defense: /join-us/live-defense');
  console.log('- Admin: /admin');
  console.log('- Sandboxes: /admin/sandboxes');
  console.log('- Live Defense Admin: /admin/live-defense');
  console.log('\n🚀 Ready to test!');
  
  return {
    testId,
    email: `test-${testId}@example.com`,
    currentGate: 4
  };
})();
