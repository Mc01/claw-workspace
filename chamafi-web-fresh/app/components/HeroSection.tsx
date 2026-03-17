export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-400/5 blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-400 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Built on Celo · Powered by Community
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          Savings Circles{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #8b5cf6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            On-Chain
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-slate-400 max-w-3xl mx-auto mb-4 leading-relaxed">
          ChamaFi brings traditional rotating savings groups (Chamas) to the blockchain — transparent, trustless, and accessible to everyone.
        </p>

        <p className="text-slate-500 max-w-2xl mx-auto mb-12 text-lg">
          Pool funds with friends and family. Earn yield. Build wealth together. No banks required.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#waitlist"
            className="px-8 py-4 rounded-xl text-white font-semibold text-lg hover:opacity-90 transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/25"
            style={{ background: "linear-gradient(135deg, #10b981 0%, #8b5cf6 100%)" }}
          >
            Join the Waitlist
          </a>
          <a
            href="#how-it-works"
            className="px-8 py-4 rounded-xl text-white font-semibold text-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
          >
            How It Works →
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {[
            { value: "$2.4B+", label: "Chama Market Size" },
            { value: "0%", label: "Platform Fees" },
            { value: "100%", label: "Transparent" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-3xl font-bold mb-1"
                style={{
                  background: "linear-gradient(135deg, #10b981 0%, #8b5cf6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </div>
              <div className="text-slate-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
