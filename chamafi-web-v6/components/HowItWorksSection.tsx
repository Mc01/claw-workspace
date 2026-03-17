'use client';

const STEPS = [
  {
    number: '01',
    icon: '📱',
    title: 'Open MiniPay',
    desc: 'Launch Opera MiniPay on your phone. Search for ChamaFi or tap the link shared by your group.',
    highlight: 'Free to download',
    color: '#35D07F',
  },
  {
    number: '02',
    icon: '👥',
    title: 'Create or Join a Chama',
    desc: 'Create a new savings group and set the contribution amount, frequency, and member count. Or join via invite link.',
    highlight: '< 2 min setup',
    color: '#35D07F',
  },
  {
    number: '03',
    icon: '💰',
    title: 'Contribute cUSD',
    desc: 'Each round, every member contributes their share in cUSD. Transactions are instant and near-zero fee on Celo.',
    highlight: 'Gas ~$0.001',
    color: '#FF6B35',
  },
  {
    number: '04',
    icon: '🎯',
    title: 'Receive Your Payout',
    desc: 'When your turn comes, the smart contract automatically sends the full pool to your wallet. No waiting, no negotiating.',
    highlight: 'Auto-executed',
    color: '#35D07F',
  },
  {
    number: '05',
    icon: '🔁',
    title: 'Repeat & Grow',
    desc: 'Rounds continue until every member has received a payout. Then start a new cycle and keep building wealth together.',
    highlight: 'Unlimited cycles',
    color: '#35D07F',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-14 px-5">
      <div className="max-w-sm mx-auto">
        <div className="badge mb-4">How It Works</div>
        <h2 className="text-3xl font-black leading-tight mb-10" style={{ color: '#f0faf4' }}>
          From Zero to{' '}
          <span className="text-gradient-green">Saving Together</span>
        </h2>

        <div className="flex flex-col gap-0">
          {STEPS.map((step, i) => (
            <div key={i} className="flex gap-4">
              {/* Left: number + line */}
              <div className="flex flex-col items-center" style={{ width: '48px', flexShrink: 0 }}>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black flex-shrink-0"
                  style={{ background: `rgba(${step.color === '#35D07F' ? '53,208,127' : '255,107,53'},0.15)`, color: step.color }}
                >
                  {step.icon}
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className="step-line"
                    style={{ height: '40px', marginTop: '4px', marginBottom: '4px' }}
                  />
                )}
              </div>

              {/* Right: content */}
              <div className="flex-1 pb-8">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold" style={{ color: step.color }}>{step.number}</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: `rgba(${step.color === '#35D07F' ? '53,208,127' : '255,107,53'},0.12)`, color: step.color }}
                  >
                    {step.highlight}
                  </span>
                </div>
                <h3 className="text-base font-bold mb-1.5" style={{ color: '#f0faf4' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8fb89a' }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
