"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type CtaBandProps = {
  onJoin: () => void;
};

export function CtaBand({ onJoin }: CtaBandProps) {
  return (
    <section id="join" className="relative z-10 overflow-hidden bg-[var(--ink)] text-[var(--paper)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        aria-hidden
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "160px 160px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            HiiiPower
          </p>
          <h2 className="mt-4 text-xl sm:text-2xl font-semibold tracking-tight text-white/90">
            Ready to join the real world?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/55 max-w-md mx-auto leading-relaxed">
            Be among the first to experience social media the way it should have been.
          </p>
          <div className="mt-8 flex justify-center">
            <Button variant="inverse" size="lg" onClick={onJoin}>
              Join the waitlist
            </Button>
          </div>
          <p className="mt-5 text-xs text-white/40">No spam. One email when we launch.</p>
        </motion.div>
      </div>
    </section>
  );
}
