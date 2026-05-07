import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/hostinger-email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { name, email, company, phone, service, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
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

    // Send notification to admin
    const adminEmail = 'info@cyberventuresindonesia.com';
    const emailResult = await sendEmail(adminEmail, 'contact_form_submission', {
      name,
      email,
      company: company || 'Not provided',
      phone: phone || 'Not provided',
      service: service || 'Not specified',
      message,
    });

    if (!emailResult.success) {
      console.error('Failed to send contact form email:', emailResult.error);
      // Still return success to user, but log the error
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you within 24 hours.',
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again.' },
      { status: 500 }
    );
  }
}
