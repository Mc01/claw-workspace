import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import Features from '@/components/sections/Features';
import HowItWorks from '@/components/sections/HowItWorks';
import Tokenomics from '@/components/sections/Tokenomics';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main style={{ background: '#030712', minHeight: '100vh' }}>
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Tokenomics />
      <CTA />
      <Footer />
    </main>
  );
}
