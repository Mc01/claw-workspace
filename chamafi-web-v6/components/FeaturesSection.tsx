'use client';

const FEATURES = [
  {
    icon: '🔄',
    color: '#35D07F',
    bg: 'rgba(53,208,127,0.12)',
    title: 'Rotating Payouts',
    desc: 'Smart contracts automatically rotate the pooled funds to each member. No delays, no disputes — just trustless execution.',
  },
  {
    icon: '🛡️',
    color: '#35D07F',
    bg: 'rgba(53,208,127,0.12)',
    title: 'On-Chain Trust',
    desc: 'Every contribution, every payout is recorded on the Celo blockchain. Full transparency, zero counterparty risk.',
  },
  {
    icon: '💸',
    color: '#FF6B35',
    bg: 'rgba(255,107,53,0.12)',
    title: 'Pay with cUSD',
    desc: 'Use Celo\'s stablecoin cUSD for zero-fee transactions. Perfect for cross-border Chamas across Africa.',
  },
  {
    icon: '📱',
    color: '#FF6B35',
    bg: 'rgba(255,107,53,0.12)',
    title: 'MiniPay Native',
    desc: 'Built specifically for Opera MiniPay. No wallet setup, no complexity — just open and start saving.',
  },
  {
    icon: '👥',
    color: '#35D07F',
    bg: 'rgba(53,208,127,0.12)',
    title: 'Invite Your Chama',
    desc: 'Invite members via link or phone number. Create a group in under 2 minutes and start the first round.',
  },
  {
    icon: '📊',
    color: '#35D07F',
    bg: 'rgba(53,208,127,0.12)',
    title: 'Track Progress',
    desc: 'Live dashboard shows rounds, balances, and who\'s next. Everyone sees the same on-chain data.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-14 overflow-hidden">
      <div className="px-5 mb-8 max-w-sm mx-auto">
        <div className="badge mb-4">Features</div>
        <h2 className="text-3xl font-black leading-tight" style={{ color: '#f0faf4' }}>
          Everything Your{' '}
          <span className="text-gradient-green">Chama Needs</span>
        </h2>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: '#8fb89a' }}>
          Swipe to explore all features →
        </p>
      </div>

      {/* Swipeable cards row */}
      <div className="swipe-cards px-5" style={{ paddingLeft: '20px' }}>
        {FEATURES.map((f, i) => (
          <div
            key={i}
            className="swipe-card glass-card p-5 flex flex-col gap-4"
            style={{ width: '240px', minHeight: '200px' }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: f.bg }}
            >
              {f.icon}
            </div>
            <div>
              <div className="font-bold text-base mb-1.5" style={{ color: '#f0faf4' }}>
                {f.title}
              </div>
              <div className="text-sm leading-relaxed" style={{ color: '#8fb89a' }}>
                {f.desc}
              </div>
            </div>
          </div>
        ))}
        {/* Padding card at end */}
        <div className="swipe-card" style={{ width: '4px', flexShrink: 0 }} />
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-4 px-5">
        {FEATURES.map((_, i) => (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: i === 0 ? '16px' : '6px',
              height: '6px',
              background: i === 0 ? '#35D07F' : 'rgba(53,208,127,0.2)',
              transition: 'all 0.2s',
            }}
          />
        ))}
      </div>
    </section>
  );
}
