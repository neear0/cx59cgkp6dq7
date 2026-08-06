export const locales = ["en", "sk", "cs"] as const;
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
    /** Index rows. Only the first one has copy so far — the rest are titles. */
    items: { title: string; tag?: string; text?: string }[];
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
  contact: { eyebrow: string; title: TriText; cta: string };
  footer: { tagline: string; language: string };
}

const en: Dict = {
  meta: {
    title: "DATIQA.AI — Turning Data Into Meaningful Innovation",
    description:
      "From data integrations and end-to-end data solutions to planning and reporting automation, optimisation and user training.",
  },
  nav: {
    services: "What we do",
    approach: "Approach",
    process: "Process",
    contact: "Contact",
  },
  hero: {
    eyebrow: "Data Intelligence Studio",
    title: { pre: "Turning Data Into ", highlight: "Meaningful", post: " Innovation" },
    sub: "We transform complex data into intelligent business decisions using machine learning and advanced analytics.",
    ctaPrimary: "Explore Services",
    ctaSecondary: "Contact Us",
    scroll: "Scroll",
  },
  services: {
    eyebrow: "Explore",
    heading:
      "Data fuels transformation. AI drives innovation. Together, they create a limitless future.",
    items: [
      {
        title: "What we do",
        text: "From data integrations, through the implementation of end-to-end data solutions and the automation of planning and reporting, all the way to optimisation and user training. We will be your guide to a fast and effective adoption of new technologies and artificial intelligence.",
      },
      { title: "Case studies" },
      { title: "Blog" },
      { title: "Our story" },
    ],
  },
  approach: {
    eyebrow: "Approach",
    heading: "Data is only as valuable as the decisions it drives",
    para: "We don't sell dashboards. We build systems that learn from your data and quietly change how your company decides — every hour, every day.",
    // TODO: placeholder figures — replace with numbers confirmed by the client.
    stats: [
      { value: 2.4, suffix: "B+", decimals: 1, label: "data points processed daily" },
      { value: 97, suffix: "%", decimals: 0, label: "model accuracy in production" },
      { value: 12, suffix: "×", decimals: 0, label: "faster time to insight" },
    ],
  },
  process: {
    eyebrow: "Process",
    heading: "Four steps, one system",
    steps: [
      {
        n: "01",
        title: "Discover",
        text: "We map your data landscape — sources, quality, gaps — and find where intelligence will pay off first.",
      },
      {
        n: "02",
        title: "Engineer",
        text: "Clean pipelines and a solid foundation. Boring on purpose, so everything above it can be ambitious.",
      },
      {
        n: "03",
        title: "Model",
        text: "Train, evaluate, iterate. Models earn their place in production by beating the baseline, not by being fashionable.",
      },
      {
        n: "04",
        title: "Scale",
        text: "Deployment, monitoring and retraining loops that keep accuracy high as your data grows.",
      },
    ],
  },
  contact: {
    eyebrow: "Start a project",
    title: {
      pre: "Together, we maximize the ",
      highlight: "value",
      post: " of your data.",
    },
    cta: "Contact us",
  },
  footer: { tagline: "Turning data into meaningful innovation", language: "Language" },
};

const sk: Dict = {
  meta: {
    title: "DATIQA.AI — Meníme dáta na zmysluplné inovácie",
    description:
      "Od dátových integrácií a end-to-end dátových riešení cez automatizáciu plánovania a reportingu až po optimalizáciu a užívateľské školenia.",
  },
  nav: {
    services: "Čo robíme",
    approach: "Prístup",
    process: "Proces",
    contact: "Kontakt",
  },
  hero: {
    eyebrow: "Data Intelligence Studio",
    title: { pre: "Meníme dáta na ", highlight: "zmysluplné", post: " inovácie" },
    sub: "Premieňame komplexné dáta na inteligentné biznisové rozhodnutia pomocou strojového učenia a pokročilej analytiky.",
    ctaPrimary: "Preskúmať služby",
    ctaSecondary: "Kontaktujte nás",
    scroll: "Skroluj",
  },
  services: {
    eyebrow: "Objavte",
    heading:
      "Dáta poháňajú transformáciu. Umelá inteligencia poháňa inovácie. Spoločne vytvárajú budúcnosť bez hraníc.",
    items: [
      {
        title: "Čo robíme",
        text: "Od dátových integrácií, cez implementáciu end-to-end dátových riešení a automatizáciu plánovania, či reportingu až po optimalizáciu a užívateľské školenia. Budeme Vašim sprievodcom rýchlou a efektívnou adopciou nových technológií a umelej inteligencie.",
      },
      { title: "Ukážky riešení" },
      { title: "Blog" },
      { title: "Náš príbeh" },
    ],
  },
  approach: {
    eyebrow: "Prístup",
    heading: "Dáta majú len takú hodnotu, akú majú rozhodnutia, ktoré prinášajú",
    para: "Nepredávame dashboardy. Staviame systémy, ktoré sa učia z vašich dát a potichu menia to, ako vaša firma rozhoduje — každú hodinu, každý deň.",
    // TODO: placeholder čísla — nahradiť údajmi potvrdenými klientkou.
    stats: [
      { value: 2.4, suffix: "B+", decimals: 1, label: "denne spracovaných dátových bodov" },
      { value: 97, suffix: "%", decimals: 0, label: "presnosť modelov v produkcii" },
      { value: 12, suffix: "×", decimals: 0, label: "rýchlejšia cesta k poznatkom" },
    ],
  },
  process: {
    eyebrow: "Proces",
    heading: "Štyri kroky, jeden systém",
    steps: [
      {
        n: "01",
        title: "Objaviť",
        text: "Zmapujeme vašu dátovú krajinu — zdroje, kvalitu, medzery — a nájdeme, kde sa inteligencia oplatí najskôr.",
      },
      {
        n: "02",
        title: "Postaviť",
        text: "Čisté pipeliny a pevné základy. Zámerne nudné, aby všetko nad nimi mohlo byť ambiciózne.",
      },
      {
        n: "03",
        title: "Modelovať",
        text: "Trénovať, vyhodnocovať, iterovať. Modely si miesto v produkcii zaslúžia tým, že porazia baseline, nie tým, že sú v móde.",
      },
      {
        n: "04",
        title: "Škálovať",
        text: "Nasadenie, monitoring a retrénovacie slučky, ktoré držia presnosť vysoko aj keď vaše dáta rastú.",
      },
    ],
  },
  contact: {
    eyebrow: "Začnime projekt",
    title: {
      pre: "Spoločne za maximalizáciou ",
      highlight: "hodnoty",
      post: " Vašich dát.",
    },
    cta: "Ozvite sa nám",
  },
  footer: { tagline: "Meníme dáta na zmysluplné inovácie", language: "Jazyk" },
};

const cs: Dict = {
  meta: {
    title: "DATIQA.AI — Měníme data ve smysluplné inovace",
    description:
      "Od datových integrací a end-to-end datových řešení přes automatizaci plánování a reportingu až po optimalizaci a uživatelská školení.",
  },
  nav: {
    services: "Co děláme",
    approach: "Přístup",
    process: "Proces",
    contact: "Kontakt",
  },
  hero: {
    eyebrow: "Data Intelligence Studio",
    title: { pre: "Měníme data ve ", highlight: "smysluplné", post: " inovace" },
    sub: "Proměňujeme komplexní data v inteligentní byznysová rozhodnutí pomocí strojového učení a pokročilé analytiky.",
    ctaPrimary: "Prozkoumat služby",
    ctaSecondary: "Kontaktujte nás",
    scroll: "Skroluj",
  },
  services: {
    eyebrow: "Objevte",
    heading:
      "Data pohánějí transformaci. Umělá inteligence pohání inovace. Společně vytvářejí budoucnost bez hranic.",
    items: [
      {
        title: "Co děláme",
        text: "Od datových integrací, přes implementaci end-to-end datových řešení a automatizaci plánování či reportingu až po optimalizaci a uživatelská školení. Budeme Vaším průvodcem rychlou a efektivní adopcí nových technologií a umělé inteligence.",
      },
      { title: "Ukázky řešení" },
      { title: "Blog" },
      { title: "Náš příběh" },
    ],
  },
  approach: {
    eyebrow: "Přístup",
    heading: "Data mají jen takovou hodnotu, jakou mají rozhodnutí, která přinášejí",
    para: "Neprodáváme dashboardy. Stavíme systémy, které se učí z vašich dat a potichu mění to, jak vaše firma rozhoduje — každou hodinu, každý den.",
    // TODO: placeholder čísla — nahradit údaji potvrzenými klientkou.
    stats: [
      { value: 2.4, suffix: "B+", decimals: 1, label: "denně zpracovaných datových bodů" },
      { value: 97, suffix: "%", decimals: 0, label: "přesnost modelů v produkci" },
      { value: 12, suffix: "×", decimals: 0, label: "rychlejší cesta k poznatkům" },
    ],
  },
  process: {
    eyebrow: "Proces",
    heading: "Čtyři kroky, jeden systém",
    steps: [
      {
        n: "01",
        title: "Objevit",
        text: "Zmapujeme vaši datovou krajinu — zdroje, kvalitu, mezery — a najdeme, kde se inteligence vyplatí nejdřív.",
      },
      {
        n: "02",
        title: "Postavit",
        text: "Čisté pipeliny a pevné základy. Záměrně nudné, aby všechno nad nimi mohlo být ambiciózní.",
      },
      {
        n: "03",
        title: "Modelovat",
        text: "Trénovat, vyhodnocovat, iterovat. Modely si místo v produkci zaslouží tím, že porazí baseline, ne tím, že jsou v módě.",
      },
      {
        n: "04",
        title: "Škálovat",
        text: "Nasazení, monitoring a retrénovací smyčky, které drží přesnost vysoko, i když vaše data rostou.",
      },
    ],
  },
  contact: {
    eyebrow: "Začněme projekt",
    title: {
      pre: "Společně za maximalizací ",
      highlight: "hodnoty",
      post: " Vašich dat.",
    },
    cta: "Ozvěte se nám",
  },
  footer: { tagline: "Měníme data ve smysluplné inovace", language: "Jazyk" },
};

export const dictionaries: Record<Locale, Dict> = { en, sk, cs };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
