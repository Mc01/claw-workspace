import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import MiniPaySection from '@/components/MiniPaySection';
import FAQSection from '@/components/FAQSection';
import FooterSection from '@/components/FooterSection';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: '#0a0f0d' }}>
      <NavBar />
      <main>
        <HeroSection />
        <StatsBar />
        <FeaturesSection />
        <HowItWorksSection />
        <MiniPaySection />
        <FAQSection />
      </main>
      <FooterSection />
    </div>
  );
}
