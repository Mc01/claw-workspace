"use client";

const steps = [
  {
    number: "01",
    icon: "👥",
    title: "Create or Join a Circle",
    desc: "Start a new savings circle or join an existing one using a unique invite link. Set the contribution amount, frequency, and payout order.",
    color: "#a78bfa",
  },
  {
    number: "02",
    icon: "💰",
    title: "Contribute Every Round",
    desc: "Each member contributes their share in cUSD. Smart contracts hold funds securely — no one person controls the pool.",
    color: "#60a5fa",
  },
  {
    number: "03",
    icon: "🎯",
    title: "Receive Your Payout",
    desc: "When your turn arrives, the full pot is automatically sent to your wallet. Trustless, instant, and on-chain.",
    color: "#f472b6",
  },
  {
    number: "04",
    icon: "🔄",
    title: "Complete the Cycle",
    desc: "The cycle repeats until every member has received their payout. The contract verifies completion and closes gracefully.",
    color: "#34d399",
  },
];

export function HowItWorks() {
  return (
    <section id="howitworks" style={{ position: "relative", zIndex: 10, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{
            display: "inline-block",
            padding: "6px 16px",
            borderRadius: 100,
            background: "rgba(96,165,250,0.15)",
            border: "1px solid rgba(96,165,250,0.3)",
            fontSize: 12,
            fontWeight: 700,
            color: "#60a5fa",
            letterSpacing: "0.1em",
            marginBottom: 16,
          }}>HOW IT WORKS</div>
          <h2 style={{
            fontSize: "clamp(32px,5vw,52px)",
            fontWeight: 900,
            letterSpacing: "-1px",
            marginBottom: 16,
            background: "linear-gradient(135deg, #fff, rgba(255,255,255,0.7))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>Simple by Design</h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
            Four steps from zero to receiving your savings payout.
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {steps.map((step, i) => (
            <div key={step.number} style={{ position: "relative" }}>
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div style={{
                  position: "absolute",
                  top: 28,
                  right: -12,
                  width: 24,
                  height: 2,
                  background: `linear-gradient(90deg, ${step.color}60, ${steps[i+1].color}60)`,
                  zIndex: 1,
                  display: "block",
                }} className="step-connector" />
              )}
              <div style={{
                padding: "32px 28px",
                borderRadius: 24,
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "all 0.3s ease",
                height: "100%",
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.borderColor = `${step.color}40`; el.style.boxShadow = `0 20px 50px ${step.color}20`; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.borderColor = "rgba(255,255,255,0.08)"; el.style.boxShadow = "none"; }}
              >
                {/* Number */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 12, marginBottom: 20,
                }}>
                  <span style={{
                    fontSize: 40, fontWeight: 900,
                    background: `linear-gradient(135deg, ${step.color}, ${step.color}60)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1,
                    fontVariantNumeric: "tabular-nums",
                  }}>{step.number}</span>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: `${step.color}20`,
                    border: `1px solid ${step.color}40`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22,
                  }}>{step.icon}</div>
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 700, color: "white", marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
