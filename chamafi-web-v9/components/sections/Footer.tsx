'use client';

export default function Footer() {
  return (
    <footer style={{
      background: '#020509',
      borderTop: '1px solid rgba(255,215,0,0.08)',
      padding: '60px 5% 40px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '48px',
          marginBottom: '60px',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFD700, #F59E0B)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ fontWeight: '900', fontSize: '14px', color: '#000' }}>CF</span>
              </div>
              <span style={{
                fontSize: '20px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #FFD700, #FFF3A3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                ChamaFi
              </span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', lineHeight: 1.7, maxWidth: '280px' }}>
              Decentralized savings circles for Africa. Powered by Celo blockchain. 
              Transparent, trustless, borderless.
            </p>
            {/* Social links */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              {['𝕏', '📱', '💬', '📖'].map((icon, i) => (
                <a key={i} href="#" style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  color: 'white',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#FFD700';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,215,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: 'Product',
              links: ['App', 'How It Works', 'Tokenomics', 'Roadmap'],
            },
            {
              title: 'Developers',
              links: ['Documentation', 'GitHub', 'Contracts', 'Audit Reports'],
            },
            {
              title: 'Community',
              links: ['Discord', 'Telegram', 'X / Twitter', 'Forum'],
            },
          ].map((col) => (
            <div key={col.title}>
              <div style={{ color: 'white', fontWeight: '700', marginBottom: '16px', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                {col.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.links.map((link) => (
                  <a key={link} href="#" style={{
                    color: 'rgba(255,255,255,0.4)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#FFD700')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.4)')}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>
            © 2026 ChamaFi. Built on{' '}
            <a href="https://celo.org" style={{ color: '#FFD700', textDecoration: 'none' }}>Celo</a>
            . All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms of Service', 'Audit Reports'].map((item) => (
              <a key={item} href="#" style={{
                color: 'rgba(255,255,255,0.3)',
                textDecoration: 'none',
                fontSize: '13px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#FFD700')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.3)')}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
