"use client";

import { motion } from "framer-motion";

type BentoItem = {
  title: string;
  desc: string;
  icon: string;
  tag: string;
  className?: string;
};

const FEATURES: BentoItem[] = [
  {
    title: "Connect With Real Humans",
    desc: "Every conversation is with a verified person — not a bot or fake profile.",
    icon: "🤝",
    tag: "100% Human",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    title: "No Brands, No Ads",
    desc: "No corporate accounts, no influencer marketing, no sponsored content.",
    icon: "🚫",
    tag: "Ad-Free",
    className: "md:col-span-1",
  },
  {
    title: "Share Life as It Happens",
    desc: "Capture spontaneous moments right from your camera. Real-time only.",
    icon: "📸",
    tag: "Live capture",
    className: "md:col-span-1",
  },
  {
    title: "Trust What You See",
    desc: "Every post is location-verified. No fake vacation photos.",
    icon: "📍",
    tag: "Verified location",
    className: "md:col-span-1",
  },
  {
    title: "Zero Filters",
    desc: "No pressure to look perfect. Share your real face, your real day.",
    icon: "✨",
    tag: "Unfiltered",
    className: "md:col-span-1",
  },
  {
    title: "You Own Your Data",
    desc: "Control who sees your information. Even earn from it if you want.",
    icon: "⛓️",
    tag: "Data sovereignty",
    className: "md:col-span-2",
  },
  {
    title: "No Metrics Game",
    desc: "No likes to chase. No follower count to obsess over. Just be yourself.",
    icon: "💎",
    tag: "No vanity metrics",
    className: "md:col-span-1",
  },
  {
    title: "Real Conversations",
    desc: "Genuine dialogue — not just emoji reactions on curated posts.",
    icon: "💬",
    tag: "Authentic dialogue",
    className: "md:col-span-2",
  },
];

export function BentoGrid() {
  return (
    <section id="features" className="relative z-10 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            Built different, on purpose.
          </h2>
          <p className="mt-4 text-lg text-zinc-500 leading-relaxed">
            Nine principles that guide every decision we make — from identity to data ownership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
          {FEATURES.map((item, i) => (
            <motion.div
              key={item.title}
              className={`group relative rounded-2xl border border-zinc-200 bg-white p-6 sm:p-7 hover:border-zinc-300 hover:shadow-lg transition-all duration-300 ${item.className ?? ""}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-2xl" aria-hidden>{item.icon}</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 bg-zinc-50 px-2.5 py-1 rounded-full">
                  {item.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2 tracking-tight">{item.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
