import { useEffect, useRef, useState } from "react";
import { supabase } from "./supabase";

// Google's own "Sign in with Google" button (Google Identity Services). The sign-in then happens
// on this site's domain instead of the Supabase project's, so Google's screen can name the site
// (and, once the brand is verified, "JapanOne") rather than "xyz.supabase.co". The ID token is
// handed to Supabase with signInWithIdToken.
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

type Gsi = {
  accounts: {
    id: {
      initialize: (o: { client_id: string; callback: (r: { credential: string }) => void; nonce: string; use_fedcm_for_prompt?: boolean }) => void;
      renderButton: (el: HTMLElement, o: Record<string, unknown>) => void;
    };
  };
};

let scriptLoad: Promise<void> | null = null;
function loadScript() {
  scriptLoad ??= new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Couldn't load Google sign-in"));
    document.head.appendChild(s);
  });
  return scriptLoad;
}

async function sha256Hex(text: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const googleButtonAvailable = !!CLIENT_ID;

export function GoogleButton({ onError }: { onError: (message: string) => void }) {
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(320);

  useEffect(() => {
    if (box.current) setWidth(Math.min(400, Math.max(240, box.current.offsetWidth)));
  }, []);

  useEffect(() => {
    if (!CLIENT_ID || !supabase || !box.current) return;
    let cancelled = false;
    (async () => {
      try {
        await loadScript();
        // Google signs the hashed nonce into the token; Supabase checks it against the raw one.
        const raw = crypto.randomUUID();
        const hashed = await sha256Hex(raw);
        const google = (window as unknown as { google: Gsi }).google;
        if (cancelled || !box.current) return;
        google.accounts.id.initialize({
          client_id: CLIENT_ID,
          nonce: hashed,
          use_fedcm_for_prompt: true,
          callback: async ({ credential }) => {
            const { error } = await supabase!.auth.signInWithIdToken({ provider: "google", token: credential, nonce: raw });
            if (error) onError(error.message);
          },
        });
        google.accounts.id.renderButton(box.current, {
          type: "standard",
          theme: "outline",
          size: "large",
          shape: "pill",
          text: "continue_with",
          logo_alignment: "center",
          width,
        });
      } catch (e) {
        onError(e instanceof Error ? e.message : "Google sign-in is unavailable right now.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [onError, width]);

  return <div ref={box} className="flex w-full justify-center" />;
}
