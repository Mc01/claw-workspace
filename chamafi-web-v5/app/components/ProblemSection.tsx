const problems = [
  {
    icon: "🏦", title: "Excluded from Banks",
    stat: "66%", statLabel: "of sub-Saharan Africa is unbanked",
    desc: "Traditional banks demand IDs, minimum balances, and physical branches that most Africans simply don&apos;t have access to.",
    c1: "from-red-900/40 to-orange-900/20", border: "border-red-800/30",
  },
  {
    icon: "💸", title: "Remittance Robbery",
    stat: "8.5%", statLabel: "average fee to send money to Africa",
    desc: "Sending money home costs African diaspora families billions yearly in predatory fees — money that should stay in communities.",
    c1: "from-orange-900/40 to-red-900/20", border: "border-orange-800/30",
  },
  {
    icon: "📋", title: "Chamas Are Paper-Based",
    stat: "300M+", statLabel: "people in informal savings groups",
    desc: "Africa&apos;s vibrant chama, merry-go-round, and ROSCA tradition is still run on paper ledgers, prone to fraud and disputes.",
    c1: "from-yellow-900/40 to-orange-900/20", border: "border-yellow-800/30",
  },
  {
    icon: "📈", title: "Inflation Erodes Savings",
    stat: "18%", statLabel: "average African inflation rate",
    desc: "Cash savings lose value faster than they grow. Without access to yield-generating instruments, communities fall behind.",
    c1: "from-amber-900/40 to-yellow-900/20", border: "border-amber-800/30",
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="relative py-24 bg-[#150e05] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a017'%3E%3Crect x='27' y='0' width='6' height='60'/%3E%3Crect x='0' y='27' width='60' height='6'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-900/30 border border-red-700/30 text-red-400 text-xs font-semibold uppercase tracking-widest mb-4">
            ⚡ The Problem
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-[#f5e6c8] mb-4">
            Africa Deserves{" "}
            <span style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Better
            </span>
          </h2>
          <p className="text-lg text-[#f5e6c8]/55 max-w-2xl mx-auto">
            Africa holds the world&apos;s youngest population and fastest-growing middle class —
            yet the financial system has failed them. Again and again.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((p) => (
            <div key={p.title}
              className={`group relative rounded-2xl p-6 bg-gradient-to-br ${p.c1} border ${p.border} hover:scale-[1.02] transition-all duration-300 overflow-hidden`}>
              <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                <svg viewBox="0 0 80 80" className="w-full h-full fill-current text-yellow-500">
                  <path d="M80 0 L80 80 L0 80 Z" />
                </svg>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0 mt-1">{p.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#f5e6c8] mb-1">{p.title}</h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-black text-yellow-400">{p.stat}</span>
                    <span className="text-sm text-[#f5e6c8]/50">{p.statLabel}</span>
                  </div>
                  <p className="text-[#f5e6c8]/65 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-yellow-900/20 border border-yellow-700/20">
            <span className="text-2xl">🌅</span>
            <p className="text-[#f5e6c8]/70 font-medium">
              The answer isn&apos;t to fix the old system.{" "}
              <span className="text-yellow-400 font-bold">It&apos;s to build a new one — for Africans, by Africans.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
