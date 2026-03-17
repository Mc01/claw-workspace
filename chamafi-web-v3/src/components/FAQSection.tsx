'use client'
import { useState } from 'react'

const FAQS = [
  {
    q: 'What is a Chama?',
    a: 'A Chama is a traditional African savings circle — popular as Ajo in Nigeria, Stokvel in South Africa, and Chama in Kenya. Members pool money regularly and take turns receiving the pot. ChamaFi brings this to the blockchain, adding DeFi yield so money earns while it sits.',
  },
  {
    q: 'Which wallets does ChamaFi support?',
    a: 'ChamaFi is optimized for Opera MiniPay (12M+ users in Africa), Farcaster Mini App, and any web3 browser. On MiniPay, it auto-connects — no setup needed. On web, connect via WalletConnect.',
  },
  {
    q: 'How does the yield work?',
    a: 'All stablecoins pooled in a Chama are deposited into Feather vaults — Morpho-based lending protocols on Celo. Members earn passive yield continuously. When a Chama graduates, a Uniswap V4 pool with custom hooks rehypothecates LP idle capital too.',
  },
  {
    q: 'Is this safe? Can I lose my money?',
    a: 'Smart contracts are audited and open-source on Celo. Yield comes from established DeFi protocols. The main risk is smart contract risk (all DeFi has this). We use Morpho-based vaults with conservative risk parameters. Governance controls emergency exits.',
  },
  {
    q: 'What is the Chama Token?',
    a: 'When a Chama reaches its graduation threshold, it mints an ERC-20 governance token and deploys a Uniswap V4 pool. Token holders earn from LP yield, vault yield appreciation, and token inflation — creating a mini-economy for each Chama.',
  },
  {
    q: 'What blockchain is this on?',
    a: 'Celo mainnet (chain ID 42220). Celo is EVM-compatible, mobile-first, and carbon-neutral. Its fee abstraction allows gas fees paid in cUSD — so members never need native CELO tokens.',
  },
  {
    q: 'How many members can a Chama have?',
    a: 'From 3 to 1000 members. Small friend groups or large community circles — all configurable at creation. Payout schedules, contribution amounts, and cycle lengths are fully on-chain and customizable.',
  },
  {
    q: 'What is the AI Chama Agent?',
    a: 'An ERC-8004 autonomous agent that manages each Chama 24/7: auto-compounds yield, sends contribution reminders, submits governance proposals, optimizes vault allocations, and handles routine operations — so no member needs to be a DeFi expert.',
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="section-cyber relative bg-black">
      <div className="absolute inset-0 cyber-grid-bg opacity-15" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center gap-3 mb-4 justify-center">
            <div className="h-px w-12 bg-green-500/50" />
            <span className="font-mono text-xs text-green-400 tracking-[0.4em] uppercase">// FAQ_DATABASE</span>
            <div className="h-px w-12 bg-green-500/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-4">
            FREQUENTLY <span className="neon-green">ASKED</span>
          </h2>
          <p className="text-gray-400 font-mono text-sm">
            Query the knowledge base.
          </p>
        </div>

        {/* FAQ items */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`border transition-all duration-300 ${
                open === i
                  ? 'border-cyan-500/50 bg-cyan-500/5'
                  : 'border-gray-800 bg-black/50 hover:border-gray-600'
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left group"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-gray-600">{String(i + 1).padStart(2, '0')}</span>
                  <span className={`font-mono text-sm ${open === i ? 'text-cyan-400' : 'text-gray-200 group-hover:text-white'} transition-colors`}>
                    {faq.q}
                  </span>
                </div>
                <span className={`font-mono text-lg transition-all duration-300 flex-shrink-0 ml-4 ${
                  open === i ? 'text-cyan-400 rotate-45' : 'text-gray-500'
                }`}>
                  +
                </span>
              </button>

              {open === i && (
                <div className="px-5 pb-5 pl-12">
                  <div className="border-l-2 border-cyan-500/30 pl-4">
                    <p className="font-mono text-sm text-gray-400 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center border border-gray-800 p-8 cyber-card">
          <div className="font-mono text-xs text-gray-500 mb-2">// CONTACT_MODULE</div>
          <p className="text-gray-300 font-mono text-sm mb-4">
            Still have questions? We&apos;re on-chain and online.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://t.me/chamafi"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cyber btn-cyber-primary text-xs px-6 py-2"
            >
              TELEGRAM
            </a>
            <a
              href="https://twitter.com/chamafi_app"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cyber btn-cyber-secondary text-xs px-6 py-2"
            >
              X / TWITTER
            </a>
          </div>
        </div>
      </div>

      <div className="cyber-divider" />
    </section>
  )
}
