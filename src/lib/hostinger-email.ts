/**
 * Hostinger Reach API Integration
 * Email automation untuk recruitment system
 * 
 * API Token: 9wyV3b7O92LbR44fPUcmvDHntj7pp5FFuQU5VitY08f0bc4a
 * Docs: https://developers.hostinger.com
 */

const HOSTINGER_API_TOKEN = process.env.HOSTINGER_API_TOKEN || '9wyV3b7O92LbR44fPUcmvDHntj7pp5FFuQU5VitY08f0bc4a';
const HOSTINGER_API_BASE = 'https://developers.hostinger.com/api';
const FROM_EMAIL = 'recruitment@cyberventuresindonesia.com';
const FROM_NAME = 'Cyber Ventures Indonesia';

export type EmailTemplateType = 
  | 'application_received'
  | 'gate1_passed'
  | 'gate2_passed'
  | 'challenges_completed'
  | 'live_defense_scheduled'
  | 'evaluation_complete'
  | 'rejection'
  | 'offer'
  | 'reminder_48h'
  | 'reminder_1week'
  | 'contact_form_submission'
  | 'newsletter_subscription';

interface EmailTemplate {
  subject: string;
  body: (variables: Record<string, string>) => string;
}

// Email Templates
const emailTemplates: Record<EmailTemplateType, EmailTemplate> = {
  application_received: {
    subject: '📋 Application Received - Cyber Ventures Indonesia',
    body: (vars) => `Dear ${vars.name || 'Candidate'},

Thank you for applying to Cyber Ventures Indonesia! We have received your application for the ${vars.position || 'position'} role.

Your application is now being reviewed. The next step is Gate 1: Basic Security Challenge, where you'll demonstrate your command-line skills.

🎯 Next Steps:
1. Complete Gate 1 (Basic Security Challenge)
2. Pass Gate 2 (Log Analysis Challenge)
3. Solve technical challenges
4. Schedule Live Defense session

Access your assessment portal:
https://cyberventuresindonesia.com/join-us/gate-1

Good luck!

Best regards,
Cyber Ventures Indonesia Recruitment Team

---
This is an automated message. Please do not reply to this email.
For support, contact: recruitment@cyberventuresindonesia.com`
  },

  gate1_passed: {
    subject: '🎉 Gate 1 Complete! Proceed to Gate 2 - Cyber Ventures Indonesia',
    body: (vars) => `Congratulations ${vars.name || 'Candidate'}! 🎉

You have successfully completed Gate 1: Basic Security Challenge!

✅ Challenge Status: PASSED
🚩 Flag Found: ${vars.flag || 'Hidden'}
⏱️ Time: ${vars.timeSpent || 'N/A'}

You're now ready for Gate 2: Log Analysis Challenge

🎯 Gate 2 Overview:
- Analyze security incident logs
- Identify attacker IP and attack vector
- Use grep, awk, and other CLI tools
- Find the hidden flag

🔗 Continue to Gate 2:
https://cyberventuresindonesia.com/join-us/gate-2

Tips:
- Check /logs/access.log and /logs/auth.log
- Look for failed login attempts
- Use: grep "Failed" /logs/auth.log

You're doing great! Keep going!

Best regards,
Cyber Ventures Indonesia Recruitment Team`
  },

  gate2_passed: {
    subject: '🔥 Gate 2 Cleared! Advanced Challenges Await - Cyber Ventures Indonesia',
    body: (vars) => `Excellent work ${vars.name || 'Candidate'}! 🔥

You've successfully analyzed the security incident and cleared Gate 2!

✅ Gate 2 Status: PASSED
🎯 Attacker IP: ${vars.attackerIp || 'Identified'}
⚔️ Attack Vector: ${vars.attackVector || 'Analyzed'}
🚩 Flag: ${vars.flag || 'Found'}

Your technical score is impressive. You're now ready for the hands-on technical challenges.

🎯 Next: Technical Challenges
- Web exploitation
- Cryptography puzzles
- Forensics analysis
- Binary exploitation

🔗 Continue to Challenges:
https://cyberventuresindonesia.com/join-us/challenges

Each challenge you solve brings you closer to the Live Defense session with our security team.

Best regards,
Cyber Ventures Indonesia Recruitment Team`
  },

  challenges_completed: {
    subject: '🏆 Challenges Mastered! Schedule Your Live Defense - Cyber Ventures Indonesia',
    body: (vars) => `Outstanding ${vars.name || 'Candidate'}! 🏆

You've completed the technical challenges with flying colors!

✅ Challenges Completed: ${vars.solvedCount || 'All'}
⭐ Total Score: ${vars.totalScore || 'High'}
🎯 Overall Progress: ${vars.progress || '75%'}

You're now eligible for the final stage: Live Defense

🎯 Live Defense Session:
- Real-time technical interview
- Work through security scenarios
- Meet the team
- Final evaluation

📅 Schedule Your Session:
https://cyberventuresindonesia.com/join-us/live-defense

Available slots are limited. Book early to secure your preferred time.

We look forward to meeting you!

Best regards,
Cyber Ventures Indonesia Recruitment Team`
  },

  live_defense_scheduled: {
    subject: '📅 Live Defense Confirmed - Cyber Ventures Indonesia',
    body: (vars) => `Dear ${vars.name || 'Candidate'},

Your Live Defense session has been scheduled!

📅 Date: ${vars.date || 'TBD'}
🕐 Time: ${vars.time || 'TBD'} (${vars.timezone || 'WIB'})
🔗 Meeting Link: ${vars.meetLink || 'Will be sent 1 hour before session'}

📋 Preparation Checklist:
✅ Stable internet connection
✅ Working microphone and camera
✅ Quiet environment
✅ Review your challenge solutions
✅ Prepare questions about the role

📝 What to Expect:
- Technical discussion (30 mins)
- Scenario-based questions (20 mins)
- Team culture fit (10 mins)
- Your questions (10 mins)

⏰ Please join 5 minutes early.

Need to reschedule? Reply to this email at least 24 hours in advance.

Best regards,
Cyber Ventures Indonesia Recruitment Team`
  },

  evaluation_complete: {
    subject: '✅ Final Evaluation Complete - Cyber Ventures Indonesia',
    body: (vars) => `Dear ${vars.name || 'Candidate'},

Thank you for completing the Live Defense session with our team!

📊 Evaluation Summary:
✅ Technical Assessment: ${vars.technicalScore || 'Completed'}
✅ Problem Solving: ${vars.problemSolving || 'Evaluated'}
✅ Communication: ${vars.communication || 'Assessed'}

Your application is now under final review by our hiring committee.

⏱️ Timeline:
- Decision within 5-7 business days
- You will receive an email with the outcome
- If selected, we'll schedule an offer discussion

We appreciate your time and effort throughout this rigorous process. Your skills are impressive!

Best regards,
Cyber Ventures Indonesia Recruitment Team`
  },

  offer: {
    subject: '🎊 Offer from Cyber Ventures Indonesia!',
    body: (vars) => `Dear ${vars.name || 'Candidate'},

Congratulations! 🎊

We are pleased to offer you a position at Cyber Ventures Indonesia!

💼 Position: ${vars.position || 'Security Analyst'}
📍 Location: Jakarta, Indonesia (Hybrid)
💰 Compensation: ${vars.salary || 'Competitive'}
🗓️ Start Date: ${vars.startDate || 'Negotiable'}

📋 Next Steps:
1. Review attached offer letter
2. Sign and return within 5 business days
3. Complete background check
4. Set up onboarding session

🎁 Benefits Include:
- Competitive salary
- Health insurance
- Professional development budget
- Flexible working hours
- Latest security tools and equipment

We are excited to have you join our elite security team!

Please reply to confirm receipt and schedule a call to discuss the offer details.

Welcome to Cyber Ventures Indonesia! 🚀

Best regards,
${vars.hiringManager || 'Hiring Team'}
Cyber Ventures Indonesia`
  },

  rejection: {
    subject: 'Update on Your Application - Cyber Ventures Indonesia',
    body: (vars) => `Dear ${vars.name || 'Candidate'},

Thank you for your interest in Cyber Ventures Indonesia and for investing your time in our recruitment process.

After careful consideration of your application and assessment results, we have decided not to move forward with your candidacy at this time.

🔒 Data Retention:
Your application data will be automatically deleted from our systems after 6 months, in compliance with data protection regulations.

💼 Future Opportunities:
We encourage you to apply again in the future after gaining more experience. Our challenges are designed to be tough - even experienced professionals sometimes need multiple attempts.

🎯 Recommended Skills to Develop:
- Advanced penetration testing
- Log analysis and SIEM tools
- Cloud security (AWS/Azure)
- Incident response

We wish you the best in your cybersecurity career journey.

Best regards,
Cyber Ventures Indonesia Recruitment Team`
  },

  reminder_48h: {
    subject: '⏰ Reminder: Continue Your Assessment - Cyber Ventures Indonesia',
    body: (vars) => `Hi ${vars.name || 'Candidate'},

We noticed you haven't made progress on your assessment in the last 48 hours.

🚦 Current Status:
📍 Gate: ${vars.currentGate || 'Unknown'}
⏱️ Last Activity: 48+ hours ago

⚡ Don't lose momentum!
The assessment remains open, and we'd love to see you complete it.

🔗 Resume Where You Left Off:
https://cyberventuresindonesia.com/join-us/${vars.currentGate || 'gate-1'}

💡 Need Help?
- Check the hints available in each gate
- Review the instructions carefully
- Email us if you encounter technical issues

Remember: There's no time limit. Take your time, but don't give up!

Best regards,
Cyber Ventures Indonesia Recruitment Team`
  },

  reminder_1week: {
    subject: '📢 Still Interested? Your Assessment Awaits - Cyber Ventures Indonesia',
    body: (vars) => `Hi ${vars.name || 'Candidate'},

It's been a week since your last activity on the assessment.

We understand life gets busy, but we wanted to check in:

🤔 Are you still interested in joining Cyber Ventures Indonesia?

Your application and progress are still saved. You can resume anytime:
https://cyberventuresindonesia.com/join-us/${vars.currentGate || 'gate-1'}

⚠️ Note: Applications with no activity for 30 days may be automatically closed.

If you're no longer interested, no worries! We'll automatically close your application and delete your data after the retention period.

Questions? Just reply to this email.

Best regards,
Cyber Ventures Indonesia Recruitment Team`
  },

  contact_form_submission: {
    subject: '📬 New Contact Form Submission - Cyber Ventures Indonesia',
    body: (vars) => `New contact form submission received:

👤 Name: ${vars.name || 'Not provided'}
📧 Email: ${vars.email || 'Not provided'}
🏢 Company: ${vars.company || 'Not provided'}
📱 Phone: ${vars.phone || 'Not provided'}
🎯 Service Interest: ${vars.service || 'Not specified'}

💬 Message:
${vars.message || 'No message provided'}

---
This is an automated notification from the contact form on cyberventuresindonesia.com`
  },

  newsletter_subscription: {
    subject: '✅ Subscribed to Cyber Ventures Threat Alerts',
    body: (vars) => `Hi ${vars.email || 'Subscriber'},

Thank you for subscribing to Cyber Ventures Indonesia Threat Alerts!

🎉 You're now part of our security community.

What you'll receive:
• Critical vulnerability alerts
• Emerging threat intelligence
• Security best practices
• Industry insights and reports

📧 Your subscription email: ${vars.email || 'your email'}

🔗 Unsubscribe anytime: https://cyberventuresindonesia.com/unsubscribe

Stay secure,
Cyber Ventures Indonesia Team`
  }
};

/**
 * Send email using Hostinger Reach API
 */
export async function sendEmail(
  to: string,
  templateType: EmailTemplateType,
  variables: Record<string, string>
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const template = emailTemplates[templateType];
    if (!template) {
      throw new Error(`Email template '${templateType}' not found`);
    }

    const subject = template.subject;
    const body = template.body(variables);

    // Call Hostinger Reach API
    const response = await fetch(`${HOSTINGER_API_BASE}/email/send`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HOSTINGER_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: to,
        subject: subject,
        body: body,
        from: FROM_EMAIL,
        from_name: FROM_NAME,
        // Optional: HTML version
        html: body.replace(/\n/g, '<br>'),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    const result = await response.json();
    
    // Log to console for development
    console.log(`✅ Email sent: ${templateType} to ${to}`);
    console.log(`   Message ID: ${result.messageId || result.id}`);

    return {
      success: true,
      messageId: result.messageId || result.id,
    };

  } catch (error) {
    console.error(`❌ Failed to send email (${templateType}):`, error);
    
    // Return error but don't throw - allow graceful degradation
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send multiple emails in batch
 */
export async function sendBatchEmails(
  emails: Array<{
    to: string;
    template: EmailTemplateType;
    variables: Record<string, string>;
  }>
): Promise<Array<{ to: string; success: boolean; error?: string }>> {
  const results = await Promise.all(
    emails.map(async ({ to, template, variables }) => {
      const result = await sendEmail(to, template, variables);
      return {
        to,
        success: result.success,
        error: result.error,
      };
    })
  );

  return results;
}

/**
 * Queue email for later sending (with retry logic)
 * In production, this would use a queue like Bull or Asynq
 */
export async function queueEmail(
  to: string,
  templateType: EmailTemplateType,
  variables: Record<string, string>,
  delayMinutes?: number
): Promise<{ queued: boolean; jobId?: string }> {
  // For now, immediate send
  // TODO: Implement queue system with Redis/Bull
  const result = await sendEmail(to, templateType, variables);
  
  return {
    queued: result.success,
    jobId: result.messageId,
  };
}

/**
 * Trigger email based on recruitment event
 */
export async function triggerRecruitmentEmail(
  event: 'application' | 'gate_pass' | 'challenge_complete' | 'live_defense_schedule' | 'evaluation' | 'offer' | 'rejection',
  candidateData: {
    email: string;
    name: string;
    position?: string;
    currentGate?: string;
    flag?: string;
    attackerIp?: string;
    attackVector?: string;
    score?: string;
    solvedCount?: string;
    timeSpent?: string;
  }
): Promise<void> {
  const variables: Record<string, string> = {
    name: candidateData.name,
    email: candidateData.email,
    position: candidateData.position || 'Security Analyst',
  };

  let templateType: EmailTemplateType;

  switch (event) {
    case 'application':
      templateType = 'application_received';
      break;
    case 'gate_pass':
      if (candidateData.currentGate === '1') {
        templateType = 'gate1_passed';
        variables.flag = candidateData.flag || '';
        variables.timeSpent = candidateData.timeSpent || '';
      } else if (candidateData.currentGate === '2') {
        templateType = 'gate2_passed';
        variables.flag = candidateData.flag || '';
        variables.attackerIp = candidateData.attackerIp || '';
        variables.attackVector = candidateData.attackVector || '';
      } else {
        return; // Unknown gate
      }
      break;
    case 'challenge_complete':
      templateType = 'challenges_completed';
      variables.solvedCount = candidateData.solvedCount || '';
      variables.totalScore = candidateData.score || '';
      variables.progress = '75%';
      break;
    case 'live_defense_schedule':
      templateType = 'live_defense_scheduled';
      break;
    case 'evaluation':
      templateType = 'evaluation_complete';
      variables.technicalScore = candidateData.score || '';
      break;
    case 'offer':
      templateType = 'offer';
      break;
    case 'rejection':
      templateType = 'rejection';
      break;
    default:
      return;
  }

  await sendEmail(candidateData.email, templateType, variables);
}

/**
 * Test email configuration
 */
export async function testEmailConfiguration(): Promise<{ 
  valid: boolean; 
  message?: string;
  error?: string;
}> {
  try {
    // Simple API test - get account info
    const response = await fetch(`${HOSTINGER_API_BASE}/account`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${HOSTINGER_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API test failed: HTTP ${response.status}`);
    }

    const data = await response.json();
    
    return {
      valid: true,
      message: `Connected to Hostinger. Account: ${data.email || 'Unknown'}`,
    };

  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Configuration test failed',
    };
  }
}

// Export for use in API routes
export { emailTemplates, HOSTINGER_API_TOKEN, FROM_EMAIL };
