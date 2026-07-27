import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Syne, Instrument_Sans, Space_Mono } from "next/font/google";
import { dictionaries, locales, isLocale } from "@/lib/i18n";
import "../globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = dictionaries[isLocale(locale) ? locale : "en"];
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    // the public preview build must not compete with the real domain in search
    ...(process.env.STATIC_EXPORT === "1"
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${syne.variable} ${instrument.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
