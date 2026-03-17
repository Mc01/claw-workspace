'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'What is a Chama?',
    a: "A Chama is a traditional African savings circle — a group of people who pool money together regularly and take turns receiving the lump sum. It's a community-driven financial system with roots across East and Central Africa. ChamaFi brings this time-tested model on-chain, adding transparency, yield, and governance tools.",
  },
  {
    q: 'How does yield work?',
    a: "Pooled funds in a Chama are deployed into Feather Finance, a DeFi yield protocol on Celo. Members earn up to 8.4% APY on stablecoins (cUSD/USDC) while the Chama is active. Yield is distributed proportionally to contributions and is claimable at any time.",
  },
  {
    q: 'Is it safe?',
    a: 'ChamaFi smart contracts are written in Solidity, built on Celo, and undergo independent security audits before mainnet deployment. Funds are non-custodial — the contract holds assets and only releases them according to on-chain rules that all members agree to. You always retain control of your private keys.',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 bg-slate-900" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-emerald-400 uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Common{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-transparent">
              questions
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`glass rounded-2xl overflow-hidden transition-all ${open === i ? 'border-emerald-500/30' : ''}`}
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-white font-semibold text-base sm:text-lg group-hover:text-emerald-300 transition-colors">
                  {faq.q}
                </span>
                <span
                  className={`flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg border transition-all ${
                    open === i
                      ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400 rotate-45'
                      : 'bg-slate-800 border-slate-700 text-gray-400'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  open === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <p className="px-6 pb-5 text-gray-400 text-sm sm:text-base leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
