'use client';

import { useState, useEffect } from 'react';
import { detectSurface } from '@/lib/surfaceDetection';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import TokenomicsSection from '@/components/TokenomicsSection';
import SocialProofSection from '@/components/SocialProofSection';
import FAQSection from '@/components/FAQSection';
import WaitlistSection from '@/components/WaitlistSection';

export default function Home() {
  const [surface, setSurface] = useState<string | null>(null);

  useEffect(() => {
    setSurface(detectSurface());
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      <main>
        <HeroSection surface={surface} />
        <StatsSection />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TokenomicsSection />
        <SocialProofSection />
        <FAQSection />
        <WaitlistSection />
      </main>
    </div>
  );
}
