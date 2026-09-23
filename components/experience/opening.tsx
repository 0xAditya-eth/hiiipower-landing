"use client";

import { motion } from "framer-motion";
import { HoldPress } from "@/components/experience/gates/hold-press";

type OpeningProps = {
  onJoin: () => void;
  entered: boolean;
  onEnter: () => void;
};

export function Opening({ onJoin, entered, onEnter }: OpeningProps) {
  const handleEnter = () => {
    onEnter();
    // Allow layout to unlock, then scroll into the journey
    requestAnimationFrame(() => {
      const el = document.getElementById("journey");
      if (!el) return;
      const top = window.scrollY + el.getBoundingClientRect().top;
      window.scrollTo({ top: top + 8, behavior: "smooth" });
    });
  };

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-background pb-16 pt-28 sm:pb-20">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 20% 20%, rgba(255,51,102,0.12), transparent 45%), radial-gradient(ellipse at 80% 70%, rgba(255,255,255,0.05), transparent 40%), linear-gradient(160deg, #0a0a0a 0%, #060606 50%, #14080e 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
          }}
        />
        {/* Crack / shatter veil until entered */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(6,6,6,0.55)_70%)]"
          animate={{ opacity: entered ? 0 : 1 }}
          transition={{ duration: 0.8 }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          className="text-xs font-medium uppercase tracking-[0.28em] text-accent"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Social infrastructure for humans
        </motion.p>

        <motion.h1
          className="font-display mt-6 max-w-5xl text-[clamp(3.2rem,11vw,8.5rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-foreground"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          HiiiPower
        </motion.h1>

        <motion.p
          className="font-display mt-4 max-w-2xl text-2xl font-medium leading-snug tracking-tight text-foreground/85 sm:text-3xl lg:text-4xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Social media, without the bullshit.
        </motion.p>

        <motion.p
          className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
        >
          Real people. Real moments. Real power over your data and attention.
          Hold to break in — then scroll the product.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:gap-12"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.42 }}
        >
          {!entered ? (
            <HoldPress
              label="Enter"
              hint="Hold to enter the experience"
              onComplete={handleEnter}
            />
          ) : (
            <p className="text-sm tracking-wide text-accent">Unlocked — scroll to continue ↓</p>
          )}

          <button
            type="button"
            onClick={onJoin}
            className="inline-flex items-center justify-center rounded-full border border-line px-7 py-3.5 text-sm font-medium text-foreground transition hover:border-foreground/40 hover:bg-white/5"
          >
            Join the waitlist
          </button>
        </motion.div>
      </div>
    </section>
  );
}
