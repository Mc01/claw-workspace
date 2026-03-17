'use client';

import { useEffect, useRef, useState } from 'react';
import SceneWrapper from '../3d/SceneWrapper';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !textRef.current) return;

    // Staggered text reveal
    const elements = textRef.current.querySelectorAll('[data-reveal]');
    elements.forEach((el, i) => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(30px)';
      setTimeout(() => {
        (el as HTMLElement).style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'translateY(0)';
      }, 200 + i * 150);
    });
  }, [mounted]);

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '700px',
        overflow: 'hidden',
      }}
    >
      {/* 3D Canvas Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {mounted && <SceneWrapper />}
      </div>

      {/* Dark overlay for readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(3,7,18,0.7) 0%, rgba(3,7,18,0.3) 50%, rgba(3,7,18,0.6) 100%)',
          zIndex: 1,
        }}
      />

      {/* Bottom fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(to top, #030712, transparent)',
          zIndex: 2,
        }}
      />

      {/* Navigation */}
      <nav
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          padding: '24px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255,215,0,0.1)',
          backdropFilter: 'blur(10px)',
          background: 'rgba(3,7,18,0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFD700, #F59E0B)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(255,215,0,0.5)',
            }}
          >
            <span style={{ fontWeight: '900', fontSize: '14px', color: '#000' }}>CF</span>
          </div>
          <span
            style={{
              fontSize: '22px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #FFD700, #FFF3A3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ChamaFi
          </span>
        </div>

        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {['Features', 'How It Works', 'Tokenomics', 'Community'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              style={{
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#FFD700')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)')}
            >
              {item}
            </a>
          ))}
          <a
            href="https://app.chamafi.xyz"
            className="btn-primary"
            style={{ padding: '10px 24px', fontSize: '14px' }}
          >
            Launch App
          </a>
        </div>
      </nav>

      {/* Hero Content */}
      <div
        ref={textRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '0 10% 80px',
          maxWidth: '800px',
        }}
      >
        {/* Tag */}
        <div
          data-reveal
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,215,0,0.1)',
            border: '1px solid rgba(255,215,0,0.3)',
            borderRadius: '50px',
            padding: '6px 16px',
            marginBottom: '24px',
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFD700', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          <span style={{ color: '#FFD700', fontSize: '13px', fontWeight: '600' }}>
            Built on Celo Blockchain
          </span>
        </div>

        {/* Headline */}
        <h1
          data-reveal
          style={{
            fontSize: 'clamp(42px, 7vw, 88px)',
            fontWeight: '900',
            lineHeight: 1.0,
            marginBottom: '24px',
            letterSpacing: '-2px',
          }}
        >
          <span
            style={{
              background: 'linear-gradient(135deg, #FFD700, #FFF3A3, #F59E0B)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'block',
            }}
          >
            African Savings
          </span>
          <span style={{ color: 'white', display: 'block' }}>
            Meets Web3
          </span>
          <span
            style={{
              background: 'linear-gradient(135deg, #00D4AA, #7C3AED)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'block',
            }}
          >
            Revolution
          </span>
        </h1>

        {/* Subheading */}
        <p
          data-reveal
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 'clamp(16px, 2.5vw, 20px)',
            lineHeight: 1.7,
            marginBottom: '40px',
            maxWidth: '560px',
          }}
        >
          ChamaFi brings the ancient tradition of African savings groups (Chamas) 
          into the blockchain era — transparent, trustless, and borderless.
        </p>

        {/* CTAs */}
        <div data-reveal style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <a href="https://app.chamafi.xyz" className="btn-primary">
            Enter the Metaverse →
          </a>
          <a href="#how-it-works" className="btn-secondary">
            Explore ChamaFi
          </a>
        </div>

        {/* Stats row */}
        <div
          data-reveal
          style={{
            display: 'flex',
            gap: '32px',
            marginTop: '56px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { value: '$2.4M', label: 'Total Value Locked' },
            { value: '12,000+', label: 'Active Members' },
            { value: '340+', label: 'Active Chamas' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'left' }}>
              <div
                style={{
                  fontSize: 'clamp(24px, 3vw, 36px)',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #FFD700, #FFF3A3)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '4px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: 0.5,
          animation: 'bounce 2s infinite',
        }}
      >
        <span style={{ color: 'white', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, white, transparent)' }} />
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
