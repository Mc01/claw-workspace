'use client';

import { useState, useEffect } from 'react';
import { detectSurface } from '@/lib/surfaceDetection';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import WaitlistSection from '@/components/WaitlistSection';

export default function Home() {
  const [surface, setSurface] = useState<string | null>(null);

  useEffect(() => {
    setSurface(detectSurface());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-emerald-50">
      <main>
        <HeroSection surface={surface} />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <WaitlistSection />
      </main>
    </div>
  );
}