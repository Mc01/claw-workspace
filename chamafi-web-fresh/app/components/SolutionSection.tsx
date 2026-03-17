const features = [
  {
    icon: "⛓️",
    title: "Smart Contract Escrow",
    description: "Funds are held in audited smart contracts on Celo. No single person can access the pool — rules are enforced by code, not trust.",
  },
  {
    icon: "🔍",
    title: "Full On-Chain Transparency",
    description: "Every contribution, payout, and balance is visible on-chain. Members can verify the state of their chama anytime from any device.",
  },
  {
    icon: "📱",
    title: "Mobile-First UX",
    description: "Designed for MiniPay and web wallets. Join and manage your chama from a smartphone — no technical knowledge required.",
  },
  {
    icon: "💰",
    title: "Yield on Idle Funds",
    description: "Pooled funds earn yield via Celo DeFi protocols while waiting for the next payout. Your money works harder between rounds.",
  },
  {
    icon: "🗳️",
    title: "Governance & Voting",
    description: "Members vote on-chain to add new participants, change contribution amounts, or remove bad actors. Democracy built in.",
  },
  {
    icon: "🌍",
    title: "Stablecoin Native",
    description: "Denominated in cUSD so your savings aren't subject to crypto volatility. Predictable, reliable contributions and payouts.",
  },
];

export default function SolutionSection() {
  return (
    <section id="solution" className="py-24 bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-violet-400 text-sm font-medium uppercase tracking-widest">The Solution</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-white">
            ChamaFi fixes everything
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
            We took everything that works about traditional chamas and rebuilt it with blockchain infrastructure — keeping the community, removing the risk.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-6 group hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.07)",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(139,92,246,0.06) 100%)" }}
              />
              <div className="relative z-10">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
