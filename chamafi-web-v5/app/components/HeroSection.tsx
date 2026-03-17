"use client";
import { useEffect, useRef } from "react";

const stats = [
  { value: "54",    label: "Countries" },
  { value: "1.4B+", label: "People" },
  { value: "$200B+",label: "Informal Savings" },
  { value: "12%",   label: "DeFi APY" },
];

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    type Particle = { x: number; y: number; vx: number; vy: number; s: number; op: number; t: number };
    const pts: Particle[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      s: Math.random() * 5 + 1.5,
      op: Math.random() * 0.3 + 0.04,
      t: Math.floor(Math.random() * 3),
    }));

    const cols = ["rgba(212,160,23,", "rgba(200,67,30,", "rgba(205,127,50,"];
    let id: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const now = Date.now() * 0.0003;
      pts.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.op;
        ctx.fillStyle = `${cols[p.t]}1)`;
        ctx.translate(p.x, p.y);
        ctx.rotate(now * (p.t + 1));
        if (p.t === 0) {
          ctx.beginPath();
          ctx.moveTo(0, -p.s); ctx.lineTo(p.s, 0); ctx.lineTo(0, p.s); ctx.lineTo(-p.s, 0);
          ctx.closePath(); ctx.fill();
        } else if (p.t === 1) {
          ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s);
        } else {
          ctx.beginPath();
          ctx.moveTo(0, -p.s); ctx.lineTo(p.s * 0.866, p.s * 0.5); ctx.lineTo(-p.s * 0.866, p.s * 0.5);
          ctx.closePath(); ctx.fill();
        }
        ctx.restore();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      });
      id = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#1a1008]">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(212,160,23,0.10), transparent)" }} />
        <div className="absolute top-2/3 right-1/4 w-[350px] h-[350px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(200,67,30,0.07), transparent)" }} />
      </div>

      {/* Kente top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-600 via-orange-500 via-red-600 via-yellow-400 to-green-700" />

      {/* African diamond pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L100 50L50 100L0 50Z' fill='%23d4a017'/%3E%3Cpath d='M50 25L75 50L50 75L25 50Z' fill='%23d4a017'/%3E%3C/svg%3E")`,
          backgroundSize: "100px 100px" }} />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-900/40 border border-yellow-600/30 text-yellow-400 text-sm font-medium mb-8 backdrop-blur-sm">
          <span>🌍</span>
          <span>For Africa, By Africa</span>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-xs">Live on Celo</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-6 tracking-tight">
          <span className="block text-[#f5e6c8]">Your Community</span>
          <span className="block" style={{
            background: "linear-gradient(135deg, #fbbf24 0%, #cd7f32 40%, #c8431e 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
          }}>Saves Together</span>
          <span className="block text-[#f5e6c8]">Grows Together</span>
        </h1>

        <p className="text-lg sm:text-xl text-[#f5e6c8]/65 max-w-2xl mx-auto mb-10 leading-relaxed">
          ChamaFi brings the ancient African tradition of community savings{" "}
          <em className="text-yellow-400 not-italic font-semibold">on-chain</em>.
          Chamas, ROSCAs, and savings groups — now with DeFi yields, microloans,
          and MiniPay payments for 1.4 billion Africans.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a href="https://minipay.opera.com/" target="_blank" rel="noopener noreferrer"
            className="group relative px-8 py-4 rounded-xl font-bold text-[#1a1008] text-lg overflow-hidden shadow-2xl hover:scale-105 transition-transform"
            style={{ background: "linear-gradient(135deg, #fbbf24 0%, #cd7f32 50%, #d97706 100%)" }}>
            <span className="relative z-10 flex items-center gap-2">
              <span>📱</span> Open in MiniPay
            </span>
          </a>
          <a href="#solution"
            className="px-8 py-4 rounded-xl font-semibold text-[#f5e6c8] text-lg border border-yellow-600/40 hover:border-yellow-500/70 hover:bg-yellow-900/20 transition-all backdrop-blur-sm">
            Learn More →
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="glass-earth rounded-xl p-4 text-center adinkra-border">
              <div className="text-2xl font-black text-yellow-400">{s.value}</div>
              <div className="text-xs text-[#f5e6c8]/50 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs text-[#f5e6c8]/50 font-medium tracking-widest uppercase">Scroll</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-yellow-500 to-transparent animate-pulse" />
      </div>

      {/* Kente bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-700 via-yellow-400 via-red-600 to-orange-500" />
    </section>
  );
}
