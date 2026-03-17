'use client';
import { motion } from 'framer-motion';

const COUNTRIES = [
  { flag: '🇰🇪', name: 'Kenya', currency: 'cKES', desc: '300K+ Chamas' },
  { flag: '🇳🇬', name: 'Nigeria', currency: 'cNGN', desc: '50M+ participants' },
  { flag: '🇬🇭', name: 'Ghana', currency: 'cGHS', desc: 'Fastest growing' },
  { flag: '🇿🇦', name: 'South Africa', currency: 'cZAR', desc: '$2.7B/year' },
  { flag: '🌍', name: '62 more', currency: '+15 stablecoins', desc: 'Via Mento' },
];

export default function MiniPaySection() {
  return (
    <section style={{ padding: '100px 20px', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
      {/* Big number background */}
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        whileInView={{ opacity: 0.03, scale: 1 }}
        viewport={{ once: true }}
        style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(100px, 20vw, 300px)', fontWeight: 900, color: '#35D07F',
          userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap', lineHeight: 1,
        }}
      >
        12M+
      </motion.div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="badge" style={{ marginBottom: '20px' }}>📱 MiniPay Distribution</div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 900, color: '#f0faf4', lineHeight: 1.2, marginBottom: '20px', letterSpacing: '-1px' }}>
              Africa's{' '}
              <span className="text-gradient-green">Largest Wallet</span>
              {' '}— Built In
            </h2>
            <p style={{ fontSize: '16px', color: '#8fb89a', lineHeight: 1.8, marginBottom: '32px' }}>
              ChamaFi runs natively in Opera MiniPay — no extra app required.
              Access 12M+ wallet users across 66+ countries from day one.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {[
                { stat: '12M+', label: 'Active MiniPay wallets', icon: '📱' },
                { stat: '380M+', label: 'Transactions processed', icon: '⚡' },
                { stat: '#1', label: 'Ethereum L2 by daily active users', icon: '🏆' },
                { stat: '20M+', label: 'Monthly Mini App opens', icon: '🚀' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  whileHover={{ x: 8 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '14px' }}
                >
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <span style={{ fontSize: '18px', fontWeight: 800, color: '#35D07F', minWidth: '60px' }}>{item.stat}</span>
                  <span style={{ fontSize: '14px', color: '#8fb89a' }}>{item.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="https://minipay.opera.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta"
              whileHover={{ scale: 1.05, boxShadow: '0 15px 50px rgba(53,208,127,0.6)' }}
              whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-flex' }}
            >
              Open in MiniPay →
            </motion.a>
          </motion.div>

          {/* Right - Countries */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-card-glow" style={{ padding: '28px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#8fb89a', marginBottom: '20px' }}>
                Supported Countries & Currencies
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {COUNTRIES.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    whileHover={{ x: 8, backgroundColor: 'rgba(53,208,127,0.05)' }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '14px',
                      padding: '12px', borderRadius: '12px',
                      border: '1px solid rgba(53,208,127,0.06)',
                      cursor: 'default', transition: 'all 0.2s ease',
                    }}
                  >
                    <span style={{ fontSize: '24px' }}>{c.flag}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#f0faf4' }}>{c.name}</div>
                      <div style={{ fontSize: '12px', color: '#8fb89a' }}>{c.desc}</div>
                    </div>
                    <span style={{
                      padding: '3px 10px', borderRadius: '100px', fontSize: '11px',
                      fontWeight: 700, background: 'rgba(53,208,127,0.12)', color: '#35D07F',
                      border: '1px solid rgba(53,208,127,0.25)',
                    }}>{c.currency}</span>
                  </motion.div>
                ))}
              </div>

              {/* Mento note */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                style={{
                  marginTop: '16px', padding: '12px', borderRadius: '12px',
                  background: 'rgba(245,197,66,0.06)', border: '1px solid rgba(245,197,66,0.2)',
                  fontSize: '12px', color: '#F5C542', textAlign: 'center',
                }}
              >
                🏦 15 African stablecoins via Mento Protocol
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
