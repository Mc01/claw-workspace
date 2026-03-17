export default function Home() {
  return (
    <main style={{ fontFamily: "'Courier New', Courier, monospace" }}>

      {/* NAV */}
      <nav style={{
        borderBottom: "2px solid #000",
        padding: "16px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        background: "#fff",
        zIndex: 100,
      }}>
        <span style={{ fontWeight: 900, fontSize: "20px", letterSpacing: "-1px" }}>
          CHAMAFI
        </span>
        <a
          href="#launch"
          style={{
            border: "2px solid #000",
            padding: "6px 16px",
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          LAUNCH APP
        </a>
      </nav>

      {/* HERO */}
      <section style={{
        borderBottom: "2px solid #000",
        padding: "80px 32px 64px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}>
        <div style={{
          fontSize: "clamp(64px, 14vw, 160px)",
          fontWeight: 900,
          lineHeight: 0.9,
          letterSpacing: "-4px",
          marginBottom: "40px",
        }}>
          CHAMA<br />FI.
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "32px",
          alignItems: "end",
        }}>
          <p style={{
            fontSize: "18px",
            lineHeight: 1.5,
            maxWidth: "480px",
            borderLeft: "4px solid #000",
            paddingLeft: "20px",
          }}>
            Trustless group savings on Celo.<br />
            No bank. No middleman. No trust required.<br />
            Just code.
          </p>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "13px", letterSpacing: "1px", marginBottom: "4px", textTransform: "uppercase" }}>
              Built on
            </p>
            <p style={{ fontSize: "28px", fontWeight: 900, letterSpacing: "-1px" }}>
              CELO BLOCKCHAIN
            </p>
          </div>
        </div>

        <div style={{ marginTop: "48px", display: "flex", gap: "0" }}>
          <a
            href="#launch"
            style={{
              background: "#000",
              color: "#fff",
              padding: "16px 40px",
              fontSize: "15px",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              border: "2px solid #000",
              cursor: "pointer",
              display: "inline-block",
            }}
          >
            START A CHAMA →
          </a>
          <a
            href="#how"
            style={{
              background: "#fff",
              color: "#000",
              padding: "16px 40px",
              fontSize: "15px",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              border: "2px solid #000",
              borderLeft: "none",
              cursor: "pointer",
              display: "inline-block",
            }}
          >
            HOW IT WORKS
          </a>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{
        borderBottom: "2px solid #000",
        background: "#000",
        color: "#fff",
        padding: "20px 32px",
      }}>
        <div style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          textAlign: "center",
          gap: "32px",
        }}>
          {[
            { n: "$0", label: "BANK FEES" },
            { n: "100%", label: "ON-CHAIN" },
            { n: "∞", label: "PERMISSIONLESS" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: "36px", fontWeight: 900, letterSpacing: "-2px" }}>{s.n}</div>
              <div style={{ fontSize: "11px", letterSpacing: "3px", marginTop: "4px", opacity: 0.7 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="how" style={{
        borderBottom: "2px solid #000",
        padding: "64px 32px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}>
        <h2 style={{
          fontSize: "11px",
          letterSpacing: "4px",
          textTransform: "uppercase",
          marginBottom: "40px",
          paddingBottom: "12px",
          borderBottom: "2px solid #000",
        }}>
          FEATURES
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0",
        }}>
          {[
            {
              num: "01",
              title: "POOL FUNDS",
              body: "Members contribute cUSD each cycle. All money lives in a smart contract — not a wallet, not a bank.",
            },
            {
              num: "02",
              title: "ROTATE PAYOUTS",
              body: "Each round, one member receives the full pool. Order is set at creation. No favourites, no politics.",
            },
            {
              num: "03",
              title: "ENFORCE RULES",
              body: "Miss a payment? The contract knows. Automatic penalties, automatic exclusion. Code is judge.",
            },
            {
              num: "04",
              title: "TRANSPARENT",
              body: "Every deposit, withdrawal, and penalty is on-chain. Anyone can verify. Nothing is hidden.",
            },
            {
              num: "05",
              title: "MINIPAY NATIVE",
              body: "Works inside Opera MiniPay. cUSD stablecoin. No gas confusion. Built for real people.",
            },
            {
              num: "06",
              title: "FARCASTER APP",
              body: "Run your chama inside Farcaster. Share progress with your community. Social by default.",
            },
          ].map((f, i) => (
            <div
              key={f.num}
              style={{
                padding: "32px",
                border: "2px solid #000",
                marginTop: i >= 3 ? "-2px" : "0",
                marginLeft: i % 3 !== 0 ? "-2px" : "0",
              }}
            >
              <div style={{
                fontSize: "11px",
                letterSpacing: "3px",
                marginBottom: "16px",
                opacity: 0.4,
              }}>
                {f.num}
              </div>
              <div style={{
                fontSize: "18px",
                fontWeight: 900,
                letterSpacing: "-0.5px",
                marginBottom: "12px",
              }}>
                {f.title}
              </div>
              <div style={{
                fontSize: "14px",
                lineHeight: 1.6,
                opacity: 0.75,
              }}>
                {f.body}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{
        borderBottom: "2px solid #000",
        padding: "64px 32px",
        background: "#f8f8f8",
        maxWidth: "none",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "11px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: "40px",
            paddingBottom: "12px",
            borderBottom: "2px solid #000",
          }}>
            PROTOCOL
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0",
          }}>
            {[
              { step: "I", action: "CREATE", detail: "Set group size, contribution amount, cycle length." },
              { step: "II", action: "JOIN", detail: "Members join and lock in their spot." },
              { step: "III", action: "CYCLE", detail: "Each period: all deposit → one member receives." },
              { step: "IV", action: "CLOSE", detail: "Last cycle completes. Contract closes. Done." },
            ].map((s, i) => (
              <div
                key={s.step}
                style={{
                  padding: "32px 24px",
                  border: "2px solid #000",
                  marginLeft: i !== 0 ? "-2px" : "0",
                }}
              >
                <div style={{
                  fontSize: "48px",
                  fontWeight: 900,
                  lineHeight: 1,
                  marginBottom: "16px",
                  opacity: 0.12,
                }}>
                  {s.step}
                </div>
                <div style={{
                  fontSize: "16px",
                  fontWeight: 900,
                  letterSpacing: "1px",
                  marginBottom: "8px",
                }}>
                  {s.action}
                </div>
                <div style={{ fontSize: "13px", lineHeight: 1.6, opacity: 0.7 }}>
                  {s.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="launch" style={{
        borderBottom: "2px solid #000",
        padding: "80px 32px",
        maxWidth: "1100px",
        margin: "0 auto",
        textAlign: "center",
      }}>
        <div style={{
          fontSize: "clamp(40px, 8vw, 96px)",
          fontWeight: 900,
          lineHeight: 0.9,
          letterSpacing: "-3px",
          marginBottom: "32px",
        }}>
          READY<br />TO SAVE?
        </div>
        <p style={{
          fontSize: "16px",
          marginBottom: "40px",
          opacity: 0.6,
          maxWidth: "480px",
          margin: "0 auto 40px",
        }}>
          No signup. No KYC. No permission.<br />
          Connect your wallet. Start a chama.
        </p>
        <div style={{ display: "flex", gap: "0", justifyContent: "center" }}>
          <a
            href="https://chamafi.app"
            style={{
              background: "#000",
              color: "#fff",
              padding: "20px 56px",
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              border: "2px solid #000",
              cursor: "pointer",
              display: "inline-block",
            }}
          >
            LAUNCH APP →
          </a>
        </div>
        <div style={{
          marginTop: "48px",
          display: "flex",
          gap: "40px",
          justifyContent: "center",
          fontSize: "12px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          opacity: 0.5,
        }}>
          <a href="https://github.com/chamafi" style={{ borderBottom: "1px solid currentColor" }}>GITHUB</a>
          <a href="https://warpcast.com/chamafi" style={{ borderBottom: "1px solid currentColor" }}>FARCASTER</a>
          <a href="https://twitter.com/chamafi" style={{ borderBottom: "1px solid currentColor" }}>TWITTER</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "24px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "12px",
        letterSpacing: "1px",
        textTransform: "uppercase",
        opacity: 0.5,
        maxWidth: "1100px",
        margin: "0 auto",
      }}>
        <span>© 2026 CHAMAFI</span>
        <span>BUILT ON CELO</span>
      </footer>
    </main>
  );
}
