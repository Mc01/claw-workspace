'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['Features', 'How It Works', 'Stats', 'FAQ'];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '12px 20px',
          transition: 'background 0.3s ease, box-shadow 0.3s ease',
          background: scrolled ? 'rgba(5, 12, 8, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(53,208,127,0.1)' : '1px solid transparent',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <div style={{
              width: '34px', height: '34px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #35D07F, #2ab56a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px', fontWeight: 900, color: '#050c08',
              boxShadow: '0 0 20px rgba(53,208,127,0.4)',
            }}>₡</div>
            <span style={{ fontWeight: 900, fontSize: '18px', color: '#f0faf4', letterSpacing: '-0.5px' }}>
              Chama<span style={{ color: '#35D07F' }}>Fi</span>
            </span>
          </motion.div>

          {/* Desktop links */}
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="hidden-mobile">
            {links.map((l) => (
              <motion.a
                key={l}
                href={`#${l.toLowerCase().replace(/ /g, '-')}`}
                whileHover={{ color: '#35D07F', y: -1 }}
                style={{ color: '#8fb89a', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }}
              >{l}</motion.a>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href="https://minipay.opera.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(53,208,127,0.5)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'linear-gradient(135deg, #35D07F, #2ab56a)',
              color: '#050c08', fontWeight: 700, borderRadius: '10px',
              padding: '9px 20px', fontSize: '14px', textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            <span>📱</span> Launch App
          </motion.a>
        </div>
      </motion.nav>

      <style>{`
        @media (max-width: 640px) { .hidden-mobile { display: none !important; } }
      `}</style>
    </>
  );
}
