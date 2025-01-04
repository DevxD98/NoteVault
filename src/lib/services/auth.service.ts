import { supabase } from '@/lib/supabase';

export class AuthService {
  static async login(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  static async signUp(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            email_confirm: true
          }
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  static async resendOtp(email: string) {
    try {
      const { data, error } = await supabase.auth.resend({
        email,
        type: 'signup'
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Resend OTP error:', error);
      throw error;
    }
  }

  static async verifyOtp(email: string, token: string) {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'signup'
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('OTP verification error:', error);
      throw error;
    }
  }

  static async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log('Supabase signOut successful');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }
}