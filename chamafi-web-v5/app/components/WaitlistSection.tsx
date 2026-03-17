"use client";
import { useState } from "react";

export default function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));

    // In production, replace with actual API endpoint
    setStatus("success");
    setMessage("You're on the list! We'll reach out when ChamaFi launches.");
    setEmail("");
  };

  return (
    <section id="waitlist" className="py-24 bg-slate-800/30 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-violet-600/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-emerald-400 text-sm font-medium uppercase tracking-widest">Early Access</span>

        <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-white mb-4">
          Be first to{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #8b5cf6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            save together
          </span>
        </h2>

        <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
          Join the waitlist and get early access to ChamaFi. We&apos;re onboarding founding chamas with white-glove support.
        </p>

        {status === "success" ? (
          <div
            className="rounded-2xl p-8"
            style={{
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
            }}
          >
            <div className="text-4xl mb-4">🎉</div>
            <p className="text-emerald-400 font-semibold text-lg">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-5 py-4 rounded-xl text-white placeholder-slate-500 outline-none focus:ring-2 transition-all text-sm"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-4 rounded-xl text-white font-semibold text-sm disabled:opacity-60 hover:opacity-90 transition-all whitespace-nowrap"
              style={{ background: "linear-gradient(135deg, #10b981 0%, #8b5cf6 100%)" }}
            >
              {status === "loading" ? "Joining..." : "Join Waitlist →"}
            </button>
          </form>
        )}

        <p className="mt-4 text-slate-600 text-xs">No spam. Unsubscribe anytime. We respect your privacy.</p>

        {/* Social proof */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          {[
            { value: "500+", label: "People on waitlist" },
            { value: "12", label: "Founding chamas secured" },
            { value: "Q2 2025", label: "Target launch" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-white font-bold text-xl">{item.value}</div>
              <div className="text-slate-500 text-xs">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
