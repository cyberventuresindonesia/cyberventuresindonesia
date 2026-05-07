'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, AlertCircle, RefreshCw, Server } from 'lucide-react';

export default function EmailTestPage() {
  const [configStatus, setConfigStatus] = useState<{ valid: boolean; message?: string; error?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [testResult, setTestResult] = useState<{ success?: boolean; message?: string } | null>(null);
  const [testEmail, setTestEmail] = useState('');

  // Test configuration on load
  useEffect(() => {
    testConfig();
  }, []);

  const testConfig = async () => {
    try {
      const response = await fetch('/api/email/test');
      const result = await response.json();
      setConfigStatus(result);
    } catch (error) {
      setConfigStatus({ valid: false, error: 'Failed to test configuration' });
    }
  };

  const sendTestEmail = async () => {
    if (!testEmail || !testEmail.includes('@')) {
      setTestResult({ success: false, message: 'Please enter a valid email' });
      return;
    }

    setLoading(true);
    setTestResult(null);

    try {
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: testEmail,
          template: 'application_received',
          variables: {
            name: 'Test User',
            position: 'Security Analyst',
          }
        })
      });

      const result = await response.json();

      if (response.ok) {
        setTestResult({ success: true, message: `Test email sent! Message ID: ${result.messageId}` });
      } else {
        setTestResult({ success: false, message: result.error || 'Failed to send email' });
      }
    } catch (error) {
      setTestResult({ success: false, message: 'Network error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const templates = [
    { id: 'application_received', name: 'Application Received', description: 'Sent when candidate submits application' },
    { id: 'gate1_passed', name: 'Gate 1 Passed', description: 'Sent when candidate completes Gate 1' },
    { id: 'gate2_passed', name: 'Gate 2 Passed', description: 'Sent when candidate completes Gate 2' },
    { id: 'challenges_completed', name: 'Challenges Completed', description: 'Sent after all CTF challenges' },
    { id: 'live_defense_scheduled', name: 'Live Defense Scheduled', description: 'Sent with interview details' },
    { id: 'evaluation_complete', name: 'Evaluation Complete', description: 'Sent after final evaluation' },
    { id: 'offer', name: 'Job Offer', description: 'Sent with offer letter' },
    { id: 'rejection', name: 'Rejection', description: 'Sent when candidate not selected' },
    { id: 'reminder_48h', name: '48h Reminder', description: 'Sent after 48h of inactivity' },
    { id: 'reminder_1week', name: '1 Week Reminder', description: 'Sent after 1 week of inactivity' },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2">Email System Test</h1>
          <p className="text-text-muted">Test Hostinger Reach API configuration and email templates</p>
        </motion.div>

        {/* Config Status */}
        <motion.div
          className="glass-card p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Server className="w-5 h-5 text-accent-cyan" />
              API Configuration
            </h2>
            <button
              onClick={testConfig}
              className="btn-secondary flex items-center gap-2 text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Test Again
            </button>
          </div>

          {configStatus ? (
            <div className={`p-4 rounded-lg border ${configStatus.valid ? 'bg-success/10 border-success/30' : 'bg-danger/10 border-danger/30'}`}>
              <div className="flex items-center gap-3">
                {configStatus.valid ? (
                  <CheckCircle className="w-6 h-6 text-success" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-danger" />
                )}
                <div>
                  <p className={configStatus.valid ? 'text-success font-medium' : 'text-danger font-medium'}>
                    {configStatus.valid ? 'Configuration Valid' : 'Configuration Error'}
                  </p>
                  <p className="text-sm text-text-muted mt-1">
                    {configStatus.message || configStatus.error}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-text-muted">
              <div className="w-5 h-5 rounded-full border-2 border-accent-cyan/30 border-t-accent-cyan animate-spin" />
              Testing configuration...
            </div>
          )}
        </motion.div>

        {/* Send Test Email */}
        <motion.div
          className="glass-card p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Send className="w-5 h-5 text-accent-cyan" />
            Send Test Email
          </h2>

          <div className="flex gap-4 mb-4">
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="Enter test email address"
              className="flex-1 px-4 py-3 bg-bg-secondary border border-border-subtle rounded-lg focus:ring-2 focus:ring-accent-cyan focus:border-transparent outline-none"
            />
            <button
              onClick={sendTestEmail}
              disabled={loading}
              className="btn-primary flex items-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              Send Test
            </button>
          </div>

          {testResult && (
            <div className={`p-3 rounded-lg ${testResult.success ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
              {testResult.message}
            </div>
          )}
        </motion.div>

        {/* Email Templates */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-accent-cyan" />
            Available Templates ({templates.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="p-4 rounded-lg border border-border-subtle bg-bg-secondary/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{template.name}</span>
                  <code className="text-xs bg-bg-tertiary px-2 py-1 rounded">
                    {template.id}
                  </code>
                </div>
                <p className="text-sm text-text-muted">{template.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* API Info */}
        <motion.div
          className="mt-8 p-4 rounded-lg bg-bg-secondary/50 border border-border-subtle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-medium mb-2">API Information</h3>
          <div className="space-y-1 text-sm text-text-muted font-mono">
            <p>Provider: Hostinger Reach API</p>
            <p>Endpoint: /api/email/send</p>
            <p>Templates: 10 pre-configured</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
