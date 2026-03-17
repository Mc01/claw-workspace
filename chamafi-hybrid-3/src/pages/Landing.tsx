import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Users,
  Shield,
  TrendingUp,
  Zap,
  Globe,
  BarChart3,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export function Landing() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-sm text-primary-400 font-medium">Built on Celo Blockchain</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            <span className="text-white">Save Together,</span>
            <br />
            <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-emerald-400 bg-clip-text text-transparent">
              Grow Together
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 animate-fade-in leading-relaxed">
            Join community savings circles powered by smart contracts. Pool funds with
            friends, reach targets together, and graduate to DeFi liquidity pools.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link
              to="/app"
              className="btn-primary inline-flex items-center justify-center gap-2 text-lg px-8 py-4"
            >
              Launch App
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#how-it-works"
              className="btn-secondary inline-flex items-center justify-center gap-2 text-lg px-8 py-4"
            >
              Learn More
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Floating stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-slide-up">
          {[
            { label: 'Total Saved', value: '$0', icon: BarChart3 },
            { label: 'Chamas Created', value: '0', icon: Users },
            { label: 'Members', value: '0', icon: Globe },
            { label: 'Graduated', value: '0', icon: TrendingUp },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-4 text-center">
              <stat.icon className="w-5 h-5 text-primary-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/40">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why ChamaFi?
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Traditional savings circles, supercharged with blockchain transparency and DeFi composability.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Users,
              title: 'Group Savings',
              desc: 'Pool funds with friends and community members to reach shared financial goals faster.',
              gradient: 'from-primary-500/20 to-emerald-500/20',
            },
            {
              icon: Shield,
              title: 'Trustless & Transparent',
              desc: 'All funds managed by audited smart contracts on Celo. No intermediaries, no hidden fees.',
              gradient: 'from-blue-500/20 to-cyan-500/20',
            },
            {
              icon: TrendingUp,
              title: 'Graduate to DeFi',
              desc: 'When targets are met, funds automatically convert to liquidity pool positions for passive yield.',
              gradient: 'from-amber-500/20 to-orange-500/20',
            },
            {
              icon: Zap,
              title: 'Low Cost',
              desc: 'Built on Celo for sub-cent transaction fees. Pay gas in stablecoins with fee abstraction.',
              gradient: 'from-purple-500/20 to-pink-500/20',
            },
            {
              icon: Globe,
              title: 'Mobile-First',
              desc: 'Works seamlessly in Opera MiniPay and as a Farcaster Mini App. Save from anywhere.',
              gradient: 'from-teal-500/20 to-green-500/20',
            },
            {
              icon: BarChart3,
              title: 'Track Progress',
              desc: 'Real-time dashboards showing savings progress, member activity, and time remaining.',
              gradient: 'from-rose-500/20 to-red-500/20',
            },
          ].map((feature) => (
            <div key={feature.title} className="glass-card-hover p-6 group">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-card p-8 md:p-12 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/[0.05] to-transparent pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
              How It Works
            </h2>
            <p className="text-white/40 text-center mb-12 max-w-lg mx-auto">
              Four simple steps from savings to DeFi
            </p>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Create or Join',
                  desc: 'Start a new Chama or join an existing one with friends.',
                  color: 'text-primary-400',
                },
                {
                  step: '02',
                  title: 'Contribute',
                  desc: 'Add stablecoin funds to the shared pool over time.',
                  color: 'text-emerald-400',
                },
                {
                  step: '03',
                  title: 'Reach Target',
                  desc: 'Hit your collective savings goal before the deadline.',
                  color: 'text-amber-400',
                },
                {
                  step: '04',
                  title: 'Graduate',
                  desc: 'Funds automatically become LP tokens earning yield.',
                  color: 'text-blue-400',
                },
              ].map((item, i) => (
                <div key={item.step} className="text-center relative">
                  {/* Connector line (desktop) */}
                  {i < 3 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-white/10 to-transparent" />
                  )}
                  <div className={`text-4xl font-bold ${item.color} opacity-30 mb-3`}>
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/40">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Saving?
          </h2>
          <p className="text-white/40 mb-8 max-w-lg mx-auto">
            Join the community-powered savings movement on Celo.
          </p>
          <Link
            to="/app"
            className="btn-primary inline-flex items-center gap-2 text-lg px-10 py-4"
          >
            Launch App
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-semibold text-white/60">ChamaFi</span>
          </div>
          <p className="text-sm text-white/30">
            © 2024 ChamaFi. Built on Celo.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://celo.org" target="_blank" rel="noopener noreferrer" className="text-sm text-white/30 hover:text-white/60 transition-colors">
              Celo
            </a>
            <a href="https://celoscan.io" target="_blank" rel="noopener noreferrer" className="text-sm text-white/30 hover:text-white/60 transition-colors">
              Explorer
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
