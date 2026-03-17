'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const FEATURES = [
  {
    icon: '🤝',
    title: 'Savings Circles On-Chain',
    desc: 'Create or join a Chama with friends & family. Each round, one member receives the pooled savings. Fully transparent, immutable, and automated on Celo.',
    color: '#35D07F',
    tags: ['Smart Contract', 'ERC-20', 'Trustless'],
  },
  {
    icon: '📈',
    title: 'Auto-Yield While You Save',
    desc: 'Every idle cUSD in your Chama earns yield via Feather vaults (Morpho-based) on Celo. Watch your pool grow even between rounds.',
    color: '#F5C542',
    tags: ['8.4% APY', 'Feather Vault', 'Auto-Compound'],
  },
  {
    icon: '📱',
    title: 'Native MiniPay App',
    desc: "Access ChamaFi directly in Opera MiniPay — Africa's fastest-growing crypto wallet with 12M+ users. No seed phrases, no complexity.",
    color: '#35D07F',
    tags: ['MiniPay', '12M Users', 'Mobile-First'],
  },
  {
    icon: '🏛️',
    title: 'On-Chain Governance',
    desc: 'Every Chama has its own governance. Members vote on rules, disbursements, and treasury decisions. No single point of control.',
    color: '#F5C542',
    tags: ['DAO', 'Voting', 'Treasury'],
  },
  {
    icon: '🤖',
    title: 'AI Chama Manager',
    desc: 'An ERC-8004 AI agent manages your Chama: auto-compounds yield, sends contribution reminders, and optimizes treasury allocation.',
    color: '#35D07F',
    tags: ['ERC-8004', 'AI Agent', 'Auto-Optimize'],
  },
  {
    icon: '🌍',
    title: 'Local Currency Support',
    desc: 'Save in cKES (Kenyan Shilling), cNGN (Naira), cGHS (Cedi), cZAR (Rand). 15 African stablecoins via Mento Protocol.',
    color: '#F5C542',
    tags: ['Mento', 'cKES', 'cNGN', 'cGHS'],
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);

  return (
    <section id="features" ref={ref} style={{ padding: '100px 20px', position: 'relative', zIndex: 1 }}>
      {/* Background decoration */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', top: '10%', right: '-100px',
          width: '400px', height: '400px',
          border: '1px solid rgba(53,208,127,0.05)',
          borderRadius: '50%', pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', top: '10%', right: '-100px',
          width: '300px', height: '300px',
          border: '1px solid rgba(245,197,66,0.04)',
          borderRadius: '50%', pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <div className="badge" style={{ marginBottom: '16px' }}>✨ Features</div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: '#f0faf4', lineHeight: 1.2, letterSpacing: '-1px' }}>
            Built for{' '}
            <span className="text-gradient-green">Africa's Future</span>
          </h2>
          <p style={{ fontSize: '16px', color: '#8fb89a', marginTop: '16px', maxWidth: '500px', margin: '16px auto 0', lineHeight: 1.7 }}>
            The most powerful savings circle protocol, designed for communities that move together.
          </p>
        </motion.div>

        {/* Features grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {FEATURES.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.12 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="glass-card"
              style={{
                padding: '28px',
                cursor: 'default',
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onHoverStart={(e) => {
                (e.target as HTMLElement).style.borderColor = `${feat.color}44`;
                (e.target as HTMLElement).style.boxShadow = `0 20px 60px ${feat.color}18`;
              }}
              onHoverEnd={(e) => {
                (e.target as HTMLElement).style.borderColor = 'rgba(53,208,127,0.12)';
                (e.target as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {/* Gradient top corner */}
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: '120px', height: '120px',
                background: `radial-gradient(circle at top right, ${feat.color}0e 0%, transparent 70%)`,
                pointerEvents: 'none',
              }} />

              <motion.div
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
                style={{ fontSize: '36px', marginBottom: '16px', display: 'inline-block' }}
              >
                {feat.icon}
              </motion.div>

              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#f0faf4', marginBottom: '10px', lineHeight: 1.3 }}>
                {feat.title}
              </h3>

              <p style={{ fontSize: '14px', color: '#8fb89a', lineHeight: 1.7, marginBottom: '16px' }}>
                {feat.desc}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {feat.tags.map(tag => (
                  <span key={tag} style={{
                    padding: '3px 10px', borderRadius: '100px',
                    fontSize: '11px', fontWeight: 600,
                    background: `${feat.color}14`,
                    color: feat.color,
                    border: `1px solid ${feat.color}25`,
                  }}>{tag}</span>
                ))}
              </div>

              {/* Shimmer line at bottom */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 + 0.4 }}
                style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '2px',
                  background: `linear-gradient(90deg, transparent, ${feat.color}66, transparent)`,
                  transformOrigin: 'left',
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
