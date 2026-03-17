const distribution = [
  { label: "Community Rewards",    pct: 35, color: "#fbbf24", desc: "Distributed to active chama participants over 5 years" },
  { label: "Treasury",             pct: 20, color: "#cd7f32", desc: "Protocol development and operations" },
  { label: "Ecosystem Growth",     pct: 15, color: "#c8431e", desc: "Partnerships, integrations, grants" },
  { label: "Team & Advisors",      pct: 15, color: "#6f762e", desc: "4-year vest, 1-year cliff" },
  { label: "Seed & Early Backers", pct: 10, color: "#a87224", desc: "2-year vest, 6-month cliff" },
  { label: "Public Distribution",  pct:  5, color: "#d97706", desc: "LBP and community sale" },
];

const tokenUtils = [
  { icon: "🗳️", title: "Governance",     desc: "Vote on group rules, protocol upgrades, and treasury allocation" },
  { icon: "💸", title: "Fee Discounts",  desc: "Hold CHAMA tokens to reduce platform fees up to 50%" },
  { icon: "⚡", title: "Boosted Yields", desc: "Stake CHAMA to boost your chama group's yield earnings" },
  { icon: "🏆", title: "Reputation",     desc: "CHAMA holdings factor into your on-chain credit score" },
];

export default function TokenomicsSection() {
  return (
    <section id="tokenomics" className="relative py-24 bg-[#1a1008] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0L80 40L40 80L0 40Z' fill='%23d4a017'/%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] blur-[120px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(212,160,23,0.06), transparent)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-900/30 border border-yellow-700/30 text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-4">
            💎 Tokenomics
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-[#f5e6c8] mb-4">
            <span style={{ background: "linear-gradient(135deg, #fbbf24, #cd7f32)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              CHAMA Token
            </span>
          </h2>
          <p className="text-lg text-[#f5e6c8]/55 max-w-xl mx-auto">
            The governance and utility token of the ChamaFi protocol.
            Community-first distribution. No VCs at the expense of Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-xl font-bold text-[#f5e6c8] mb-6 flex items-center gap-2">
              <span className="text-yellow-400">◈</span> Token Distribution
            </h3>
            <div className="space-y-3 mb-8">
              {distribution.map((d) => (
                <div key={d.label}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-[#f5e6c8]/80 font-medium">{d.label}</span>
                    <span className="font-black" style={{ color: d.color }}>{d.pct}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-yellow-900/20 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${d.pct}%`, background: d.color }} />
                  </div>
                  <div className="text-xs text-[#f5e6c8]/35 mt-0.5">{d.desc}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { l: "Total Supply",   v: "1,000,000,000" },
                { l: "Chain",          v: "Celo (ERC-20)" },
                { l: "Ticker",         v: "$CHAMA" },
                { l: "Decimals",       v: "18" },
              ].map((item) => (
                <div key={item.l} className="p-4 rounded-xl bg-[#2a1805]/50 border border-yellow-900/20">
                  <div className="text-xs text-[#f5e6c8]/40 mb-1">{item.l}</div>
                  <div className="text-[#f5e6c8] font-bold text-sm">{item.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#f5e6c8] mb-6 flex items-center gap-2">
              <span className="text-orange-400">◆</span> Token Utility
            </h3>
            <div className="space-y-4 mb-8">
              {tokenUtils.map((u) => (
                <div key={u.title} className="flex items-start gap-4 p-4 rounded-xl bg-[#2a1805]/40 border border-yellow-900/15 hover:border-yellow-700/30 transition-colors">
                  <span className="text-2xl flex-shrink-0">{u.icon}</span>
                  <div>
                    <div className="text-[#f5e6c8] font-bold mb-1">{u.title}</div>
                    <div className="text-[#f5e6c8]/55 text-sm leading-relaxed">{u.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-5 rounded-2xl adinkra-border">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🎁</span>
                <span className="text-yellow-400 font-bold">Earn $CHAMA</span>
              </div>
              <p className="text-[#f5e6c8]/65 text-sm leading-relaxed mb-4">
                Active chama participants earn CHAMA tokens automatically.
                The more your community saves and contributes, the more you earn.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-yellow-400 hover:text-yellow-300 transition-colors">
                View Earnings Formula →
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-[#f5e6c8]/25 max-w-2xl mx-auto leading-relaxed">
            Token details are preliminary and subject to change. CHAMA tokens are not currently available for purchase.
            This is not financial advice. Always do your own research.
          </p>
        </div>
      </div>
    </section>
  );
}
