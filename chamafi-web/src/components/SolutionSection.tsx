export default function SolutionSection() {
  const features = [
    {
      icon: (
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      accent: 'emerald',
      title: 'Blockchain Transparency',
      desc: 'All transactions and records are stored on the Celo blockchain, ensuring complete transparency and immutability.',
    },
    {
      icon: (
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      accent: 'violet',
      title: 'Mobile-First Access',
      desc: 'Built for mobile devices with Opera MiniPay integration, making financial services accessible to anyone with a basic smartphone.',
    },
    {
      icon: (
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      accent: 'emerald',
      title: 'DeFi Investment Options',
      desc: 'Access to yield-generating DeFi protocols allows savings groups to earn higher returns on their collective funds.',
    },
    {
      icon: (
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      accent: 'violet',
      title: 'Community Governance',
      desc: 'Decentralized decision-making tools empower all group members to participate in financial decisions.',
    },
  ];

  return (
    <section className="py-20 bg-slate-950" id="solution">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <p className="text-sm font-semibold text-violet-400 uppercase tracking-widest mb-3">Our Solution</p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            ChamaFi{' '}
            <span className="bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">
              transforms
            </span>{' '}
            traditional savings groups
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-gray-400 lg:mx-auto">
            Leveraging blockchain technology to bring transparency, accessibility, and growth opportunities to African savings circles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f) => (
            <div key={f.title} className="glass rounded-2xl p-6 flex gap-4">
              <div className={`flex-shrink-0 inline-flex items-center justify-center h-12 w-12 rounded-xl ${
                f.accent === 'emerald'
                  ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                  : 'bg-violet-500/10 border border-violet-500/20 text-violet-400'
              }`}>
                {f.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
