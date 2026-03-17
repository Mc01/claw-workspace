'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const STEPS = [
  {
    step: '01',
    title: 'Create Your Chama',
    desc: 'Set a name, invite members (2–20 people), define contribution amount in cUSD, and set the cycle schedule. Takes 30 seconds.',
    icon: '🏠',
    color: '#35D07F',
    detail: 'Members join via shared link — no app download required in MiniPay.',
  },
  {
    step: '02',
    title: 'Contribute & Earn',
    desc: 'Each cycle, members contribute their agreed amount. All idle funds automatically earn DeFi yield via Feather vaults.',
    icon: '💸',
    color: '#F5C542',
    detail: 'cUSD deposits → Feather Vault → 8.4% APY auto-compounded.',
  },
  {
    step: '03',
    title: 'Receive Lump Sums',
    desc: 'One member per cycle receives the full pooled amount + accumulated yield. Order is set at creation or voted on.',
    icon: '🎁',
    color: '#35D07F',
    detail: 'Smart contract auto-transfers to wallet — no admin needed.',
  },
  {
    step: '04',
    title: 'Token Graduation',
    desc: 'After cycles complete, the Chama can graduate to an ERC-20 token deployed to a Uniswap V4 pool with custom yield hooks.',
    icon: '🚀',
    color: '#F5C542',
    detail: 'Commonwealth Protocol powers the token + LP launch.',
  },
];

export default function HowItWorksSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section id="how-it-works" ref={ref} style={{ padding: '100px 20px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <div className="badge" style={{ marginBottom: '16px' }}>⚡ How It Works</div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: '#f0faf4', lineHeight: 1.2, letterSpacing: '-1px' }}>
            From Zero to{' '}
            <span className="text-gradient-gold">Earning in Minutes</span>
          </h2>
        </motion.div>

        {/* Steps with animated line */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: '31px', top: 0, bottom: 0, width: '2px',
            background: 'rgba(53,208,127,0.1)',
          }}>
            <motion.div
              style={{ height: lineHeight, background: 'linear-gradient(180deg, #35D07F, #F5C542, #35D07F)', width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}
              >
                {/* Step circle */}
                <motion.div
                  whileInView={{ scale: [0.5, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                  style={{
                    width: '64px', height: '64px', borderRadius: '50%', flexShrink: 0,
                    background: `radial-gradient(circle, ${step.color}25 0%, ${step.color}10 100%)`,
                    border: `2px solid ${step.color}50`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', zIndex: 1,
                    boxShadow: `0 0 20px ${step.color}30`,
                  }}
                >
                  <div style={{ fontSize: '20px' }}>{step.icon}</div>
                </motion.div>

                {/* Content */}
                <motion.div
                  whileHover={{ x: 4 }}
                  className="glass-card"
                  style={{ flex: 1, padding: '24px', cursor: 'default' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: step.color, letterSpacing: '1px' }}>STEP {step.step}</span>
                    <motion.div
                      style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${step.color}40, transparent)` }}
                    />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#f0faf4', marginBottom: '10px' }}>{step.title}</h3>
                  <p style={{ fontSize: '15px', color: '#8fb89a', lineHeight: 1.7, marginBottom: '12px' }}>{step.desc}</p>
                  <div style={{
                    fontSize: '12px', color: step.color, fontWeight: 500,
                    background: `${step.color}10`, borderRadius: '8px', padding: '8px 12px',
                    border: `1px solid ${step.color}20`,
                  }}>
                    💡 {step.detail}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
