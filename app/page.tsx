import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Concept from "@/components/Concept";
import Talents from "@/components/Talents";
import Audition from "@/components/Audition";
import News from "@/components/News";

import Contact from "@/components/Contact";
import Company from "@/components/Company";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { getNewsList, getTalentsList } from "@/lib/microcms";

export const revalidate = 60;

export default async function Home() {
  const [newsItems, talents] = await Promise.all([
    getNewsList(),
    getTalentsList(),
  ]);

  return (
    <>
      <Header />
      <FloatingCTA />
      <main>
        <Hero />
        <Concept />
        <Talents talents={talents} />
        <Audition />
        <News newsItems={newsItems} />

        <Contact />
        <Company />
      </main>
      <Footer />
    </>
  );
}
