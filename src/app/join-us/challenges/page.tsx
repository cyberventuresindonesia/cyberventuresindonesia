'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GateProgress from '@/components/GateProgress';
import { Storage } from '@/lib/storage';
import { ArrowLeft, Trophy, Lock, CheckCircle, Terminal, Flag, AlertCircle, X, Zap } from 'lucide-react';

interface Challenge {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  solved: boolean;
  flag: string;
}

const challenges: Challenge[] = [
  {
    id: 1,
    title: "Hidden Path",
    description: "Find the hidden directory on this web server. Check robots.txt for hints.",
    category: "Web",
    difficulty: "Easy",
    points: 100,
    solved: false,
    flag: "CVI{rob0ts_txt_l34ks}"
  },
  {
    id: 2,
    title: "Login Bypass",
    description: "This login form is vulnerable to SQL injection. Can you bypass it?",
    category: "Web",
    difficulty: "Medium",
    points: 200,
    solved: false,
    flag: "CVI{sql1_m4st3r}"
  },
  {
    id: 3,
    title: "Caesar's Secret",
    description: "Decode this Caesar cipher: WKLV LV D VHFUHW",
    category: "Crypto",
    difficulty: "Easy",
    points: 100,
    solved: false,
    flag: "CVI{c43s4r_c1ph3r}"
  },
  {
    id: 4,
    title: "Packet Detective",
    description: "Analyze this PCAP file to find the hidden flag.",
    category: "Forensics",
    difficulty: "Medium",
    points: 150,
    solved: false,
    flag: "CVI{p4ck3t_m4st3r}"
  },
  {
    id: 5,
    title: "Buffer Overflow 101",
    description: "Exploit this vulnerable program to get the flag.",
    category: "Pwn",
    difficulty: "Hard",
    points: 300,
    solved: false,
    flag: "CVI{sh3ll_0bt41n3d}"
  }
];

export default function ChallengesPage() {
  const router = useRouter();
  
  // Check if user has completed quiz (Gate 1)
  useEffect(() => {
    const currentGate = localStorage.getItem('currentGate');
    const quizPassed = localStorage.getItem('quizPassed');
    
    // Only allow access if user passed quiz (Gate 1)
    if (currentGate !== '2' && quizPassed !== 'true') {
      // User hasn't passed quiz, redirect to quiz
      router.push('/join-us/quiz');
    }
  }, [router]);

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return { text: 'text-success', bg: 'bg-success/10', border: 'border-success/30' };
      case 'Medium': return { text: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' };
      case 'Hard': return { text: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/30' };
      default: return { text: 'text-text-muted', bg: 'bg-bg-tertiary', border: 'border-border-subtle' };
    }
  };
  const [activeChallenges, setActiveChallenges] = useState<Challenge[]>(challenges);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [flagInput, setFlagInput] = useState('');
  const [message, setMessage] = useState('');
  const [totalScore, setTotalScore] = useState(0);
  const [solvedCount, setSolvedCount] = useState(0);

  const handleSubmitFlag = async () => {
    if (!selectedChallenge) return;

    // Normalize input: trim whitespace and compare
    const normalizedInput = flagInput.trim();
    
    // Debug logging
    console.log('Submitting flag:', normalizedInput);
    console.log('Expected flag:', selectedChallenge.flag);
    console.log('Match:', normalizedInput === selectedChallenge.flag);
    
    if (normalizedInput === selectedChallenge.flag) {
      // Correct flag
      const updated = activeChallenges.map(c => 
        c.id === selectedChallenge.id ? { ...c, solved: true } : c
      );
      setActiveChallenges(updated);
      setTotalScore(totalScore + selectedChallenge.points);
      setSolvedCount(solvedCount + 1);
      setMessage('✅ Correct! Challenge solved!');
      
      // Save progress to storage
      try {
        const result = await Storage.saveChallengeProgress({
          candidateId: localStorage.getItem('currentUser') || 'guest',
          challengeId: selectedChallenge.id,
          solved: true,
          flag: normalizedInput,
          score: selectedChallenge.points,
        });
        console.log('Challenge progress saved:', result);
      } catch (error) {
        console.error('Error saving challenge:', error);
      }
      
      // Check if minimum 3 solved to pass
      if (solvedCount + 1 >= 3) {
        localStorage.setItem('currentGate', '3');
      }

      setTimeout(() => {
        setSelectedChallenge(null);
        setFlagInput('');
        setMessage('');
      }, 2000);
    } else {
      setMessage('❌ Wrong flag. Try again!');
    }
  };

  const navigateToLiveDefense = () => {
    router.push('/join-us/live-defense');
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background pt-24 pb-12">
        {/* Background Effects */}
        <div className="fixed inset-0 bg-gradient-to-b from-bg-secondary via-background to-bg-tertiary pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Gate Progress */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6 rounded-2xl bg-bg-elevated/50 border border-border-subtle backdrop-blur-sm">
              <GateProgress currentGate={2} />
            </div>
          </motion.div>

          {/* Back Button */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Link 
              href="/join-us/quiz"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-indigo transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Quiz</span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/30 mb-4">
              <Terminal className="w-4 h-4 text-accent-purple" />
              <span className="text-sm font-medium text-accent-purple">Gate 2: Hacking Challenges</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Capture the <span className="text-gradient">Flag</span>
            </h1>
            <p className="text-xl text-text-secondary">
              Solve at least 3 challenges to proceed. Current: <span className="text-accent-indigo font-semibold">{solvedCount}/5</span> solved
            </p>
            <p className="text-lg text-accent-purple mt-2 font-mono">Total Score: {totalScore} points</p>
          </motion.div>

          {/* Progress */}
          <div className="w-full bg-bg-tertiary rounded-full h-4 mb-8 border border-border-subtle overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-accent-indigo via-accent-purple to-accent-cyan rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(solvedCount / 3) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Challenges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {activeChallenges.map((challenge, index) => {
              const colors = getDifficultyColor(challenge.difficulty);
              return (
                <motion.div 
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => !challenge.solved && setSelectedChallenge(challenge)}
                  className={`group relative p-6 rounded-xl cursor-pointer transition-all duration-300 border ${
                    challenge.solved 
                      ? 'border-success/50 bg-success/5' 
                      : 'border-border-subtle bg-bg-elevated/50 hover:border-accent-indigo/50 hover:-translate-y-1'
                  }`}
                >
                  {/* Gradient hover effect */}
                  {!challenge.solved && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent-indigo/5 via-transparent to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  )}
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${colors.text} ${colors.bg} border ${colors.border}`}>
                        {challenge.difficulty}
                      </span>
                      <span className="text-accent-cyan font-bold font-mono">{challenge.points} pts</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                      {challenge.solved ? (
                        <CheckCircle className="w-5 h-5 text-success" />
                      ) : (
                        <Lock className="w-5 h-5 text-accent-indigo" />
                      )}
                      {challenge.title}
                    </h3>
                    <p className="text-sm text-text-secondary mb-4">{challenge.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-muted flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        {challenge.category}
                      </span>
                      {challenge.solved && (
                        <span className="text-success text-sm font-semibold flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          Solved
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Challenge Modal */}
          <AnimatePresence>
            {selectedChallenge && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              >
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative p-8 rounded-2xl bg-bg-elevated/90 border border-border-subtle backdrop-blur-md max-w-lg w-full"
                >
                  {/* Close button */}
                  <button
                    onClick={() => {
                      setSelectedChallenge(null);
                      setFlagInput('');
                      setMessage('');
                    }}
                    className="absolute top-4 right-4 text-text-muted hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-accent-indigo/10 border border-accent-indigo/30 flex items-center justify-center">
                      <Flag className="w-5 h-5 text-accent-indigo" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{selectedChallenge.title}</h3>
                  </div>
                  
                  <p className="text-text-secondary mb-6">{selectedChallenge.description}</p>
                  
                  <div className="bg-bg-tertiary rounded-lg p-4 mb-6 border border-border-subtle">
                    <p className="text-xs text-text-muted mb-2 flex items-center gap-1">
                      <Terminal className="w-3 h-3" />
                      Challenge Container:
                    </p>
                    <code className="text-accent-cyan text-sm font-mono">http://localhost:800{selectedChallenge.id}</code>
                  </div>

                  {/* DEV MODE: Show expected flag format */}
                  <div className="bg-warning/10 border border-warning/30 rounded-lg p-3 mb-4">
                    <p className="text-xs text-warning/70 mb-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Expected Flag Format:
                    </p>
                    <code className="text-warning text-sm font-mono">{selectedChallenge.flag}</code>
                  </div>

                  <input
                    type="text"
                    value={flagInput}
                    onChange={(e) => setFlagInput(e.target.value)}
                    placeholder="Enter flag (CVI{...})"
                    className="w-full bg-bg-secondary border border-border-default rounded-lg px-4 py-3 text-foreground placeholder:text-text-muted focus:outline-none focus:border-accent-indigo transition-colors mb-4"
                  />

                  {message && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-center mb-4 ${message.includes('✅') ? 'text-success' : 'text-danger'}`}
                    >
                      {message}
                    </motion.p>
                  )}

                  <div className="flex gap-4">
                    <button
                      onClick={handleSubmitFlag}
                      className="relative group flex-1"
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-indigo to-accent-purple rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-300" />
                      <div className="relative w-full bg-accent-indigo hover:bg-accent-indigo/90 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                        <Flag className="w-4 h-4" />
                        Submit Flag
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedChallenge(null);
                        setFlagInput('');
                        setMessage('');
                      }}
                      className="flex-1 bg-bg-tertiary hover:bg-bg-secondary text-foreground font-semibold py-3 rounded-lg transition-colors border border-border-default"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Continue Button */}
          {solvedCount >= 3 && (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-6 rounded-2xl bg-success/10 border border-success/30 mb-4">
                <p className="text-success font-semibold flex items-center justify-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Congratulations! You&apos;ve unlocked Gate 3
                </p>
              </div>
              <button
                onClick={navigateToLiveDefense}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-accent-indigo to-accent-purple rounded-xl blur opacity-40 group-hover:opacity-70 transition duration-300 animate-pulse" />
                <div className="relative inline-flex items-center gap-3 px-8 py-4 bg-accent-indigo hover:bg-accent-indigo/90 text-white font-semibold rounded-xl transition-colors text-lg">
                  <Trophy className="w-5 h-5" />
                  Continue to Gate 3: Live Defense
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </div>
              </button>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
