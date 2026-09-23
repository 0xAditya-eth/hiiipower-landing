"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";

export function Manifesto() {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0.4]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-line bg-surface px-4 py-28 sm:px-6 sm:py-36 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,51,102,0.06),transparent_50%)]" />
      <motion.div style={{ y, opacity }} className="relative mx-auto max-w-5xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-accent">
          The refusal
        </p>
        <h2 className="font-display mt-6 text-[clamp(2rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-foreground">
          Ordinary social media{" "}
          <span className="text-muted">ends here.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Built for humans who want presence over performance — verification over
          virality, ownership over extraction, and a feed that doesn’t treat
          attention like a quarry.
        </p>
      </motion.div>
    </section>
  );
}
