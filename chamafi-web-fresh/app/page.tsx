import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProblemSection from "./components/ProblemSection";
import SolutionSection from "./components/SolutionSection";
import HowItWorksSection from "./components/HowItWorksSection";
import WaitlistSection from "./components/WaitlistSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-slate-900">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <WaitlistSection />
      <Footer />
    </main>
  );
}
