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

    // Determine domain / origin for serverless headers
    const hostHeader = request.headers.get('host') || 'localhost:3000';
    const originHeader =
      request.headers.get('origin') ||
      request.headers.get('referer') ||
      `https://${hostHeader}`;

    // 6. Check for Web3Forms provider key if set in environment variables
    const web3Key = process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (web3Key) {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: web3Key,
          name: cleanName,
          email: cleanEmail,
          subject: cleanSubject || `New Portfolio Message from ${cleanName}`,
          message: cleanMessage,
          from_name: 'Portfolio Contact Form',
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        return NextResponse.json({
          success: true,
          message: 'Message delivered successfully.',
        });
      } else {
        return NextResponse.json(
          {
            success: false,
            error: data.message || 'Web3Forms error occurred.',
          },
          { status: response.status || 400 }
        );
      }
    }

    // 7. FormSubmit Provider (Default Fallback)
    const targetEmail = process.env.CONTACT_RECIPIENT_EMAIL || 'kbarjun2468@gmail.com';
    const formSubmitUrl = `https://formsubmit.co/ajax/${targetEmail}`;

    const response = await fetch(formSubmitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Referer': originHeader,
        'Origin': originHeader,
      },
      body: JSON.stringify({
        name: cleanName,
        email: cleanEmail,
        subject: cleanSubject || `New Portfolio Message from ${cleanName}`,
        message: cleanMessage,
        _subject: `[Portfolio Contact] ${cleanSubject || cleanName}`,
        _template: 'table',
        _captcha: 'false',
      }),
    });

    let data: { success?: string | boolean; message?: string } = {};
    try {
      data = await response.json();
    } catch {
      data = {};
    }

    const isSuccess =
      response.ok &&
      (data.success === 'true' || data.success === true || data.message?.includes('submitted'));

    if (isSuccess) {
      return NextResponse.json({
        success: true,
        message: 'Message delivered successfully.',
      });
    }

    const rawMsg = data.message || '';
    if (
      rawMsg.toLowerCase().includes('activate') ||
      rawMsg.toLowerCase().includes('confirm') ||
      !response.ok
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'FormSubmit requires a one-time activation for your Vercel domain. Please check your email inbox (kbarjun2468@gmail.com) for the FormSubmit activation email and click Activate.',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: rawMsg || 'Failed to deliver message via email provider. Please try sending directly.',
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('Secure Contact API Error:', error);
    return NextResponse.json(
      { success: false, error: 'An error occurred while dispatching your message safely.' },
      { status: 500 }
    );
  }
}
