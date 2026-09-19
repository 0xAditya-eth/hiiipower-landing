"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Pillar = {
  id: string;
  number: string;
  title: string;
  description: string;
  bullets: string[];
  visual: React.ReactNode;
};

function PeopleVisual() {
  const faces = [
    { name: "Alex Rivera", image: "/face1.jpg" },
    { name: "Sam Chen", image: "/face2.jpg" },
    { name: "Jordan Lee", image: "/face3.jpg" },
  ];
  return (
    <div className="space-y-3">
      {faces.map((person) => (
        <div key={person.name} className="flex items-center gap-4 py-2">
          <Image
            src={person.image}
            alt={person.name}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover ring-2 ring-[var(--accent-soft)]"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[var(--ink)] truncate">{person.name}</p>
            <p className="text-xs font-medium text-[var(--accent)] flex items-center gap-1.5 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-signal" aria-hidden />
              Verified human
            </p>
          </div>
        </div>
      ))}
      <p className="pt-3 text-xs text-[var(--muted)] border-t border-[var(--line)]">
        0 bots in your network
      </p>
    </div>
  );
}

function MomentsVisual() {
  return (
    <div className="relative aspect-[4/3] overflow-hidden">
      <Image
        src="/golden-gate-park.jpg"
        alt="Live location-verified moment"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 text-white">
        <p className="text-sm font-semibold">Captured just now</p>
        <p className="text-xs text-white/75 mt-1">No uploads. No edits. No filters.</p>
      </div>
    </div>
  );
}

function PowerVisual() {
  return (
    <dl className="space-y-0 divide-y divide-[var(--line)]">
      {[
        { label: "Data ownership", value: "You" },
        { label: "Feed algorithm", value: "None" },
        { label: "Ad tracking", value: "Disabled" },
        { label: "Public metrics", value: "Hidden" },
      ].map((item) => (
        <div key={item.label} className="flex items-center justify-between py-3.5">
          <dt className="text-sm text-[var(--muted)]">{item.label}</dt>
          <dd className="text-sm font-semibold text-[var(--accent)]">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

const PILLARS: Pillar[] = [
  {
    id: "people",
    number: "01",
    title: "Real People",
    description:
      "Every account belongs to a verified human. No bots inflating engagement, no fake profiles, no brand accounts hijacking your feed.",
    bullets: ["One-time identity verification", "No corporate or brand accounts", "Ad-free, people-only feed"],
    visual: <PeopleVisual />,
  },
  {
    id: "moments",
    number: "02",
    title: "Real Moments",
    description:
      "Posts are captured live from your camera — not uploaded from a curated gallery. What you see is what actually happened.",
    bullets: ["Live camera capture only", "Location-verified posts", "Zero filters or editing tools"],
    visual: <MomentsVisual />,
  },
  {
    id: "power",
    number: "03",
    title: "Real Power",
    description:
      "Your data, your attention, your mental health — it all belongs to you. No addictive algorithms, no vanity metrics, no selling your life to advertisers.",
    bullets: ["You own your data", "Chronological feed, no algorithm", "No likes or follower counts"],
    visual: <PowerVisual />,
  },
];

export function FeatureShowcase() {
  return (
    <section id="pillars" className="relative z-10 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16 sm:mb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-3">
            Three pillars
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--ink)] leading-[1.1]">
            Built on what social media forgot.
          </h2>
        </div>

        <div className="space-y-20 sm:space-y-28">
          {PILLARS.map((pillar, i) => {
            const reversed = i % 2 === 1;
            return (
              <motion.div
                key={pillar.id}
                id={pillar.id}
                className={`grid lg:grid-cols-2 gap-10 lg:gap-20 items-center ${
                  reversed ? "lg:[direction:rtl]" : ""
                }`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55 }}
              >
                <div className={reversed ? "lg:[direction:ltr]" : ""}>
                  <p className="font-mono text-xs text-[var(--accent)] mb-3">{pillar.number}</p>
                  <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)] leading-tight mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-lg text-[var(--muted)] leading-relaxed mb-6">{pillar.description}</p>
                  <ul className="space-y-2.5">
                    {pillar.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-sm text-[var(--ink)]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={reversed ? "lg:[direction:ltr]" : ""}>{pillar.visual}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
