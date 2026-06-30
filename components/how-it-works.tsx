"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    step: "01",
    title: "Verify your identity",
    desc: "Complete a one-time human verification. No bots, no catfish — everyone on HiiiPower is real.",
  },
  {
    step: "02",
    title: "Capture the moment",
    desc: "Open the app and share what's happening right now. No gallery uploads, no filters, no editing.",
  },
  {
    step: "03",
    title: "Connect authentically",
    desc: "See a chronological feed of real people living real lives. Talk, don't just react.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative z-10 py-20 sm:py-28 bg-zinc-50/80 border-y border-zinc-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            Three steps to the real world.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-px bg-zinc-200" aria-hidden />

          {STEPS.map((item, i) => (
            <motion.div
              key={item.step}
              className="relative text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-zinc-900 text-white text-lg font-bold mb-5 relative z-10">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">{item.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-xs mx-auto md:mx-0">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
