"use client";

const tokenData = [
  { label: "Community Savings Pool", pct: 40, color: "#a78bfa", desc: "Locked in smart contracts, controlled by circle members" },
  { label: "Ecosystem Rewards", pct: 25, color: "#60a5fa", desc: "Distributed to active savers and circle creators" },
  { label: "Protocol Treasury", pct: 20, color: "#f472b6", desc: "Funds protocol development and audits" },
  { label: "Team & Advisors", pct: 10, color: "#fbbf24", desc: "4-year vesting, 1-year cliff" },
  { label: "Liquidity Reserve", pct: 5, color: "#34d399", desc: "DEX liquidity on Celo and Ubeswap" },
];

export function Tokenomics() {
  let cumulativePct = 0;

  return (
    <section id="tokenomics" style={{ position: "relative", zIndex: 10, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{
            display: "inline-block",
            padding: "6px 16px",
            borderRadius: 100,
            background: "rgba(251,191,36,0.15)",
            border: "1px solid rgba(251,191,36,0.3)",
            fontSize: 12,
            fontWeight: 700,
            color: "#fbbf24",
            letterSpacing: "0.1em",
            marginBottom: 16,
          }}>TOKENOMICS</div>
          <h2 style={{
            fontSize: "clamp(32px,5vw,52px)",
            fontWeight: 900,
            letterSpacing: "-1px",
            marginBottom: 16,
            background: "linear-gradient(135deg, #fff, rgba(255,255,255,0.7))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>$CHAMA Token</h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
            Governance, rewards, and community ownership — built into the protocol.
          </p>
        </div>

        <div style={{ display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap" }}>
          {/* Donut chart */}
          <div style={{ flex: "0 0 auto", display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: 280, height: 280 }}>
              <svg width="280" height="280" viewBox="0 0 280 280">
                <circle cx="140" cy="140" r="130" fill="rgba(255,255,255,0.03)" />
                {tokenData.map((segment, i) => {
                  const radius = 120;
                  const cx = 140, cy = 140;
                  const startAngle = (cumulativePct / 100) * 360 - 90;
                  cumulativePct += segment.pct;
                  const endAngle = (cumulativePct / 100) * 360 - 90;
                  const start = startAngle * Math.PI / 180;
                  const end = endAngle * Math.PI / 180;
                  const gap = 0.02;
                  const x1 = cx + radius * Math.cos(start + gap);
                  const y1 = cy + radius * Math.sin(start + gap);
                  const x2 = cx + radius * Math.cos(end - gap);
                  const y2 = cy + radius * Math.sin(end - gap);
                  const x3 = cx + 65 * Math.cos(end - gap);
                  const y3 = cy + 65 * Math.sin(end - gap);
                  const x4 = cx + 65 * Math.cos(start + gap);
                  const y4 = cy + 65 * Math.sin(start + gap);
                  const largeArc = segment.pct > 50 ? 1 : 0;
                  const d = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A 65 65 0 ${largeArc} 0 ${x4} ${y4} Z`;
                  return (
                    <path key={segment.label} d={d} fill={segment.color} opacity={0.85}>
                      <title>{segment.label}: {segment.pct}%</title>
                    </path>
                  );
                })}
                {/* Center */}
                <circle cx="140" cy="140" r="60" fill="rgba(10,1,24,0.9)" />
                <text x="140" y="133" textAnchor="middle" fill="white" fontSize="22" fontWeight="900" fontFamily="Inter, sans-serif">100M</text>
                <text x="140" y="153" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="11" fontFamily="Inter, sans-serif">$CHAMA</text>
              </svg>
            </div>
          </div>

          {/* Legend */}
          <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: 16 }}>
            {tokenData.map(segment => (
              <div key={segment.label} style={{
                display: "flex", gap: 16, alignItems: "center",
                padding: "16px 20px",
                borderRadius: 16,
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.07)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${segment.color}50`; el.style.background = `${segment.color}10`; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.07)"; el.style.background = "rgba(255,255,255,0.04)"; }}
              >
                <div style={{
                  width: 14, height: 14, borderRadius: 4, flexShrink: 0,
                  background: segment.color,
                  boxShadow: `0 0 8px ${segment.color}80`,
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "white" }}>{segment.label}</span>
                    <span style={{
                      fontSize: 16, fontWeight: 800,
                      background: `linear-gradient(135deg, ${segment.color}, white)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}>{segment.pct}%</span>
                  </div>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{segment.desc}</p>
                </div>
                {/* Bar */}
                <div style={{ width: 60, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
                  <div style={{ width: `${segment.pct * 2.5}%`, height: "100%", borderRadius: 3, background: segment.color, boxShadow: `0 0 6px ${segment.color}` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
