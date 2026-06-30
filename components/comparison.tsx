"use client";

import { motion } from "framer-motion";

type Row = {
  topic: string;
  traditional: {
    headline: string;
    detail: string;
  };
  hiiipower: {
    headline: string;
    detail: string;
  };
};

const ROWS: Row[] = [
  {
    topic: "Mental health",
    traditional: {
      headline: "Every post is a performance",
      detail:
        "Public likes, follower counts, and comment ratios turn sharing into a scorecard. You constantly compare your real life to other people's edited highlights — and it wears you down.",
    },
    hiiipower: {
      headline: "Share without a scorecard",
      detail:
        "No public likes, no follower counts, no vanity metrics of any kind. You post because you want to share — not because you need validation from a number.",
    },
  },
  {
    topic: "Your attention",
    traditional: {
      headline: "Built to keep you scrolling",
      detail:
        "Algorithmic feeds surface whatever maximizes engagement — outrage, envy, FOMO. Ads and suggested posts appear every few swipes. The app wins when you can't put your phone down.",
    },
    hiiipower: {
      headline: "You decide when you're done",
      detail:
        "A chronological feed of people you actually know. No engagement algorithm, no autoplay tricks, no ads. You see what friends posted — then you close the app.",
    },
  },
  {
    topic: "Who you connect with",
    traditional: {
      headline: "Anyone can be anyone",
      detail:
        "Bots inflate engagement, fake profiles catfish real people, and brand accounts disguise themselves as users. You never fully know who's on the other side.",
    },
    hiiipower: {
      headline: "Every account is a verified human",
      detail:
        "One-time identity verification for every user. No bots, no fake accounts, no corporate or brand profiles. When you talk to someone, they're real.",
    },
  },
  {
    topic: "What you see",
    traditional: {
      headline: "Curated, filtered, and often fake",
      detail:
        "People upload old photos, apply filters, and stage moments. Location tags lie. Your feed is a highlight reel of things that often didn't happen the way they look.",
    },
    hiiipower: {
      headline: "Live, unfiltered, location-verified",
      detail:
        "Posts are captured in real time from the in-app camera — no gallery uploads, no filters, no editing. Every post is location-verified so you know it happened where they say it did.",
    },
  },
  {
    topic: "Your data",
    traditional: {
      headline: "Your life is the product",
      detail:
        "Platforms track what you watch, click, and linger on — then sell that profile to advertisers. Privacy settings are buried and constantly changing.",
    },
    hiiipower: {
      headline: "You own your information",
      detail:
        "Your data belongs to you. Control who sees it, export it, or delete it at any time. We don't sell your behavior to advertisers — because there are no ads.",
    },
  },
  {
    topic: "Conversations",
    traditional: {
      headline: "Reactions over real dialogue",
      detail:
        "Most interaction is a like, an emoji, or a one-line comment on a performative post. Deep conversation gets lost in the noise of content designed to go viral.",
    },
    hiiipower: {
      headline: "Talk to people, not audiences",
      detail:
        "Without metrics to chase or content to perform, interaction shifts back to genuine conversation — sharing moments with people you actually know.",
    },
  },
];

export function Comparison() {
  return (
    <section id="compare" className="relative z-10 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-3">The difference</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            Side by side with the apps you know.
          </h2>
          <p className="mt-4 text-lg text-zinc-500 leading-relaxed">
            Not small tweaks — a fundamentally different approach to every part of the experience.
          </p>
        </div>

        <div className="space-y-6">
          {ROWS.map((row, i) => (
            <motion.div
              key={row.topic}
              className="rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-sm"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <div className="px-5 sm:px-6 py-3.5 bg-zinc-50 border-b border-zinc-200">
                <h3 className="text-sm font-bold text-zinc-900">{row.topic}</h3>
              </div>

              <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200">
                {/* Traditional */}
                <div className="p-5 sm:p-6 bg-red-50/40">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-500 text-xs font-bold shrink-0"
                      aria-label="Not available on traditional social media"
                    >
                      ✕
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
                      Typical social apps
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-zinc-800 mb-2">{row.traditional.headline}</p>
                  <p className="text-sm text-zinc-500 leading-relaxed">{row.traditional.detail}</p>
                </div>

                {/* HiiiPower */}
                <div className="p-5 sm:p-6 bg-emerald-50/40">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-xs font-bold shrink-0"
                      aria-label="Available on HiiiPower"
                    >
                      ✓
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                      HiiiPower
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-zinc-800 mb-2">{row.hiiipower.headline}</p>
                  <p className="text-sm text-zinc-600 leading-relaxed">{row.hiiipower.detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
