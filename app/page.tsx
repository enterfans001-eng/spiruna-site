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

export default function Home() {
  return (
    <>
      <Header />
      <FloatingCTA />
      <main>
        <Hero />
        <Concept />
        <Talents />
        <Audition />
        <News />

        <Contact />
        <Company />
      </main>
      <Footer />
    </>
  );
}
