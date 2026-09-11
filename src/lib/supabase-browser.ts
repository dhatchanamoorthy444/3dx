'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

let cached: SupabaseClient | null = null;

/** Recognizes known placeholder/demo credential values so they are never used as real keys. */
function isPlaceholderCredential(value: string): boolean {
  const v = (value || '').trim().toLowerCase();
  if (!v) return true;
  const tokens = ['your-project', 'your-anon-key', 'your_gemini_api_key', 'placeholder', 'example'];
  if (tokens.some((t) => v.includes(t))) return true;
  return v.length < 10;
}

/** Browser-side Supabase client (cookie-based session, persists across refresh). */
export function getSupabaseBrowserClient(): SupabaseClient {
  if (cached) return cached;
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
  const key = (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    ''
  ).trim();
  if (!url || !key || isPlaceholderCredential(url) || isPlaceholderCredential(key)) {
    throw new Error(
      'Authentication is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    );
  }
  cached = createBrowserClient(url, key);
  return cached;
}
/**
 * True when real Supabase credentials are present in the environment.
 * Never falls back to fake/demo credentials.
 */
export function isSupabaseConfigured(): boolean {
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
