"use client";

import { motion } from "framer-motion";
import {
  Reveal,
  cinemaEase,
  cinemaViewport,
  staggerItem,
} from "@/components/experience/motion";

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

export function LearnHowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mb-12 max-w-2xl sm:mb-16">
          <Reveal y={16} blur>
            <p className="mb-3 text-[10px] font-semibold tracking-[0.28em] text-white/40 uppercase">
              How it works
            </p>
          </Reveal>
          <Reveal y={36} blur scale delay={0.08}>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Three steps to the real world.
            </h2>
          </Reveal>
        </div>

        <div className="relative grid gap-10 md:grid-cols-3 md:gap-8">
          <motion.div
            className="pointer-events-none absolute top-8 right-[16.67%] left-[16.67%] hidden h-px origin-left bg-white/10 md:block"
            aria-hidden
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={cinemaViewport}
            transition={{ duration: 0.9, delay: 0.25, ease: cinemaEase }}
          />
          {STEPS.map((item, i) => (
            <motion.div
              key={item.step}
              className="relative text-center md:text-left"
              initial="hidden"
              whileInView="show"
              viewport={cinemaViewport}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.08 + i * 0.14,
                  },
                },
              }}
            >
              <motion.div
                variants={staggerItem}
                className="relative z-10 mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] font-display text-lg font-semibold text-accent"
              >
                {item.step}
              </motion.div>
              <motion.h3
                variants={staggerItem}
                className="font-display text-xl font-semibold text-white"
              >
                {item.title}
              </motion.h3>
              <motion.p
                variants={staggerItem}
                className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-white/50 md:mx-0"
              >
                {item.desc}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
