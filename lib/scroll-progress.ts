/**
 * Page scroll progress (0..1), read every frame by the nav progress bar and
 * the particle field. Measuring `scrollHeight` inside those loops forces a
 * layout on every frame while GSAP is writing styles, so the scrollable
 * distance is cached here and only re-measured when the page or the
 * viewport actually changes size.
 */
let max = -1;

function measure() {
  max = document.documentElement.scrollHeight - window.innerHeight;
}

function watch() {
  measure();
  window.addEventListener("resize", measure);
  // <body> grows with the content (fonts loading, the contact panel swap,
  // SplitText re-splitting on resize); <html> is pinned to the viewport
  new ResizeObserver(measure).observe(document.body);
}

export function scrollProgress() {
  if (max < 0) watch();
  return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
}
