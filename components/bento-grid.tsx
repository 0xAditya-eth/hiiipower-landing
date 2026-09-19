"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type Outcome = {
  title: string;
  problem: string;
  how: string;
  href?: string;
  linkLabel?: string;
};

const OUTCOMES: Outcome[] = [
  {
    title: "Mental health",
    problem:
      "Likes, follower counts, and filtered photos turn sharing into a daily scorecard.",
    how: "No public metrics. No filters. Share your real life without performing for a number.",
  },
  {
    title: "Your attention",
    problem: "Algorithms, autoplay, and ads are designed to keep you scrolling past intent.",
    how: "A chronological feed with no engagement algorithm and zero ads. Then you put the phone down.",
  },
  {
    title: "Real trust",
    problem: "Bots, fakes, and brand accounts make it hard to know who — or what — you're seeing.",
    how: "Identity-verified humans. Live camera capture. Location-verified posts.",
    href: "/ai-or-not",
    linkLabel: "Can you tell AI from real?",
  },
  {
    title: "Your data",
    problem: "Platforms collect your behavior and sell it — privacy buried in settings.",
    how: "You own your data. Export it, delete it, control who sees it. We never sell it.",
    href: "/your-worth",
    linkLabel: "Calculate what they've extracted",
  },
];

export function BentoGrid() {
  return (
    <section id="features" className="relative z-10 py-20 sm:py-28 border-y border-[var(--line)] bg-[var(--surface)]/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-3">
            Why it matters
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--ink)] leading-[1.1]">
            Protect what social media takes from you.
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)] leading-relaxed">
            Every design choice maps to a real cost — your mind, your time, your trust, your privacy.
          </p>
        </div>

        <div className="divide-y divide-[var(--line)]">
          {OUTCOMES.map((item, i) => (
            <motion.article
              key={item.title}
              className="grid sm:grid-cols-[minmax(8rem,14rem)_1fr] gap-3 sm:gap-8 py-8 first:pt-0 last:pb-0"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <h3 className="font-display text-xl font-bold text-[var(--ink)] tracking-tight">
                {item.title}
              </h3>
              <div className="space-y-3 max-w-2xl">
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  <span className="font-semibold text-[var(--warn)]">Problem. </span>
                  {item.problem}
                </p>
                <p className="text-sm text-[var(--ink)] leading-relaxed font-medium">
                  <span className="font-semibold text-[var(--accent)]">HiiiPower. </span>
                  {item.how}
                </p>
                {item.href && item.linkLabel && (
                  <Link
                    href={item.href}
                    className="inline-flex text-sm font-semibold text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4 hover:decoration-[var(--accent)] transition-colors"
                  >
                    {item.linkLabel} →
                  </Link>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
