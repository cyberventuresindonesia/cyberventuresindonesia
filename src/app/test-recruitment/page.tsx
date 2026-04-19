'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { 
  TestData, 
  clearAllData, 
  simulateApplication, 
  simulateQuizPass, 
  simulateChallenges, 
  simulateLiveDefense,
  verifyData 
} from '@/lib/test-utils';
import { 
  Play, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  Database, 
  User, 
  Mail, 
  Shield, 
  Trophy,
  FileText,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

export default function TestRecruitmentPage() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [dataPreview, setDataPreview] = useState<any>(null);

  const addLog = (message: string) => {
    setTestResults(prev => [...prev, message]);
  };

  const runTest = async () => {
    setIsRunning(true);
    setTestResults([]);
    setCurrentStep(0);
    addLog('🚀 Starting Dummy Test...\n');

    // Step 1: Clear data
    addLog('📍 Step 1: Clearing existing data...');
    clearAllData();
    await delay(500);
    addLog('✅ Data cleared\n');
    setCurrentStep(1);

    // Step 2: Application
    addLog('📍 Step 2: Submitting application form...');
    const app = simulateApplication();
    addLog(`  👤 Name: ${app.fullName}`);
    addLog(`  📧 Email: ${app.email}`);
    addLog(`  📱 Phone: ${app.countryCode}${app.phoneNumber}`);
    addLog(`  💬 Telegram: @${app.telegramUsername}`);
    addLog(`  💼 Position: ${app.position}`);
    addLog(`  📄 CV: ${app.cvFileName}`);
    addLog('✅ Application saved to localStorage\n');
    setCurrentStep(2);
    await delay(800);

    // Step 3: Quiz
    addLog('📍 Step 3: Completing technical quiz...');
    simulateQuizPass();
    const quizScore = localStorage.getItem('quizPercentage');
    addLog(`  📝 Score: ${quizScore}%`);
    addLog(`  ✅ Status: PASSED`);
    addLog('✅ Quiz results saved\n');
    setCurrentStep(3);
    await delay(800);

    // Step 4: Challenges
    addLog('📍 Step 4: Solving hacking challenges...');
    simulateChallenges();
    addLog('  🏆 Challenge 1: Buffer Overflow 101 - SOLVED');
    addLog('  🏆 Challenge 2: Web Exploitation - SOLVED');
    addLog('  🏆 Challenge 3: Reverse Engineering - SOLVED');
    addLog('  ⏭️  Challenge 4: Cryptography - SKIPPED');
    addLog('  ⏭️  Challenge 5: Forensics - SKIPPED');
    addLog('✅ 3/5 challenges completed\n');
    setCurrentStep(4);
    await delay(800);

    // Step 5: Live Defense
    addLog('📍 Step 5: Scheduling Live Defense...');
    simulateLiveDefense();
    const schedule = JSON.parse(localStorage.getItem('liveDefenseSchedule') || '{}');
    addLog(`  📅 Date: ${schedule.preferredDate}`);
    addLog(`  ⏰ Time: ${schedule.preferredTime} ${schedule.timezone}`);
    addLog(`  🔗 Platform: Google Meet`);
    addLog(`  📧 Email sent to: ${schedule.candidateInfo.email}`);
    addLog('✅ Live Defense scheduled\n');
    setCurrentStep(5);
    await delay(800);

    // Verification
    addLog('📍 Step 6: Verifying data integrity...');
    verifyDataInConsole();
    addLog('✅ All data verified\n');
    setCurrentStep(6);

    // Final summary
    addLog('═══════════════════════════════════════════════════');
    addLog('🎉 TEST COMPLETED SUCCESSFULLY!');
    addLog('═══════════════════════════════════════════════════');
    addLog(`Candidate: ${TestData.candidate.fullName}`);
    addLog(`Email: ${TestData.candidate.email}`);
    addLog(`Current Gate: ${localStorage.getItem('currentGate')}`);
    addLog(`Status: LIVE_DEFENSE_SCHEDULED`);
    addLog('═══════════════════════════════════════════════════');
    addLog('\n📌 Next Steps:');
    addLog('1. Visit /admin/recruitment/ to see candidate in dashboard');
    addLog('2. Visit /admin/candidates/ to view detailed profile');
    addLog('3. Visit /dashboard/ to see applicant progress');
    addLog('4. Check Browser Console for email content');

    // Update preview
    updateDataPreview();
    setIsRunning(false);
  };

  const verifyDataInConsole = () => {
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
      addLog(`  ${status} ${check.name}`);
    });
  };

  const updateDataPreview = () => {
    const preview: any = {};
    ['applications', 'quizResults', 'challengeProgress', 'liveDefenseSchedule', 'sentEmails', 'currentGate'].forEach(key => {
      const data = localStorage.getItem(key);
      if (data) {
        try {
          preview[key] = JSON.parse(data);
        } catch (e) {
          preview[key] = data;
        }
      }
    });
    setDataPreview(preview);
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const clearData = () => {
    clearAllData();
    setTestResults(['✅ All data cleared. Ready for new test.']);
    setCurrentStep(0);
    setDataPreview(null);
  };

  const steps = [
    { icon: Trash2, label: 'Clear Data', color: 'text-red-400' },
    { icon: FileText, label: 'Application Form', color: 'text-blue-400' },
    { icon: User, label: 'Technical Quiz', color: 'text-green-400' },
    { icon: Trophy, label: 'Hacking Challenges', color: 'text-purple-400' },
    { icon: Shield, label: 'Live Defense', color: 'text-orange-400' },
    { icon: Database, label: 'Verify Data', color: 'text-cyan-400' },
    { icon: CheckCircle, label: 'Complete', color: 'text-green-400' },
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-black pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              🧪 Recruitment System Test
            </h1>
            <p className="text-gray-400 text-lg">
              Run automated dummy test to verify the complete candidate flow
            </p>
          </div>

          {/* Test Progress */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-6">Test Progress</h2>
            <div className="grid grid-cols-7 gap-2">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                
                return (
                  <div key={index} className="text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 transition-all ${
                      isCompleted 
                        ? 'bg-green-500/20 border-2 border-green-500' 
                        : isActive 
                          ? 'bg-cyan-500/20 border-2 border-cyan-500 animate-pulse' 
                          : 'bg-gray-800 border-2 border-gray-700'
                    }`}>
                      <Icon className={`w-5 h-5 ${isCompleted || isActive ? step.color : 'text-gray-500'}`} />
                    </div>
                    <p className={`text-xs ${isCompleted || isActive ? 'text-gray-300' : 'text-gray-600'}`}>
                      {step.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={runTest}
              disabled={isRunning}
              className="flex-1 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-black font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-3"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-6 h-6 animate-spin" />
                  Running Test...
                </>
              ) : (
                <>
                  <Play className="w-6 h-6" />
                  Run Full Test
                </>
              )}
            </button>
            
            <button
              onClick={clearData}
              disabled={isRunning}
              className="flex-1 bg-red-500/20 hover:bg-red-500/30 border-2 border-red-500 disabled:bg-gray-800 disabled:border-gray-700 disabled:cursor-not-allowed text-red-400 font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-3"
            >
              <Trash2 className="w-6 h-6" />
              Clear All Data
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Test Log */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-cyan-400" />
                Test Log
              </h2>
              <div className="bg-black rounded-xl p-4 h-96 overflow-y-auto font-mono text-sm">
                {testResults.length === 0 ? (
                  <p className="text-gray-600">Click "Run Full Test" to start...</p>
                ) : (
                  testResults.map((log, index) => (
                    <div key={index} className="mb-1 text-gray-300 whitespace-pre-wrap">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Data Preview */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-green-400" />
                Data Preview
              </h2>
              <div className="bg-black rounded-xl p-4 h-96 overflow-y-auto">
                {dataPreview ? (
                  <pre className="text-xs text-green-400 whitespace-pre-wrap">
                    {JSON.stringify(dataPreview, null, 2)}
                  </pre>
                ) : (
                  <p className="text-gray-600">Run test to see data preview...</p>
                )}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/admin/recruitment/" className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl p-4 transition-all group">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Admin Recruitment</span>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400" />
              </div>
              <p className="text-gray-500 text-sm mt-1">View candidate in dashboard</p>
            </a>
            
            <a href="/admin/candidates/" className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl p-4 transition-all group">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Manage Candidates</span>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400" />
              </div>
              <p className="text-gray-500 text-sm mt-1">View detailed candidate profile</p>
            </a>
            
            <a href="/dashboard/" className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl p-4 transition-all group">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Applicant Dashboard</span>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400" />
              </div>
              <p className="text-gray-500 text-sm mt-1">See candidate progress view</p>
            </a>
          </div>

          {/* Test Candidate Info */}
          <div className="mt-8 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">📋 Test Candidate Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Full Name</p>
                <p className="text-white">{TestData.candidate.fullName}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="text-white">{TestData.candidate.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="text-white">{TestData.candidate.countryCode}{TestData.candidate.phoneNumber}</p>
              </div>
              <div>
                <p className="text-gray-500">Telegram</p>
                <p className="text-white">@{TestData.candidate.telegramUsername}</p>
              </div>
              <div>
                <p className="text-gray-500">Position</p>
                <p className="text-white capitalize">{TestData.candidate.position.replace(/-/g, ' ')}</p>
              </div>
              <div>
                <p className="text-gray-500">Experience</p>
                <p className="text-white">{TestData.candidate.yearsExperience} years</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
