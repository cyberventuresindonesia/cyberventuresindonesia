/**
 * API Route: Provision Docker Sandbox Container
 * POST /api/sandbox/provision
 */

import { NextRequest, NextResponse } from 'next/server';
import { provisionContainer, containerTemplates } from '@/lib/docker-sandbox';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { candidateId, templateId } = body;

    // Validate required fields
    if (!candidateId || !templateId) {
      return NextResponse.json(
        { error: 'Missing required fields: candidateId, templateId' },
        { status: 400 }
      );
    }

    // Validate template exists
    const template = containerTemplates.find(t => t.id === templateId);
    if (!template) {
      return NextResponse.json(
        { error: 'Invalid template ID', availableTemplates: containerTemplates.map(t => t.id) },
        { status: 400 }
      );
    }

    // Provision container
    const result = await provisionContainer(candidateId, templateId);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 409 }
      );
    }

    return NextResponse.json({
      success: true,
      container: result.container,
      template: {
        id: template.id,
        name: template.name,
        description: template.description,
        difficulty: template.difficulty,
        duration: template.duration,
        objectives: template.objectives,
      }
    });

  } catch (error) {
    console.error('Sandbox provision error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
