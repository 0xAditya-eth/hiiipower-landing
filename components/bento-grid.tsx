"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type Outcome = {
  title: string;
  problem: string;
  how: string;
  principles: string[];
  icon: string;
  cta?: {
    text: string;
    href: string;
  };
};

const OUTCOMES: Outcome[] = [
  {
    title: "Mental health",
    problem: "Likes, follower counts, and filtered photos turn social media into a daily scorecard — you measure your worth against curated highlight reels.",
    how: "HiiiPower removes every public metric and every filter. You share your real life without performing for a number.",
    principles: ["No likes or follower counts", "No filters or editing tools", "No comparison traps"],
    icon: "🧠",
  },
  {
    title: "Your attention",
    problem: "Algorithmic feeds, autoplay, and ads are designed to keep you scrolling long after you meant to close the app.",
    how: "A simple chronological feed with no engagement algorithm and zero ads. You see what friends posted — then you put your phone down.",
    principles: ["No addictive feed algorithm", "Zero ads or sponsored posts", "Chronological, not optimized"],
    icon: "⏱️",
  },
  {
    title: "Real trust",
    problem: "Bots, fake profiles, and brand accounts make it hard to know who you're actually talking to — or whether anything you see is real.",
    how: "Every user is identity-verified. Posts are captured live from the camera and location-verified. What you see is what happened.",
    principles: ["Verified humans only", "Live camera capture", "Location-verified posts"],
    icon: "🤝",
  },
  {
    title: "Your data & privacy",
    problem: "Traditional platforms collect your behavior, sell it to advertisers, and bury privacy controls behind confusing settings.",
    how: "You own your data. You control who sees it, export it, or delete it — and we never sell your information.",
    principles: ["You own your data", "No ad tracking", "Transparent privacy controls"],
    icon: "🔒",
    cta: {
      text: "Calculate what they've extracted from you →",
      href: "/your-worth",
    },
  },
];

export function BentoGrid() {
  return (
    <section id="features" className="relative z-10 py-20 sm:py-28 bg-zinc-50/80 border-y border-zinc-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-3">Why it matters</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            Built to protect what social media takes from you.
          </h2>
          <p className="mt-4 text-lg text-zinc-500 leading-relaxed">
            Every design choice maps to a real problem — your mental health, your time, your trust, and your privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {OUTCOMES.map((item, i) => (
            <motion.article
              key={item.title}
              className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 hover:border-zinc-300 hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100 text-xl" aria-hidden>
                  {item.icon}
                </span>
                <h3 className="text-xl font-bold text-zinc-900 tracking-tight">{item.title}</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-1.5">The problem</p>
                  <p className="text-sm text-zinc-600 leading-relaxed">{item.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-1.5">How HiiiPower helps</p>
                  <p className="text-sm text-zinc-800 leading-relaxed font-medium">{item.how}</p>
                </div>
              </div>

              <ul className="mt-5 pt-5 border-t border-zinc-100 flex flex-wrap gap-2">
                {item.principles.map((p) => (
                  <li
                    key={p}
                    className="text-xs font-medium text-zinc-600 bg-zinc-50 border border-zinc-200 rounded-full px-3 py-1"
                  >
                    {p}
                  </li>
                ))}
              </ul>

              {item.cta && (
                <div className="mt-5 pt-5 border-t border-zinc-100">
                  <a href={item.cta.href}>
                    <Button variant="ghost" size="sm" className="w-full text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                      {item.cta.text}
                    </Button>
                  </a>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
