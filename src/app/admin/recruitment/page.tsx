'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { 
  Users, 
  Zap, 
  BookOpen, 
  Trophy, 
  Shield, 
  CheckCircle, 
  Search, 
  Filter, 
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Target,
  TrendingUp,
  MoreHorizontal,
  Mail,
  Phone,
  Lock,
  Terminal,
  Award,
  X
} from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  email: string;
  position: string;
  gate: number;
  status: string;
  quizScore?: number;
  challengesSolved: number;
  appliedAt: string;
  phoneNumber?: string;
  telegramUsername?: string;
}

// Chart colors
const CHART_COLORS = {
  indigo: '#6366f1',
  purple: '#8b5cf6',
  cyan: '#06b6d4',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
};

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  IN_PROGRESS: { 
    label: 'Application', 
    color: 'text-accent-indigo', 
    bg: 'bg-accent-indigo/10 border-accent-indigo/30',
    icon: Lock 
  },
  QUIZ_PASSED: { 
    label: 'Quiz Passed', 
    color: 'text-success', 
    bg: 'bg-success/10 border-success/30',
    icon: BookOpen 
  },
  CHALLENGES_PASSED: { 
    label: 'Challenges Done', 
    color: 'text-accent-purple', 
    bg: 'bg-accent-purple/10 border-accent-purple/30',
    icon: Trophy 
  },
  LIVE_DEFENSE_SCHEDULED: { 
    label: 'Live Defense', 
    color: 'text-warning', 
    bg: 'bg-warning/10 border-warning/30',
    icon: Shield 
  },
  COMPLETED: { 
    label: 'Completed', 
    color: 'text-accent-cyan', 
    bg: 'bg-accent-cyan/10 border-accent-cyan/30',
    icon: CheckCircle 
  },
  REJECTED: { 
    label: 'Rejected', 
    color: 'text-danger', 
    bg: 'bg-danger/10 border-danger/30',
    icon: X 
  },
};

export default function RecruitmentDashboard() {
  const [stats, setStats] = useState({
    totalCandidates: 0,
    activeToday: 0,
    quizPasses: 0,
    challengesCompleted: 0,
    liveDefenseScheduled: 0,
    hired: 12,
    avgQuizScore: 0,
    conversionRate: 0,
  });

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  // Mock data for charts
  const pipelineData = [
    { name: 'Gate 0', candidates: 45, label: 'Application' },
    { name: 'Gate 1', candidates: 32, label: 'Tech Quiz' },
    { name: 'Gate 2', candidates: 18, label: 'CTF' },
    { name: 'Gate 3', candidates: 8, label: 'Live Defense' },
    { name: 'Gate 4', candidates: 5, label: 'Approved' },
  ];

  const statusData = [
    { name: 'In Progress', value: 13, color: CHART_COLORS.indigo },
    { name: 'Quiz Passed', value: 8, color: CHART_COLORS.success },
    { name: 'Challenges Done', value: 4, color: CHART_COLORS.purple },
    { name: 'Live Defense', value: 2, color: CHART_COLORS.warning },
    { name: 'Completed', value: 5, color: CHART_COLORS.cyan },
  ];

  const trendData = [
    { day: 'Mon', applications: 5, passes: 2 },
    { day: 'Tue', applications: 8, passes: 3 },
    { day: 'Wed', applications: 12, passes: 5 },
    { day: 'Thu', applications: 6, passes: 2 },
    { day: 'Fri', applications: 9, passes: 4 },
    { day: 'Sat', applications: 15, passes: 6 },
    { day: 'Sun', applications: 7, passes: 3 },
  ];

  // Load real data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const applications = JSON.parse(localStorage.getItem('applications') || '[]');
        const quizResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
        
        const realCandidates: Candidate[] = applications.map((app: any) => {
          const quizResult = quizResults.find((q: any) => 
            q.email === app.email || q.candidateId === app.id
          );
          
          let gate = 1;
          let status = 'IN_PROGRESS';
          let quizScore = 0;
          
          if (quizResult) {
            gate = 2;
            quizScore = quizResult.percentage || 0;
            if (quizResult.passed) {
              status = 'QUIZ_PASSED';
            }
          }
          
          const liveDefense = localStorage.getItem('liveDefenseSchedule');
          if (liveDefense && gate >= 2) {
            gate = 4;
            status = 'LIVE_DEFENSE_SCHEDULED';
          }
          
          return {
            id: app.id || Date.now().toString(),
            name: app.fullName || 'Unknown',
            email: app.email || 'unknown@example.com',
            position: app.position?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Unknown',
            gate,
            status,
            quizScore,
            challengesSolved: Math.floor(Math.random() * 5), // Mock data
            appliedAt: app.createdAt || new Date().toISOString().split('T')[0],
            phoneNumber: app.phoneNumber || app.fullPhoneNumber,
            telegramUsername: app.telegramUsername,
          };
        });
        
        const mockCandidates: Candidate[] = [
          { id: 'mock-1', name: 'Ahmad Rizki', email: 'ahmad@example.com', position: 'Security Analyst', gate: 1, status: 'IN_PROGRESS', quizScore: 0, challengesSolved: 0, appliedAt: '2024-01-20', phoneNumber: '+6281234567890', telegramUsername: 'ahmadrizki' },
          { id: 'mock-2', name: 'Budi Santoso', email: 'budi@example.com', position: 'Penetration Tester', gate: 2, status: 'QUIZ_PASSED', quizScore: 85, challengesSolved: 0, appliedAt: '2024-01-19', phoneNumber: '+6282345678901', telegramUsername: 'budisec' },
          { id: 'mock-3', name: 'Citra Dewi', email: 'citra@example.com', position: 'Security Engineer', gate: 3, status: 'CHALLENGES_PASSED', quizScore: 92, challengesSolved: 4, appliedAt: '2024-01-18', phoneNumber: '+6283456789012', telegramUsername: 'citraw' },
          { id: 'mock-4', name: 'Dedi Kurniawan', email: 'dedi@example.com', position: 'Incident Responder', gate: 4, status: 'LIVE_DEFENSE_SCHEDULED', quizScore: 78, challengesSolved: 3, appliedAt: '2024-01-17', phoneNumber: '+6284567890123', telegramUsername: 'dedikur' },
          { id: 'mock-5', name: 'Eka Pratama', email: 'eka@example.com', position: 'Penetration Tester', gate: 4, status: 'COMPLETED', quizScore: 95, challengesSolved: 5, appliedAt: '2024-01-15', phoneNumber: '+6285678901234', telegramUsername: 'ekapratama' },
        ];
        
        const allCandidates = [...realCandidates, ...mockCandidates];
        setCandidates(allCandidates);
        
        const passedCount = allCandidates.filter(c => (c.quizScore || 0) >= 60).length;
        
        setStats({
          totalCandidates: allCandidates.length,
          activeToday: realCandidates.length,
          quizPasses: passedCount,
          challengesCompleted: allCandidates.filter(c => c.challengesSolved >= 3).length,
          liveDefenseScheduled: allCandidates.filter(c => c.status === 'LIVE_DEFENSE_SCHEDULED').length,
          hired: 12,
          avgQuizScore: passedCount > 0 ? Math.round(allCandidates.reduce((acc, c) => acc + (c.quizScore || 0), 0) / allCandidates.length) : 0,
          conversionRate: allCandidates.length > 0 ? Math.round((passedCount / allCandidates.length) * 100) : 0,
        });
        
      } catch (error) {
        console.error('Error loading admin data:', error);
      }
    };
    
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredCandidates = candidates.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Email', 'Position', 'Gate', 'Status', 'Quiz Score', 'Applied At'].join(','),
      ...candidates.map(c => [
        c.name, c.email, c.position, `Gate ${c.gate}`, c.status, c.quizScore || 0, c.appliedAt
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recruitment-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const StatCard = ({ 
    label, 
    value, 
    change, 
    icon: Icon, 
    trend = 'up' 
  }: { 
    label: string; 
    value: number; 
    change: string; 
    icon: any;
    trend?: 'up' | 'down';
  }) => (
    <motion.div 
      className="relative p-6 rounded-xl bg-bg-elevated/50 border border-border-subtle backdrop-blur-sm overflow-hidden group"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/5 via-transparent to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-lg bg-accent-indigo/10 border border-accent-indigo/30 flex items-center justify-center">
            <Icon className="w-5 h-5 text-accent-indigo" />
          </div>
          <div className={`flex items-center gap-1 text-xs ${trend === 'up' ? 'text-success' : 'text-danger'}`}>
            {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {change}
          </div>
        </div>
        <h3 className="text-2xl font-bold text-foreground font-mono">{value}</h3>
        <p className="text-sm text-text-secondary">{label}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-accent-indigo/10 border border-accent-indigo/30 flex items-center justify-center">
              <Target className="w-5 h-5 text-accent-indigo" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Recruitment Dashboard</h1>
          </div>
          <p className="text-text-secondary">Overview of candidate pipeline and performance metrics</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/candidates">
            <button className="flex items-center gap-2 px-4 py-2 bg-bg-tertiary hover:bg-bg-secondary text-foreground font-medium rounded-lg transition-colors border border-border-default">
              <Users className="w-4 h-4" />
              Manage Candidates
            </button>
          </Link>
          <button 
            onClick={handleExport}
            className="relative group flex items-center gap-2"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-indigo to-accent-purple rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-300" />
            <div className="relative flex items-center gap-2 px-4 py-2 bg-accent-indigo hover:bg-accent-indigo/90 text-white font-medium rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              Export Report
            </div>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Candidates" value={stats.totalCandidates} change="+12%" icon={Users} trend="up" />
        <StatCard label="Quiz Passes" value={stats.quizPasses} change={`${stats.conversionRate}%`} icon={BookOpen} trend="up" />
        <StatCard label="Challenges Done" value={stats.challengesCompleted} change="+23" icon={Trophy} trend="up" />
        <StatCard label="Avg Quiz Score" value={stats.avgQuizScore} change="+5%" icon={TrendingUp} trend="up" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline Funnel */}
        <motion.div 
          className="p-6 rounded-2xl bg-bg-elevated/50 border border-border-subtle backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-accent-indigo" />
            <h3 className="text-lg font-semibold text-foreground">Recruitment Pipeline</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155', 
                    borderRadius: '8px',
                    color: '#f8fafc'
                  }}
                  formatter={(value: any) => [`${value} candidates`, 'Count']}
                  labelFormatter={(label) => `${label} - ${pipelineData.find(d => d.name === label)?.label}`}
                />
                <Bar dataKey="candidates" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Status Distribution */}
        <motion.div 
          className="p-6 rounded-2xl bg-bg-elevated/50 border border-border-subtle backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-accent-purple" />
            <h3 className="text-lg font-semibold text-foreground">Status Distribution</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155', 
                    borderRadius: '8px',
                    color: '#f8fafc'
                  }}
                  formatter={(value: any, name: any) => [`${value} candidates`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-text-secondary">{item.name}</span>
                <span className="text-foreground font-semibold ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Weekly Trend */}
      <motion.div 
        className="p-6 rounded-2xl bg-bg-elevated/50 border border-border-subtle backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-accent-cyan" />
          <h3 className="text-lg font-semibold text-foreground">Weekly Activity</h3>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPasses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155', 
                  borderRadius: '8px',
                  color: '#f8fafc'
                }}
              />
              <Area type="monotone" dataKey="applications" stroke="#6366f1" fillOpacity={1} fill="url(#colorApps)" name="Applications" />
              <Area type="monotone" dataKey="passes" stroke="#10b981" fillOpacity={1} fill="url(#colorPasses)" name="Quiz Passes" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Candidates Section */}
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-bg-tertiary border border-border-default rounded-lg text-foreground placeholder:text-text-muted focus:outline-none focus:border-accent-indigo transition-colors"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 bg-bg-tertiary border border-border-default rounded-lg text-foreground focus:outline-none focus:border-accent-indigo"
          >
            <option value="all">All Status</option>
            <option value="IN_PROGRESS">Application</option>
            <option value="QUIZ_PASSED">Quiz Passed</option>
            <option value="CHALLENGES_PASSED">Challenges Done</option>
            <option value="LIVE_DEFENSE_SCHEDULED">Live Defense</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        {/* Candidates Table */}
        <div className="rounded-2xl bg-bg-elevated/50 border border-border-subtle backdrop-blur-sm overflow-hidden">
          <div className="p-6 border-b border-border-subtle flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-accent-indigo" />
              Recent Candidates ({filteredCandidates.length})
            </h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-accent-indigo/20 text-accent-indigo' : 'text-text-muted hover:text-foreground'}`}
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg-tertiary/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Candidate</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Position</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Applied</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filteredCandidates.map((candidate) => {
                  const statusConfig = STATUS_CONFIG[candidate.status] || STATUS_CONFIG.IN_PROGRESS;
                  const StatusIcon = statusConfig.icon;
                  return (
                    <tr key={candidate.id} className="hover:bg-bg-tertiary/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-accent-indigo/10 border border-accent-indigo/30 flex items-center justify-center">
                            <span className="text-accent-indigo font-semibold">{candidate.name.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground">{candidate.name}</div>
                            <div className="text-sm text-text-muted flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {candidate.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-foreground">{candidate.position}</div>
                        {candidate.telegramUsername && (
                          <div className="text-xs text-text-muted">@{candidate.telegramUsername}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 max-w-[100px] h-2 bg-bg-tertiary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-accent-indigo to-accent-purple rounded-full"
                              style={{ width: `${(candidate.gate / 4) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-text-muted font-mono">Gate {candidate.gate}/4</span>
                        </div>
                        {candidate.quizScore && candidate.quizScore > 0 && (
                          <div className="text-xs text-text-muted mt-1">
                            Quiz: <span className={candidate.quizScore >= 60 ? 'text-success' : 'text-danger'}>{candidate.quizScore}%</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${statusConfig.bg} ${statusConfig.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-text-secondary">{candidate.appliedAt}</div>
                        <div className="text-xs text-text-muted">{Math.floor(Math.random() * 30)} days ago</div>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => setSelectedCandidate(candidate)}
                          className="text-accent-indigo hover:text-accent-purple transition-colors text-sm font-medium"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
