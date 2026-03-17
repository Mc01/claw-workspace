import Navbar           from "./components/Navbar";
import HeroSection      from "./components/HeroSection";
import ProblemSection   from "./components/ProblemSection";
import SolutionSection  from "./components/SolutionSection";
import HowItWorksSection from "./components/HowItWorksSection";
import CommunitySection from "./components/CommunitySection";
import MiniPaySection   from "./components/MiniPaySection";
import TokenomicsSection from "./components/TokenomicsSection";
import Footer           from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-[#1a1008] text-[#f5e6c8] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <CommunitySection />
      <MiniPaySection />
      <TokenomicsSection />
      <Footer />
    </main>
  );
}
