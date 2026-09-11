'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

let cached: SupabaseClient | null = null;

/** Browser-side Supabase client (cookie-based session, persists across refresh). */
export function getSupabaseBrowserClient(): SupabaseClient {
  if (cached) return cached;
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
  const key = (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    ''
  ).trim();
  if (!url || !key) {
    throw new Error(
      'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    );
  }
  cached = createBrowserClient(url, key);
  return cached;
}
