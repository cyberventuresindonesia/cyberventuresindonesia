import { prisma } from '@/lib/prisma';

// POST - Save quiz attempt
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const attempt = await prisma.quizAttempt.create({
      data: {
        candidateId: data.candidateId || 'guest-' + Date.now(),
        totalScore: data.score,
        maxPossible: data.maxPossible,
        percentage: data.percentage,
        passed: data.passed,
      },
    });
    
    return Response.json({ 
      success: true, 
      source: 'database',
      data: attempt 
    });
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ 
      success: false, 
      error: 'Database not connected',
      fallback: true
    }, { status: 503 });
  }
}

// GET - Get quiz attempts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const candidateId = searchParams.get('candidateId');
    
    const attempts = await prisma.quizAttempt.findMany({
      where: candidateId ? { candidateId } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return Response.json({ 
      success: true, 
      source: 'database',
      data: attempts 
    });
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ 
      success: false, 
      error: 'Database not connected',
      data: [],
      fallback: true
    }, { status: 503 });
  }
}
