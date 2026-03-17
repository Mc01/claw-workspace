"use client";

export function Footer() {
  const year = new Date().getFullYear();

  const links = {
    Product: ["Features", "How It Works", "Tokenomics", "Roadmap"],
    Community: ["Discord", "Telegram", "Twitter / X", "Blog"],
    Developers: ["GitHub", "Smart Contracts", "API Docs", "Audit Report"],
    Legal: ["Privacy Policy", "Terms of Service", "Disclaimer"],
  };

  return (
    <footer style={{ position: "relative", zIndex: 10, padding: "80px 24px 40px" }}>
      {/* Divider */}
      <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(124,58,237,0.5),rgba(236,72,153,0.5),transparent)", marginBottom: 64, maxWidth: 1100, margin: "0 auto 64px" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Top */}
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap", marginBottom: 64 }}>
          {/* Brand */}
          <div style={{ flex: "1 1 280px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, fontWeight: 900, color: "white",
              }}>C</div>
              <span style={{ fontSize: 22, fontWeight: 800, color: "white" }}>
                Chama<span style={{ background: "linear-gradient(135deg,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Fi</span>
              </span>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: 260, marginBottom: 24 }}>
              Bringing community savings circles on-chain. Transparent, trustless, and built for Africa.
            </p>
            {/* Celo badge */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 14px",
              borderRadius: 10,
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.25)",
            }}>
              <span style={{ fontSize: 14 }}>🌱</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#34d399" }}>Built on Celo</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category} style={{ flex: "1 1 120px" }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", marginBottom: 20 }}>
                {category.toUpperCase()}
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {items.map(item => (
                  <a key={item} href="#"
                    style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                  >{item}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
          paddingTop: 24,
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.35)" }}>
            © {year} ChamaFi Protocol. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>Celo Mainnet</span>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>v4.0</span>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
            <span style={{ fontSize: 13, color: "#10b981" }}>● Live</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
