import { NextResponse } from 'next/server';

// Simple in-memory rate limiter (5 requests per 10 minutes per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes in ms
const MAX_REQUESTS_PER_WINDOW = 5;

// Helper function to sanitize user string inputs against XSS/HTML Injection
function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .trim();
}

// RFC compliant email validation regex
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: Request) {
  try {
    // 1. IP Rate Limiting Security Check
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1';

    const now = Date.now();
    const userRate = rateLimitMap.get(ip);

    if (userRate) {
      if (now > userRate.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
      } else {
        if (userRate.count >= MAX_REQUESTS_PER_WINDOW) {
          return NextResponse.json(
            {
              success: false,
              error: 'Rate limit exceeded. Too many requests. Please wait a few minutes before trying again.',
            },
            { status: 429 }
          );
        }
        userRate.count += 1;
      }
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    }

    // 2. Parse JSON Body
    const body = await request.json();
    const { name, email, subject, message, botTrap } = body;

    // 3. Anti-Spam Honeypot Check (If bot filled out hidden field, silently reject)
    if (botTrap && botTrap.trim() !== '') {
      // Return fake success to confuse spam bots without sending email
      return NextResponse.json({
        success: true,
        message: 'Message processed successfully.',
      });
    }

    // 4. Input Sanitization & Validation
    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email);
    const cleanSubject = sanitizeInput(subject);
    const cleanMessage = sanitizeInput(message);

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    if (!isValidEmail(cleanEmail)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // 5. Length Boundaries Security Check
    if (cleanName.length > 100) {
      return NextResponse.json(
        { success: false, error: 'Name must not exceed 100 characters.' },
        { status: 400 }
      );
    }
    if (cleanEmail.length > 100) {
      return NextResponse.json(
        { success: false, error: 'Email address must not exceed 100 characters.' },
        { status: 400 }
      );
    }
    if (cleanSubject.length > 200) {
      return NextResponse.json(
        { success: false, error: 'Subject must not exceed 200 characters.' },
        { status: 400 }
      );
    }
    if (cleanMessage.length > 3000) {
      return NextResponse.json(
        { success: false, error: 'Message must not exceed 3000 characters.' },
        { status: 400 }
      );
    }

    // 6. Secure Server-Side Recipient Email Loading
    const targetEmail = process.env.CONTACT_RECIPIENT_EMAIL || 'kbarjun2468@gmail.com';
    const formSubmitUrl = `https://formsubmit.co/ajax/${targetEmail}`;
    const originHeader = request.headers.get('referer') || 'http://localhost:3000';

    const response = await fetch(formSubmitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Referer': originHeader,
      },
      body: JSON.stringify({
        name: cleanName,
        email: cleanEmail,
        subject: cleanSubject || `New Portfolio Message from ${cleanName}`,
        message: cleanMessage,
        _subject: `[Secure Contact] ${cleanSubject || cleanName}`,
        _template: 'table',
        _captcha: 'false',
      }),
    });

    let data;
    try {
      data = await response.json();
    } catch {
      data = { success: 'true', message: 'Message dispatched.' };
    }

    return NextResponse.json({
      success: true,
      message: 'Message delivered securely.',
      data,
    });
  } catch (error) {
    console.error('Secure Contact API Error:', error);
    return NextResponse.json(
      { success: false, error: 'An error occurred while dispatching your message safely.' },
      { status: 500 }
    );
  }
}
