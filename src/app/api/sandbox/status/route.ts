/**
 * API Route: Get Sandbox Status
 * GET /api/sandbox/status?candidateId=xxx
 * GET /api/sandbox/status (admin - list all)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getContainerByCandidate, listActiveContainers, getContainerStats } from '@/lib/docker-sandbox';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const candidateId = searchParams.get('candidateId');

    if (candidateId) {
      // Get specific candidate's container
      const container = getContainerByCandidate(candidateId);
      
      if (!container) {
        return NextResponse.json({
          hasActiveContainer: false,
          container: null
        });
      }

      // Get stats
      const stats = await getContainerStats(container.id);

      return NextResponse.json({
        hasActiveContainer: true,
        container: {
          id: container.id,
          templateId: container.templateId,
          status: container.status,
          startedAt: container.startedAt,
          expiresAt: container.expiresAt,
          timeRemaining: Math.max(0, container.expiresAt.getTime() - Date.now()),
          flagsCaptured: container.flagsCaptured,
          violations: container.violations,
          ipAddress: container.ipAddress,
          ports: container.ports,
          stats,
        }
      });
    } else {
      // Admin: list all active containers
      const containers = listActiveContainers();
      
      return NextResponse.json({
        total: containers.length,
        containers: containers.map(c => ({
          id: c.id,
          candidateId: c.candidateId,
          templateId: c.templateId,
          status: c.status,
          startedAt: c.startedAt,
          expiresAt: c.expiresAt,
          flagsCaptured: c.flagsCaptured.length,
          violations: c.violations.length,
        }))
      });
    }

  } catch (error) {
    console.error('Sandbox status error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
