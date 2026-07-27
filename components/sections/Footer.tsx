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
    <footer className="relative z-10 border-t border-line bg-bg/85 px-6 py-12">
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

        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-mute">
          © 2026 DATIQA.AI
        </p>
      </div>
    </footer>
  );
}
