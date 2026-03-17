const steps = [
  {
    step: "01",
    title: "Create or Join a Chama",
    description:
      "Start a new savings circle or join an existing one via invite link. Set contribution amount, frequency, and payout order. Smart contract is deployed automatically.",
    detail: "Members contribute cUSD on a weekly or monthly schedule. The order of payouts is randomized or agreed upon during setup.",
  },
  {
    step: "02",
    title: "Contribute & Earn Yield",
    description:
      "Each cycle, members contribute their agreed amount to the shared pool. Between payouts, idle funds are deployed to earn yield in Celo DeFi protocols.",
    detail: "All contributions and balances are publicly verifiable on-chain. Members receive notifications and can track progress in real-time.",
  },
  {
    step: "03",
    title: "Receive Your Payout",
    description:
      "When it's your turn, the smart contract automatically releases the full pool to your wallet — no middleman, no delays, no fees.",
    detail: "The cycle repeats until all members have received their payout. Yield earned is distributed proportionally to all members.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-emerald-400 text-sm font-medium uppercase tracking-widest">How It Works</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-white">
            Simple as 1, 2, 3
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
            ChamaFi makes on-chain savings as simple as a WhatsApp group — but with cryptographic guarantees.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.3), rgba(139,92,246,0.3), transparent)" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={s.step} className="relative">
                <div
                  className="rounded-2xl p-8 h-full hover:scale-[1.02] transition-transform duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {/* Step number */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg mb-6 relative z-10"
                    style={{
                      background: "linear-gradient(135deg, #10b981 0%, #8b5cf6 100%)",
                    }}
                  >
                    {s.step}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{s.description}</p>
                  <p className="text-slate-500 text-xs leading-relaxed border-t border-white/5 pt-4">{s.detail}</p>
                </div>

                {/* Arrow between steps (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-16 -right-4 z-20 w-8 h-8 items-center justify-center text-emerald-400/60">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
