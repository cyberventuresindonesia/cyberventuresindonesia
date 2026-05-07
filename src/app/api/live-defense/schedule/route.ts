/**
 * API Route: Schedule Live Defense Session
 * POST /api/live-defense/schedule
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      candidateEmail, 
      candidateName, 
      position,
      preferredDate, 
      preferredTime, 
      timezone, 
      notes 
    } = body;

    // Validate required fields
    if (!candidateEmail || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate Google Meet link (in production, use Google Calendar API)
    const meetLink = `https://meet.google.com/cvi-${Date.now().toString(36).slice(-6)}`;
    
    // Generate SIEM credentials for the session
    const siemCredentials = {
      username: `candidate_${Date.now().toString(36).slice(-4)}`,
      password: Math.random().toString(36).slice(-8),
    };

    // Create session data
    const session = {
      id: `ld-${Date.now()}`,
      candidateEmail,
      candidateName: candidateName || 'Candidate',
      position: position || 'Security Analyst',
      preferredDate,
      preferredTime,
      timezone: timezone || 'WIB',
      notes,
      meetLink,
      siemCredentials,
      status: 'SCHEDULED',
      createdAt: new Date().toISOString(),
      remindersSent: {
        h24: false,
        h1: false,
      }
    };

    // In production: Save to database
    // await db.liveDefenseSchedule.create({ data: session });

    // Save to session store
    const { addSession } = await import('../sessions/route');
    addSession(session);
    
    // Send email notification to candidate using direct sendEmail
    const { sendEmail } = await import('@/lib/hostinger-email');
    
    await sendEmail(candidateEmail, 'live_defense_scheduled', {
      name: candidateName || 'Candidate',
      date: preferredDate,
      time: preferredTime,
      timezone: timezone || 'WIB',
      meetLink,
    });

    // Send email notification to admin
    await sendEmail('recruitment@cyberventuresindonesia.com', 'live_defense_scheduled', {
      name: 'Admin',
      date: preferredDate,
      time: preferredTime,
      timezone: timezone || 'WIB',
      meetLink: `Candidate: ${candidateName || 'Unknown'} - ${meetLink}`,
    });

    return NextResponse.json({
      success: true,
      session,
      message: 'Live defense session scheduled successfully',
    });

  } catch (error) {
    console.error('Live defense scheduling error:', error);
    return NextResponse.json(
      { error: 'Failed to schedule session' },
      { status: 500 }
    );
  }
}
