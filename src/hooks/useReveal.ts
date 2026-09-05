import { useEffect, useRef } from "react";

/**
 * Adds `.is-visible` to the element once it scrolls into view, pairing with
 * the `.reveal` CSS class. No-op (element stays visible) when the browser
 * reports prefers-reduced-motion, since `.reveal`'s base state is only
 * hidden under a transition that reduced-motion already disables.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}
