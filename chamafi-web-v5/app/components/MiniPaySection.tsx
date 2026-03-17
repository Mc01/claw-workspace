const features = [
  { icon: "⚡", title: "Instant payments",  desc: "Send cUSD to chama members in seconds" },
  { icon: "🌐", title: "Works offline",     desc: "USSD fallback for low-connectivity areas" },
  { icon: "🔐", title: "Self-custodial",    desc: "Your keys, your chama, your money" },
  { icon: "💵", title: "cUSD stable",       desc: "No crypto volatility for savings" },
  { icon: "📊", title: "Group dashboard",   desc: "Full transparency for all members" },
  { icon: "🔔", title: "Smart alerts",      desc: "Auto-notify for contributions & payouts" },
];

export default function MiniPaySection() {
  return (
    <section id="minipay" className="relative py-24 bg-[#130d04] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-600 via-orange-500 via-red-600 via-yellow-400 to-green-700" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-80 h-80 blur-[100px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(200,67,30,0.10), transparent)" }} />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 blur-[100px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,160,23,0.08), transparent)" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/30 border border-blue-700/30 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4">
            📱 MiniPay First
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-[#f5e6c8] mb-4 leading-tight">
            Built for{" "}
            <span style={{ background: "linear-gradient(135deg, #60a5fa, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Opera MiniPay
            </span>
            <br />
            <span>Africa&apos;s Favorite Wallet</span>
          </h2>
          <p className="text-lg text-[#f5e6c8]/55 max-w-2xl mx-auto">
            With over 5 million MiniPay users across Africa, we built ChamaFi to be
            the premier MiniApp — mobile-first, data-light, designed for real African conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Phone mockup */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full scale-110 blur-3xl" style={{ background: "rgba(212,160,23,0.12)" }} />
              {/* Phone */}
              <div className="relative w-72 rounded-[40px] bg-[#0d0805] border-4 border-yellow-800/40 shadow-2xl overflow-hidden" style={{ aspectRatio: "9/19.5" }}>
                <div className="h-10 bg-[#0d0805] flex items-center justify-between px-5 pt-2">
                  <span className="text-[#f5e6c8]/60 text-xs">9:41</span>
                  <div className="flex gap-1">
                    {[0,1,2].map(i => <div key={i} className="w-1 h-1 rounded-full bg-[#f5e6c8]/40" />)}
                  </div>
                </div>
                <div className="flex-1 bg-[#1a1008] mx-2 rounded-3xl overflow-hidden pb-2">
                  <div className="px-4 py-3" style={{ background: "linear-gradient(to right, #92400e, #c2410c)" }}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[#1a1008] font-black text-lg">ChamaFi</span>
                      <span className="text-[#1a1008]/70 text-xs">🌍</span>
                    </div>
                    <div className="text-[#1a1008]/70 text-xs">My Chamas</div>
                  </div>
                  <div className="px-4 py-3 text-center border-b border-yellow-900/20">
                    <div className="text-xs text-[#f5e6c8]/40 mb-1">Total Saved</div>
                    <div className="text-2xl font-black text-yellow-400">cUSD 1,240</div>
                    <div className="text-xs text-green-400 mt-1">↑ +8.4% this month</div>
                  </div>
                  {["Nairobi Circle", "Family Savings"].map((name, i) => (
                    <div key={name} className="mx-2 mt-2 rounded-xl p-3 bg-[#2a1805]/60 border border-yellow-900/20">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[#f5e6c8] text-xs font-semibold">{name}</span>
                        <span className="text-yellow-400 text-xs">{i === 0 ? "cUSD 890" : "cUSD 350"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-yellow-900/30">
                          <div className="h-full rounded-full bg-yellow-500" style={{ width: i === 0 ? "72%" : "45%" }} />
                        </div>
                        <span className="text-[#f5e6c8]/40 text-xs">{i === 0 ? "8/12" : "5/8"}</span>
                      </div>
                    </div>
                  ))}
                  <div className="grid grid-cols-3 gap-2 mx-2 mt-3">
                    {["Contribute", "Loan", "Invite"].map((act) => (
                      <button key={act} className="py-2 rounded-xl text-[#1a1008] text-xs font-bold"
                        style={{ background: "linear-gradient(135deg, #fbbf24, #d97706)" }}>
                        {act}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="h-6 bg-[#0d0805] flex items-center justify-center">
                  <div className="w-24 h-1 rounded-full bg-[#f5e6c8]/20" />
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-[#2a1805] border border-yellow-700/40 rounded-2xl px-3 py-2 text-xs shadow-xl animate-float">
                <div className="text-yellow-400 font-bold">🎉 Payout Ready!</div>
                <div className="text-[#f5e6c8]/60">cUSD 450 to Amara</div>
              </div>
              <div className="absolute -bottom-3 -left-4 bg-[#2a1805] border border-green-700/40 rounded-2xl px-3 py-2 text-xs shadow-xl">
                <div className="text-green-400 font-bold">📈 +12% APY</div>
                <div className="text-[#f5e6c8]/60">Your group earns</div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-2xl font-black text-[#f5e6c8] mb-6">Everything you need, in your pocket</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-3 p-4 rounded-xl bg-[#2a1805]/40 border border-yellow-900/15 hover:border-yellow-700/30 transition-colors">
                  <span className="text-xl flex-shrink-0">{f.icon}</span>
                  <div>
                    <div className="text-[#f5e6c8] text-sm font-semibold">{f.title}</div>
                    <div className="text-[#f5e6c8]/50 text-xs mt-0.5">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://minipay.opera.com/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-4 rounded-xl font-bold text-[#1a1008] hover:scale-105 transition-transform shadow-xl"
                style={{ background: "linear-gradient(135deg, #fbbf24, #cd7f32, #d97706)" }}>
                <span className="text-2xl">📱</span>
                <div>
                  <div className="text-sm font-black">Open ChamaFi</div>
                  <div className="text-xs font-normal opacity-70">in Opera MiniPay</div>
                </div>
              </a>
              <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-[#2a1805]/50 border border-yellow-900/20">
                <span className="text-2xl">⭐</span>
                <div>
                  <div className="text-[#f5e6c8] text-sm font-bold">5 million+</div>
                  <div className="text-[#f5e6c8]/50 text-xs">MiniPay users in Africa</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-700 via-yellow-400 via-red-600 to-orange-500" />
    </section>
  );
}
