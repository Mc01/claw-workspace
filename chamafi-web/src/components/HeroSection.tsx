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
    <div className="relative overflow-hidden bg-gradient-to-r from-amber-900 to-emerald-800">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 bg-gradient-to-r from-amber-900/80 to-emerald-800/80 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
          <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-amber-100 sm:text-5xl md:text-6xl">
                <span className="block">ChamaFi — Chamas</span>
                <span className="block text-emerald-300">That Grow</span>
              </h1>
              <p className="mt-3 text-base text-amber-200 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                Empowering African communities with decentralized finance tools to save, invest, and grow together.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="#waitlist"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-600 px-8 py-3 text-base font-medium text-white hover:bg-emerald-700 md:py-4 md:px-10 md:text-lg"
                  >
                    Join Waitlist
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#how-it-works"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-amber-100 px-8 py-3 text-base font-medium text-amber-900 hover:bg-amber-200 md:py-4 md:px-10 md:text-lg"
                  >
                    How It Works
                  </a>
                </div>
              </div>
              {isClient && surface && (
                <div className="mt-4 text-sm text-amber-300">
                  Detected surface: {surface.charAt(0).toUpperCase() + surface.slice(1)}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}