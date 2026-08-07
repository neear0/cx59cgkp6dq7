"use client";

import { SplitReveal, FadeReveal } from "../Reveal";
import type { Dict } from "@/lib/i18n";

export default function Services({ dict }: { dict: Dict["services"] }) {
  return (
    <section
      id="services"
      className="relative px-6 py-32 md:px-12 md:py-44 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        {/* content keeps to the left — the particle formation flows right */}
        <div className="md:max-w-[38rem]">
          <div className="scrim">
            <FadeReveal>
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.4em] text-mute">
                {dict.eyebrow}
              </p>
            </FadeReveal>
            {/* smaller than the other section headings — this one carries a
                three-sentence claim, not a few words. The 1.4rem floor is set
                by "TRANSFORMATION." at 320px: wider than that and the char
                masks break it mid-word. */}
            <SplitReveal
              as="h2"
              className="font-display text-[clamp(1.4rem,3.6vw,2.6rem)] font-bold uppercase leading-[1.08] tracking-tight text-ink"
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
                  {s.tag && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-mute transition-colors duration-500 group-hover:text-ink">
                      {s.tag}
                    </span>
                  )}
                  <div className={`flex items-baseline justify-between gap-4 ${s.tag ? "mt-2" : ""}`}>
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
                  {s.text && (
                    <p className="mt-3 text-sm leading-relaxed text-ink2 md:text-base">
                      {s.text}
                    </p>
                  )}
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
