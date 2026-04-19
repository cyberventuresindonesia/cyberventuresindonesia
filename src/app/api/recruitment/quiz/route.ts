import { NextRequest, NextResponse } from 'next/server';
import { QuizDB } from '@/lib/db';

// POST /api/recruitment/quiz
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const required = ['candidateId', 'score', 'total', 'percentage', 'passed'];
    for (const field of required) {
      if (data[field] === undefined) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    const success = await QuizDB.saveResult(data);
    
    if (success) {
      return NextResponse.json(
        { success: true, message: 'Quiz result saved' },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to save quiz result' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error saving quiz result:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save quiz result' },
      { status: 500 }
    );
  }
}
