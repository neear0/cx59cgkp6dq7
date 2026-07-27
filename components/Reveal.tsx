"use client";

import { createElement, useRef, type ReactNode, type ElementType } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/** Headline assembled letter by letter as it scrolls into view. */
export function SplitReveal({
  children,
  as: Tag = "h2",
  className,
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // gradient spans are ignored by the splitter (background-clip: text
    // breaks inside mask wrappers) and animate as whole words instead;
    // char masks (not line masks) keep word wrapping native, so headlines
    // never break mid-word in any language
    const split = SplitText.create(el, {
      type: "chars,words",
      mask: "chars",
      ignore: ".text-gradient",
      autoSplit: true,
      onSplit(self) {
        const targets = [
          ...(self.chars as HTMLElement[]),
          ...Array.from(el.querySelectorAll<HTMLElement>(".text-gradient")),
        ].sort((a, b) =>
          a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
        );
        return gsap.from(targets, {
          yPercent: 115,
          rotate: 4,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.018,
          delay,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      },
    });
    return () => split.revert();
  }, [delay]);

  return createElement(Tag, { ref, className }, children);
}

/** Block that blurs and fades into place. */
export function FadeReveal({
  children,
  className,
  delay = 0,
  y = 40,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.from(el, {
      y,
      autoAlpha: 0,
      filter: "blur(10px)",
      duration: 1.2,
      ease: "power3.out",
      delay,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  }, [delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
