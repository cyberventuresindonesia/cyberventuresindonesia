import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/hostinger-email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validation
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Send confirmation email to subscriber
    const emailResult = await sendEmail(email, 'newsletter_subscription', {
      email,
    });

    if (!emailResult.success) {
      console.error('Failed to send newsletter confirmation email:', emailResult.error);
      // Still return success to user, but log the error
    }

    // In production, you would also:
    // 1. Save email to database (newsletter_subscribers table)
    // 2. Add to email marketing service (Mailchimp, SendGrid, etc.)
    // 3. Implement double opt-in if required

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to threat alerts. Check your email for confirmation.',
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}
