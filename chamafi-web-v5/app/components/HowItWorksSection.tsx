const steps = [
  { num: "01", icon: "👥", title: "Create or Join a Chama",
    desc: "Start a new savings group or join an existing one. Invite family, friends, or colleagues with a phone.",
    detail: "Groups can be public or invite-only. Smart contracts enforce the rules automatically.", accent: "#fbbf24" },
  { num: "02", icon: "💵", title: "Contribute Monthly",
    desc: "Each member contributes their agreed cUSD amount. Contributions are tracked on-chain — no disputes, full transparency.",
    detail: "Late payments trigger automatic reminders. Missed payments handled by group-voted rules.", accent: "#cd7f32" },
  { num: "03", icon: "📈", title: "Pool Earns Yield",
    desc: "The group&apos;s pooled cUSD is deployed into Celo DeFi protocols, earning yield for all members simultaneously.",
    detail: "Currently integrated with Moola, Ubeswap, and Mento for optimized returns.", accent: "#c8431e" },
  { num: "04", icon: "🔄", title: "Rotating Payouts",
    desc: "Each cycle, one member receives the full pool — just like a traditional merry-go-round.",
    detail: "Or choose dividend mode — everyone earns proportional yields instead.", accent: "#6f762e" },
  { num: "05", icon: "💳", title: "Access Microloans",
    desc: "Need funds before your payout cycle? Borrow against the group&apos;s collateral. Repay with minimal interest.",
    detail: "Loan limits are set by group governance. Community trust = credit worthiness.", accent: "#fbbf24" },
  { num: "06", icon: "🏆", title: "Build On-Chain Credit",
    desc: "Your participation history becomes a verifiable on-chain credit score — opening doors to larger DeFi opportunities.",
    detail: "Your chama record is your financial passport for the African DeFi ecosystem.", accent: "#cd7f32" },
];

export default function HowItWorksSection() {
  return (
    <section id="howitworks" className="relative py-24 bg-[#130d04] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-600 via-orange-500 via-red-600 via-yellow-400 to-green-700" />

      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a017'%3E%3Cpath d='M60 10L110 60L60 110L10 60Z'/%3E%3Cpath d='M60 35L85 60L60 85L35 60Z'/%3E%3Ccircle cx='60' cy='60' r='8'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "120px 120px" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-900/30 border border-orange-700/30 text-orange-400 text-xs font-semibold uppercase tracking-widest mb-4">
            🗺️ How It Works
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-[#f5e6c8] mb-4">
            Simple as a{" "}
            <span style={{ background: "linear-gradient(135deg, #fbbf24, #cd7f32)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Village Meeting
            </span>
          </h2>
          <p className="text-lg text-[#f5e6c8]/55 max-w-2xl mx-auto">
            If you&apos;ve ever been in a chama or merry-go-round, you already understand ChamaFi.
            We just made it digital, global, and profitable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.num} className="group relative rounded-2xl p-6 bg-[#2a1805]/50 border border-yellow-900/20 hover:border-yellow-700/30 transition-all hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 bg-[#1a1008] flex-shrink-0"
                  style={{ borderColor: s.accent }}>
                  {s.icon}
                </div>
                <span className="text-xs font-black tracking-widest" style={{ color: s.accent }}>STEP {s.num}</span>
              </div>
              <h3 className="text-lg font-bold text-[#f5e6c8] mb-2">{s.title}</h3>
              <p className="text-[#f5e6c8]/65 text-sm leading-relaxed mb-3">{s.desc}</p>
              <p className="text-xs text-[#f5e6c8]/35 italic border-t border-yellow-900/20 pt-3">{s.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a href="https://minipay.opera.com/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-[#1a1008] text-lg hover:scale-105 transition-transform shadow-2xl"
            style={{ background: "linear-gradient(135deg, #fbbf24, #cd7f32, #d97706)" }}>
            <span>🚀</span> Start Your Chama Today
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-700 via-yellow-400 via-red-600 to-orange-500" />
    </section>
  );
}
