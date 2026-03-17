'use client'

const STEPS = [
  {
    phase: 'PHASE 01',
    title: 'CREATE CHAMA',
    description: 'Deploy a smart contract for your savings circle. Set members, contribution amount, payout schedule, and cycle duration.',
    detail: 'As few as 3 members. As large as 1000. Fully configurable on-chain.',
    icon: '◈',
    color: 'cyan',
    status: 'LIVE',
  },
  {
    phase: 'PHASE 02',
    title: 'INCUBATION PHASE',
    description: 'Members contribute stablecoins (cUSD/USDC) each cycle. Idle funds auto-deployed to Feather yield vaults — earning while waiting.',
    detail: 'Think pump.fun mechanics: early momentum, token launch on graduation.',
    icon: '⬡',
    color: 'magenta',
    status: 'LIVE',
  },
  {
    phase: 'PHASE 03',
    title: 'GRADUATION',
    description: 'When Chama hits graduation threshold, an ERC-20 token is minted and deployed to a Uniswap V4 pool with custom rehypothecation hooks.',
    detail: 'V4 hooks ensure all LP idle capital keeps earning yield — compounding forever.',
    icon: '◉',
    color: 'green',
    status: 'BUILDING',
  },
  {
    phase: 'PHASE 04',
    title: 'EARN & GOVERN',
    description: 'Token holders vote on proposals, elect treasurers, and manage yield strategies. AI agent auto-compounds and optimizes in real-time.',
    detail: 'ERC-8004 agent: 24/7, never sleeps, never misses a rebalance.',
    icon: '⬢',
    color: 'purple',
    status: 'ROADMAP',
  },
]

const colorMap = {
  cyan: {
    text: 'text-cyan-400',
    border: 'border-cyan-500',
    borderFaint: 'border-cyan-500/20',
    bg: 'bg-cyan-500/10',
    line: 'bg-cyan-500/30',
    badge: 'bg-cyan-400/10 text-cyan-400 border-cyan-400/30',
  },
  magenta: {
    text: 'text-pink-400',
    border: 'border-pink-500',
    borderFaint: 'border-pink-500/20',
    bg: 'bg-pink-500/10',
    line: 'bg-pink-500/30',
    badge: 'bg-pink-400/10 text-pink-400 border-pink-400/30',
  },
  green: {
    text: 'text-green-400',
    border: 'border-green-500',
    borderFaint: 'border-green-500/20',
    bg: 'bg-green-500/10',
    line: 'bg-green-500/30',
    badge: 'bg-green-400/10 text-green-400 border-green-400/30',
  },
  purple: {
    text: 'text-purple-400',
    border: 'border-purple-500',
    borderFaint: 'border-purple-500/20',
    bg: 'bg-purple-500/10',
    line: 'bg-purple-500/30',
    badge: 'bg-purple-400/10 text-purple-400 border-purple-400/30',
  },
}

const statusColor = {
  LIVE: 'text-green-400 bg-green-400/10 border-green-400/30',
  BUILDING: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  ROADMAP: 'text-gray-400 bg-gray-400/10 border-gray-400/30',
}

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section-cyber relative bg-black">
      <div className="cyber-divider" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center gap-3 mb-4 justify-center">
            <div className="h-px w-12 bg-pink-500/50" />
            <span className="font-mono text-xs text-pink-500 tracking-[0.4em] uppercase">// PROTOCOL_FLOW</span>
            <div className="h-px w-12 bg-pink-500/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-4">
            HOW <span className="neon-magenta">IT WORKS</span>
          </h2>
          <p className="text-gray-400 font-mono text-sm max-w-xl mx-auto">
            From circle to on-chain economy in four phases.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-cyan-500/50 via-pink-500/30 to-purple-500/50 hidden md:block" />

          <div className="flex flex-col gap-6">
            {STEPS.map((step, i) => {
              const c = colorMap[step.color as keyof typeof colorMap]
              return (
                <div key={i} className="flex gap-6 group">
                  {/* Step node */}
                  <div className="hidden md:flex flex-col items-center">
                    <div className={`w-16 h-16 border-2 ${c.border} ${c.bg} flex items-center justify-center flex-shrink-0 relative`}>
                      <span className={`text-2xl ${c.text}`}>{step.icon}</span>
                      {/* Corner accent */}
                      <div className={`absolute top-0 right-0 w-2 h-2 ${c.bg} border-t border-r ${c.border}`} />
                    </div>
                  </div>

                  {/* Content card */}
                  <div className={`flex-1 cyber-card ${c.borderFaint} border p-6 transition-all duration-300 group-hover:-translate-x-0 group-hover:border-opacity-60`}>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className={`font-mono text-xs ${c.text} tracking-widest`}>{step.phase}</span>
                      <span className={`font-mono text-xs px-2 py-0.5 border ${statusColor[step.status as keyof typeof statusColor]}`}>
                        {step.status}
                      </span>
                    </div>

                    <h3 className={`font-display text-xl font-bold ${c.text} mb-2`}>
                      {step.title}
                    </h3>

                    <p className="text-gray-300 font-mono text-sm mb-3 leading-relaxed">
                      {step.description}
                    </p>

                    <div className={`font-mono text-xs ${c.text} opacity-60 border-l-2 ${c.border} pl-3`}>
                      ▸ {step.detail}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="cyber-divider" />
    </section>
  )
}
