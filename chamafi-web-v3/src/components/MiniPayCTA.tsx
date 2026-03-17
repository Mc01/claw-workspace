'use client'
import { useState } from 'react'

const FEATURES = [
  { icon: '◉', text: 'Auto-connect wallet — zero friction' },
  { icon: '◈', text: 'Native cUSD / USDC support' },
  { icon: '⬡', text: 'Gas fees in stablecoins via Celo' },
  { icon: '▣', text: '12M+ African users already on MiniPay' },
]

export default function MiniPayCTA() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText('https://chamafi.app')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="minipay" className="section-cyber relative overflow-hidden bg-black">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 bottom-0 cyber-grid-bg opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-pink-500/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[300px] rounded-full bg-cyan-500/5 blur-[80px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-pink-500/50" />
              <span className="font-mono text-xs text-pink-500 tracking-[0.4em] uppercase">// MINIPAY_MODULE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-4 leading-tight">
              LAUNCH IN{' '}
              <span className="neon-magenta">MINIPAY</span>
              <br />
              <span className="text-gray-400 text-2xl sm:text-3xl">Africa-first. Mobile-first.</span>
            </h2>

            <p className="text-gray-400 font-mono text-sm leading-relaxed mb-8">
              ChamaFi is purpose-built for Opera MiniPay — the #1 crypto wallet in Africa.
              Your Chama members are already there. We just give them yield.
            </p>

            {/* Feature list */}
            <div className="space-y-3 mb-8">
              {FEATURES.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-pink-400 font-mono text-sm">{f.icon}</span>
                  <span className="font-mono text-sm text-gray-300">{f.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://minipay.opera.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyber btn-cyber-secondary text-sm px-8 py-3"
              >
                ▶ OPEN IN MINIPAY
              </a>
              <button
                onClick={handleCopy}
                className="btn-cyber btn-cyber-primary text-sm px-8 py-3"
              >
                {copied ? '✓ LINK COPIED!' : '⎘ SHARE LINK'}
              </button>
            </div>
          </div>

          {/* Right: Phone mockup */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-3xl bg-pink-500/20 blur-3xl scale-110" />

              {/* Phone frame */}
              <div className="relative w-64 sm:w-72 border-2 border-pink-500/50 rounded-3xl bg-gray-900 overflow-hidden"
                style={{ boxShadow: '0 0 60px rgba(255,0,255,0.3), inset 0 0 40px rgba(0,0,0,0.5)' }}
              >
                {/* Status bar */}
                <div className="flex items-center justify-between px-4 py-2 bg-black border-b border-pink-500/20">
                  <span className="font-mono text-xs text-gray-500">9:41</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                    <span className="font-mono text-xs text-pink-400">MINIPAY</span>
                  </div>
                </div>

                {/* App content mockup */}
                <div className="bg-black p-4 min-h-[400px]">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="font-display text-lg text-white">CHAMA<span className="text-cyan-400">FI</span></div>
                    <div className="font-mono text-xs text-gray-500 mt-1">NAIROBI_CHAMA_#047</div>
                  </div>

                  {/* Balance card */}
                  <div className="border border-cyan-500/30 bg-cyan-500/5 p-4 mb-4 rounded-sm">
                    <div className="font-mono text-xs text-gray-500 mb-1">TOTAL SAVINGS</div>
                    <div className="font-display text-2xl text-cyan-400">$2,847</div>
                    <div className="font-mono text-xs text-green-400 mt-1">▲ +$183 yield earned</div>
                  </div>

                  {/* Members */}
                  <div className="border border-gray-800 p-3 mb-3 rounded-sm">
                    <div className="font-mono text-xs text-gray-500 mb-2">MEMBERS [6/8]</div>
                    <div className="flex gap-1.5 flex-wrap">
                      {['0xAE..', '0xBF..', '0xC1..', '0xD2..', '0xE3..', '0xF4..'].map((addr, j) => (
                        <div key={j} className="font-mono text-xs text-cyan-400 border border-cyan-500/20 px-1.5 py-0.5">
                          {addr}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next payout */}
                  <div className="border border-pink-500/20 bg-pink-500/5 p-3 rounded-sm">
                    <div className="font-mono text-xs text-gray-500 mb-1">NEXT PAYOUT</div>
                    <div className="font-mono text-sm text-pink-400">3d 14h 22m</div>
                    <div className="font-mono text-xs text-gray-600">→ 0xAE.. receives $512</div>
                  </div>

                  {/* CTA button */}
                  <div className="mt-4">
                    <div className="w-full border border-pink-500/50 bg-pink-500/10 py-3 text-center font-mono text-xs text-pink-400 tracking-widest">
                      CONTRIBUTE $50 cUSD
                    </div>
                  </div>
                </div>
              </div>

              {/* Corner decorations */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-pink-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="cyber-divider" />
    </section>
  )
}
