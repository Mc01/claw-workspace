import { Link, Outlet, useLocation } from 'react-router-dom';
import { ConnectWallet } from './ConnectWallet';
import { Users, Compass, PlusCircle, Rocket, ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { path: '/app/discover', label: 'Discover', icon: Compass },
  { path: '/app/create', label: 'Create', icon: PlusCircle },
  { path: '/app/my-chamas', label: 'My Chamas', icon: Users },
];

export function AppLayout() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/app/discover') {
      return location.pathname === '/app' || location.pathname === '/app/discover';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-surface relative overflow-hidden">
      {/* Background ambient effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-primary-500/[0.04] blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[300px] bg-earth-600/[0.03] blur-[80px] rounded-full" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <span className="font-bold text-xl text-white">ChamaFi</span>
              </Link>
              <Link
                to="/"
                className="hidden sm:flex items-center gap-1 text-xs text-white/30 hover:text-white/50 transition-colors"
              >
                <ArrowLeft className="w-3 h-3" />
                Home
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive(item.path)
                        ? "bg-primary-500/15 text-primary-400 shadow-sm shadow-primary-500/10"
                        : "text-white/50 hover:bg-white/[0.06] hover:text-white/80"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <ConnectWallet />
          </div>
        </div>

        {/* Mobile Nav */}
        <nav className="md:hidden border-t border-white/[0.06]">
          <div className="flex justify-around py-2 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 min-w-[64px]",
                    isActive(item.path)
                      ? "text-primary-400 bg-primary-500/10"
                      : "text-white/40"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
