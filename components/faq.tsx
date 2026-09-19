"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="border-b border-[var(--line)] last:border-0">
      <button
        type="button"
        className="flex w-full items-center justify-between py-5 text-left gap-4"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="text-sm sm:text-base font-semibold text-[var(--ink)]">{q}</span>
        <span
          className={`shrink-0 flex h-6 w-6 items-center justify-center text-[var(--muted)] transition-transform duration-200 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-[var(--muted)] leading-relaxed pr-10">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="relative z-10 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-3">FAQ</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)]">
            Questions? Answered.
          </h2>
        </div>
        <div>
          {FAQS.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
