"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Reveal,
  cinemaViewport,
  staggerItemSoft,
} from "@/components/experience/motion";

type Outcome = {
  title: string;
  problem: string;
  how: string;
  principles: string[];
  cta?: { text: string; href: string };
};

const OUTCOMES: Outcome[] = [
  {
    title: "Mental health",
    problem:
      "Likes, follower counts, and filtered photos turn social media into a daily scorecard — you measure your worth against curated highlight reels.",
    how: "HiiiPower removes every public metric and every filter. You share your real life without performing for a number.",
    principles: [
      "No likes or follower counts",
      "No filters or editing tools",
      "No comparison traps",
    ],
  },
  {
    title: "Your attention",
    problem:
      "Algorithmic feeds, autoplay, and ads are designed to keep you scrolling long after you meant to close the app.",
    how: "A simple chronological feed with no engagement algorithm and zero ads. You see what friends posted — then you put your phone down.",
    principles: [
      "No addictive feed algorithm",
      "Zero ads or sponsored posts",
      "Chronological, not optimized",
    ],
  },
  {
    title: "Real trust",
    problem:
      "Bots, fake profiles, and brand accounts make it hard to know who you're actually talking to — or whether anything you see is real.",
    how: "Every user is identity-verified. Posts are captured live from the camera and location-verified. What you see is what happened.",
    principles: [
      "Verified humans only",
      "Live camera capture",
      "Location-verified posts",
    ],
    cta: {
      text: "Can you tell AI from real? →",
      href: "/ai-or-not",
    },
  },
  {
    title: "Your data & privacy",
    problem:
      "Traditional platforms collect your behavior, sell it to advertisers, and bury privacy controls behind confusing settings.",
    how: "You own your data. You control who sees it, export it, or delete it — and we never sell your information.",
    principles: [
      "You own your data",
      "No ad tracking",
      "Transparent privacy controls",
    ],
    cta: {
      text: "Calculate what they've extracted from you →",
      href: "/your-worth",
    },
  },
];

export function LearnWhyItMatters() {
  return (
    <section id="why-it-matters" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mb-12 max-w-2xl sm:mb-16">
          <Reveal y={16} blur>
            <p className="mb-3 text-[10px] font-semibold tracking-[0.28em] text-white/40 uppercase">
              Why it matters
            </p>
          </Reveal>
          <Reveal y={36} blur scale delay={0.08}>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Built to protect what social media takes from you.
            </h2>
          </Reveal>
          <Reveal y={16} delay={0.16}>
            <p className="mt-4 text-sm leading-relaxed text-white/50 sm:text-base">
              Every design choice maps to a real problem — your mental health,
              your time, your trust, and your privacy.
            </p>
          </Reveal>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5"
          initial="hidden"
          whileInView="show"
          viewport={cinemaViewport}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.09, delayChildren: 0.08 },
            },
          }}
        >
          {OUTCOMES.map((item) => (
            <motion.article
              key={item.title}
              variants={staggerItemSoft}
              className="border border-white/10 bg-white/[0.03] p-6 sm:p-8"
            >
              <h3 className="font-display text-xl font-semibold tracking-tight text-white">
                {item.title}
              </h3>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="mb-1.5 text-[10px] font-semibold tracking-[0.2em] text-white/35 uppercase">
                    The problem
                  </p>
                  <p className="text-sm leading-relaxed text-white/50">
                    {item.problem}
                  </p>
                </div>
                <div>
                  <p className="mb-1.5 text-[10px] font-semibold tracking-[0.2em] text-accent uppercase">
                    How HiiiPower helps
                  </p>
                  <p className="text-sm leading-relaxed text-white/80">
                    {item.how}
                  </p>
                </div>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-5">
                {item.principles.map((p) => (
                  <li
                    key={p}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/60"
                  >
                    {p}
                  </li>
                ))}
              </ul>

              {item.cta && (
                <div className="mt-6 border-t border-white/10 pt-6 text-center">
                  <Link
                    href={item.cta.href}
                    className="inline-flex items-center justify-center rounded-full border border-accent bg-accent px-5 py-3 text-sm font-semibold text-accent-ink transition hover:brightness-110"
                  >
                    {item.cta.text.replace(/\s*→\s*$/, "")}
                    <span className="ml-2" aria-hidden>
                      →
                    </span>
                  </Link>
                </div>
              )}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
