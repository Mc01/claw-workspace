import { Link, Outlet, useLocation } from 'react-router-dom';
import { ConnectWallet } from './ConnectWallet';
import { Users, Compass, PlusCircle, ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

const navItems = [
  { path: '/app/discover', label: 'Discover', icon: Compass },
  { path: '/app/create', label: 'Create', icon: PlusCircle },
  { path: '/app/my-chamas', label: 'My Chamas', icon: Users },
];

const pageVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] } },
  exit:    { opacity: 0, y: -8,  transition: { duration: 0.2,  ease: 'easeIn' } },
};

export function AppLayout() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [mobileNavVisible, setMobileNavVisible] = useState(false);

  // Scroll effect: blur + shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Logo animation on load
  useEffect(() => {
    const t = setTimeout(() => setLogoVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Mobile bottom nav slide-up animation on mount
  useEffect(() => {
    const t = setTimeout(() => setMobileNavVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

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
        <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-forest/[0.08] blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[300px] bg-clay/[0.05] blur-[100px] rounded-full" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-lime/[0.03] blur-[100px] rounded-full" />
      </div>

      {/* Header — scroll-aware blur + shadow */}
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-surface/80 backdrop-blur-xl border-b border-sand/15 shadow-[0_4px_24px_rgba(0,0,0,0.35)]'
            : 'bg-transparent border-b border-sand/5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo — animate in on load */}
            <div
              className={cn(
                'flex items-center gap-4 transition-all duration-500 ease-out',
                logoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
              )}
            >
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 bg-gradient-to-br from-lime to-forest rounded-xl flex items-center justify-center shadow-lg shadow-lime/20 group-hover:shadow-lime/40 transition-all duration-300 group-hover:scale-105 group-hover:-rotate-3">
                  <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
                    <circle cx="16" cy="16" r="14" stroke="#050c08" strokeWidth="2" />
                    <path d="M16 26 L16 10 M16 10 L10 17 M16 10 L22 17 M16 18 L9 14 M16 18 L23 14" stroke="#050c08" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="font-bold text-xl text-cream tracking-tight group-hover:text-mint transition-colors duration-200">
                  ChamaFi
                </span>
              </Link>
              <Link
                to="/"
                className="hidden sm:flex items-center gap-1 text-xs text-sand/50 hover:text-sand transition-colors duration-200"
              >
                <ArrowLeft className="w-3 h-3" />
                Home
              </Link>
            </div>

            {/* Desktop Nav — with animated underline active indicator */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item, i) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
                  >
                    <Link
                      to={item.path}
                      className={cn(
                        'relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium',
                        'transition-all duration-200',
                        active
                          ? 'text-mint'
                          : 'text-sand/70 hover:text-sand hover:bg-white/[0.04]'
                      )}
                    >
                      {/* Active background glow pill */}
                      {active && (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 rounded-xl bg-lime/[0.10] border border-mint/20 shadow-[0_0_20px_rgba(196,232,106,0.12)] pointer-events-none"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}

                      <Icon className="relative w-4 h-4 flex-shrink-0" />
                      <span className="relative">{item.label}</span>

                      {/* Animated underline */}
                      <span
                        className={cn(
                          'absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full',
                          'bg-gradient-to-r from-lime to-mint',
                          'transition-all duration-300 ease-out origin-center',
                          active ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                        )}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <ConnectWallet />
          </div>
        </div>
      </header>

      {/* Main Content — AnimatePresence for smooth route transitions */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Nav — fixed floating pill, slides up on mount */}
      <nav
        aria-label="Mobile navigation"
        className={cn(
          'md:hidden fixed bottom-0 inset-x-0 z-50',
          'transition-all duration-500 ease-out',
          mobileNavVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        )}
      >
        <div
          className={cn(
            'mx-3 mb-3 rounded-2xl overflow-hidden',
            'bg-surface/85 backdrop-blur-2xl',
            'border border-sand/15',
            'shadow-[0_-4px_32px_rgba(0,0,0,0.45),0_0_0_1px_rgba(196,164,124,0.06)_inset]',
            'transition-shadow duration-300',
            scrolled && 'shadow-[0_-4px_40px_rgba(0,0,0,0.6),0_0_0_1px_rgba(196,164,124,0.08)_inset]'
          )}
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
                    'relative flex flex-col items-center gap-1 px-4 py-2.5 rounded-xl',
                    'text-xs font-semibold min-w-[72px]',
                    'transition-all duration-200 active:scale-95 select-none',
                    active ? 'text-mint' : 'text-sand/50 hover:text-sand/80'
                  )}
                >
                  {/* Active background */}
                  {active && (
                    <span className="absolute inset-0 rounded-xl bg-lime/[0.12] pointer-events-none" />
                  )}

                  {/* Icon */}
                  <span
                    className={cn(
                      'relative transition-all duration-200',
                      active && 'drop-shadow-[0_0_8px_rgba(196,232,106,0.5)]'
                    )}
                  >
                    <Icon className={cn('w-5 h-5 transition-transform duration-200', active && 'scale-110')} />
                  </span>

                  <span className="relative">{item.label}</span>

                  {/* Active dot */}
                  <span
                    className={cn(
                      'absolute bottom-1 left-1/2 -translate-x-1/2',
                      'w-1 h-1 rounded-full bg-mint',
                      'transition-all duration-300',
                      active ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    )}
                  />
                </Link>
              );
            })}
          </div>

          {/* iOS safe area */}
          <div style={{ height: 'env(safe-area-inset-bottom, 0px)' }} />
        </div>
      </nav>

      {/* Bottom spacer on mobile to clear floating nav */}
      <div className="h-24 md:hidden" aria-hidden="true" />
    </div>
  );
}
