'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const [settings, setSettings] = useState({
    quizPassingScore: 60,
    quizTimeLimit: 30,
    challengesRequired: 3,
    enableEmailNotifications: true,
    enableAntiCheat: true,
    autoGradeQuiz: true,
    companyName: 'Cyber Ventures Indonesia',
    supportEmail: 'support@cyberventures.id',
    smtpHost: 'smtp.hostinger.com',
    smtpPort: 587,
  });

  const [saved, setSaved] = useState(false);

  // Fix hydration mismatch for date
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-1">Configure recruitment system preferences</p>
        </div>
        <Link href="/admin/recruitment">
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg">
            ← Back to Dashboard
          </button>
        </Link>
      </div>

      {saved && (
        <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-400">
          ✅ Settings saved successfully!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quiz Settings */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">📝 Quiz Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Passing Score (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={settings.quizPassingScore}
                onChange={(e) => setSettings({...settings, quizPassingScore: parseInt(e.target.value)})}
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Time Limit (minutes)</label>
              <input
                type="number"
                min="5"
                max="120"
                value={settings.quizTimeLimit}
                onChange={(e) => setSettings({...settings, quizTimeLimit: parseInt(e.target.value)})}
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white"
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300">Auto-grade Quiz</span>
              <button
                onClick={() => setSettings({...settings, autoGradeQuiz: !settings.autoGradeQuiz})}
                className={`w-12 h-6 rounded-full transition-colors ${settings.autoGradeQuiz ? 'bg-cyan-500' : 'bg-gray-700'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${settings.autoGradeQuiz ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Challenge Settings */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">🏆 Challenge Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Challenges Required to Pass</label>
              <input
                type="number"
                min="1"
                max="10"
                value={settings.challengesRequired}
                onChange={(e) => setSettings({...settings, challengesRequired: parseInt(e.target.value)})}
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white"
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300">Enable Anti-Cheat</span>
              <button
                onClick={() => setSettings({...settings, enableAntiCheat: !settings.enableAntiCheat})}
                className={`w-12 h-6 rounded-full transition-colors ${settings.enableAntiCheat ? 'bg-cyan-500' : 'bg-gray-700'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${settings.enableAntiCheat ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Email Settings */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">📧 Email Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300">Enable Email Notifications</span>
              <button
                onClick={() => setSettings({...settings, enableEmailNotifications: !settings.enableEmailNotifications})}
                className={`w-12 h-6 rounded-full transition-colors ${settings.enableEmailNotifications ? 'bg-cyan-500' : 'bg-gray-700'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${settings.enableEmailNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Support Email</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">SMTP Host</label>
              <input
                type="text"
                value={settings.smtpHost}
                onChange={(e) => setSettings({...settings, smtpHost: e.target.value})}
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white"
              />
            </div>
          </div>
        </div>

        {/* Company Settings */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">🏢 Company Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Company Name</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white"
              />
            </div>
            <div className="pt-4 border-t border-gray-800">
              <h4 className="text-sm font-medium text-gray-300 mb-2">System Info</h4>
              <div className="text-xs text-gray-500 space-y-1">
                <p>Version: 1.0.0</p>
                <p>Last Updated: {mounted ? new Date().toLocaleDateString('id-ID') : '-'}</p>
                <p>Database: PostgreSQL</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 px-8 rounded-lg"
        >
          Save Settings
        </button>
        <button
          onClick={() => setSettings({
            quizPassingScore: 60,
            quizTimeLimit: 30,
            challengesRequired: 3,
            enableEmailNotifications: true,
            enableAntiCheat: true,
            autoGradeQuiz: true,
            companyName: 'Cyber Ventures Indonesia',
            supportEmail: 'support@cyberventures.id',
            smtpHost: 'smtp.hostinger.com',
            smtpPort: 587,
          })}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg"
        >
          Reset to Default
        </button>
      </div>
    </div>
  );
}
