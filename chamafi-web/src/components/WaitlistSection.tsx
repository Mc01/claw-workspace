'use client';

import { useState } from 'react';

export default function WaitlistSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setEmail('');
    }, 1000);
  };

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden" id="waitlist">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-violet-950/20 to-slate-950 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold text-violet-400 uppercase tracking-widest mb-3">Early Access</p>
        <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
          Ready to transform your{' '}
          <span className="bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-transparent">
            savings group?
          </span>
        </h2>
        <p className="text-lg text-gray-400 mb-10">
          Join our waitlist to be among the first to experience ChamaFi when we launch.
        </p>

        {submitted ? (
          <div className="glass rounded-2xl p-8 text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-4">
              <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">You&apos;re on the list!</h3>
            <p className="text-gray-400">Thank you for joining our waitlist. We&apos;ll notify you when ChamaFi launches.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-500 to-violet-600 hover:from-emerald-400 hover:to-violet-500 transition-all shadow-lg disabled:opacity-50 whitespace-nowrap"
            >
              {loading ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>
        )}

        <p className="mt-4 text-sm text-gray-500">
          We care about your data. Read our{' '}
          <a href="#" className="text-gray-400 hover:text-white underline transition-colors">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </section>
  );
}
