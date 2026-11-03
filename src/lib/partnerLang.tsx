import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";

// Language for the partner pages (English or Japanese). ?lang=ja in a link sets it; the choice is
// remembered in this browser so it follows the partner through sign-in, registration and listings.
export type Lang = "en" | "ja";
const KEY = "jo.partnerLang";

function stored(): Lang | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "ja" || v === "en" ? v : null;
  } catch {
    return null;
  }
}

function remember(l: Lang) {
  try {
    localStorage.setItem(KEY, l);
  } catch {
    /* private mode: the ?lang link still works */
  }
}

export function usePartnerLang(): [Lang, (l: Lang) => void] {
  const [params, setParams] = useSearchParams();
  const fromLink = params.get("lang");
  const [lang, setState] = useState<Lang>(() => {
    if (fromLink === "ja" || fromLink === "en") {
      remember(fromLink);
      return fromLink;
    }
    return stored() ?? "en";
  });
  const setLang = useCallback(
    (l: Lang) => {
      remember(l);
      setState(l);
      setParams((p) => {
        const next = new URLSearchParams(p);
        if (l === "ja") next.set("lang", "ja");
        else next.delete("lang");
        return next;
      }, { replace: true });
    },
    [setParams],
  );
  return [lang, setLang];
}

/** English / 日本語 switch. `dark` for use on the navy header. */
export function LangSwitch({ lang, setLang, dark = false }: { lang: Lang; setLang: (l: Lang) => void; dark?: boolean }) {
  return (
    <div className="flex" role="group" aria-label="Language / 言語">
      {(["en", "ja"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`cursor-pointer px-4 py-2 font-bold first:rounded-l-full last:rounded-r-full ${
            lang === l ? "bg-jo-yellow text-jo-navy" : dark ? "bg-white/10 text-white" : "bg-white text-jo-navy"
          }`}
        >
          {l === "en" ? "English" : "日本語"}
        </button>
      ))}
    </div>
  );
}
