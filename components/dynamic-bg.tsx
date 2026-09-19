"use client";

export function DynamicBackground() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[var(--background)]" aria-hidden />

      {/* Soft documentary wash — cool botanical, not indigo */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 15% 10%, rgba(26,107,69,0.07), transparent 55%), radial-gradient(ellipse 50% 40% at 90% 80%, rgba(20,24,22,0.04), transparent 60%)",
        }}
      />

      {/* Fixed grain layer */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.28] mix-blend-multiply"
        aria-hidden
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "160px 160px",
        }}
      />
    </>
  );
}
