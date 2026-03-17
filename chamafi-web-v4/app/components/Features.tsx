"use client";

const features = [
  {
    icon: "🔒",
    title: "Trustless Smart Contracts",
    desc: "Funds locked in audited Solidity contracts on Celo. No middlemen, no fraud — code enforces every rule automatically.",
    color: "#a78bfa",
    gradient: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(124,58,237,0.03))",
  },
  {
    icon: "💱",
    title: "cUSD & USDC Native",
    desc: "Save and receive in stablecoins. Zero volatility risk — your money holds its value while you save together.",
    color: "#60a5fa",
    gradient: "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(37,99,235,0.03))",
  },
  {
    icon: "📱",
    title: "MiniPay Ready",
    desc: "Open directly in Opera MiniPay — no wallet setup needed. One tap to join a circle and start saving.",
    color: "#f472b6",
    gradient: "linear-gradient(135deg, rgba(236,72,153,0.15), rgba(236,72,153,0.03))",
  },
  {
    icon: "🗳️",
    title: "On-Chain Governance",
    desc: "Every circle member has a vote. Propose changes, vote on rules, and manage the group — all on-chain.",
    color: "#34d399",
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.03))",
  },
  {
    icon: "⚡",
    title: "Near-Zero Fees",
    desc: "Celo's fee abstraction lets you pay gas in cUSD. Transactions cost fractions of a cent — perfect for micro-savings.",
    color: "#fbbf24",
    gradient: "linear-gradient(135deg, rgba(251,191,36,0.15), rgba(251,191,36,0.03))",
  },
  {
    icon: "🌍",
    title: "Mobile-First, Africa-First",
    desc: "Designed for low-bandwidth, smartphone users across Africa. Optimized UI for MiniPay's 424px viewport.",
    color: "#06b6d4",
    gradient: "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(6,182,212,0.03))",
  },
];

export function Features() {
  return (
    <section id="features" style={{ position: "relative", zIndex: 10, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{
            display: "inline-block",
            padding: "6px 16px",
            borderRadius: 100,
            background: "rgba(124,58,237,0.15)",
            border: "1px solid rgba(124,58,237,0.3)",
            fontSize: 12,
            fontWeight: 700,
            color: "#a78bfa",
            letterSpacing: "0.1em",
            marginBottom: 16,
          }}>FEATURES</div>
          <h2 style={{
            fontSize: "clamp(32px,5vw,52px)",
            fontWeight: 900,
            letterSpacing: "-1px",
            marginBottom: 16,
            background: "linear-gradient(135deg, #fff, rgba(255,255,255,0.7))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>Everything You Need</h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
            Built for communities. Designed for trust. Powered by Celo.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
          {features.map((f, i) => (
            <div key={f.title} style={{
              padding: "32px",
              borderRadius: 24,
              background: f.gradient,
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
              border: "1px solid rgba(255,255,255,0.08)",
              transition: "all 0.3s ease",
              cursor: "default",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.borderColor = `${f.color}40`; el.style.boxShadow = `0 20px 60px ${f.color}20`; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.borderColor = "rgba(255,255,255,0.08)"; el.style.boxShadow = "none"; }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: `${f.color}20`,
                border: `1px solid ${f.color}40`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28,
                marginBottom: 20,
              }}>{f.icon}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "white", marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
