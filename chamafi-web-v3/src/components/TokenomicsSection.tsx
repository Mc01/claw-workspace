'use client'
import { useState } from 'react'

const TOKENOMICS = [
  { label: 'Community Savings Pool', pct: 40, color: '#00ffff', desc: 'Backing the yield vaults and Chama treasury' },
  { label: 'Protocol Treasury', pct: 20, color: '#ff00ff', desc: 'Grants, audits, ecosystem growth' },
  { label: 'Team & Contributors', pct: 15, color: '#9b00ff', desc: '2-year vesting, 6-month cliff' },
  { label: 'Ecosystem Incentives', pct: 15, color: '#00ff88', desc: 'Rewards for early Chamas and liquidity' },
  { label: 'Public Sale', pct: 10, color: '#ffff00', desc: 'Launch liquidity and community ownership' },
]

interface ArcProps {
  pct: number
  color: string
  offset: number
  radius: number
  hover: boolean
  onHover: () => void
  onLeave: () => void
}

function DonutArc({ pct, color, offset, radius, hover, onHover, onLeave }: ArcProps) {
  const circumference = 2 * Math.PI * radius
  const dash = (pct / 100) * circumference
  const gap = circumference - dash

  return (
    <circle
      cx="160"
      cy="160"
      r={radius}
      fill="none"
      stroke={color}
      strokeWidth={hover ? 28 : 22}
      strokeDasharray={`${dash} ${gap}`}
      strokeDashoffset={-offset}
      strokeLinecap="butt"
      opacity={hover ? 1 : 0.7}
      style={{
        filter: hover ? `drop-shadow(0 0 12px ${color})` : 'none',
        transition: 'all 0.3s',
        cursor: 'pointer',
        transform: hover ? 'scale(1.03)' : 'scale(1)',
        transformOrigin: '160px 160px',
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    />
  )
}

export default function TokenomicsSection() {
  const [hovered, setHovered] = useState<number | null>(null)

  // Calculate offsets
  const circumference = 2 * Math.PI * 110
  const offsets = TOKENOMICS.reduce<number[]>((acc, t, i) => {
    if (i === 0) return [0]
    acc.push(acc[i - 1] + (TOKENOMICS[i - 1].pct / 100) * circumference)
    return acc
  }, [])

  return (
    <section id="tokenomics" className="section-cyber relative bg-black">
      <div className="cyber-divider" />
      <div className="absolute inset-0 cyber-grid-bg opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center gap-3 mb-4 justify-center">
            <div className="h-px w-12 bg-purple-500/50" />
            <span className="font-mono text-xs text-purple-400 tracking-[0.4em] uppercase">// TOKEN_DISTRIBUTION</span>
            <div className="h-px w-12 bg-purple-500/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-4">
            <span className="neon-cyan">TOKENOMICS</span>
          </h2>
          <p className="text-gray-400 font-mono text-sm max-w-xl mx-auto">
            Designed for sustainability. Community-first distribution.
            Every token serves the protocol.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Donut chart */}
          <div className="flex justify-center">
            <div className="relative">
              <svg width="320" height="320" viewBox="0 0 320 320">
                {/* Background circle */}
                <circle cx="160" cy="160" r="110" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="22" />

                {/* Arcs */}
                {TOKENOMICS.map((t, i) => (
                  <DonutArc
                    key={i}
                    pct={t.pct}
                    color={t.color}
                    offset={offsets[i]}
                    radius={110}
                    hover={hovered === i}
                    onHover={() => setHovered(i)}
                    onLeave={() => setHovered(null)}
                  />
                ))}

                {/* Center text */}
                <text x="160" y="150" textAnchor="middle" fontFamily="Share Tech Mono, monospace" fontSize="11" fill="#666">
                  CHAMAFI
                </text>
                {hovered !== null ? (
                  <>
                    <text x="160" y="172" textAnchor="middle" fontFamily="Share Tech Mono, monospace" fontSize="28" fill={TOKENOMICS[hovered].color}
                      style={{ filter: `drop-shadow(0 0 8px ${TOKENOMICS[hovered].color})` }}>
                      {TOKENOMICS[hovered].pct}%
                    </text>
                    <text x="160" y="192" textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="8" fill="#888">
                      {TOKENOMICS[hovered].label.toUpperCase()}
                    </text>
                  </>
                ) : (
                  <text x="160" y="175" textAnchor="middle" fontFamily="Share Tech Mono, monospace" fontSize="20" fill="rgba(255,255,255,0.3)">
                    TOKEN
                  </text>
                )}

                {/* Corner markers */}
                <text x="10" y="20" fontFamily="Share Tech Mono, monospace" fontSize="9" fill="rgba(0,255,255,0.3)">◈</text>
                <text x="295" y="20" fontFamily="Share Tech Mono, monospace" fontSize="9" fill="rgba(255,0,255,0.3)">◈</text>
                <text x="10" y="315" fontFamily="Share Tech Mono, monospace" fontSize="9" fill="rgba(0,255,255,0.3)">◈</text>
                <text x="295" y="315" fontFamily="Share Tech Mono, monospace" fontSize="9" fill="rgba(255,0,255,0.3)">◈</text>
              </svg>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            {TOKENOMICS.map((t, i) => (
              <div
                key={i}
                className={`border p-4 cursor-pointer transition-all duration-200 ${
                  hovered === i
                    ? 'border-opacity-60 scale-[1.02]'
                    : 'border-opacity-20'
                }`}
                style={{
                  borderColor: t.color,
                  backgroundColor: hovered === i ? `${t.color}15` : `${t.color}05`,
                  boxShadow: hovered === i ? `0 0 20px ${t.color}30` : 'none',
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs text-white tracking-wide uppercase">{t.label}</span>
                  <span className="font-display text-xl font-bold" style={{ color: t.color }}>{t.pct}%</span>
                </div>
                <div className="font-mono text-xs text-gray-500 mb-2">{t.desc}</div>
                {/* Progress bar */}
                <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${t.pct}%`,
                      backgroundColor: t.color,
                      boxShadow: `0 0 6px ${t.color}`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="cyber-divider" />
    </section>
  )
}
