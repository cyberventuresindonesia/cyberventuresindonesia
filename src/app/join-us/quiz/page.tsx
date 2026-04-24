'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GateProgress from '@/components/GateProgress';
import { Storage } from '@/lib/storage';
import { Clock, AlertTriangle, CheckCircle, XCircle, Shield, Terminal, Lock, ArrowRight } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "In a corporate network, you discover a rogue access point with the same SSID as the corporate WiFi. What attack is being performed?",
    options: ["Evil Twin", "Deauthentication", "War Driving", "Bluejacking"],
    correctAnswer: 0,
    category: "Network Security",
    difficulty: "Medium"
  },
  {
    id: 5,
    question: "A company implements 2FA using SMS. An attacker uses social engineering to convince the mobile carrier to transfer the victim's number to a new SIM. What is this attack?",
    options: ["SIM Swapping", "Smishing", "Vishing", "Shoulder Surfing"],
    correctAnswer: 0,
    category: "Social Engineering",
    difficulty: "Medium"
  },
  {
    id: 6,
    question: "During a security audit, you find that an API endpoint accepts user input directly into a SQL query without parameterization. What vulnerability exists?",
    options: ["Cross-Site Scripting", "SQL Injection", "Insecure Direct Object Reference", "XML External Entity"],
    correctAnswer: 1,
    category: "Application Security",
    difficulty: "Medium"
  },
  {
    id: 7,
    question: "You find a server with port 445 open to the internet with SMBv1 enabled. What is the primary risk?",
    options: ["FTP exploitation", "EternalBlue/BlueKeep vulnerability", "SSH brute force", "HTTP request smuggling"],
    correctAnswer: 1,
    category: "Network Security",
    difficulty: "Medium"
  },
  {
    id: 8,
    question: "A web application uses client-side JavaScript to validate that a user is over 18 before allowing access to restricted content. What is wrong with this approach?",
    options: ["JavaScript validation is too slow", "Client-side validation can be bypassed", "Server cannot read JavaScript", "It violates GDPR"],
    correctAnswer: 1,
    category: "Web Security",
    difficulty: "Medium"
  },
  {
    id: 9,
    question: "An attacker sends thousands of ICMP echo requests to a server, causing it to become unresponsive. What type of attack is this?",
    options: ["SYN Flood", "Ping of Death", "Smurf Attack", "DNS Amplification"],
    correctAnswer: 1,
    category: "Network Security",
    difficulty: "Medium"
  },
  {
    id: 10,
    question: "You discover that a web application stores user session IDs in the URL query parameters. What is the security implication?",
    options: ["Session fixation", "Session hijacking via browser history/shared URLs", "CSRF vulnerability", "XSS vulnerability"],
    correctAnswer: 1,
    category: "Web Security",
    difficulty: "Medium"
  },
  {
    id: 11,
    question: "A company uses WPA2-PSK with a weak password 'Company123'. An attacker captures the handshake and cracks it within minutes. What should the company implement?",
    options: ["WPA3-Personal with SAE", "WEP encryption", "MAC address filtering", "Hidden SSID"],
    correctAnswer: 0,
    category: "Network Security",
    difficulty: "Medium"
  },
  {
    id: 12,
    question: "You find that a web application is vulnerable to directory traversal via the URL parameter: /download?file=../../../etc/passwd. What is the root cause?",
    options: ["Insufficient input validation and path sanitization", "Weak password policy", "Missing HTTPS", "SQL injection"],
    correctAnswer: 0,
    category: "Web Security",
    difficulty: "Medium"
  },
  {
    id: 13,
    question: "An employee reports receiving a phone call from someone claiming to be IT support asking for their password. What type of attack is this?",
    options: ["Phishing", "Vishing", "Smishing", "Pretexting"],
    correctAnswer: 1,
    category: "Social Engineering",
    difficulty: "Medium"
  },
  {
    id: 14,
    question: "You find that a REST API returns HTTP 200 OK with full user details including hashed passwords when querying /api/users/123. What design flaw exists?",
    options: ["Insecure Direct Object Reference (IDOR)", "Overly permissive CORS", "Missing rate limiting", "Weak encryption"],
    correctAnswer: 0,
    category: "API Security",
    difficulty: "Medium"
  },
  {
    id: 15,
    question: "An attacker exploited a deserialization vulnerability in Java to execute commands. Which payload was likely used?",
    options: ["SQL payload", "ysoserial payload", "XSS script", "XML entity"],
    correctAnswer: 1,
    category: "Application Security",
    difficulty: "Medium"
  }
];

function QuizContent() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{questionId: number, answer: number, correct: boolean}[]>([]);
  const [timeLeft, setTimeLeft] = useState(300);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [hasAttempted, setHasAttempted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [quizResult, setQuizResult] = useState<any>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [sessionId, setSessionId] = useState<string>('');
  const [isActive, setIsActive] = useState(true);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

  // Generate or validate session ID on mount
  useEffect(() => {
    const storedAppData = localStorage.getItem('applicationData');
    const currentSession = localStorage.getItem('quizSessionId');
    
    if (storedAppData) {
      const appData = JSON.parse(storedAppData);
      // Use submittedAt timestamp to create unique session for each application
      const appTimestamp = appData.submittedAt || Date.now();
      const newSessionId = `quiz_${appData.position}_${appTimestamp}`;
      
      // Always create new session if different from current
      if (!currentSession || currentSession !== newSessionId) {
        // Clear previous quiz data
        localStorage.setItem('quizSessionId', newSessionId);
        localStorage.setItem('quizTimer', '300');
        localStorage.setItem('quizCurrentQuestion', '0');
        localStorage.setItem('quizAnswers', '[]');
        localStorage.setItem('quizStartTime', Date.now().toString());
        // Reset states
        setSessionId(newSessionId);
        setTimeLeft(300);
        setCurrentQuestion(0);
        setAnswers([]);
        setQuizCompleted(false);
        setScore(0);
        setSelectedAnswer(null);
      } else {
        setSessionId(currentSession);
      }
    }
  }, []);

  // Handle visibility change - pause/resume timer
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User switched tab - pause timer
        setIsActive(false);
        showTempWarning('Quiz paused. Return quickly!');
      } else {
        // User returned - resume timer
        setIsActive(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Handle beforeunload - warn user about leaving
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!quizCompleted && !hasAttempted && timeLeft > 0) {
        e.preventDefault();
        e.returnValue = 'You are in the middle of a quiz. Leaving will count as a failed attempt!';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [quizCompleted, hasAttempted, timeLeft]);

  // Handle navigation from Navigation component
  const handleNavigationAttempt = (href: string) => {
    if (!quizCompleted && !hasAttempted && timeLeft > 0) {
      setPendingNavigation(href);
      setShowExitConfirm(true);
      return false; // Prevent navigation
    }
    return true; // Allow navigation
  };

  const confirmExit = async () => {
    // Mark quiz as failed
    setQuizCompleted(true);
    setScore(0);
    
    // Save as failed attempt
    try {
      await Storage.saveQuizResult({
        score: 0,
        maxPossible: quizQuestions.length * 20,
        percentage: 0,
        passed: false,
        answers: [],
        completedAt: new Date().toISOString(),
        status: 'abandoned'
      });
    } catch (error) {
      console.error('Error saving abandoned quiz:', error);
    }
    
    // Clear quiz session
    localStorage.removeItem('quizTimer');
    localStorage.removeItem('quizCurrentQuestion');
    localStorage.removeItem('quizAnswers');
    localStorage.removeItem('quizStartTime');
    localStorage.removeItem('quizSessionId');
    
    // Navigate to selected page
    if (pendingNavigation) {
      router.push(pendingNavigation);
    }
  };

  const cancelExit = () => {
    setShowExitConfirm(false);
    setPendingNavigation(null);
  };

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Show temporary warning helper
  const showTempWarning = (message: string) => {
    setWarningMessage(message.replace('⚠️ ', '')); // Remove emoji if present
    setShowWarning(true);
    setTimeout(() => setShowWarning(false), 3000); // Hide after 3 seconds
  };

  // Anti-cheat measures - Stealth Mode
  useEffect(() => {
    if (quizCompleted || hasAttempted) return;

    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      showTempWarning('Right-click is disabled for security');
      return false;
    };

    // Disable copy, cut, paste - only show warning on attempt
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      showTempWarning('Copying quiz content is not allowed');
      return false;
    };

    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault();
      return false;
    };

    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      showTempWarning('Pasting is disabled during quiz');
      return false;
    };

    // Disable keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+A
      if ((e.ctrlKey || e.metaKey) && ['c', 'v', 'x', 'a'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        showTempWarning('Keyboard shortcuts are disabled');
        return false;
      }

      // Disable screenshot shortcuts (PrintScreen, Win+Shift+S)
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        showTempWarning('Screenshots are not allowed during quiz');
        return false;
      }

      // Disable F12 (DevTools)
      if (e.key === 'F12') {
        e.preventDefault();
        showTempWarning('Developer tools access blocked');
        return false;
      }

      // Disable Ctrl+Shift+I/J (DevTools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        showTempWarning('Developer tools access blocked');
        return false;
      }
    };

    // Detect text selection attempts
    let selectionAttempts = 0;
    const handleMouseDown = (e: MouseEvent) => {
      // Check if user is trying to select text (drag with left button)
      if (e.button === 0) {
        const target = e.target as HTMLElement;
        // If clicking on text elements
        if (target.tagName === 'P' || target.tagName === 'H1' || target.tagName === 'H2' || 
            target.tagName === 'H3' || target.tagName === 'SPAN' || target.tagName === 'DIV') {
          selectionAttempts++;
          if (selectionAttempts >= 3) {
            showTempWarning('Text selection is disabled during quiz');
            selectionAttempts = 0;
          }
        }
      }
    };

    // Detect window blur (user switching tabs/apps)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        showTempWarning('Tab switch detected - Timer paused');
        setIsActive(false);
      } else {
        setIsActive(true);
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCut);
    document.addEventListener('paste', handlePaste);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCut);
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [quizCompleted, hasAttempted]);

  // Note: Previous attempt check disabled - allowing quiz retakes
  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (hasAttempted || quizCompleted) return;
    
    const savedTimer = localStorage.getItem('quizTimer');
    const savedQuestion = localStorage.getItem('quizCurrentQuestion');
    const savedAnswers = localStorage.getItem('quizAnswers');
    const quizStartTime = localStorage.getItem('quizStartTime');
    
    if (savedTimer && quizStartTime) {
      const elapsed = Math.floor((Date.now() - parseInt(quizStartTime)) / 1000);
      const remaining = Math.max(0, 300 - elapsed);
      setTimeLeft(remaining);
    } else {
      localStorage.setItem('quizStartTime', Date.now().toString());
    }
    
    if (savedQuestion) setCurrentQuestion(parseInt(savedQuestion));
    if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
  }, [hasAttempted, quizCompleted]);


  const handleAnswer = (answerIndex: number) => {
    // Block answer if time is up
    if (timeLeft <= 0) {
      showTempWarning('Time is up! You cannot answer anymore.');
      finishQuizWithAnswers(answers);
      return;
    }
    
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    
    const question = quizQuestions[currentQuestion];
    const isCorrect = answerIndex === question.correctAnswer;
    
    const newAnswer = {
      questionId: question.id,
      answer: answerIndex,
      correct: isCorrect
    };
    
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        // Pass updated answers to finishQuiz to ensure last answer is counted
        finishQuizWithAnswers(updatedAnswers);
      }
    }, 1500);
  };

  const finishQuizWithAnswers = async (finalAnswers: typeof answers) => {
    setQuizCompleted(true);
    const correctCount = finalAnswers.filter(a => a.correct).length;
    const finalScore = correctCount * 20;
    const percentage = (finalScore / (quizQuestions.length * 20)) * 100;
    const passed = percentage >= 60;
    
    // Update score state for display
    setScore(finalScore);
    
    localStorage.removeItem('quizTimer');
    localStorage.removeItem('quizCurrentQuestion');
    localStorage.removeItem('quizAnswers');
    localStorage.removeItem('quizStartTime');
    
    try {
      await Storage.saveQuizResult({
        score: finalScore,
        maxPossible: quizQuestions.length * 20,
        percentage: percentage,
        passed: passed,
        answers: answers,
        completedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
    
    localStorage.setItem('quizScore', finalScore.toString());
    localStorage.setItem('quizPercentage', percentage.toString());
    localStorage.setItem('quizPassed', passed ? 'true' : 'false');
    
    // If passed, update currentGate to 2
    if (passed) {
      localStorage.setItem('currentGate', '2');
    }
  };

  const navigateToChallenges = () => {
    // Update currentGate to 2 before navigating
    localStorage.setItem('currentGate', '2');
    router.push('/join-us/challenges');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-indigo mx-auto mb-4"></div>
          <p className="text-text-secondary">Initializing Sentinel Gate 1...</p>
        </div>
      </div>
    );
  }

  // Note: Quiz blocking removed - users can now retake quiz by submitting new application

  if (quizCompleted) {
    const percentage = Math.round((score / (quizQuestions.length * 20)) * 100);
    const passed = percentage >= 60;

    return (
      <div className="min-h-screen bg-background pt-24 pb-12">
        {/* Background Effects */}
        <div className="fixed inset-0 bg-gradient-to-b from-bg-secondary via-background to-bg-tertiary pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <motion.div 
            className="p-8 rounded-2xl bg-bg-elevated/50 border border-border-subtle backdrop-blur-sm text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-indigo/10 border border-accent-indigo/30 mb-6">
              <Shield className="w-4 h-4 text-accent-indigo" />
              <span className="text-sm font-medium text-accent-indigo">Gate 1 Complete</span>
            </div>
            
            <h2 className="text-3xl font-bold text-foreground mb-6">Quiz Completed!</h2>
            
            <div className="text-6xl mb-4">{passed ? '🎉' : '😔'}</div>
            
            <div className={`text-4xl font-bold mb-4 ${passed ? 'text-success' : 'text-danger'}`}>
              {passed ? 'PASSED' : 'FAILED'}
            </div>
            
            <p className="text-2xl text-foreground mb-2 font-mono">Score: {score} / {quizQuestions.length * 20}</p>
            <p className="text-xl text-text-secondary mb-8">({percentage}% - Need 60% to pass)</p>

            {passed ? (
              <button
                onClick={navigateToChallenges}
                className="relative group w-full"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-indigo to-accent-purple rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-300" />
                <div className="relative w-full bg-accent-indigo hover:bg-accent-indigo/90 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                  Continue to Gate 2: Challenges
                  <ArrowRight className="w-5 h-5" />
                </div>
              </button>
            ) : (
              <div className="space-y-4">
                <p className="text-danger">You did not pass (required: 60%)</p>
                <p className="text-text-muted text-sm">This quiz can only be attempted once. Contact admin for assistance.</p>
                <button
                  onClick={() => router.push('/join-us')}
                  className="w-full bg-bg-tertiary hover:bg-bg-secondary text-foreground font-semibold py-4 rounded-lg transition-colors border border-border-default"
                >
                  Back to Application
                </button>
              </div>
            )}
            
            {/* DEV MODE: Reset Quiz for Testing - Available for both pass/fail */}
            <div className="pt-6 mt-6 border-t border-border-subtle">
              <p className="text-xs text-text-muted mb-2">Development Mode:</p>
              <button
                onClick={() => {
                  // Clear all quiz data
                  localStorage.removeItem('quizResults');
                  localStorage.removeItem('quizSessionId');
                  localStorage.removeItem('quizTimer');
                  localStorage.removeItem('quizCurrentQuestion');
                  localStorage.removeItem('quizAnswers');
                  localStorage.removeItem('quizStartTime');
                  localStorage.removeItem('quizScore');
                  localStorage.removeItem('quizPercentage');
                  localStorage.removeItem('quizPassed');
                  localStorage.removeItem('currentGate');
                  localStorage.removeItem('applicationData');
                  // Reload page
                  window.location.reload();
                }}
                className="w-full bg-warning/10 hover:bg-warning/20 border border-warning/50 text-warning text-sm font-medium py-2 rounded-lg transition-colors"
              >
                🔄 Reset Quiz (For Testing)
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <>
      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-md w-full mx-4 rounded-xl border-2 border-warning/50 bg-bg-secondary p-6 shadow-2xl shadow-warning/10 animate-fade-in-up">
            {/* Icon */}
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-warning/20 border-2 border-warning flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-warning" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-center text-warning mb-2">
              Leave Quiz?
            </h3>

            {/* Message */}
            <p className="text-text-secondary text-center mb-2">
              You are in the middle of the Technical Quiz.
            </p>
            <p className="text-warning/80 text-center text-sm mb-6">
              If you leave now, your current progress will be lost and this will count as a <strong>FAILED</strong> attempt.
            </p>

            {/* Warning note */}
            <div className="bg-danger/10 border border-danger/30 rounded-lg p-3 mb-6">
              <p className="text-danger text-xs text-center">
                🚫 You can only attempt this quiz once per application.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={cancelExit}
                className="flex-1 bg-accent-indigo hover:bg-accent-indigo/90 text-white font-bold py-3 rounded-lg transition-colors"
              >
                Continue Quiz
              </button>
              <button
                onClick={confirmExit}
                className="flex-1 bg-warning/20 hover:bg-warning/30 border border-warning text-warning font-bold py-3 rounded-lg transition-colors"
              >
                Leave & Fail
              </button>
            </div>
          </div>
        </div>
      )}

    <div className="min-h-screen bg-background pt-24 pb-12 select-none" style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-bg-secondary via-background to-bg-tertiary pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4">
        {/* Gate Progress */}
        <div className="mb-8">
          <div className="p-6 rounded-2xl bg-bg-elevated/50 border border-border-subtle backdrop-blur-sm">
            <GateProgress currentGate={1} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Terminal className="w-6 h-6 text-accent-indigo" />
              Gate 1: Technical Quiz
            </h1>
            <p className="text-text-secondary">Question {currentQuestion + 1} of {quizQuestions.length}</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Warning Alert - Inline with timer */}
            <AnimatePresence>
              {showWarning && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-1.5 bg-warning/20 border border-warning/50 rounded-lg px-3 py-1.5 shadow-lg shadow-warning/10"
                >
                  <AlertTriangle className="w-4 h-4 text-warning" />
                  <span className="text-warning text-xs font-medium whitespace-nowrap">{warningMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Timer */}
            <div className={`text-right px-4 py-2 rounded-lg border ${timeLeft < 60 ? 'bg-danger/10 border-danger/50' : 'bg-bg-tertiary border-border-subtle'}`}>
              <div className={`text-2xl font-mono flex items-center gap-2 ${timeLeft < 60 ? 'text-danger animate-pulse' : 'text-accent-indigo'}`}>
                <Clock className="w-5 h-5" />
                {formatTime(timeLeft)}
              </div>
              <p className="text-xs text-text-muted">5 minutes total</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden border border-border-subtle">
            <motion.div 
              className="h-full bg-gradient-to-r from-accent-indigo to-accent-purple"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-sm text-text-muted mt-2">Progress: {Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%</p>
        </div>

        {/* Question Card */}
        <motion.div 
          key={currentQuestion}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative p-8 rounded-2xl bg-bg-elevated/50 border border-border-subtle backdrop-blur-sm"
          style={{ userSelect: 'none' }}
        >
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-indigo/5 via-transparent to-accent-purple/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            {/* Time's Up Banner */}
            {timeLeft <= 0 && (
              <div className="mb-6 bg-danger/20 border-2 border-danger rounded-lg p-4 text-center animate-pulse">
                <p className="text-danger font-bold text-lg flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5" />
                  TIME&apos;S UP!
                </p>
                <p className="text-danger/80 text-sm">Quiz has ended. Your answers have been submitted.</p>
              </div>
            )}
            
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-warning/20 rounded-full text-xs text-warning border border-warning/30">
                  {question.difficulty}
                </span>
                <span className="px-3 py-1 bg-bg-tertiary rounded-full text-xs text-text-muted border border-border-subtle">
                  {question.category}
                </span>
              </div>
              <span className="text-xs text-text-muted font-mono">Question {currentQuestion + 1}/{quizQuestions.length}</span>
            </div>

            <h2 className="text-xl font-semibold text-foreground mb-8 leading-relaxed" style={{ userSelect: 'none', pointerEvents: 'none' }}>
              {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null || timeLeft <= 0}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`w-full text-left p-4 rounded-xl border transition-all select-none
                    ${timeLeft <= 0
                      ? 'border-border-default opacity-50 cursor-not-allowed'
                      : selectedAnswer === null 
                        ? 'border-border-default hover:border-accent-indigo/50 hover:bg-bg-tertiary/50' 
                        : selectedAnswer === index 
                          ? index === question.correctAnswer 
                            ? 'border-success bg-success/10' 
                            : 'border-danger bg-danger/10'
                          : index === question.correctAnswer && selectedAnswer !== null
                            ? 'border-success bg-success/10'
                            : 'border-border-default opacity-50'
                    }`}
                  style={{ userSelect: 'none' }}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold border ${
                      selectedAnswer === index
                        ? index === question.correctAnswer
                          ? 'bg-success text-white border-success'
                          : 'bg-danger text-white border-danger'
                        : selectedAnswer !== null && index === question.correctAnswer
                          ? 'bg-success text-white border-success'
                          : 'bg-bg-tertiary text-text-muted border-border-subtle'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-foreground">{option}</span>
                    {selectedAnswer === index && index === question.correctAnswer && (
                      <CheckCircle className="ml-auto w-5 h-5 text-success" />
                    )}
                    {selectedAnswer === index && index !== question.correctAnswer && (
                      <XCircle className="ml-auto w-5 h-5 text-danger" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
}

export default function QuizPage() {
  return (
    <>
      <Navigation />
      <QuizContent />
      <Footer />
    </>
  );
}
