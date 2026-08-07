import LangSwitcher from "../LangSwitcher";
import type { Dict, Locale } from "@/lib/i18n";

export default function Footer({
  dict,
  locale,
}: {
  dict: Dict["footer"];
  locale: Locale;
}) {
  return (
    <footer className="relative z-10 border-t border-line bg-bg/85 px-6 py-12 md:px-12 lg:px-20">
      <div className="scrim mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-col items-center gap-3 md:items-start">
          <p className="font-display text-sm font-bold tracking-[0.22em] text-ink">
            DATIQA<span className="text-gradient">.AI</span>
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-mute">
            {dict.tagline}
          </p>
        </div>

        <LangSwitcher current={locale} label={dict.language} />

        {/* build credit — the brand colours belong to the linked studios */}
        <div className="flex flex-col items-center gap-1 md:items-end">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-mute">
            © 2026 DATIQA.AI
          </p>

          <a
            href="https://voidsolutions.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="mark group flex items-baseline gap-2 py-1.5 font-mono uppercase"
          >
            <span className="text-[9px] tracking-[0.35em] text-mute/60 transition-colors duration-500 group-hover:text-mute">
              powered by
            </span>
            <span className="text-[11px] font-bold tracking-[0.28em]">
              <span className="mark-a">void</span>
              <span className="mark-b">solutions</span>
            </span>
          </a>

          <a
            href="https://lumaweb.sk"
            target="_blank"
            rel="noopener noreferrer"
            className="mark py-1.5 font-mono text-[9px] uppercase tracking-[0.32em]"
          >
            <span className="mark-c">luma</span>
            <span className="mark-d">web</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
