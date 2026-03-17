'use client';
import { useEffect, useState } from 'react';

const PHONE_SCREENS = [
  {
    label: 'Dashboard',
    bg: 'linear-gradient(160deg, #1a2820 0%, #0d1610 100%)',
    content: (
      <div className="p-5 h-full flex flex-col gap-4">
        {/* Status bar */}
        <div className="flex justify-between items-center text-xs" style={{ color: '#8fb89a' }}>
          <span>9:41</span>
          <span>●●●</span>
        </div>
        {/* Balance */}
        <div className="glass-card p-4 text-center">
          <div className="text-xs mb-1" style={{ color: '#8fb89a' }}>Total Savings</div>
          <div className="text-3xl font-black" style={{ color: '#35D07F' }}>$2,840</div>
          <div className="text-xs mt-1" style={{ color: '#8fb89a' }}>cUSD · 8 members</div>
        </div>
        {/* Progress */}
        <div className="glass-card p-4">
          <div className="flex justify-between text-xs mb-2" style={{ color: '#8fb89a' }}>
            <span>Round 3 of 8</span>
            <span>37%</span>
          </div>
          <div className="h-2 rounded-full" style={{ background: 'rgba(53,208,127,0.15)' }}>
            <div className="h-2 rounded-full" style={{ width: '37%', background: 'linear-gradient(90deg, #35D07F, #5ef7ab)' }} />
          </div>
        </div>
        {/* Members */}
        <div className="glass-card p-4">
          <div className="text-xs font-semibold mb-3" style={{ color: '#8fb89a' }}>Next Recipient</div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold" style={{ background: 'rgba(53,208,127,0.2)', color: '#35D07F' }}>A</div>
            <div>
              <div className="text-sm font-semibold" style={{ color: '#f0faf4' }}>Amara K.</div>
              <div className="text-xs" style={{ color: '#35D07F' }}>$355 on Apr 15</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: 'Contribute',
    bg: 'linear-gradient(160deg, #1a2820 0%, #0d1610 100%)',
    content: (
      <div className="p-5 h-full flex flex-col gap-4">
        <div className="flex justify-between items-center text-xs" style={{ color: '#8fb89a' }}>
          <span>9:41</span>
          <span>●●●</span>
        </div>
        <div className="text-lg font-bold" style={{ color: '#f0faf4' }}>Make Contribution</div>
        <div className="glass-card p-5 text-center">
          <div className="text-xs mb-2" style={{ color: '#8fb89a' }}>Amount Due</div>
          <div className="text-4xl font-black" style={{ color: '#35D07F' }}>$50</div>
          <div className="text-xs mt-1" style={{ color: '#8fb89a' }}>cUSD · Nairobi Chama</div>
        </div>
        <div className="glass-card p-4">
          <div className="text-xs mb-2" style={{ color: '#8fb89a' }}>Pay with</div>
          <div className="flex gap-2">
            <div className="flex-1 p-3 rounded-xl text-center text-sm font-semibold" style={{ background: 'rgba(53,208,127,0.15)', color: '#35D07F', border: '1.5px solid #35D07F' }}>cUSD</div>
            <div className="flex-1 p-3 rounded-xl text-center text-sm" style={{ background: 'rgba(255,255,255,0.05)', color: '#8fb89a' }}>USDC</div>
          </div>
        </div>
        <button className="btn-cta w-full" style={{ width: '100%' }}>
          ✓ Confirm $50 cUSD
        </button>
      </div>
    ),
  },
];

export default function HeroSection() {
  const [screenIdx, setScreenIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setScreenIdx((i) => (i + 1) % PHONE_SCREENS.length);
        setVisible(true);
      }, 300);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const screen = PHONE_SCREENS[screenIdx];

  return (
    <section className="relative min-h-screen dot-grid flex flex-col items-center justify-center px-5 pt-20 pb-12 overflow-hidden">
      {/* Background blobs */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(53,208,127,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
          top: '-60px',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-sm mx-auto gap-6">
        {/* Badge */}
        <div className="badge fade-in-up">
          <span>🟢</span>
          <span>Powered by Celo + MiniPay</span>
        </div>

        {/* Headline */}
        <h1
          className="text-4xl font-black leading-tight tracking-tight fade-in-up"
          style={{ animationDelay: '0.1s', color: '#f0faf4', lineHeight: 1.15 }}
        >
          Your Chama,{' '}
          <span className="text-gradient-green">Now On-Chain</span>
        </h1>

        {/* Subhead */}
        <p
          className="text-base leading-relaxed fade-in-up"
          style={{ color: '#8fb89a', animationDelay: '0.2s', maxWidth: '300px' }}
        >
          Save together with friends & family using cUSD. Transparent, automatic, and trustless — right in MiniPay.
        </p>

        {/* Phone mockup */}
        <div className="relative fade-in-up float-anim" style={{ animationDelay: '0.3s' }}>
          <div className="phone-frame" style={{ width: '220px', height: '400px' }}>
            {/* Notch */}
            <div style={{ width: '70px', height: '22px', background: '#0a0f0d', borderRadius: '0 0 14px 14px', margin: '0 auto', position: 'relative', zIndex: 10 }} />
            {/* Screen content */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                paddingTop: '22px',
                transition: 'opacity 0.3s ease',
                opacity: visible ? 1 : 0,
              }}
            >
              {screen.content}
            </div>
          </div>
          {/* Screen label */}
          <div
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 badge"
            style={{ fontSize: '11px', padding: '3px 10px' }}
          >
            {screen.label}
          </div>
          {/* Dots */}
          <div className="flex gap-1.5 justify-center mt-6">
            {PHONE_SCREENS.map((_, i) => (
              <button
                key={i}
                onClick={() => setScreenIdx(i)}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === screenIdx ? '20px' : '6px',
                  height: '6px',
                  background: i === screenIdx ? '#35D07F' : 'rgba(53,208,127,0.25)',
                }}
              />
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3 w-full fade-in-up" style={{ animationDelay: '0.4s' }}>
          <a
            href="https://minipay.opera.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta pulse-green"
            style={{ width: '100%', fontSize: '16px' }}
          >
            <span>📱</span>
            Open in MiniPay
          </a>
          <a href="#how-it-works" className="btn-secondary" style={{ width: '100%' }}>
            How It Works ↓
          </a>
        </div>

        {/* Social proof mini */}
        <div
          className="flex items-center gap-3 text-xs fade-in-up"
          style={{ color: '#8fb89a', animationDelay: '0.5s' }}
        >
          <div className="flex -space-x-1.5">
            {['A','B','C','D'].map((l, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: `hsl(${140 + i*20}, 50%, 35%)`, color: '#f0faf4', border: '2px solid #0a0f0d' }}
              >
                {l}
              </div>
            ))}
          </div>
          <span>500+ members saving on Celo</span>
        </div>
      </div>
    </section>
  );
}
