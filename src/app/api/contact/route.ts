import { NextResponse } from 'next/server';
import { contactFormConfig } from '@/config/contactForm';

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
        message: "Thanks! Your message has been sent successfully. I'll get back to you soon.",
      });
    }

    // 4. Input Sanitization & Validation
    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email);
    const cleanSubject = sanitizeInput(subject);
    const cleanMessage = sanitizeInput(message);

    if (!cleanName || !cleanEmail || !cleanSubject || !cleanMessage) {
      return NextResponse.json(
        { success: false, error: 'Name, email, subject, and message are all required fields.' },
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

    // 6. Check if Google Form Configuration is present
    const { formUrl, fields } = contactFormConfig;

    if (!formUrl || formUrl.includes('FORM_ID')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Google Form is not configured yet. Please set your Google Form URL in src/config/contactForm.ts.',
        },
        { status: 500 }
      );
    }

    // Build URL-encoded form payload with Google Form entry mapping
    const formData = new URLSearchParams();
    formData.append(fields.name, cleanName);
    formData.append(fields.email, cleanEmail);
    formData.append(fields.subject, cleanSubject);
    formData.append(fields.message, cleanMessage);

    // Post data directly to Google Forms endpoint
    const gfResponse = await fetch(formUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    // Google Forms returns 200 OK or 302 Redirect upon successful form response submission
    if (gfResponse.ok || gfResponse.status === 200 || gfResponse.status === 302) {
      return NextResponse.json({
        success: true,
        message: "Thanks! Your message has been sent successfully. I'll get back to you soon.",
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit response to Google Form. Please try again later.',
      },
      { status: 500 }
    );
  } catch (error) {
    console.error('Google Form Submission API Error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred while sending your message.' },
      { status: 500 }
    );
  }
}
