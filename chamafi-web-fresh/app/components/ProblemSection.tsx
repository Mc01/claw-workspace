const problems = [
  {
    icon: "🔒",
    title: "Trust Issues",
    description:
      "Traditional chamas rely on a trusted organizer to hold and distribute funds. One bad actor can disappear with everyone's savings — no recourse, no accountability.",
    stat: "45%",
    statLabel: "of chamas experience disputes",
  },
  {
    icon: "📋",
    title: "No Transparency",
    description:
      "Paper ledgers and spreadsheets mean members can't verify balances in real-time. Disputes over who paid what, when, and how much are constant headaches.",
    stat: "3x",
    statLabel: "more disputes without records",
  },
  {
    icon: "🏦",
    title: "Banks Lock You Out",
    description:
      "Formal financial institutions charge high fees, require documentation most members don't have, and offer no yield on pooled savings. The system wasn't built for us.",
    stat: "1.4B",
    statLabel: "people are unbanked globally",
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-emerald-400 text-sm font-medium uppercase tracking-widest">The Problem</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-white">
            Savings groups are broken
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
            Rotating savings and credit associations (ROSCAs) have existed for centuries — but trust, transparency, and access remain unsolved.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl p-6 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{ background: "radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.08), transparent 60%)" }} />

              <div className="relative z-10">
                <div className="text-4xl mb-4">{p.icon}</div>
                <div className="text-3xl font-bold mb-1"
                  style={{
                    background: "linear-gradient(135deg, #10b981 0%, #8b5cf6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {p.stat}
                </div>
                <div className="text-slate-500 text-xs mb-4">{p.statLabel}</div>
                <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
