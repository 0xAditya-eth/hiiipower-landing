"use client";

export function DynamicBackground() {
  return (
    <>
      {/* Base */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-zinc-50" aria-hidden />

      {/* Grid pattern */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 80%)",
        }}
      />

      {/* Top glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% -10%, rgba(99,102,241,0.08), transparent 70%)",
        }}
      />
    </>
  );
}
