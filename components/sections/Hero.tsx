"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import Magnetic from "../Magnetic";
import type { Dict } from "@/lib/i18n";

gsap.registerPlugin(SplitText);

export default function Hero({ dict }: { dict: Dict["hero"] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const title = root.current!.querySelector<HTMLElement>("[data-hero-title]")!;
      // char masks (not line masks) keep word wrapping native, so the
      // headline never breaks mid-word in any language
      const split = SplitText.create(title, {
        type: "chars,words",
        mask: "chars",
        ignore: ".text-gradient",
        autoSplit: true,
        onSplit(self) {
          const targets = [
            ...(self.chars as HTMLElement[]),
            ...Array.from(title.querySelectorAll<HTMLElement>(".text-gradient")),
          ].sort((a, b) =>
            a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
          );
          return gsap.from(targets, {
            yPercent: 120,
            rotate: 6,
            duration: 1.4,
            ease: "expo.out",
            stagger: 0.02,
            delay: 0.2,
          });
        },
      });

      const tl = gsap.timeline({ delay: 0.7 });
      tl.from("[data-hero-eyebrow]", {
        autoAlpha: 0,
        y: 16,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          "[data-hero-sub]",
          { autoAlpha: 0, y: 24, filter: "blur(8px)", duration: 1, ease: "power3.out" },
          "-=0.5"
        )
        .from(
          "[data-hero-cta] > *",
          { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.12, ease: "power3.out" },
          "-=0.6"
        )
        .from(
          "[data-hero-scroll]",
          { autoAlpha: 0, duration: 1 },
          "-=0.3"
        );

      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center px-6 pb-28 pt-32 text-center md:px-12 lg:px-20"
    >
      {/* the halo keeps the copy legible where the particle field is densest */}
      <div className="scrim flex flex-col items-center">
        <p
          data-hero-eyebrow
          className="mb-8 font-mono text-[11px] uppercase tracking-[0.4em] text-mute"
        >
          {dict.eyebrow}
        </p>

        <h1
          data-hero-title
          className="font-display max-w-6xl text-[clamp(1.6rem,5.8vw,5rem)] font-extrabold uppercase leading-[1.02] tracking-tight text-ink"
        >
          {dict.title.pre}
          <span className="text-gradient">{dict.title.highlight}</span>
          {dict.title.post}
        </h1>

        <p
          data-hero-sub
          className="mt-8 max-w-xl text-balance text-base leading-relaxed text-ink2 md:text-lg"
        >
          {dict.sub}
        </p>
      </div>

      <div data-hero-cta className="mt-10 flex flex-wrap items-center justify-center gap-5">
        <Magnetic>
          <a
            href="#services"
            className="group relative inline-block overflow-hidden rounded-full bg-ink px-8 py-4 font-mono text-[12px] uppercase tracking-[0.2em] text-bg transition-transform"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-ink">
              {dict.ctaPrimary}
            </span>
            <span className="absolute inset-0 translate-y-full gradient-line transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0" />
          </a>
        </Magnetic>
        <Magnetic>
          <a
            href="#contact"
            className="link-sweep inline-block px-2 py-4 font-mono text-[12px] uppercase tracking-[0.2em] text-ink2 transition-colors hover:text-ink"
          >
            {dict.ctaSecondary}
          </a>
        </Magnetic>
      </div>

      <div
        data-hero-scroll
        className="absolute bottom-8 hidden flex-col items-center gap-3 min-[900px]:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-mute">
          {dict.scroll}
        </span>
        <span className="block h-12 w-px gradient-line" />
      </div>
    </section>
  );
}
