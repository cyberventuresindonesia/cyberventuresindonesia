'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { 
  User, 
  Calendar, 
  Clock, 
  Trophy, 
  Shield, 
  CheckCircle, 
  ChevronRight,
  Download,
  Mail,
  Phone,
  FileText,
  AlertCircle,
  ArrowRight,
  Target,
  BookOpen,
  MessageSquare
} from 'lucide-react';

interface ApplicationData {
  position: string;
  yearsExperience: number;
  phoneNumber: string;
  telegramUsername: string;
  submittedAt: number;
}

interface QuizResult {
  score: number;
  maxPossible: number;
  percentage: number;
  passed: boolean;
  completedAt: string;
}

interface ChallengeProgress {
  solved: number[];
  totalScore: number;
}

interface LiveDefenseSchedule {
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  scheduledAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState<ApplicationData | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [challenges, setChallenges] = useState<ChallengeProgress | null>(null);
  const [liveDefense, setLiveDefense] = useState<LiveDefenseSchedule | null>(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });
  const [currentGate, setCurrentGate] = useState('0');

  // Load all data on mount
  useEffect(() => {
    const loadData = () => {
      try {
        // Application data
        const appData = localStorage.getItem('applicationData');
        if (appData) {
          setApplication(JSON.parse(appData));
        }

        // Quiz result
        const quizScore = localStorage.getItem('quizScore');
        const quizPercentage = localStorage.getItem('quizPercentage');
        const quizPassed = localStorage.getItem('quizPassed');
        if (quizScore) {
          setQuizResult({
            score: parseInt(quizScore),
            maxPossible: 300,
            percentage: parseInt(quizPercentage || '0'),
            passed: quizPassed === 'true',
            completedAt: new Date().toISOString(),
          });
        }

        // Challenge progress
        const challengeData = localStorage.getItem('challengeProgress');
        if (challengeData) {
          setChallenges(JSON.parse(challengeData));
        } else {
          // Check localStorage for solved challenges
          const solved: number[] = [];
          let totalScore = 0;
          for (let i = 1; i <= 5; i++) {
            const solvedFlag = localStorage.getItem(`challenge_${i}_solved`);
            if (solvedFlag === 'true') {
              solved.push(i);
              // Add points based on challenge difficulty
              const points = i === 1 ? 100 : i === 2 ? 200 : i === 3 ? 100 : i === 4 ? 150 : 300;
              totalScore += points;
            }
          }
          setChallenges({ solved, totalScore });
        }

        // Live Defense schedule
        const defenseData = localStorage.getItem('liveDefenseSchedule');
        if (defenseData) {
          setLiveDefense(JSON.parse(defenseData));
        }

        // Current gate
        const gate = localStorage.getItem('currentGate') || '0';
        setCurrentGate(gate);

      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
        setMounted(true);
      }
    };

    loadData();
  }, []);

  // Countdown timer for Live Defense
  useEffect(() => {
    if (!liveDefense?.preferredDate || !liveDefense?.preferredTime) return;

    const calculateCountdown = () => {
      const scheduleDate = new Date(`${liveDefense.preferredDate}T${liveDefense.preferredTime}`);
      const now = new Date();
      const diff = scheduleDate.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setCountdown({ days, hours, minutes });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [liveDefense]);

  // Format position name
  const formatPosition = (position: string) => {
    return position
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Check if user can access dashboard
  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-black pt-24 pb-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading dashboard...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Check if user has started recruitment process
  if (!application && !quizResult) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-black pt-24 pb-12">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
              <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">No Application Found</h2>
              <p className="text-gray-400 mb-6">
                You haven&apos;t started the recruitment process yet. Apply now to join Cyber Ventures!
              </p>
              <Link
                href="/join-us"
                className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Start Application
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-black pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Applicant Dashboard
            </h1>
            <p className="text-gray-400">
              Track your recruitment progress and prepare for Live Defense
            </p>
          </div>

          {/* Profile Card */}
          {application && (
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-cyan-500/20 rounded-2xl p-6 mb-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <User className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {formatPosition(application.position)}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      {application.yearsExperience} years experience
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Applied</p>
                  <p className="text-cyan-400">
                    {mounted ? new Date(application.submittedAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    }) : '-'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-800">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-300">{application.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-300">@{application.telegramUsername}</span>
                </div>
              </div>
            </div>
          )}

          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Gate 1 */}
            <div className={`rounded-xl p-6 border ${
              quizResult?.passed 
                ? 'bg-green-500/10 border-green-500/30' 
                : quizResult 
                  ? 'bg-red-500/10 border-red-500/30'
                  : 'bg-gray-900/50 border-gray-800'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  quizResult?.passed 
                    ? 'bg-green-500/20' 
                    : quizResult 
                      ? 'bg-red-500/20'
                      : 'bg-gray-800'
                }`}>
                  {quizResult?.passed ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : quizResult ? (
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  ) : (
                    <Target className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                <span className="text-xs text-gray-500">Gate 1</span>
              </div>
              <h3 className="font-bold text-white mb-1">Technical Quiz</h3>
              {quizResult ? (
                <>
                  <p className={`text-2xl font-bold ${
                    quizResult.passed ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {quizResult.percentage}%
                  </p>
                  <p className="text-gray-400 text-sm">
                    {quizResult.score}/{quizResult.maxPossible} points
                  </p>
                </>
              ) : (
                <p className="text-gray-500">Not started</p>
              )}
            </div>

            {/* Gate 2 */}
            <div className={`rounded-xl p-6 border ${
              (challenges?.solved?.length || 0) >= 3
                ? 'bg-green-500/10 border-green-500/30'
                : challenges?.solved?.length
                  ? 'bg-yellow-500/10 border-yellow-500/30'
                  : 'bg-gray-900/50 border-gray-800'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  (challenges?.solved?.length || 0) >= 3
                    ? 'bg-green-500/20'
                    : challenges?.solved?.length
                      ? 'bg-yellow-500/20'
                      : 'bg-gray-800'
                }`}>
                  {(challenges?.solved?.length || 0) >= 3 ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <Shield className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                <span className="text-xs text-gray-500">Gate 2</span>
              </div>
              <h3 className="font-bold text-white mb-1">Hacking Challenges</h3>
              {challenges?.solved ? (
                <>
                  <p className="text-2xl font-bold text-cyan-400">
                    {challenges.solved.length}/5 solved
                  </p>
                  <p className="text-gray-400 text-sm">
                    {challenges.totalScore} points earned
                  </p>
                </>
              ) : (
                <p className="text-gray-500">Not started</p>
              )}
            </div>

            {/* Gate 3 */}
            <div className={`rounded-xl p-6 border ${
              liveDefense
                ? 'bg-cyan-500/10 border-cyan-500/30'
                : 'bg-gray-900/50 border-gray-800'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  liveDefense ? 'bg-cyan-500/20' : 'bg-gray-800'
                }`}>
                  {liveDefense ? (
                    <Calendar className="w-5 h-5 text-cyan-400" />
                  ) : (
                    <Clock className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                <span className="text-xs text-gray-500">Gate 3</span>
              </div>
              <h3 className="font-bold text-white mb-1">Live Defense</h3>
              {liveDefense ? (
                <>
                  <p className="text-cyan-400 text-sm">
                    {liveDefense.preferredDate}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {liveDefense.preferredTime} {liveDefense.timezone}
                  </p>
                </>
              ) : (
                <p className="text-gray-500">Not scheduled</p>
              )}
            </div>
          </div>

          {/* Countdown Section */}
          {liveDefense && (
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-cyan-400" />
                Time Until Live Defense
              </h3>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-black/40 rounded-xl p-4">
                  <p className="text-4xl font-bold text-cyan-400">{countdown.days}</p>
                  <p className="text-gray-400 text-sm">Days</p>
                </div>
                <div className="bg-black/40 rounded-xl p-4">
                  <p className="text-4xl font-bold text-cyan-400">{countdown.hours}</p>
                  <p className="text-gray-400 text-sm">Hours</p>
                </div>
                <div className="bg-black/40 rounded-xl p-4">
                  <p className="text-4xl font-bold text-cyan-400">{countdown.minutes}</p>
                  <p className="text-gray-400 text-sm">Minutes</p>
                </div>
              </div>

              {countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && (
                <div className="mt-4 text-center">
                  <p className="text-yellow-400 font-bold">🔴 Live Defense Session Starting Now!</p>
                  <p className="text-gray-400 text-sm">Check your email for Google Meet link</p>
                </div>
              )}
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {!quizResult?.passed && (
                <Link
                  href="/join-us/quiz"
                  className="flex items-center gap-3 p-4 bg-gray-800/50 hover:bg-gray-800 rounded-xl transition-colors"
                >
                  <Target className="w-5 h-5 text-cyan-400" />
                  <span className="text-white font-medium">Take Quiz</span>
                  <ChevronRight className="w-4 h-4 text-gray-500 ml-auto" />
                </Link>
              )}
              
              {quizResult?.passed && (challenges?.solved?.length || 0) < 3 && (
                <Link
                  href="/join-us/challenges"
                  className="flex items-center gap-3 p-4 bg-gray-800/50 hover:bg-gray-800 rounded-xl transition-colors"
                >
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <span className="text-white font-medium">Solve Challenges</span>
                  <ChevronRight className="w-4 h-4 text-gray-500 ml-auto" />
                </Link>
              )}
              
              {!liveDefense && (challenges?.solved?.length || 0) >= 3 && (
                <Link
                  href="/join-us/live-defense"
                  className="flex items-center gap-3 p-4 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 rounded-xl transition-colors"
                >
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  <span className="text-cyan-400 font-bold">Schedule Live Defense</span>
                  <ChevronRight className="w-4 h-4 text-cyan-400 ml-auto" />
                </Link>
              )}

              <Link
                href="/resources"
                className="flex items-center gap-3 p-4 bg-gray-800/50 hover:bg-gray-800 rounded-xl transition-colors"
              >
                <BookOpen className="w-5 h-5 text-green-400" />
                <span className="text-white font-medium">Study Resources</span>
                <ChevronRight className="w-4 h-4 text-gray-500 ml-auto" />
              </Link>

              <Link
                href="/contact"
                className="flex items-center gap-3 p-4 bg-gray-800/50 hover:bg-gray-800 rounded-xl transition-colors"
              >
                <Mail className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">Contact Support</span>
                <ChevronRight className="w-4 h-4 text-gray-500 ml-auto" />
              </Link>
            </div>
          </div>

          {/* Study Materials */}
          {liveDefense && countdown.days <= 7 && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-yellow-400" />
                Pre-Session Study Materials
              </h3>
              <p className="text-gray-400 mb-4">
                Prepare for your Live Defense session with these recommended resources:
              </p>
              <div className="space-y-3">
                <a 
                  href="#" 
                  className="flex items-center gap-3 p-3 bg-black/30 rounded-lg hover:bg-black/50 transition-colors"
                >
                  <Download className="w-5 h-5 text-cyan-400" />
                  <span className="text-white">SIEM Dashboard Guide (PDF)</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center gap-3 p-3 bg-black/30 rounded-lg hover:bg-black/50 transition-colors"
                >
                  <Download className="w-5 h-5 text-cyan-400" />
                  <span className="text-white">Incident Response Playbook (PDF)</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center gap-3 p-3 bg-black/30 rounded-lg hover:bg-black/50 transition-colors"
                >
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <span className="text-white">Common Attack Patterns Reference</span>
                </a>
              </div>
            </div>
          )}

          {/* Contact Card */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-2">Need Help?</h3>
            <p className="text-gray-400 mb-4">
              Our recruitment team is here to assist you. Reach out if you have questions or need to reschedule.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="mailto:recruitment@cyber-ventures.id" 
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
              >
                <Mail className="w-4 h-4" />
                recruitment@cyber-ventures.id
              </a>
              <span className="text-gray-600">|</span>
              <span className="text-gray-400">
                Response time: 24-48 hours
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
