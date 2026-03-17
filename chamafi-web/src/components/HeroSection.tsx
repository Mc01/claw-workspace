'use client';

import { useState, useEffect } from 'react';

interface HeroSectionProps {
  surface: string | null;
}

export default function HeroSection({ surface }: HeroSectionProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative overflow-hidden bg-slate-900">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-slate-900 to-emerald-900/20" />
      
      {/* Animated glow spots */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative mx-auto max-w-7xl">
        <div className="pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32 pt-20">
          <main className="mx-auto max-w-7xl px-4 sm:px-6 md:mt-16 lg:mt-20 lg:px-8">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
                <span className="block">Save Together.</span>
                <span className="block bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-transparent">
                  Grow Together.
                </span>
              </h1>
              <p className="mt-6 text-lg text-gray-400 sm:mx-auto sm:max-w-xl sm:text-xl md:mt-8 lg:mx-0">
                The future of African savings circles on Celo. 
                Create a Chama, pool resources, earn yield — all on-chain.
              </p>
              <div className="mt-8 sm:mt-12 sm:flex sm:justify-center lg:justify-start gap-4">
                <a
                  href="#waitlist"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white rounded-xl bg-gradient-to-r from-emerald-500 to-violet-600 hover:from-emerald-400 hover:to-violet-500 transition-all shadow-lg shadow-emerald-500/25"
                >
                  Create Chama
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-300 border border-slate-700 rounded-xl hover:border-emerald-500 hover:text-white transition-all"
                >
                  Learn More
                </a>
              </div>
              {isClient && surface && (
                <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Optimized for {surface === 'minipay' ? 'MiniPay' : surface === 'farcaster' ? 'Farcaster' : 'Web'}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
