"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerLenis } from "@/lib/scroll-lock";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    lenis.on("scroll", ScrollTrigger.update);
    registerLenis(lenis);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // In-page anchors are handled here rather than through Lenis' own
    // `anchors` option: that one never calls preventDefault, so the browser
    // still performs its instant jump and Lenis only catches up a frame later
    // — exactly the hard cut we want gone.
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest?.<HTMLAnchorElement>(
        "a[href]"
      );
      if (!anchor || anchor.target === "_blank") return;

      const url = new URL(anchor.href, window.location.href);
      const here = new URL(window.location.href);
      // only same-page hashes — real navigations keep their default behaviour
      if (url.origin !== here.origin || url.pathname !== here.pathname) return;
      if (!url.hash || url.hash === "#") return;
      if (!document.querySelector(url.hash)) return;

      event.preventDefault();
      lenis.scrollTo(url.hash, {
        // the mobile menu freezes Lenis while it is open, and its own links
        // must still scroll when they close it
        force: true,
        duration: 1.3,
        // ease in and out — an expo-out curve covers half the distance in the
        // first tenth of a second and still reads as a jump
        easing: (t) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
        onComplete: () => {
          // keep the URL shareable without triggering another jump
          window.history.replaceState(null, "", url.hash);
        },
      });
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
