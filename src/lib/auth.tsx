import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { mergeGuestProgress } from "./progress";
import { supabase } from "./supabase";

export type Profile = { display_name: string | null; plan: "free" | "pro"; plan_expires_at: string | null };

type AuthState = {
  ready: boolean;
  enabled: boolean; // false when Supabase isn't configured (guest-only mode)
  session: Session | null;
  profile: Profile | null;
  signInWithGoogle: (next?: string) => Promise<void>;
  sendEmailLink: (email: string, next?: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

const redirectTo = (next = "/learn") => `${window.location.origin}${next}`;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(!supabase);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((event, s) => {
      setSession(s);
      // Keep what someone practised as a guest before signing in.
      if (event === "SIGNED_IN" && s) mergeGuestProgress(s.user.id);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!supabase || !session) {
      setProfile(null);
      return;
    }
    supabase
      .from("profiles")
      .select("display_name, plan, plan_expires_at")
      .eq("id", session.user.id)
      .single()
      .then(({ data }) => setProfile((data as Profile) ?? null));
  }, [session]);

  const value: AuthState = {
    ready,
    enabled: !!supabase,
    session,
    profile,
    async signInWithGoogle(next) {
      if (!supabase) return;
      const { error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: redirectTo(next) } });
      if (error) throw error;
    },
    async sendEmailLink(email, next) {
      if (!supabase) return;
      const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo(next) } });
      if (error) throw error;
    },
    async signOut() {
      await supabase?.auth.signOut();
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
