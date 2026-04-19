'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Storage } from '@/lib/storage';
import { ArrowLeft, AlertCircle, CheckCircle, XCircle, X } from 'lucide-react';

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
      
      // Show success notification
      showNotification(
        'success', 
        'Application Submitted!', 
        `Your application has been saved to ${result.source || 'local storage'}. Proceeding to Technical Quiz...`
      );
      
      // Navigate to quiz after delay
      setTimeout(() => {
        router.push('/join-us/quiz');
      }, 2500);
    } catch (error) {
      console.error('Error saving application:', error);
      showNotification('error', 'Submission Failed', 'Error saving application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Join <span className="text-cyan-400">Cyber Ventures</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Start your journey to become part of Indonesia's elite cybersecurity team
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {['Application', 'Technical Quiz', 'Hacking Challenge', 'Live Defense'].map((step, index) => (
            <div key={step} className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                index === 0 ? 'bg-cyan-500 text-black' : 'bg-gray-800 text-gray-400'
              }`}>
                {index + 1}
              </div>
              <span className={`text-sm ${index === 0 ? 'text-white' : 'text-gray-500'}`}>
                {step}
              </span>
              {index < 3 && <div className="w-8 h-0.5 bg-gray-700" />}
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="max-w-2xl mx-auto mb-6">
          <Link 
            href="/careers"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Careers</span>
          </Link>
        </div>

        <div className="max-w-2xl mx-auto bg-gray-900/50 border border-gray-800 rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Gate 0: Application Form</h2>
            <span className="text-xs text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full">
              Step 1 of 4
            </span>
          </div>
          
          {/* Info Alert */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
              <div className="text-sm text-blue-200">
                <p className="font-medium mb-1">Application Process:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-300">
                  <li>Complete this form to proceed to Technical Quiz</li>
                  <li>Quiz: 15 questions, 5 minutes, need 60% to pass</li>
                  <li>Only one attempt allowed per candidate</li>
                </ul>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Position *</label>
              <select 
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white"
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
              <label className="block text-sm font-medium text-gray-300 mb-2">Years of Experience *</label>
              <input
                type="number"
                value={formData.yearsExperience}
                onChange={(e) => setFormData({...formData, yearsExperience: e.target.value})}
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white"
                placeholder="3"
                min="0"
                max="30"
                required
              />
            </div>

            {/* Phone Number with Country Code */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number * <span className="text-gray-500">(WhatsApp preferred)</span>
              </label>
              <div className="flex gap-2">
                <select
                  value={formData.countryCode}
                  onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
                  className="bg-black/50 border border-gray-700 rounded-lg px-3 py-3 text-white w-28"
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
                  className="flex-1 bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  placeholder="812 3456 7890"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Enter your number without country code. We&apos;ll add {formData.countryCode} automatically.</p>
            </div>

            {/* Telegram Username */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Telegram Username * <span className="text-gray-500">(real-time validation via Apify)</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.telegramUsername}
                  onChange={(e) => {
                    setFormData({...formData, telegramUsername: e.target.value});
                    validateTelegramUsername(e.target.value);
                  }}
                  className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white pr-10 ${
                    telegramValid === true 
                      ? 'border-green-500' 
                      : telegramValid === false 
                        ? 'border-red-500' 
                        : 'border-gray-700'
                  }`}
                  placeholder="@username (without @)"
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {telegramValidating ? (
                    <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                  ) : telegramValid === true ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : telegramValid === false ? (
                    <XCircle className="w-5 h-5 text-red-400" />
                  ) : null}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {telegramValid === true ? '✓ Username available on Telegram' : 
                 telegramValid === false ? '✗ Username taken or invalid' : 
                 'Enter username (5-32 chars, a-z, 0-9, _) - we check availability in real-time'}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Powered by Apify Telegram Username Checker API
              </p>
            </div>

            {/* CV Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Upload CV (PDF) <span className="text-gray-500">(Optional, max 2MB)</span>
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
                  className="flex items-center justify-center w-full bg-black/50 border border-gray-700 border-dashed rounded-lg px-4 py-6 cursor-pointer hover:bg-gray-800/50 hover:border-cyan-500/50 transition-colors"
                >
                  <div className="text-center">
                    {cvFileName ? (
                      <>
                        <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                        <p className="text-green-400 font-medium">{cvFileName}</p>
                        <p className="text-gray-500 text-sm">Click to change file</p>
                      </>
                    ) : (
                      <>
                        <div className="text-gray-400 mb-2">
                          <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <p className="text-gray-300 font-medium">Click to upload CV (PDF)</p>
                        <p className="text-gray-500 text-sm">Max file size: 2MB</p>
                      </>
                    )}
                  </div>
                </label>
              </div>
              
              {/* CV Summary Preview */}
              {formData.cvSummary && (
                <div className="mt-3 bg-gray-800/50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">CV Summary:</p>
                  <pre className="text-xs text-gray-300 whitespace-pre-wrap">{formData.cvSummary}</pre>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Cover Letter *</label>
              <textarea
                value={formData.coverLetter}
                onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white h-32"
                placeholder="Tell us why you want to join..."
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Link
                href="/careers"
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 rounded-lg transition-colors text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Continue to Quiz'}
              </button>
            </div>
          </form>

          {/* Help Text */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Need help?{' '}
            <Link href="/contact" className="text-cyan-400 hover:text-cyan-300">
              Contact our recruitment team
            </Link>
          </p>
        </div>
      </div>
      <Footer />

      {/* Custom Notification Modal */}
      {notification.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className={`relative max-w-md w-full mx-4 rounded-xl border p-6 shadow-2xl animate-fade-in-up ${
            notification.type === 'success' 
              ? 'bg-gray-900/95 border-green-500/50' 
              : 'bg-gray-900/95 border-red-500/50'
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
                  ? 'bg-green-500/20 border-2 border-green-500' 
                  : 'bg-red-500/20 border-2 border-red-500'
              }`}>
                {notification.type === 'success' ? (
                  <CheckCircle className="w-8 h-8 text-green-400" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-400" />
                )}
              </div>
            </div>

            {/* Title */}
            <h3 className={`text-xl font-bold text-center mb-2 ${
              notification.type === 'success' ? 'text-green-400' : 'text-red-400'
            }`}>
              {notification.title}
            </h3>

            {/* Message */}
            <p className="text-gray-300 text-center mb-6">
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
                  ? 'bg-green-500 hover:bg-green-600 text-black'
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
            >
              {notification.type === 'success' ? 'Continue to Quiz' : 'Try Again'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
