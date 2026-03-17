'use client';
import { motion } from 'framer-motion';
import ChamaNetworkViz from './ChamaNetworkViz';

export default function CommunitySection() {
  return (
    <section style={{ padding: '100px 20px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
          {/* Network viz */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ChamaNetworkViz />
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                {[
                  { color: '#35D07F', label: 'Contributed' },
                  { color: '#F5C542', label: 'Pending' },
                  { color: '#5ef7ab', label: 'Recipient' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#8fb89a' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="badge" style={{ marginBottom: '20px' }}>🤝 Community Power</div>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 900, color: '#f0faf4', lineHeight: 1.2, marginBottom: '20px', letterSpacing: '-1px' }}>
              Stronger{' '}
              <span className="text-gradient-green">Together</span>
            </h2>
            <p style={{ fontSize: '16px', color: '#8fb89a', lineHeight: 1.8, marginBottom: '28px' }}>
              A Chama is built on trust. ChamaFi replaces that trust with code —
              smart contracts that execute exactly as agreed, every time, with zero middlemen.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { icon: '🔒', title: 'Zero Trust Required', desc: 'Smart contracts enforce every rule. No admin can run away with funds.' },
                { icon: '👁️', title: 'Full Transparency', desc: 'Every contribution, yield, and payout is visible on-chain. Anyone can verify.' },
                { icon: '⚡', title: 'Instant Settlement', desc: 'Payouts happen in seconds via Celo — not days like traditional banking.' },
                { icon: '🌐', title: 'Global Access', desc: 'Connect with family & friends across Africa, or anywhere in the world.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  whileHover={{ x: 6 }}
                  style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}
                >
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                    background: 'rgba(53,208,127,0.1)', border: '1px solid rgba(53,208,127,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
                  }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#f0faf4', marginBottom: '4px' }}>{item.title}</div>
                    <div style={{ fontSize: '13px', color: '#8fb89a', lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
