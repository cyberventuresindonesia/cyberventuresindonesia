import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(process.cwd(), 'data');
const QUIZ_FILE = join(DATA_DIR, 'quiz-results.json');

async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
}

async function readQuizResults() {
  try {
    await ensureDataDir();
    const data = await readFile(QUIZ_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeQuizResults(data: any[]) {
  await ensureDataDir();
  await writeFile(QUIZ_FILE, JSON.stringify(data, null, 2));
}

// POST - Save quiz result
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const results = await readQuizResults();
    
    const newResult = {
      id: Date.now().toString(),
      ...data,
      completedAt: new Date().toISOString(),
    };
    
    results.push(newResult);
    await writeQuizResults(results);
    
    return Response.json({ 
      success: true, 
      source: 'file',
      data: newResult 
    });
  } catch (error) {
    console.error('Error saving quiz result:', error);
    return Response.json({ 
      success: false, 
      error: 'Failed to save quiz result' 
    }, { status: 500 });
  }
}

// GET - Get all quiz results
export async function GET() {
  try {
    const results = await readQuizResults();
    return Response.json({ 
      success: true, 
      source: 'file',
      data: results 
    });
  } catch (error) {
    console.error('Error reading quiz results:', error);
    return Response.json({ 
      success: false, 
      error: 'Failed to read quiz results',
      data: [] 
    }, { status: 500 });
  }
}
