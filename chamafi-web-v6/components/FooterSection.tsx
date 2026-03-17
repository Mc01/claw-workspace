'use client';

export default function FooterSection() {
  return (
    <footer
      className="py-10 px-5"
      style={{ borderTop: '1px solid rgba(53,208,127,0.1)' }}
    >
      <div className="max-w-sm mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-black"
            style={{ background: 'linear-gradient(135deg, #35D07F, #2ab56a)', color: '#0a0f0d' }}
          >
            C
          </div>
          <span className="font-bold text-xl" style={{ color: '#f0faf4' }}>
            Chama<span style={{ color: '#35D07F' }}>Fi</span>
          </span>
        </div>

        <p className="text-sm leading-relaxed mb-6" style={{ color: '#8fb89a', maxWidth: '280px' }}>
          Bringing traditional African savings groups on-chain. Trustless, transparent, and built for MiniPay.
        </p>

        {/* Links */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-8">
          {[
            { label: 'Open App', href: 'https://chamafi.app' },
            { label: 'Get MiniPay', href: 'https://minipay.opera.com' },
            { label: 'Twitter / X', href: 'https://twitter.com/chamafi_app' },
            { label: 'GitHub', href: 'https://github.com/chamafi' },
            { label: 'Celo Docs', href: 'https://docs.celo.org' },
            { label: 'Privacy Policy', href: '/privacy' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="text-sm font-medium transition-colors"
              style={{ color: '#8fb89a' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#35D07F')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#8fb89a')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Chain badges */}
        <div className="flex gap-2 flex-wrap mb-6">
          {['Celo Mainnet', 'cUSD', 'MiniPay', 'Open Source'].map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full"
              style={{
                background: 'rgba(53,208,127,0.08)',
                border: '1px solid rgba(53,208,127,0.15)',
                color: '#8fb89a',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom */}
        <div
          className="text-xs flex flex-col gap-1"
          style={{ color: 'rgba(143,184,154,0.5)' }}
        >
          <span>© 2025 ChamaFi. Built on Celo.</span>
          <span>This is experimental software. Use at your own risk.</span>
        </div>
      </div>
    </footer>
  );
}
