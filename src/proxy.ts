import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * CaliGym route guards (Next.js 16 "Proxy" — previously Middleware).
 *
 * - /dashboard, /workout, /profile require a Supabase session cookie.
 * - /login and /register redirect signed-in users to /dashboard.
 * - When Supabase is NOT configured (local/dev without env), guarding is
 *   skipped so the site stays navigable. Production (Vercel) always
 *   defines NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY.
 */
function isPlaceholderCredential(value: string): boolean {
  const v = (value || '').trim().toLowerCase();
  if (!v) return true;
  const tokens = ['your-project', 'your-anon-key', 'your_gemini_api_key', 'placeholder', 'example'];
  if (tokens.some((t) => v.includes(t))) return true;
  return v.length < 10;
}

function isSupabaseConfigured(): boolean {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
  const key = (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    ''
  ).trim();
  return Boolean(
    url && url.startsWith('http') && key && !isPlaceholderCredential(url) && !isPlaceholderCredential(key)
  );
}

function hasSessionCookie(request: NextRequest): boolean {
  try {
    const cookies = request.cookies;
    if (!cookies || typeof cookies.getAll !== 'function') return false;
    for (const cookie of cookies.getAll()) {
      if (cookie.name.startsWith('sb-') && cookie.name.endsWith('-auth-token')) {
        return true;
      }
    }
  } catch {
    /* ignore */
  }
  return false;
}

export function proxy(request: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.next();
    }

    const pathname = request.nextUrl.pathname;
    const authed = hasSessionCookie(request);

    const isProtected =
      pathname === '/dashboard' ||
      pathname.startsWith('/dashboard/') ||
      pathname === '/workout' ||
      pathname.startsWith('/workout/') ||
      pathname === '/profile' ||
      pathname.startsWith('/profile/');

    if (isProtected && !authed) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if ((pathname === '/login' || pathname === '/register') && authed) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } catch {
    // Never block navigation because of a guard failure.
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/workout/:path*', '/profile/:path*', '/login/:path*', '/register/:path*'],
};