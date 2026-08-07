"use client";

import { useRef, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { SplitReveal, FadeReveal } from "../Reveal";
import Magnetic from "../Magnetic";
import type { Dict } from "@/lib/i18n";

const MAIL = "hello@datiqa.ai";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = "name" | "email" | "message";

export default function Contact({ dict }: { dict: Dict["contact"] }) {
  const f = dict.form;
  const wrapRef = useRef<HTMLDivElement>(null);
  const claimRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});

  const isReduced = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /**
   * Applies a state change and tweens the wrapper between the old and the new
   * natural height. Only the visible panel is in flow, so the section is never
   * padded out by the taller one — on a phone the form is a good deal taller
   * than the claim, and stacking them left a screenful of dead space.
   */
  const resize = (mutate: () => void) => {
    const wrap = wrapRef.current!;
    const start = wrap.offsetHeight;
    flushSync(mutate);
    const end = wrap.offsetHeight;
    if (start === end) return;
    gsap.fromTo(
      wrap,
      { height: start },
      {
        height: end,
        duration: isReduced() ? 0 : 0.55,
        ease: "power2.inOut",
        clearProps: "height",
      }
    );
  };

  /** Crossfade between the claim and the form. */
  const swap = (next: boolean) => {
    if (next === open) return;
    const out = next ? claimRef.current : formRef.current;
    const into = next ? formRef.current : claimRef.current;
    const scale = isReduced() ? 0 : 1;

    resize(() => setOpen(next));

    gsap
      .timeline()
      .to(out, {
        autoAlpha: 0,
        y: -16,
        filter: "blur(6px)",
        duration: 0.4 * scale,
        ease: "power2.in",
      })
      .fromTo(
        into,
        { autoAlpha: 0, y: 24, filter: "blur(8px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7 * scale,
          ease: "power3.out",
          onComplete: () => {
            if (next) nameRef.current?.focus({ preventScroll: true });
          },
        }
      );
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const name = value("name");
    const email = value("email");
    const company = value("company");
    const message = value("message");

    const next: Partial<Record<Field, string>> = {};
    if (!name) next.name = f.required;
    if (!email) next.email = f.required;
    else if (!EMAIL_RE.test(email)) next.email = f.invalidEmail;
    if (!message) next.message = f.required;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // No server to post to (the site also ships as a static export), so the
    // form hands the message off to the visitor's mail client. Swap this for
    // a POST to a form endpoint or a route handler once one exists.
    const body = [
      `${f.name}: ${name}`,
      `${f.email}: ${email}`,
      company ? `${f.company}: ${company}` : null,
      "",
      message,
    ]
      .filter((line) => line !== null)
      .join("\r\n");

    window.location.href = `mailto:${MAIL}?subject=${encodeURIComponent(
      `${f.mailSubject} — ${name}`
    )}&body=${encodeURIComponent(body)}`;

    // the confirmation replaces the fields inside the already-visible panel
    resize(() => setSent(true));
    gsap.fromTo(
      bodyRef.current,
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: isReduced() ? 0 : 0.6, ease: "power3.out" }
    );
  };

  // underline fields: the focus ring would draw a box around a line, so the
  // border colour carries the focus state instead
  const fieldClass =
    "field w-full border-b border-line bg-transparent px-1 pb-3 pt-2 text-base text-ink transition-colors duration-300 hover:border-ink/25";
  const labelClass =
    "mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-mute";
  const errorClass =
    "mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-pink";

  return (
    <section
      id="contact"
      className="relative px-6 py-40 text-center md:px-12 md:py-56 lg:px-20"
    >
      {/* only the active panel is in flow; the other is lifted out of it and
          the wrapper tweens between the two heights */}
      <div ref={wrapRef} className="relative mx-auto max-w-6xl">
        <div
          ref={claimRef}
          inert={open || undefined}
          className={open ? "absolute inset-x-0 top-0" : "relative"}
        >
          <div className="scrim">
            <FadeReveal>
              <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.4em] text-mute">
                {dict.eyebrow}
              </p>
            </FadeReveal>

            {/* Purely viewport-scaled, with no large minimum: the SplitText char
                masks let a line break between letters, so any word wider than the
                line breaks mid-word. MAXIMALIZÁCIOU is the widest word across the
                three locales (~14.7× the font size) — 5.4vw keeps it inside the
                line from 320px up, and 4.5rem caps it against max-w-6xl. */}
            <SplitReveal
              as="h2"
              className="font-display text-[clamp(0.9rem,5.4vw,4.5rem)] font-extrabold uppercase leading-[1] tracking-tight text-ink"
            >
              {dict.title.pre}
              <span className="text-gradient">{dict.title.highlight}</span>
              {dict.title.post}
            </SplitReveal>

            <FadeReveal delay={0.2} className="mt-16 flex justify-center">
              <Magnetic strength={0.4}>
                <button
                  type="button"
                  onClick={() => swap(true)}
                  className="group relative inline-block overflow-hidden rounded-full border border-line px-12 py-6 font-mono text-[13px] uppercase tracking-[0.25em] text-ink transition-colors duration-300"
                >
                  <span className="relative z-10">{dict.cta}</span>
                  <span className="absolute inset-x-0 bottom-0 h-px gradient-line opacity-60 transition-all duration-500 group-hover:h-full group-hover:opacity-20" />
                </button>
              </Magnetic>
            </FadeReveal>
          </div>
        </div>

        <div
          ref={formRef}
          inert={open ? undefined : true}
          className={`invisible opacity-0 ${
            open ? "relative" : "absolute inset-x-0 top-0"
          }`}
        >
          {/* the panel is opaque enough to read against the particle field */}
          <div
            ref={bodyRef}
            className="scrim mx-auto max-w-2xl rounded-[2rem] border border-line bg-bg/85 p-8 text-left backdrop-blur-xl md:p-12"
          >
            {sent ? (
              <div className="text-center">
                <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.4em] text-mute">
                  {f.eyebrow}
                </p>
                <h3 className="font-display text-4xl font-extrabold uppercase tracking-tight text-ink md:text-5xl">
                  {f.successTitle}
                </h3>
                <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ink2">
                  {f.successText}
                </p>
                <button
                  type="button"
                  onClick={() => swap(false)}
                  className="link-sweep mt-10 inline-block font-mono text-[11px] uppercase tracking-[0.25em] text-ink2 transition-colors hover:text-ink"
                >
                  ← {f.back}
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={submit}>
                <p className="mb-10 text-center font-mono text-[11px] uppercase tracking-[0.4em] text-mute">
                  {f.eyebrow}
                </p>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="contact-name">
                      {f.name}
                    </label>
                    <input
                      ref={nameRef}
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      aria-invalid={errors.name ? true : undefined}
                      className={fieldClass}
                    />
                    {errors.name && <p className={errorClass}>{errors.name}</p>}
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="contact-email">
                      {f.email}
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      aria-invalid={errors.email ? true : undefined}
                      className={fieldClass}
                    />
                    {errors.email && (
                      <p className={errorClass}>{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="mt-8">
                  <label className={labelClass} htmlFor="contact-company">
                    {f.company}
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    className={fieldClass}
                  />
                </div>

                <div className="mt-8">
                  <label className={labelClass} htmlFor="contact-message">
                    {f.message}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    aria-invalid={errors.message ? true : undefined}
                    className={`${fieldClass} resize-none`}
                  />
                  {errors.message && (
                    <p className={errorClass}>{errors.message}</p>
                  )}
                </div>

                {/* on a phone the send button goes full width and sits above
                    the back link, so the primary action is the closer one */}
                <div className="mt-12 flex flex-col-reverse gap-6 md:flex-row md:items-center md:justify-between">
                  <button
                    type="button"
                    onClick={() => swap(false)}
                    className="link-sweep self-start py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-ink2 transition-colors hover:text-ink"
                  >
                    ← {f.back}
                  </button>

                  <button
                    type="submit"
                    className="group relative block w-full overflow-hidden rounded-full bg-ink px-10 py-5 font-mono text-[12px] uppercase tracking-[0.2em] text-bg md:inline-block md:w-auto"
                  >
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-ink">
                      {f.submit}
                    </span>
                    <span className="absolute inset-0 translate-y-full gradient-line transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
