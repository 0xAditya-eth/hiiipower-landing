"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Pillar = {
  id: string;
  eyebrow: string;
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
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="space-y-3">
        {faces.map((person) => (
          <div key={person.name} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50">
            <Image
              src={person.image}
              alt={person.name}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-zinc-900 truncate">{person.name}</p>
              <p className="text-xs text-emerald-600 font-medium">✓ Verified human</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-zinc-100 text-center">
        <p className="text-xs text-zinc-400">0 bots detected in your network</p>
      </div>
    </div>
  );
}

function MomentsVisual() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
      <div className="h-40 relative">
        <Image
          src="/golden-gate-park.jpg"
          alt="Golden Gate Park, SF"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-xs font-medium text-white/90 bg-black/30 backdrop-blur-sm rounded-lg px-2.5 py-1.5 inline-block">
            📍 Golden Gate Park, SF
          </p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm font-semibold text-zinc-900">Captured just now</p>
        <p className="text-xs text-zinc-500 mt-1">No uploads. No edits. No filters.</p>
      </div>
    </div>
  );
}

function PowerVisual() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm space-y-3">
      {[
        { label: "Data ownership", value: "You", status: "active" },
        { label: "Feed algorithm", value: "None", status: "active" },
        { label: "Ad tracking", value: "Disabled", status: "active" },
        { label: "Public metrics", value: "Hidden", status: "active" },
      ].map((item) => (
        <div key={item.label} className="flex items-center justify-between py-2 border-b border-zinc-50 last:border-0">
          <span className="text-sm text-zinc-600">{item.label}</span>
          <span className="text-sm font-semibold text-zinc-900 bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full text-xs">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}

const PILLARS: Pillar[] = [
  {
    id: "people",
    eyebrow: "Pillar 01",
    title: "Real People",
    description: "Every account on HiiiPower belongs to a verified human. No bots inflating engagement, no fake profiles catfishing your friends, no brand accounts hijacking your feed.",
    bullets: ["One-time identity verification", "No corporate or brand accounts", "Ad-free, people-only feed"],
    visual: <PeopleVisual />,
  },
  {
    id: "moments",
    eyebrow: "Pillar 02",
    title: "Real Moments",
    description: "Posts are captured live from your camera — not uploaded from a gallery of curated photos. What you see is what actually happened, where it actually happened.",
    bullets: ["Live camera capture only", "Location-verified posts", "Zero filters or editing tools"],
    visual: <MomentsVisual />,
  },
  {
    id: "power",
    eyebrow: "Pillar 03",
    title: "Real Power",
    description: "Your data, your attention, your mental health — it all belongs to you. No addictive algorithms, no vanity metrics, no selling your life to advertisers.",
    bullets: ["You own your data", "Chronological feed, no algorithm", "No likes, followers count, or public metrics"],
    visual: <PowerVisual />,
  },
];

export function FeatureShowcase() {
  return (
    <section className="relative z-10 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
        {PILLARS.map((pillar, i) => {
          const reversed = i % 2 === 1;
          return (
            <motion.div
              key={pillar.id}
              id={pillar.id}
              className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${reversed ? "lg:[direction:rtl]" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <div className={reversed ? "lg:[direction:ltr]" : ""}>
                <p className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-3">{pillar.eyebrow}</p>
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight mb-4">
                  {pillar.title}
                </h3>
                <p className="text-lg text-zinc-500 leading-relaxed mb-6">{pillar.description}</p>
                <ul className="space-y-3">
                  {pillar.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-3 text-sm text-zinc-700">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-white text-[10px] shrink-0">✓</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={reversed ? "lg:[direction:ltr]" : ""}>
                {pillar.visual}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
