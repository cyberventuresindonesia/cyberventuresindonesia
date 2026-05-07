/**
 * API Route: Run Data Cleanup Job
 * POST /api/retention/cleanup
 * 
 * Run manual cleanup or trigger scheduled cleanup
 */

import { NextRequest, NextResponse } from 'next/server';
import { runDataCleanup, getCleanupStatus } from '@/lib/data-retention';

export async function POST(request: NextRequest) {
  try {
    const { dryRun = false } = await request.json();
    
    // Check if cleanup is already running
    const status = getCleanupStatus();
    if (status.current) {
      return NextResponse.json(
        { 
          error: 'Cleanup job already running',
          jobId: status.current.id,
          startedAt: status.current.startedAt
        },
        { status: 409 }
      );
    }

    // If dry run, just return preview (TODO: implement preview)
    if (dryRun) {
      return NextResponse.json({
        dryRun: true,
        message: 'Dry run - would cleanup expired data',
        preview: {
          rejectedCandidates: 0,
          inactiveApplications: 0,
          oldCVFiles: 0,
          challengeLogs: 0,
          emailLogs: 0,
          hiredToArchive: 0,
        }
      });
    }

    // Run cleanup (async, don't wait for completion)
    const job = runDataCleanup();
    
    return NextResponse.json({
      success: true,
      message: 'Cleanup job started',
      jobId: (await job).id,
      status: 'running',
    });

  } catch (error) {
    console.error('Cleanup API error:', error);
    return NextResponse.json(
      { error: 'Failed to start cleanup job' },
      { status: 500 }
    );
  }
}

// GET - Get cleanup status
export async function GET() {
  const status = getCleanupStatus();
  
  return NextResponse.json({
    current: status.current,
    last: status.last,
  });
}
