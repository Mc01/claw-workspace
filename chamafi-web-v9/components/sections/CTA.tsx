'use client';

import { useRef, useEffect } from 'react';

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} style={{
      padding: '140px 5%',
      background: 'linear-gradient(180deg, #030712 0%, #030712 100%)',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center',
    }}>
      {/* Animated background orbs */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(255,215,0,0.06) 0%, rgba(124,58,237,0.04) 50%, transparent 70%)',
        pointerEvents: 'none',
        animation: 'pulseSlow 8s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '20%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(0,212,170,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
        animation: 'pulseSlow 6s ease-in-out infinite reverse',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255,215,0,0.08)',
          border: '1px solid rgba(255,215,0,0.2)',
          borderRadius: '50px',
          padding: '8px 20px',
          marginBottom: '32px',
        }}>
          <span style={{ fontSize: '16px' }}>🌍</span>
          <span style={{ color: '#FFD700', fontSize: '14px', fontWeight: '600' }}>
            Join 12,000+ African savers
          </span>
        </div>

        <h2 style={{
          fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: '900',
          lineHeight: 1.05,
          marginBottom: '24px',
          letterSpacing: '-2px',
        }}>
          <span style={{
            background: 'linear-gradient(135deg, #FFD700, #FFF3A3)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Ready to Enter
          </span>
          <br />
          <span style={{ color: 'white' }}>the Metaverse of</span>
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #00D4AA, #7C3AED)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            African Finance?
          </span>
        </h2>

        <p style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: '20px',
          lineHeight: 1.7,
          marginBottom: '48px',
          maxWidth: '560px',
          margin: '0 auto 48px',
        }}>
          Start your first chama in under 5 minutes. 
          No crypto experience needed. Works with M-Pesa-like simplicity.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
          <a href="https://app.chamafi.xyz" className="btn-primary" style={{ fontSize: '18px', padding: '18px 48px' }}>
            Launch App →
          </a>
          <a href="https://docs.chamafi.xyz" className="btn-secondary" style={{ fontSize: '18px', padding: '16px 46px' }}>
            Read the Docs
          </a>
        </div>

        {/* Social proof */}
        <div style={{
          display: 'flex',
          gap: '40px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          color: 'rgba(255,255,255,0.4)',
          fontSize: '14px',
        }}>
          {[
            '✅ No KYC required',
            '✅ Available on MiniPay',
            '✅ Audited contracts',
            '✅ Built on Celo',
          ].map((item) => (
            <span key={item} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulseSlow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.7; }
        }
      `}</style>
    </section>
  );
}
