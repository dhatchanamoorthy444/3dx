import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'https://demo-project.supabase.co';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'demo-anon-key';
    
    if (!supabaseUrl || !supabaseUrl.startsWith('http')) {
      console.warn('Invalid Supabase URL. Using demo mode.');
    }
    
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
}

// Lazy export for backward compatibility
export const supabase = new Proxy({} as SupabaseClient, {
  get(target, prop) {
    return getSupabaseClient()[prop as keyof SupabaseClient];
  }
});