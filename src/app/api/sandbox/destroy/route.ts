/**
 * API Route: Destroy Sandbox Container
 * POST /api/sandbox/destroy
 */

import { NextRequest, NextResponse } from 'next/server';
import { getContainerByCandidate, destroyContainer } from '@/lib/docker-sandbox';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { candidateId, reason } = body;

    // Validate required fields
    if (!candidateId) {
      return NextResponse.json(
        { error: 'Missing required field: candidateId' },
        { status: 400 }
      );
    }

    // Find container
    const container = getContainerByCandidate(candidateId);
    if (!container) {
      return NextResponse.json(
        { error: 'No active container found' },
        { status: 404 }
      );
    }

    // Destroy container
    await destroyContainer(
      container.id, 
      reason || 'User requested destruction'
    );

    return NextResponse.json({
      success: true,
      message: 'Container destroyed successfully',
      containerId: container.id,
      archived: {
        flagsCaptured: container.flagsCaptured,
        commandsExecuted: container.commandsExecuted.length,
        violations: container.violations,
      }
    });

  } catch (error) {
    console.error('Sandbox destroy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
