import { useEffect, useRef, useState } from "react";

/**
 * Tracks pointer position within `ref`'s element as a small {x, y} offset
 * (clamped to +/-maxOffset px), for a subtle background-parallax effect.
 * Disabled entirely on touch devices and when the OS requests reduced
 * motion — both checked via matchMedia, not user-agent sniffing.
 */
export function useParallax<T extends HTMLElement>(maxOffset = 12) {
  const ref = useRef<T | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reducedMotion) return;

    const node = ref.current;
    if (!node) return;

    function handleMove(e: PointerEvent) {
      const rect = node!.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      setOffset({ x: relX * 2 * maxOffset, y: relY * 2 * maxOffset });
    }

    node.addEventListener("pointermove", handleMove);
    return () => node.removeEventListener("pointermove", handleMove);
  }, [maxOffset]);

  return { ref, offset };
}
