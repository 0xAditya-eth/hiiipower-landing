"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Reveal,
  cinemaEase,
  cinemaViewport,
  staggerItemSoft,
} from "@/components/experience/motion";

const FAQS = [
  {
    q: "When is HiiiPower launching?",
    a: "The waitlist is open now. iOS early access starts in early September 2026. Waitlist members get in first.",
  },
  {
    q: "How does identity verification work?",
    a: "We use a one-time verification process to confirm you're a real human. We don't store unnecessary biometric data — just enough to prevent bots and fake accounts.",
  },
  {
    q: "Is HiiiPower really ad-free?",
    a: "Yes. There are no ads, no sponsored content, no brand accounts, and no plans to add any of these. Our business model is built around users, not advertisers.",
  },
  {
    q: "Can I upload photos from my gallery?",
    a: "No. All posts must be captured live through the in-app camera. This ensures every moment shared is authentic and happening in real-time.",
  },
  {
    q: "What about my data?",
    a: "You own your data. You control who sees it, and you can export or delete it at any time. We don't sell your information to third parties.",
  },
  {
    q: "Will there be likes and follower counts?",
    a: "No public metrics. No likes, no follower counts, no comparison traps. We believe your value isn't a number.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <motion.div variants={staggerItemSoft} className="border-b border-white/10 last:border-0">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-white sm:text-base">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: cinemaEase }}
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-white/50 ${
            open ? "border-accent text-accent" : "border-white/15"
          }`}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0, filter: "blur(6px)" }}
            animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
            exit={{ height: 0, opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.28, ease: cinemaEase }}
            className="overflow-hidden"
          >
            <p className="pr-10 pb-5 text-sm leading-relaxed text-white/50">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function LearnFaq() {
  return (
    <section
      id="faq"
      className="scroll-mt-20 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="mb-12 text-center">
          <Reveal y={16} blur>
            <p className="mb-3 text-[10px] font-semibold tracking-[0.28em] text-white/40 uppercase">
              FAQ
            </p>
          </Reveal>
          <Reveal y={32} blur scale delay={0.08}>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Questions? Answered.
            </h2>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={cinemaViewport}
          transition={{ duration: 0.7, ease: cinemaEase }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 sm:px-6"
        >
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={cinemaViewport}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.07, delayChildren: 0.15 },
              },
            }}
          >
            {FAQS.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
