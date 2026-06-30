"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "When is HiiiPower launching?",
    a: "We're currently in private development and accepting waitlist signups. Early access members will be the first to try the app and help shape its direction.",
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
    <div className="border-b border-zinc-200 last:border-0">
      <button
        type="button"
        className="flex w-full items-center justify-between py-5 text-left gap-4"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="text-sm sm:text-base font-semibold text-zinc-900">{q}</span>
        <span className={`shrink-0 flex h-6 w-6 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
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
            <p className="pb-5 text-sm text-zinc-500 leading-relaxed pr-10">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="relative z-10 py-20 sm:py-28 bg-zinc-50/80 border-t border-zinc-200/60">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
            Questions? Answered.
          </h2>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white px-6 shadow-sm">
          {FAQS.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
