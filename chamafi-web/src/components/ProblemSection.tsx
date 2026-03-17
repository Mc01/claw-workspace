export default function ProblemSection() {
  const problems = [
    {
      icon: (
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border border-emerald-500/20',
      title: 'Lack of Transparency',
      desc: 'Manual record keeping leads to disputes and mistrust among members.',
    },
    {
      icon: (
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-violet-400',
      bg: 'bg-violet-500/10 border border-violet-500/20',
      title: 'Limited Accessibility',
      desc: 'Geographic constraints and banking requirements exclude many potential members.',
    },
    {
      icon: (
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border border-emerald-500/20',
      title: 'Growth Constraints',
      desc: 'Limited investment options and lack of financial tools prevent groups from maximizing returns.',
    },
  ];

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <p className="text-sm font-semibold text-emerald-400 uppercase tracking-widest mb-3">The Challenge</p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Traditional savings groups face{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-transparent">
              modern challenges
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-gray-400 lg:mx-auto">
            Chamas and savings circles are vital to African communities, but they struggle with transparency, accessibility, and growth opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((p) => (
            <div key={p.title} className="glass rounded-2xl p-6">
              <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl ${p.bg} ${p.color} mb-4`}>
                {p.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
