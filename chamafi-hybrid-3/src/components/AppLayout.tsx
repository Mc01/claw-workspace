import { Link, Outlet, useLocation } from 'react-router-dom';
import { ConnectWallet } from './ConnectWallet';
import { Users, Compass, PlusCircle, Rocket, ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { path: '/app/discover', label: 'Discover', icon: Compass },
  { path: '/app/create', label: 'Create', icon: PlusCircle },
  { path: '/app/my-chamas', label: 'My Chamas', icon: Users },
];

// Landing page color palette
const colors = {
  soil: '#3D2B1F',
  clay: '#6B3A2A',
  sand: '#C4A47C',
  cream: '#F5ECD7',
  parchment: '#EFE4CC',
  forest: '#2D5016',
  leaf: '#4A8025',
  lime: '#7ABF42',
  mint: '#C4E86A',
  border: '#1A1A1A',
};

export function AppLayout() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/app/discover') {
      return location.pathname === '/app' || location.pathname === '/app/discover';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: colors.cream, fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
    >
      {/* Background ambient effects - earth tones */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute top-0 right-1/4 w-[500px] h-[400px] blur-[100px] rounded-full"
          style={{ backgroundColor: `${colors.sand}10` }}
        />
        <div 
          className="absolute bottom-1/4 left-0 w-[400px] h-[300px] blur-[80px] rounded-full"
          style={{ backgroundColor: `${colors.leaf}08` }}
        />
      </div>

      {/* Header - Dark navigation bar from landing */}
      <header 
        className="sticky top-0 z-50"
        style={{ 
          backgroundColor: colors.soil,
          borderBottom: `2px solid ${colors.border}` 
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo - Landing page SVG tree logo */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2.5">
                {/* Landing page logo SVG */}
                <svg 
                  viewBox="0 0 32 32" 
                  fill="none" 
                  className="w-7 h-7"
                  style={{ color: colors.mint }}
                >
                  <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
                  <path 
                    d="M16 26 L16 10 M16 10 L10 17 M16 10 L22 17 M16 18 L9 14 M16 18 L23 14" 
                    stroke="currentColor" 
                    strokeWidth="1.8" 
                    strokeLinecap="round"
                  />
                </svg>
                <span 
                  className="font-bold text-xl"
                  style={{ 
                    color: colors.cream,
                    fontFamily: "'Space Mono', monospace" 
                  }}
                >
                  ChamaFi
                </span>
              </Link>
              <Link
                to="/"
                className="hidden sm:flex items-center gap-1 text-xs transition-colors"
                style={{ color: `${colors.cream}40` }}
                onMouseEnter={(e) => e.currentTarget.style.color = `${colors.cream}60`}
                onMouseLeave={(e) => e.currentTarget.style.color = `${colors.cream}40`}
              >
                <ArrowLeft className="w-3 h-3" />
                Home
              </Link>
            </div>

            {/* Desktop Nav - Earth tone links */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                      active 
                        ? "shadow-sm" 
                        : "hover:text-white/80"
                    )}
                    style={{
                      color: active ? colors.mint : `${colors.cream}60`,
                      backgroundColor: active ? `${colors.leaf}20` : 'transparent',
                      border: active ? `2px solid ${colors.leaf}` : '2px solid transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.backgroundColor = `${colors.cream}10`;
                        e.currentTarget.style.color = colors.cream;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = `${colors.cream}60`;
                      }
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Wallet Button with landing page styling */}
            <ConnectWallet />
          </div>
        </div>

        {/* Mobile Nav - Bottom nav styling with earth tones */}
        <nav 
          className="md:hidden"
          style={{ 
            borderTop: `2px solid ${colors.border}`,
            backgroundColor: colors.soil
          }}
        >
          <div className="flex justify-around py-2 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 min-w-[64px]"
                  )}
                  style={{
                    color: active ? colors.mint : `${colors.cream}50`,
                    backgroundColor: active ? `${colors.leaf}15` : 'transparent',
                  }}
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
