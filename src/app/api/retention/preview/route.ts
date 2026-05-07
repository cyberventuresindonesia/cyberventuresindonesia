/**
 * API Route: Preview Cleanup
 * GET /api/retention/preview
 * 
 * Returns what data would be cleaned up based on current policy
 */

import { NextResponse } from 'next/server';
import { previewCleanup } from '@/lib/data-retention';

export async function GET() {
  try {
    const preview = await previewCleanup();
    
    return NextResponse.json({
      preview,
      summary: {
        totalItems: 
          preview.rejectedCandidates +
          preview.inactiveApplications +
          preview.oldCVFiles +
          preview.challengeLogs +
          preview.emailLogs +
          preview.hiredToArchive,
        willDelete: 
          preview.rejectedCandidates +
          preview.inactiveApplications +
          preview.oldCVFiles +
          preview.challengeLogs +
          preview.emailLogs,
        willArchive: preview.hiredToArchive,
      },
      message: 'This is a preview only. No data has been deleted.',
    });

  } catch (error) {
    console.error('Preview cleanup error:', error);
    return NextResponse.json(
      { error: 'Failed to generate preview' },
      { status: 500 }
    );
  }
}
