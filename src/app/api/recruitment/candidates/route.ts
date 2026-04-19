import { NextRequest, NextResponse } from 'next/server';
import { CandidateDB } from '@/lib/db';

// GET /api/recruitment/candidates
export async function GET() {
  try {
    const candidates = await CandidateDB.getAll();
    return NextResponse.json({ success: true, candidates });
  } catch (error) {
    console.error('Error fetching candidates:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch candidates' },
      { status: 500 }
    );
  }
}

// POST /api/recruitment/candidates
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const required = ['fullName', 'email', 'phoneNumber', 'telegramUsername', 'position', 'yearsExperience', 'coverLetter'];
    for (const field of required) {
      if (!data[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    const result = await CandidateDB.create(data);
    
    if (result.success) {
      return NextResponse.json(
        { success: true, candidate: result.data },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error creating candidate:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create candidate' },
      { status: 500 }
    );
  }
}
