'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GateProgress from '@/components/GateProgress';
import { Storage } from '@/lib/storage';
import { ArrowLeft, AlertCircle, CheckCircle, XCircle, X, Shield, Terminal, Upload, Mail, Phone, MapPin } from 'lucide-react';

export default function JoinUsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    position: '',
    yearsExperience: '',
    coverLetter: '',
    phoneNumber: '',
    countryCode: '+62', // Default Indonesia
    telegramUsername: '',
    cvSummary: '',
  });
  
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvFileName, setCvFileName] = useState('');
  const [telegramValidating, setTelegramValidating] = useState(false);
  const [telegramValid, setTelegramValid] = useState<boolean | null>(null);
  
  // Debounce timer ref for Telegram validation
  const telegramDebounceTimer = useRef<NodeJS.Timeout | null>(null);
  
  // Notification state
  const [notification, setNotification] = useState<{
    show: boolean;
    type: 'success' | 'error';
    title: string;
    message: string;
  }>({
    show: false,
    type: 'success',
    title: '',
    message: '',
  });

  const showNotification = (type: 'success' | 'error', title: string, message: string) => {
    setNotification({ show: true, type, title, message });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  // Handle CV file upload
  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (file.type !== 'application/pdf') {
      showNotification('error', 'Invalid File', 'Please upload a PDF file only.');
      return;
    }
    
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      showNotification('error', 'File Too Large', `Your file is ${(file.size / (1024 * 1024)).toFixed(2)} MB. Maximum file size is 2MB.`);
      return;
    }
    
    setCvFile(file);
    setCvFileName(file.name);
    
    // Extract text from PDF (simplified - in real app, use PDF parsing library)
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        // For demo purposes, generate a summary based on file name
        const fileName = file.name.replace('.pdf', '');
        const fileSizeKB = (file.size / 1024).toFixed(1);
        const mockSummary = `CV uploaded: ${fileName}\n- File size: ${fileSizeKB} KB\n- Format: PDF\n\n[Note: Full text extraction would require PDF parsing library]`;
        setFormData(prev => ({ ...prev, cvSummary: mockSummary }));
        
        // Show detailed success notification
        showNotification('success', 'CV Upload Successful', `${file.name} (${fileSizeKB} KB) uploaded successfully. You can now complete your application.`);
      } catch (error) {
        console.error('Error processing CV:', error);
        showNotification('error', 'CV Processing Failed', 'There was an error processing your CV. Please try again.');
      }
    };
    
    reader.onerror = () => {
      showNotification('error', 'Upload Failed', 'Failed to read the file. Please try again with a valid PDF.');
    };
    
    reader.readAsDataURL(file);
  };

  // Debounced Telegram username validation
  const debouncedValidateTelegram = useCallback((username: string) => {
    // Clear existing timer
    if (telegramDebounceTimer.current) {
      clearTimeout(telegramDebounceTimer.current);
    }
    
    const cleanUsername = username.replace('@', '').toLowerCase().trim();
    
    // Basic format validation immediately
    if (!cleanUsername || cleanUsername.length < 5) {
      setTelegramValid(null);
      return;
    }
    
    const telegramRegex = /^[a-zA-Z0-9_]{5,32}$/;
    if (!telegramRegex.test(cleanUsername)) {
      setTelegramValid(false);
      return;
    }
    
    // Show loading state
    setTelegramValidating(true);
    setTelegramValid(null);
    
    // Debounce the API call by 800ms
    telegramDebounceTimer.current = setTimeout(async () => {
      await performTelegramValidation(cleanUsername);
    }, 800);
  }, []);
  
  // Actual API validation
  const performTelegramValidation = async (cleanUsername: string) => {
    try {
      // Using Apify Telegram Username Checker API
      const API_TOKEN = process.env.NEXT_PUBLIC_APIFY_API_TOKEN || 'YOUR_API_TOKEN_HERE';
      
      if (API_TOKEN === 'YOUR_API_TOKEN_HERE') {
        // Fallback: basic format check only (API token not configured)
        console.log('Apify API token not configured, using basic validation');
        await new Promise(resolve => setTimeout(resolve, 500));
        setTelegramValid(true);
        setTelegramValidating(false);
        return;
      }
      
      const response = await fetch(
        `https://api.apify.com/v2/acts/xtools~telegram-username/run-sync-get-dataset-items?token=${API_TOKEN}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            usernames: [cleanUsername]
          })
        }
      );
      
      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        const result = data[0];
        // Status can be: Available, Taken, Auctioned, Sold
        const isAvailable = result.status === 'Available';
        setTelegramValid(isAvailable);
        
        if (!isAvailable) {
          showNotification('error', 'Username Unavailable', `This username is ${result.status.toLowerCase()}. Please choose another.`);
        }
      } else {
        // No data returned, assume valid
        setTelegramValid(true);
      }
    } catch (error) {
      console.error('Telegram validation error:', error);
      // Fallback: accept username if API fails (don't block user)
      setTelegramValid(true);
      console.warn('Telegram username validation failed, accepting username anyway');
    } finally {
      setTelegramValidating(false);
    }
  };
  
  // Wrapper function for the input onChange
  const validateTelegramUsername = (username: string) => {
    debouncedValidateTelegram(username);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    if (!formData.fullName || !formData.email || !formData.position || !formData.yearsExperience || !formData.coverLetter || !formData.phoneNumber || !formData.telegramUsername) {
      showNotification('error', 'Incomplete Form', 'Please fill all required fields including Full Name, Email, Phone Number and Telegram Username.');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showNotification('error', 'Invalid Email', 'Please enter a valid email address.');
      return;
    }
    
    // Validate phone number format (basic validation - at least 8 digits)
    const phoneDigits = formData.phoneNumber.replace(/\D/g, '');
    if (phoneDigits.length < 8 || phoneDigits.length > 15) {
      showNotification('error', 'Invalid Phone Number', 'Please enter a valid phone number (8-15 digits).');
      return;
    }
    
    // Combine country code with phone number
    const fullPhoneNumber = `${formData.countryCode}${phoneDigits}`;
    
    // Validate Telegram username format
    const telegramRegex = /^@?[a-zA-Z0-9_]{5,32}$/;
    if (!telegramRegex.test(formData.telegramUsername)) {
      showNotification('error', 'Invalid Telegram Username', 'Username must be 5-32 characters with only letters, numbers, and underscores.');
      return;
    }

    setLoading(true);
    
    try {
      // Prepare application data with all fields
      const applicationData = {
        fullName: formData.fullName,
        email: formData.email,
        position: formData.position,
        yearsExperience: parseInt(formData.yearsExperience),
        coverLetter: formData.coverLetter,
        phoneNumber: fullPhoneNumber,
        countryCode: formData.countryCode,
        telegramUsername: formData.telegramUsername.replace('@', ''), // Remove @ if present
        cvFileName: cvFileName,
        cvSummary: formData.cvSummary,
      };
      
      // Save to storage (LocalStorage + File + DB if available)
      const result = await Storage.saveApplication(applicationData);
      
      console.log('Application saved:', result);
      
      // Also save to localStorage for immediate access
      // Add timestamp to force new quiz session on every application
      const appDataWithTimestamp = {
        ...formData,
        fullPhoneNumber,
        submittedAt: Date.now(),
      };
      localStorage.setItem('applicationData', JSON.stringify(appDataWithTimestamp));
      localStorage.setItem('currentGate', '1');
      // Clear any previous quiz session to force fresh start
      localStorage.removeItem('quizSessionId');
      
      // Save candidate data for gate progress tracking
      localStorage.setItem('candidateData', JSON.stringify({
        email: formData.email,
        fullName: formData.fullName,
        position: formData.position,
      }));
      
      // Send application received email
      try {
        await fetch('/api/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: formData.email,
            template: 'application_received',
            variables: {
              name: formData.fullName,
              position: formData.position,
            }
          })
        });
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
      }
      
      // Show success notification
      showNotification(
        'success', 
        'Application Submitted!', 
        `Your application has been received. Check your email and proceed to Gate 1...`
      );
      
      // Navigate to Gate 1 after delay
      setTimeout(() => {
        router.push('/join-us/gate-1');
      }, 2500);
    } catch (error) {
      console.error('Error saving application:', error);
      showNotification('error', 'Submission Failed', 'Error saving application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="min-h-screen bg-background pt-24 pb-12">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-bg-secondary via-background to-bg-tertiary pointer-events-none" />
      <div className="fixed top-1/4 left-0 w-96 h-96 bg-accent-indigo/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-0 w-96 h-96 bg-accent-purple/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-indigo/10 border border-accent-indigo/30 mb-4">
            <Shield className="w-4 h-4 text-accent-indigo" />
            <span className="text-sm font-medium text-accent-indigo">Sentinel Gate Application</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Join <span className="text-gradient">Cyber Ventures</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Start your journey to become part of Indonesia&apos;s elite cybersecurity team
          </p>
        </motion.div>

        {/* Gate Progress */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-bg-elevated/50 border border-border-subtle backdrop-blur-sm">
            <GateProgress currentGate={0} />
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.div 
          className="max-w-2xl mx-auto mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link 
            href="/careers"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-indigo transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Careers</span>
          </Link>
        </motion.div>

        <motion.div 
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative p-8 rounded-2xl bg-bg-elevated/50 border border-border-subtle backdrop-blur-sm overflow-hidden">
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-indigo/10 via-transparent to-accent-purple/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Terminal className="w-6 h-6 text-accent-indigo" />
                Gate 0: Application Form
              </h2>
              <span className="text-xs text-warning bg-warning/10 px-3 py-1 rounded-full font-mono">
                Step 1 of 4
              </span>
            </div>
            
            {/* Info Alert */}
            <div className="bg-accent-indigo/10 border border-accent-indigo/30 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-accent-indigo mt-0.5" />
                <div className="text-sm text-text-secondary">
                  <p className="font-medium text-accent-indigo mb-1">Application Process:</p>
                  <ul className="list-disc list-inside space-y-1 text-text-muted">
                    <li>Complete this form to proceed to Technical Quiz</li>
                    <li>Quiz: 15 questions, 5 minutes, need 60% to pass</li>
                    <li>Only one attempt allowed per candidate</li>
                  </ul>
                </div>
              </div>
            </div>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Full Name *</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full bg-bg-secondary border border-border-default rounded-lg px-4 py-3 text-foreground placeholder:text-text-muted focus:outline-none focus:border-accent-indigo transition-colors"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-bg-secondary border border-border-default rounded-lg px-4 py-3 text-foreground placeholder:text-text-muted focus:outline-none focus:border-accent-indigo transition-colors"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Position *</label>
              <select 
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                className="w-full bg-bg-secondary border border-border-default rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-accent-indigo transition-colors"
                required
              >
                <option value="">Select Position</option>
                <option value="security-analyst">Security Analyst</option>
                <option value="penetration-tester">Penetration Tester</option>
                <option value="security-engineer">Security Engineer</option>
                <option value="incident-responder">Incident Responder</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Years of Experience *</label>
              <input
                type="number"
                value={formData.yearsExperience}
                onChange={(e) => setFormData({...formData, yearsExperience: e.target.value})}
                className="w-full bg-bg-secondary border border-border-default rounded-lg px-4 py-3 text-foreground placeholder:text-text-muted focus:outline-none focus:border-accent-indigo transition-colors"
                placeholder="3"
                min="0"
                max="30"
                required
              />
            </div>

            {/* Phone Number with Country Code */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Phone Number * <span className="text-text-muted">(WhatsApp preferred)</span>
              </label>
              <div className="flex gap-2">
                <select
                  value={formData.countryCode}
                  onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
                  className="bg-bg-secondary border border-border-default rounded-lg px-3 py-3 text-foreground w-28 focus:outline-none focus:border-accent-indigo"
                >
                  <option value="+62">🇮🇩 +62</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+65">🇸🇬 +65</option>
                  <option value="+60">🇲🇾 +60</option>
                  <option value="+81">🇯🇵 +81</option>
                  <option value="+86">🇨🇳 +86</option>
                  <option value="+61">🇦🇺 +61</option>
                  <option value="+49">🇩🇪 +49</option>
                  <option value="+33">🇫🇷 +33</option>
                  <option value="+7">🇷🇺 +7</option>
                  <option value="+55">🇧🇷 +55</option>
                  <option value="+52">🇲🇽 +52</option>
                  <option value="+82">🇰🇷 +82</option>
                  <option value="+39">🇮🇹 +39</option>
                  <option value="+34">🇪🇸 +34</option>
                  <option value="+41">🇨🇭 +41</option>
                  <option value="+31">🇳🇱 +31</option>
                  <option value="+46">🇸🇪 +46</option>
                  <option value="+47">🇳🇴 +47</option>
                  <option value="+45">🇩🇰 +45</option>
                  <option value="+358">🇫🇮 +358</option>
                  <option value="+48">🇵🇱 +48</option>
                  <option value="+43">🇦🇹 +43</option>
                  <option value="+32">🇧🇪 +32</option>
                  <option value="+351">🇵🇹 +351</option>
                  <option value="+353">🇮🇪 +353</option>
                  <option value="+972">🇮🇱 +972</option>
                  <option value="+971">🇦🇪 +971</option>
                  <option value="+966">🇸🇦 +966</option>
                  <option value="+20">🇪🇬 +20</option>
                  <option value="+27">🇿🇦 +27</option>
                  <option value="+90">🇹🇷 +90</option>
                  <option value="+92">🇵🇰 +92</option>
                  <option value="+880">🇧🇩 +880</option>
                  <option value="+94">🇱🇰 +94</option>
                  <option value="+95">🇲🇲 +95</option>
                  <option value="+66">🇹🇭 +66</option>
                  <option value="+84">🇻🇳 +84</option>
                  <option value="+63">🇵🇭 +63</option>
                  <option value="+64">🇳🇿 +64</option>
                  <option value="+98">🇮🇷 +98</option>
                  <option value="+964">🇮🇶 +964</option>
                  <option value="+962">🇯🇴 +962</option>
                  <option value="+961">🇱🇧 +961</option>
                  <option value="+963">🇸🇾 +963</option>
                  <option value="+967">🇾🇪 +967</option>
                  <option value="+968">🇴🇲 +968</option>
                  <option value="+974">🇶🇦 +974</option>
                  <option value="+973">🇧🇭 +973</option>
                  <option value="+965">🇰🇼 +965</option>
                  <option value="+64">🇳🇿 +64</option>
                  <option value="+93">🇦🇫 +93</option>
                  <option value="+376">🇦🇩 +376</option>
                  <option value="+374">🇦🇲 +374</option>
                  <option value="+994">🇦🇿 +994</option>
                  <option value="+375">🇧🇾 +375</option>
                  <option value="+32">🇧🇬 +32</option>
                  <option value="+385">🇭🇷 +385</option>
                  <option value="+357">🇨🇾 +357</option>
                  <option value="+420">🇨🇿 +420</option>
                  <option value="+372">🇪🇪 +372</option>
                  <option value="+995">🇬🇪 +995</option>
                  <option value="+30">🇬🇷 +30</option>
                  <option value="+36">🇭🇺 +36</option>
                  <option value="+354">🇮🇸 +354</option>
                  <option value="+371">🇱🇻 +371</option>
                  <option value="+370">🇱🇹 +370</option>
                  <option value="+352">🇱🇺 +352</option>
                  <option value="+356">🇲🇹 +356</option>
                  <option value="+373">🇲🇩 +373</option>
                  <option value="+377">🇲🇨 +377</option>
                  <option value="+382">🇲🇪 +382</option>
                  <option value="+389">🇲🇰 +389</option>
                  <option value="+377">🇲🇨 +377</option>
                  <option value="+40">🇷🇴 +40</option>
                  <option value="+378">🇸🇲 +378</option>
                  <option value="+381">🇷🇸 +381</option>
                  <option value="+421">🇸🇰 +421</option>
                  <option value="+386">🇸🇮 +386</option>
                  <option value="+34">🇪🇸 +34</option>
                  <option value="+46">🇸🇪 +46</option>
                  <option value="+41">🇨🇭 +41</option>
                  <option value="+380">🇺🇦 +380</option>
                  <option value="+44">🇬🇧 +44</option>
                </select>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                  className="flex-1 bg-bg-secondary border border-border-default rounded-lg px-4 py-3 text-foreground placeholder:text-text-muted focus:outline-none focus:border-accent-indigo transition-colors"
                  placeholder="812 3456 7890"
                  required
                />
              </div>
              <p className="text-xs text-text-muted mt-1">Enter your number without country code. We&apos;ll add {formData.countryCode} automatically.</p>
            </div>

            {/* Telegram Username */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Telegram Username * <span className="text-text-muted">(real-time validation)</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.telegramUsername}
                  onChange={(e) => {
                    setFormData({...formData, telegramUsername: e.target.value});
                    validateTelegramUsername(e.target.value);
                  }}
                  className={`w-full bg-bg-secondary border rounded-lg px-4 py-3 text-foreground pr-10 focus:outline-none transition-colors ${
                    telegramValid === true 
                      ? 'border-success' 
                      : telegramValid === false 
                        ? 'border-danger' 
                        : 'border-border-default focus:border-accent-indigo'
                  }`}
                  placeholder="@username (without @)"
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {telegramValidating ? (
                    <div className="w-5 h-5 border-2 border-accent-indigo border-t-transparent rounded-full animate-spin" />
                  ) : telegramValid === true ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : telegramValid === false ? (
                    <XCircle className="w-5 h-5 text-danger" />
                  ) : null}
                </div>
              </div>
              <p className="text-xs text-text-muted mt-1">
                {telegramValid === true ? '✓ Username available on Telegram' : 
                 telegramValid === false ? '✗ Username taken or invalid' : 
                 'Enter username (5-32 chars, a-z, 0-9, _) - we check availability in real-time'}
              </p>
            </div>

            {/* CV Upload */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Upload CV (PDF) <span className="text-text-muted">(Optional, max 2MB)</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleCvUpload}
                  className="hidden"
                  id="cv-upload"
                />
                <label
                  htmlFor="cv-upload"
                  className="flex items-center justify-center w-full bg-bg-secondary border border-border-default border-dashed rounded-lg px-4 py-6 cursor-pointer hover:bg-bg-tertiary hover:border-accent-indigo/50 transition-colors"
                >
                  <div className="text-center">
                    {cvFileName ? (
                      <>
                        <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                        <p className="text-success font-medium">{cvFileName}</p>
                        <p className="text-text-muted text-sm">Click to change file</p>
                      </>
                    ) : (
                      <>
                        <div className="text-text-muted mb-2">
                          <Upload className="w-8 h-8 mx-auto" />
                        </div>
                        <p className="text-text-secondary font-medium">Click to upload CV (PDF)</p>
                        <p className="text-text-muted text-sm">Max file size: 2MB</p>
                      </>
                    )}
                  </div>
                </label>
              </div>
              
              {/* CV Summary Preview */}
              {formData.cvSummary && (
                <div className="mt-3 bg-bg-tertiary rounded-lg p-3 border border-border-subtle">
                  <p className="text-xs text-text-muted mb-1">CV Summary:</p>
                  <pre className="text-xs text-text-secondary whitespace-pre-wrap">{formData.cvSummary}</pre>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Cover Letter *</label>
              <textarea
                value={formData.coverLetter}
                onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
                className="w-full bg-bg-secondary border border-border-default rounded-lg px-4 py-3 text-foreground placeholder:text-text-muted focus:outline-none focus:border-accent-indigo transition-colors h-32"
                placeholder="Tell us why you want to join..."
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Link
                href="/careers"
                className="flex-1 bg-bg-tertiary hover:bg-bg-secondary text-foreground font-semibold py-4 rounded-lg transition-colors text-center border border-border-default"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="relative group flex-1"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-indigo to-accent-purple rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-300" />
                <div className="relative w-full bg-accent-indigo hover:bg-accent-indigo/90 text-white font-semibold py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? 'Submitting...' : 'Continue to Quiz'}
                </div>
              </button>
            </div>
          </form>

          {/* Help Text */}
          <p className="text-center text-text-muted text-sm mt-6">
            Need help?{' '}
            <Link href="/contact" className="text-accent-indigo hover:text-accent-purple transition-colors">
              Contact our recruitment team
            </Link>
          </p>
          </div>
          </div>
          </motion.div>
        </div>
      </div>
      <Footer />

      {/* Custom Notification Modal */}
      {notification.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className={`relative max-w-md w-full mx-4 rounded-xl border p-6 shadow-2xl animate-fade-in-up ${
            notification.type === 'success' 
              ? 'bg-bg-secondary border-success/50' 
              : 'bg-bg-secondary border-danger/50'
          }`}>
            {/* Close button */}
            <button
              onClick={() => setNotification(prev => ({ ...prev, show: false }))}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon */}
            <div className="flex items-center justify-center mb-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                notification.type === 'success' 
                  ? 'bg-success/20 border-2 border-success' 
                  : 'bg-danger/20 border-2 border-danger'
              }`}>
                {notification.type === 'success' ? (
                  <CheckCircle className="w-8 h-8 text-success" />
                ) : (
                  <XCircle className="w-8 h-8 text-danger" />
                )}
              </div>
            </div>

            {/* Title */}
            <h3 className={`text-xl font-bold text-center mb-2 ${
              notification.type === 'success' ? 'text-success' : 'text-danger'
            }`}>
              {notification.title}
            </h3>

            {/* Message */}
            <p className="text-text-secondary text-center mb-6">
              {notification.message}
            </p>

            {/* Button */}
            <button
              onClick={() => {
                setNotification(prev => ({ ...prev, show: false }));
                if (notification.type === 'success') {
                  router.push('/join-us/quiz');
                }
              }}
              className={`w-full py-3 rounded-lg font-bold transition-colors ${
                notification.type === 'success'
                  ? 'bg-success hover:bg-success/90 text-white'
                  : 'bg-danger hover:bg-danger/90 text-white'
              }`}
            >
              {notification.type === 'success' ? 'Continue to Quiz' : 'Try Again'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
