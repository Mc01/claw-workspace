const features = [
  { icon: "🤝", title: "Digital Chamas",       highlight: "Community-first", color: "text-yellow-400",
    desc: "Create or join savings groups on-chain. Transparent, tamper-proof ledgers replace paper books." },
  { icon: "💰", title: "DeFi Yields on cUSD",  highlight: "Up to 12% APY",  color: "text-orange-400",
    desc: "Your group&apos;s pooled cUSD automatically earns yield through Celo DeFi protocols. Your money works while you sleep." },
  { icon: "⚡", title: "Instant Microloans",   highlight: "No credit check", color: "text-green-400",
    desc: "Group members can access microloans backed by collective collateral. No credit score — trust is your credit." },
  { icon: "📱", title: "MiniPay Native",        highlight: "5M+ users",      color: "text-blue-400",
    desc: "Built first for Opera MiniPay — the most used DeFi wallet in Africa. Works with just a phone and mobile data." },
  { icon: "🌍", title: "54-Country Coverage",  highlight: "Pan-African",     color: "text-red-400",
    desc: "From Lagos to Nairobi, Cairo to Cape Town — one protocol for all of Africa. cUSD stable across borders." },
  { icon: "🔐", title: "Self-Custodial",        highlight: "Non-custodial",   color: "text-purple-400",
    desc: "No bank can freeze your group fund. No middleman takes a cut. Your keys, your chama, your future." },
];

export default function SolutionSection() {
  return (
    <section id="solution" className="relative py-24 bg-[#1a1008] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 opacity-10 blur-3xl rounded-full"
          style={{ background: "radial-gradient(circle, #d4a017, transparent)" }} />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 blur-3xl rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, #c8431e, transparent)" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-900/30 border border-yellow-700/30 text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-4">
            ✨ The Solution
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-[#f5e6c8] mb-4 leading-tight">
            ChamaFi:{" "}
            <span style={{ background: "linear-gradient(135deg, #fbbf24 0%, #cd7f32 50%, #d97706 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Community Finance,
            </span>
            <br />
            <span>Reimagined for Africa</span>
          </h2>
          <p className="text-lg text-[#f5e6c8]/55 max-w-2xl mx-auto">
            We didn&apos;t import a Western DeFi protocol and slap Africa on it.
            We built from the ground up — starting with how Africans already save and trust each other.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title}
              className="group relative rounded-2xl p-6 bg-[#2a1805]/60 border border-yellow-900/20 hover:border-yellow-700/40 hover:bg-[#2a1805]/80 transition-all duration-300 hover:scale-[1.02] overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-600/0 via-yellow-500/60 to-yellow-600/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-3xl mb-4">{f.icon}</div>
              <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${f.color}`}>{f.highlight}</div>
              <h3 className="text-lg font-bold text-[#f5e6c8] mb-2">{f.title}</h3>
              <p className="text-[#f5e6c8]/55 text-sm leading-relaxed">{f.desc}</p>
              <div className="absolute bottom-3 right-3 text-yellow-600/10 text-4xl font-black select-none">◈</div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="text-[#f5e6c8]/50 text-sm font-medium">Built on:</div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {["⚡ Celo Blockchain", "📱 Opera MiniPay", "🔒 cUSD Stablecoin", "🌐 Farcaster"].map((item) => (
              <div key={item} className="px-4 py-2 rounded-full bg-yellow-900/20 border border-yellow-800/30 text-[#f5e6c8]/70 text-sm font-medium">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
