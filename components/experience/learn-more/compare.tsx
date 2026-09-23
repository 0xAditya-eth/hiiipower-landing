"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Reveal,
  cinemaEase,
  cinemaViewport,
  staggerItemSoft,
} from "@/components/experience/motion";

type Row = {
  topic: string;
  traditional: { headline: string; detail: string };
  hiiipower: { headline: string; detail: string };
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
  expanded,
}: {
  type: "traditional" | "hiiipower";
  headline: string;
  detail: string;
  expanded: boolean;
}) {
  const isUs = type === "hiiipower";
  return (
    <div
      className={`px-3 py-3 sm:px-4 ${
        isUs ? "bg-accent/5" : "bg-white/[0.02]"
      }`}
    >
      <div className="flex items-start gap-2">
        <span
          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
            isUs ? "bg-accent/20 text-accent" : "bg-white/10 text-muted"
          }`}
          aria-hidden
        >
          {isUs ? "✓" : "✕"}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs leading-snug font-semibold text-white sm:text-sm">
            {headline}
          </p>
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.p
                initial={{ opacity: 0, height: 0, marginTop: 0, filter: "blur(6px)" }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  marginTop: 8,
                  filter: "blur(0px)",
                }}
                exit={{ opacity: 0, height: 0, marginTop: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.28, ease: cinemaEase }}
                className="overflow-hidden text-[11px] leading-relaxed text-white/50 sm:text-xs"
              >
                {detail}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function CompareRow({
  row,
  index,
  isExpanded,
  onActivate,
  onDeactivate,
  onTogglePin,
}: {
  row: Row;
  index: number;
  isExpanded: boolean;
  onActivate: (index: number) => void;
  onDeactivate: () => void;
  onTogglePin: (index: number) => void;
}) {
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);

  React.useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    );
  }, []);

  return (
    <motion.div
      variants={staggerItemSoft}
      custom={index}
      className={`grid cursor-pointer grid-cols-1 overflow-hidden rounded-xl border transition-colors sm:grid-cols-[140px_1fr_1fr] ${
        isExpanded
          ? "border-accent/40 bg-white/[0.06]"
          : "border-white/10 bg-white/[0.03] hover:border-white/20"
      }`}
      onMouseEnter={() => {
        if (!isTouchDevice) onActivate(index);
      }}
      onMouseLeave={() => {
        if (!isTouchDevice) onDeactivate();
      }}
      onClick={() => {
        if (isTouchDevice) onTogglePin(index);
      }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25, ease: cinemaEase }}
    >
      <div className="flex items-center border-b border-white/10 px-4 py-3 sm:border-r sm:border-b-0">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-white/40 uppercase">
          {row.topic}
        </p>
      </div>
      <div className="border-b border-white/10 sm:border-r sm:border-b-0">
        <CompareCell
          type="traditional"
          headline={row.traditional.headline}
          detail={row.traditional.detail}
          expanded={isExpanded}
        />
      </div>
      <div>
        <CompareCell
          type="hiiipower"
          headline={row.hiiipower.headline}
          detail={row.hiiipower.detail}
          expanded={isExpanded}
        />
      </div>
    </motion.div>
  );
}

export function LearnCompare() {
  const [active, setActive] = React.useState<number | null>(null);
  const [pinned, setPinned] = React.useState<number | null>(null);

  const expandedIndex = pinned ?? active;

  return (
    <section id="compare" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mb-12 max-w-2xl sm:mb-16">
          <Reveal y={16} blur>
            <p className="mb-3 text-[10px] font-semibold tracking-[0.28em] text-white/40 uppercase">
              Compare
            </p>
          </Reveal>
          <Reveal y={36} blur scale delay={0.08}>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Ordinary social vs HiiiPower.
            </h2>
          </Reveal>
          <Reveal y={16} delay={0.16}>
            <p className="mt-4 text-sm text-white/50 sm:text-base">
              Hover or tap a row to see the full contrast.
            </p>
          </Reveal>
        </div>

        <Reveal y={12} delay={0.1}>
          <div className="mb-3 hidden grid-cols-[140px_1fr_1fr] gap-0 px-1 sm:grid">
            <div />
            <p className="px-4 text-[10px] tracking-[0.2em] text-white/40 uppercase">
              Traditional
            </p>
            <p className="px-4 text-[10px] tracking-[0.2em] text-accent uppercase">
              HiiiPower
            </p>
          </div>
        </Reveal>

        <motion.div
          className="space-y-3"
          initial="hidden"
          whileInView="show"
          viewport={cinemaViewport}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.08, delayChildren: 0.1 },
            },
          }}
        >
          {ROWS.map((row, index) => (
            <CompareRow
              key={row.topic}
              row={row}
              index={index}
              isExpanded={expandedIndex === index}
              onActivate={setActive}
              onDeactivate={() => setActive(null)}
              onTogglePin={(i) => setPinned((p) => (p === i ? null : i))}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
