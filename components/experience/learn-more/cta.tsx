"use client";

import React from "react";
import { motion } from "framer-motion";
import { cinemaEase, cinemaViewport } from "@/components/experience/motion";
import { EmailJoinForm } from "@/components/experience/email-join-form";

/** Inline waitlist capture matching Immersion finale EmailJoinBar. */
export function LearnCta() {
  return (
    <section id="join" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={cinemaViewport}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.12, delayChildren: 0.06 },
            },
          }}
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 36, filter: "blur(12px)", scale: 0.96 },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                scale: 1,
                transition: { duration: 0.85, ease: cinemaEase },
              },
            }}
            className="font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl"
          >
            Ready to join the real world?
          </motion.h2>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.6, ease: cinemaEase },
              },
            }}
            className="mx-auto mt-4 max-w-sm text-sm text-white/50"
          >
            One email when we launch. No spam.
          </motion.p>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.94 },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.55, ease: cinemaEase },
              },
            }}
            className="relative mx-auto mt-10 flex justify-center"
          >
            <EmailJoinForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
