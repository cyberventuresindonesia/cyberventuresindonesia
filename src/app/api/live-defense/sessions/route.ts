/**
 * API Route: Manage Live Defense Sessions
 * GET /api/live-defense/sessions - Get all sessions
 * POST /api/live-defense/sessions - Update session status
 */

import { NextRequest, NextResponse } from 'next/server';

// In-memory store for sessions (replace with database in production)
const sessionsStore: Map<string, any> = new Map();

// GET - Retrieve all sessions or filter by status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const candidateEmail = searchParams.get('candidateEmail');
    
    let sessions = Array.from(sessionsStore.values());
    
    // Filter by status if provided
    if (status) {
      sessions = sessions.filter(s => s.status === status);
    }
    
    // Filter by candidate email if provided
    if (candidateEmail) {
      sessions = sessions.filter(s => s.candidateEmail === candidateEmail);
    }
    
    // Sort by scheduled date
    sessions.sort((a, b) => new Date(a.preferredDate).getTime() - new Date(b.preferredDate).getTime());
    
    return NextResponse.json({
      success: true,
      sessions,
      total: sessions.length,
    });

  } catch (error) {
    console.error('Get sessions error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve sessions' },
      { status: 500 }
    );
  }
}

// POST - Update session status or add evaluation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, status, evaluation } = body;
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }
    
    const session = sessionsStore.get(sessionId);
    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }
    
    // Update status
    if (status) {
      session.status = status;
      session.updatedAt = new Date().toISOString();
    }
    
    // Add evaluation
    if (evaluation) {
      session.evaluation = {
        ...evaluation,
        evaluatedAt: new Date().toISOString(),
      };
      session.status = 'COMPLETED';
    }
    
    sessionsStore.set(sessionId, session);
    
    return NextResponse.json({
      success: true,
      session,
      message: 'Session updated successfully',
    });

  } catch (error) {
    console.error('Update session error:', error);
    return NextResponse.json(
      { error: 'Failed to update session' },
      { status: 500 }
    );
  }
}

// Helper function to add a session (called from schedule route)
export function addSession(session: any) {
  sessionsStore.set(session.id, session);
}

// Helper function to get a session
export function getSession(sessionId: string) {
  return sessionsStore.get(sessionId);
}
