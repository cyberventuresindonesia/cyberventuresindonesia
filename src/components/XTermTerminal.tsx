'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import 'xterm/css/xterm.css';

interface XTermTerminalProps {
  gateId: 1 | 2;
  onFlagFound?: (flag: string) => void;
  onComplete?: () => void;
  height?: string;
  className?: string;
}

export default function XTermTerminal({ 
  gateId, 
  onFlagFound, 
  onComplete,
  height = '400px',
  className = '' 
}: XTermTerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalInstance = useRef<XTerm | null>(null);
  const fitAddon = useRef<FitAddon | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [currentPath, setCurrentPath] = useState('/home/candidate');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const historyIndex = useRef(-1);
  const currentLine = useRef('');

  // Gate 1: Basic Security Challenge - Virtual filesystem
  const fileSystem = useRef({
    '/': {
      type: 'directory',
      content: {
        'home': { type: 'directory', content: {} },
        'etc': { type: 'directory', content: {} },
        'var': { type: 'directory', content: {} },
        'tmp': { type: 'directory', content: {} },
        'robots.txt': { 
          type: 'file', 
          content: 'User-agent: *\nDisallow: /secret-vault/\nDisallow: /admin/\n# Hidden flag location: /secret-vault/.config' 
        }
      }
    },
    '/home': {
      type: 'directory',
      content: {
        'candidate': { type: 'directory', content: {} }
      }
    },
    '/home/candidate': {
      type: 'directory',
      content: {
        'readme.txt': { 
          type: 'file', 
          content: 'Welcome to Cyber Ventures Indonesia Technical Assessment - Gate 1\n\nTask: Find the hidden flag in the system.\nHint: Check robots.txt for clues about hidden directories.\n\nCommands available: ls, cd, cat, pwd, help, clear\n\nFlag format: CVI{...}' 
        },
        'notes.txt': {
          type: 'file',
          content: 'Remember to check all directories, including hidden ones (starting with .)'
        }
      }
    },
    '/secret-vault': {
      type: 'directory',
      content: {
        '.config': {
          type: 'file',
          content: 'Z0ZJezIxbjR0X2QwMHJfdzEzaF90aDNfZjEzaDNkX2YxbDRnIX0='
        }
      }
    },
    '/etc': {
      type: 'directory',
      content: {
        'passwd': {
          type: 'file',
          content: 'root:x:0:0:root:/root:/bin/bash\ncandidate:x:1000:1000:Candidate:/home/candidate:/bin/bash'
        }
      }
    },
    '/var': {
      type: 'directory',
      content: {
        'log': {
          type: 'directory',
          content: {}
        }
      }
    },
    '/tmp': {
      type: 'directory',
      content: {}
    }
  });

  // Gate 2: Log Analysis Challenge
  const gate2FileSystem = useRef({
    '/': {
      type: 'directory',
      content: {
        'home': { type: 'directory', content: {} },
        'logs': { 
          type: 'directory', 
          content: {
            'access.log': {
              type: 'file',
              content: `192.168.1.100 - - [10/Apr/2024:10:15:30 +0700] "GET / HTTP/1.1" 200 1234
192.168.1.101 - - [10/Apr/2024:10:16:45 +0700] "GET /login HTTP/1.1" 200 567
192.168.1.102 - - [10/Apr/2024:10:17:20 +0700] "GET /api/users HTTP/1.1" 200 890
192.168.1.103 - - [10/Apr/2024:10:18:10 +0700] "POST /login HTTP/1.1" 401 42
192.168.1.103 - - [10/Apr/2024:10:18:12 +0700] "POST /login HTTP/1.1" 401 42
192.168.1.103 - - [10/Apr/2024:10:18:15 +0700] "POST /login HTTP/1.1" 401 42
192.168.1.103 - - [10/Apr/2024:10:18:20 +0700] "GET /admin HTTP/1.1" 403 123
192.168.1.103 - - [10/Apr/2024:10:19:00 +0700] "GET /search?q=' OR 1=1-- HTTP/1.1" 200 4567
192.168.1.103 - - [10/Apr/2024:10:19:30 +0700] "GET /api/admin/users HTTP/1.1" 200 2345
192.168.1.103 - - [10/Apr/2024:10:20:00 +0700] "GET /flag.txt HTTP/1.1" 200 89
192.168.1.104 - - [10/Apr/2024:10:25:00 +0700] "GET / HTTP/1.1" 200 1234`
            },
            'auth.log': {
              type: 'file',
              content: `Apr 10 10:15:30 server sshd[1234]: Accepted password for admin from 192.168.1.100 port 54321
Apr 10 10:18:05 server sshd[1235]: Failed password for root from 192.168.1.103 port 54322
Apr 10 10:18:07 server sshd[1236]: Failed password for root from 192.168.1.103 port 54322
Apr 10 10:18:09 server sshd[1237]: Failed password for root from 192.168.1.103 port 54322
Apr 10 10:19:00 server webapp[5678]: SQL Injection attempt from 192.168.1.103: ' OR 1=1--
Apr 10 10:19:30 server webapp[5679]: Unauthorized access to admin panel from 192.168.1.103
Apr 10 10:20:00 server webapp[5680]: Flag accessed by 192.168.1.103`
            }
          }
        },
        'challenge': {
          type: 'directory',
          content: {
            'README.txt': {
              type: 'file',
              content: `Gate 2: Log Analysis Challenge
==============================

A security incident has occurred. An attacker gained unauthorized access to the system.
Your task:
1. Analyze the logs in /logs/ directory
2. Identify the attacker IP address
3. Determine the attack vector used
4. Find the hidden flag

Commands: ls, cd, cat, grep, awk, head, tail, wc, pwd, help
Hints: Look for failed login attempts and suspicious patterns`
            },
            'HINT.txt': {
              type: 'file',
              content: 'Try: grep "Failed" /logs/auth.log | head -5'
            },
            '.flag': {
              type: 'file',
              content: 'CVI{l0g_4n4ly5t_m4st3r_192.168.1.103_sql_injection}'
            }
          }
        }
      }
    },
    '/home': {
      type: 'directory',
      content: {
        'analyst': { type: 'directory', content: {} }
      }
    },
    '/logs': {
      type: 'directory',
      content: {} // Will be populated from root
    }
  });

  const getActiveFileSystem = () => {
    return gateId === 1 ? fileSystem.current : gate2FileSystem.current;
  };

  const resolvePath = (path: string): string => {
    if (path.startsWith('/')) return path;
    if (path === '.') return currentPath;
    if (path === '..') {
      const parts = currentPath.split('/').filter(Boolean);
      parts.pop();
      return '/' + parts.join('/');
    }
    return currentPath === '/' ? `/${path}` : `${currentPath}/${path}`;
  };

  const getFile = (path: string): any => {
    const fs = getActiveFileSystem();
    const parts = path.split('/').filter(Boolean);
    let current: any = fs['/'];
    
    for (const part of parts) {
      if (current.type === 'directory' && current.content[part]) {
        current = current.content[part];
      } else {
        return null;
      }
    }
    return current;
  };

  const getParentDir = (path: string): [any, string] | null => {
    const parts = path.split('/').filter(Boolean);
    const filename = parts.pop() || '';
    const fs = getActiveFileSystem();
    let current: any = fs['/'];
    
    for (const part of parts) {
      if (current.type === 'directory' && current.content[part]) {
        current = current.content[part];
      } else {
        return null;
      }
    }
    return [current, filename];
  };

  const base64Decode = (str: string): string => {
    try {
      return atob(str);
    } catch {
      return 'Invalid base64';
    }
  };

  const checkFlag = (content: string): boolean => {
    const flagMatch = content.match(/CVI\{[^}]+\}/);
    if (flagMatch) {
      onFlagFound?.(flagMatch[0]);
      return true;
    }
    return false;
  };

  const executeCommand = useCallback((command: string): string => {
    const parts = command.trim().split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1);

    switch (cmd) {
      case 'help':
        return `Available commands:
  ls [path]     - List directory contents
  cd <path>     - Change directory
  cat <file>    - Display file contents
  pwd           - Print working directory
  clear         - Clear terminal screen
  grep <pattern> <file> - Search for pattern in file
  awk '<pattern>' <file> - Pattern scanning and processing
  head <file>   - Output first 10 lines
  tail <file>   - Output last 10 lines
  wc <file>     - Count lines, words, characters
  base64 -d     - Decode base64 string
  echo <text>   - Display text
  whoami        - Display current user
  date          - Display current date
  hint          - Show hint for current challenge`;

      case 'ls':
        const lsPath = args[0] ? resolvePath(args[0]) : currentPath;
        const dir = getFile(lsPath);
        if (!dir) return `ls: cannot access '${args[0] || lsPath}': No such file or directory`;
        if (dir.type !== 'directory') return `ls: '${args[0] || lsPath}': Not a directory`;
        
        const entries = Object.entries(dir.content);
        if (entries.length === 0) return '';
        
        return entries.map(([name, item]: [string, any]) => {
          const prefix = item.type === 'directory' ? 'd' : '-';
          const displayName = name.startsWith('.') && !args.includes('-a') && !args.includes('-la') 
            ? null 
            : name;
          return displayName ? `${prefix}rwxr-xr-x candidate candidate ${displayName}` : null;
        }).filter(Boolean).join('\n');

      case 'cd':
        if (args.length === 0 || args[0] === '~') {
          setCurrentPath('/home/candidate');
          return '';
        }
        const cdPath = resolvePath(args[0]);
        const cdDir = getFile(cdPath);
        if (!cdDir) return `cd: ${args[0]}: No such file or directory`;
        if (cdDir.type !== 'directory') return `cd: ${args[0]}: Not a directory`;
        setCurrentPath(cdPath);
        return '';

      case 'cat':
        if (args.length === 0) return 'cat: missing file operand';
        const catPath = resolvePath(args[0]);
        const file = getFile(catPath);
        if (!file) return `cat: ${args[0]}: No such file or directory`;
        if (file.type === 'directory') return `cat: ${args[0]}: Is a directory`;
        
        // Check for flag
        if (checkFlag(file.content)) {
          return `${file.content}\n\n[✓ Flag found!]`;
        }
        return file.content;

      case 'pwd':
        return currentPath;

      case 'clear':
        terminalInstance.current?.clear();
        return '';

      case 'echo':
        return args.join(' ');

      case 'whoami':
        return 'candidate';

      case 'date':
        return new Date().toString();

      case 'grep':
        if (args.length < 2) return 'grep: usage: grep PATTERN FILE';
        const grepPattern = args[0];
        const grepFilePath = resolvePath(args[1]);
        const grepFile = getFile(grepFilePath);
        if (!grepFile) return `grep: ${args[1]}: No such file or directory`;
        if (grepFile.type === 'directory') return `grep: ${args[1]}: Is a directory`;
        
        const lines = grepFile.content.split('\n');
        const matches = lines.filter((line: string) => line.includes(grepPattern.replace(/"/g, '')));
        return matches.length > 0 ? matches.join('\n') : '';

      case 'head':
        if (args.length === 0) return 'head: missing file operand';
        const headPath = resolvePath(args[0]);
        const headFile = getFile(headPath);
        if (!headFile) return `head: ${args[0]}: No such file or directory`;
        if (headFile.type === 'directory') return `head: ${args[0]}: Is a directory`;
        return headFile.content.split('\n').slice(0, 10).join('\n');

      case 'tail':
        if (args.length === 0) return 'tail: missing file operand';
        const tailPath = resolvePath(args[0]);
        const tailFile = getFile(tailPath);
        if (!tailFile) return `tail: ${args[0]}: No such file or directory`;
        if (tailFile.type === 'directory') return `tail: ${args[0]}: Is a directory`;
        const tailLines = tailFile.content.split('\n');
        return tailLines.slice(-10).join('\n');

      case 'wc':
        if (args.length === 0) return 'wc: missing file operand';
        const wcPath = resolvePath(args[0]);
        const wcFile = getFile(wcPath);
        if (!wcFile) return `wc: ${args[0]}: No such file or directory`;
        if (wcFile.type === 'directory') return `wc: ${args[0]}: Is a directory`;
        const content = wcFile.content;
        const lineCount = content.split('\n').length;
        const wordCount = content.split(/\s+/).filter((w: string) => w).length;
        const charCount = content.length;
        return `${lineCount} ${wordCount} ${charCount} ${args[0]}`;

      case 'base64':
        if (args[0] === '-d' && args[1]) {
          const decoded = base64Decode(args[1]);
          if (checkFlag(decoded)) {
            return `${decoded}\n\n[✓ Flag found!]`;
          }
          return decoded;
        }
        return 'base64: usage: base64 -d <string>';

      case 'awk':
        if (args.length < 2) return 'awk: usage: awk PATTERN FILE';
        const awkPattern = args[0].replace(/'/g, '');
        const awkFilePath = resolvePath(args[1]);
        const awkFile = getFile(awkFilePath);
        if (!awkFile) return `awk: ${args[1]}: No such file or directory`;
        if (awkFile.type === 'directory') return `awk: ${args[1]}: Is a directory`;
        
        // Simple awk simulation for {print $1}
        const awkLines = awkFile.content.split('\n');
        if (awkPattern === '{print $1}') {
          return awkLines.map((line: string) => line.split(/\s+/)[0]).join('\n');
        } else if (awkPattern === '{print $9}') {
          return awkLines.map((line: string) => line.split(/\s+/)[8] || '').filter(Boolean).join('\n');
        }
        return awkLines.join('\n');

      case 'hint':
        if (gateId === 1) {
          return 'Hint: Read the robots.txt file to find hidden directories. Then check for hidden files (starting with .)';
        } else {
          return 'Hint: Use grep to find failed login attempts: grep "Failed" /logs/auth.log';
        }

      case '':
        return '';

      default:
        return `${cmd}: command not found. Type 'help' for available commands.`;
    }
  }, [currentPath, gateId, onFlagFound]);

  const prompt = () => {
    return `candidate@cyberventures:${currentPath}$ `;
  };

  useEffect(() => {
    if (!terminalRef.current || terminalInstance.current) return;

    const term = new XTerm({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'JetBrains Mono, monospace',
      theme: {
        background: '#0a0a0f',
        foreground: '#00d4ff',
        cursor: '#00d4ff',
        selectionBackground: '#00d4ff33',
        black: '#0a0a0f',
        brightBlack: '#1a1a2e',
        green: '#00ff88',
        brightGreen: '#00ff88',
        cyan: '#00d4ff',
        brightCyan: '#00d4ff',
      },
      cols: 80,
      rows: 24,
    });

    const fit = new FitAddon();
    term.loadAddon(fit);
    term.loadAddon(new WebLinksAddon());

    term.open(terminalRef.current);
    fit.fit();

    terminalInstance.current = term;
    fitAddon.current = fit;

    // Welcome message
    if (gateId === 1) {
      term.writeln('\x1b[1;36m╔════════════════════════════════════════════════════════╗\x1b[0m');
      term.writeln('\x1b[1;36m║\x1b[0m  \x1b[1;33mCyber Ventures Indonesia\x1b[0m                        \x1b[1;36m║\x1b[0m');
      term.writeln('\x1b[1;36m║\x1b[0m  \x1b[32mTechnical Assessment - Gate 1\x1b[0m                   \x1b[1;36m║\x1b[0m');
      term.writeln('\x1b[1;36m╚════════════════════════════════════════════════════════╝\x1b[0m');
      term.writeln('');
      term.writeln('\x1b[90mType \x1b[32mhelp\x1b[90m for available commands or \x1b[32mcat readme.txt\x1b[90m\x1b[0m');
      term.writeln('');
    } else {
      term.writeln('\x1b[1;36m╔════════════════════════════════════════════════════════╗\x1b[0m');
      term.writeln('\x1b[1;36m║\x1b[0m  \x1b[1;33mCyber Ventures Indonesia\x1b[0m                        \x1b[1;36m║\x1b[0m');
      term.writeln('\x1b[1;36m║\x1b[0m  \x1b[32mLog Analysis Challenge - Gate 2\x1b[0m                 \x1b[1;36m║\x1b[0m');
      term.writeln('\x1b[1;36m╚════════════════════════════════════════════════════════╝\x1b[0m');
      term.writeln('');
      term.writeln('\x1b[90mType \x1b[32mcat /challenge/README.txt\x1b[90m to start\x1b[0m');
      term.writeln('');
    }

    term.write(prompt());

    let inputBuffer = '';

    term.onData((data) => {
      const code = data.charCodeAt(0);

      // Handle Ctrl+C
      if (code === 3) {
        term.write('^C\r\n' + prompt());
        inputBuffer = '';
        return;
      }

      // Handle Ctrl+L (clear)
      if (code === 12) {
        term.clear();
        term.write(prompt());
        return;
      }

      // Handle Enter
      if (code === 13) {
        term.write('\r\n');
        
        if (inputBuffer.trim()) {
          setCommandHistory(prev => [...prev, inputBuffer]);
          historyIndex.current = -1;
          
          const result = executeCommand(inputBuffer);
          if (result) {
            const lines = result.split('\n');
            lines.forEach((line, i) => {
              term.writeln(line);
            });
          }
        }
        
        inputBuffer = '';
        term.write(prompt());
        return;
      }

      // Handle Backspace
      if (code === 127 || code === 8) {
        if (inputBuffer.length > 0) {
          inputBuffer = inputBuffer.slice(0, -1);
          term.write('\b \b');
        }
        return;
      }

      // Handle Up Arrow (history)
      if (data === '\x1b[A') {
        if (commandHistory.length > 0) {
          if (historyIndex.current < commandHistory.length - 1) {
            historyIndex.current++;
          }
          const historyCmd = commandHistory[commandHistory.length - 1 - historyIndex.current];
          // Clear current line
          term.write('\r' + prompt() + ' '.repeat(inputBuffer.length) + '\r' + prompt());
          inputBuffer = historyCmd || '';
          term.write(inputBuffer);
        }
        return;
      }

      // Handle Down Arrow (history)
      if (data === '\x1b[B') {
        if (historyIndex.current > 0) {
          historyIndex.current--;
          const historyCmd = commandHistory[commandHistory.length - 1 - historyIndex.current];
          term.write('\r' + prompt() + ' '.repeat(inputBuffer.length) + '\r' + prompt());
          inputBuffer = historyCmd || '';
          term.write(inputBuffer);
        } else {
          historyIndex.current = -1;
          term.write('\r' + prompt() + ' '.repeat(inputBuffer.length) + '\r' + prompt());
          inputBuffer = '';
        }
        return;
      }

      // Handle regular input
      if (code >= 32 && code < 127) {
        inputBuffer += data;
        term.write(data);
      }
    });

    setIsReady(true);

    // Handle resize
    const handleResize = () => {
      fit.fit();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      term.dispose();
      terminalInstance.current = null;
    };
  }, [gateId, executeCommand, prompt]);

  // Update prompt when path changes
  useEffect(() => {
    if (terminalInstance.current && isReady) {
      // Path changed, next prompt will reflect it
    }
  }, [currentPath, isReady]);

  return (
    <div 
      className={`terminal-container rounded-lg overflow-hidden border border-cyan-500/30 bg-[#0a0a0f] ${className}`}
      style={{ height }}
    >
      <div 
        ref={terminalRef} 
        className="w-full h-full p-4"
        style={{ 
          background: '#0a0a0f',
          fontFamily: 'JetBrains Mono, monospace'
        }}
      />
      
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0f]">
          <div className="flex items-center gap-3 text-cyan-400">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-sm">Initializing terminal...</span>
          </div>
        </div>
      )}
    </div>
  );
}
