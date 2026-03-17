export default function StatsSection() {
  const stats = [
    {
      label: 'Total Value Locked',
      value: '$1.2M',
      sub: 'Across all Chamas',
      accent: 'emerald',
    },
    {
      label: 'Active Chamas',
      value: '45',
      sub: 'Groups saving together',
      accent: 'violet',
    },
    {
      label: 'Members',
      value: '230',
      sub: 'Across Africa',
      accent: 'emerald',
    },
    {
      label: 'Yield APY',
      value: '8.4%',
      sub: 'Average via Feather',
      accent: 'violet',
    },
  ];

  return (
    <section className="py-16 bg-slate-900 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/10 via-transparent to-violet-900/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass rounded-2xl p-6 text-center flex flex-col items-center gap-2 hover:border-emerald-500/30 transition-all"
            >
              <p
                className={`text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent ${
                  s.accent === 'emerald'
                    ? 'bg-gradient-to-br from-emerald-300 to-emerald-500'
                    : 'bg-gradient-to-br from-violet-300 to-violet-500'
                }`}
              >
                {s.value}
              </p>
              <p className="text-sm font-semibold text-white">{s.label}</p>
              <p className="text-xs text-gray-500">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
