'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GateProgress from '@/components/GateProgress';
import { Storage } from '@/lib/storage';
import { ArrowLeft, Trophy, Lock, CheckCircle, Terminal, Shield } from 'lucide-react';

// Dynamic import XTermTerminal to avoid SSR issues
const XTermTerminal = dynamic(() => import('@/components/XTermTerminal'), {
  ssr: false,
  loading: () => (
    <div className="h-[450px] flex items-center justify-center bg-[#0a0a0f] rounded-b-lg">
      <div className="flex items-center gap-3 text-cyan-400">
        <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
        <span className="font-mono text-sm">Loading terminal...</span>
      </div>
    </div>
  ),
});

export default function Gate1Page() {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(false);
  const [foundFlag, setFoundFlag] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Check if user has access to this gate
  useEffect(() => {
    const currentGate = Storage.get('currentGate');
    const candidateData = Storage.get('candidateData');
    
    // Only allow access if user has submitted application (Gate 0)
    if (!candidateData || currentGate !== '1') {
      router.push('/join-us');
    }
  }, [router]);

  const handleFlagFound = async (flag: string) => {
    setFoundFlag(flag);
    setIsCompleted(true);
    
    // Save to storage
    Storage.set('gate1Flag', flag);
    Storage.set('currentGate', '2');
    Storage.set('gate1Passed', 'true');
    Storage.set('gate1CompletedAt', new Date().toISOString());
    
    // Save to database via API
    try {
      const candidateData = Storage.get('candidateData');
      if (candidateData) {
        const parsed = JSON.parse(candidateData);
        await fetch('/api/recruitment/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: parsed.email,
            gate: 1,
            passed: true,
            flag: flag,
            completedAt: new Date().toISOString()
          })
        });
        
        // Send congratulatory email
        await fetch('/api/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: parsed.email,
            template: 'gate1_passed',
            variables: {
              name: parsed.fullName,
              flag: flag,
              position: parsed.position,
            }
          })
        });
      }
    } catch (error) {
      console.error('Failed to save progress or send email:', error);
    }
  };

  const proceedToNextGate = () => {
    router.push('/join-us/gate-2');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link 
              href="/join-us"
              className="inline-flex items-center gap-2 text-text-muted hover:text-accent-cyan transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Application
            </Link>
            
            <GateProgress currentGate={1} />
          </div>

          {/* Challenge Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 mb-4">
              <Terminal className="w-4 h-4 text-accent-cyan" />
              <span className="text-sm font-medium text-accent-cyan">Gate 1: Basic Security Challenge</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">
              Find the <span className="text-gradient">Hidden Flag</span>
            </h1>
            <p className="text-text-muted max-w-2xl mx-auto">
              Use your command-line skills to navigate the filesystem, read files, and find the hidden flag. 
              Start by reading the readme.txt file in your home directory.
            </p>
          </motion.div>

          {/* Terminal */}
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="glass-card p-1 rounded-xl">
              <div className="flex items-center gap-2 px-4 py-2 bg-bg-secondary/50 rounded-t-lg border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-text-muted ml-2 font-mono">candidate@cyberventures:~/gate-1</span>
              </div>
              
              <XTermTerminal 
                gateId={1}
                onFlagFound={handleFlagFound}
                height="450px"
                className="rounded-b-lg"
              />
            </div>

            {/* Success State */}
            {isCompleted && foundFlag && (
              <motion.div 
                className="mt-6 glass-card p-6 border-success/30"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-success">Challenge Complete!</h3>
                    <p className="text-text-muted text-sm">You found the flag: <code className="text-success">{foundFlag}</code></p>
                  </div>
                </div>
                
                <button
                  onClick={proceedToNextGate}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  Proceed to Gate 2
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </button>
              </motion.div>
            )}

            {/* Instructions Card */}
            {!isCompleted && (
              <motion.div 
                className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="glass-card p-4">
                  <Terminal className="w-8 h-8 text-accent-cyan mb-3" />
                  <h4 className="font-medium mb-1">Navigate</h4>
                  <p className="text-sm text-text-muted">Use cd, ls commands to explore directories</p>
                </div>
                <div className="glass-card p-4">
                  <Shield className="w-8 h-8 text-accent-cyan mb-3" />
                  <h4 className="font-medium mb-1">Search</h4>
                  <p className="text-sm text-text-muted">Check robots.txt and hidden files</p>
                </div>
                <div className="glass-card p-4">
                  <Lock className="w-8 h-8 text-accent-cyan mb-3" />
                  <h4 className="font-medium mb-1">Decode</h4>
                  <p className="text-sm text-text-muted">Use base64 -d to decode encrypted content</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
