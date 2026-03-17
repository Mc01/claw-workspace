import { Link, Outlet } from 'react-router-dom';
import { Rocket } from 'lucide-react';

export function LandingLayout() {
  return (
    <div className="min-h-screen bg-surface relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary-500/[0.07] blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-earth-600/[0.05] blur-[100px] rounded-full" />
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-primary-600/[0.04] blur-[80px] rounded-full" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="font-bold text-xl text-white">ChamaFi</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-white/50 hover:text-white/90 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-white/50 hover:text-white/90 transition-colors">
                How It Works
              </a>
              <a href="#stats" className="text-sm text-white/50 hover:text-white/90 transition-colors">
                Stats
              </a>
            </nav>

            <Link
              to="/app"
              className="btn-primary inline-flex items-center gap-2 text-sm py-2.5"
            >
              <Rocket className="w-4 h-4" />
              Launch App
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
}
