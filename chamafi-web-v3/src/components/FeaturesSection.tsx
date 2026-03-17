'use client'

interface Feature {
  id: string
  icon: string
  title: string
  description: string
  tag: string
  color: 'cyan' | 'magenta' | 'green' | 'purple'
}

const FEATURES: Feature[] = [
  {
    id: 'F-01',
    icon: '◈',
    title: 'On-Chain Chamas',
    description: 'Create or join a savings circle with full on-chain transparency. Every contribution, every payout — verifiable on Celo.',
    tag: 'SMART CONTRACTS',
    color: 'cyan',
  },
  {
    id: 'F-02',
    icon: '⬡',
    title: 'DeFi Yield Engine',
    description: 'Idle stablecoins auto-rehypothecated into Feather vaults (Morpho-based). Members earn yield while waiting for their payout.',
    tag: 'YIELD PROTOCOL',
    color: 'magenta',
  },
  {
    id: 'F-03',
    icon: '◉',
    title: 'Chama Token',
    description: 'Each graduated Chama mints its own ERC-20 token and deploys a Uniswap V4 pool. Token holders earn from LP yield + vault yield.',
    tag: 'TOKENIZATION',
    color: 'green',
  },
  {
    id: 'F-04',
    icon: '⬢',
    title: 'AI Chama Agent',
    description: 'ERC-8004 powered agent auto-compounds yield, sends contribution reminders, optimizes treasury, and manages proposals.',
    tag: 'AGENTIC AI',
    color: 'purple',
  },
  {
    id: 'F-05',
    icon: '▣',
    title: 'On-Chain Governance',
    description: 'Vote on proposals, elect treasurers, set payout schedules, and manage the Chama treasury — all on-chain, all transparent.',
    tag: 'GOVERNANCE',
    color: 'cyan',
  },
  {
    id: 'F-06',
    icon: '◆',
    title: 'Stablecoin Native',
    description: 'cUSD and USDC first. No volatility risk for savings. Fee abstraction via Celo means gas in stablecoins — no native token needed.',
    tag: 'CELO NATIVE',
    color: 'magenta',
  },
]

const colorMap = {
  cyan: {
    text: 'text-cyan-400',
    border: 'border-cyan-500/20',
    bg: 'bg-cyan-500/5',
    tag: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/5',
    glow: 'group-hover:shadow-[0_0_30px_rgba(0,255,255,0.15)]',
    iconGlow: 'drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]',
  },
  magenta: {
    text: 'text-pink-400',
    border: 'border-pink-500/20',
    bg: 'bg-pink-500/5',
    tag: 'text-pink-400 border-pink-400/30 bg-pink-400/5',
    glow: 'group-hover:shadow-[0_0_30px_rgba(255,0,255,0.15)]',
    iconGlow: 'drop-shadow-[0_0_8px_rgba(255,0,255,0.8)]',
  },
  green: {
    text: 'text-green-400',
    border: 'border-green-500/20',
    bg: 'bg-green-500/5',
    tag: 'text-green-400 border-green-400/30 bg-green-400/5',
    glow: 'group-hover:shadow-[0_0_30px_rgba(0,255,136,0.15)]',
    iconGlow: 'drop-shadow-[0_0_8px_rgba(0,255,136,0.8)]',
  },
  purple: {
    text: 'text-purple-400',
    border: 'border-purple-500/20',
    bg: 'bg-purple-500/5',
    tag: 'text-purple-400 border-purple-400/30 bg-purple-400/5',
    glow: 'group-hover:shadow-[0_0_30px_rgba(155,0,255,0.15)]',
    iconGlow: 'drop-shadow-[0_0_8px_rgba(155,0,255,0.8)]',
  },
}

export default function FeaturesSection() {
  return (
    <section id="features" className="section-cyber relative bg-black">
      <div className="absolute inset-0 cyber-grid-bg opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center gap-3 mb-4 justify-center">
            <div className="h-px w-12 bg-cyan-500/50" />
            <span className="font-mono text-xs text-cyan-500 tracking-[0.4em] uppercase">// FEATURE_MODULES</span>
            <div className="h-px w-12 bg-cyan-500/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-4">
            BUILT FOR THE{' '}
            <span className="gradient-cyber">FUTURE OF AFRICA</span>
          </h2>
          <p className="text-gray-400 font-mono text-sm max-w-2xl mx-auto">
            Every module engineered for the next billion on-chain users.
            <br />
            No compromise. No middlemen.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => {
            const c = colorMap[feature.color]
            return (
              <div
                key={feature.id}
                className={`cyber-card ${c.border} ${c.glow} group p-6 border transition-all duration-300 hover:-translate-y-1 relative overflow-hidden`}
              >
                {/* ID badge */}
                <div className={`absolute top-3 right-3 font-mono text-xs ${c.text} opacity-40`}>
                  {feature.id}
                </div>

                {/* Top shimmer line */}
                <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${c.text.replace('text-', 'via-').replace('400', '400')} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />

                {/* Icon */}
                <div className={`text-4xl ${c.text} ${c.iconGlow} mb-4 font-mono`}>
                  {feature.icon}
                </div>

                {/* Tag */}
                <div className={`inline-flex items-center px-2 py-0.5 border font-mono text-xs tracking-widest mb-3 ${c.tag}`}>
                  {feature.tag}
                </div>

                {/* Title */}
                <h3 className={`font-display text-lg font-bold ${c.text} mb-2`}>
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 font-mono text-xs leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
