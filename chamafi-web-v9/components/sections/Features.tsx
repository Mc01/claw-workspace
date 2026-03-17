'use client';

import { useEffect, useRef } from 'react';

const features = [
  {
    icon: '🔗',
    title: 'On-Chain Transparency',
    description: 'Every contribution, rotation, and withdrawal is recorded immutably on the Celo blockchain. No disputes, no corruption.',
    color: '#FFD700',
  },
  {
    icon: '🌍',
    title: 'Africa-First Design',
    description: 'Built for mobile-first users, compatible with MiniPay. Low fees, stablecoin payments in cUSD — no volatility worries.',
    color: '#00D4AA',
  },
  {
    icon: '⚡',
    title: 'Instant Payouts',
    description: 'Smart contracts auto-distribute funds to the rotation winner. No waiting, no trust required. Code is law.',
    color: '#7C3AED',
  },
  {
    icon: '🛡️',
    title: 'Slashing Protection',
    description: 'Staking-based accountability. Members stake tokens to join. Miss a payment? Stake slashed. Incentives aligned.',
    color: '#F59E0B',
  },
  {
    icon: '🤖',
    title: 'AI Risk Scoring',
    description: 'On-chain reputation and AI-powered creditworthiness scoring. Build your DeFi credit score with every chama cycle.',
    color: '#00D4AA',
  },
  {
    icon: '📊',
    title: 'Yield Generation',
    description: 'Idle funds in the pool earn yield via Celo DeFi protocols. Your savings work harder between rotation cycles.',
    color: '#FFD700',
  },
];

export default function Features() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('[data-card]');
            cards.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = '1';
                (card as HTMLElement).style.transform = 'translateY(0)';
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardsRef.current) observer.observe(cardsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" style={{ padding: '120px 5%', background: 'linear-gradient(180deg, #030712 0%, #060d1f 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{
            display: 'inline-block',
            padding: '6px 20px',
            borderRadius: '50px',
            background: 'rgba(255,215,0,0.08)',
            border: '1px solid rgba(255,215,0,0.2)',
            color: '#FFD700',
            fontSize: '13px',
            fontWeight: '600',
            marginBottom: '20px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            Why ChamaFi
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: '800',
            lineHeight: 1.1,
            marginBottom: '20px',
            letterSpacing: '-1px',
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #FFD700, #FFF3A3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Built Different
            </span>
            {' '}for Africa
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
            Traditional chamas meet cutting-edge blockchain infrastructure
          </p>
        </div>

        {/* Grid */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px',
          }}
        >
          {features.map((f, i) => (
            <div
              key={f.title}
              data-card
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '20px',
                padding: '36px',
                transition: 'all 0.5s ease',
                opacity: 0,
                transform: 'translateY(40px)',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-6px)';
                el.style.borderColor = f.color + '40';
                el.style.boxShadow = `0 20px 60px ${f.color}15`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(0)';
                el.style.borderColor = 'rgba(255,255,255,0.07)';
                el.style.boxShadow = 'none';
              }}
            >
              {/* Gradient corner */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '120px',
                height: '120px',
                background: `radial-gradient(circle at top right, ${f.color}15, transparent)`,
                borderRadius: '0 20px 0 0',
              }} />

              <div style={{
                fontSize: '40px',
                marginBottom: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: f.color + '15',
                border: `1px solid ${f.color}30`,
              }}>
                {f.icon}
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'white',
                marginBottom: '12px',
              }}>
                {f.title}
              </h3>
              <p style={{
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.7,
                fontSize: '15px',
              }}>
                {f.description}
              </p>

              {/* Color bar */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: '36px',
                right: '36px',
                height: '2px',
                background: `linear-gradient(90deg, ${f.color}00, ${f.color}, ${f.color}00)`,
                opacity: 0.4,
              }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
