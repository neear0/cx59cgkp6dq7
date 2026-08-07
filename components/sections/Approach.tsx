"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitReveal, FadeReveal } from "../Reveal";
import type { Dict } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export default function Approach({ dict }: { dict: Dict["approach"] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const value = parseFloat(el.dataset.count ?? "0");
        const decimals = parseInt(el.dataset.decimals ?? "0", 10);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: value,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = obj.v.toFixed(decimals);
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="approach"
      className="relative px-6 py-32 md:px-12 md:py-44 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        {/* content keeps to the right — the particle formation flows left */}
        <div className="md:ml-auto md:max-w-[36rem]">
          <div className="scrim">
            <FadeReveal>
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.4em] text-mute">
                {dict.eyebrow}
              </p>
            </FadeReveal>

            <SplitReveal
              as="h2"
              className="font-display text-[clamp(1.8rem,4.5vw,3.4rem)] font-bold uppercase leading-[1.02] tracking-tight text-ink"
            >
              {dict.heading}
            </SplitReveal>

            <FadeReveal className="mt-10" delay={0.15}>
              <p className="text-base leading-relaxed text-ink2 md:text-lg">
                {dict.para}
              </p>
            </FadeReveal>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {dict.stats.map((s) => (
              <FadeReveal key={s.label} className="bg-card/85 p-8 md:bg-card/60">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <p className="font-display text-5xl font-bold text-ink">
                    <span data-count={s.value} data-decimals={s.decimals}>
                      0
                    </span>
                    <span className="text-gradient">{s.suffix}</span>
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-mute">
                    {s.label}
                  </p>
                </div>
              </FadeReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
