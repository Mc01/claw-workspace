"use client";

export function GradientBackground() {
  return (
    <>
      {/* Gradient mesh */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        {/* Purple orb top-left */}
        <div className="animate-float1" style={{
          position: "absolute",
          width: 900,
          height: 900,
          top: -300,
          left: -300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.45) 0%, transparent 65%)",
        }} />
        {/* Pink orb bottom-right */}
        <div className="animate-float2" style={{
          position: "absolute",
          width: 800,
          height: 800,
          bottom: -200,
          right: -200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(236,72,153,0.35) 0%, transparent 65%)",
        }} />
        {/* Blue orb center */}
        <div className="animate-float3" style={{
          position: "absolute",
          width: 600,
          height: 600,
          top: "45%",
          left: "50%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 65%)",
        }} />
        {/* Cyan orb */}
        <div className="animate-float4" style={{
          position: "absolute",
          width: 400,
          height: 400,
          top: "65%",
          left: "15%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 65%)",
        }} />
        {/* Subtle grid */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
      </div>
      {/* Noise overlay */}
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        opacity: 0.025,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E\")",
      }} />
    </>
  );
}
