'use client';
import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase-browser';

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
}
interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  configured: boolean;
  signIn: (emailOrUsername: string, password: string) => Promise<{ success: boolean; error?: string; role?: 'user' | 'admin' }>;
  signUp: (input: { name: string; username: string; email: string; password: string; avatarFile?: File | null }) => Promise<{ success: boolean; error?: string; needsConfirmation?: boolean }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  saveWorkout: (date: string, workoutData: unknown) => Promise<{ success: boolean; error?: string }>;
  getWorkout: (date: string) => Promise<Record<string, unknown> | null>;
  getWorkouts: (startDate?: string, endDate?: string) => Promise<Record<string, unknown>[]>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function normalizeUsername(value: string): string {
  return (value || '').trim().toLowerCase();
}

export function isValidUsername(value: string): boolean {
  return /^[a-z0-9_]{3,20}$/.test(value);
}

/**
 * Postgres "insufficient_privilege" — the signature of a Row Level Security
 * policy rejection (e.g. missing INSERT policy on profiles). Surfaced as a
 * distinct message so future policy misconfigurations are diagnosable
 * instead of hiding behind the generic catch-all.
 */
function isRlsPolicyError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const code = (error as { code?: unknown }).code;
  if (code === '42501') return true;
  const message = String((error as { message?: unknown }).message ?? '').toLowerCase();
  return (
    message.includes('row-level security') ||
    message.includes('row level security') ||
    (message.includes('violates') && message.includes('policy'))
  );
}

function profileSaveErrorMessage(error: unknown): string {
  if (isRlsPolicyError(error)) {
    return 'Account was created but saving your profile was blocked by a database permission (RLS policy). Please contact support — do not register again.';
  }
  return 'Account was created but the profile could not be saved. Please try logging in, or contact support.';
}

function friendlyAuthError(message: string): string {
  const m = (message || '').toLowerCase();
  if (m.includes('invalid login credentials') || m.includes('invalid email or password')) return 'Invalid email or password.';
  if (m.includes('email not confirmed') || m.includes('not verified')) return 'Please verify your email before logging in. Check your inbox for the confirmation link.';
  if (m.includes('already registered') || m.includes('already exists')) return 'Email already registered. Try logging in instead.';
  if (m.includes('password should be at least') || m.includes('too short')) return 'Password is too short. Use at least 8 characters.';
  if (m.includes('rate limit') || m.includes('too many requests')) return 'Too many attempts. Please wait a minute and try again.';
  if (m.includes('session expired') || m.includes('refresh token')) return 'Session expired. Please log in again.';
  return message || 'Authentication failed. Please check your credentials.';
}

async function loadProfileFor(userId: string): Promise<AuthUser | null> {
  const supabase = getSupabaseBrowserClient();
  const { data: profile } = await supabase.from('profiles').select('id, username, email, role').eq('id', userId).maybeSingle();
  if (!profile) return null;
  return {
    id: profile.id as string,
    username: (profile.username as string) || '',
    email: (profile.email as string) || '',
    role: ((profile.role as string) === 'admin' ? 'admin' : 'user') as 'user' | 'admin',
  };
}
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [configured] = useState<boolean>(() => {
    const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
    const key = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '').trim();
    return Boolean(url && key && !/your-project|your-anon-key/i.test(url + key));
  });

  useEffect(() => {
    let cancelled = false;
    const init = async () => {
      try {
        const supabase = getSupabaseBrowserClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (!cancelled && session?.user) {
          const profile = await loadProfileFor(session.user.id);
          if (!cancelled) setUser(profile);
        }
      } catch { /* unconfigured */ } finally {
        if (!cancelled) setLoading(false);
      }
    };
    init();
    let unsub: { unsubscribe: () => void } | null = null;
    try {
      const supabase = getSupabaseBrowserClient();
      const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (cancelled) return;
        if (event === 'SIGNED_IN' && session?.user) {
          const profile = await loadProfileFor(session.user.id);
          if (!cancelled) setUser(profile);
        } else if (event === 'SIGNED_OUT') {
          if (!cancelled) setUser(null);
        }
      });
      unsub = data.subscription;
    } catch { /* unconfigured */ }
    return () => { cancelled = true; unsub?.unsubscribe(); };
  }, []);

  const signIn = useCallback(async (emailOrUsername: string, password: string) => {
    setLoading(true);
    try {
      let supabase;
      try { supabase = getSupabaseBrowserClient(); }
      catch { return { success: false, error: 'Authentication is not configured. Set Supabase environment variables.' }; }
      const input = (emailOrUsername || '').trim();
      if (!input || !password) return { success: false, error: 'Please enter your username/email and password.' };
      let email = input;
      if (!input.includes('@')) {
        const res = await fetch('/api/auth/resolve-username', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: normalizeUsername(input) }),
        });
        const body = await res.json().catch(() => ({}));
        if (!res.ok || !body?.email) return { success: false, error: body?.error || 'Username not found.' };
        email = body.email as string;
      }
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error || !data?.user) return { success: false, error: friendlyAuthError(error?.message || '') };
      const profile = await loadProfileFor(data.user.id);
      if (!profile) {
        await supabase.auth.signOut();
        return { success: false, error: 'Account exists but the profile record is missing. Please contact support — do not register again (your email is already taken).' };
      }
      setUser(profile);
      return { success: true, role: profile.role };
    } catch {
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    } finally { setLoading(false); }
  }, []);

  const signOut = useCallback(async () => {
    try {
      const supabase = getSupabaseBrowserClient();
      await supabase.auth.signOut();
    } catch { /* ignore */ } finally { setUser(null); }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    try {
      let supabase;
      try { supabase = getSupabaseBrowserClient(); }
      catch { return { success: false, error: 'Authentication is not configured.' }; }
      const clean = (email || '').trim();
      if (!clean || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) return { success: false, error: 'Please enter a valid email address.' };
      const { error } = await supabase.auth.resetPasswordForEmail(clean, { redirectTo: `${window.location.origin}/reset-password` });
      if (error) return { success: false, error: friendlyAuthError(error.message) };
      return { success: true };
    } catch {
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
  }, []);
  const signUp = useCallback(async (input: { name: string; username: string; email: string; password: string; avatarFile?: File | null }) => {
    setLoading(true);
    try {
      let supabase;
      try { supabase = getSupabaseBrowserClient(); }
      catch { return { success: false, error: 'Authentication is not configured. Set Supabase environment variables.' }; }
      const name = (input.name || '').trim();
      const username = normalizeUsername(input.username);
      const email = (input.email || '').trim();
      if (!name) return { success: false, error: 'Please enter your name.' };
      if (!username) return { success: false, error: 'Please choose a username.' };
      if (!isValidUsername(username)) return { success: false, error: 'Username must be 3-20 characters: lowercase letters, numbers, underscores only.' };
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { success: false, error: 'Please enter a valid email address.' };
      if (!input.password || input.password.length < 8) return { success: false, error: 'Password is too short. Use at least 8 characters.' };
      const { data: existing } = await supabase.from('profiles').select('id').eq('username', username).maybeSingle();
      if (existing?.id) return { success: false, error: 'Username already exists. Please choose another one.' };
      const { data, error } = await supabase.auth.signUp({
        email,
        password: input.password,
        options: { data: { username, name }, emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) return { success: false, error: friendlyAuthError(error.message) };
      const authUser = data?.user;
      if (!authUser) return { success: false, error: 'Registration failed. Please try again.' };
      let avatarUrl: string | null = null;
      if (input.avatarFile) {
        const ext = (input.avatarFile.name.split('.').pop() || 'jpg').toLowerCase().slice(0, 4);
        const path = `${authUser.id}/avatar.${ext}`;
        const { error: uploadError } = await supabase.storage.from('avatars').upload(path, input.avatarFile, { upsert: true, contentType: input.avatarFile.type });
        if (!uploadError) {
          const { data: publicUrl } = supabase.storage.from('avatars').getPublicUrl(path);
          avatarUrl = publicUrl?.publicUrl ?? null;
        }
      }
      const { error: profileError } = await supabase.from('profiles').upsert({ id: authUser.id, username, email, name, role: 'user', avatar_url: avatarUrl }, { onConflict: 'id' });
      if (profileError) {
        // The handle_new_user() trigger may already have created the row
        // (e.g. when email confirmation is off, or the race between trigger
        // and this upsert fired first). Only fail when no row exists at all.
        const exists = await loadProfileFor(authUser.id).catch(() => null);
        if (!exists) {
          return { success: false, error: profileSaveErrorMessage(profileError) };
        }
      }
      if (!data.session) return { success: true, needsConfirmation: true };
      const profile = await loadProfileFor(authUser.id);
      if (!profile) {
        await supabase.auth.signOut();
        return { success: false, error: 'Account was created but the profile could not be loaded. Please try logging in.' };
      }
      setUser(profile);
      return { success: true };
    } catch {
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    } finally { setLoading(false); }
  }, []);

  const saveWorkout = useCallback(async (date: string, workoutData: unknown) => {
    try {
      if (!user) return { success: false, error: 'Not authenticated. Please log in again.' };
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.from('workout_logs').upsert({ user_id: user.id, date, workout_data: workoutData }, { onConflict: 'user_id,date' });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch {
      return { success: false, error: 'An unexpected error occurred.' };
    }
  }, [user]);

  const getWorkout = useCallback(async (date: string) => {
    try {
      if (!user) return null;
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase.from('workout_logs').select('*').eq('user_id', user.id).eq('date', date).maybeSingle();
      if (error || !data) return null;
      return data as Record<string, unknown>;
    } catch { return null; }
  }, [user]);

  const getWorkouts = useCallback(async (startDate?: string, endDate?: string) => {
    try {
      if (!user) return [];
      const supabase = getSupabaseBrowserClient();
      let query = supabase.from('workout_logs').select('*').eq('user_id', user.id).order('date', { ascending: false });
      if (startDate) query = query.gte('date', startDate);
      if (endDate) query = query.lte('date', endDate);
      const { data, error } = await query;
      if (error) return [];
      return (data || []) as Record<string, unknown>[];
    } catch { return []; }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, configured, signIn, signUp, signOut, resetPassword, saveWorkout, getWorkout, getWorkouts }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
