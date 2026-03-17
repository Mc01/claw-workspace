'use client';
import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

const STATS = [
  { label: 'MiniPay Wallets', value: 12, suffix: 'M+', color: '#35D07F', icon: '📱', desc: 'Across 66+ countries' },
  { label: 'Idle Stablecoins', value: 143, suffix: 'M', prefix: '$', color: '#F5C542', icon: '💤', desc: 'On Celo earning $0' },
  { label: 'Savings Need', value: 29.4, suffix: '%', color: '#35D07F', icon: '🎯', desc: '#1 unmet MiniPay need', decimals: 1 },
  { label: 'Daily Active Users', value: 700, suffix: 'K+', color: '#F5C542', icon: '🔥', desc: '#1 Ethereum L2 by DAU' },
];

export default function StatsSection() {
  return (
    <section id="stats" style={{ padding: '80px 20px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(53,208,127,0.4), transparent)', marginBottom: '60px' }}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: `0 20px 60px ${stat.color}22` }}
              className="glass-card"
              style={{ padding: '28px', textAlign: 'center', cursor: 'default', transition: 'box-shadow 0.3s ease' }}
            >
              <motion.div
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, repeatDelay: 4 }}
                style={{ fontSize: '32px', marginBottom: '12px' }}
              >{stat.icon}</motion.div>

              <div style={{ fontSize: '36px', fontWeight: 900, color: stat.color, marginBottom: '6px', lineHeight: 1 }}>
                <AnimatedCounter
                  target={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  duration={1800}
                  style={{ textShadow: `0 0 20px ${stat.color}66` }}
                />
              </div>

              <div style={{ fontSize: '14px', fontWeight: 600, color: '#f0faf4', marginBottom: '4px' }}>{stat.label}</div>
              <div style={{ fontSize: '12px', color: '#8fb89a' }}>{stat.desc}</div>

              {/* Bottom highlight bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.15 + 0.5 }}
                style={{
                  height: '2px', borderRadius: '1px', marginTop: '16px',
                  background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
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
