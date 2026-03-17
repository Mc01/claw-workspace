'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import MoneyGrowingViz from './MoneyGrowingViz';

const PHONE_SCREENS = [
  {
    label: 'Dashboard',
    content: (
      <div style={{ padding: '16px', height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#8fb89a' }}>
          <span>9:41</span><span style={{ color: '#35D07F' }}>● ● ●</span>
        </div>
        <div className="glass-card" style={{ padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: '#8fb89a', marginBottom: '4px' }}>Total Savings</div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#35D07F' }}>$2,840</div>
          <div style={{ fontSize: '10px', color: '#8fb89a' }}>cUSD · 8 members</div>
          <div style={{ marginTop: '8px', height: '3px', borderRadius: '2px', background: 'rgba(53,208,127,0.15)' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '37%' }}
              transition={{ duration: 1.5, delay: 0.3 }}
              style={{ height: '100%', borderRadius: '2px', background: 'linear-gradient(90deg, #35D07F, #5ef7ab)' }}
            />
          </div>
          <div style={{ fontSize: '9px', color: '#8fb89a', marginTop: '4px' }}>Round 3 of 8</div>
        </div>
        <div className="glass-card" style={{ padding: '12px' }}>
          <div style={{ fontSize: '9px', color: '#8fb89a', marginBottom: '8px' }}>Yield Earned</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{ fontSize: '20px', fontWeight: 800, color: '#F5C542' }}>+$47.20</span>
            <span style={{ fontSize: '9px', color: '#35D07F' }}>↑ 8.4% APY</span>
          </div>
        </div>
        <div className="glass-card" style={{ padding: '12px' }}>
          <div style={{ fontSize: '9px', color: '#8fb89a', marginBottom: '6px' }}>Next Recipient</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(53,208,127,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#35D07F' }}>A</div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#f0faf4' }}>Amara K.</div>
              <div style={{ fontSize: '9px', color: '#35D07F' }}>$355 on Apr 15</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: 'Contribute',
    content: (
      <div style={{ padding: '16px', height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#8fb89a' }}>
          <span>9:41</span><span style={{ color: '#35D07F' }}>● ● ●</span>
        </div>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#f0faf4' }}>Make Contribution</div>
        <div className="glass-card" style={{ padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: '#8fb89a', marginBottom: '4px' }}>Amount Due</div>
          <div style={{ fontSize: '32px', fontWeight: 900, color: '#35D07F' }}>$50</div>
          <div style={{ fontSize: '9px', color: '#8fb89a' }}>cUSD · Nairobi Chama</div>
        </div>
        <div className="glass-card" style={{ padding: '12px', display: 'flex', gap: '8px' }}>
          <div style={{ flex: 1, padding: '8px', borderRadius: '10px', textAlign: 'center', fontSize: '12px', fontWeight: 700, background: 'rgba(53,208,127,0.15)', color: '#35D07F', border: '1.5px solid #35D07F' }}>cUSD</div>
          <div style={{ flex: 1, padding: '8px', borderRadius: '10px', textAlign: 'center', fontSize: '12px', background: 'rgba(255,255,255,0.04)', color: '#8fb89a' }}>USDC</div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ background: 'linear-gradient(135deg, #35D07F, #2ab56a)', color: '#050c08', fontWeight: 800, borderRadius: '12px', padding: '14px', border: 'none', cursor: 'pointer', fontSize: '13px' }}
        >
          ✓ Confirm $50 cUSD
        </motion.button>
        <div className="glass-card" style={{ padding: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '9px', color: '#8fb89a' }}>After contribution you'll earn</div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#F5C542' }}>+$0.35 yield/month 🌱</div>
        </div>
      </div>
    ),
  },
  {
    label: 'Yield',
    content: (
      <div style={{ padding: '16px', height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#8fb89a' }}>
          <span>9:41</span><span style={{ color: '#35D07F' }}>● ● ●</span>
        </div>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#f0faf4' }}>Chama Yield 📈</div>
        <div className="glass-card" style={{ padding: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '10px' }}>
            <span style={{ color: '#8fb89a' }}>Pool Earnings</span>
            <span style={{ color: '#35D07F', fontWeight: 700 }}>8.4% APY</span>
          </div>
          <MoneyGrowingViz />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div className="glass-card" style={{ padding: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '9px', color: '#8fb89a' }}>Total Earned</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#F5C542' }}>$47.20</div>
          </div>
          <div className="glass-card" style={{ padding: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '9px', color: '#8fb89a' }}>Your Share</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#35D07F' }}>$5.90</div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function HeroSection() {
  const [screenIdx, setScreenIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const phoneY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setScreenIdx(i => (i + 1) % PHONE_SCREENS.length);
        setVisible(true);
      }, 350);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const screen = PHONE_SCREENS[screenIdx];

  // Floating orbs
  const orbs = [
    { size: 300, x: '-10%', y: '-5%', color: 'rgba(53,208,127,0.08)', delay: 0 },
    { size: 200, x: '80%', y: '60%', color: 'rgba(245,197,66,0.06)', delay: 2 },
    { size: 150, x: '60%', y: '-20%', color: 'rgba(53,208,127,0.05)', delay: 4 },
  ];

  return (
    <section ref={containerRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 20px 60px', overflow: 'hidden' }}>
      {/* Animated bg orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{ duration: 6 + i * 2, delay: orb.delay, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: 'blur(40px)',
            left: orb.x,
            top: orb.y,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Grid lines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(53,208,127,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(53,208,127,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      <motion.div style={{ opacity: bgOpacity, width: '100%', maxWidth: '1100px', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', textAlign: 'center', maxWidth: '700px' }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="badge"
          >
            <motion.span
              animate={{ rotate: [0, 20, 0, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >🌍</motion.span>
            Powered by Celo · MiniPay · Commonwealth Protocol
          </motion.div>

          {/* Headline */}
          <motion.div style={{ y: textY }}>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-2px', color: '#f0faf4' }}
            >
              Your Chama,{' '}
              <br />
              <span className="text-gradient-green">Now On-Chain</span>
            </motion.h1>
          </motion.div>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{ fontSize: '18px', color: '#8fb89a', lineHeight: 1.7, maxWidth: '500px' }}
          >
            Save together with friends & family using cUSD. <br />
            Earn{' '}
            <motion.span
              animate={{ color: ['#F5C542', '#35D07F', '#F5C542'] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ fontWeight: 700 }}
            >DeFi yield</motion.span>
            {' '}automatically. Trustless on Celo.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <motion.a
              href="https://minipay.opera.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta"
              whileHover={{ scale: 1.05, boxShadow: '0 15px 50px rgba(53,208,127,0.6)' }}
              whileTap={{ scale: 0.97 }}
              style={{ minWidth: '200px' }}
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >📱</motion.span>
              Open in MiniPay
            </motion.a>
            <motion.a
              href="#how-it-works"
              className="btn-secondary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              How It Works ↓
            </motion.a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#8fb89a' }}
          >
            <div style={{ display: 'flex' }}>
              {['A','B','C','D','E'].map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: `hsl(${135 + i * 18}, 55%, 35%)`,
                    color: '#f0faf4', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontWeight: 700,
                    border: '2px solid #050c08',
                    marginLeft: i > 0 ? '-8px' : '0',
                  }}
                >{l}</motion.div>
              ))}
            </div>
            <div>
              <motion.span
                animate={{ color: ['#35D07F', '#8fb89a', '#35D07F'] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ fontWeight: 600 }}
              >500+</motion.span>
              {' '}members saving on Celo
            </div>
          </motion.div>
        </div>

        {/* Phone mockup */}
        <motion.div
          style={{ y: phoneY, marginTop: '48px', position: 'relative' }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Pulse rings */}
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
              transition={{ duration: 3, delay: i * 1, repeat: Infinity, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '240px', height: '420px',
                borderRadius: '44px',
                border: '1px solid rgba(53,208,127,0.4)',
                pointerEvents: 'none',
              }}
            />
          ))}

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="phone-frame"
            style={{ width: '240px', height: '460px' }}
          >
            {/* Notch */}
            <div style={{ width: '80px', height: '24px', background: '#050c08', borderRadius: '0 0 16px 16px', margin: '0 auto', position: 'relative', zIndex: 10 }} />

            {/* Screen */}
            <AnimatePresence mode="wait">
              <motion.div
                key={screenIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                style={{ position: 'absolute', inset: 0, paddingTop: '24px', overflow: 'hidden' }}
              >
                {screen.content}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Screen label */}
          <motion.div
            key={screen.label}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}
          >
            <span className="badge" style={{ fontSize: '11px' }}>{screen.label}</span>
          </motion.div>

          {/* Screen dots */}
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '10px' }}>
            {PHONE_SCREENS.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setScreenIdx(i)}
                whileHover={{ scale: 1.3 }}
                style={{
                  width: i === screenIdx ? '20px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: i === screenIdx ? '#35D07F' : 'rgba(53,208,127,0.25)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>

          {/* Floating badges */}
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            style={{
              position: 'absolute', top: '80px', right: '-80px',
              background: 'rgba(13,26,16,0.9)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(245,197,66,0.3)', borderRadius: '14px',
              padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '3px',
              boxShadow: '0 0 20px rgba(245,197,66,0.2)',
            }}
          >
            <div style={{ fontSize: '9px', color: '#8fb89a' }}>Yield Earned</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#F5C542' }}>+$47.20</div>
            <div style={{ fontSize: '9px', color: '#35D07F' }}>↑ 8.4% APY</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0], rotate: [2, -2, 2] }}
            transition={{ duration: 5, repeat: Infinity, delay: 2 }}
            style={{
              position: 'absolute', bottom: '100px', left: '-90px',
              background: 'rgba(13,26,16,0.9)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(53,208,127,0.3)', borderRadius: '14px',
              padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px',
              boxShadow: '0 0 20px rgba(53,208,127,0.15)',
            }}
          >
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(53,208,127,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>🌱</div>
            <div>
              <div style={{ fontSize: '9px', color: '#8fb89a' }}>Auto Yield</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#35D07F' }}>Earning now</div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'rgba(143,184,154,0.5)', fontSize: '11px' }}
        >
          <span>Scroll to explore</span>
          <div style={{ width: '20px', height: '32px', border: '1.5px solid rgba(143,184,154,0.3)', borderRadius: '10px', display: 'flex', justifyContent: 'center', paddingTop: '6px' }}>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#35D07F' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
