'use client';
import { motion } from 'framer-motion';

export default function FooterSection() {
  return (
    <footer style={{ padding: '60px 20px 40px', position: 'relative', zIndex: 1 }}>
      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(53,208,127,0.3), transparent)', marginBottom: '48px' }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '48px' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #35D07F, #2ab56a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '18px', fontWeight: 900, color: '#050c08',
                boxShadow: '0 0 20px rgba(53,208,127,0.3)',
              }}>₡</div>
              <span style={{ fontWeight: 900, fontSize: '20px', color: '#f0faf4' }}>
                Chama<span style={{ color: '#35D07F' }}>Fi</span>
              </span>
            </div>
            <p style={{ fontSize: '14px', color: '#8fb89a', lineHeight: 1.7, maxWidth: '240px' }}>
              Save together, grow together. Africa's savings circles — now on-chain.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              {['𝕏', '🐸', '📱'].map((icon, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.15, boxShadow: '0 4px 20px rgba(53,208,127,0.3)' }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: 'rgba(53,208,127,0.1)', border: '1px solid rgba(53,208,127,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', fontSize: '14px',
                  }}
                >{icon}</motion.button>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#35D07F', letterSpacing: '1px', marginBottom: '16px' }}>PRODUCT</div>
            {['MiniPay App', 'Farcaster App', 'Web App', 'Smart Contracts', 'AI Agent'].map(link => (
              <motion.div key={link} whileHover={{ x: 4, color: '#35D07F' }} style={{ fontSize: '14px', color: '#8fb89a', marginBottom: '10px', cursor: 'pointer', transition: 'color 0.2s' }}>{link}</motion.div>
            ))}
          </div>

          {/* Protocol */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#35D07F', letterSpacing: '1px', marginBottom: '16px' }}>PROTOCOL</div>
            {['Commonwealth Protocol', 'Feather Vaults', 'Mento Stablecoins', 'Uniswap V4', 'Celo Network'].map(link => (
              <motion.div key={link} whileHover={{ x: 4, color: '#35D07F' }} style={{ fontSize: '14px', color: '#8fb89a', marginBottom: '10px', cursor: 'pointer', transition: 'color 0.2s' }}>{link}</motion.div>
            ))}
          </div>

          {/* Community */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#35D07F', letterSpacing: '1px', marginBottom: '16px' }}>COMMUNITY</div>
            {['Documentation', 'GitHub', 'Forum', 'Discord', 'Grants'].map(link => (
              <motion.div key={link} whileHover={{ x: 4, color: '#35D07F' }} style={{ fontSize: '14px', color: '#8fb89a', marginBottom: '10px', cursor: 'pointer', transition: 'color 0.2s' }}>{link}</motion.div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', paddingTop: '24px', borderTop: '1px solid rgba(53,208,127,0.06)' }}>
          <div style={{ fontSize: '13px', color: 'rgba(143,184,154,0.5)' }}>
            © 2026 ChamaFi · Powered by Commonwealth Protocol
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy', 'Terms', 'Audit'].map(link => (
              <motion.span key={link} whileHover={{ color: '#35D07F' }} style={{ fontSize: '13px', color: 'rgba(143,184,154,0.5)', cursor: 'pointer', transition: 'color 0.2s' }}>{link}</motion.span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
