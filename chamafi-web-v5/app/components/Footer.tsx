const links = {
  Product:    [["How It Works","#howitworks"],["Features","#solution"],["MiniPay App","#minipay"],["Tokenomics","#tokenomics"],["Roadmap","#"]],
  Community:  [["Telegram","https://t.me/"],["Twitter / X","https://x.com/"],["Farcaster","https://warpcast.com/"],["Discord","#"],["Forum","#"]],
  Developers: [["Documentation","#"],["GitHub","https://github.com/"],["Smart Contracts","#"],["SDK","#"],["Bug Bounty","#"]],
  Legal:      [["Privacy Policy","#"],["Terms of Service","#"],["Risk Disclosure","#"]],
};

const socials = [
  { icon: "𝕏",  label: "Twitter",  href: "https://x.com/" },
  { icon: "✈",  label: "Telegram", href: "https://t.me/" },
  { icon: "⬡",  label: "Farcaster",href: "https://warpcast.com/" },
  { icon: "♦",  label: "Discord",  href: "#" },
];

const flags = ["🇳🇬","🇰🇪","🇬🇭","🇸🇳","🇿🇦","🇪🇹","🇹🇿","🇺🇬","🇷🇼","🇨🇮","🇲🇦","🇪🇬","🇦🇴","🇹🇩"];

export default function Footer() {
  return (
    <footer className="relative bg-[#0d0805] border-t border-yellow-900/20 overflow-hidden">
      <div className="h-1.5 bg-gradient-to-r from-yellow-600 via-orange-500 via-red-600 via-yellow-400 to-green-700" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='%23d4a017'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Top CTA */}
        <div className="text-center mb-16 pb-16 border-b border-yellow-900/15">
          <div className="text-4xl mb-4">🌍</div>
          <h3 className="text-3xl sm:text-4xl font-black text-[#f5e6c8] mb-4">Ready to Start Your Chama?</h3>
          <p className="text-[#f5e6c8]/55 mb-8 max-w-lg mx-auto">
            Join thousands of Africans building financial freedom together.
            Open in MiniPay and create your first savings group in under 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://minipay.opera.com/" target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl font-bold text-[#1a1008] hover:scale-105 transition-transform shadow-xl"
              style={{ background: "linear-gradient(135deg, #fbbf24, #cd7f32, #d97706)" }}>
              📱 Launch in MiniPay
            </a>
            <a href="#community"
              className="px-8 py-4 rounded-xl font-semibold text-[#f5e6c8] border border-yellow-700/30 hover:border-yellow-500/60 hover:bg-yellow-900/20 transition-all">
              🌍 Join Community
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(links).map(([cat, items]) => (
            <div key={cat}>
              <div className="text-yellow-400 font-bold text-sm uppercase tracking-widest mb-4">{cat}</div>
              <ul className="space-y-2">
                {items.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-[#f5e6c8]/50 hover:text-yellow-400 text-sm transition-colors">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Flags */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {flags.map((f, i) => (
            <span key={i} className="text-2xl hover:scale-125 transition-transform cursor-default">{f}</span>
          ))}
          <span className="text-[#f5e6c8]/30 text-sm self-center ml-2">+40 more</span>
        </div>

        {/* Bottom */}
        <div className="border-t border-yellow-900/15 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#1a1008] font-black"
              style={{ background: "linear-gradient(135deg, #fbbf24, #ea580c)" }}>◈</div>
            <span className="font-bold text-lg">
              <span className="text-yellow-400">Chama</span><span className="text-orange-400">Fi</span>
            </span>
          </div>
          <div className="text-center">
            <div className="text-[#f5e6c8]/40 text-sm font-medium">For Africa, By Africa 🌍</div>
            <div className="text-[#f5e6c8]/25 text-xs mt-0.5">© 2025 ChamaFi Protocol. Built with ❤️ on Celo.</div>
          </div>
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className="w-9 h-9 rounded-full bg-yellow-900/20 border border-yellow-800/20 flex items-center justify-center text-[#f5e6c8]/50 hover:text-yellow-400 hover:border-yellow-700/50 hover:bg-yellow-900/40 transition-all text-sm font-bold">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
