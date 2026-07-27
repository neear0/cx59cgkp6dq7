export const locales = ["en", "sk", "cs", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Headline with one gradient-highlighted word. */
export interface TriText {
  pre: string;
  highlight: string;
  post: string;
}

export interface Dict {
  meta: { title: string; description: string };
  nav: { services: string; approach: string; process: string; contact: string };
  hero: {
    eyebrow: string;
    title: TriText;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scroll: string;
  };
  services: {
    eyebrow: string;
    heading: string;
    items: { tag: string; title: string; text: string }[];
  };
  approach: {
    eyebrow: string;
    heading: string;
    para: string;
    stats: { value: number; suffix: string; decimals: number; label: string }[];
  };
  process: {
    eyebrow: string;
    heading: string;
    steps: { n: string; title: string; text: string }[];
  };
  contact: { eyebrow: string; title: TriText };
  footer: { tagline: string; language: string };
}

/**
 * Placeholder copy. The public preview build runs on lorem ipsum — only the
 * slogan (hero headline + footer tagline) stays real, per locale, in `brand`.
 */
const ipsum = {
  metaDescription:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  nav: { services: "Lorem", approach: "Ipsum", process: "Dolor", contact: "Amet" },
  hero: {
    eyebrow: "Lorem Ipsum Dolor",
    sub: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ctaPrimary: "Lorem ipsum",
    ctaSecondary: "Dolor sit",
  },
  services: {
    eyebrow: "Lorem ipsum",
    heading: "Consectetur adipiscing elit, sed do eiusmod",
    items: [
      {
        tag: "Lorem",
        title: "Lorem Ipsum",
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        tag: "Ipsum",
        title: "Dolor Sit Amet",
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.",
      },
      {
        tag: "Dolor",
        title: "Consectetur",
        text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
      },
      {
        tag: "Amet",
        title: "Adipiscing Elit",
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      },
    ],
  },
  approach: {
    eyebrow: "Lorem",
    heading: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem",
    para: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt — neque porro quisquam est.",
    stats: [
      { value: 2.4, suffix: "B+", decimals: 1, label: "lorem ipsum dolor sit amet" },
      { value: 97, suffix: "%", decimals: 0, label: "consectetur adipiscing elit" },
      { value: 12, suffix: "×", decimals: 0, label: "sed do eiusmod tempor" },
    ],
  },
  process: {
    eyebrow: "Ipsum",
    heading: "Quattuor gradus, unum systema",
    steps: [
      {
        n: "01",
        title: "Lorem",
        text: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid.",
      },
      {
        n: "02",
        title: "Ipsum",
        text: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
      },
      {
        n: "03",
        title: "Dolor",
        text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti.",
      },
      {
        n: "04",
        title: "Amet",
        text: "Et harum quidem rerum facilis est et expedita distinctio, nam libero tempore cum soluta nobis est eligendi.",
      },
    ],
  },
  contactEyebrow: "Lorem ipsum",
  contactTitle: { pre: "Lorem ipsum dolor sit ", highlight: "amet", post: "" },
} as const;

/** The only real copy left in the preview build: the slogan, per locale. */
const brand: Record<
  Locale,
  { metaTitle: string; title: TriText; tagline: string; scroll: string; language: string }
> = {
  en: {
    metaTitle: "DATIQA.AI — Turning Data Into Meaningful Innovation",
    title: { pre: "Turning Data Into ", highlight: "Meaningful", post: " Innovation" },
    tagline: "Turning data into meaningful innovation",
    scroll: "Scroll",
    language: "Language",
  },
  sk: {
    metaTitle: "DATIQA.AI — Meníme dáta na zmysluplné inovácie",
    title: { pre: "Meníme dáta na ", highlight: "zmysluplné", post: " inovácie" },
    tagline: "Meníme dáta na zmysluplné inovácie",
    scroll: "Skroluj",
    language: "Jazyk",
  },
  cs: {
    metaTitle: "DATIQA.AI — Měníme data ve smysluplné inovace",
    title: { pre: "Měníme data ve ", highlight: "smysluplné", post: " inovace" },
    tagline: "Měníme data ve smysluplné inovace",
    scroll: "Skroluj",
    language: "Jazyk",
  },
  de: {
    metaTitle: "DATIQA.AI — Wir verwandeln Daten in sinnvolle Innovation",
    title: { pre: "Wir verwandeln Daten in ", highlight: "sinnvolle", post: " Innovation" },
    tagline: "Wir verwandeln Daten in sinnvolle Innovation",
    scroll: "Scrollen",
    language: "Sprache",
  },
};

function buildDict(locale: Locale): Dict {
  const b = brand[locale];
  return {
    meta: { title: b.metaTitle, description: ipsum.metaDescription },
    nav: { ...ipsum.nav },
    hero: {
      eyebrow: ipsum.hero.eyebrow,
      title: b.title,
      sub: ipsum.hero.sub,
      ctaPrimary: ipsum.hero.ctaPrimary,
      ctaSecondary: ipsum.hero.ctaSecondary,
      scroll: b.scroll,
    },
    services: {
      eyebrow: ipsum.services.eyebrow,
      heading: ipsum.services.heading,
      items: ipsum.services.items.map((i) => ({ ...i })),
    },
    approach: {
      eyebrow: ipsum.approach.eyebrow,
      heading: ipsum.approach.heading,
      para: ipsum.approach.para,
      stats: ipsum.approach.stats.map((s) => ({ ...s })),
    },
    process: {
      eyebrow: ipsum.process.eyebrow,
      heading: ipsum.process.heading,
      steps: ipsum.process.steps.map((s) => ({ ...s })),
    },
    contact: { eyebrow: ipsum.contactEyebrow, title: { ...ipsum.contactTitle } },
    footer: { tagline: b.tagline, language: b.language },
  };
}

export const dictionaries: Record<Locale, Dict> = {
  en: buildDict("en"),
  sk: buildDict("sk"),
  cs: buildDict("cs"),
  de: buildDict("de"),
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
