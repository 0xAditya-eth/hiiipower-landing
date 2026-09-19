"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    step: "01",
    title: "Verify your identity",
    desc: "One-time human verification. No bots, no catfish — everyone on HiiiPower is real.",
  },
  {
    step: "02",
    title: "Capture the moment",
    desc: "Share what's happening right now. No gallery uploads, no filters, no editing.",
  },
  {
    step: "03",
    title: "Connect authentically",
    desc: "A chronological feed of real people living real lives. Talk, don't just react.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative z-10 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-3">
            How it works
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--ink)] leading-[1.1]">
            Three steps to the real world.
          </h2>
        </div>

        <ol className="grid md:grid-cols-3 gap-10 md:gap-8">
          {STEPS.map((item, i) => (
            <motion.li
              key={item.step}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.12, duration: 0.45 }}
            >
              <span className="font-mono text-sm text-[var(--accent)]">{item.step}</span>
              <h3 className="mt-3 font-display text-xl font-bold text-[var(--ink)]">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed max-w-xs">{item.desc}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
