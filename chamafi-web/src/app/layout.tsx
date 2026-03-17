import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChamaFi — Chamas That Grow',
  description: 'Empowering African communities with decentralized finance tools to save, invest, and grow together on Celo.',
};

// Stats ticker data
const stats = [
  { label: 'TVL', value: '$1.2M' },
  { label: 'Chamas', value: '45' },
  { label: 'Members', value: '230' },
  { label: 'Yield APY', value: '8.4%' },
  { label: 'Transactions', value: '1,847' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-900 text-white`}>
        {/* Live Stats Ticker */}
        <div className="bg-slate-800 border-b border-slate-700 overflow-hidden h-9 flex items-center">
          <div className="flex ticker-track whitespace-nowrap">
            {[...stats, ...stats].map((stat, i) => (
              <span key={i} className="inline-flex items-center gap-2 px-8 text-sm">
                <span className="text-gray-400">{stat.label}</span>
                <span className="font-semibold text-emerald-400">{stat.value}</span>
                <span className="text-slate-600 mx-2">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* Header */}
        <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              {/* Logo */}
              <a href="/" className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-emerald-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-lg glow-emerald">
                  CF
                </div>
                <span className="text-white font-bold text-lg">ChamaFi</span>
              </a>

              {/* Nav */}
              <nav className="hidden md:flex items-center gap-8">
                <a href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">How It Works</a>
                <a href="#solution" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a>
                <a href="#waitlist" className="text-sm text-gray-400 hover:text-white transition-colors">Community</a>
              </nav>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <a
                  href="#waitlist"
                  className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-300 border border-slate-700 rounded-lg hover:border-emerald-500 hover:text-white transition-colors"
                >
                  Join Waitlist
                </a>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-emerald-500 to-violet-600 hover:from-emerald-400 hover:to-violet-500 transition-all shadow-lg glow-emerald"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"/>
                    <path d="M9 12L11 14L15 10"/>
                  </svg>
                  Connect Wallet
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-slate-950 border-t border-slate-800">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs">CF</div>
                  <span className="font-bold text-white">ChamaFi</span>
                </div>
                <p className="text-sm text-gray-400 max-w-xs">
                  Empowering African communities with decentralized finance tools to save, invest, and grow together.
                </p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Product</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">How It Works</a></li>
                  <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Roadmap</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Connect</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Twitter / X</a></li>
                  <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Telegram</a></li>
                  <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Discord</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-10 pt-8 border-t border-slate-800">
              <p className="text-xs text-gray-600 text-center">
                © 2026 ChamaFi. Built on Celo. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
