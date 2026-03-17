"use client";
import { useEffect, useRef } from "react";

export function Hero() {
  return (
    <section id="hero" style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      zIndex: 10,
      padding: "120px 24px 80px",
      textAlign: "center",
    }}>
      {/* Built on Celo badge */}
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 18px",
        borderRadius: 100,
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.12)",
        marginBottom: 32,
        boxShadow: "0 0 20px rgba(124,58,237,0.3)",
      }}>
        <span style={{ fontSize: 16 }}>🌱</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.9)", letterSpacing: "0.05em" }}>
          BUILT ON CELO
        </span>
        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: "#10b981",
          boxShadow: "0 0 8px #10b981",
          animation: "pulse-glow-green 2s ease-in-out infinite",
        }} />
      </div>

      {/* Headline */}
      <h1 style={{
        fontSize: "clamp(48px, 8vw, 96px)",
        fontWeight: 900,
        lineHeight: 1.05,
        letterSpacing: "-2px",
        maxWidth: 900,
        marginBottom: 24,
      }}>
        <span style={{
          background: "linear-gradient(135deg, #ffffff 0%, #e2d9f3 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          Savings Circles,
        </span>
        <br />
        <span style={{
          background: "linear-gradient(135deg, #a78bfa, #60a5fa, #f472b6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          Reimagined
        </span>
      </h1>

      {/* Subheadline */}
      <p style={{
        fontSize: "clamp(18px, 2.5vw, 22px)",
        color: "rgba(255,255,255,0.65)",
        maxWidth: 640,
        lineHeight: 1.65,
        marginBottom: 48,
        fontWeight: 400,
      }}>
        ChamaFi brings traditional African savings circles on-chain. Transparent, trustless, and accessible to everyone — powered by Celo and MiniPay.
      </p>

      {/* CTA Buttons */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginBottom: 80 }}>
        <a
          href="https://minipay.opera.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "16px 36px",
            borderRadius: 14,
            background: "linear-gradient(135deg, #7c3aed, #2563eb)",
            color: "white",
            textDecoration: "none",
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "-0.2px",
            boxShadow: "0 8px 30px rgba(124,58,237,0.4)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-3px)"; el.style.boxShadow = "0 16px 50px rgba(124,58,237,0.6)"; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 8px 30px rgba(124,58,237,0.4)"; }}
        >
          <span>🚀</span> Open in MiniPay
        </a>
        <a
          href="#features"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "16px 36px",
            borderRadius: 14,
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "white",
            textDecoration: "none",
            fontSize: 16,
            fontWeight: 600,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.12)"; el.style.transform = "translateY(-3px)"; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.07)"; el.style.transform = "translateY(0)"; }}
        >
          Learn More →
        </a>
      </div>

      {/* Hero glass card / mockup */}
      <div style={{
        maxWidth: 720,
        width: "100%",
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 28,
        padding: 32,
        boxShadow: "0 40px 120px rgba(124,58,237,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Top shimmer line */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.6), rgba(236,72,153,0.6), transparent)",
        }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 4, fontWeight: 500, letterSpacing: "0.05em" }}>ACTIVE CIRCLE</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "white" }}>Nairobi Builders DAO</div>
          </div>
          <div style={{
            padding: "6px 14px",
            borderRadius: 100,
            background: "rgba(16,185,129,0.15)",
            border: "1px solid rgba(16,185,129,0.3)",
            fontSize: 13,
            fontWeight: 600,
            color: "#10b981",
          }}>● Active</div>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Round 3 of 10</span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>cUSD 3,000 / 10,000</span>
          </div>
          <div style={{ height: 8, borderRadius: 4, background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: "30%",
              borderRadius: 4,
              background: "linear-gradient(90deg, #7c3aed, #2563eb, #06b6d4)",
              boxShadow: "0 0 12px rgba(124,58,237,0.5)",
            }} />
          </div>
        </div>

        {/* Member avatars */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex" }}>
            {["🧑🏾","👩🏿","👨🏻","👩🏾","👨🏿"].map((emoji, i) => (
              <div key={i} style={{
                width: 36, height: 36, borderRadius: "50%",
                background: `rgba(${[124,58,237,16,185,236][i % 3] + i * 10},${[58,237,185,72,153][i % 5]},${[237,100,129,153,200][i % 5]},0.3)`,
                border: "2px solid rgba(255,255,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16,
                marginLeft: i > 0 ? -10 : 0,
                zIndex: 5 - i,
              }}>{emoji}</div>
            ))}
          </div>
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.55)" }}>10 members · Next payout in 3 days</span>
          <div style={{ marginLeft: "auto", fontSize: 24, fontWeight: 800, color: "white" }}>
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", fontWeight: 400 }}>cUSD </span>
            1,000
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>SCROLL</span>
        <div style={{
          width: 24, height: 38, borderRadius: 12,
          border: "1.5px solid rgba(255,255,255,0.2)",
          display: "flex", alignItems: "flex-start", justifyContent: "center",
          padding: "6px 0",
        }}>
          <div style={{
            width: 4, height: 10, borderRadius: 2,
            background: "rgba(255,255,255,0.5)",
            animation: "scroll-dot 1.5s ease-in-out infinite",
          }} />
        </div>
      </div>

      <style>{`
        @keyframes pulse-glow-green {
          0%,100% { box-shadow: 0 0 8px #10b981; }
          50% { box-shadow: 0 0 16px #10b981; }
        }
        @keyframes scroll-dot {
          0%,100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
