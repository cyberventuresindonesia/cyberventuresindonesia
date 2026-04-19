'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
}

export default function RecruitmentDashboard() {
  const [stats, setStats] = useState({
    totalCandidates: 0,
    activeToday: 0,
    quizPasses: 0,
    challengesCompleted: 0,
    liveDefenseScheduled: 0,
    hired: 12,
  });

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Load real data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        // Get applications from localStorage
        const applications = JSON.parse(localStorage.getItem('applications') || '[]');
        const quizResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
        
        // Transform applications to candidates format
        const realCandidates: Candidate[] = applications.map((app: any) => {
          // Find quiz result for this candidate
          const quizResult = quizResults.find((q: any) => 
            q.email === app.email || q.candidateId === app.id
          );
          
          // Determine current gate
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
          
          // Check if live defense scheduled
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
            challengesSolved: 0, // TODO: Get from challenge progress
            appliedAt: app.createdAt || new Date().toISOString().split('T')[0],
          };
        });
        
        // Merge with mock data for demo purposes
        const mockCandidates: Candidate[] = [
          { id: 'mock-1', name: 'John Security', email: 'john@example.com', position: 'Security Analyst', gate: 1, status: 'IN_PROGRESS', quizScore: 0, challengesSolved: 0, appliedAt: '2024-01-15' },
          { id: 'mock-2', name: 'Jane Hacker', email: 'jane@example.com', position: 'Penetration Tester', gate: 2, status: 'QUIZ_PASSED', quizScore: 85, challengesSolved: 0, appliedAt: '2024-01-14' },
          { id: 'mock-3', name: 'Mike Pwn', email: 'mike@example.com', position: 'Security Engineer', gate: 3, status: 'CHALLENGES_PASSED', quizScore: 92, challengesSolved: 4, appliedAt: '2024-01-13' },
          { id: 'mock-4', name: 'Sarah Code', email: 'sarah@example.com', position: 'Security Analyst', gate: 4, status: 'LIVE_DEFENSE_SCHEDULED', quizScore: 78, challengesSolved: 3, appliedAt: '2024-01-12' },
          { id: 'mock-5', name: 'Alex Cyber', email: 'alex@example.com', position: 'Penetration Tester', gate: 4, status: 'COMPLETED', quizScore: 95, challengesSolved: 5, appliedAt: '2024-01-10' },
        ];
        
        const allCandidates = [...realCandidates, ...mockCandidates];
        setCandidates(allCandidates);
        
        // Update stats
        setStats({
          totalCandidates: allCandidates.length,
          activeToday: realCandidates.length,
          quizPasses: allCandidates.filter(c => (c.quizScore || 0) >= 60).length,
          challengesCompleted: allCandidates.filter(c => c.challengesSolved >= 3).length,
          liveDefenseScheduled: allCandidates.filter(c => c.status === 'LIVE_DEFENSE_SCHEDULED').length,
          hired: 12,
        });
        
      } catch (error) {
        console.error('Error loading admin data:', error);
      }
    };
    
    loadData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      IN_PROGRESS: 'bg-blue-500/20 text-blue-400',
      QUIZ_PASSED: 'bg-green-500/20 text-green-400',
      CHALLENGES_PASSED: 'bg-purple-500/20 text-purple-400',
      LIVE_DEFENSE_SCHEDULED: 'bg-orange-500/20 text-orange-400',
      COMPLETED: 'bg-cyan-500/20 text-cyan-400',
      REJECTED: 'bg-red-500/20 text-red-400',
    };
    return colors[status] || 'bg-gray-500/20 text-gray-400';
  };

  const filteredCandidates = candidates.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    alert('Exporting recruitment report...\n\nIn production, this would download a CSV/Excel file with all candidate data.');
  };

  const handleViewCandidate = (id: string) => {
    alert(`Viewing candidate profile: ${id}\n\nIn production, this would open a detailed candidate profile page.`);
  };

  const handleEvaluate = (id: string) => {
    alert(`Opening evaluation panel for candidate: ${id}\n\nIn production, this would open the live defense evaluation form.`);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Recruitment Dashboard</h1>
          <p className="text-gray-400 mt-1">Overview of candidate pipeline and performance</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/candidates">
            <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg">
              Manage Candidates
            </button>
          </Link>
          <button 
            onClick={handleExport}
            className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 px-6 rounded-lg"
          >
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          { label: 'Total Candidates', value: stats.totalCandidates, change: '+12%', icon: '👥' },
          { label: 'Active Today', value: stats.activeToday, change: '+5', icon: '⚡' },
          { label: 'Quiz Passes', value: stats.quizPasses, change: '68%', icon: '📚' },
          { label: 'Challenges Done', value: stats.challengesCompleted, change: '+23', icon: '🏆' },
          { label: 'Live Defense', value: stats.liveDefenseScheduled, change: '8 this week', icon: '🛡️' },
          { label: 'Hired', value: stats.hired, change: '+3', icon: '✅' },
        ].map((stat) => (
          <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-xs text-green-400">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Candidates Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">Recent Candidates</h2>
        </div>
        <table className="w-full">
          <thead className="bg-black/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Candidate</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Position</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Gate</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {candidates.map((candidate) => (
              <tr key={candidate.email} className="hover:bg-gray-800/50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-white">{candidate.name}</div>
                  <div className="text-sm text-gray-400">{candidate.email}</div>
                </td>
                <td className="px-6 py-4 text-sm text-white">{candidate.position}</td>
                <td className="px-6 py-4 text-sm text-cyan-400">Gate {candidate.gate}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                    {candidate.status.replace(/_/g, ' ')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
