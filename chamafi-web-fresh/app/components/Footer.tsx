export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-violet-600 flex items-center justify-center font-bold text-white text-sm">C</div>
              <span className="text-white font-bold text-xl">ChamaFi</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              Bringing rotating savings circles on-chain. Transparent, trustless, and built for everyone.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="https://twitter.com/chamafi" target="_blank" rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-colors text-sm">Twitter/X</a>
              <a href="https://discord.gg/chamafi" target="_blank" rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-colors text-sm">Discord</a>
              <a href="https://github.com/chamafi" target="_blank" rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-colors text-sm">GitHub</a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Product</h4>
            <ul className="space-y-2">
              {["Features", "How It Works", "Security", "Roadmap"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Resources</h4>
            <ul className="space-y-2">
              {["Docs", "Whitepaper", "Blog", "Community"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs">© 2025 ChamaFi. Built on Celo.</p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-600 hover:text-slate-400 transition-colors text-xs">Privacy Policy</a>
            <a href="#" className="text-slate-600 hover:text-slate-400 transition-colors text-xs">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
