'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { RefreshCw, Loader2, Calendar, Clock, CheckCircle } from 'lucide-react';

interface LiveDefenseSession {
  id: string;
  candidateName: string;
  candidateEmail: string;
  scheduledAt: string;
  duration: number;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  siemUrl?: string;
  overallScore?: number;
  evaluator?: string;
}

export default function LiveDefensePage() {
  const [sessions, setSessions] = useState<LiveDefenseSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [selectedSession, setSelectedSession] = useState<LiveDefenseSession | null>(null);
  const [evaluation, setEvaluation] = useState({
    threatDetection: 0,
    responseTime: 0,
    documentation: 0,
    communication: 0,
    notes: '',
    recommendation: 'CONSIDER'
  });

  // Fetch sessions from API
  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/live-defense/sessions');
      const data = await response.json();
      if (data.success) {
        setSessions(data.sessions.map((s: any) => ({
          id: s.id,
          candidateName: s.candidateName,
          candidateEmail: s.candidateEmail,
          scheduledAt: `${s.preferredDate}T${s.preferredTime}`,
          duration: 60,
          status: s.status,
          overallScore: s.evaluation?.overall,
          evaluator: s.evaluation?.evaluator,
        })));
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSessions();
    const interval = setInterval(fetchSessions, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchSessions();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SCHEDULED': return 'bg-blue-500/20 text-blue-400';
      case 'IN_PROGRESS': return 'bg-yellow-500/20 text-yellow-400';
      case 'COMPLETED': return 'bg-green-500/20 text-green-400';
      case 'CANCELLED': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const handleEvaluate = async () => {
    if (!selectedSession) return;
    
    const overall = Math.round((evaluation.threatDetection + evaluation.responseTime + evaluation.documentation + evaluation.communication) / 4);
    
    try {
      const response = await fetch('/api/live-defense/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: selectedSession.id,
          status: 'COMPLETED',
          evaluation: {
            threatDetection: evaluation.threatDetection,
            responseTime: evaluation.responseTime,
            documentation: evaluation.documentation,
            communication: evaluation.communication,
            notes: evaluation.notes,
            recommendation: evaluation.recommendation,
            overall,
            evaluator: 'Admin User',
          }
        }),
      });
      
      if (response.ok) {
        // Update local state
        setSessions(sessions.map(s => 
          s.id === selectedSession.id 
            ? { ...s, status: 'COMPLETED' as const, overallScore: overall, evaluator: 'Admin User' }
            : s
        ));
        
        setSelectedSession(null);
        alert('Evaluation submitted successfully!');
      } else {
        alert('Failed to submit evaluation');
      }
    } catch (error) {
      console.error('Evaluation error:', error);
      alert('Error submitting evaluation');
    }
  };

  const upcomingSessions = sessions.filter(s => s.status === 'SCHEDULED').length;
  const completedToday = sessions.filter(s => s.status === 'COMPLETED').length;

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-accent-cyan" />
          <span className="text-text-muted">Loading sessions...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Live Defense Management</h1>
          <p className="text-gray-400 mt-1">Schedule and evaluate live incident response sessions</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
          <Link href="/admin/recruitment">
            <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg">
              ← Back
            </button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-2xl font-bold text-blue-400">{upcomingSessions}</h3>
          <p className="text-gray-400">Upcoming Sessions</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-2xl font-bold text-green-400">{completedToday}</h3>
          <p className="text-gray-400">Completed Today</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-2xl font-bold text-cyan-400">
            {Math.round(sessions.filter(s => s.overallScore).reduce((acc, s) => acc + (s.overallScore || 0), 0) / (sessions.filter(s => s.overallScore).length || 1))}
          </h3>
          <p className="text-gray-400">Average Score</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-2xl font-bold text-purple-400">{sessions.length}</h3>
          <p className="text-gray-400">Total Sessions</p>
        </div>
      </div>

      {/* Sessions Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-black/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Candidate</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Scheduled</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Duration</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Score</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {sessions.map((session) => (
              <tr key={session.id} className="hover:bg-gray-800/50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-white">{session.candidateName}</div>
                  <div className="text-xs text-gray-500">{session.candidateEmail}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {new Date(session.scheduledAt).toLocaleString('id-ID')}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">{session.duration} min</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                    {session.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {session.overallScore ? (
                    <span className={`font-bold ${session.overallScore >= 80 ? 'text-green-400' : session.overallScore >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {session.overallScore}
                    </span>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {session.status === 'SCHEDULED' && (
                    <button
                      onClick={() => setSelectedSession(session)}
                      className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm hover:bg-cyan-500/30"
                    >
                      Evaluate
                    </button>
                  )}
                  {session.status === 'COMPLETED' && (
                    <button
                      onClick={() => alert(`Viewing results for ${session.candidateName}\nScore: ${session.overallScore}\nEvaluator: ${session.evaluator}`)}
                      className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm hover:bg-green-500/30"
                    >
                      View Results
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Evaluation Modal */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-lg w-full">
            <h3 className="text-2xl font-bold text-white mb-2">Live Defense Evaluation</h3>
            <p className="text-gray-400 mb-6">Candidate: {selectedSession.candidateName}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { key: 'threatDetection', label: 'Threat Detection' },
                { key: 'responseTime', label: 'Response Time' },
                { key: 'documentation', label: 'Documentation' },
                { key: 'communication', label: 'Communication' },
              ].map((item) => (
                <div key={item.key}>
                  <label className="block text-sm text-gray-300 mb-2">{item.label} (0-100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={evaluation[item.key as keyof typeof evaluation] as number}
                    onChange={(e) => setEvaluation({...evaluation, [item.key]: parseInt(e.target.value) || 0})}
                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 text-white"
                  />
                </div>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-300 mb-2">Notes</label>
              <textarea
                value={evaluation.notes}
                onChange={(e) => setEvaluation({...evaluation, notes: e.target.value})}
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white h-24"
                placeholder="Enter evaluation notes..."
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-300 mb-2">Recommendation</label>
              <div className="flex gap-3">
                {['HIRE', 'CONSIDER', 'REJECT'].map((rec) => (
                  <button
                    key={rec}
                    onClick={() => setEvaluation({...evaluation, recommendation: rec})}
                    className={`flex-1 py-2 rounded-lg font-medium text-sm ${
                      evaluation.recommendation === rec
                        ? rec === 'HIRE' ? 'bg-green-500 text-black' : rec === 'REJECT' ? 'bg-red-500 text-black' : 'bg-yellow-500 text-black'
                        : 'bg-gray-800 text-gray-400'
                    }`}
                  >
                    {rec}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleEvaluate}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 rounded-lg"
              >
                Submit Evaluation
              </button>
              <button
                onClick={() => setSelectedSession(null)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
