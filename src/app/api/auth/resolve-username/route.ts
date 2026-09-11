import { NextResponse } from 'next/server';
import { getSupabaseServiceClient } from '@/lib/supabase-server';

function normalizeUsername(value: string): string {
  return (value || '').trim().toLowerCase();
}

function isValidUsername(value: string): boolean {
  return /^[a-z0-9_]{3,20}$/.test(value);
}

/**
 * Securely resolve a username to its Supabase Auth email.
 * Runs server-side with the service-role key so the browser never
 * sees another user's email address.
 * Response: { email: string } | { error: string }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const username = normalizeUsername(String(body?.username ?? ''));

    if (!username) {
      return NextResponse.json({ error: 'Username is required.' }, { status: 400 });
    }
    if (!isValidUsername(username)) {
      return NextResponse.json({ error: 'Username not found.' }, { status: 404 });
    }

    const service = getSupabaseServiceClient();
    const { data: profile, error: profileError } = await service
      .from('profiles')
      .select('id')
      .eq('username', username)
      .maybeSingle();

    if (profileError) {
      return NextResponse.json(
        { error: 'Unable to look up username right now. Please try again.' },
        { status: 500 }
      );
    }
    if (!profile?.id) {
      return NextResponse.json({ error: 'Username not found.' }, { status: 404 });
    }

    const { data: authUser, error: authError } =
      await service.auth.admin.getUserById(profile.id);
    const email = authUser?.user?.email;
    if (authError || !email) {
      return NextResponse.json({ error: 'Username not found.' }, { status: 404 });
    }

    return NextResponse.json({ email });
  } catch (error) {
    const message =
      error instanceof Error && /service role/i.test(error.message)
        ? 'Username login is not configured on the server. Please log in with your email instead.'
        : 'Unable to look up username right now. Please try again.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
