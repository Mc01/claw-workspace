'use client';

export default function MiniPaySection() {
  return (
    <section id="get-minipay" className="py-14 px-5">
      <div className="max-w-sm mx-auto">
        {/* Card */}
        <div
          className="rounded-3xl p-6 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1a2820 0%, #111a14 100%)',
            border: '1px solid rgba(255,107,53,0.2)',
            boxShadow: '0 0 60px rgba(255,107,53,0.08)',
          }}
        >
          {/* Decorative blob */}
          <div
            className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255,107,53,0.12) 0%, transparent 70%)',
              filter: 'blur(30px)',
              transform: 'translate(30%, -30%)',
            }}
          />

          <div className="relative z-10">
            {/* MiniPay logo area */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                style={{ background: 'rgba(255,107,53,0.15)', border: '1px solid rgba(255,107,53,0.25)' }}
              >
                📱
              </div>
              <div>
                <div className="font-bold text-lg" style={{ color: '#f0faf4' }}>Opera MiniPay</div>
                <div className="text-sm" style={{ color: '#FF6B35' }}>Free Download</div>
              </div>
            </div>

            <h2 className="text-2xl font-black mb-3" style={{ color: '#f0faf4', lineHeight: 1.2 }}>
              Get MiniPay to{' '}
              <span className="text-gradient-orange">Start Saving</span>
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#8fb89a' }}>
              MiniPay is Opera's lightweight crypto wallet built for Africa. Available on Android — free to download, instant setup with just your phone number.
            </p>

            {/* Feature list */}
            <div className="flex flex-col gap-3 mb-6">
              {[
                { icon: '✅', text: 'No seed phrase required' },
                { icon: '✅', text: 'Uses your mobile number' },
                { icon: '✅', text: 'cUSD built-in stablecoin' },
                { icon: '✅', text: 'Works on 2G/3G networks' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm" style={{ color: '#f0faf4' }}>
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Download buttons */}
            <div className="flex flex-col gap-3">
              <a
                href="https://minipay.opera.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #FF6B35, #e55a25)',
                  fontSize: '16px',
                }}
              >
                <span>⬇️</span>
                Download MiniPay
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.opera.mini.native"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ width: '100%', borderColor: 'rgba(255,107,53,0.35)', fontSize: '14px' }}
              >
                <span>▶</span>
                Google Play Store
              </a>
            </div>

            {/* Trust note */}
            <div
              className="mt-4 text-center text-xs"
              style={{ color: '#8fb89a' }}
            >
              By Opera · 50M+ downloads · Celo-powered
            </div>
          </div>
        </div>

        {/* Already have MiniPay CTA */}
        <div className="mt-6 text-center">
          <p className="text-sm mb-3" style={{ color: '#8fb89a' }}>Already have MiniPay?</p>
          <a
            href="https://chamafi.app"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta pulse-green"
            style={{ width: '100%' }}
          >
            <span>🚀</span>
            Open ChamaFi Now
          </a>
        </div>
      </div>
    </section>
  );
}
