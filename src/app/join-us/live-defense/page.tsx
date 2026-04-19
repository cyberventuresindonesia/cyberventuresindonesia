'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Storage } from '@/lib/storage';
import { sendEmail, generateCalendarInvite } from '@/lib/email';
import { ArrowLeft, Calendar, Clock, Video, CheckCircle, Download, Home, User, CalendarPlus, Mail, Shield, ChevronRight } from 'lucide-react';

export default function LiveDefensePage() {
  const [scheduled, setScheduled] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [candidateInfo, setCandidateInfo] = useState<{
    fullName: string;
    email: string;
    position: string;
    telegramUsername: string;
  } | null>(null);
  
  const [formData, setFormData] = useState({
    preferredDate: '',
    preferredTime: '',
    timezone: 'WIB',
    notes: ''
  });
  
  // Load candidate info on mount
  useEffect(() => {
    const loadCandidateInfo = () => {
      try {
        const appData = localStorage.getItem('applicationData');
        if (appData) {
          const parsed = JSON.parse(appData);
          setCandidateInfo({
            fullName: parsed.fullName || 'Candidate',
            email: parsed.email || '',
            position: parsed.position?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Security Position',
            telegramUsername: parsed.telegramUsername || '',
          });
        }
      } catch (error) {
        console.error('Error loading candidate info:', error);
      }
    };
    
    loadCandidateInfo();
  }, []);

  // Generate ICS file for calendar import
  const generateICSFile = (data: typeof formData) => {
    const startDate = new Date(`${data.preferredDate}T${data.preferredTime}`);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 60 minutes
    
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Cyber Ventures//Live Defense//EN
BEGIN:VEVENT
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:Cyber Ventures - Live Defense Session
DESCRIPTION:60-minute incident response simulation with real SIEM dashboard. Expert evaluation by senior security team.
LOCATION:Google Meet (link will be sent 24h before)
END:VEVENT
END:VCALENDAR`;
  };

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!candidateInfo || !candidateInfo.email) {
      alert('❌ Error: Candidate information not found. Please complete the application form first.');
      return;
    }
    
    try {
      // Save to storage
      const result = await Storage.saveLiveDefenseSchedule({
        ...formData,
        scheduled: true,
        candidateInfo,
      });
      
      console.log('Live defense scheduled:', result);
      
      // Send automated email
      const googleMeetLink = 'https://meet.google.com/cyber-ventures-live'; // Static or generated
      
      const emailResult = await sendEmail({
        to: candidateInfo.email,
        candidateName: candidateInfo.fullName,
        position: candidateInfo.position,
        date: formData.preferredDate,
        time: formData.preferredTime,
        timezone: formData.timezone,
        telegramUsername: candidateInfo.telegramUsername,
        googleMeetLink,
      });
      
      if (emailResult.success) {
        setEmailSent(true);
        console.log('✅ Confirmation email queued:', emailResult.message);
      } else {
        console.error('⚠️ Email could not be sent:', emailResult.message);
      }
      
      setScheduled(true);
      localStorage.setItem('currentGate', '4');
      localStorage.setItem('liveDefenseScheduled', 'true');
      
    } catch (error) {
      console.error('Error scheduling:', error);
      alert('❌ Error scheduling. Please try again.');
    }
  };

  if (scheduled) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-black pt-24 pb-12">
          <div className="max-w-3xl mx-auto px-4">
            {/* Success Card */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-green-500/30 rounded-2xl p-8 mb-6 animate-fade-in-up">
              {/* Success Icon */}
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center animate-pulse">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-center text-white mb-2">
                Live Defense Scheduled!
              </h2>
              <p className="text-green-400 text-center mb-6">
                Your final recruitment stage is confirmed
              </p>
              
              {/* Schedule Details Card */}
              <div className="bg-black/40 rounded-xl p-6 mb-6 border border-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <Calendar className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-500 mb-1">Date</p>
                    <p className="text-white font-semibold">{formData.preferredDate}</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <Clock className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-500 mb-1">Time</p>
                    <p className="text-white font-semibold">{formData.preferredTime} {formData.timezone}</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <Video className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-500 mb-1">Platform</p>
                    <p className="text-white font-semibold">Google Meet</p>
                  </div>
                </div>
              </div>
              
              {/* What to Expect */}
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-6 mb-6">
                <h3 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  What to Expect
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">⏱️</span>
                    <span>60-minute incident response simulation with real SIEM dashboard</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">👥</span>
                    <span>Expert evaluation by our senior security team</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">💬</span>
                    <span>Technical discussion and Q&A session</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">📧</span>
                    <span>SIEM access details sent 24 hours before session</span>
                  </li>
                </ul>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={() => {
                    // Generate and download ICS file
                    const icsContent = generateICSFile(formData);
                    const blob = new Blob([icsContent], { type: 'text/calendar' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `cyber-ventures-live-defense-${formData.preferredDate}.ics`;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                  }}
                  className="flex-1 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500 text-cyan-400 font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <CalendarPlus className="w-5 h-5" />
                  Add to Calendar
                </button>
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Details
                </button>
              </div>
              
              {/* Email Confirmation Box */}
              {emailSent && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
                  <p className="text-green-400 text-sm text-center flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>✅ Confirmation email sent to {candidateInfo?.email || 'your email'}</span>
                  </p>
                  <p className="text-gray-400 text-xs text-center mt-2">
                    Check your inbox (and spam folder) for detailed interview instructions.
                  </p>
                </div>
              )}
              
              {/* Reminder Box */}
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
                <p className="text-yellow-400 text-sm text-center">
                  <Mail className="w-4 h-4 inline mr-1" />
                  SIEM access credentials will be sent 24 hours before your session.
                </p>
              </div>
            </div>
            
            {/* What's Next Section */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6 text-center">
                What&apos;s Next? 🎯
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Gate 1: Technical Quiz</p>
                    <p className="text-green-400 text-sm">✓ PASSED</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Gate 2: Hacking Challenges</p>
                    <p className="text-green-400 text-sm">✓ COMPLETED</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Gate 3: Live Defense</p>
                    <p className="text-cyan-400 text-sm">⏳ SCHEDULED - {formData.preferredDate}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/dashboard"
                  className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <User className="w-5 h-5" />
                  View My Dashboard
                </Link>
                <Link
                  href="/"
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Back to Home
                </Link>
              </div>
              
              {/* Contact Support */}
              <p className="text-center text-gray-500 text-sm mt-6">
                Need to reschedule?{' '}
                <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 underline">
                  Contact our recruitment team
                </Link>
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-black pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link 
              href="/join-us/challenges"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Challenges</span>
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Gate 3: <span className="text-cyan-400">Live Defense</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Schedule your live incident response simulation with our security team
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-gray-900/50 border border-gray-800 rounded-xl p-8">
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 mb-6">
              <h3 className="text-cyan-400 font-bold mb-2">🛡️ Live Defense Session</h3>
              <p className="text-gray-400 text-sm">
                You'll be given access to a simulated SIEM dashboard with active security incidents. 
                Your task is to investigate, analyze, and respond to threats in real-time.
              </p>
            </div>

            <form onSubmit={handleSchedule} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Date *</label>
                <input
                  type="date"
                  required
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Time *</label>
                  <select
                    required
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  >
                    <option value="">Select time</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="13:00">13:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
                  <select
                    value={formData.timezone}
                    onChange={(e) => setFormData({...formData, timezone: e.target.value})}
                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  >
                    <option value="WIB">WIB (Jakarta)</option>
                    <option value="WITA">WITA (Bali)</option>
                    <option value="WIT">WIT (Papua)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Additional Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white h-24"
                  placeholder="Any specific topics you'd like to focus on?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-4 rounded-lg transition-colors"
              >
                Schedule Live Defense Session
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
