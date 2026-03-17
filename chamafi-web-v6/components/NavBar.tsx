'use client';
import { useState, useEffect } from 'react';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(10, 15, 13, 0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(53, 208, 127, 0.1)' : 'none',
      }}
    >
      <div className="max-w-md mx-auto px-5 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-base font-black"
            style={{ background: 'linear-gradient(135deg, #35D07F, #2ab56a)', color: '#0a0f0d' }}
          >
            C
          </div>
          <span className="font-bold text-lg tracking-tight" style={{ color: '#f0faf4' }}>
            Chama<span style={{ color: '#35D07F' }}>Fi</span>
          </span>
        </div>

        {/* CTA */}
        <a
          href="https://minipay.opera.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta text-sm"
          style={{ padding: '10px 18px', minHeight: 'auto', fontSize: '13px', borderRadius: '10px' }}
        >
          Open App
        </a>
      </div>
    </nav>
  );
}
