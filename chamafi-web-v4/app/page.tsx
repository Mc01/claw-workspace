import { GradientBackground } from "./components/GradientBackground";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { MiniPaySection } from "./components/MiniPaySection";
import { Tokenomics } from "./components/Tokenomics";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <>
      <GradientBackground />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <MiniPaySection />
        <Tokenomics />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
