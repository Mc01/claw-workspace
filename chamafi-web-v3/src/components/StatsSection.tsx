'use client'
import { useEffect, useRef, useState } from 'react'

interface Stat {
  value: number
  suffix: string
  label: string
  sublabel: string
  color: 'cyan' | 'magenta' | 'green' | 'yellow'
  prefix?: string
}

const STATS: Stat[] = [
  {
    value: 50,
    suffix: 'B+',
    prefix: '$',
    label: 'ANNUAL CHAMA MARKET',
    sublabel: 'Total informal savings in Africa',
    color: 'cyan',
  },
  {
    value: 12,
    suffix: 'M+',
    label: 'MINIPAY WALLETS',
    sublabel: 'Active users in Africa',
    color: 'magenta',
  },
  {
    value: 300,
    suffix: 'M+',
    label: 'AFRICANS IN CHAMAS',
    sublabel: 'Waiting for on-chain yield',
    color: 'green',
  },
  {
    value: 8,
    suffix: '%+',
    label: 'DeFi APY',
    sublabel: 'Feather vault target yield',
    color: 'yellow',
  },
]

function CountUp({ target, duration = 2000, prefix = '', suffix = '' }: {
  target: number
  duration?: number
  prefix?: string
  suffix?: string
}) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [started, target, duration])

  const colorMap = {
    cyan: 'text-cyan-400',
    magenta: 'text-pink-400',
    green: 'text-green-400',
    yellow: 'text-yellow-400',
  }

  return (
    <span ref={ref} className="font-display text-4xl sm:text-5xl font-bold">
      {prefix}{count}{suffix}
    </span>
  )
}

export default function StatsSection() {
  const colorMap = {
    cyan: { text: 'text-cyan-400', border: 'border-cyan-500/30', glow: 'shadow-[0_0_30px_rgba(0,255,255,0.1)]', dot: 'bg-cyan-400' },
    magenta: { text: 'text-pink-400', border: 'border-pink-500/30', glow: 'shadow-[0_0_30px_rgba(255,0,255,0.1)]', dot: 'bg-pink-400' },
    green: { text: 'text-green-400', border: 'border-green-500/30', glow: 'shadow-[0_0_30px_rgba(0,255,136,0.1)]', dot: 'bg-green-400' },
    yellow: { text: 'text-yellow-400', border: 'border-yellow-500/30', glow: 'shadow-[0_0_30px_rgba(255,255,0,0.1)]', dot: 'bg-yellow-400' },
  }

  return (
    <section className="section-cyber relative bg-black" id="stats">
      {/* Top divider */}
      <div className="cyber-divider" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-12 justify-center">
          <div className="h-px w-12 bg-cyan-500/50" />
          <span className="font-mono text-xs text-cyan-500 tracking-[0.4em] uppercase">// SYSTEM_METRICS</span>
          <div className="h-px w-12 bg-cyan-500/50" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => {
            const colors = colorMap[stat.color]
            return (
              <div
                key={i}
                className={`cyber-card ${colors.border} ${colors.glow} p-6 border hover:scale-105 transition-transform duration-300 group`}
              >
                {/* Corner decoration */}
                <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${colors.border.replace('/30', '')}`} />
                <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${colors.border.replace('/30', '')}`} />

                <div className={`${colors.text} mb-2`}>
                  <CountUp
                    target={stat.value}
                    prefix={stat.prefix || ''}
                    suffix={stat.suffix}
                  />
                </div>
                <div className="font-mono text-xs text-white tracking-widest mb-1 uppercase">
                  {stat.label}
                </div>
                <div className="font-mono text-xs text-gray-500">
                  {stat.sublabel}
                </div>

                {/* Active indicator */}
                <div className="flex items-center gap-1.5 mt-4">
                  <div className={`w-1.5 h-1.5 rounded-full ${colors.dot} animate-pulse`} />
                  <span className="font-mono text-xs text-gray-600">LIVE</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="cyber-divider" />
    </section>
  )
}
