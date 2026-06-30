"use client";

import { motion } from "framer-motion";

const ROWS = [
  { feature: "Identity verification", them: "Anyone can create fake accounts", us: "Every user is a verified human" },
  { feature: "Content", them: "Curated, filtered, uploaded later", us: "Captured live, in the moment" },
  { feature: "Feed algorithm", them: "Designed to maximize engagement", us: "Chronological, no manipulation" },
  { feature: "Advertising", them: "Ads and sponsored content everywhere", us: "Zero ads, zero brands" },
  { feature: "Your data", them: "Sold to the highest bidder", us: "You own and control it" },
  { feature: "Social metrics", them: "Likes, followers, comparison traps", us: "No public metrics at all" },
];

export function Comparison() {
  return (
    <section id="compare" className="relative z-10 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-3">The difference</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            Everything you hate about social media, fixed.
          </h2>
          <p className="mt-4 text-lg text-zinc-500 leading-relaxed">
            We didn&apos;t tweak the old model. We rebuilt it from scratch around what actually matters.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 px-4 sm:px-6 py-4 bg-zinc-50 border-b border-zinc-200 text-xs sm:text-sm font-semibold">
            <div className="text-zinc-500" />
            <div className="text-center text-zinc-400">Traditional social</div>
            <div className="text-center text-zinc-900">HiiiPower</div>
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <motion.div
              key={row.feature}
              className="grid grid-cols-3 gap-4 px-4 sm:px-6 py-4 sm:py-5 border-b border-zinc-100 last:border-0 items-center"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <div className="text-xs sm:text-sm font-semibold text-zinc-700">{row.feature}</div>
              <div className="text-center">
                <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-red-50 text-red-400 text-sm">✕</span>
                <p className="mt-1.5 text-[10px] sm:text-xs text-zinc-400 leading-snug hidden sm:block">{row.them}</p>
              </div>
              <div className="text-center">
                <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-emerald-50 text-emerald-500 text-sm">✓</span>
                <p className="mt-1.5 text-[10px] sm:text-xs text-zinc-600 leading-snug hidden sm:block">{row.us}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
