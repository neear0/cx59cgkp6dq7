"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import LangSwitcher from "./LangSwitcher";
import { lockScroll } from "@/lib/scroll-lock";
import type { Dict, Locale } from "@/lib/i18n";

export default function Nav({
  dict,
  locale,
  langLabel,
}: {
  dict: Dict["nav"];
  locale: Locale;
  langLabel: string;
}) {
  const progressRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#services", label: dict.services },
    { href: "#approach", label: dict.approach },
    { href: "#process", label: dict.process },
    { href: "#contact", label: dict.contact },
  ];

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${p})`;
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);

    gsap.from(navRef.current, {
      y: -40,
      autoAlpha: 0,
      duration: 1,
      delay: 0.4,
      ease: "power3.out",
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  // open/close the overlay
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    const scale = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : 1;

    lockScroll(open);

    if (open) {
      gsap
        .timeline()
        .to(el, { autoAlpha: 1, duration: 0.35 * scale, ease: "power2.out" })
        .fromTo(
          listRef.current!.children,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6 * scale,
            stagger: 0.06,
            ease: "power3.out",
          },
          "-=0.15"
        )
        .fromTo(
          langRef.current,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.4 * scale,
            // keyboard users start inside the overlay, not behind it
            onComplete: () =>
              listRef.current
                ?.querySelector<HTMLAnchorElement>("a")
                ?.focus({ preventScroll: true }),
          },
          "-=0.35"
        );
    } else {
      gsap.to(el, { autoAlpha: 0, duration: 0.3 * scale, ease: "power2.in" });
    }
  }, [open]);

  // escape closes it, and so does growing past the breakpoint where the
  // overlay is hidden anyway — otherwise the page would stay frozen
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);

    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

  // never leave the page frozen behind an unmounted overlay
  useEffect(() => () => lockScroll(false), []);

  return (
    <>
      <header ref={navRef} className="fixed inset-x-0 top-0 z-50">
        {/* scroll indicator — one of the few places the gradient is allowed */}
        <div
          ref={progressRef}
          className="h-[2px] w-full origin-left scale-x-0 gradient-line"
        />
        <div className="glass mx-4 mt-4 flex items-center justify-between rounded-full px-6 py-4 md:mx-8">
          <a
            href="#top"
            onClick={() => setOpen(false)}
            className="-my-3 py-3 font-display text-sm font-bold tracking-[0.22em] text-ink"
          >
            DATIQA<span className="text-gradient">.AI</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="link-sweep font-mono text-[11px] uppercase tracking-[0.25em] text-ink2 transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* two rules that cross into an X — the only nav control on phones */}
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Menu"
            className="relative -my-3 flex h-11 w-11 items-center justify-center md:hidden"
          >
            <span
              className={`absolute h-px w-6 bg-ink transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                open ? "rotate-45" : "-translate-y-[5px]"
              }`}
            />
            <span
              className={`absolute h-px w-6 bg-ink transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                open ? "-rotate-45" : "translate-y-[5px]"
              }`}
            />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        inert={open ? undefined : true}
        className="invisible fixed inset-0 z-40 opacity-0 md:hidden"
      >
        <div className="absolute inset-0 bg-bg/95 backdrop-blur-2xl" />
        {/* touch-none keeps the page from scrolling under the overlay */}
        <div className="relative flex h-full touch-none flex-col justify-between overscroll-contain px-6 pb-14 pt-32">
          <ul ref={listRef} className="flex flex-col">
            {links.map((l, i) => (
              <li key={l.href} className="border-t border-line last:border-b">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-5 py-6"
                >
                  <span className="font-mono text-[10px] tracking-[0.3em] text-mute">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-3xl font-bold uppercase tracking-tight text-ink">
                    {l.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div ref={langRef} className="flex justify-center">
            <LangSwitcher current={locale} label={langLabel} />
          </div>
        </div>
      </div>
    </>
  );
}
