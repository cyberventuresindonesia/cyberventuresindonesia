import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting store (gunakan Redis di production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'anonymous';
  const pathname = request.nextUrl.pathname;

  // 1. Security Headers (tambahan dari Next.js config)
  response.headers.set('X-Request-ID', crypto.randomUUID());
  
  // 2. Rate Limiting
  if (process.env.RATE_LIMIT_ENABLED === 'true') {
    const now = Date.now();
    const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW || '60000');
    const maxRequests = parseInt(process.env.RATE_LIMIT_REQUESTS || '100');
    
    const record = rateLimitMap.get(ip);
    if (record) {
      if (now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
      } else if (record.count >= maxRequests) {
        return new NextResponse('Rate limit exceeded', { status: 429 });
      } else {
        record.count++;
      }
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    }
  }

  // 3. Block Challenge Routes di Production (jika disabled)
  if (pathname.startsWith('/join-us/challenges') && 
      process.env.ENABLE_CHALLENGES !== 'true') {
    return NextResponse.redirect(new URL('/join-us/quiz', request.url));
  }

  // 4. CORS untuk API routes
  if (pathname.startsWith('/api/')) {
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      'https://cyberventuresindonesia.com',
    ];
    
    const origin = request.headers.get('origin');
    if (origin && !allowedOrigins.includes(origin)) {
      return new NextResponse('CORS error', { status: 403 });
    }
  }

  // 5. Input Sanitization untuk form submissions
  if (request.method === 'POST') {
    // Log suspicious patterns (XSS, SQLi attempts)
    const userAgent = request.headers.get('user-agent') || '';
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /onerror=/i,
      /SELECT.*FROM/i,
      /UNION.*SELECT/i,
    ];
    
    const url = request.url;
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(url)) {
        console.warn(`[SECURITY] Suspicious pattern detected from ${ip}: ${pattern}`);
        return new NextResponse('Invalid request', { status: 400 });
      }
    }
  }

  return response;
}

// Middleware hanya berjalan di routes ini
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
    '/api/:path*',
    '/join-us/:path*',
    '/admin/:path*',
  ],
};
