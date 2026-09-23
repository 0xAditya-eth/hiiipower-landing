"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cinemaEase } from "@/components/experience/motion";
import { ResultsWaitlistActions } from "@/components/experience/results-waitlist-actions";
import {
  STORY,
  fillCinemaBackground,
  storyFont,
} from "@/lib/story-canvas";

const REGIONAL_VALUES = {
  usa: { central: 6563, conservative: 4594, expansive: 9188 },
  northAmerica: { central: 4643, conservative: 3250, expansive: 6500 },
  ukEurope: { central: 1604, conservative: 1123, expansive: 2246 },
  restOfWorld: { central: 265, conservative: 186, expansive: 371 },
  global: { central: 694, conservative: 486, expansive: 972 },
};

const REGIONS = [
  { value: "usa", label: "United States" },
  { value: "northAmerica", label: "Rest of North America" },
  { value: "ukEurope", label: "United Kingdom & Europe" },
  { value: "restOfWorld", label: "Rest of the World" },
  { value: "global", label: "Global Average" },
];

const USAGE_SCENARIOS = [
  {
    value: "conservative" as const,
    label: "Light User",
    description: "Casual browsing, low daily screen time",
    multiplier: 0.7,
  },
  {
    value: "central" as const,
    label: "Average User",
    description: "Standard daily usage across platforms",
    multiplier: 1.0,
  },
  {
    value: "expansive" as const,
    label: "Heavy User",
    description: "Constant connectivity, power user",
    multiplier: 1.4,
  },
];

type CalculationResult = {
  annual: number;
  lifetime: number;
  lifetimeInflationAdjusted: number;
  scenario: "conservative" | "central" | "expansive";
};

const getScenarioLabel = (
  scenario: "conservative" | "central" | "expansive"
): string => {
  const mapping = {
    conservative: "Light User",
    central: "Average User",
    expansive: "Heavy User",
  };
  return mapping[scenario];
};

function RegionSelect({
  value,
  onChange,
}: {
  value: keyof typeof REGIONAL_VALUES;
  onChange: (v: keyof typeof REGIONAL_VALUES) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = REGIONS.find((r) => r.value === value) ?? REGIONS[4];

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <motion.button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        whileTap={{ scale: 0.985 }}
        className="flex w-full items-center justify-between rounded-full border border-white/15 bg-[#050505] px-4 py-3 text-left text-white transition-colors hover:border-white/30 focus:border-accent focus:outline-none"
      >
        <span>{selected.label}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.35, ease: cinemaEase }}
          className="ml-3 text-white/50"
          aria-hidden
        >
          ▾
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.98, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, scale: 0.98, filter: "blur(4px)" }}
            transition={{ duration: 0.28, ease: cinemaEase }}
            className="absolute z-30 mt-2 max-h-64 w-full overflow-auto border border-white/15 bg-[#0a0a0a] py-1 shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
          >
            {REGIONS.map((r, i) => {
              const active = r.value === value;
              return (
                <motion.li
                  key={r.value}
                  role="option"
                  aria-selected={active}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.03,
                    duration: 0.25,
                    ease: cinemaEase,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      onChange(r.value as keyof typeof REGIONAL_VALUES);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors ${
                      active
                        ? "bg-accent/15 text-accent"
                        : "text-white/80 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    {r.label}
                    {active && (
                      <motion.span
                        layoutId="region-check"
                        className="text-accent"
                      >
                        ✓
                      </motion.span>
                    )}
                  </button>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function YearsSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const min = 1;
  const max = 25;
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-4">
      <div className="relative flex h-8 items-center">
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-accent"
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={{ type: "spring", stiffness: 420, damping: 36 }}
          />
        </div>
        <motion.div
          className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-accent bg-[#050505] shadow-[0_0_0_4px_rgba(255,51,102,0.15)]"
          initial={false}
          animate={{ left: `calc(${pct}% - 8px)` }}
          transition={{ type: "spring", stiffness: 420, damping: 36 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-label="Years active online"
        />
      </div>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
            transition={{ duration: 0.22, ease: cinemaEase }}
            className="font-display text-2xl font-semibold text-white"
          >
            {value} years
          </motion.span>
        </AnimatePresence>
        <span className="text-sm text-white/50">
          Roughly how many years have you been using the internet regularly?
        </span>
      </div>
    </div>
  );
}

export function DataWorthCalculator() {
  const [region, setRegion] = useState<keyof typeof REGIONAL_VALUES>("global");
  const [yearsActive, setYearsActive] = useState(10);
  const [usageScenario, setUsageScenario] = useState<
    "conservative" | "central" | "expansive"
  >("central");
  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const resultHeroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };
    handleChange(mediaQuery);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (showResults && resultHeroRef.current) {
      setTimeout(() => {
        resultHeroRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [showResults]);

  const calculateWorth = () => {
    setIsCalculating(true);

    setTimeout(() => {
      const regionalBase = REGIONAL_VALUES[region];
      const baseAnnualValue = regionalBase[usageScenario];
      const annualValue = baseAnnualValue * 1.0;
      const years = Math.min(yearsActive, 25);
      const inflationRate = 0.03;

      const lifetimeInflated = Array.from({ length: years }, (_, i) => {
        const yearsAgo = years - 1 - i;
        return annualValue * Math.pow(1 + inflationRate, yearsAgo);
      }).reduce((sum, val) => sum + val, 0);

      const calculatedResult: CalculationResult = {
        annual: Math.round(annualValue),
        lifetime: Math.round(annualValue * years),
        lifetimeInflationAdjusted: Math.round(lifetimeInflated),
        scenario: usageScenario,
      };

      setResult(calculatedResult);
      setIsCalculating(false);
      setShowResults(true);
    }, 2500);
  };

  const resetCalculator = () => {
    setShowResults(false);
    setResult(null);
  };

  const shareToTwitter = () => {
    const text = `Turns out Big Tech has extracted an estimated $${result?.lifetime.toLocaleString()} from my data so far.

Curious if anyone on my timeline is worth more to platforms than me.

Find out what your data is worth 👇`;
    const url = "https://www.hiiipower.app/your-worth";
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareToLinkedIn = () => {
    const text = `Turns out Big Tech has extracted an estimated $${result?.lifetime.toLocaleString()} from my data so far.

Curious if anyone on my timeline is worth more to platforms than me.

Find out what your data is worth 👇

https://www.hiiipower.app/your-worth`;
    window.open(
      `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const generateStoryImage = (): Promise<Blob> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      canvas.width = STORY.width;
      canvas.height = STORY.height;
      const ctx = canvas.getContext("2d")!;

      fillCinemaBackground(ctx);
      ctx.textAlign = "center";

      ctx.fillStyle = STORY.fg;
      ctx.font = storyFont("800", 56, "display");
      ctx.fillText("Find your data's worth.", 540, 300);

      ctx.fillStyle = STORY.muted;
      ctx.font = storyFont("500", 34, "body");
      ctx.fillText("What Big Tech made off your data.", 540, 380);

      ctx.fillStyle = STORY.accent;
      ctx.font = storyFont("800", 160, "display");
      ctx.fillText(`$${result?.lifetime.toLocaleString()}`, 540, 700);

      ctx.fillStyle = STORY.fg;
      ctx.font = storyFont("500", 40, "body");
      ctx.fillText("Turns out Big Tech has extracted this", 540, 900);
      ctx.fillText("from my data so far.", 540, 960);
      ctx.fillText("Curious if anyone on my timeline is", 540, 1100);
      ctx.fillText("worth more to platforms than me.", 540, 1160);

      ctx.fillStyle = STORY.muted;
      ctx.font = storyFont("600", 28, "body");
      ctx.fillText("hiiipower.app/your-worth", 540, 1700);

      canvas.toBlob((blob) => {
        resolve(blob!);
      }, "image/png");
    });
  };

  const shareToInstagram = async () => {
    try {
      const blob = await generateStoryImage();
      const file = new File([blob], "data-worth-story.png", {
        type: "image/png",
      });

      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: "Find your data's worth.",
          text: `Turns out Big Tech has extracted an estimated $${result?.lifetime.toLocaleString()} from my data so far.`,
        });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "data-worth-story.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error sharing to Instagram:", error);
      const blob = await generateStoryImage();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "data-worth-story.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  if (showResults && result) {
    const cards = [
      {
        label: "Annual value",
        value: result.annual,
        sub: "Per year",
        accent: false,
      },
      {
        label: "Lifetime so far",
        value: result.lifetime,
        sub: `Over ${yearsActive} years (nominal)`,
        accent: false,
      },
      {
        label: "Lifetime so far (inflation-adj)",
        value: result.lifetimeInflationAdjusted,
        sub: "In today's dollars (3% inflation)",
        accent: true,
      },
    ];

    return (
      <div className="space-y-6">
        <motion.div
          ref={resultHeroRef}
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: cinemaEase }}
          className="border border-white/10 bg-white/[0.03] px-6 py-10 text-center sm:px-10 sm:py-14"
          style={{ scrollMarginTop: "6rem" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.5, ease: cinemaEase }}
            className="mb-4 text-[10px] font-semibold tracking-[0.28em] text-white/40 uppercase"
          >
            Your data&apos;s commercial value
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40, filter: "blur(14px)", scale: 0.9 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={{ delay: 0.2, duration: 0.9, ease: cinemaEase }}
            className="font-display text-4xl font-semibold tracking-tight text-accent sm:text-5xl lg:text-6xl"
          >
            ${result.lifetime.toLocaleString()}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.55, ease: cinemaEase }}
            className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/50 sm:text-base"
          >
            Your personal data has generated an estimated{" "}
            <span className="font-semibold text-white">
              ${result.lifetime.toLocaleString()}
            </span>{" "}
            in commercial value so far based on{" "}
            {getScenarioLabel(result.scenario)} usage patterns.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.35 + i * 0.1,
                duration: 0.55,
                ease: cinemaEase,
              }}
              className={`border bg-white/[0.03] p-6 transition-colors hover:border-white/20 ${
                card.accent ? "border-accent/40" : "border-white/10"
              }`}
            >
              <p
                className={`mb-2 text-[10px] font-semibold tracking-[0.2em] uppercase ${
                  card.accent ? "text-accent" : "text-white/40"
                }`}
              >
                {card.label}
              </p>
              <p className="font-display text-2xl font-semibold text-white">
                ${card.value.toLocaleString()}
              </p>
              <p className="mt-2 text-sm text-white/50">{card.sub}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: cinemaEase }}
          className="border border-white/10 bg-white/[0.03] px-6 py-10 sm:px-10"
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-[10px] font-semibold tracking-[0.28em] text-accent uppercase">
              Take back control
            </p>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Take back control of your data
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/50 sm:text-base">
              While you can&apos;t claim this money from tech companies,{" "}
              <span className="font-semibold text-white">
                you can stop them from extracting more
              </span>
              . HiiiPower helps you take back control and start earning your
              data&apos;s worth going forward. Join a social network where you
              own your data, control your privacy, and keep the value you create.
            </p>
            <ResultsWaitlistActions joinLabel="Join the Waitlist" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.55, ease: cinemaEase }}
          className="border border-white/10 bg-white/[0.03] px-6 py-8 text-center sm:px-8"
        >
          <h3 className="font-display mb-4 text-lg font-semibold text-white">
            Share your results
          </h3>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button variant="primary" size="md" onClick={shareToTwitter}>
              Share to X/Twitter
            </Button>
            {isMobile ? (
              <Button variant="secondary" size="md" onClick={shareToInstagram}>
                Share to Instagram
              </Button>
            ) : (
              <Button variant="secondary" size="md" onClick={shareToLinkedIn}>
                Share to LinkedIn
              </Button>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.5, ease: cinemaEase }}
          className="border border-white/10 bg-white/[0.02] px-6 py-6 sm:px-8"
        >
          <div className="space-y-3">
            <p className="text-sm leading-relaxed text-white/50">
              <span className="font-semibold text-white">
                Important Disclaimer:
              </span>{" "}
              These figures represent estimated commercial value extracted by
              tech corporations based on the Web3 Foundation PDAV framework, not
              funds directly redeemable or owed to you.
            </p>
            <p className="text-sm text-white/50">
              Based on{" "}
              <a
                href="https://web3.foundation"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white transition-colors hover:text-accent"
              >
                Web3 Foundation
              </a>{" "}
              &quot;The Hidden Price of Free: What Your Data Is Really Worth&quot;
              (May 2026) — Personal Data Annual Value (PDAV) framework.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.45, ease: cinemaEase }}
          className="text-center"
        >
          <Button variant="ghost" size="lg" onClick={resetCalculator}>
            ← Recalculate
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: "blur(10px)", scale: 0.97 }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      transition={{ duration: 0.75, delay: 0.2, ease: cinemaEase }}
      className="border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:p-10"
    >
      <div className="space-y-8">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.55, ease: cinemaEase }}
          >
            <label className="mb-3 block text-sm font-semibold text-white">
              Country / Region <span className="text-accent">*</span>
            </label>
            <RegionSelect value={region} onChange={setRegion} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.55, ease: cinemaEase }}
          >
            <label className="mb-3 block text-sm font-semibold text-white">
              Years Active Online <span className="text-accent">*</span>
            </label>
            <YearsSlider value={yearsActive} onChange={setYearsActive} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.55, ease: cinemaEase }}
          >
            <label className="mb-3 block text-sm font-semibold text-white">
              Your Usage Level <span className="text-accent">*</span>
            </label>
            <p className="mb-4 text-sm text-white/50">
              Select the usage pattern that best describes your online activity
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {USAGE_SCENARIOS.map((option, i) => {
                const selected = usageScenario === option.value;
                return (
                  <motion.label
                    key={option.value}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.62 + i * 0.08,
                      duration: 0.5,
                      ease: cinemaEase,
                    }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.985 }}
                    className={`relative flex cursor-pointer flex-col border p-4 transition-colors ${
                      selected
                        ? "border-accent bg-white/[0.04]"
                        : "border-white/10 hover:border-white/25"
                    }`}
                  >
                    <input
                      type="radio"
                      name="usage"
                      value={option.value}
                      checked={selected}
                      onChange={() => setUsageScenario(option.value)}
                      className="sr-only"
                    />
                    {selected && (
                      <motion.span
                        layoutId="usage-glow"
                        className="pointer-events-none absolute inset-0 border border-accent/50 bg-accent/[0.04]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative mb-1 text-sm font-semibold text-white">
                      {option.label}
                    </span>
                    <span className="relative text-xs text-white/50">
                      {option.description}
                    </span>
                  </motion.label>
                );
              })}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.5, ease: cinemaEase }}
          className="pt-2"
        >
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.985 }}>
            <Button
              size="lg"
              onClick={calculateWorth}
              className="w-full"
              disabled={isCalculating}
            >
              {isCalculating ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="h-5 w-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Calculating...
                </span>
              ) : (
                "Calculate My Data's Worth"
              )}
            </Button>
          </motion.div>
          <p className="mt-4 text-center text-xs text-white/40">
            All calculations are performed 100% client-side. No data is collected
            or stored.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
