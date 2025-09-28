import { supabase } from "@/lib/supabaseClient";
import { Session, User } from "@supabase/supabase-js";

export class AuthService {
  async signUp(email: string, password: string): Promise<User> {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("No user returned from sign up");
    return data.user;
  }

  async login(email: string, password: string): Promise<User> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("No user returned from login");
    return data.user;
  }

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }

  async getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
  }

  onAuthStateChange(callback: (session: Session | null) => void) {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => callback(session));
    return subscription;
  }
}

export const authService = new AuthService();
