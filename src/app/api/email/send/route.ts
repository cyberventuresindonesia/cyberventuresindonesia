/**
 * API Route: Send Email via Hostinger Reach API
 * POST /api/email/send
 */

import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, EmailTemplateType, testEmailConfiguration } from '@/lib/hostinger-email';

// POST - Send email
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, template, variables } = body;

    // Validate required fields
    if (!to || !template) {
      return NextResponse.json(
        { error: 'Missing required fields: to, template' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send email
    const result = await sendEmail(to, template as EmailTemplateType, variables || {});

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
      to,
      template,
    });

  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
