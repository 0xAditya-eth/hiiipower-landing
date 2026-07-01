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

function CompareCell({
  type,
  headline,
  detail,
}: {
  type: "traditional" | "hiiipower";
  headline: string;
  detail: string;
}) {
  const isUs = type === "hiiipower";
  return (
    <div className={`h-full px-3 py-2.5 sm:px-4 sm:py-3 ${isUs ? "bg-emerald-50/50" : "bg-red-50/30"}`}>
      <p className="text-xs sm:text-sm font-semibold text-zinc-800 leading-snug mb-1">{headline}</p>
      <p className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed">{detail}</p>
    </div>
  );
}

export function Comparison() {
  return (
    <section id="compare" className="relative z-10 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div className="max-w-xl">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">The difference</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              Side by side with the apps you know.
            </h2>
          </div>
          <p className="text-sm text-zinc-500 max-w-sm sm:text-right leading-snug">
            A fundamentally different approach to every part of the experience.
          </p>
        </div>

        <motion.div
          className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
        >
          {/* Desktop table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <th className="w-[11%] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500" />
                  <th className="w-[44.5%] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-red-400">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-100 text-red-500 text-[10px]">✕</span>
                      Typical social apps
                    </span>
                  </th>
                  <th className="w-[44.5%] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-600">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-[10px]">✓</span>
                      HiiiPower
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={row.topic} className={i < ROWS.length - 1 ? "border-b border-zinc-100" : ""}>
                    <td className="align-top px-4 py-2.5 bg-zinc-50/80 border-r border-zinc-100">
                      <span className="text-xs font-bold text-zinc-800 leading-snug">{row.topic}</span>
                    </td>
                    <td className="align-top p-0 border-r border-zinc-100">
                      <CompareCell type="traditional" headline={row.traditional.headline} detail={row.traditional.detail} />
                    </td>
                    <td className="align-top p-0">
                      <CompareCell type="hiiipower" headline={row.hiiipower.headline} detail={row.hiiipower.detail} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile / tablet: compact stacked rows */}
          <div className="lg:hidden divide-y divide-zinc-200">
            {ROWS.map((row) => (
              <div key={row.topic} className="px-3 py-2.5 sm:px-4">
                <p className="text-xs font-bold text-zinc-800 mb-2">{row.topic}</p>
                <div className="grid sm:grid-cols-2 gap-2 rounded-lg overflow-hidden border border-zinc-200">
                  <div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-red-50 border-b border-zinc-200">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-100 text-red-500 text-[10px]">✕</span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-red-400">Typical</span>
                    </div>
                    <CompareCell type="traditional" headline={row.traditional.headline} detail={row.traditional.detail} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-50 border-b border-zinc-200">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-[10px]">✓</span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">HiiiPower</span>
                    </div>
                    <CompareCell type="hiiipower" headline={row.hiiipower.headline} detail={row.hiiipower.detail} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
