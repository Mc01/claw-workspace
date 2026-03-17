'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import AnimatedCounter from './AnimatedCounter';

function GrowingTree() {
  const [stage, setStage] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const timers = [0, 600, 1200, 1800, 2400].map((delay, i) =>
      setTimeout(() => setStage(i + 1), delay + 300)
    );
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  const treeStages = [
    { emoji: '🌱', label: 'Seed', size: 24 },
    { emoji: '🌿', label: 'Sprout', size: 32 },
    { emoji: '🌳', label: 'Sapling', size: 44 },
    { emoji: '🏦', label: 'Treasury', size: 56 },
    { emoji: '💎', label: 'Diamond', size: 64 },
  ];

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', height: '80px' }}>
        {treeStages.map((s, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={stage > i ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            style={{
              fontSize: `${s.size}px`,
              filter: stage > i ? 'drop-shadow(0 0 12px rgba(53,208,127,0.6))' : 'none',
            }}
          >
            {s.emoji}
          </motion.div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '16px' }}>
        {treeStages.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={stage > i ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: '10px', color: stage > i ? '#35D07F' : '#8fb89a', textAlign: 'center', width: '44px' }}
          >
            {s.label}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function YieldMeter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (inView) setTimeout(() => setFilled(true), 300);
  }, [inView]);

  const slices = [
    { label: 'Feather Vault', pct: 45, color: '#35D07F' },
    { label: 'LP Yield', pct: 30, color: '#F5C542' },
    { label: 'Token Inflation', pct: 15, color: '#5ef7ab' },
    { label: 'Governance', pct: 10, color: '#aaffcc' },
  ];

  return (
    <div ref={ref} style={{ padding: '24px' }}>
      <div style={{ fontSize: '13px', fontWeight: 600, color: '#8fb89a', marginBottom: '16px' }}>Yield Sources</div>
      {slices.map((s, i) => (
        <div key={i} style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
            <span style={{ color: '#f0faf4', fontWeight: 500 }}>{s.label}</span>
            <span style={{ color: s.color, fontWeight: 700 }}>{s.pct}%</span>
          </div>
          <div style={{ height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={filled ? { width: `${s.pct}%` } : { width: 0 }}
              transition={{ duration: 1.2, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: '100%', borderRadius: '3px',
                background: `linear-gradient(90deg, ${s.color}, ${s.color}88)`,
                boxShadow: `0 0 8px ${s.color}66`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function YieldVizSection() {
  return (
    <section style={{ padding: '100px 20px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <div className="badge" style={{ marginBottom: '16px' }}>💰 Money Growing</div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: '#f0faf4', lineHeight: 1.2, letterSpacing: '-1px' }}>
            Watch Your{' '}
            <span className="text-gradient-gold">Savings Grow</span>
          </h2>
          <p style={{ fontSize: '16px', color: '#8fb89a', marginTop: '16px', maxWidth: '480px', margin: '16px auto 0' }}>
            Every cUSD in your Chama is put to work 24/7, earning yield while you save.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {/* Growing tree viz */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card-glow"
            style={{ padding: '32px', textAlign: 'center', gridColumn: 'span 1' }}
          >
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#8fb89a', marginBottom: '24px' }}>Your Chama Grows</div>
            <GrowingTree />
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ marginTop: '24px', fontSize: '28px', fontWeight: 900, color: '#35D07F' }}
            >
              <AnimatedCounter target={47.20} prefix="+$" suffix=" earned" decimals={2} duration={2500} />
            </motion.div>
            <div style={{ fontSize: '12px', color: '#8fb89a', marginTop: '4px' }}>in 3 months · 8.4% APY</div>
          </motion.div>

          {/* Yield breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card-glow"
          >
            <YieldMeter />
            <div style={{ padding: '0 24px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '8px' }}>
              {[
                { label: 'Total Pool', value: '$2,840', sub: '8 members', color: '#35D07F' },
                { label: 'APY', value: '8.4%', sub: 'annualized', color: '#F5C542' },
                { label: 'Next Payout', value: '$355', sub: 'Apr 15', color: '#35D07F' },
                { label: 'Yield / Month', value: '$19.87', sub: 'shared', color: '#F5C542' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.04 }}
                  style={{
                    background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '12px',
                    border: `1px solid ${item.color}20`,
                  }}
                >
                  <div style={{ fontSize: '10px', color: '#8fb89a', marginBottom: '3px' }}>{item.label}</div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: item.color }}>{item.value}</div>
                  <div style={{ fontSize: '10px', color: 'rgba(143,184,154,0.6)' }}>{item.sub}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Protocol path */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card-glow"
            style={{ padding: '28px' }}
          >
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#8fb89a', marginBottom: '20px' }}>Money Flow</div>
            {[
              { from: 'Your cUSD', to: 'Chama Pool', icon: '👤→🏦', color: '#35D07F' },
              { from: 'Chama Pool', to: 'Feather Vault', icon: '🏦→📦', color: '#F5C542' },
              { from: 'Feather Vault', to: 'Morpho Markets', icon: '📦→📊', color: '#35D07F' },
              { from: 'Yield Earned', to: 'Back to Pool', icon: '💰→🏦', color: '#F5C542' },
              { from: 'Payout Round', to: 'Member Wallet', icon: '🏦→👤', color: '#35D07F' },
            ].map((flow, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  marginBottom: i < 4 ? '0' : '0', paddingBottom: '12px',
                  borderBottom: i < 4 ? '1px solid rgba(53,208,127,0.06)' : 'none',
                  position: 'relative',
                }}
              >
                {i < 4 && (
                  <motion.div
                    animate={{ height: ['0%', '100%'] }}
                    transition={{ duration: 0.5, delay: i * 0.1 + 0.8 }}
                    style={{
                      position: 'absolute', left: '16px', top: '32px',
                      width: '1px', height: 'calc(100% - 20px)',
                      background: `linear-gradient(180deg, ${flow.color}40, transparent)`,
                    }}
                  />
                )}
                <div style={{ fontSize: '20px', width: '32px', textAlign: 'center' }}>{flow.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', color: '#8fb89a' }}>{flow.from}</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: flow.color }}>{flow.to} →</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
