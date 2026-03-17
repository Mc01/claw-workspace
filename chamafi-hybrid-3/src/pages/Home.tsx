import { Link } from 'react-router-dom';
import { ArrowRight, Users, Shield, TrendingUp } from 'lucide-react';

export function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Save Together on <span className="text-primary-600">Celo</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Join or create group savings Chamas. Pool funds, reach targets together, 
          and graduate to liquidity pools when you hit your goal.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/discover"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            Discover Chamas
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/create"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-600 font-medium rounded-lg border border-primary-600 hover:bg-primary-50 transition-colors"
          >
            Create Chama
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="font-semibold text-lg text-gray-900 mb-2">
            Group Savings
          </h3>
          <p className="text-gray-600">
            Pool funds with friends and community members to reach shared financial goals.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="font-semibold text-lg text-gray-900 mb-2">
            Secure & Transparent
          </h3>
          <p className="text-gray-600">
            All funds managed by smart contracts on Celo blockchain. No intermediaries.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="font-semibold text-lg text-gray-900 mb-2">
            Graduate to DeFi
          </h3>
          <p className="text-gray-600">
            When targets are met, funds automatically convert to liquidity pool positions.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-primary-50 rounded-2xl p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
          How It Works
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Create or Join', desc: 'Start a new Chama or join an existing one' },
            { step: '2', title: 'Contribute', desc: 'Add funds to the pool with other members' },
            { step: '3', title: 'Reach Target', desc: 'Hit your savings goal before the deadline' },
            { step: '4', title: 'Graduate', desc: 'Funds become liquidity pool tokens' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                {item.step}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
