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
import { ArrowLeft, Trophy, Lock, CheckCircle, Terminal, FileSearch } from 'lucide-react';

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

export default function Gate2Page() {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(false);
  const [foundFlag, setFoundFlag] = useState<string | null>(null);
  const [attackerInfo, setAttackerInfo] = useState<{ip: string, vector: string} | null>(null);

  // Check if user has access to this gate
  useEffect(() => {
    const currentGate = Storage.get('currentGate');
    const gate1Passed = Storage.get('gate1Passed');
    
    // Only allow access if user passed Gate 1
    if (currentGate !== '2' && gate1Passed !== 'true') {
      router.push('/join-us/gate-1');
    }
  }, [router]);

  const handleFlagFound = async (flag: string) => {
    setFoundFlag(flag);
    setIsCompleted(true);
    
    // Parse attacker info from flag
    // Format: CVI{l0g_4n4ly5t_m4st3r_192.168.1.103_sql_injection}
    const ipMatch = flag.match(/(\d+\.\d+\.\d+\.\d+)/);
    const vectorMatch = flag.match(/([a-z_]+)}$/);
    
    if (ipMatch) {
      setAttackerInfo({
        ip: ipMatch[1],
        vector: vectorMatch ? vectorMatch[1].replace(/_/g, ' ') : 'Unknown'
      });
    }
    
    // Save to storage
    Storage.set('gate2Flag', flag);
    Storage.set('currentGate', '3');
    Storage.set('gate2Passed', 'true');
    Storage.set('gate2CompletedAt', new Date().toISOString());
    
    // Save to database via API
    try {
      const candidateData = Storage.get('candidateData');
      if (candidateData) {
        const parsed = JSON.parse(candidateData);
        const attackerIp = ipMatch?.[1] || '';
        const attackVector = vectorMatch?.[1]?.replace(/_/g, ' ') || '';
        
        await fetch('/api/recruitment/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: parsed.email,
            gate: 2,
            passed: true,
            flag: flag,
            attackerIp,
            attackVector,
            completedAt: new Date().toISOString()
          })
        });
        
        // Send congratulatory email
        await fetch('/api/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: parsed.email,
            template: 'gate2_passed',
            variables: {
              name: parsed.fullName,
              flag,
              attackerIp,
              attackVector,
              position: parsed.position,
            }
          })
        });
      }
    } catch (error) {
      console.error('Failed to save progress or send email:', error);
    }
  };

  const proceedToChallenges = () => {
    router.push('/join-us/challenges');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link 
              href="/join-us/gate-1"
              className="inline-flex items-center gap-2 text-text-muted hover:text-accent-cyan transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Gate 1
            </Link>
            
            <GateProgress currentGate={2} />
          </div>

          {/* Challenge Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 mb-4">
              <FileSearch className="w-4 h-4 text-accent-cyan" />
              <span className="text-sm font-medium text-accent-cyan">Gate 2: Log Analysis Challenge</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">
              Analyze the <span className="text-gradient">Security Incident</span>
            </h1>
            <p className="text-text-muted max-w-2xl mx-auto">
              A security breach has occurred. Analyze the log files to identify the attacker, 
              determine the attack vector, and find the hidden flag. Use grep, awk, and other tools.
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
                <span className="text-xs text-text-muted ml-2 font-mono">analyst@cyberventures:~/gate-2</span>
              </div>
              
              <XTermTerminal 
                gateId={2}
                onFlagFound={handleFlagFound}
                height="450px"
                className="rounded-b-lg"
              />
            </div>

            {/* Success State */}
            {isCompleted && foundFlag && attackerInfo && (
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
                    <h3 className="text-lg font-bold text-success">Incident Analyzed!</h3>
                    <p className="text-text-muted text-sm">You identified the breach</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="glass-card p-3">
                    <span className="text-text-muted text-xs">Attacker IP</span>
                    <p className="text-danger font-mono font-bold">{attackerInfo.ip}</p>
                  </div>
                  <div className="glass-card p-3">
                    <span className="text-text-muted text-xs">Attack Vector</span>
                    <p className="text-warning font-mono font-bold">{attackerInfo.vector}</p>
                  </div>
                </div>

                <div className="bg-success/10 border border-success/30 rounded-lg p-3 mb-4">
                  <span className="text-success font-mono text-sm">Flag: {foundFlag}</span>
                </div>
                
                <button
                  onClick={proceedToChallenges}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  Continue to Challenges
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </button>
              </motion.div>
            )}

            {/* Instructions Card */}
            {!isCompleted && (
              <motion.div 
                className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="glass-card p-4">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-accent-cyan" />
                    Useful Commands
                  </h4>
                  <ul className="space-y-2 text-sm text-text-muted font-mono">
                    <li>grep "Failed" /logs/auth.log</li>
                    <li>grep "SQL" /logs/access.log</li>
                    <li>awk {'{print $1}'} /logs/access.log</li>
                    <li>cat /logs/auth.log | head -10</li>
                  </ul>
                </div>
                <div className="glass-card p-4">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <FileSearch className="w-5 h-5 text-accent-cyan" />
                    What to Find
                  </h4>
                  <ul className="space-y-2 text-sm text-text-muted">
                    <li>✓ Attacker IP address</li>
                    <li>✓ Attack method used</li>
                    <li>✓ Hidden flag location</li>
                    <li>✓ Evidence in both log files</li>
                  </ul>
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
