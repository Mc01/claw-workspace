"use client";
import { useState, useEffect } from "react";

const links = [
  { label: "Problem",      href: "#problem" },
  { label: "Solution",     href: "#solution" },
  { label: "How It Works", href: "#howitworks" },
  { label: "Community",    href: "#community" },
  { label: "MiniPay",      href: "#minipay" },
  { label: "Tokenomics",   href: "#tokenomics" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-[#1a1008]/95 backdrop-blur-xl border-b border-yellow-900/30 py-3" : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[#1a1008] font-black text-lg shadow-lg group-hover:scale-105 transition-transform"
            style={{ background: "linear-gradient(135deg, #fbbf24, #ea580c)" }}>
            ◈
          </div>
          <span className="font-bold text-xl tracking-tight">
            <span className="text-yellow-400">Chama</span>
            <span className="text-orange-400">Fi</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href}
              className="text-sm text-[#f5e6c8]/70 hover:text-yellow-400 transition-colors font-medium">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a href="https://minipay.opera.com/" target="_blank" rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-bold rounded-lg text-[#1a1008] hover:opacity-90 transition-all shadow-lg"
            style={{ background: "linear-gradient(135deg, #fbbf24, #ea580c)" }}>
            Open in MiniPay
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-[#f5e6c8] p-2" aria-label="Toggle menu">
          <div className={`w-5 h-0.5 bg-current mb-1 transition-all ${open ? "rotate-45 translate-y-1.5" : ""}`} />
          <div className={`w-5 h-0.5 bg-current mb-1 transition-all ${open ? "opacity-0" : ""}`} />
          <div className={`w-5 h-0.5 bg-current transition-all ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#1a1008]/98 border-t border-yellow-900/20 px-4 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-[#f5e6c8]/80 hover:text-yellow-400 py-2 border-b border-yellow-900/10 font-medium">
              {l.label}
            </a>
          ))}
          <a href="https://minipay.opera.com/" target="_blank" rel="noopener noreferrer"
            className="mt-2 px-4 py-3 text-center font-bold rounded-lg text-[#1a1008]"
            style={{ background: "linear-gradient(135deg, #fbbf24, #ea580c)" }}>
            Open in MiniPay
          </a>
        </div>
      )}
    </nav>
  );
}
