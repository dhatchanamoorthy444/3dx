import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase-server';

/** Exchange the PKCE `code` from Supabase email links for a session, then redirect. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const type = url.searchParams.get('type');
  const rawNext = url.searchParams.get('next');

  const safeNext =
    rawNext && rawNext.startsWith('/') && !rawNext.startsWith('//')
      ? rawNext
      : type === 'recovery'
        ? '/reset-password'
        : '/dashboard';

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=invalid-link', request.url));
  }

  try {
    const supabase = await getSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(error.message)}`, request.url)
      );
    }
  } catch {
    return NextResponse.redirect(new URL('/login?error=auth-not-configured', request.url));
  }

  return NextResponse.redirect(new URL(safeNext, request.url));
}
