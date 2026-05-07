/**
 * API Route: Send Live Defense Reminders
 * POST /api/live-defense/reminders
 * 
 * Sends reminder emails for upcoming sessions
 * - 24 hours before
 * - 1 hour before
 */

import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/hostinger-email';

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const force = searchParams.get('force') === 'true'; // Force send all reminders (for testing)
    
    // Import sessions from the sessions route
    const { getSession } = await import('../sessions/route');
    
    // In production, fetch from database
    // const upcomingSessions = await db.liveDefenseSchedule.findMany({
    //   where: { status: 'SCHEDULED' }
    // });
    
    const remindersSent = {
      h24: 0,
      h1: 0,
      total: 0,
    };

    // Mock data for demonstration - in production, fetch actual sessions
    const now = new Date();
    const mockSessions = [
      {
        id: 'ld-test-1',
        candidateEmail: 'test@example.com',
        candidateName: 'Test Candidate',
        preferredDate: new Date(now.getTime() + 23 * 60 * 60 * 1000).toISOString().split('T')[0], // 23 hours from now
        preferredTime: '10:00',
        timezone: 'WIB',
        meetLink: 'https://meet.google.com/test',
        remindersSent: { h24: false, h1: false },
      }
    ];

    for (const session of mockSessions) {
      const sessionDate = new Date(`${session.preferredDate}T${session.preferredTime}`);
      const hoursUntilSession = (sessionDate.getTime() - now.getTime()) / (1000 * 60 * 60);

      // 24-hour reminder
      if ((hoursUntilSession <= 24 && hoursUntilSession > 23 && !session.remindersSent.h24) || force) {
        await sendEmail(session.candidateEmail, 'live_defense_scheduled', {
          name: session.candidateName,
          date: session.preferredDate,
          time: session.preferredTime,
          timezone: session.timezone,
          meetLink: session.meetLink,
          notes: 'REMINDER: Your Live Defense session is in 24 hours!',
        });
        
        session.remindersSent.h24 = true;
        remindersSent.h24++;
        remindersSent.total++;
        
        console.log(`📧 24h reminder sent to ${session.candidateEmail}`);
      }

      // 1-hour reminder
      if ((hoursUntilSession <= 1 && hoursUntilSession > 0 && !session.remindersSent.h1) || force) {
        await sendEmail(session.candidateEmail, 'live_defense_scheduled', {
          name: session.candidateName,
          date: session.preferredDate,
          time: session.preferredTime,
          timezone: session.timezone,
          meetLink: session.meetLink,
          notes: 'REMINDER: Your Live Defense session starts in 1 hour!',
        });
        
        session.remindersSent.h1 = true;
        remindersSent.h1++;
        remindersSent.total++;
        
        console.log(`📧 1h reminder sent to ${session.candidateEmail}`);
      }
    }

    return NextResponse.json({
      success: true,
      remindersSent,
      message: `Sent ${remindersSent.total} reminders (${remindersSent.h24} x 24h, ${remindersSent.h1} x 1h)`,
    });

  } catch (error) {
    console.error('Send reminders error:', error);
    return NextResponse.json(
      { error: 'Failed to send reminders' },
      { status: 500 }
    );
  }
}

// GET - Check reminder status
export async function GET() {
  return NextResponse.json({
    message: 'Reminder system is active',
    scheduledReminders: [
      { type: '24h', description: 'Sent 24 hours before session' },
      { type: '1h', description: 'Sent 1 hour before session' },
    ],
    nextCheck: 'Every 15 minutes (cron job)',
  });
}
