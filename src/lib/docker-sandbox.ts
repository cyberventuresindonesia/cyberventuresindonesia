/**
 * Docker Sandbox API for Gate 3: Advanced Red Team Challenge
 * 
 * Features:
 * - Ephemeral containers (TTL 2-4 hours)
 * - Mini AD Network simulation
 * - Anti-cheat monitoring
 * - Security hardening
 * - Audit logging
 */

// Docker API Configuration
const DOCKER_API_BASE = process.env.DOCKER_API_URL || 'http://localhost:2375';
const DOCKER_API_VERSION = 'v1.41';

// Container Templates
export interface ContainerTemplate {
  id: string;
  name: string;
  description: string;
  image: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // hours
  objectives: string[];
  flags: string[];
  hints: string[];
}

export const containerTemplates: ContainerTemplate[] = [
  {
    id: 'ubuntu-vuln-web',
    name: 'Vulnerable Web Server',
    description: 'Ubuntu 22.04 with vulnerable web applications (DVWA, Juice Shop)',
    image: 'cyberventures/ubuntu-vuln-web:latest',
    difficulty: 'Beginner',
    duration: 2,
    objectives: [
      'Find and exploit SQL injection vulnerability',
      'Gain initial access via web shell',
      'Escalate to user privileges',
      'Capture the user flag'
    ],
    flags: [
      'CVI{w3b_3xpl01t_101}',
      'CVI{pr1v_3sc4l4t10n}'
    ],
    hints: [
      'Check /var/www/html for web applications',
      'Try SQLMap for automated SQL injection',
      'Look for SUID binaries for privilege escalation'
    ]
  },
  {
    id: 'ad-lab-basic',
    name: 'Basic Active Directory',
    description: 'Windows Server 2019 with Active Directory, vulnerable configuration',
    image: 'cyberventures/ad-lab-basic:latest',
    difficulty: 'Intermediate',
    duration: 4,
    objectives: [
      'Enumerate Active Directory users and groups',
      'Exploit Kerberoasting vulnerability',
      'Perform lateral movement to second machine',
      'Capture domain admin credentials',
      'Find the domain flag'
    ],
    flags: [
      'CVI{k3rb3r0ast_m4st3r}',
      'CVI{l4t3r4l_m0v3m3nt}',
      'CVI{d0m41n_4dm1n_cr0wn}'
    ],
    hints: [
      'Use BloodHound for AD enumeration',
      'Check for AS-REP Roasting (no pre-auth)',
      'Look for cached credentials in memory'
    ]
  },
  {
    id: 'red-team-advanced',
    name: 'Advanced Red Team Lab',
    description: 'Multi-network environment with IDS, SIEM, and hardened systems',
    image: 'cyberventures/red-team-advanced:latest',
    difficulty: 'Advanced',
    duration: 6,
    objectives: [
      'Bypass network segmentation',
      'Evade detection by SIEM',
      'Establish persistence mechanism',
      'Exfiltrate data without triggering alerts',
      'Complete all flags undetected'
    ],
    flags: [
      'CVI{3v4s10n_m4st3r}',
      'CVI{p3rs1st3nc3_k1ng}',
      'CVI{3xf1ltr4t10n_3xp3rt}',
      'CVI{und3t3ct3d_ghost}'
    ],
    hints: [
      'Use encrypted channels (HTTPS, DNS tunneling)',
      'Time your actions to blend with normal traffic',
      'Clean logs after each action'
    ]
  }
];

// Container Instance
export interface ContainerInstance {
  id: string;
  candidateId: string;
  templateId: string;
  containerId?: string; // Docker container ID
  status: 'provisioning' | 'running' | 'stopped' | 'destroyed' | 'violation';
  startedAt: Date;
  expiresAt: Date;
  flagsCaptured: string[];
  commandsExecuted: string[];
  violations: string[];
  ipAddress?: string;
  ports?: Record<string, number>;
}

// Active containers (in-memory, replace with Redis/DB in production)
const activeContainers = new Map<string, ContainerInstance>();

/**
 * Provision a new sandbox container
 */
export async function provisionContainer(
  candidateId: string,
  templateId: string
): Promise<{ success: boolean; container?: ContainerInstance; error?: string }> {
  try {
    const template = containerTemplates.find(t => t.id === templateId);
    if (!template) {
      return { success: false, error: 'Template not found' };
    }

    // Check if candidate already has an active container
    const existing = Array.from(activeContainers.values())
      .find(c => c.candidateId === candidateId && c.status === 'running');
    
    if (existing) {
      return { 
        success: false, 
        error: `You already have an active lab: ${existing.templateId}. Please complete or terminate it first.`
      };
    }

    // In production, call Docker API
    // For now, simulate container creation
    const containerId = `sandbox-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Calculate expiration (TTL based on template)
    const startedAt = new Date();
    const expiresAt = new Date(startedAt.getTime() + template.duration * 60 * 60 * 1000);

    const instance: ContainerInstance = {
      id: containerId,
      candidateId,
      templateId,
      containerId: `docker-${containerId}`,
      status: 'running',
      startedAt,
      expiresAt,
      flagsCaptured: [],
      commandsExecuted: [],
      violations: [],
      ipAddress: `10.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 254) + 1}`,
      ports: {
        'ssh': 2222 + Math.floor(Math.random() * 1000),
        'http': 8080 + Math.floor(Math.random() * 1000),
        'rdp': 3389 + Math.floor(Math.random() * 1000),
      }
    };

    activeContainers.set(containerId, instance);

    // Start TTL timer
    setTimeout(() => {
      destroyContainer(containerId, 'TTL expired');
    }, template.duration * 60 * 60 * 1000);

    console.log(`✅ Container provisioned: ${containerId} for candidate ${candidateId}`);
    
    return { success: true, container: instance };

  } catch (error) {
    console.error('Failed to provision container:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to provision container'
    };
  }
}

/**
 * Get container by ID
 */
export function getContainer(containerId: string): ContainerInstance | null {
  return activeContainers.get(containerId) || null;
}

/**
 * Get container by candidate ID
 */
export function getContainerByCandidate(candidateId: string): ContainerInstance | null {
  return Array.from(activeContainers.values())
    .find(c => c.candidateId === candidateId && c.status === 'running') || null;
}

/**
 * Execute command in container (with monitoring)
 */
export async function executeCommand(
  containerId: string,
  command: string
): Promise<{ success: boolean; output?: string; error?: string; violation?: string }> {
  const container = activeContainers.get(containerId);
  if (!container) {
    return { success: false, error: 'Container not found' };
  }

  if (container.status !== 'running') {
    return { success: false, error: 'Container is not running' };
  }

  // Anti-cheat: Check for forbidden commands
  const violation = checkForViolation(command, container);
  if (violation) {
    container.violations.push(violation);
    container.commandsExecuted.push(`[VIOLATION] ${command}`);
    
    // Auto-destroy on severe violations
    if (violation.includes('CRITICAL')) {
      destroyContainer(containerId, `Critical violation: ${violation}`);
      return { 
        success: false, 
        error: 'LAB TERMINATED: Critical violation detected. You have been disqualified.',
        violation
      };
    }

    return { success: false, error: `Violation detected: ${violation}`, violation };
  }

  // Log command
  container.commandsExecuted.push(command);

  // Simulate command execution
  const output = simulateCommandExecution(command, container);
  
  return { success: true, output };
}

/**
 * Check for forbidden/sabotage commands
 */
function checkForViolation(command: string, container: ContainerInstance): string | null {
  const forbiddenPatterns = [
    { pattern: /rm\s+-rf\s+\/|rm\s+\-rf\s+\//, level: 'CRITICAL', reason: 'Attempted system destruction (rm -rf /)' },
    { pattern: /mkfs\.|dd\s+if=.*of=\/dev\/sd/, level: 'CRITICAL', reason: 'Attempted filesystem destruction' },
    { pattern: /shutdown|reboot|halt|poweroff/, level: 'CRITICAL', reason: 'System shutdown attempt' },
    { pattern: /passwd.*root|passwd.*admin/, level: 'CRITICAL', reason: 'Unauthorized credential modification' },
    { pattern: /userdel|groupdel.*root/, level: 'CRITICAL', reason: 'Attempted to delete system users' },
    { pattern: /curl.*|wget.*\s+(?:[0-9]{1,3}\.){3}[0-9]{1,3}.*\.(?:sh|bin|elf)/, level: 'WARNING', reason: 'Potential malicious download' },
    { pattern: /nc\s+-e|netcat.*-e|bash\s+-i/, level: 'WARNING', reason: 'Reverse shell attempt (use only within lab scope)' },
    { pattern: /chmod\s+777\s+\//, level: 'WARNING', reason: 'Dangerous permission change on root' },
  ];

  for (const check of forbiddenPatterns) {
    if (check.pattern.test(command)) {
      // Log violation
      console.warn(`🚨 VIOLATION: ${check.reason} | Candidate: ${container.candidateId} | Command: ${command}`);
      
      return `[${check.level}] ${check.reason}`;
    }
  }

  return null;
}

/**
 * Simulate command execution (replace with actual Docker exec in production)
 */
function simulateCommandExecution(command: string, container: ContainerInstance): string {
  const template = containerTemplates.find(t => t.id === container.templateId);
  
  // Simulate various command outputs based on template
  const parts = command.trim().split(/\s+/);
  const cmd = parts[0];

  // Check for flag discovery
  if (command.includes('cat') && (command.includes('flag') || command.includes('.flag') || command.includes('FLAG'))) {
    const foundFlag = template?.flags.find(f => command.toLowerCase().includes(f.toLowerCase().split('{')[0].toLowerCase()));
    if (foundFlag && !container.flagsCaptured.includes(foundFlag)) {
      container.flagsCaptured.push(foundFlag);
      return `${foundFlag}\n\n[✓ FLAG CAPTURED!]`;
    }
  }

  // Simulated responses
  const responses: Record<string, string> = {
    'whoami': 'user',
    'id': 'uid=1000(user) gid=1000(user) groups=1000(user)',
    'pwd': '/home/user',
    'ls': 'Desktop  Documents  Downloads  flag.txt  user.txt',
    'ls -la': `total 32
drwxr-xr-x 5 user user 4096 Apr 10 10:00 .
drwxr-xr-x 3 root root 4096 Apr 10 09:00 ..
-rw-r--r-- 1 user user  220 Apr 10 09:00 .bash_logout
-rw-r--r-- 1 user user 3771 Apr 10 09:00 .bashrc
-rw-r--r-- 1 user user  807 Apr 10 09:00 .profile
-rw-r--r-- 1 root root   38 Apr 10 10:00 flag.txt
-rw-r--r-- 1 user user   38 Apr 10 10:00 user.txt`,
    'cat flag.txt': 'CVI{simulated_flag_for_testing}',
    'hostname': `sandbox-${container.id.slice(0, 8)}`,
    'uname -a': 'Linux sandbox 5.15.0 #1 SMP x86_64 GNU/Linux',
    'ifconfig': `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet ${container.ipAddress}  netmask 255.255.255.0`,
    'netstat -tlnp': `Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      1/sshd
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      500/apache2`,
    'ps aux': `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1   8936  3204 ?        Ss   10:00   0:00 /sbin/init
root       500  0.0  0.5  12540  8900 ?        S    10:00   0:00 apache2 -DFOREGROUND
user      1000  0.0  0.2   8532  4100 pts/0    Ss   10:30   0:00 bash`,
    'find / -name "flag*" 2>/dev/null': '/home/user/flag.txt\n/root/root_flag.txt',
    'sudo -l': 'User user may run the following commands on this host:\n    (root) NOPASSWD: /usr/bin/find',
    'help': 'Available commands: whoami, id, pwd, ls, cat, hostname, uname, ifconfig, netstat, ps, find, grep, awk, python3, nc, ssh, sudo, su',
  };

  return responses[cmd] || responses[command] || `${cmd}: command executed successfully`;
}

/**
 * Destroy container
 */
export async function destroyContainer(
  containerId: string,
  reason: string
): Promise<void> {
  const container = activeContainers.get(containerId);
  if (!container) return;

  console.log(`🗑️ Destroying container ${containerId}: ${reason}`);

  // Archive logs before destruction
  await archiveContainerLogs(container);

  // Update status
  container.status = reason.includes('violation') ? 'violation' : 'destroyed';
  
  // Remove from active containers after delay (keep for audit)
  setTimeout(() => {
    activeContainers.delete(containerId);
  }, 60 * 60 * 1000); // Keep for 1 hour
}

/**
 * Archive container logs for audit
 */
async function archiveContainerLogs(container: ContainerInstance): Promise<void> {
  const auditLog = {
    containerId: container.id,
    candidateId: container.candidateId,
    templateId: container.templateId,
    startedAt: container.startedAt,
    endedAt: new Date(),
    duration: Date.now() - container.startedAt.getTime(),
    flagsCaptured: container.flagsCaptured,
    commandsExecuted: container.commandsExecuted,
    violations: container.violations,
    status: container.status,
  };

  // In production, save to ELK Stack / S3 / Database
  console.log('📋 Audit log:', JSON.stringify(auditLog, null, 2));
}

/**
 * Get container stats
 */
export async function getContainerStats(containerId: string): Promise<any> {
  const container = activeContainers.get(containerId);
  if (!container) return null;

  return {
    cpu: Math.random() * 20, // Simulated
    memory: Math.random() * 512, // Simulated MB
    network: {
      rx: Math.floor(Math.random() * 1000),
      tx: Math.floor(Math.random() * 1000),
    },
    uptime: Date.now() - container.startedAt.getTime(),
  };
}

/**
 * List all active containers (admin only)
 */
export function listActiveContainers(): ContainerInstance[] {
  return Array.from(activeContainers.values());
}

/**
 * Clean up expired containers
 */
export function cleanupExpiredContainers(): void {
  const now = new Date();
  for (const [id, container] of activeContainers) {
    if (container.expiresAt < now && container.status === 'running') {
      destroyContainer(id, 'TTL expired - auto cleanup');
    }
  }
}

// Auto-cleanup every 15 minutes
setInterval(cleanupExpiredContainers, 15 * 60 * 1000);

// Export for API routes
export { activeContainers };
