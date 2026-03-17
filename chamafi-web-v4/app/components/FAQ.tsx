"use client";
import { useState } from "react";

const faqs = [
  {
    q: "What is ChamaFi?",
    a: "ChamaFi is a decentralized platform for running savings circles (called Chamas) on the Celo blockchain. It digitizes the traditional rotating savings groups popular across Africa, making them trustless and transparent.",
  },
  {
    q: "How are funds kept safe?",
    a: "All funds are held in audited smart contracts — no single person controls the pool. The contract enforces contribution rules and releases payouts automatically at the right time.",
  },
  {
    q: "Do I need crypto knowledge to use ChamaFi?",
    a: "Not at all. ChamaFi is designed to work seamlessly in Opera MiniPay, which handles all the wallet complexity. You just open the app and start saving — no seed phrases or gas token purchases needed.",
  },
  {
    q: "What currency do savings circles use?",
    a: "ChamaFi uses cUSD (Celo Dollar) and USDC — both stablecoins pegged to the US Dollar. Your savings don't lose value due to crypto volatility.",
  },
  {
    q: "What happens if a member misses a contribution?",
    a: "Circles can configure penalty rules on-chain. Defaulting members may be penalized or removed. The smart contract enforces these rules automatically, removing the need for trust between members.",
  },
  {
    q: "Is ChamaFi only for Africa?",
    a: "ChamaFi is built with Africa in mind but open to everyone. Rotating savings groups exist worldwide — in Latin America (tandas), Asia (hui), and the Caribbean (sou-sou). Anyone can use ChamaFi.",
  },
  {
    q: "What is the $CHAMA token?",
    a: "The $CHAMA governance token gives holders the ability to vote on protocol upgrades, fee parameters, and new features. It also distributes a portion of protocol fees to long-term holders.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" style={{ position: "relative", zIndex: 10, padding: "80px 24px" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{
            display: "inline-block",
            padding: "6px 16px",
            borderRadius: 100,
            background: "rgba(52,211,153,0.15)",
            border: "1px solid rgba(52,211,153,0.3)",
            fontSize: 12,
            fontWeight: 700,
            color: "#34d399",
            letterSpacing: "0.1em",
            marginBottom: 16,
          }}>FAQ</div>
          <h2 style={{
            fontSize: "clamp(32px,5vw,52px)",
            fontWeight: 900,
            letterSpacing: "-1px",
            marginBottom: 16,
            background: "linear-gradient(135deg, #fff, rgba(255,255,255,0.7))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>Got Questions?</h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", maxWidth: 400, margin: "0 auto", lineHeight: 1.6 }}>
            Everything you need to know about ChamaFi.
          </p>
        </div>

        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              borderRadius: 18,
              background: openIndex === i ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: `1px solid ${openIndex === i ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`,
              overflow: "hidden",
              transition: "all 0.3s ease",
            }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: "100%",
                  padding: "20px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  color: "white",
                }}
              >
                <span style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.4 }}>{faq.q}</span>
                <div style={{
                  width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                  background: openIndex === i ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.08)",
                  border: `1px solid ${openIndex === i ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.1)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16,
                  transition: "all 0.3s ease",
                  transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                }}>+</div>
              </button>
              {openIndex === i && (
                <div style={{ padding: "0 24px 20px" }}>
                  <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
