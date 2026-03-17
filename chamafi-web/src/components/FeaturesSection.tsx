const features = [
  {
    title: 'On-Chain Transparency',
    desc: 'Every deposit, withdrawal, and vote is recorded on Celo — immutable and auditable by all members.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    accent: 'emerald',
    size: 'large',
  },
  {
    title: 'Instant Withdrawals',
    desc: 'Access your share anytime. No lock-ups, no gatekeepers — just smart contract logic.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    accent: 'violet',
    size: 'small',
  },
  {
    title: 'Community Governance',
    desc: 'Token-weighted voting for Chama decisions. Every voice counts.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    accent: 'emerald',
    size: 'small',
  },
  {
    title: 'Mobile-First via MiniPay',
    desc: 'Native Opera MiniPay integration. Designed for smartphones — no crypto jargon, just savings.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    accent: 'violet',
    size: 'large',
  },
  {
    title: 'DeFi Yield',
    desc: 'Group funds are deployed into Feather Finance for real yield — up to 8.4% APY on stablecoins.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    accent: 'emerald',
    size: 'small',
  },
  {
    title: 'Social Connect',
    desc: 'Farcaster frames and social sharing — grow your Chama community across Web3 social networks.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    ),
    accent: 'violet',
    size: 'small',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-slate-950" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-emerald-400 uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Built for{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-transparent">
              the future of savings
            </span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-gray-400 text-lg">
            Everything your Chama needs — transparent, mobile-native, and yield-bearing.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className={`glass rounded-2xl p-6 flex flex-col gap-4 hover:border-${f.accent}-500/30 transition-all group ${
                f.size === 'large' ? 'lg:col-span-2' : ''
              }`}
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border transition-all group-hover:scale-110 ${
                  f.accent === 'emerald'
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20'
                    : 'bg-violet-500/10 border-violet-500/20 text-violet-400 group-hover:bg-violet-500/20'
                }`}
              >
                {f.icon}
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
