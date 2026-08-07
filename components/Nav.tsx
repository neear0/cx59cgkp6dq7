"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { Dict } from "@/lib/i18n";

export default function Nav({ dict }: { dict: Dict["nav"] }) {
  const progressRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

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

  return (
    <header ref={navRef} className="fixed inset-x-0 top-0 z-50">
      {/* scroll indicator — one of the few places the gradient is allowed */}
      <div
        ref={progressRef}
        className="h-[2px] w-full origin-left scale-x-0 gradient-line"
      />
      <div className="glass mx-4 mt-4 flex items-center justify-between rounded-full px-6 py-4 md:mx-8">
        <a
          href="#top"
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
        {/* the only nav link on small screens — padded to a real tap target */}
        <a
          href="#contact"
          className="-my-3 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ink md:hidden"
        >
          {dict.contact}
        </a>
      </div>
    </header>
  );
}
