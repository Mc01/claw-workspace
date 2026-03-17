export default function SocialProofSection() {
  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-transparent to-violet-900/10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Quote mark */}
        <div className="flex justify-center mb-6">
          <svg className="w-12 h-12 text-emerald-500/40" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>

        <blockquote className="text-2xl sm:text-3xl font-medium text-white leading-snug mb-8">
          "ChamaFi brings traditional savings into DeFi — making community finance{' '}
          <span className="bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-transparent">
            transparent, accessible, and rewarding
          </span>{' '}
          for everyone."
        </blockquote>

        <p className="text-gray-500 text-sm mb-14">Powered by leading Web3 infrastructure</p>

        {/* Partner logos */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
          {/* Celo */}
          <div className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
            <div className="glass rounded-xl p-3 w-14 h-14 flex items-center justify-center">
              <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                <circle cx="16" cy="16" r="16" fill="#FCFF52" />
                <circle cx="16" cy="16" r="7.5" stroke="#111" strokeWidth="3" fill="none" />
                <circle cx="16" cy="8.5" r="2.5" fill="#111" />
              </svg>
            </div>
            <span className="text-xs text-gray-400 font-medium">Celo</span>
          </div>

          {/* MiniPay */}
          <div className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
            <div className="glass rounded-xl p-3 w-14 h-14 flex items-center justify-center">
              <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                <rect width="32" height="32" rx="8" fill="#FF6B35" />
                <path d="M8 10h16v12H8z" rx="2" fill="white" opacity=".9" />
                <path d="M11 14h6M11 17h4" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-xs text-gray-400 font-medium">MiniPay</span>
          </div>

          {/* Feather */}
          <div className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
            <div className="glass rounded-xl p-3 w-14 h-14 flex items-center justify-center">
              <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                <rect width="32" height="32" rx="8" fill="#6366F1" />
                <path d="M16 6c0 0 8 4 8 10s-8 10-8 10S8 22 8 16 16 6 16 6z" fill="white" opacity=".9" />
                <path d="M16 6v20" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-xs text-gray-400 font-medium">Feather</span>
          </div>

          {/* Uniswap */}
          <div className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
            <div className="glass rounded-xl p-3 w-14 h-14 flex items-center justify-center">
              <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                <rect width="32" height="32" rx="8" fill="#FF007A" />
                <path d="M12 20c0-4 8-4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="12" cy="20" r="2.5" fill="white" />
                <circle cx="20" cy="12" r="2.5" fill="white" />
              </svg>
            </div>
            <span className="text-xs text-gray-400 font-medium">Uniswap V4</span>
          </div>
        </div>
      </div>
    </section>
  );
}
