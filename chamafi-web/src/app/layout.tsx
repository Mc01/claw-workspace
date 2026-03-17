import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChamaFi - Chamas That Grow',
  description: 'Empowering African communities with decentralized finance tools to save, invest, and grow together.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <header className="bg-amber-900 text-amber-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
                <div className="flex justify-start lg:w-0 lg:flex-1">
                  <a href="/">
                    <span className="sr-only">ChamaFi</span>
                    <div className="h-8 w-auto bg-emerald-500 rounded-md flex items-center justify-center text-white font-bold px-2">
                      CF
                    </div>
                  </a>
                </div>
                <nav className="hidden md:flex space-x-10">
                  <a href="#" className="text-base font-medium text-amber-100 hover:text-emerald-300">
                    How It Works
                  </a>
                  <a href="#" className="text-base font-medium text-amber-100 hover:text-emerald-300">
                    Features
                  </a>
                  <a href="#" className="text-base font-medium text-amber-100 hover:text-emerald-300">
                    Community
                  </a>
                </nav>
                <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                  <a
                    href="#waitlist"
                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-amber-900 bg-emerald-400 hover:bg-emerald-500"
                  >
                    Join Waitlist
                  </a>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-amber-900 text-amber-100">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="col-span-2">
                  <h3 className="text-lg font-bold">ChamaFi</h3>
                  <p className="mt-4 text-base text-amber-200">
                    Empowering African communities with decentralized finance tools to save, invest, and grow together.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-amber-100 uppercase tracking-wider">Product</h3>
                  <ul className="mt-4 space-y-4">
                    <li><a href="#" className="text-base text-amber-200 hover:text-white">Features</a></li>
                    <li><a href="#" className="text-base text-amber-200 hover:text-white">How It Works</a></li>
                    <li><a href="#" className="text-base text-amber-200 hover:text-white">Pricing</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-amber-100 uppercase tracking-wider">Connect</h3>
                  <ul className="mt-4 space-y-4">
                    <li><a href="#" className="text-base text-amber-200 hover:text-white">Twitter</a></li>
                    <li><a href="#" className="text-base text-amber-200 hover:text-white">Telegram</a></li>
                    <li><a href="#" className="text-base text-amber-200 hover:text-white">Discord</a></li>
                  </ul>
                </div>
              </div>
              <div className="mt-12 border-t border-amber-800 pt-8">
                <p className="text-base text-amber-200 text-center">
                  © 2026 ChamaFi. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}