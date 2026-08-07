"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitReveal, FadeReveal } from "../Reveal";
import type { Dict } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export default function Process({ dict }: { dict: Dict["process"] }) {
  const root = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      // gradient progress line grows as the section is scrolled through
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 60%",
            end: "bottom 70%",
            scrub: 0.6,
          },
        }
      );
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="process"
      className="relative px-6 py-32 md:px-12 md:py-44 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        {/* content keeps to the left — the particle formation flows right */}
        <div className="md:max-w-[36rem]">
        <div className="scrim">
          <FadeReveal>
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.4em] text-mute">
              {dict.eyebrow}
            </p>
          </FadeReveal>
          <SplitReveal
            as="h2"
            className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold uppercase leading-[1.02] tracking-tight text-ink"
          >
            {dict.heading}
          </SplitReveal>
        </div>

        <div className="scrim relative mt-20 md:pl-16">
          {/* the progress line — gradient as a working element, not decoration */}
          <div className="absolute left-[7px] top-0 hidden h-full w-px bg-line md:block" />
          <div
            ref={lineRef}
            className="absolute left-[7px] top-0 hidden h-full w-px origin-top gradient-line md:block"
          />

          <ol className="space-y-16">
            {dict.steps.map((s) => (
              <li key={s.n}>
                <FadeReveal className="grid grid-cols-1 gap-4 md:grid-cols-[6rem_1fr] md:gap-10">
                  <span className="font-mono text-sm tracking-[0.3em] text-mute">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-bold uppercase text-ink md:text-3xl">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink2 md:text-base">
                      {s.text}
                    </p>
                  </div>
                </FadeReveal>
              </li>
            ))}
          </ol>
        </div>
        </div>
      </div>
    </section>
  );
}
