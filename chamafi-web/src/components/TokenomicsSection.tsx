const steps = [
  {
    number: '01',
    title: '1M Tokens Minted',
    desc: 'When a Chama graduates (reaches its savings goal), exactly 1,000,000 CHAMA tokens are minted for that group.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    accent: 'emerald',
  },
  {
    number: '02',
    title: 'Proportional Distribution',
    desc: 'Tokens are distributed proportionally based on each member\'s contribution to the Chama — more you save, more you earn.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    accent: 'violet',
  },
  {
    number: '03',
    title: 'Trade on Uniswap V4',
    desc: 'Each Chama token gets its own liquidity pool on Uniswap V4 — enabling free-market price discovery and exit liquidity.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    ),
    accent: 'emerald',
  },
  {
    number: '04',
    title: 'Earn Yield via Feather',
    desc: 'Token holders can stake into Feather Finance vaults and continue earning yield — your savings never stop working.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    accent: 'violet',
  },
];

export default function TokenomicsSection() {
  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden" id="tokenomics">
      {/* bg decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-violet-400 uppercase tracking-widest mb-3">Tokenomics</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            From savings to{' '}
            <span className="bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">
              ownership
            </span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-gray-400 text-lg">
            A simple, fair token model that rewards savers and creates liquid community assets.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {steps.map((s) => (
            <div key={s.number} className="glass rounded-2xl p-6 flex gap-5">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl border ${
                    s.accent === 'emerald'
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      : 'bg-violet-500/10 border-violet-500/20 text-violet-400'
                  }`}
                >
                  {s.icon}
                </div>
                <span className={`text-xs font-bold tabular-nums ${s.accent === 'emerald' ? 'text-emerald-600' : 'text-violet-600'}`}>
                  {s.number}
                </span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Visual flow badge */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-gray-400">
          {['Chama Graduates', '→', '1M Tokens Minted', '→', 'Members Receive Tokens', '→', 'Trade on Uniswap V4', '→', 'Earn Yield on Feather'].map((item, i) => (
            item === '→' ? (
              <span key={i} className="text-gray-600">{item}</span>
            ) : (
              <span key={i} className="glass rounded-lg px-3 py-1.5 text-white text-xs">{item}</span>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
