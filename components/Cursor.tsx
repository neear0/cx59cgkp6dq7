"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Custom cursor: a small gradient dot plus a trailing ring.
 * The ring expands over interactive elements (a, button, [data-cursor]).
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    let shown = false;
    const onMove = (e: MouseEvent) => {
      if (!shown) {
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 });
        // the native cursor is only hidden once this one is actually on
        // screen — hiding it from CSS alone left no cursor at all whenever
        // this effect bailed out (e.g. macOS with "Reduce motion" turned on)
        document.documentElement.classList.add("custom-cursor");
        shown = true;
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    // null until the first event, so the ring always settles from its fade-in
    let hovering: boolean | null = null;
    const onOver = (e: MouseEvent) => {
      const interactive = !!(e.target as HTMLElement).closest(
        "a, button, [data-cursor]"
      );
      if (interactive === hovering) return;
      hovering = interactive;
      gsap.to(ring, {
        scale: interactive ? 2.1 : 1,
        opacity: interactive ? 0.9 : 0.5,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  return (
    <>
      {/* `invisible` is the initial state: on touch devices the effect above
          bails out early, and without it the dot and ring would sit parked in
          the top-left corner of the screen */}
      <div
        ref={dotRef}
        className="pointer-events-none invisible fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full gradient-line"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="pointer-events-none invisible fixed left-0 top-0 z-[100] h-8 w-8 rounded-full border border-ink/40 opacity-50"
        aria-hidden
      />
    </>
  );
}
