"use client";

import { SplitReveal, FadeReveal } from "../Reveal";
import Magnetic from "../Magnetic";
import type { Dict } from "@/lib/i18n";

export default function Contact({ dict }: { dict: Dict["contact"] }) {
  return (
    <section id="contact" className="relative px-6 py-40 text-center md:py-56">
      <div className="scrim mx-auto max-w-6xl">
        <FadeReveal>
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.4em] text-mute">
            {dict.eyebrow}
          </p>
        </FadeReveal>

        <SplitReveal
          as="h2"
          className="font-display text-[clamp(2.4rem,6.5vw,6rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-ink"
        >
          {dict.title.pre}
          <span className="text-gradient">{dict.title.highlight}</span>
          {dict.title.post}
        </SplitReveal>

        <FadeReveal delay={0.2} className="mt-16 flex justify-center">
          <Magnetic strength={0.4}>
            <a
              href="mailto:hello@datiqa.ai"
              className="group relative inline-block overflow-hidden rounded-full border border-line px-12 py-6 font-mono text-[13px] uppercase tracking-[0.25em] text-ink transition-colors duration-300"
            >
              <span className="relative z-10">hello@datiqa.ai</span>
              <span className="absolute inset-x-0 bottom-0 h-px gradient-line opacity-60 transition-all duration-500 group-hover:h-full group-hover:opacity-20" />
            </a>
          </Magnetic>
        </FadeReveal>
      </div>
    </section>
  );
}
