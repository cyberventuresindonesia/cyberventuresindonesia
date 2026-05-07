/**
 * API Route: List Available Sandbox Templates
 * GET /api/sandbox/templates
 */

import { NextResponse } from 'next/server';
import { containerTemplates } from '@/lib/docker-sandbox';

export async function GET() {
  return NextResponse.json({
    templates: containerTemplates.map(t => ({
      id: t.id,
      name: t.name,
      description: t.description,
      difficulty: t.difficulty,
      duration: t.duration,
      objectives: t.objectives,
      flags: t.flags.length,
      hints: t.hints.length,
    }))
  });
}
