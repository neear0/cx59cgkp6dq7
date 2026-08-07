"use client";

import { useRouter } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

export default function LangSwitcher({
  current,
  label,
}: {
  current: Locale;
  label: string;
}) {
  const router = useRouter();

  const choose = (locale: Locale) => {
    // remember the manual choice — the proxy honours it over Accept-Language
    document.cookie = `locale=${locale};path=/;max-age=31536000;samesite=lax`;
    router.push(`/${locale}`);
  };

  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-mute">
        {label}
      </span>
      <div className="flex items-center gap-2">
        {locales.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => choose(l)}
            aria-current={l === current ? "true" : undefined}
            className={`rounded-full border px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
              l === current
                ? "border-purple/60 text-ink"
                : "border-line text-ink2 hover:text-ink"
            }`}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}
