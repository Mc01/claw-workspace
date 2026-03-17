'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    q: 'What is a Chama?',
    a: "A Chama (savings circle) is Africa's most popular informal financial institution. Members pool money together, and each round one member receives the full pot. ChamaFi brings this tradition on-chain with smart contracts and DeFi yield.",
  },
  {
    q: 'How does the yield work?',
    a: 'All cUSD in your Chama pool is automatically deposited into Feather Vaults — Morpho-based lending markets on Celo earning ~8.4% APY. Yield accumulates continuously and is distributed to members upon payout.',
  },
  {
    q: 'Do I need a crypto wallet?',
    a: 'If you use Opera MiniPay, your wallet is built in — just open the app and start. For web access, we support WalletConnect and any Celo-compatible wallet.',
  },
  {
    q: 'What happens if someone misses a contribution?',
    a: 'The smart contract has configurable penalty logic. Members vote on rules when creating the Chama — late fees, skip mechanics, or exclusion. All enforced automatically on-chain.',
  },
  {
    q: 'Is ChamaFi audited?',
    a: 'Smart contracts will be audited before mainnet launch. Code is open-source and available on GitHub. We follow OpenZeppelin patterns and Celo security best practices.',
  },
  {
    q: 'What is the Commonwealth Protocol?',
    a: "ChamaFi is built on Commonwealth Protocol — an EVM-based framework for community economies. Once a Chama completes cycles, it can 'graduate' to an ERC-20 token with a Uniswap V4 pool and custom yield hooks.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" style={{ padding: '100px 20px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <div className="badge" style={{ marginBottom: '16px' }}>❓ FAQ</div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: '#f0faf4', letterSpacing: '-1px' }}>
            Common <span className="text-gradient-green">Questions</span>
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card"
              style={{
                overflow: 'hidden',
                border: open === i ? '1px solid rgba(53,208,127,0.3)' : '1px solid rgba(53,208,127,0.08)',
                transition: 'border-color 0.3s ease',
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', padding: '20px 24px', display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', gap: '16px', background: 'none', border: 'none',
                  cursor: 'pointer', textAlign: 'left',
                }}
              >
                <span style={{ fontSize: '16px', fontWeight: 600, color: open === i ? '#35D07F' : '#f0faf4', lineHeight: 1.4, transition: 'color 0.2s' }}>
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ fontSize: '20px', color: '#35D07F', flexShrink: 0, fontWeight: 300, lineHeight: 1 }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div style={{ padding: '0 24px 20px', fontSize: '15px', color: '#8fb89a', lineHeight: 1.8 }}>
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
