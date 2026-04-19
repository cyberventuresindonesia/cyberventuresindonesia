import { NextRequest, NextResponse } from 'next/server';
import { LiveDefenseDB } from '@/lib/db';

// POST /api/recruitment/live-defense
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const required = ['candidateId', 'preferredDate', 'preferredTime', 'timezone'];
    for (const field of required) {
      if (!data[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    const success = await LiveDefenseDB.schedule(data);
    
    if (success) {
      return NextResponse.json(
        { success: true, message: 'Live defense scheduled' },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to schedule live defense' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error scheduling live defense:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to schedule live defense' },
      { status: 500 }
    );
  }
}
