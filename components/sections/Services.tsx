"use client";

import { SplitReveal, FadeReveal } from "../Reveal";
import type { Dict } from "@/lib/i18n";

export default function Services({ dict }: { dict: Dict["services"] }) {
  return (
    <section id="services" className="relative px-6 py-32 md:py-44">
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

          <div className="scrim mt-16">
            {dict.items.map((s) => (
              <FadeReveal key={s.title}>
                <a
                  href="#contact"
                  className="group block border-t border-line py-8 transition-colors duration-500 last:border-b hover:bg-card/40"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-mute transition-colors duration-500 group-hover:text-ink">
                    {s.tag}
                  </span>
                  <div className="mt-2 flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl font-bold text-ink transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">
                      {s.title}
                    </h3>
                    <span
                      aria-hidden
                      className="text-2xl text-mute transition-all duration-500 group-hover:translate-x-1 group-hover:text-ink"
                    >
                      →
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink2 md:text-base">
                    {s.text}
                  </p>
                  <span className="mt-6 block h-px w-0 gradient-line transition-all duration-700 group-hover:w-full" />
                </a>
              </FadeReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
