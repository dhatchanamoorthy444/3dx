'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { getSupabaseClient } from '@/lib/supabaseClient';

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
}

export interface WorkoutLog {
  id?: string;
  user_id: string;
  date: string;
  workout_data: any;
  created_at?: string;
  updated_at?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  signIn: (emailOrUsername: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, username: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  saveWorkout: (date: string, workoutData: any) => Promise<{ success: boolean; error?: string }>;
  getWorkout: (date: string) => Promise<WorkoutLog | null>;
  getWorkouts: (startDate?: string, endDate?: string) => Promise<WorkoutLog[]>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const initAuth = async () => {
      try {
        const { data: { session } } = await getSupabaseClient().auth.getSession();
        if (session?.user) {
          const { data: profile } = await getSupabaseClient()
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (profile) {
            setUser({
              id: profile.id,
              username: profile.username,
              email: profile.email,
              role: profile.role
            });
          }
        }
      } catch (error) {
        console.error('Auth init error:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = getSupabaseClient().auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: profile } = await getSupabaseClient()
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (profile) {
          setUser({
            id: profile.id,
            username: profile.username,
            email: profile.email,
            role: profile.role
          });
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (emailOrUsername: string, password: string) => {
    try {
      setLoading(true);
      
      // Try email login first
      let { data, error } = await getSupabaseClient().auth.signInWithPassword({
        email: emailOrUsername,
        password
      });

      // If email fails, try username lookup
      if (error && !emailOrUsername.includes('@')) {
        const { data: profile, error: profileError } = await getSupabaseClient()
          .from('profiles')
          .select('email')
          .eq('username', emailOrUsername)
          .single();

        if (profile && !profileError) {
          ({ data, error } = await getSupabaseClient().auth.signInWithPassword({
            email: profile.email,
            password
          }));
        }
      }

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await getSupabaseClient().auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            role: 'user'
          }
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await getSupabaseClient().auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const saveWorkout = async (date: string, workoutData: any) => {
    try {
      if (!user) {
        return { success: false, error: 'Not authenticated' };
      }

      const { error } = await getSupabaseClient()
        .from('workout_logs')
        .upsert({
          user_id: user.id,
          date,
          workout_data: workoutData
        }, {
          onConflict: 'user_id,date'
        });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const getWorkout = async (date: string) => {
    try {
      if (!user) return null;

      const { data, error } = await getSupabaseClient()
        .from('workout_logs')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', date)
        .single();

      if (error || !data) return null;
      return data;
    } catch (error) {
      return null;
    }
  };

  const getWorkouts = async (startDate?: string, endDate?: string) => {
    try {
      if (!user) return [];

      let query = getSupabaseClient()
        .from('workout_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (startDate) {
        query = query.gte('date', startDate);
      }
      if (endDate) {
        query = query.lte('date', endDate);
      }

      const { data, error } = await query;

      if (error) return [];
      return data || [];
    } catch (error) {
      return [];
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signUp,
      signOut,
      saveWorkout,
      getWorkout,
      getWorkouts
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}