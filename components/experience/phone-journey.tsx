"use client";

import React from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  animate,
  PanInfo,
} from "framer-motion";
import {
  FeedScreen,
  PeopleScreen,
  MomentsScreen,
  PowerScreen,
} from "@/components/experience/phone-screens";
import {
  GateOverlay,
  type JourneyGateId,
} from "@/components/experience/gates/gate-overlay";

export type Beat = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  body: string;
};

export const BEATS: Beat[] = [
  {
    id: "intro",
    index: "00",
    eyebrow: "The product",
    title: "A feed that feels like real life.",
    body: "No ranking game. No synthetic noise. Just people and moments — the way they happened.",
  },
  {
    id: "people",
    index: "01",
    eyebrow: "Pillar · People",
    title: "Every account is a verified human.",
    body: "No bots. No brand pages hijacking the room. One network of people who actually exist.",
  },
  {
    id: "moments",
    index: "02",
    eyebrow: "Pillar · Moments",
    title: "Live capture. Nothing else.",
    body: "No uploads from the camera roll. No edits. No filters. Presence, not performance.",
  },
  {
    id: "power",
    index: "03",
    eyebrow: "Pillar · Power",
    title: "Your data. Your attention. Your rules.",
    body: "No algorithm deciding what you see. No metrics turning friendship into a scoreboard.",
  },
];

/** Journey gates fire just before beats 1/2/3 (People / Moments / Power) */
const JOURNEY_GATES: { id: JourneyGateId; at: number }[] = [
  { id: "verify", at: 0.22 },
  { id: "capture", at: 0.47 },
  { id: "claim", at: 0.72 },
];

const SCREENS = [FeedScreen, PeopleScreen, MomentsScreen, PowerScreen];
const BEAT_COUNT = BEATS.length;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function sample(progress: number, values: number[]) {
  const max = values.length - 1;
  const scaled = clamp(progress, 0, 1) * max;
  const i = Math.floor(scaled);
  const f = scaled - i;
  if (i >= max) return values[max];
  return lerp(values[i], values[i + 1], smoothstep(0, 1, f));
}

type PhoneJourneyProps = {
  onJoin: () => void;
  entered: boolean;
};

export function PhoneJourney({ onJoin, entered }: PhoneJourneyProps) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const screenRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const copyRef = React.useRef<HTMLDivElement>(null);
  const targetProgress = React.useRef(0);
  const easedProgress = React.useRef(0);
  const rafRef = React.useRef<number | null>(null);
  const lastActive = React.useRef(-1);
  const unlockedGates = React.useRef<Record<JourneyGateId, boolean>>({
    verify: false,
    capture: false,
    claim: false,
  });

  const dragX = useMotionValue(0);
  const dragRotate = useMotionValue(0);
  const progressMV = useMotionValue(0);
  const phoneX = useMotionValue(40);
  const phoneY = useMotionValue(24);
  const phoneRotate = useMotionValue(8);
  const phoneScale = useMotionValue(0.9);
  const glowOpacity = useMotionValue(0.25);

  const [active, setActive] = React.useState(0);
  const [activeGate, setActiveGate] = React.useState<JourneyGateId | null>(null);

  const maxAllowedProgress = React.useCallback(() => {
    for (const g of JOURNEY_GATES) {
      if (!unlockedGates.current[g.id]) return g.at;
    }
    return 1;
  }, []);

  const applyVisuals = React.useCallback(
    (p: number) => {
      phoneX.set(sample(p, [28, 0, -12, 8, 0]));
      phoneY.set(sample(p, [32, 0, -10, 6, 0]));
      phoneRotate.set(sample(p, [7, -3.5, 2.5, -4, 0]));
      phoneScale.set(sample(p, [0.92, 1, 1.04, 0.98, 1]));
      glowOpacity.set(sample(p, [0.18, 0.5, 0.65, 0.45, 0.28]));
      progressMV.set(p);

      const scaled = p * BEAT_COUNT;
      const idx = clamp(Math.floor(scaled), 0, BEAT_COUNT - 1);

      for (let i = 0; i < BEAT_COUNT; i++) {
        const center = i + 0.5;
        const dist = Math.abs(scaled - center);
        let opacity = clamp(1 - dist * 1.4, 0, 1);
        if (i === idx) opacity = Math.max(opacity, 0.92);
        else opacity *= 0.25;

        const el = screenRefs.current[i];
        if (el) {
          el.style.opacity = String(opacity);
          el.style.transform = `translate3d(${(i - idx) * 14}px, 0, 0) scale(${
            i === idx ? 1 : 0.98
          })`;
          el.style.zIndex = i === idx ? "2" : "1";
        }
      }

      const local = scaled - idx;
      const edge = Math.min(local, 1 - local);
      const fade = edge < 0.14 ? smoothstep(0, 0.14, edge) : 1;
      if (copyRef.current) {
        copyRef.current.style.opacity = String(0.4 + fade * 0.6);
      }

      if (idx !== lastActive.current) {
        lastActive.current = idx;
        setActive(idx);
      }
    },
    [glowOpacity, phoneRotate, phoneScale, phoneX, phoneY, progressMV]
  );

  React.useEffect(() => {
    const syncFromScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      // Gate 0: cannot enter journey until Opening unlock
      if (!entered) {
        const journeyTop = window.scrollY + el.getBoundingClientRect().top;
        if (window.scrollY > journeyTop - 2) {
          window.scrollTo(0, Math.max(0, journeyTop - 2));
        }
        targetProgress.current = 0;
        setActiveGate(null);
        return;
      }

      const rect = el.getBoundingClientRect();
      const scrollable = Math.max(el.offsetHeight - window.innerHeight, 1);
      let traveled = clamp(-rect.top, 0, scrollable);
      let p = traveled / scrollable;

      const cap = maxAllowedProgress();
      const locked = JOURNEY_GATES.find((g) => !unlockedGates.current[g.id] && p >= g.at - 0.001);

      if (p > cap) {
        p = cap;
        const lockY = window.scrollY + rect.top + scrollable * cap;
        if (window.scrollY > lockY + 1) {
          window.scrollTo(0, lockY);
        }
      }

      targetProgress.current = p;

      if (locked && Math.abs(p - locked.at) < 0.02) {
        setActiveGate((prev) => prev ?? locked.id);
      } else if (!locked) {
        setActiveGate(null);
      }
    };

    syncFromScroll();
    applyVisuals(0);
    window.addEventListener("scroll", syncFromScroll, { passive: true });
    window.addEventListener("resize", syncFromScroll);
    return () => {
      window.removeEventListener("scroll", syncFromScroll);
      window.removeEventListener("resize", syncFromScroll);
    };
  }, [applyVisuals, entered, maxAllowedProgress]);

  React.useEffect(() => {
    const ease = 0.078;
    const tick = () => {
      const t = targetProgress.current;
      const cur = easedProgress.current;
      const next = Math.abs(t - cur) < 0.00012 ? t : cur + (t - cur) * ease;
      easedProgress.current = next;
      applyVisuals(next);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [applyVisuals]);

  React.useEffect(() => {
    return dragX.on("change", (v) => dragRotate.set(v / 20));
  }, [dragRotate, dragX]);

  const unlockGate = React.useCallback((gate: JourneyGateId) => {
    unlockedGates.current[gate] = true;
    setActiveGate(null);
    // Nudge slightly past the gate so scrubbing continues
    const el = sectionRef.current;
    if (!el) return;
    const gateDef = JOURNEY_GATES.find((g) => g.id === gate);
    if (!gateDef) return;
    const scrollable = el.offsetHeight - window.innerHeight;
    const absoluteTop = window.scrollY + el.getBoundingClientRect().top;
    const target = absoluteTop + scrollable * Math.min(1, gateDef.at + 0.04);
    window.scrollTo({ top: target, behavior: "smooth" });
  }, []);

  const scrollToBeat = React.useCallback(
    (index: number) => {
      if (!entered) return;
      const el = sectionRef.current;
      if (!el) return;
      const absoluteTop = window.scrollY + el.getBoundingClientRect().top;
      const scrollable = el.offsetHeight - window.innerHeight;
      const desired = (index + 0.45) / BEAT_COUNT;
      const targetP = Math.min(desired, maxAllowedProgress());
      window.scrollTo({
        top: absoluteTop + scrollable * targetP,
        behavior: "smooth",
      });
    },
    [entered, maxAllowedProgress]
  );

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (activeGate) {
      animate(dragX, 0, { type: "spring", stiffness: 420, damping: 36 });
      return;
    }
    const threshold = 64;
    if (info.offset.x < -threshold || info.velocity.x < -450) {
      scrollToBeat(Math.min(active + 1, BEAT_COUNT - 1));
    } else if (info.offset.x > threshold || info.velocity.x > 450) {
      scrollToBeat(Math.max(active - 1, 0));
    }
    animate(dragX, 0, { type: "spring", stiffness: 420, damping: 36 });
  };

  const beat = BEATS[active];
  const totalRotate = useMotionTemplate`${phoneRotate}deg`;

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative bg-background"
      style={{ height: `${BEAT_COUNT * 110}vh` }}
    >
      <div className="sticky top-0 flex h-[100svh] w-full items-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(255,51,102,0.09),transparent_55%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#060606_0%,transparent_18%,transparent_82%,#060606_100%)]" />
          <motion.div
            className="absolute right-[8%] top-1/2 h-[55vmin] w-[55vmin] -translate-y-1/2 rounded-full bg-accent/20 blur-[100px]"
            style={{ opacity: glowOpacity }}
          />
        </div>

        <div className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 lg:right-8 lg:flex">
          {BEATS.map((b, i) => (
            <button
              key={b.id}
              type="button"
              aria-label={b.eyebrow}
              onClick={() => scrollToBeat(i)}
              className="group flex items-center justify-end gap-3"
            >
              <span
                className={`font-display text-[10px] tracking-[0.2em] transition-colors ${
                  i === active ? "text-accent" : "text-white/25 group-hover:text-white/50"
                }`}
              >
                {b.index}
              </span>
              <span
                className={`block w-px transition-all duration-500 ${
                  i === active ? "h-10 bg-accent" : "h-5 bg-white/20 group-hover:bg-white/45"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="relative z-10 h-full w-full">
          <div className="absolute inset-0 flex items-center justify-center pt-8 lg:pt-0">
            <motion.div
              className="relative will-change-transform"
              style={{
                x: phoneX,
                y: phoneY,
                scale: phoneScale,
                rotate: totalRotate,
              }}
            >
              <motion.div
                className="absolute -inset-24 rounded-full bg-accent/15 blur-3xl"
                style={{ opacity: glowOpacity }}
                aria-hidden
              />

              <motion.div
                className="relative w-[220px] cursor-grab touch-pan-y active:cursor-grabbing sm:w-[260px] md:w-[290px] lg:w-[320px]"
                style={{ x: dragX, rotate: dragRotate }}
                drag={activeGate ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.14}
                onDrag={(_, info) => dragX.set(info.offset.x)}
                onDragEnd={onDragEnd}
              >
                <div className="relative rounded-[2.55rem] border-[6px] border-[#1c1c1c] bg-[#090909] p-[5px] shadow-[0_50px_120px_rgba(0,0,0,0.75)] ring-1 ring-white/10">
                  <div className="pointer-events-none absolute left-1/2 top-3 z-30 h-5 w-[84px] -translate-x-1/2 rounded-full bg-black" />
                  <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2rem] bg-black">
                    {SCREENS.map((Screen, i) => (
                      <div
                        key={BEATS[i].id}
                        ref={(el) => {
                          screenRefs.current[i] = el;
                        }}
                        className="absolute inset-0 will-change-[opacity,transform]"
                        style={{
                          opacity: i === 0 ? 1 : 0,
                          pointerEvents: "none",
                        }}
                      >
                        <Screen />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-16 z-10 px-4 sm:px-6 lg:inset-y-0 lg:bottom-auto lg:flex lg:max-w-xl lg:items-center lg:px-10 xl:px-16">
            <div className="pointer-events-auto rounded-2xl bg-background/70 p-5 backdrop-blur-md lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
              <div ref={copyRef} style={{ opacity: 1 }}>
                <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-muted">
                  <span className="font-display text-accent">{beat.index}</span>
                  <span className="h-px w-8 bg-line" />
                  <span>{beat.eyebrow}</span>
                </div>
                <h2 className="font-display max-w-md text-3xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  {beat.title}
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted sm:text-base">
                  {beat.body}
                </p>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onJoin}
                  className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition hover:brightness-110"
                >
                  Join the waitlist
                </button>
                <div className="flex gap-2">
                  {BEATS.map((b, i) => (
                    <button
                      key={b.id}
                      type="button"
                      aria-label={`Go to ${b.eyebrow}`}
                      onClick={() => scrollToBeat(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === active ? "w-10 bg-accent" : "w-1.5 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-xs tracking-wide text-muted/70">
                {activeGate
                  ? "Gate locked — complete the action"
                  : `Scroll to drive the phone · ${active + 1} / ${BEAT_COUNT}`}
              </p>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center px-6">
          <div className="h-[2px] w-full max-w-md overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full origin-left bg-accent"
              style={{ scaleX: progressMV }}
            />
          </div>
        </div>

        <GateOverlay gate={activeGate} onUnlock={unlockGate} />
      </div>
    </section>
  );
}
