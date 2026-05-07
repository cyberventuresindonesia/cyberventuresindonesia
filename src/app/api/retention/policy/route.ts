/**
 * API Route: Data Retention Policy
 * GET /api/retention/policy - Get current policy
 * POST /api/retention/policy - Update policy
 */

import { NextRequest, NextResponse } from 'next/server';
import { getRetentionPolicy, saveRetentionPolicy, defaultRetentionPolicy, previewCleanup } from '@/lib/data-retention';

// GET - Get current retention policy
export async function GET() {
  try {
    const policy = await getRetentionPolicy();
    const preview = await previewCleanup();
    
    return NextResponse.json({
      policy,
      preview,
      default: defaultRetentionPolicy,
    });
  } catch (error) {
    console.error('Get retention policy error:', error);
    return NextResponse.json(
      { error: 'Failed to get retention policy' },
      { status: 500 }
    );
  }
}

// POST - Update retention policy
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate policy values
    const {
      rejectedCandidatesDays,
      cvFilesDays,
      inactiveApplicationsDays,
      challengeLogsDays,
      emailLogsDays,
      autoCleanupEnabled,
      cleanupSchedule,
    } = body;

    // Validation rules
    if (rejectedCandidatesDays < 30 || rejectedCandidatesDays > 365) {
      return NextResponse.json(
        { error: 'rejectedCandidatesDays must be between 30 and 365' },
        { status: 400 }
      );
    }

    if (cvFilesDays < 90 || cvFilesDays > 730) {
      return NextResponse.json(
        { error: 'cvFilesDays must be between 90 and 730' },
        { status: 400 }
      );
    }

    if (inactiveApplicationsDays < 7 || inactiveApplicationsDays > 90) {
      return NextResponse.json(
        { error: 'inactiveApplicationsDays must be between 7 and 90' },
        { status: 400 }
      );
    }

    // Validate cron expression (basic check)
    if (cleanupSchedule && !isValidCronExpression(cleanupSchedule)) {
      return NextResponse.json(
        { error: 'Invalid cron expression format' },
        { status: 400 }
      );
    }

    const newPolicy = {
      rejectedCandidatesDays: rejectedCandidatesDays ?? defaultRetentionPolicy.rejectedCandidatesDays,
      cvFilesDays: cvFilesDays ?? defaultRetentionPolicy.cvFilesDays,
      inactiveApplicationsDays: inactiveApplicationsDays ?? defaultRetentionPolicy.inactiveApplicationsDays,
      challengeLogsDays: challengeLogsDays ?? defaultRetentionPolicy.challengeLogsDays,
      emailLogsDays: emailLogsDays ?? defaultRetentionPolicy.emailLogsDays,
      autoCleanupEnabled: autoCleanupEnabled ?? defaultRetentionPolicy.autoCleanupEnabled,
      cleanupSchedule: cleanupSchedule ?? defaultRetentionPolicy.cleanupSchedule,
    };

    await saveRetentionPolicy(newPolicy);

    return NextResponse.json({
      success: true,
      policy: newPolicy,
      message: 'Retention policy updated successfully',
    });

  } catch (error) {
    console.error('Update retention policy error:', error);
    return NextResponse.json(
      { error: 'Failed to update retention policy' },
      { status: 500 }
    );
  }
}

/**
 * Basic cron expression validation
 */
function isValidCronExpression(cron: string): boolean {
  // Simple validation: 5 fields (minute hour day month weekday)
  const parts = cron.split(' ');
  if (parts.length !== 5) return false;
  
  // Basic pattern check
  const validPattern = /^[\d*,/-]+$/;
  return parts.every(part => validPattern.test(part) || part === '*');
}
