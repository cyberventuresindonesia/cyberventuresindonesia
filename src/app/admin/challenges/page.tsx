'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Challenge {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  flag: string;
  dockerImage: string;
  port: number;
  active: boolean;
  solves: number;
  attempts: number;
}

export default function AdminChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([
    { id: '1', title: 'Hidden Path', category: 'Web', difficulty: 'Easy', points: 100, flag: 'CVI{rob0ts_txt_l34ks}', dockerImage: 'cyberventures/web-hidden-path', port: 8001, active: true, solves: 45, attempts: 120 },
    { id: '2', title: 'Login Bypass', category: 'Web', difficulty: 'Medium', points: 200, flag: 'CVI{sql1_m4st3r}', dockerImage: 'cyberventures/web-sqli-login', port: 8002, active: true, solves: 32, attempts: 89 },
    { id: '3', title: 'Caesar Secret', category: 'Crypto', difficulty: 'Easy', points: 100, flag: 'CVI{c43s4r_c1ph3r}', dockerImage: 'cyberventures/crypto-caesar', port: 8003, active: true, solves: 67, attempts: 95 },
    { id: '4', title: 'Packet Detective', category: 'Forensics', difficulty: 'Medium', points: 150, flag: 'CVI{p4ck3t_m4st3r}', dockerImage: 'cyberventures/forensics-pcap', port: 8004, active: false, solves: 23, attempts: 67 },
    { id: '5', title: 'Buffer Overflow 101', category: 'Pwn', difficulty: 'Hard', points: 300, flag: 'CVI{sh3ll_0bt41n3d}', dockerImage: 'cyberventures/pwn-bof', port: 8005, active: true, solves: 12, attempts: 156 },
  ]);

  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newChallenge, setNewChallenge] = useState<Partial<Challenge>>({});

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'text-green-400 bg-green-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'Hard': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const handleToggleActive = (id: string) => {
    setChallenges(challenges.map(c => 
      c.id === id ? { ...c, active: !c.active } : c
    ));
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this challenge?')) {
      setChallenges(challenges.filter(c => c.id !== id));
    }
  };

  const handleSave = () => {
    if (isEditing && selectedChallenge) {
      setChallenges(challenges.map(c => 
        c.id === selectedChallenge.id ? selectedChallenge : c
      ));
    } else if (newChallenge.title) {
      const challenge: Challenge = {
        id: Date.now().toString(),
        title: newChallenge.title || '',
        category: newChallenge.category || 'Web',
        difficulty: (newChallenge.difficulty as 'Easy' | 'Medium' | 'Hard') || 'Easy',
        points: newChallenge.points || 100,
        flag: newChallenge.flag || '',
        dockerImage: newChallenge.dockerImage || '',
        port: newChallenge.port || 8000,
        active: false,
        solves: 0,
        attempts: 0,
      };
      setChallenges([...challenges, challenge]);
    }
    setSelectedChallenge(null);
    setIsEditing(false);
    setNewChallenge({});
  };

  const successRate = (solves: number, attempts: number) => {
    if (attempts === 0) return 0;
    return Math.round((solves / attempts) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Challenge Management</h1>
          <p className="text-gray-400 mt-1">Manage CTF challenges for Gate 2</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/recruitment">
            <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg">
              ← Back to Dashboard
            </button>
          </Link>
          <button 
            onClick={() => {
              setNewChallenge({});
              setIsEditing(false);
              setSelectedChallenge({} as Challenge);
            }}
            className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 px-6 rounded-lg"
          >
            + Add Challenge
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-2xl font-bold text-white">{challenges.length}</h3>
          <p className="text-gray-400">Total Challenges</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-2xl font-bold text-green-400">{challenges.filter(c => c.active).length}</h3>
          <p className="text-gray-400">Active</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-2xl font-bold text-cyan-400">
            {challenges.reduce((acc, c) => acc + c.solves, 0)}
          </h3>
          <p className="text-gray-400">Total Solves</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-2xl font-bold text-yellow-400">
            {Math.round(challenges.reduce((acc, c) => acc + successRate(c.solves, c.attempts), 0) / challenges.length)}%
          </h3>
          <p className="text-gray-400">Avg Success Rate</p>
        </div>
      </div>

      {/* Challenges Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-black/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Challenge</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Category</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Difficulty</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Points</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Success Rate</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {challenges.map((challenge) => (
              <tr key={challenge.id} className="hover:bg-gray-800/50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-white">{challenge.title}</div>
                  <div className="text-xs text-gray-500">Port: {challenge.port}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">{challenge.category}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-cyan-400 font-bold">{challenge.points}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${successRate(challenge.solves, challenge.attempts)}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{successRate(challenge.solves, challenge.attempts)}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleToggleActive(challenge.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      challenge.active 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {challenge.active ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedChallenge(challenge);
                        setIsEditing(true);
                      }}
                      className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm hover:bg-cyan-500/30"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(challenge.id)}
                      className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {selectedChallenge && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-lg w-full">
            <h3 className="text-2xl font-bold text-white mb-6">
              {isEditing ? 'Edit Challenge' : 'Add New Challenge'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={isEditing ? selectedChallenge.title : newChallenge.title || ''}
                  onChange={(e) => isEditing 
                    ? setSelectedChallenge({...selectedChallenge, title: e.target.value})
                    : setNewChallenge({...newChallenge, title: e.target.value})
                  }
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Category</label>
                  <select
                    value={isEditing ? selectedChallenge.category : newChallenge.category || 'Web'}
                    onChange={(e) => isEditing
                      ? setSelectedChallenge({...selectedChallenge, category: e.target.value})
                      : setNewChallenge({...newChallenge, category: e.target.value})
                    }
                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  >
                    <option>Web</option>
                    <option>Crypto</option>
                    <option>Forensics</option>
                    <option>Reversing</option>
                    <option>Pwn</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Difficulty</label>
                  <select
                    value={isEditing ? selectedChallenge.difficulty : newChallenge.difficulty || 'Easy'}
                    onChange={(e) => isEditing
                      ? setSelectedChallenge({...selectedChallenge, difficulty: e.target.value as any})
                      : setNewChallenge({...newChallenge, difficulty: e.target.value as any})
                    }
                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Points</label>
                  <input
                    type="number"
                    value={isEditing ? selectedChallenge.points : newChallenge.points || 100}
                    onChange={(e) => isEditing
                      ? setSelectedChallenge({...selectedChallenge, points: parseInt(e.target.value)})
                      : setNewChallenge({...newChallenge, points: parseInt(e.target.value)})
                    }
                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Port</label>
                  <input
                    type="number"
                    value={isEditing ? selectedChallenge.port : newChallenge.port || 8000}
                    onChange={(e) => isEditing
                      ? setSelectedChallenge({...selectedChallenge, port: parseInt(e.target.value)})
                      : setNewChallenge({...newChallenge, port: parseInt(e.target.value)})
                    }
                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Flag (CVI&#123;...&#125;)</label>
                <input
                  type="text"
                  value={isEditing ? selectedChallenge.flag : newChallenge.flag || ''}
                  onChange={(e) => isEditing
                    ? setSelectedChallenge({...selectedChallenge, flag: e.target.value})
                    : setNewChallenge({...newChallenge, flag: e.target.value})
                  }
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white font-mono"
                  placeholder="CVI{...}"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Docker Image</label>
                <input
                  type="text"
                  value={isEditing ? selectedChallenge.dockerImage : newChallenge.dockerImage || ''}
                  onChange={(e) => isEditing
                    ? setSelectedChallenge({...selectedChallenge, dockerImage: e.target.value})
                    : setNewChallenge({...newChallenge, dockerImage: e.target.value})
                  }
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  placeholder="cyberventures/challenge-name"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleSave}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 rounded-lg"
              >
                {isEditing ? 'Save Changes' : 'Create Challenge'}
              </button>
              <button
                onClick={() => {
                  setSelectedChallenge(null);
                  setIsEditing(false);
                  setNewChallenge({});
                }}
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
