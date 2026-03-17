'use client';

const allocations = [
  { label: 'Community & Ecosystem', pct: 40, color: '#FFD700' },
  { label: 'Protocol Treasury', pct: 20, color: '#00D4AA' },
  { label: 'Team & Advisors', pct: 15, color: '#7C3AED' },
  { label: 'Investors', pct: 15, color: '#F59E0B' },
  { label: 'Liquidity & Reserves', pct: 10, color: '#EC4899' },
];

export default function Tokenomics() {
  return (
    <section id="tokenomics" style={{
      padding: '120px 5%',
      background: 'linear-gradient(180deg, #0a0f1e 0%, #030712 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative circle */}
      <div style={{
        position: 'absolute',
        top: '-200px',
        right: '-200px',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{
            display: 'inline-block',
            padding: '6px 20px',
            borderRadius: '50px',
            background: 'rgba(124,58,237,0.08)',
            border: '1px solid rgba(124,58,237,0.2)',
            color: '#A78BFA',
            fontSize: '13px',
            fontWeight: '600',
            marginBottom: '20px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            Tokenomics
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: '800',
            lineHeight: 1.1,
            marginBottom: '20px',
            letterSpacing: '-1px',
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #A78BFA, #7C3AED)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              CHAMA Token
            </span>
            {' '}Distribution
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px', maxWidth: '500px', margin: '0 auto' }}>
            1,000,000,000 CHAMA total supply — community-first distribution
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center',
        }}>
          {/* Visual chart */}
          <div style={{ position: 'relative' }}>
            {/* SVG Donut */}
            <svg viewBox="0 0 200 200" style={{ width: '100%', maxWidth: '360px', margin: '0 auto', display: 'block' }}>
              <defs>
                {allocations.map((a) => (
                  <radialGradient key={a.label} id={`grad-${a.label.replace(/\s+/g, '')}`}>
                    <stop offset="0%" stopColor={a.color} />
                    <stop offset="100%" stopColor={a.color + '80'} />
                  </radialGradient>
                ))}
              </defs>
              {/* Outer glow */}
              <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,215,0,0.05)" strokeWidth="20" />

              {/* Donut segments */}
              {(() => {
                let offset = 0;
                const circumference = 2 * Math.PI * 70;
                return allocations.map((a) => {
                  const dash = (a.pct / 100) * circumference;
                  const gap = circumference - dash;
                  const rotation = -90 + (offset / 100) * 360;
                  offset += a.pct;
                  return (
                    <circle
                      key={a.label}
                      cx="100"
                      cy="100"
                      r="70"
                      fill="none"
                      stroke={a.color}
                      strokeWidth="28"
                      strokeDasharray={`${dash - 2} ${gap + 2}`}
                      strokeDashoffset={0}
                      transform={`rotate(${rotation} 100 100)`}
                      opacity={0.85}
                    />
                  );
                });
              })()}

              {/* Center text */}
              <text x="100" y="94" textAnchor="middle" fill="#FFD700" fontSize="22" fontWeight="800">1B</text>
              <text x="100" y="112" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">CHAMA TOKENS</text>
            </svg>
          </div>

          {/* Allocation list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {allocations.map((a) => (
              <div key={a.label} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: a.color + '15',
                  border: `1px solid ${a.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '16px',
                  fontWeight: '800',
                  color: a.color,
                }}>
                  {a.pct}%
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'white', fontWeight: '600', fontSize: '15px', marginBottom: '4px' }}>
                    {a.label}
                  </div>
                  <div style={{
                    height: '4px',
                    borderRadius: '2px',
                    background: 'rgba(255,255,255,0.05)',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${a.pct * 2.5}%`,
                      height: '100%',
                      background: `linear-gradient(90deg, ${a.color}, ${a.color}80)`,
                      borderRadius: '2px',
                    }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Token utilities */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          marginTop: '80px',
        }}>
          {[
            { title: 'Governance', desc: 'Vote on protocol parameters, fee changes, and new features', icon: '🗳️' },
            { title: 'Staking', desc: 'Stake to participate in chamas and earn yield rewards', icon: '🔒' },
            { title: 'Rewards', desc: 'Earn CHAMA for perfect payment records and referrals', icon: '🎁' },
          ].map((u) => (
            <div key={u.title} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              padding: '28px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>{u.icon}</div>
              <div style={{ fontWeight: '700', color: 'white', fontSize: '16px', marginBottom: '8px' }}>{u.title}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.6 }}>{u.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
