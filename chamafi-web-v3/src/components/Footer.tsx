'use client'

const LINKS = {
  Protocol: [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Tokenomics', href: '#tokenomics' },
    { label: 'FAQ', href: '#faq' },
  ],
  Developers: [
    { label: 'Smart Contracts', href: '#' },
    { label: 'Documentation', href: '#' },
    { label: 'GitHub', href: 'https://github.com/chamafi' },
    { label: 'Audit Reports', href: '#' },
  ],
  Community: [
    { label: 'Telegram', href: 'https://t.me/chamafi' },
    { label: 'X / Twitter', href: 'https://twitter.com/chamafi_app' },
    { label: 'Farcaster', href: 'https://warpcast.com/chamafi' },
    { label: 'Celo Forum', href: 'https://forum.celo.org' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-gray-900">
      {/* Top glow */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 border border-cyan-400 flex items-center justify-center">
                <span className="text-cyan-400 font-mono text-xs font-bold">CF</span>
              </div>
              <span className="text-white font-display text-lg tracking-widest">
                CHAMA<span className="neon-cyan">FI</span>
              </span>
            </div>
            <p className="font-mono text-xs text-gray-500 leading-relaxed mb-4">
              The future of Africa&apos;s savings circles.
              On-chain. Transparent. Earning yield.
            </p>
            {/* Celo badge */}
            <div className="flex items-center gap-2 border border-yellow-500/20 bg-yellow-500/5 px-3 py-1.5 w-fit">
              <div className="w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold text-xs">C</div>
              <span className="font-mono text-xs text-yellow-400">Powered by Celo</span>
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(LINKS).map(([group, links]) => (
            <div key={group}>
              <div className="font-mono text-xs text-cyan-400 tracking-widest mb-4 uppercase">
                // {group}
              </div>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="font-mono text-xs text-gray-500 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="text-gray-700 group-hover:text-cyan-500 transition-colors">›</span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs text-gray-600">
            © 2026 ChamaFi Protocol. Built on Celo. Audited. Open-source.
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-xs text-gray-600">ALL SYSTEMS NOMINAL</span>
            </div>
            <div className="font-mono text-xs text-gray-700">|</div>
            <span className="font-mono text-xs text-gray-600">v3.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
