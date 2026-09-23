"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Reveal,
  cinemaEase,
  cinemaViewport,
  staggerItem,
} from "@/components/experience/motion";

function PeopleVisual() {
  const faces = [
    { name: "Alex Rivera", image: "/face1.jpg" },
    { name: "Sam Chen", image: "/face2.jpg" },
    { name: "Jordan Lee", image: "/face3.jpg" },
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <div className="space-y-3">
        {faces.map((person) => (
          <div
            key={person.name}
            className="flex items-center gap-3 rounded-xl bg-white/[0.04] p-3"
          >
            <Image
              src={person.image}
              alt={person.name}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                {person.name}
              </p>
              <p className="text-xs font-medium text-accent">✓ Verified human</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 border-t border-white/10 pt-4 text-center">
        <p className="text-xs text-white/40">0 bots detected in your network</p>
      </div>
    </div>
  );
}

function MomentsVisual() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
      <div className="relative h-40">
        <Image
          src="/golden-gate-park.jpg"
          alt="Location-verified moment"
          fill
          className="object-cover"
        />
        <div className="absolute right-3 bottom-3 left-3">
          <p className="inline-block rounded-lg bg-black/40 px-2.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
            📍 Himalayas, Nepal
          </p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm font-semibold text-white">Captured just now</p>
        <p className="mt-1 text-xs text-white/50">
          No uploads. No edits. No filters.
        </p>
      </div>
    </div>
  );
}

function PowerVisual() {
  return (
    <div className="space-y-1 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      {[
        { label: "Data ownership", value: "You" },
        { label: "Feed algorithm", value: "None" },
        { label: "Ad tracking", value: "Disabled" },
        { label: "Public metrics", value: "Hidden" },
      ].map((item) => (
        <div
          key={item.label}
          className="flex items-center justify-between border-b border-white/5 py-2.5 last:border-0"
        >
          <span className="text-sm text-white/50">{item.label}</span>
          <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}

const PILLARS = [
  {
    id: "people",
    eyebrow: "Pillar 01",
    title: "Real People",
    description:
      "Every account on HiiiPower belongs to a verified human. No bots inflating engagement, no fake profiles catfishing your friends, no brand accounts hijacking your feed.",
    bullets: [
      "One-time identity verification",
      "No corporate or brand accounts",
      "Ad-free, people-only feed",
    ],
    visual: <PeopleVisual />,
  },
  {
    id: "moments",
    eyebrow: "Pillar 02",
    title: "Real Moments",
    description:
      "Posts are captured live from your camera — not uploaded from a gallery of curated photos. What you see is what actually happened, where it actually happened.",
    bullets: [
      "Live camera capture only",
      "Location-verified posts",
      "Zero filters or editing tools",
    ],
    visual: <MomentsVisual />,
  },
  {
    id: "power",
    eyebrow: "Pillar 03",
    title: "Real Power",
    description:
      "Your data, your attention, your mental health — it all belongs to you. No addictive algorithms, no vanity metrics, no selling your life to advertisers.",
    bullets: [
      "You own your data",
      "Chronological feed, no algorithm",
      "No likes, follower counts, or public metrics",
    ],
    visual: <PowerVisual />,
  },
];

export function LearnFeatures() {
  return (
    <section id="features" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mb-16 max-w-2xl sm:mb-20">
          <Reveal y={16} blur>
            <p className="mb-3 text-[10px] font-semibold tracking-[0.28em] text-white/40 uppercase">
              Features
            </p>
          </Reveal>
          <Reveal y={36} blur scale delay={0.08}>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Three pillars. One refusal.
            </h2>
          </Reveal>
          <Reveal y={20} delay={0.16}>
            <p className="mt-4 text-sm leading-relaxed text-white/50 sm:text-base">
              Social media rebuilt around presence — not performance.
            </p>
          </Reveal>
        </div>

        <div className="space-y-24 sm:space-y-32">
          {PILLARS.map((pillar, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={pillar.id}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  reversed ? "lg:[direction:rtl]" : ""
                }`}
              >
                <motion.div
                  className={reversed ? "lg:[direction:ltr]" : ""}
                  initial="hidden"
                  whileInView="show"
                  viewport={cinemaViewport}
                  variants={{
                    hidden: {},
                    show: {
                      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
                    },
                  }}
                >
                  <motion.p
                    variants={staggerItem}
                    className="mb-3 text-[10px] font-semibold tracking-[0.28em] text-accent uppercase"
                  >
                    {pillar.eyebrow}
                  </motion.p>
                  <motion.h3
                    variants={staggerItem}
                    className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl"
                  >
                    {pillar.title}
                  </motion.h3>
                  <motion.p
                    variants={staggerItem}
                    className="mt-4 text-base leading-relaxed text-white/50"
                  >
                    {pillar.description}
                  </motion.p>
                  <ul className="mt-6 space-y-3">
                    {pillar.bullets.map((bullet) => (
                      <motion.li
                        key={bullet}
                        variants={staggerItem}
                        className="flex items-center gap-3 text-sm text-white/80"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[10px] text-accent">
                          ✓
                        </span>
                        {bullet}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  className={reversed ? "lg:[direction:ltr]" : ""}
                  initial={{
                    opacity: 0,
                    y: 36,
                    scale: 0.94,
                    filter: "blur(10px)",
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  viewport={cinemaViewport}
                  transition={{ duration: 0.75, delay: 0.1, ease: cinemaEase }}
                >
                  {pillar.visual}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
