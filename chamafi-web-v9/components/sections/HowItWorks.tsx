'use client';

const steps = [
  {
    num: '01',
    title: 'Create or Join a Chama',
    desc: 'Form a circle with trusted friends, family, or community. Set the contribution amount, cycle length, and rotation order — all enforced by smart contracts.',
    color: '#FFD700',
    icon: '👥',
  },
  {
    num: '02',
    title: 'Stake & Contribute',
    desc: 'Members stake CHAMA tokens as collateral and contribute cUSD each cycle. Idle funds earn yield in DeFi protocols while waiting for rotation.',
    color: '#00D4AA',
    icon: '💎',
  },
  {
    num: '03',
    title: 'Smart Rotation',
    desc: 'Each cycle, the smart contract automatically sends the pooled funds to the designated recipient. No middleman, no delays, no disputes.',
    color: '#7C3AED',
    icon: '⚙️',
  },
  {
    num: '04',
    title: 'Build Credit & Earn',
    desc: 'Complete cycles build your on-chain reputation. Unlock larger chamas, better DeFi rates, and earn CHAMA token rewards for perfect payment records.',
    color: '#F59E0B',
    icon: '🚀',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{
      padding: '120px 5%',
      background: 'linear-gradient(180deg, #060d1f 0%, #0a0f1e 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(255,215,0,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{
            display: 'inline-block',
            padding: '6px 20px',
            borderRadius: '50px',
            background: 'rgba(0,212,170,0.08)',
            border: '1px solid rgba(0,212,170,0.2)',
            color: '#00D4AA',
            fontSize: '13px',
            fontWeight: '600',
            marginBottom: '20px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            How It Works
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: '800',
            lineHeight: 1.1,
            marginBottom: '20px',
            letterSpacing: '-1px',
          }}>
            Simple.{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00D4AA, #7C3AED)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Transparent.
            </span>
            {' '}Powerful.
          </h2>
        </div>

        {/* Steps */}
        <div style={{ position: 'relative' }}>
          {/* Connector line */}
          <div style={{
            position: 'absolute',
            left: '40px',
            top: '60px',
            bottom: '60px',
            width: '2px',
            background: 'linear-gradient(180deg, #FFD700, #00D4AA, #7C3AED, #F59E0B)',
            opacity: 0.3,
          }} />

          {steps.map((step, i) => (
            <div
              key={step.num}
              style={{
                display: 'flex',
                gap: '40px',
                marginBottom: i < steps.length - 1 ? '60px' : 0,
                position: 'relative',
              }}
            >
              {/* Number */}
              <div style={{ flexShrink: 0 }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${step.color}20, ${step.color}05)`,
                  border: `2px solid ${step.color}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  boxShadow: `0 0 30px ${step.color}20`,
                }}>
                  {step.icon}
                </div>
              </div>

              {/* Content */}
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${step.color}20`,
                borderRadius: '20px',
                padding: '32px 36px',
                flex: 1,
                position: 'relative',
              }}>
                <div style={{
                  color: step.color,
                  fontSize: '12px',
                  fontWeight: '700',
                  letterSpacing: '3px',
                  marginBottom: '10px',
                  opacity: 0.7,
                }}>
                  STEP {step.num}
                </div>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '700',
                  color: 'white',
                  marginBottom: '12px',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.7,
                  fontSize: '16px',
                  maxWidth: '600px',
                }}>
                  {step.desc}
                </p>

                {/* Glow corner */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100px',
                  height: '100px',
                  background: `radial-gradient(circle at top right, ${step.color}10, transparent)`,
                  borderRadius: '0 20px 0 0',
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
