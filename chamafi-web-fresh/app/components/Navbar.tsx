"use client";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-violet-600 flex items-center justify-center font-bold text-white text-sm">C</div>
            <span className="text-white font-bold text-xl">ChamaFi</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#problem" className="text-slate-400 hover:text-white transition-colors text-sm">Problem</a>
            <a href="#solution" className="text-slate-400 hover:text-white transition-colors text-sm">Solution</a>
            <a href="#how-it-works" className="text-slate-400 hover:text-white transition-colors text-sm">How It Works</a>
            <a href="#waitlist" className="text-slate-400 hover:text-white transition-colors text-sm">Waitlist</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="px-4 py-2 rounded-lg border border-white/20 text-white text-sm hover:border-emerald-400/50 hover:text-emerald-400 transition-all">
              Connect Wallet
            </button>
            <a href="#waitlist" className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-violet-600 text-white text-sm font-medium hover:opacity-90 transition-opacity">
              Join Waitlist
            </a>
          </div>

          <button
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-slate-900/95 border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          <a href="#problem" className="text-slate-400 hover:text-white transition-colors text-sm" onClick={() => setMenuOpen(false)}>Problem</a>
          <a href="#solution" className="text-slate-400 hover:text-white transition-colors text-sm" onClick={() => setMenuOpen(false)}>Solution</a>
          <a href="#how-it-works" className="text-slate-400 hover:text-white transition-colors text-sm" onClick={() => setMenuOpen(false)}>How It Works</a>
          <a href="#waitlist" className="text-slate-400 hover:text-white transition-colors text-sm" onClick={() => setMenuOpen(false)}>Waitlist</a>
          <button className="px-4 py-2 rounded-lg border border-white/20 text-white text-sm hover:border-emerald-400/50 transition-all text-left">
            Connect Wallet
          </button>
        </div>
      )}
    </nav>
  );
}
