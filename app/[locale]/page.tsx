import dynamic from "next/dynamic";
import { dictionaries, isLocale, type Locale } from "@/lib/i18n";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Approach from "@/components/sections/Approach";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

const ParticleField = dynamic(() => import("@/components/canvas/ParticleField"));

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const dict = dictionaries[safeLocale];

  return (
    <SmoothScroll>
      <ParticleField />
      <Cursor />
      <Nav dict={dict.nav} />
      <main className="relative z-10">
        <Hero dict={dict.hero} />
        <Services dict={dict.services} />
        <Approach dict={dict.approach} />
        <Process dict={dict.process} />
        <Contact dict={dict.contact} />
      </main>
      <Footer dict={dict.footer} locale={safeLocale} />
    </SmoothScroll>
  );
}
