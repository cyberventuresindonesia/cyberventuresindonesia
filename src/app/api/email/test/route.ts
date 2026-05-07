/**
 * API Route: Test Hostinger Email Configuration
 * GET /api/email/test
 */

import { NextResponse } from 'next/server';
import { testEmailConfiguration } from '@/lib/hostinger-email';

// GET - Test email configuration
export async function GET() {
  const result = await testEmailConfiguration();
  
  return NextResponse.json(result);
}
