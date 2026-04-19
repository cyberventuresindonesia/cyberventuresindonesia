'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Storage } from '@/lib/storage';
import { ArrowLeft, Trophy, Lock, CheckCircle } from 'lucide-react';

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

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-black pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link 
              href="/join-us/quiz"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Quiz</span>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Gate 2: <span className="text-cyan-400">Hacking Challenges</span>
            </h1>
            <p className="text-xl text-gray-400">
              Solve at least 3 challenges to proceed. Current: {solvedCount}/5 solved
            </p>
            <p className="text-lg text-cyan-400 mt-2">Total Score: {totalScore} points</p>
          </div>

          {/* Progress */}
          <div className="w-full bg-gray-800 rounded-full h-4 mb-8">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-4 rounded-full transition-all"
              style={{ width: `${(solvedCount / 5) * 100}%` }}
            />
          </div>

          {/* Challenges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {activeChallenges.map((challenge) => (
              <div 
                key={challenge.id}
                onClick={() => !challenge.solved && setSelectedChallenge(challenge)}
                className={`bg-gray-900/50 border rounded-xl p-6 cursor-pointer transition-all ${
                  challenge.solved 
                    ? 'border-green-500/50 bg-green-500/10' 
                    : 'border-gray-800 hover:border-cyan-500'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${getDifficultyColor(challenge.difficulty)} bg-gray-800`}>
                    {challenge.difficulty}
                  </span>
                  <span className="text-cyan-400 font-bold">{challenge.points} pts</span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">{challenge.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{challenge.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{challenge.category}</span>
                  {challenge.solved && (
                    <span className="text-green-400 text-sm font-bold">✓ Solved</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Challenge Modal */}
          {selectedChallenge && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-lg w-full">
                <h3 className="text-2xl font-bold text-white mb-4">{selectedChallenge.title}</h3>
                <p className="text-gray-400 mb-6">{selectedChallenge.description}</p>
                
                <div className="bg-black/50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-500 mb-2">Challenge Container:</p>
                  <code className="text-cyan-400 text-sm">http://localhost:800{selectedChallenge.id}</code>
                </div>

                {/* DEV MODE: Show expected flag format */}
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4">
                  <p className="text-xs text-yellow-400/70 mb-1">Expected Flag Format:</p>
                  <code className="text-yellow-400 text-sm font-mono">{selectedChallenge.flag}</code>
                </div>

                <input
                  type="text"
                  value={flagInput}
                  onChange={(e) => setFlagInput(e.target.value)}
                  placeholder="Enter flag (CVI{...})"
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white mb-4"
                />

                {message && (
                  <p className={`text-center mb-4 ${message.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
                    {message}
                  </p>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={handleSubmitFlag}
                    className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 rounded-lg"
                  >
                    Submit Flag
                  </button>
                  <button
                    onClick={() => {
                      setSelectedChallenge(null);
                      setFlagInput('');
                      setMessage('');
                    }}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Continue Button */}
          {solvedCount >= 3 && (
            <div className="text-center">
              <button
                onClick={navigateToLiveDefense}
                className="bg-green-500 hover:bg-green-600 text-black font-bold py-4 px-8 rounded-lg text-lg"
              >
                🎉 Continue to Gate 3: Live Defense
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
