import { createClient, SupabaseClient } from '@supabase/supabase-js';

function isPlaceholderCredential(value: string): boolean {
  const placeholders = ['your-project', 'your-anon-key', 'your_gemini_api_key', 'placeholder', 'example'];
  const lower = value.toLowerCase();
  return placeholders.some(p => lower.includes(p)) || value.length < 10;
}

function sanitizeUrl(url: string | undefined): string {
  if (!url) return '';
  return url.replace(/\\/g, '').trim();
}

function createSafeClient(): SupabaseClient {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';
  const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';
  
  const supabaseUrl = sanitizeUrl(rawUrl);
  const supabaseAnonKey = rawKey.trim();
  
  if (!supabaseUrl || !supabaseUrl.startsWith('http') || !supabaseAnonKey || isPlaceholderCredential(supabaseUrl) || isPlaceholderCredential(supabaseAnonKey)) {
    console.warn('Supabase credentials not configured properly. Using demo mode.');
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

export function isSupabaseConfigured(): boolean {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const supabaseUrl = sanitizeUrl(rawUrl);
  const supabaseAnonKey = rawKey.trim();
  
  if (!supabaseUrl || !supabaseUrl.startsWith('http') || !supabaseAnonKey) {
    return false;
  }
  
  if (isPlaceholderCredential(supabaseUrl) || isPlaceholderCredential(supabaseAnonKey)) {
    return false;
  }
  
  return true;
}

export default getSupabaseClient;