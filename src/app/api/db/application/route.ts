import { prisma } from '@/lib/prisma';

// POST - Save to PostgreSQL via Prisma
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const application = await prisma.application.create({
      data: {
        candidateId: data.candidateId || 'guest-' + Date.now(),
        position: data.position,
        coverLetter: data.coverLetter,
        expectedSalary: data.expectedSalary,
        startDate: data.startDate,
      },
    });
    
    return Response.json({ 
      success: true, 
      source: 'database',
      data: application 
    });
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ 
      success: false, 
      error: 'Database not connected. Please use LocalStorage or File storage.',
      fallback: true
    }, { status: 503 });
  }
}

// GET - Get all applications from DB
export async function GET() {
  try {
    const applications = await prisma.application.findMany({
      include: {
        candidate: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return Response.json({ 
      success: true, 
      source: 'database',
      data: applications 
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
