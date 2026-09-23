"use client";

import React from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
  PanInfo,
} from "framer-motion";
import { Button } from "@/components/ui/button";

type Beat = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  cta?: boolean;
};

const BEATS: Beat[] = [
  {
    id: "intro",
    eyebrow: "HiiiPower",
    title: "Social media, without the bullshit.",
    description:
      "Swipe the phone — each screen is a pillar. Real people. Real moments. Real power.",
    cta: true,
  },
  {
    id: "people",
    eyebrow: "Pillar 01",
    title: "Real People",
    description:
      "Every account belongs to a verified human. No bots, no brand accounts, no fake engagement.",
  },
  {
    id: "moments",
    eyebrow: "Pillar 02",
    title: "Real Moments",
    description:
      "Live capture only. No uploads, no edits, no filters — just what happened, where it happened.",
  },
  {
    id: "power",
    eyebrow: "Pillar 03",
    title: "Real Power",
    description:
      "Your data, your attention, your rules. No algorithm deciding what you see.",
    cta: true,
  },
];

function FeedScreen() {
  return (
    <div className="relative h-full w-full bg-white">
      <Image
        src="/discover-feed.png"
        alt="HiiiPower discover feed"
        fill
        className="object-cover object-top"
        priority
        sizes="320px"
      />
    </div>
  );
}

function PeopleScreen() {
  const faces = [
    { name: "Alex Rivera", image: "/face1.jpg" },
    { name: "Sam Chen", image: "/face2.jpg" },
    { name: "Jordan Lee", image: "/face3.jpg" },
  ];

  return (
    <div className="flex h-full flex-col bg-zinc-50">
      <div className="flex items-center justify-between px-4 pb-2 pt-3">
        <span className="text-[10px] font-semibold text-zinc-900">9:41</span>
        <div className="h-4 w-16 rounded-full bg-zinc-900" />
        <div className="h-2.5 w-5 rounded-sm bg-zinc-900" />
      </div>
      <div className="px-4 pb-3">
        <p className="text-[10px] text-zinc-500">Network</p>
        <p className="text-sm font-bold text-zinc-900">Verified humans</p>
      </div>
      <div className="flex-1 space-y-2 overflow-hidden px-3">
        {faces.map((person) => (
          <div
            key={person.name}
            className="flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-white p-2.5"
          >
            <Image
              src={person.image}
              alt={person.name}
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-zinc-900">
                {person.name}
              </p>
              <p className="text-[10px] font-medium text-emerald-600">
                Verified human
              </p>
            </div>
          </div>
        ))}
        <div className="rounded-xl border border-dashed border-zinc-200 bg-white/60 px-3 py-4 text-center">
          <p className="text-[10px] text-zinc-400">0 bots in your network</p>
        </div>
      </div>
    </div>
  );
}

function MomentsScreen() {
  return (
    <div className="relative flex h-full flex-col bg-zinc-900">
      <Image
        src="/golden-gate-park.jpg"
        alt="Live moment"
        fill
        className="object-cover"
        sizes="320px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      <div className="relative z-10 flex items-center justify-between px-4 pb-2 pt-3">
        <span className="text-[10px] font-semibold text-white">9:41</span>
        <div className="flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
          <span className="text-[9px] font-medium text-white">LIVE</span>
        </div>
        <div className="h-2.5 w-5 rounded-sm bg-white/80" />
      </div>
      <div className="relative z-10 mt-auto p-4">
        <p className="text-xs font-medium text-white/90">Golden Gate Park, SF</p>
        <p className="mt-0.5 text-[10px] text-white/60">
          Captured just now · No filters
        </p>
      </div>
    </div>
  );
}

function PowerScreen() {
  const rows = [
    { label: "Data ownership", value: "You" },
    { label: "Feed algorithm", value: "None" },
    { label: "Ad tracking", value: "Off" },
    { label: "Public metrics", value: "Hidden" },
  ];

  return (
    <div className="flex h-full flex-col bg-zinc-50">
      <div className="flex items-center justify-between px-4 pb-2 pt-3">
        <span className="text-[10px] font-semibold text-zinc-900">9:41</span>
        <div className="h-4 w-16 rounded-full bg-zinc-900" />
        <div className="h-2.5 w-5 rounded-sm bg-zinc-900" />
      </div>
      <div className="px-4 pb-3">
        <p className="text-[10px] text-zinc-500">Controls</p>
        <p className="text-sm font-bold text-zinc-900">Your power</p>
      </div>
      <div className="flex-1 space-y-2 px-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between rounded-xl border border-zinc-200/80 bg-white px-3 py-2.5"
          >
            <span className="text-[11px] text-zinc-600">{row.label}</span>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const SCREENS = [FeedScreen, PeopleScreen, MomentsScreen, PowerScreen];

type PhoneStoryProps = {
  onJoin: () => void;
};

export function PhoneStory({ onJoin }: PhoneStoryProps) {
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);
  const dragX = useMotionValue(0);
  const phoneRotate = useTransform(dragX, [-200, 0, 200], [-8, 0, 8]);
  const phoneX = useTransform(dragX, [-200, 0, 200], [-28, 0, 28]);

  const goTo = React.useCallback(
    (next: number, dir: number) => {
      const clamped = Math.max(0, Math.min(BEATS.length - 1, next));
      if (clamped === index) return;
      setDirection(dir);
      setIndex(clamped);
    },
    [index]
  );

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 60;
    const velocity = info.velocity.x;
    if (info.offset.x < -threshold || velocity < -500) {
      goTo(index + 1, 1);
    } else if (info.offset.x > threshold || velocity > 500) {
      goTo(index - 1, -1);
    }
    animate(dragX, 0, { type: "spring", stiffness: 400, damping: 35 });
  };

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(index + 1, 1);
      if (e.key === "ArrowLeft") goTo(index - 1, -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, index]);

  const beat = BEATS[index];
  const Screen = SCREENS[index];

  return (
    <section className="relative z-10 flex min-h-[100svh] flex-col justify-center pt-24 pb-12 lg:pt-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-4 sm:px-6 lg:px-8">
        {/* Phone — center stage */}
        <div className="relative flex w-full justify-center">
          <div
            className="absolute -inset-10 rounded-[3rem] bg-gradient-to-br from-zinc-200/70 to-zinc-300/30 blur-3xl"
            aria-hidden
          />

          <motion.div
            className="relative w-full max-w-[220px] cursor-grab touch-pan-y active:cursor-grabbing sm:max-w-[240px]"
            style={{ x: phoneX, rotate: phoneRotate }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDrag={(_, info) => dragX.set(info.offset.x)}
            onDragEnd={onDragEnd}
            whileTap={{ scale: 0.985 }}
          >
            <div className="relative rounded-[2.75rem] border-[7px] border-zinc-900 bg-zinc-900 p-1.5 shadow-2xl shadow-zinc-900/25">
              <div className="pointer-events-none absolute left-1/2 top-3 z-20 h-5 w-[88px] -translate-x-1/2 rounded-full bg-zinc-900" />

              <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.15rem] bg-white">
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  <motion.div
                    key={beat.id}
                    className="absolute inset-0"
                    custom={direction}
                    initial={{ opacity: 0, x: direction >= 0 ? 56 : -56 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction >= 0 ? -56 : 56 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Screen />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copy + controls under phone */}
        <div className="relative w-full max-w-xl text-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={beat.id}
              custom={direction}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                {beat.eyebrow}
              </p>
              <h1 className="mt-2 text-3xl font-extrabold leading-[1.1] tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
                {beat.title}
              </h1>
              <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-zinc-500 sm:text-lg">
                {beat.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" onClick={onJoin}>
              Join the waitlist
            </Button>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => goTo(index - 1, -1)}
                disabled={index === 0}
                aria-label="Previous"
              >
                ←
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => goTo(index + 1, 1)}
                disabled={index === BEATS.length - 1}
                aria-label="Next"
              >
                →
              </Button>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="flex gap-2">
              {BEATS.map((b, i) => (
                <button
                  key={b.id}
                  type="button"
                  aria-label={`Go to ${b.title}`}
                  onClick={() => goTo(i, i > index ? 1 : -1)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-8 bg-zinc-900"
                      : "w-2 bg-zinc-300 hover:bg-zinc-400"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-zinc-400">
              Swipe phone · {index + 1}/{BEATS.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
