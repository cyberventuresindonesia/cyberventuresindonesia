/**
 * Email Automation System for Cyber Ventures
 * Sends automated emails at various recruitment stages
 */

export interface EmailData {
  to: string;
  candidateName: string;
  position: string;
  date: string;
  time: string;
  timezone: string;
  telegramUsername: string;
  googleMeetLink?: string;
}

/**
 * Generate email content for Live Defense scheduling
 */
export const generateLiveDefenseEmail = (data: EmailData) => {
  const subject = `Live Defense Scheduled – Cyber Security Screening Confirmation - ${data.candidateName}`;
  
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Live Defense Scheduled</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #00d4ff, #0099cc); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
    .detail-box { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #00d4ff; border-radius: 4px; }
    .meet-link { background: #00d4ff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
    ul { padding-left: 20px; }
    li { margin: 10px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🛡️ Live Defense Scheduled!</h1>
      <p>Your final recruitment stage is confirmed</p>
    </div>
    
    <div class="content">
      <p>Hello <strong>${data.candidateName}</strong>,</p>
      
      <p>Congratulations on completing Gates 1-3! Your Live Defense session has been scheduled:</p>
      
      <div class="detail-box">
        <h3>📅 Interview Details</h3>
        <p><strong>Position:</strong> ${data.position}</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Time:</strong> ${data.time} (${data.timezone})</p>
        <p><strong>Duration:</strong> 60 minutes</p>
        <p><strong>Platform:</strong> Google Meet</p>
        <p><strong>Telegram:</strong> @${data.telegramUsername}</p>
      </div>
      
      <div style="text-align: center;">
        <a href="${data.googleMeetLink || 'https://meet.google.com/landing'}" class="meet-link">
          🔗 Join Google Meet
        </a>
      </div>
      
      <h3>🎯 What to Expect</h3>
      <ul>
        <li><strong>60-minute</strong> incident response simulation with real SIEM dashboard</li>
        <li><strong>Real-time</strong> access to security incidents and threat analysis</li>
        <li><strong>Expert evaluation</strong> by our senior security team</li>
        <li><strong>Technical discussion</strong> and Q&A session about your approach</li>
        <li><strong>Scenario-based</strong> challenges testing your incident response skills</li>
      </ul>
      
      <h3>📋 Please Prepare</h3>
      <ul>
        <li>✅ <strong>Stable internet connection</strong> (minimum 10 Mbps)</li>
        <li>✅ <strong>Working microphone and camera</strong></li>
        <li>✅ <strong>Quiet environment</strong> without distractions</li>
        <li>✅ <strong>Review incident response methodologies</strong></li>
        <li>✅ <strong>Prepare questions</strong> about the role and team</li>
      </ul>
      
      <div class="detail-box" style="border-left-color: #ff9800;">
        <h3>🔐 SIEM Access</h3>
        <p>You will receive SIEM dashboard access credentials <strong>24 hours before</strong> your session via separate email.</p>
      </div>
      
      <h3>📞 Contact & Support</h3>
      <p>If you need to reschedule or have any questions:</p>
      <ul>
        <li>Email: recruitment@cyber-ventures.id</li>
        <li>Telegram: @CyberVenturesHR</li>
        <li>Response time: 24-48 hours</li>
      </ul>
      
      <div style="background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 0;"><strong>💡 Pro Tip:</strong> Join the meeting 5 minutes early to test your audio and video setup.</p>
      </div>
    </div>
    
    <div class="footer">
      <p><strong>Cyber Ventures Indonesia</strong></p>
      <p>Building Indonesia's Elite Cybersecurity Team</p>
      <p style="margin-top: 20px;">This is an automated email. Please do not reply directly to this message.</p>
    </div>
  </div>
</body>
</html>
  `;
  
  const textContent = `
Live Defense Scheduled – Cyber Security Screening Confirmation

Hello ${data.candidateName},

Congratulations on completing Gates 1-3! Your Live Defense session has been scheduled:

INTERVIEW DETAILS:
- Position: ${data.position}
- Date: ${data.date}
- Time: ${data.time} (${data.timezone})
- Duration: 60 minutes
- Platform: Google Meet
- Telegram: @${data.telegramUsername}
- Meet Link: ${data.googleMeetLink || 'https://meet.google.com/landing'}

WHAT TO EXPECT:
• 60-minute incident response simulation with real SIEM dashboard
• Real-time access to security incidents and threat analysis
• Expert evaluation by our senior security team
• Technical discussion and Q&A session
• Scenario-based challenges

PLEASE PREPARE:
✓ Stable internet connection (minimum 10 Mbps)
✓ Working microphone and camera
✓ Quiet environment without distractions
✓ Review incident response methodologies
✓ Prepare questions about the role

SIEM ACCESS:
You will receive SIEM dashboard access credentials 24 hours before your session.

CONTACT & SUPPORT:
- Email: recruitment@cyber-ventures.id
- Telegram: @CyberVenturesHR
- Response time: 24-48 hours

💡 Pro Tip: Join the meeting 5 minutes early to test your audio and video.

---
Cyber Ventures Indonesia
Building Indonesia's Elite Cybersecurity Team

This is an automated email. Please do not reply directly.
  `;
  
  return { subject, htmlContent, textContent };
};

/**
 * Mock email sender - in production, this would call an email API
 */
export const sendEmail = async (emailData: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
    // In production, this would call an API endpoint like:
    // const response = await fetch('/api/send-email', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(emailData)
    // });
    
    // For now, we'll store in localStorage and show in console
    const email = generateLiveDefenseEmail(emailData);
    
    const sentEmail = {
      ...emailData,
      ...email,
      sentAt: new Date().toISOString(),
      id: Date.now().toString(),
    };
    
    // Store in localStorage for demo purposes
    const existingEmails = JSON.parse(localStorage.getItem('sentEmails') || '[]');
    existingEmails.push(sentEmail);
    localStorage.setItem('sentEmails', JSON.stringify(existingEmails));
    
    // Log for debugging
    console.log('📧 Email would be sent:', email);
    
    return { 
      success: true, 
      message: 'Email queued successfully. In production, this would be sent via SendGrid/AWS SES.' 
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, message: 'Failed to queue email' };
  }
};

/**
 * Generate ICS calendar invite content
 */
export const generateCalendarInvite = (data: EmailData) => {
  const startDate = new Date(`${data.date}T${data.time}`);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 60 minutes
  
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };
  
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Cyber Ventures//Live Defense//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
DTSTAMP:${formatDate(new Date())}
UID:cyber-ventures-live-defense-${Date.now()}@cyber-ventures.id
ORGANIZER;CN=Cyber Ventures Recruitment:mailto:recruitment@cyber-ventures.id
ATTENDEE;CN=${data.candidateName}:mailto:${data.to}
SUMMARY:Cyber Ventures - Live Defense Session - ${data.candidateName}
DESCRIPTION:60-minute incident response simulation with real SIEM dashboard. Expert evaluation by senior security team.\\n\\nPlatform: Google Meet\\nLink: ${data.googleMeetLink || 'https://meet.google.com/landing'}\\n\\nTelegram: @${data.telegramUsername}
LOCATION:Google Meet (link will be sent 24h before)
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:Live Defense Interview in 30 minutes
TRIGGER:-PT30M
END:VALARM
END:VEVENT
END:VCALENDAR`;
};

export default {
  generateLiveDefenseEmail,
  sendEmail,
  generateCalendarInvite,
};
