import type Lenis from "lenis";

/**
 * SmoothScroll owns the single Lenis instance; overlays that cover the page
 * need to freeze it while they are open. Keeping the reference in a module
 * avoids threading it through context for one call site.
 */
let instance: Lenis | null = null;

export function registerLenis(next: Lenis | null) {
  instance = next;
}

export function lockScroll(locked: boolean) {
  if (!instance) return;
  if (locked) instance.stop();
  else instance.start();
}
