"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  expanded,
}: {
  type: "traditional" | "hiiipower";
  headline: string;
  detail: string;
  expanded: boolean;
}) {
  const isUs = type === "hiiipower";
  return (
    <div className={`px-3 py-2.5 sm:px-4 sm:py-3 ${isUs ? "bg-emerald-50/50" : "bg-red-50/30"}`}>
      <div className="flex items-start gap-2">
        <span
          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
            isUs ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-500"
          }`}
          aria-hidden
        >
          {isUs ? "✓" : "✕"}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm font-semibold text-zinc-800 leading-snug">{headline}</p>
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.p
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden text-[11px] sm:text-xs text-zinc-500 leading-relaxed"
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
    // Detect if device supports touch
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      onActivate(index);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      onDeactivate();
    }
  };

  return (
    <div
      className={`border-b border-zinc-100 last:border-0 transition-colors ${
        isExpanded ? "bg-zinc-50/60" : "hover:bg-zinc-50/40"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className="w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-300"
        onClick={() => onTogglePin(index)}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        aria-expanded={isExpanded}
      >
        {/* Desktop layout */}
        <div className="hidden lg:grid grid-cols-[minmax(7rem,12%)_1fr_1fr]">
          <div className="flex items-center px-4 py-3 border-r border-zinc-100 bg-zinc-50/80">
            <span className="text-xs font-bold text-zinc-800">{row.topic}</span>
          </div>
          <CompareCell
            type="traditional"
            headline={row.traditional.headline}
            detail={row.traditional.detail}
            expanded={isExpanded}
          />
          <CompareCell
            type="hiiipower"
            headline={row.hiiipower.headline}
            detail={row.hiiipower.detail}
            expanded={isExpanded}
          />
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden px-3 py-2.5 sm:px-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-zinc-800">{row.topic}</span>
            <svg
              className={`ml-auto h-3.5 w-3.5 text-zinc-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="grid sm:grid-cols-2 gap-px rounded-lg overflow-hidden border border-zinc-200 bg-zinc-200">
            <CompareCell
              type="traditional"
              headline={row.traditional.headline}
              detail={row.traditional.detail}
              expanded={isExpanded}
            />
            <CompareCell
              type="hiiipower"
              headline={row.hiiipower.headline}
              detail={row.hiiipower.detail}
              expanded={isExpanded}
            />
          </div>
        </div>
      </button>
    </div>
  );
}

export function Comparison() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = React.useState<number | null>(null);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const scrollTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const activeIndex = pinnedIndex ?? (isScrolling ? null : hoveredIndex);

  function handleTogglePin(index: number) {
    setPinnedIndex((current) => (current === index ? null : index));
  }

  // Detect when user is scrolling to prevent hover expansion
  React.useEffect(() => {
    let isTouch = false;

    const handleTouchStart = () => {
      isTouch = true;
    };

    const handleScroll = () => {
      if (isTouch) return; // Don't interfere with touch scrolling
      
      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

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
            Hover or tap a topic to see the full comparison.
          </p>
        </div>

        <motion.div
          className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="hidden lg:grid grid-cols-[minmax(7rem,12%)_1fr_1fr] border-b border-zinc-200 bg-zinc-50">
            <div className="px-4 py-2.5" />
            <div className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-red-400 border-r border-zinc-200">
              Typical social apps
            </div>
            <div className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-600">
              HiiiPower
            </div>
          </div>

          {ROWS.map((row, i) => (
            <CompareRow
              key={row.topic}
              row={row}
              index={i}
              isExpanded={activeIndex === i}
              onActivate={setHoveredIndex}
              onDeactivate={() => setHoveredIndex(null)}
              onTogglePin={handleTogglePin}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
