"use client";

export function MiniPaySection() {
  return (
    <section id="minipay" style={{ position: "relative", zIndex: 10, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "flex",
          gap: 48,
          alignItems: "center",
          flexWrap: "wrap",
          padding: "56px 48px",
          borderRadius: 32,
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 40px 120px rgba(124,58,237,0.15)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Background gradient */}
          <div style={{
            position: "absolute",
            width: 500,
            height: 500,
            top: -100,
            right: -100,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 65%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: 2,
            background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.8), rgba(236,72,153,0.8), transparent)",
          }} />

          {/* Left content */}
          <div style={{ flex: "1 1 400px" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 100,
              background: "rgba(236,72,153,0.15)",
              border: "1px solid rgba(236,72,153,0.3)",
              fontSize: 12,
              fontWeight: 700,
              color: "#f472b6",
              letterSpacing: "0.1em",
              marginBottom: 24,
            }}>MINIPAY INTEGRATION</div>

            <h2 style={{
              fontSize: "clamp(28px,4vw,42px)",
              fontWeight: 900,
              letterSpacing: "-1px",
              marginBottom: 20,
              lineHeight: 1.1,
            }}>
              <span style={{ color: "white" }}>Built for </span>
              <span style={{
                background: "linear-gradient(135deg, #f472b6, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>MiniPay</span>
            </h2>

            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 32 }}>
              ChamaFi is a first-class MiniPay MiniApp. Auto-connects your wallet the moment you open it — no setup, no seed phrases, no friction. Just tap and start saving with your community.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 36 }}>
              {[
                ["⚡", "Auto wallet detection", "window.ethereum.isMiniPay — instant connect"],
                ["🌐", "Celo-native transactions", "Pay gas in cUSD — no CELO needed"],
                ["📲", "Optimized mobile UI", "424px viewport, touch-optimized UX"],
              ].map(([icon, title, desc]) => (
                <div key={title as string} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                    background: "rgba(236,72,153,0.15)",
                    border: "1px solid rgba(236,72,153,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18,
                  }}>{icon}</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "white", marginBottom: 2 }}>{title}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://minipay.opera.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 28px",
                borderRadius: 12,
                background: "linear-gradient(135deg, #ec4899, #7c3aed)",
                color: "white",
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 700,
                boxShadow: "0 8px 30px rgba(236,72,153,0.35)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 14px 40px rgba(236,72,153,0.5)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 8px 30px rgba(236,72,153,0.35)"; }}
            >
              📱 Open in MiniPay
            </a>
          </div>

          {/* Right — Phone mockup */}
          <div style={{ flex: "1 1 280px", display: "flex", justifyContent: "center" }}>
            <div style={{
              width: 240,
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 36,
              padding: "16px 12px",
              boxShadow: "0 40px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
              position: "relative",
            }}>
              {/* Phone notch */}
              <div style={{
                width: 80, height: 6, borderRadius: 3,
                background: "rgba(255,255,255,0.15)",
                margin: "0 auto 16px",
              }} />

              {/* App screen content */}
              <div style={{ borderRadius: 24, overflow: "hidden", background: "#0a0118", padding: 16 }}>
                {/* App header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: "white" }}>ChamaFi</span>
                  <div style={{
                    padding: "3px 8px", borderRadius: 6,
                    background: "rgba(16,185,129,0.2)",
                    border: "1px solid rgba(16,185,129,0.3)",
                    fontSize: 10, color: "#10b981", fontWeight: 600,
                  }}>Connected</div>
                </div>
                {/* Balance */}
                <div style={{
                  padding: 16, borderRadius: 16, marginBottom: 12,
                  background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(236,72,153,0.2))",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>Total Saved</div>
                  <div style={{ fontSize: 26, fontWeight: 900, color: "white" }}>$847.50</div>
                  <div style={{ fontSize: 10, color: "#10b981", marginTop: 2 }}>↑ +$150 this round</div>
                </div>
                {/* Circle item */}
                {[{ name: "Nairobi DAO", amount: "$150", status: "✓" }, { name: "Mombasa 10", amount: "$200", status: "⏳" }].map(c => (
                  <div key={c.name} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "10px 12px", borderRadius: 12, marginBottom: 8,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: "white" }}>{c.name}</div>
                      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>Next: {c.amount}</div>
                    </div>
                    <span style={{ fontSize: 14 }}>{c.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
