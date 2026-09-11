import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

function env(name: string): string {
  return (process.env[name] || '').trim();
}

/** Recognizes known placeholder/demo credential values so they are never used as real keys. */
function isPlaceholderCredential(value: string): boolean {
  const v = (value || '').trim().toLowerCase();
  if (!v) return true;
  const tokens = ['your-project', 'your-anon-key', 'your_gemini_api_key', 'placeholder', 'example'];
  if (tokens.some((t) => v.includes(t))) return true;
  return v.length < 10;
}

/** Server-side Supabase client bound to request cookies (reads/writes session). */
export async function getSupabaseServerClient(): Promise<SupabaseClient> {
  const url = env('NEXT_PUBLIC_SUPABASE_URL');
  const key = env('NEXT_PUBLIC_SUPABASE_ANON_KEY') || env('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY');
  if (!url || !key || isPlaceholderCredential(url) || isPlaceholderCredential(key)) {
    throw new Error(
      'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    );
  }
  const store = await cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (toSet) => {
        toSet.forEach(({ name, value, options }) => {
          store.set(name, value, options);
        });
      },
    },
  });
}

/**
 * Privileged service-role client. SERVER ONLY — never import from client components.
 * Used solely for username → email resolution without exposing emails to the browser.
 */
export function getSupabaseServiceClient(): SupabaseClient {
  const url = env('NEXT_PUBLIC_SUPABASE_URL');
  const serviceKey = env('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !serviceKey || isPlaceholderCredential(url) || isPlaceholderCredential(serviceKey)) {
    throw new Error(
      'Supabase service role is not configured. Set SUPABASE_SERVICE_ROLE_KEY (server-side only).'
    );
  }
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
