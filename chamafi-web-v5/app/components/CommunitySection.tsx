const testimonials = [
  { name: "Amara Diallo",   location: "Dakar, Senegal 🇸🇳",      role: "Chama Founder",
    text: "We had a savings group for 10 years — all on paper. ChamaFi changed everything. Now our 15 members track every cedi in real time. No more arguments, no more lost records.",
    avatar: "AD", color: "from-yellow-600 to-orange-600", badge: "₵ 45,000 saved" },
  { name: "Fatima Osei",    location: "Accra, Ghana 🇬🇭",        role: "Market Vendor",
    text: "I got my first microloan to expand my market stall. My chama vouched for me. Repaid in 3 months. Now I'm the one voting to approve loans for others.",
    avatar: "FO", color: "from-orange-600 to-red-700",   badge: "cUSD 850 loaned" },
  { name: "Kwame Mensah",   location: "Kumasi, Ghana 🇬🇭",       role: "Tech Professional",
    text: "My diaspora family in London, Germany, and Ghana all save together now. ChamaFi made borders irrelevant for our family chama.",
    avatar: "KM", color: "from-green-700 to-yellow-600", badge: "4 countries, 1 chama" },
  { name: "Zara Kimani",    location: "Nairobi, Kenya 🇰🇪",      role: "ROSCA Organizer",
    text: "Before ChamaFi, I spent 2 hours every month collecting contributions via M-Pesa and updating spreadsheets. Now it's all automatic.",
    avatar: "ZK", color: "from-red-700 to-orange-600",   badge: "12 hrs/month saved" },
  { name: "Olu Adeyemi",    location: "Lagos, Nigeria 🇳🇬",      role: "Entrepreneur",
    text: "Used my chama record to prove creditworthiness for a larger DeFi loan. My on-chain reputation — built through ChamaFi — is worth more than any credit score.",
    avatar: "OA", color: "from-amber-600 to-yellow-500", badge: "Credit history built" },
  { name: "Priya Nkosi",    location: "Johannesburg, SA 🇿🇦",    role: "Stokvel Leader",
    text: "Stokvel is our culture. ChamaFi preserved that culture while adding DeFi yields. Our 20-member group earned 9% APY last year on top of our rotation.",
    avatar: "PN", color: "from-yellow-500 to-green-700", badge: "9% APY earned" },
];

const countries = ["🇳🇬 Nigeria","🇰🇪 Kenya","🇬🇭 Ghana","🇸🇳 Senegal","🇿🇦 South Africa","🇪🇹 Ethiopia","🇹🇿 Tanzania","🇺🇬 Uganda","🇷🇼 Rwanda","🇨🇮 Côte d'Ivoire","🇲🇦 Morocco","🇪🇬 Egypt"];

export default function CommunitySection() {
  return (
    <section id="community" className="relative py-24 bg-[#1a1008] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(212,160,23,0.06), transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-900/30 border border-green-700/30 text-green-400 text-xs font-semibold uppercase tracking-widest mb-4">
            🌍 Community
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-[#f5e6c8] mb-4">
            Voices from{" "}
            <span style={{ background: "linear-gradient(135deg, #fbbf24, #cd7f32)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Across Africa
            </span>
          </h2>
          <p className="text-lg text-[#f5e6c8]/55 max-w-xl mx-auto">Real communities. Real savings. Real financial freedom.</p>
        </div>

        {/* Country ticker */}
        <div className="relative overflow-hidden mb-14 py-3">
          <div className="flex gap-4 ticker-track whitespace-nowrap">
            {[...countries, ...countries].map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-yellow-900/20 border border-yellow-800/20 text-[#f5e6c8]/70 text-sm font-medium flex-shrink-0">
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="group relative rounded-2xl p-6 bg-[#2a1805]/50 border border-yellow-900/20 hover:border-yellow-700/30 transition-all duration-300 hover:scale-[1.01] overflow-hidden">
              <div className="absolute top-4 right-5 text-6xl text-yellow-600/10 font-serif leading-none select-none">&quot;</div>
              <p className="text-[#f5e6c8]/75 text-sm leading-relaxed mb-4 relative z-10">&ldquo;{t.text}&rdquo;</p>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${t.color} text-[#1a1008] text-xs font-bold mb-4`}>
                ✦ {t.badge}
              </div>
              <div className="flex items-center gap-3 border-t border-yellow-900/20 pt-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-[#1a1008] flex-shrink-0 bg-gradient-to-br ${t.color}`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-[#f5e6c8] font-semibold text-sm">{t.name}</div>
                  <div className="text-[#f5e6c8]/45 text-xs">{t.role} · {t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { v: "12,000+", l: "Active Members" },
            { v: "840+",    l: "Chamas Created" },
            { v: "$2.4M",   l: "Total Saved" },
            { v: "54",      l: "Countries" },
          ].map((s) => (
            <div key={s.l} className="text-center py-6 rounded-2xl bg-[#2a1805]/40 border border-yellow-900/15">
              <div className="text-3xl font-black text-yellow-400 mb-1">{s.v}</div>
              <div className="text-xs text-[#f5e6c8]/45 font-medium">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
