import { createClient, SupabaseClient } from '@supabase/supabase-js';

function sanitizeUrl(url: string | undefined): string {
  if (!url) return '';
  return url.replace(/\\/g, '').trim();
}

function createSafeClient(): SupabaseClient {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';
  const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';
  
  const supabaseUrl = sanitizeUrl(rawUrl);
  const supabaseAnonKey = rawKey.trim();
  
  if (!supabaseUrl || !supabaseUrl.startsWith('http')) {
    console.warn('Invalid Supabase URL. Using demo mode.');
    return createClient('https://demo-project.supabase.co', 'demo-anon-key');
  }
  
  return createClient(supabaseUrl, supabaseAnonKey);
}

let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!cachedClient) {
    cachedClient = createSafeClient();
  }
  return cachedClient;
}

// No named supabase export to avoid build-time evaluation
export default getSupabaseClient;