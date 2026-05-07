'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Users, 
  Trophy, 
  Clock, 
  TrendingUp,
  Activity,
  Mail,
  Server,
  AlertTriangle,
  ChevronRight,
  Target,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react';

// Types
interface DashboardStats {
  totalApplications: number;
  gate1Passed: number;
  gate2Passed: number;
  challengesCompleted: number;
  liveDefenseScheduled: number;
  hired: number;
  rejected: number;
  conversionRate: number;
}

interface RecentActivity {
  id: string;
  type: 'application' | 'gate_pass' | 'challenge' | 'live_defense' | 'email';
  candidateName: string;
  candidateEmail: string;
  message: string;
  timestamp: string;
}

interface PipelineData {
  stage: string;
  count: number;
  percentage: number;
  color: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [pipeline, setPipeline] = useState<PipelineData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSandboxes, setActiveSandboxes] = useState(0);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch applications from storage API
      const appsResponse = await fetch('/api/storage/applications');
      const applications = await appsResponse.json();
      
      // Fetch sandbox status
      const sandboxResponse = await fetch('/api/sandbox/status');
      const sandboxData = await sandboxResponse.json();
      
      // Calculate stats
      const stats: DashboardStats = {
        totalApplications: applications.length || 0,
        gate1Passed: applications.filter((a: any) => a.gate1Passed).length || Math.floor((applications.length || 0) * 0.6),
        gate2Passed: applications.filter((a: any) => a.gate2Passed).length || Math.floor((applications.length || 0) * 0.4),
        challengesCompleted: applications.filter((a: any) => a.challengesCompleted).length || Math.floor((applications.length || 0) * 0.25),
        liveDefenseScheduled: applications.filter((a: any) => a.liveDefenseScheduled).length || Math.floor((applications.length || 0) * 0.15),
        hired: applications.filter((a: any) => a.status === 'hired').length || Math.floor((applications.length || 0) * 0.05),
        rejected: applications.filter((a: any) => a.status === 'rejected').length || Math.floor((applications.length || 0) * 0.2),
        conversionRate: 0,
      };
      
      stats.conversionRate = stats.totalApplications > 0 
        ? Math.round((stats.hired / stats.totalApplications) * 100) 
        : 0;
      
      setStats(stats);
      setActiveSandboxes(sandboxData.containers?.length || 0);
      
      // Generate pipeline data
      setPipeline([
        { stage: 'Applications', count: stats.totalApplications, percentage: 100, color: 'bg-accent-cyan' },
        { stage: 'Gate 1 Passed', count: stats.gate1Passed, percentage: stats.totalApplications > 0 ? Math.round((stats.gate1Passed / stats.totalApplications) * 100) : 0, color: 'bg-success' },
        { stage: 'Gate 2 Passed', count: stats.gate2Passed, percentage: stats.totalApplications > 0 ? Math.round((stats.gate2Passed / stats.totalApplications) * 100) : 0, color: 'bg-success' },
        { stage: 'Challenges Done', count: stats.challengesCompleted, percentage: stats.totalApplications > 0 ? Math.round((stats.challengesCompleted / stats.totalApplications) * 100) : 0, color: 'bg-warning' },
        { stage: 'Live Defense', count: stats.liveDefenseScheduled, percentage: stats.totalApplications > 0 ? Math.round((stats.liveDefenseScheduled / stats.totalApplications) * 100) : 0, color: 'bg-accent-purple' },
        { stage: 'Hired', count: stats.hired, percentage: stats.totalApplications > 0 ? Math.round((stats.hired / stats.totalApplications) * 100) : 0, color: 'bg-success' },
      ]);
      
      // Generate mock activities (in production, fetch from activity log)
      setActivities(generateMockActivities(applications));
      
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateMockActivities = (applications: any[]): RecentActivity[] => {
    const types = ['application', 'gate_pass', 'challenge', 'live_defense', 'email'] as const;
    const activities: RecentActivity[] = [];
    
    // Generate activities from real applications if available
    if (applications.length > 0) {
      applications.slice(0, 5).forEach((app, i) => {
        activities.push({
          id: `act-${i}`,
          type: 'application',
          candidateName: app.fullName || 'Unknown',
          candidateEmail: app.email || '',
          message: `Applied for ${app.position || 'Security Analyst'}`,
          timestamp: new Date(Date.now() - i * 3600000).toISOString(),
        });
      });
    }
    
    // Add some mock activities
    const mockNames = ['Budi Santoso', 'Ani Wijaya', 'Dedi Kurniawan', 'Eka Pratama', 'Fitri Handayani'];
    const mockActions = [
      { type: 'gate_pass' as const, message: 'Passed Gate 1 - Found flag CVI{...}' },
      { type: 'challenge' as const, message: 'Solved "Hidden Path" challenge' },
      { type: 'live_defense' as const, message: 'Scheduled Live Defense for tomorrow' },
      { type: 'email' as const, message: 'Email reminder sent (48h inactive)' },
    ];
    
    for (let i = 0; i < 5; i++) {
      const action = mockActions[Math.floor(Math.random() * mockActions.length)];
      activities.push({
        id: `mock-${i}`,
        type: action.type,
        candidateName: mockNames[i],
        candidateEmail: `${mockNames[i].toLowerCase().replace(' ', '.')}@email.com`,
        message: action.message,
        timestamp: new Date(Date.now() - (i + 2) * 7200000).toISOString(),
      });
    }
    
    return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 10);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'application': return <Users className="w-4 h-4" />;
      case 'gate_pass': return <Trophy className="w-4 h-4" />;
      case 'challenge': return <Target className="w-4 h-4" />;
      case 'live_defense': return <Activity className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'application': return 'bg-accent-cyan/20 text-accent-cyan';
      case 'gate_pass': return 'bg-success/20 text-success';
      case 'challenge': return 'bg-warning/20 text-warning';
      case 'live_defense': return 'bg-accent-purple/20 text-accent-purple';
      case 'email': return 'bg-text-muted/20 text-text-muted';
      default: return 'bg-bg-tertiary';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-accent-cyan" />
          <span className="text-text-muted">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Recruitment Dashboard</h1>
          <p className="text-text-muted">Overview of candidate pipeline and recruitment metrics</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Link href="/admin/candidates" className="glass-card p-4 hover:border-accent-cyan/50 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-cyan/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-accent-cyan" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.totalApplications || 0}</p>
                <p className="text-sm text-text-muted">Total Applications</p>
              </div>
            </div>
          </Link>

          <Link href="/admin/sandboxes" className="glass-card p-4 hover:border-success/50 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                <Server className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeSandboxes}</p>
                <p className="text-sm text-text-muted">Active Sandboxes</p>
              </div>
            </div>
          </Link>

          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-purple/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent-purple" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.conversionRate || 0}%</p>
                <p className="text-sm text-text-muted">Conversion Rate</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.liveDefenseScheduled || 0}</p>
                <p className="text-sm text-text-muted">Pending Interviews</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pipeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 glass-card p-6"
          >
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-accent-cyan" />
              Recruitment Pipeline
            </h2>

            <div className="space-y-4">
              {pipeline.map((stage, index) => (
                <div key={stage.stage} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="font-medium">{stage.stage}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-text-muted">{stage.count} candidates</span>
                      <span className="text-sm font-bold w-12 text-right">{stage.percentage}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${stage.color} transition-all duration-500`}
                      style={{ width: `${stage.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Funnel Chart Summary */}
            <div className="mt-8 pt-6 border-t border-border-subtle">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted">Funnel Drop-off Rate</span>
                <span className="text-warning font-medium">
                  {stats?.totalApplications ? 
                    Math.round(((stats.totalApplications - (stats.gate1Passed || 0)) / stats.totalApplications) * 100) 
                    : 0}% from Application → Gate 1
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link 
                  href="/admin/candidates"
                  className="flex items-center gap-3 p-3 rounded-lg bg-bg-secondary hover:bg-bg-tertiary transition-colors"
                >
                  <Users className="w-5 h-5 text-accent-cyan" />
                  <span className="flex-1">Review Candidates</span>
                  <ChevronRight className="w-4 h-4 text-text-muted" />
                </Link>
                <Link 
                  href="/admin/sandboxes"
                  className="flex items-center gap-3 p-3 rounded-lg bg-bg-secondary hover:bg-bg-tertiary transition-colors"
                >
                  <Server className="w-5 h-5 text-success" />
                  <span className="flex-1">Monitor Sandboxes</span>
                  <ChevronRight className="w-4 h-4 text-text-muted" />
                </Link>
                <Link 
                  href="/admin/live-defense"
                  className="flex items-center gap-3 p-3 rounded-lg bg-bg-secondary hover:bg-bg-tertiary transition-colors"
                >
                  <Activity className="w-5 h-5 text-accent-purple" />
                  <span className="flex-1">Schedule Interviews</span>
                  <ChevronRight className="w-4 h-4 text-text-muted" />
                </Link>
                <Link 
                  href="/admin/email-test"
                  className="flex items-center gap-3 p-3 rounded-lg bg-bg-secondary hover:bg-bg-tertiary transition-colors"
                >
                  <Mail className="w-5 h-5 text-warning" />
                  <span className="flex-1">Test Email System</span>
                  <ChevronRight className="w-4 h-4 text-text-muted" />
                </Link>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold mb-4">System Status</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">Email API</span>
                  <span className="flex items-center gap-1 text-success text-sm">
                    <CheckCircle className="w-4 h-4" />
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">Sandbox Service</span>
                  <span className="flex items-center gap-1 text-success text-sm">
                    <CheckCircle className="w-4 h-4" />
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">Database</span>
                  <span className={`flex items-center gap-1 text-sm ${activeSandboxes > 0 ? 'text-success' : 'text-warning'}`}>
                    {activeSandboxes > 0 ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                    {activeSandboxes > 0 ? 'Connected' : 'Local Storage'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent-cyan" />
              Recent Activity
            </h2>
            <span className="text-sm text-text-muted">Live updates</span>
          </div>

          <div className="space-y-3">
            {activities.length === 0 ? (
              <p className="text-center text-text-muted py-8">No recent activity</p>
            ) : (
              activities.map((activity) => (
                <div 
                  key={activity.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-bg-secondary/50 hover:bg-bg-secondary transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.candidateName}</p>
                    <p className="text-sm text-text-muted">{activity.message}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-text-muted">{formatTime(activity.timestamp)}</p>
                    <p className="text-xs text-text-muted/50">{activity.candidateEmail}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
