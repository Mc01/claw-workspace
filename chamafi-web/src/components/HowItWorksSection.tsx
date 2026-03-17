export default function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      color: 'emerald',
      title: 'Create Group',
      desc: 'Set up your savings group with member details and contribution rules on the Celo blockchain.',
    },
    {
      num: '02',
      color: 'violet',
      title: 'Contribute',
      desc: 'Members make regular contributions directly to the group\'s smart contract wallet.',
    },
    {
      num: '03',
      color: 'emerald',
      title: 'Invest & Grow',
      desc: 'Vote on investment opportunities in DeFi protocols to generate returns for the group.',
    },
    {
      num: '04',
      color: 'violet',
      title: 'Distribute Returns',
      desc: 'Profits are automatically distributed to members based on their contributions and voting power.',
    },
  ];

  return (
    <section className="py-20 bg-slate-900" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-16">
          <p className="text-sm font-semibold text-emerald-400 uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Simple steps to{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-transparent">
              financial empowerment
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-gray-400 lg:mx-auto">
            ChamaFi makes it easy for savings groups to manage funds, make decisions, and grow together.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={step.num} className="relative glass rounded-2xl p-6 text-center">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-6 h-0.5 bg-gradient-to-r from-slate-700 to-transparent z-10" />
              )}
              <div className={`inline-flex items-center justify-center h-16 w-16 rounded-2xl text-2xl font-bold mb-4 ${
                step.color === 'emerald'
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                  : 'bg-violet-500/10 border border-violet-500/30 text-violet-400'
              }`}>
                {step.num}
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
