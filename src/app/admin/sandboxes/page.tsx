'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Clock, 
  AlertTriangle, 
  Flag,
  RefreshCw,
  Trash2,
  Terminal,
  Activity,
  Shield,
  X
} from 'lucide-react';

interface Container {
  id: string;
  candidateId: string;
  templateId: string;
  status: string;
  startedAt: string;
  expiresAt: string;
  flagsCaptured: number;
  violations: string[];
  ipAddress?: string;
}

export default function SandboxMonitorPage() {
  const [containers, setContainers] = useState<Container[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(null);

  const fetchContainers = async () => {
    try {
      const response = await fetch('/api/sandbox/status');
      const result = await response.json();
      setContainers(result.containers || []);
    } catch (error) {
      console.error('Failed to fetch containers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContainers();
    const interval = setInterval(fetchContainers, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const destroyContainer = async (candidateId: string) => {
    if (!confirm('Are you sure you want to destroy this container?')) return;

    try {
      await fetch('/api/sandbox/destroy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateId,
          reason: 'Admin manual termination'
        })
      });
      fetchContainers();
    } catch (error) {
      console.error('Failed to destroy container:', error);
    }
  };

  const getDifficultyColor = (templateId: string) => {
    if (templateId.includes('advanced')) return 'text-danger';
    if (templateId.includes('ad-')) return 'text-warning';
    return 'text-success';
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  const getRemainingTime = (expiresAt: string) => {
    const remaining = new Date(expiresAt).getTime() - Date.now();
    if (remaining < 0) return 'Expired';
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Sandbox Monitor</h1>
              <p className="text-text-muted">Monitor active penetration testing labs and candidate activity</p>
            </div>
            <button
              onClick={fetchContainers}
              className="btn-secondary flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-cyan/20 flex items-center justify-center">
                <Server className="w-5 h-5 text-accent-cyan" />
              </div>
              <div>
                <p className="text-2xl font-bold">{containers.length}</p>
                <p className="text-sm text-text-muted">Active Labs</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                <Flag className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {containers.reduce((sum, c) => sum + c.flagsCaptured, 0)}
                </p>
                <p className="text-sm text-text-muted">Flags Captured</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-danger/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-danger" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {containers.reduce((sum, c) => sum + c.violations.length, 0)}
                </p>
                <p className="text-sm text-text-muted">Violations</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {containers.filter(c => c.status === 'running').length}
                </p>
                <p className="text-sm text-text-muted">Running</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Containers Table */}
        <motion.div
          className="glass-card overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="p-4 border-b border-border-subtle flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Terminal className="w-5 h-5 text-accent-cyan" />
              Active Containers
            </h2>
            <span className="text-sm text-text-muted">
              Auto-refresh: 30s
            </span>
          </div>

          {loading ? (
            <div className="p-8 text-center text-text-muted">
              Loading containers...
            </div>
          ) : containers.length === 0 ? (
            <div className="p-8 text-center text-text-muted">
              No active containers
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-bg-secondary/50">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium">Container</th>
                    <th className="text-left px-4 py-3 text-sm font-medium">Candidate</th>
                    <th className="text-left px-4 py-3 text-sm font-medium">Template</th>
                    <th className="text-left px-4 py-3 text-sm font-medium">Time Left</th>
                    <th className="text-left px-4 py-3 text-sm font-medium">Flags</th>
                    <th className="text-left px-4 py-3 text-sm font-medium">Violations</th>
                    <th className="text-left px-4 py-3 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {containers.map((container) => (
                    <tr key={container.id} className="border-b border-border-subtle/50 hover:bg-bg-secondary/30">
                      <td className="px-4 py-3">
                        <code className="text-xs bg-bg-tertiary px-2 py-1 rounded">
                          {container.id.slice(0, 12)}...
                        </code>
                        {container.ipAddress && (
                          <p className="text-xs text-text-muted mt-1">{container.ipAddress}</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm">{container.candidateId}</p>
                        <p className="text-xs text-text-muted">
                          Started: {formatTime(container.startedAt)}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-sm font-medium ${getDifficultyColor(container.templateId)}`}>
                          {container.templateId.replace(/-/g, ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-sm ${
                          getRemainingTime(container.expiresAt).includes('h') && 
                          parseInt(getRemainingTime(container.expiresAt)) < 1 
                            ? 'text-danger' : 'text-accent-cyan'
                        }`}>
                          {getRemainingTime(container.expiresAt)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm">
                          {container.flagsCaptured}/3
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {container.violations.length > 0 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-danger/20 text-danger text-xs">
                            <AlertTriangle className="w-3 h-3" />
                            {container.violations.length}
                          </span>
                        ) : (
                          <span className="text-xs text-success">None</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedContainer(container)}
                            className="p-2 rounded hover:bg-bg-tertiary transition-colors"
                            title="View Details"
                          >
                            <Shield className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => destroyContainer(container.candidateId)}
                            className="p-2 rounded hover:bg-danger/20 text-danger transition-colors"
                            title="Destroy Container"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Container Details Modal */}
        {selectedContainer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div 
              className="glass-card max-w-lg w-full p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Container Details</h3>
                <button
                  onClick={() => setSelectedContainer(null)}
                  className="p-2 rounded hover:bg-bg-tertiary"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-text-muted">ID:</span>
                  <code className="ml-2 bg-bg-tertiary px-2 py-1 rounded">{selectedContainer.id}</code>
                </div>
                <div>
                  <span className="text-text-muted">Candidate:</span>
                  <span className="ml-2">{selectedContainer.candidateId}</span>
                </div>
                <div>
                  <span className="text-text-muted">Template:</span>
                  <span className={`ml-2 ${getDifficultyColor(selectedContainer.templateId)}`}>
                    {selectedContainer.templateId}
                  </span>
                </div>
                <div>
                  <span className="text-text-muted">Status:</span>
                  <span className={`ml-2 ${
                    selectedContainer.status === 'running' ? 'text-success' : 'text-danger'
                  }`}>
                    {selectedContainer.status}
                  </span>
                </div>
                
                {selectedContainer.violations.length > 0 && (
                  <div className="mt-4">
                    <span className="text-danger font-medium">Violations:</span>
                    <ul className="mt-2 space-y-1">
                      {selectedContainer.violations.map((v, i) => (
                        <li key={i} className="text-sm text-danger/80">• {v}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
