import NavBar from '@/components/NavBar';
import ParticleNetwork from '@/components/ParticleNetwork';
import FloatingElements from '@/components/FloatingElements';
import ScrollProgress from '@/components/ScrollProgress';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import YieldVizSection from '@/components/YieldVizSection';
import CommunitySection from '@/components/CommunitySection';
import MiniPaySection from '@/components/MiniPaySection';
import FAQSection from '@/components/FAQSection';
import FooterSection from '@/components/FooterSection';

export default function Home() {
  return (
    <div style={{ background: '#050c08', minHeight: '100vh', position: 'relative' }}>
      {/* Fixed background elements */}
      <ParticleNetwork />
      <FloatingElements />
      <ScrollProgress />

      {/* Navigation */}
      <NavBar />

      {/* Main content */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <YieldVizSection />
        <CommunitySection />
        <MiniPaySection />
        <FAQSection />
      </main>

      <FooterSection />
    </div>
  );
}
