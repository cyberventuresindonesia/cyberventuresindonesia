'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GateProgress from '@/components/GateProgress';
import { Storage } from '@/lib/storage';
import { 
  ArrowLeft, 
  Trophy, 
  Lock, 
  CheckCircle, 
  Terminal, 
  Server, 
  Clock,
  AlertTriangle,
  Shield,
  Play,
  RotateCcw,
  Flag,
  Activity
} from 'lucide-react';

// Dynamic import XTermTerminal
const XTermTerminal = dynamic(() => import('@/components/XTermTerminal'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] flex items-center justify-center bg-[#0a0a0f] rounded-b-lg">
      <div className="flex items-center gap-3 text-cyan-400">
        <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
        <span className="font-mono text-sm">Loading sandbox terminal...</span>
      </div>
    </div>
  ),
});

// Sandbox Terminal Component (connects to Docker API)
function SandboxTerminal({ 
  containerId, 
  onFlagFound 
}: { 
  containerId: string; 
  onFlagFound: (flag: string) => void;
}) {
  const candidateData = Storage.get('candidateData');
  const candidate = candidateData ? JSON.parse(candidateData) : null;

  const executeSandboxCommand = useCallback(async (command: string): Promise<string> => {
    if (!candidate?.email) {
      return 'Error: Not authenticated';
    }

    try {
      const response = await fetch('/api/sandbox/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateId: candidate.email,
          command
        })
      });

      const result = await response.json();

      if (result.violation) {
        return `\x1b[31m🚨 ${result.error}\x1b[0m`;
      }

      if (result.error) {
        return `\x1b[31mError: ${result.error}\x1b[0m`;
      }

      // Check if flag was found
      const flagMatch = result.output?.match(/CVI\{[^}]+\}/);
      if (flagMatch && !result.output.includes('Already captured')) {
        onFlagFound(flagMatch[0]);
      }

      return result.output || 'Command executed';
    } catch (error) {
      return `\x1b[31mConnection error. Please refresh.\x1b[0m`;
    }
  }, [candidate, onFlagFound]);

  // Custom terminal that uses sandbox API
  return (
    <div className="h-[500px] bg-[#0a0a0f] rounded-b-lg overflow-hidden">
      <SandboxTerminalInner 
        executeCommand={executeSandboxCommand}
        containerId={containerId}
      />
    </div>
  );
}

// Inner terminal component
function SandboxTerminalInner({ 
  executeCommand, 
  containerId 
}: { 
  executeCommand: (cmd: string) => Promise<string>;
  containerId: string;
}) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [terminal, setTerminal] = useState<any>(null);

  useEffect(() => {
    if (!terminalRef.current || terminal) return;

    // Load xterm dynamically
    import('xterm').then(({ Terminal }) => {
      import('xterm-addon-fit').then(({ FitAddon }) => {
        const term = new Terminal({
          cursorBlink: true,
          fontSize: 14,
          fontFamily: 'JetBrains Mono, monospace',
          theme: {
            background: '#0a0a0f',
            foreground: '#00ff88',
            cursor: '#00ff88',
            selectionBackground: '#00ff8833',
            black: '#0a0a0f',
            brightBlack: '#1a1a2e',
            green: '#00ff88',
            brightGreen: '#00ff88',
            red: '#ff4444',
            brightRed: '#ff6666',
          },
          cols: 80,
          rows: 24,
        });

        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);

        term.open(terminalRef.current!);
        fitAddon.fit();

        // Welcome message
        term.writeln('\x1b[1;32m╔════════════════════════════════════════════════════════╗\x1b[0m');
        term.writeln('\x1b[1;32m║\x1b[0m  \x1b[1;31m🔥 ADVANCED RED TEAM LAB - GATE 3\x1b[0m                  \x1b[1;32m║\x1b[0m');
        term.writeln('\x1b[1;32m║\x1b[0m  \x1b[90mSandbox ID: ' + containerId.slice(0, 16) + '\x1b[0m                 \x1b[1;32m║\x1b[0m');
        term.writeln('\x1b[1;32m╚════════════════════════════════════════════════════════╝\x1b[0m');
        term.writeln('');
        term.writeln('\x1b[33m⚠️  WARNING: This is a monitored environment.\x1b[0m');
        term.writeln('\x1b[33m    Any attempt to sabotage the lab will result in immediate termination.\x1b[0m');
        term.writeln('');
        term.writeln('\x1b[90mType \x1b[32mhelp\x1b[90m for available commands.\x1b[0m');
        term.writeln('');

        let inputBuffer = '';
        const prompt = () => `\x1b[32mroot@sandbox:\x1b[0m~# `;

        term.write(prompt());

        term.onData((data: string) => {
          const code = data.charCodeAt(0);

          if (code === 13) { // Enter
            term.write('\r\n');
            if (inputBuffer.trim()) {
              executeCommand(inputBuffer).then(output => {
                if (output) {
                  output.split('\n').forEach((line: string) => {
                    term.writeln(line);
                  });
                }
                term.write(prompt());
              });
            } else {
              term.write(prompt());
            }
            inputBuffer = '';
          } else if (code === 127 || code === 8) { // Backspace
            if (inputBuffer.length > 0) {
              inputBuffer = inputBuffer.slice(0, -1);
              term.write('\b \b');
            }
          } else if (code >= 32 && code < 127) {
            inputBuffer += data;
            term.write(data);
          }
        });

        setTerminal(term);

        // Handle resize
        const handleResize = () => fitAddon.fit();
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
          term.dispose();
        };
      });
    });
  }, [containerId, executeCommand]);

  return <div ref={terminalRef} className="w-full h-full p-4" />;
}

// Add missing import
import { useRef } from 'react';

export default function Gate3Page() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [container, setContainer] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [flags, setFlags] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showRules, setShowRules] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  // Check access
  useEffect(() => {
    const currentGate = Storage.get('currentGate');
    const gate2Passed = Storage.get('gate2Passed');
    
    if (currentGate !== '3' && gate2Passed !== 'true') {
      router.push('/join-us/gate-2');
      return;
    }

    // Check if already has active container
    checkExistingContainer();
  }, [router]);

  // Timer countdown
  useEffect(() => {
    if (!container?.expiresAt) return;

    const interval = setInterval(() => {
      const remaining = new Date(container.expiresAt).getTime() - Date.now();
      setTimeRemaining(Math.max(0, remaining));
    }, 1000);

    return () => clearInterval(interval);
  }, [container]);

  const checkExistingContainer = async () => {
    const candidateData = Storage.get('candidateData');
    if (!candidateData) return;

    const candidate = JSON.parse(candidateData);
    
    try {
      const response = await fetch(`/api/sandbox/status?candidateId=${candidate.email}`);
      const result = await response.json();

      if (result.hasActiveContainer) {
        setContainer(result.container);
        setFlags(result.container.flagsCaptured);
        setShowRules(false);
      }
    } catch (error) {
      console.error('Failed to check container status:', error);
    }
  };

  const provisionLab = async () => {
    if (!selectedTemplate) return;

    setLoading(true);
    const candidateData = Storage.get('candidateData');
    if (!candidateData) {
      setLoading(false);
      return;
    }

    const candidate = JSON.parse(candidateData);

    try {
      const response = await fetch('/api/sandbox/provision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateId: candidate.email,
          templateId: selectedTemplate
        })
      });

      const result = await response.json();

      if (result.success) {
        setContainer(result.container);
        setShowRules(false);
        // Send email notification
        await fetch('/api/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: candidate.email,
            template: 'challenges_completed', // Using this as lab started notification
            variables: {
              name: candidate.fullName,
              labName: result.template.name,
              duration: result.template.duration,
            }
          })
        });
      } else {
        alert(result.error || 'Failed to provision lab');
      }
    } catch (error) {
      console.error('Failed to provision:', error);
      alert('Failed to start lab. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFlagFound = (flag: string) => {
    if (!flags.includes(flag)) {
      setFlags(prev => [...prev, flag]);
      
      // Check if all flags captured
      if (flags.length + 1 >= 2) { // Assuming at least 2 flags needed
        setIsCompleted(true);
        Storage.set('gate3Passed', 'true');
        Storage.set('currentGate', '4');
      }
    }
  };

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const templates = [
    {
      id: 'ubuntu-vuln-web',
      name: 'Vulnerable Web Server',
      difficulty: 'Beginner',
      duration: 2,
      description: 'Ubuntu with DVWA and vulnerable web apps. Perfect for beginners.',
      color: 'green'
    },
    {
      id: 'ad-lab-basic',
      name: 'Basic Active Directory',
      difficulty: 'Intermediate',
      duration: 4,
      description: 'Windows AD environment with Kerberoasting and lateral movement.',
      color: 'yellow'
    },
    {
      id: 'red-team-advanced',
      name: 'Advanced Red Team',
      difficulty: 'Advanced',
      duration: 6,
      description: 'Multi-network with IDS/SIEM. Evasion and stealth required.',
      color: 'red'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link 
              href="/join-us/challenges"
              className="inline-flex items-center gap-2 text-text-muted hover:text-accent-cyan transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Challenges
            </Link>
            
            <GateProgress currentGate={3} />
          </div>

          {/* Challenge Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-danger/10 border border-danger/30 mb-4">
              <Server className="w-4 h-4 text-danger" />
              <span className="text-sm font-medium text-danger">Gate 3: Advanced Red Team Lab</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">
              Sandbox <span className="text-gradient">Penetration Testing</span>
            </h1>
            <p className="text-text-muted max-w-2xl mx-auto">
              Enter a real isolated environment. Exploit vulnerabilities, escalate privileges, 
              and capture flags. All actions are monitored and logged.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {showRules ? (
              <motion.div
                key="rules"
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Rules & Template Selection */}
                <div className="glass-card p-6 mb-6 border-danger/30">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-danger" />
                    <h2 className="text-xl font-bold">Lab Rules - READ CAREFULLY</h2>
                  </div>
                  
                  <div className="space-y-3 text-sm mb-6">
                    <p className="text-danger font-medium">
                      By starting this challenge, you agree to the following:
                    </p>
                    <ul className="space-y-2 text-text-muted">
                      <li>⚠️ Any attempt to sabotage the lab (rm -rf /, changing credentials, deleting flags) = <strong className="text-danger">DISQUALIFICATION</strong></li>
                      <li>⏱️ Labs have TTL (2-6 hours) and auto-destroy when expired</li>
                      <li>👁️ All commands are logged and monitored for audit</li>
                      <li>🎯 Find and capture all flags to complete the challenge</li>
                      <li>🚫 No collaboration or sharing solutions with other candidates</li>
                    </ul>
                  </div>

                  {/* Template Selection */}
                  <h3 className="font-medium mb-4">Select Lab Environment:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {templates.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setSelectedTemplate(t.id)}
                        className={`p-4 rounded-lg border text-left transition-all ${
                          selectedTemplate === t.id
                            ? 'border-accent-cyan bg-accent-cyan/10'
                            : 'border-border-subtle hover:border-accent-cyan/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{t.name}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            t.difficulty === 'Beginner' ? 'bg-success/20 text-success' :
                            t.difficulty === 'Intermediate' ? 'bg-warning/20 text-warning' :
                            'bg-danger/20 text-danger'
                          }`}>
                            {t.difficulty}
                          </span>
                        </div>
                        <p className="text-sm text-text-muted mb-2">{t.description}</p>
                        <div className="flex items-center gap-2 text-xs text-text-muted">
                          <Clock className="w-3 h-3" />
                          {t.duration} hours
                        </div>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={provisionLab}
                    disabled={!selectedTemplate || loading}
                    className="w-full btn-primary flex items-center justify-center gap-2 py-4"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Provisioning Lab...
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" />
                        I Understand - Start Lab
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="terminal"
                className="max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Lab Status Bar */}
                <div className="glass-card p-4 mb-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Server className="w-5 h-5 text-success" />
                      <span className="text-sm">Lab Running</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <Clock className="w-4 h-4" />
                      Time Remaining: 
                      <span className={timeRemaining < 300000 ? 'text-danger font-bold' : 'text-accent-cyan'}>
                        {formatTime(timeRemaining)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Flag className="w-5 h-5 text-warning" />
                      <span className="text-sm">Flags: {flags.length}/3</span>
                    </div>
                    <button
                      onClick={checkExistingContainer}
                      className="btn-secondary text-sm flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Refresh
                    </button>
                  </div>
                </div>

                {/* Terminal */}
                <div className="glass-card p-1 rounded-xl mb-6">
                  <div className="flex items-center gap-2 px-4 py-2 bg-bg-secondary/50 rounded-t-lg border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-xs text-text-muted ml-2 font-mono">
                      {container?.ipAddress || '10.x.x.x'} | SSH Port: {container?.ports?.ssh || '22'}
                    </span>
                  </div>
                  
                  {container && (
                    <SandboxTerminal 
                      containerId={container.id}
                      onFlagFound={handleFlagFound}
                    />
                  )}
                </div>

                {/* Success State */}
                {isCompleted && (
                  <motion.div 
                    className="glass-card p-6 border-success/30 mb-6"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-success" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-success">All Flags Captured!</h3>
                        <p className="text-text-muted text-sm">You have mastered the Red Team Lab</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {flags.map((flag, i) => (
                        <div key={i} className="bg-success/10 border border-success/30 rounded p-2">
                          <code className="text-xs text-success">{flag}</code>
                        </div>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => router.push('/join-us/live-defense')}
                      className="w-full btn-primary flex items-center justify-center gap-2"
                    >
                      Schedule Live Defense
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </button>
                  </motion.div>
                )}

                {/* Hints */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="glass-card p-4">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-accent-cyan" />
                      Penetration Testing Methodology
                    </h4>
                    <ul className="space-y-2 text-sm text-text-muted">
                      <li>1. Enumeration - Discover services and vulnerabilities</li>
                      <li>2. Exploitation - Gain initial access</li>
                      <li>3. Post-Exploitation - Escalate privileges</li>
                      <li>4. Capture - Find and read flags</li>
                    </ul>
                  </div>
                  <div className="glass-card p-4">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-accent-cyan" />
                      Common Commands
                    </h4>
                    <div className="space-y-1 text-sm text-text-muted font-mono">
                      <p>nmap -sC -sV target</p>
                      <p>gobuster dir -u http://target</p>
                      <p>python3 -c 'import pty; pty.spawn("/bin/bash")'</p>
                      <p>find / -perm -4000 2&gt;/dev/null</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
