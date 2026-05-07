'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trash2, 
  Archive, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Play,
  Eye,
  Settings,
  History,
  Database,
  FileText,
  Shield,
  ChevronDown,
  ChevronUp,
  Loader2,
  X
} from 'lucide-react';

interface RetentionPolicy {
  rejectedCandidatesDays: number;
  cvFilesDays: number;
  inactiveApplicationsDays: number;
  challengeLogsDays: number;
  emailLogsDays: number;
  autoCleanupEnabled: boolean;
  cleanupSchedule: string;
}

interface CleanupPreview {
  rejectedCandidates: number;
  inactiveApplications: number;
  oldCVFiles: number;
  challengeLogs: number;
  emailLogs: number;
  hiredToArchive: number;
}

interface CleanupJob {
  id: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  startedAt: string;
  completedAt?: string;
  deletedCandidates: number;
  deletedFiles: number;
  archivedCandidates: number;
  errors: string[];
}

export default function DataRetentionPage() {
  const [policy, setPolicy] = useState<RetentionPolicy | null>(null);
  const [preview, setPreview] = useState<CleanupPreview | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cleanupStatus, setCleanupStatus] = useState<CleanupJob | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cleanupRunning, setCleanupRunning] = useState(false);
  const [history, setHistory] = useState<CleanupJob[]>([]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchCleanupStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      // Fetch policy and preview
      const response = await fetch('/api/retention/policy');
      const data = await response.json();
      setPolicy(data.policy);
      setPreview(data.preview);
      
      // Fetch cleanup status
      fetchCleanupStatus();
    } catch (error) {
      console.error('Failed to fetch retention data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCleanupStatus = async () => {
    try {
      const response = await fetch('/api/retention/cleanup');
      const data = await response.json();
      
      if (data.current) {
        setCleanupStatus(data.current);
        setCleanupRunning(true);
      } else if (data.last) {
        setCleanupStatus(data.last);
        setCleanupRunning(false);
        
        // Add to history if not already there
        setHistory(prev => {
          const exists = prev.find(h => h.id === data.last.id);
          if (exists) return prev;
          return [data.last, ...prev].slice(0, 10);
        });
      }
    } catch (error) {
      console.error('Failed to fetch cleanup status:', error);
    }
  };

  const updatePolicy = async () => {
    if (!policy) return;
    
    setSaving(true);
    try {
      const response = await fetch('/api/retention/policy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(policy)
      });
      
      if (response.ok) {
        alert('Policy saved successfully');
        setShowSettings(false);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save policy');
      }
    } catch (error) {
      alert('Failed to save policy');
    } finally {
      setSaving(false);
    }
  };

  const runCleanup = async (dryRun = false) => {
    if (!dryRun && !confirm('Are you sure you want to run cleanup? This will permanently delete data.')) {
      return;
    }
    
    setCleanupRunning(true);
    try {
      const response = await fetch('/api/retention/cleanup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dryRun })
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert(dryRun ? 'Dry run completed. Check console for preview.' : 'Cleanup job started. Check status below.');
        fetchCleanupStatus();
      } else {
        alert(data.error || 'Failed to start cleanup');
      }
    } catch (error) {
      alert('Failed to start cleanup');
    }
  };

  const refreshPreview = async () => {
    try {
      const response = await fetch('/api/retention/preview');
      const data = await response.json();
      setPreview(data.preview);
    } catch (error) {
      console.error('Failed to refresh preview:', error);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('id-ID');
  };

  const formatDuration = (days: number) => {
    if (days >= 365) return `${Math.floor(days / 365)} years`;
    if (days >= 30) return `${Math.floor(days / 30)} months`;
    return `${days} days`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-accent-cyan" />
          <span className="text-text-muted">Loading retention settings...</span>
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
          <h1 className="text-3xl font-bold mb-2">Data Retention & Compliance</h1>
          <p className="text-text-muted">
            Manage data retention policies and cleanup in accordance with UU PDP regulations
          </p>
        </motion.div>

        {/* Compliance Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4 mb-8 border-accent-cyan/30 bg-accent-cyan/5"
        >
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-accent-cyan flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium mb-1">UU PDP Compliance (Indonesia Data Protection Law)</h3>
              <p className="text-sm text-text-muted">
                Automatic data retention ensures compliance with Indonesian data protection regulations.
                Rejected candidates: 6 months • CV Files: 12 months • Right to deletion supported
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-danger/20 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-danger" />
              </div>
              <div>
                <p className="text-2xl font-bold">{preview?.rejectedCandidates || 0}</p>
                <p className="text-sm text-text-muted">To Delete (Rejected)</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{preview?.inactiveApplications || 0}</p>
                <p className="text-sm text-text-muted">Inactive (30d+)</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-purple/20 flex items-center justify-center">
                <Archive className="w-5 h-5 text-accent-purple" />
              </div>
              <div>
                <p className="text-2xl font-bold">{preview?.hiredToArchive || 0}</p>
                <p className="text-sm text-text-muted">To Archive (Hired)</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{preview?.oldCVFiles || 0}</p>
                <p className="text-sm text-text-muted">Old CV Files</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Actions & Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Cleanup Actions */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Play className="w-5 h-5 text-accent-cyan" />
                Cleanup Actions
              </h2>
              
              <div className="space-y-3">
                <button
                  onClick={() => setShowPreview(true)}
                  className="w-full btn-secondary flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Preview Cleanup
                </button>
                
                <button
                  onClick={() => runCleanup(true)}
                  disabled={cleanupRunning}
                  className="w-full btn-secondary flex items-center justify-center gap-2"
                >
                  <Database className="w-4 h-4" />
                  Dry Run
                </button>
                
                <button
                  onClick={() => runCleanup(false)}
                  disabled={cleanupRunning}
                  className="w-full btn-primary flex items-center justify-center gap-2 bg-danger hover:bg-danger/90"
                >
                  {cleanupRunning ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                  {cleanupRunning ? 'Running...' : 'Run Cleanup Now'}
                </button>
              </div>

              {cleanupStatus && (
                <div className={`mt-4 p-3 rounded-lg ${
                  cleanupStatus.status === 'running' ? 'bg-warning/10 border border-warning/30' :
                  cleanupStatus.status === 'completed' ? 'bg-success/10 border border-success/30' :
                  'bg-danger/10 border border-danger/30'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {cleanupStatus.status === 'running' && <Loader2 className="w-4 h-4 animate-spin text-warning" />}
                    {cleanupStatus.status === 'completed' && <CheckCircle className="w-4 h-4 text-success" />}
                    {cleanupStatus.status === 'failed' && <AlertTriangle className="w-4 h-4 text-danger" />}
                    <span className={`text-sm font-medium ${
                      cleanupStatus.status === 'running' ? 'text-warning' :
                      cleanupStatus.status === 'completed' ? 'text-success' :
                      'text-danger'
                    }`}>
                      Status: {cleanupStatus.status.toUpperCase()}
                    </span>
                  </div>
                  
                  {cleanupStatus.status === 'completed' && (
                    <div className="text-xs space-y-1 text-text-muted">
                      <p>Deleted: {cleanupStatus.deletedCandidates} candidates, {cleanupStatus.deletedFiles} files</p>
                      <p>Archived: {cleanupStatus.archivedCandidates} hired</p>
                      {cleanupStatus.errors.length > 0 && (
                        <p className="text-danger">Errors: {cleanupStatus.errors.length}</p>
                      )}
                    </div>
                  )}
                  
                  <p className="text-xs text-text-muted mt-2">
                    {cleanupStatus.status === 'running' ? 'Started: ' : 'Completed: '}
                    {formatDate(cleanupStatus.startedAt)}
                  </p>
                </div>
              )}
            </div>

            {/* Policy Settings */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Settings className="w-5 h-5 text-accent-cyan" />
                  Retention Policy
                </h2>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-text-muted hover:text-white"
                >
                  {showSettings ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>
              
              {!showSettings ? (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Rejected Candidates</span>
                    <span>{formatDuration(policy?.rejectedCandidatesDays || 180)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">CV Files</span>
                    <span>{formatDuration(policy?.cvFilesDays || 365)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Inactive Apps</span>
                    <span>{formatDuration(policy?.inactiveApplicationsDays || 30)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Auto Cleanup</span>
                    <span className={policy?.autoCleanupEnabled ? 'text-success' : 'text-danger'}>
                      {policy?.autoCleanupEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-text-muted mb-1">Rejected Candidates (days)</label>
                    <input
                      type="number"
                      value={policy?.rejectedCandidatesDays || 180}
                      onChange={(e) => setPolicy(p => p ? { ...p, rejectedCandidatesDays: parseInt(e.target.value) } : null)}
                      className="w-full px-3 py-2 bg-bg-secondary border border-border-subtle rounded"
                      min="30"
                      max="365"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-text-muted mb-1">CV Files (days)</label>
                    <input
                      type="number"
                      value={policy?.cvFilesDays || 365}
                      onChange={(e) => setPolicy(p => p ? { ...p, cvFilesDays: parseInt(e.target.value) } : null)}
                      className="w-full px-3 py-2 bg-bg-secondary border border-border-subtle rounded"
                      min="90"
                      max="730"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-text-muted mb-1">Inactive Applications (days)</label>
                    <input
                      type="number"
                      value={policy?.inactiveApplicationsDays || 30}
                      onChange={(e) => setPolicy(p => p ? { ...p, inactiveApplicationsDays: parseInt(e.target.value) } : null)}
                      className="w-full px-3 py-2 bg-bg-secondary border border-border-subtle rounded"
                      min="7"
                      max="90"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="autoCleanup"
                      checked={policy?.autoCleanupEnabled || false}
                      onChange={(e) => setPolicy(p => p ? { ...p, autoCleanupEnabled: e.target.checked } : null)}
                      className="w-4 h-4"
                    />
                    <label htmlFor="autoCleanup" className="text-sm">Enable automatic cleanup</label>
                  </div>
                  
                  <button
                    onClick={updatePolicy}
                    disabled={saving}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                    {saving ? 'Saving...' : 'Save Policy'}
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column - Preview & History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Preview Modal */}
            {showPreview && preview && (
              <div className="glass-card p-6 border-accent-cyan/30">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <Eye className="w-5 h-5 text-accent-cyan" />
                    Cleanup Preview
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={refreshPreview}
                      className="p-2 rounded hover:bg-bg-tertiary"
                    >
                      <Clock className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setShowPreview(false)}
                      className="p-2 rounded hover:bg-bg-tertiary"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-bg-secondary/50 rounded-lg border border-danger/30">
                    <p className="text-2xl font-bold text-danger">{preview.rejectedCandidates}</p>
                    <p className="text-sm text-text-muted">Rejected to Delete</p>
                  </div>
                  <div className="p-4 bg-bg-secondary/50 rounded-lg border border-warning/30">
                    <p className="text-2xl font-bold text-warning">{preview.inactiveApplications}</p>
                    <p className="text-sm text-text-muted">Inactive to Delete</p>
                  </div>
                  <div className="p-4 bg-bg-secondary/50 rounded-lg border border-accent-purple/30">
                    <p className="text-2xl font-bold text-accent-purple">{preview.hiredToArchive}</p>
                    <p className="text-sm text-text-muted">Hired to Archive</p>
                  </div>
                  <div className="p-4 bg-bg-secondary/50 rounded-lg border border-text-muted/30">
                    <p className="text-2xl font-bold">{preview.oldCVFiles}</p>
                    <p className="text-sm text-text-muted">Old CV Files</p>
                  </div>
                  <div className="p-4 bg-bg-secondary/50 rounded-lg border border-text-muted/30">
                    <p className="text-2xl font-bold">{preview.challengeLogs}</p>
                    <p className="text-sm text-text-muted">Challenge Logs</p>
                  </div>
                  <div className="p-4 bg-bg-secondary/50 rounded-lg border border-text-muted/30">
                    <p className="text-2xl font-bold">{preview.emailLogs}</p>
                    <p className="text-sm text-text-muted">Email Logs</p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-warning/10 border border-warning/30 rounded-lg">
                  <p className="text-sm text-warning">
                    <AlertTriangle className="w-4 h-4 inline mr-2" />
                    This is a preview. No data has been deleted yet.
                  </p>
                </div>
              </div>
            )}

            {/* Cleanup History */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <History className="w-5 h-5 text-accent-cyan" />
                Cleanup History
              </h2>

              {history.length === 0 ? (
                <p className="text-center text-text-muted py-8">No cleanup jobs yet</p>
              ) : (
                <div className="space-y-3">
                  {history.map((job) => (
                    <div key={job.id} className="p-4 bg-bg-secondary/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {job.status === 'completed' ? (
                            <CheckCircle className="w-4 h-4 text-success" />
                          ) : job.status === 'failed' ? (
                            <AlertTriangle className="w-4 h-4 text-danger" />
                          ) : (
                            <Clock className="w-4 h-4 text-warning" />
                          )}
                          <span className="font-medium">{job.id.slice(0, 8)}...</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          job.status === 'completed' ? 'bg-success/20 text-success' :
                          job.status === 'failed' ? 'bg-danger/20 text-danger' :
                          'bg-warning/20 text-warning'
                        }`}>
                          {job.status}
                        </span>
                      </div>
                      <div className="text-sm text-text-muted space-y-1">
                        <p>Deleted: {job.deletedCandidates} candidates, {job.deletedFiles} files</p>
                        <p>Archived: {job.archivedCandidates} hired</p>
                        <p>Started: {formatDate(job.startedAt)}</p>
                        {job.errors.length > 0 && (
                          <p className="text-danger">{job.errors.length} errors occurred</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* GDPR / UU PDP Info */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent-cyan" />
                Data Subject Rights (UU PDP)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-3 bg-bg-secondary/50 rounded-lg">
                  <h4 className="font-medium mb-2">Right to Access</h4>
                  <p className="text-text-muted">Candidates can request a copy of all their personal data stored in the system.</p>
                </div>
                <div className="p-3 bg-bg-secondary/50 rounded-lg">
                  <h4 className="font-medium mb-2">Right to Deletion</h4>
                  <p className="text-text-muted">Candidates can request complete deletion of their data ("right to be forgotten").</p>
                </div>
                <div className="p-3 bg-bg-secondary/50 rounded-lg">
                  <h4 className="font-medium mb-2">Data Portability</h4>
                  <p className="text-text-muted">Data can be exported in standard formats for transfer to other services.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
