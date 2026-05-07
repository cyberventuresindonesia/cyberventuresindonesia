/**
 * API Route: Execute Command in Sandbox Container
 * POST /api/sandbox/execute
 */

import { NextRequest, NextResponse } from 'next/server';
import { executeCommand, getContainerByCandidate } from '@/lib/docker-sandbox';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { candidateId, command } = body;

    // Validate required fields
    if (!candidateId || !command) {
      return NextResponse.json(
        { error: 'Missing required fields: candidateId, command' },
        { status: 400 }
      );
    }

    // Find container by candidate
    const container = getContainerByCandidate(candidateId);
    if (!container) {
      return NextResponse.json(
        { error: 'No active container found. Please provision a lab first.' },
        { status: 404 }
      );
    }

    // Execute command
    const result = await executeCommand(container.id, command);

    return NextResponse.json({
      success: result.success,
      output: result.output,
      error: result.error,
      violation: result.violation,
      container: {
        id: container.id,
        status: container.status,
        expiresAt: container.expiresAt,
        flagsCaptured: container.flagsCaptured,
        flagsRemaining: 3 - container.flagsCaptured.length, // Assuming 3 flags per lab
      }
    });

  } catch (error) {
    console.error('Sandbox execute error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
