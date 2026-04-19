import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(process.cwd(), 'data');
const APPLICATIONS_FILE = join(DATA_DIR, 'applications.json');

// Ensure data directory exists
async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
}

// Read applications from file
async function readApplications() {
  try {
    await ensureDataDir();
    const data = await readFile(APPLICATIONS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Write applications to file
async function writeApplications(data: any[]) {
  await ensureDataDir();
  await writeFile(APPLICATIONS_FILE, JSON.stringify(data, null, 2));
}

// POST - Save new application
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const applications = await readApplications();
    
    const newApplication = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
      status: 'PENDING',
    };
    
    applications.push(newApplication);
    await writeApplications(applications);
    
    return Response.json({ 
      success: true, 
      source: 'file',
      data: newApplication 
    });
  } catch (error) {
    console.error('Error saving application:', error);
    return Response.json({ 
      success: false, 
      error: 'Failed to save application' 
    }, { status: 500 });
  }
}

// GET - Get all applications
export async function GET() {
  try {
    const applications = await readApplications();
    return Response.json({ 
      success: true, 
      source: 'file',
      data: applications 
    });
  } catch (error) {
    console.error('Error reading applications:', error);
    return Response.json({ 
      success: false, 
      error: 'Failed to read applications',
      data: [] 
    }, { status: 500 });
  }
}
