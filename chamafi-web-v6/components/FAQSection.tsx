'use client';
import { useState } from 'react';

const FAQS = [
  {
    q: 'What is a Chama?',
    a: 'A Chama is a traditional African savings group where members pool money together and take turns receiving the full amount. It\'s also known as ROSCA (Rotating Savings and Credit Association). ChamaFi brings this practice on-chain using Celo smart contracts.',
  },
  {
    q: 'What is MiniPay?',
    a: 'MiniPay is a lightweight crypto wallet by Opera, designed specifically for African markets. It uses your phone number for identity, supports cUSD stablecoin transactions, and works even on slow network connections.',
  },
  {
    q: 'Is ChamaFi safe?',
    a: 'Yes. All Chama logic runs on Celo smart contracts — the code is open-source and audited. No one (not even us) can access your funds. Payouts are automatic and tamper-proof.',
  },
  {
    q: 'What happens if someone doesn\'t contribute?',
    a: 'The smart contract enforces contribution deadlines. If a member misses a round, they can be removed by group consensus and the round progresses. Future versions will include collateral options.',
  },
  {
    q: 'What currency do we use?',
    a: 'ChamaFi uses cUSD, Celo\'s dollar-pegged stablecoin. This means your savings hold their value regardless of crypto market volatility. USDC support is coming soon.',
  },
  {
    q: 'How much does it cost?',
    a: 'ChamaFi is free to use. Celo transaction fees (gas) are under $0.001 per transaction — negligible. The only cost is your regular MiniPay/data fees.',
  },
  {
    q: 'Can I create multiple Chamas?',
    a: 'Absolutely! You can create or join as many Chamas as you want. Each Chama is an independent smart contract with its own members, rounds, and schedule.',
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-14 px-5">
      <div className="max-w-sm mx-auto">
        <div className="badge mb-4">FAQ</div>
        <h2 className="text-3xl font-black mb-8" style={{ color: '#f0faf4' }}>
          Questions?{' '}
          <span className="text-gradient-green">Answered.</span>
        </h2>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="glass-card overflow-hidden"
              style={{ borderRadius: '16px' }}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-3"
                style={{ minHeight: '56px' }}
              >
                <span className="font-semibold text-sm leading-snug" style={{ color: '#f0faf4' }}>
                  {faq.q}
                </span>
                <span
                  className="text-lg flex-shrink-0 transition-transform duration-200"
                  style={{
                    color: '#35D07F',
                    transform: openIdx === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  +
                </span>
              </button>
              {openIdx === i && (
                <div
                  className="px-5 pb-4 text-sm leading-relaxed"
                  style={{ color: '#8fb89a', borderTop: '1px solid rgba(53,208,127,0.08)' }}
                >
                  <div className="pt-3">{faq.a}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
