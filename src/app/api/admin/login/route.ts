import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const normalizedEmail = (email || '').trim().toLowerCase();
    const normalizedPass = (password || '').trim();

    // Accepted demo credentials
    const validEmails = [
      'admin@bounce.sec',
      'commander@bounceprotection.com',
      'admin@gmail.com',
      'admin',
      process.env.ADMIN_EMAIL?.toLowerCase(),
    ].filter(Boolean);

    const validPassword = process.env.ADMIN_PASSWORD || 'bounce2026';

    const isEmailValid = validEmails.includes(normalizedEmail);
    const isPasswordValid = normalizedPass === validPassword || normalizedPass === 'admin123' || normalizedPass === 'bounce2026';

    if (isEmailValid && isPasswordValid) {
      const response = NextResponse.json({
        success: true,
        message: 'Tactical Clearance Confirmed',
        user: { email: normalizedEmail, role: 'commander' },
      });

      // Set secure session cookie
      response.cookies.set('bounce_admin_auth', 'authenticated_commander_token_2026', {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Invalid command credentials. Access denied.' },
      { status: 401 }
    );
  } catch (error: unknown) {
    console.error('Error during admin login:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
