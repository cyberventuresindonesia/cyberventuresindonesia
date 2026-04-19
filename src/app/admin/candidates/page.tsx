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
  cvUrl?: string;
  phone?: string;
  yearsExperience?: number;
}

interface Notification {
  id: number;
  message: string;
  time: string;
  read: boolean;
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: '1', name: 'John Security', email: 'john@example.com', position: 'Security Analyst', gate: 1, status: 'IN_PROGRESS', quizScore: 0, challengesSolved: 0, appliedAt: '2024-01-15', cvUrl: '/sample-cv.pdf', phone: '+6281234567890', yearsExperience: 3 },
    { id: '2', name: 'Jane Hacker', email: 'jane@example.com', position: 'Penetration Tester', gate: 2, status: 'QUIZ_PASSED', quizScore: 85, challengesSolved: 0, appliedAt: '2024-01-14', cvUrl: '/sample-cv.pdf', phone: '+6289876543210', yearsExperience: 5 },
    { id: '3', name: 'Mike Pwn', email: 'mike@example.com', position: 'Security Engineer', gate: 3, status: 'CHALLENGES_PASSED', quizScore: 92, challengesSolved: 4, appliedAt: '2024-01-13', cvUrl: '/sample-cv.pdf', phone: '+6281122334455', yearsExperience: 4 },
    { id: '4', name: 'Sarah Code', email: 'sarah@example.com', position: 'Security Analyst', gate: 4, status: 'LIVE_DEFENSE_SCHEDULED', quizScore: 78, challengesSolved: 3, appliedAt: '2024-01-12', cvUrl: '/sample-cv.pdf', phone: '+6285566778899', yearsExperience: 2 },
    { id: '5', name: 'Alex Cyber', email: 'alex@example.com', position: 'Penetration Tester', gate: 4, status: 'COMPLETED', quizScore: 95, challengesSolved: 5, appliedAt: '2024-01-10', cvUrl: '/sample-cv.pdf', phone: '+6282233445566', yearsExperience: 6 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterGate, setFilterGate] = useState('all');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [showBulkDelete, setShowBulkDelete] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [showCVPreview, setShowCVPreview] = useState(false);

  // Notifications system
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: 'New candidate application: John Security', time: '2 min ago', read: false },
    { id: 2, message: 'Quiz completed: Jane Hacker (85%)', time: '15 min ago', read: false },
    { id: 3, message: 'Challenge solved: Buffer Overflow 101', time: '1 hour ago', read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

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

  // Working search filter
  const filteredCandidates = candidates.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGate = filterGate === 'all' || c.gate.toString() === filterGate;
    return matchesSearch && matchesGate;
  });

  const handleStatusChange = (id: string, newStatus: string) => {
    setCandidates(candidates.map(c => 
      c.id === id ? { ...c, status: newStatus } : c
    ));
    alert(`Status updated to: ${newStatus}`);
  };

  // Delete single candidate
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this candidate? This action cannot be undone.')) {
      setCandidates(candidates.filter(c => c.id !== id));
      alert('Candidate deleted successfully');
    }
  };

  // Toggle candidate selection
  const toggleSelection = (id: string) => {
    setSelectedCandidates(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  // Select all candidates
  const selectAll = () => {
    if (selectedCandidates.length === filteredCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(filteredCandidates.map(c => c.id));
    }
  };

  // Bulk delete with password
  const handleBulkDelete = () => {
    if (deletePassword !== 'admin123') {
      alert('Incorrect password. Bulk delete cancelled.');
      setDeletePassword('');
      return;
    }
    
    if (confirm(`Are you sure you want to delete ${selectedCandidates.length} candidates? This action cannot be undone.`)) {
      setCandidates(candidates.filter(c => !selectedCandidates.includes(c.id)));
      setSelectedCandidates([]);
      setShowBulkDelete(false);
      setDeletePassword('');
      alert(`${selectedCandidates.length} candidates deleted successfully`);
    }
  };

  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Candidates Management</h1>
          <p className="text-gray-400 mt-1">Manage and evaluate all candidates</p>
        </div>
        <Link href="/admin/recruitment">
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg">
            ← Back to Dashboard
          </button>
        </Link>
      </div>

      {/* Notifications Dropdown */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search candidates by name, email, or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white"
            />
          </div>
          <select
            value={filterGate}
            onChange={(e) => setFilterGate(e.target.value)}
            className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white"
          >
            <option value="all">All Gates</option>
            <option value="1">Gate 1: Quiz</option>
            <option value="2">Gate 2: Challenges</option>
            <option value="3">Gate 3: Live Defense</option>
            <option value="4">Completed</option>
          </select>
        </div>
        
        {/* Notifications */}
        <div className="relative ml-4">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-400 hover:text-white bg-gray-800 rounded-lg"
          >
            <span className="text-xl">🔔</span>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-gray-900 border border-gray-800 rounded-xl shadow-xl z-50">
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <h3 className="text-white font-medium">Notifications</h3>
                <button 
                  onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))}
                  className="text-xs text-cyan-400 hover:text-cyan-300"
                >
                  Mark all read
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="p-4 text-gray-500 text-center">No notifications</p>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markAsRead(notif.id)}
                      className={`p-4 border-b border-gray-800 hover:bg-gray-800 cursor-pointer ${
                        !notif.read ? 'bg-cyan-500/5' : ''
                      }`}
                    >
                      <p className="text-sm text-white">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedCandidates.length > 0 && (
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 flex items-center justify-between">
          <span className="text-cyan-400">
            {selectedCandidates.length} candidate{selectedCandidates.length > 1 ? 's' : ''} selected
          </span>
          <button
            onClick={() => setShowBulkDelete(true)}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            🗑️ Delete Selected
          </button>
        </div>
      )}

      {/* Candidates Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-black/50">
            <tr>
              <th className="px-4 py-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedCandidates.length === filteredCandidates.length && filteredCandidates.length > 0}
                  onChange={selectAll}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-cyan-500 focus:ring-cyan-500"
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Candidate</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Position</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Gate</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Quiz Score</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Challenges</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredCandidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-gray-800/50">
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedCandidates.includes(candidate.id)}
                    onChange={() => toggleSelection(candidate.id)}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-cyan-500 focus:ring-cyan-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-black font-bold">
                      {candidate.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{candidate.name}</div>
                      <div className="text-sm text-gray-400">{candidate.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-white">{candidate.position}</td>
                <td className="px-6 py-4 text-sm text-cyan-400">Gate {candidate.gate}</td>
                <td className="px-6 py-4 text-sm text-white">{candidate.quizScore || 0}%</td>
                <td className="px-6 py-4 text-sm text-white">{candidate.challengesSolved}/5</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                    {candidate.status.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedCandidate(candidate)}
                      className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm hover:bg-cyan-500/30"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(candidate.id)}
                      className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30"
                      title="Delete candidate"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-lg w-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center text-black font-bold text-2xl">
                {selectedCandidate.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{selectedCandidate.name}</h3>
                <p className="text-gray-400">{selectedCandidate.email}</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">Position</span>
                <span className="text-white">{selectedCandidate.position}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">Current Gate</span>
                <span className="text-cyan-400">Gate {selectedCandidate.gate}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">Quiz Score</span>
                <span className="text-white">{selectedCandidate.quizScore || 0}%</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">Challenges Solved</span>
                <span className="text-white">{selectedCandidate.challengesSolved}/5</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">Applied Date</span>
                <span className="text-white">{selectedCandidate.appliedAt}</span>
              </div>
            </div>

            {/* CV Preview Button */}
            {selectedCandidate.cvUrl && (
              <button
                onClick={() => setShowCVPreview(true)}
                className="w-full mb-4 bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/30 font-bold py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <span>📄</span> View CV / Resume
              </button>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDelete(selectedCandidate.id);
                  setSelectedCandidate(null);
                }}
                className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50 font-bold py-3 rounded-lg"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Modal */}
      {showBulkDelete && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-red-500/50 rounded-xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-white mb-2">Delete Candidates</h3>
              <p className="text-gray-400">
                You are about to delete <span className="text-red-400 font-bold">{selectedCandidates.length}</span> candidates. 
                This action cannot be undone.
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-300 mb-2">Enter admin password to confirm:</label>
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="Password: admin123"
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white"
              />
              <p className="text-xs text-gray-500 mt-1">Hint: Password is &quot;admin123&quot;</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleBulkDelete}
                className="flex-1 bg-red-500 hover:bg-red-600 text-black font-bold py-3 rounded-lg"
              >
                Confirm Delete
              </button>
              <button
                onClick={() => {
                  setShowBulkDelete(false);
                  setDeletePassword('');
                }}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CV Preview Modal */}
      {showCVPreview && selectedCandidate?.cvUrl && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-4xl w-full h-[80vh] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">CV Preview: {selectedCandidate.name}</h3>
              <button
                onClick={() => setShowCVPreview(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>
            
            {/* PDF Viewer Placeholder */}
            <div className="flex-1 bg-black/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-gray-400 mb-4">PDF Preview</p>
                <p className="text-sm text-gray-500 mb-6">
                  In production, this would display the actual CV PDF.<br/>
                  File: {selectedCandidate.cvUrl}
                </p>
                <button
                  onClick={() => alert(`Downloading CV for ${selectedCandidate.name}...`)}
                  className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-2 px-6 rounded-lg"
                >
                  ⬇️ Download CV
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
