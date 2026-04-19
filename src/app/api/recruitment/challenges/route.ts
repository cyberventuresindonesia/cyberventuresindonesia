import { NextRequest, NextResponse } from 'next/server';
import { ChallengeDB } from '@/lib/db';

// POST /api/recruitment/challenges
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const required = ['candidateId', 'solved', 'totalScore'];
    for (const field of required) {
      if (data[field] === undefined) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    const success = await ChallengeDB.saveProgress(data);
    
    if (success) {
      return NextResponse.json(
        { success: true, message: 'Challenge progress saved' },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to save challenge progress' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error saving challenge progress:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save challenge progress' },
      { status: 500 }
    );
  }
}
