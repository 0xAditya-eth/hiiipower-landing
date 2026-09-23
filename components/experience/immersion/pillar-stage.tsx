"use client";

import Image from "next/image";
import React from "react";

/**
 * Conceptual stages for pillars 01–03 (feed uses the phone mockup separately).
 * Motion is scrubbed via --pillar-t / --pillar-local set by Immersion.
 */

function usePillarLocal() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [local, setLocal] = React.useState(0);
  const [t, setT] = React.useState(1);

  React.useEffect(() => {
    let raf = 0;
    const tick = () => {
      const host = rootRef.current?.parentElement;
      if (host) {
        const styles = getComputedStyle(host);
        const nextLocal = parseFloat(styles.getPropertyValue("--pillar-local")) || 0;
        const nextT = parseFloat(styles.getPropertyValue("--pillar-t")) || 0;
        setLocal(nextLocal);
        setT(nextT);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return { rootRef, local, t };
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

type GateActor = {
  id: string;
  label: string;
  lane: number;
  kind: "human" | "blocked";
  image: string;
  delay: number;
};

const GATE_ACTORS: GateActor[] = [
  { id: "bot", label: "Bot", lane: 28, kind: "blocked", image: "/gate-bot.svg", delay: 0.02 },
  {
    id: "human-a",
    label: "Human",
    lane: 46,
    kind: "human",
    image: "/face2.jpg",
    delay: 0.06,
  },
  { id: "brand", label: "Brand", lane: 64, kind: "blocked", image: "/gate-acme.svg", delay: 0.12 },
  {
    id: "human-b",
    label: "Human",
    lane: 82,
    kind: "human",
    image: "/face1.jpg",
    delay: 0.18,
  },
];

/**
 * Horizontal offset from the gate line, in % of the stage lane width.
 * Negative = other platforms. Positive = HiiiPower.
 */
function actorMotion(local: number, delay: number, kind: "human" | "blocked") {
  const p = smooth(clamp((local - delay) / 0.55, 0, 1));

  if (kind === "human") {
    const x = -38 + p * 72;
    return { x, opacity: 0.35 + p * 0.65, bounce: 0 };
  }

  const approach = clamp(p / 0.62, 0, 1);
  const bounce = smooth(clamp((p - 0.62) / 0.38, 0, 1));
  const x = -38 + approach * 36 - bounce * 30;
  return { x, opacity: 0.3 + approach * 0.5 - bounce * 0.15, bounce };
}

/** People — threshold: humans enter HiiiPower; bot/brand bounce back */
export function PeopleStage() {
  const { rootRef, local, t } = usePillarLocal();
  const lineGlow = smooth(clamp((local - 0.15) / 0.4, 0, 1));

  return (
    <div ref={rootRef} className="absolute inset-0">
      <div
        className="absolute right-0 top-0 h-full w-[58%]"
        style={{
          background:
            "radial-gradient(ellipse at 55% 50%, rgba(255,51,102,0.12), transparent 55%)",
          opacity: t * 0.9,
        }}
      />

      <div
        className="absolute inset-y-0 left-1/2 w-[min(92vw,420px)] -translate-x-1/2 pt-1 lg:inset-y-[12%] lg:left-auto lg:right-[7%] lg:w-[min(52vw,520px)] lg:translate-x-0 lg:pt-0"
        style={{ opacity: t }}
      >
        <div className="absolute inset-x-0 top-1 flex justify-between gap-4 px-1 lg:top-0">
          <p className="text-[9px] uppercase tracking-[0.22em] text-white/30 sm:text-[10px]">
            Other platforms
          </p>
          <p
            className="text-[9px] uppercase tracking-[0.22em] sm:text-[10px]"
            style={{ color: `rgba(255,51,102,${0.25 + lineGlow * 0.55})` }}
          >
            HiiiPower
          </p>
        </div>

        <div className="absolute bottom-2 top-7 left-[58%] w-px -translate-x-1/2 lg:top-8">
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-accent to-transparent"
            style={{
              opacity: 0.35 + lineGlow * 0.55,
              boxShadow: `0 0 ${18 + lineGlow * 28}px rgba(255,51,102,${0.25 + lineGlow * 0.4})`,
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
            style={{
              opacity: 0.5 + lineGlow * 0.5,
              boxShadow: `0 0 20px rgba(255,51,102,0.7)`,
            }}
          />
        </div>

        {GATE_ACTORS.map((actor) => {
          const m = actorMotion(local, actor.delay, actor.kind);
          const crossed = actor.kind === "human" && local > actor.delay + 0.4;

          return (
            <div
              key={actor.id}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 sm:gap-2"
              style={{
                top: `${actor.lane}%`,
                left: `calc(58% + ${m.x}%)`,
                opacity: m.opacity * t,
              }}
            >
              <div
                className="relative h-11 w-11 overflow-hidden rounded-full sm:h-14 sm:w-14 lg:h-16 lg:w-16"
                style={{
                  boxShadow: crossed
                    ? "0 0 28px rgba(255,51,102,0.45)"
                    : "0 0 0 transparent",
                  outline: crossed
                    ? "2px solid rgba(255,51,102,0.85)"
                    : "1px solid rgba(255,255,255,0.25)",
                  outlineOffset: 2,
                  transform: m.bounce > 0.05 ? `scale(${1 - m.bounce * 0.06})` : undefined,
                }}
              >
                {actor.image.endsWith(".svg") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={actor.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src={actor.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                )}
              </div>
              <span
                className="text-[9px] font-semibold uppercase tracking-[0.2em] sm:text-[10px]"
                style={{
                  color:
                    actor.kind === "human"
                      ? crossed
                        ? "#ff3366"
                        : "rgba(255,255,255,0.7)"
                      : "rgba(255,255,255,0.4)",
                }}
              >
                {actor.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const MOMENT_SLIDES = [
  { src: "/copenhagen.jpg", location: "Copenhagen", time: "09:14:22 CET" },
  { src: "/rajasthan.jpg", location: "Rajasthan", time: "17:03:41 IST" },
  { src: "/turkey.jpg", location: "Turkey", time: "16:42:07 TRT" },
] as const;

function momentSlideIndex(local: number) {
  // Spend presence lead outside; cycle three photos across the hold
  const t = clamp((local - 0.12) / 0.76, 0, 0.999);
  return Math.min(MOMENT_SLIDES.length - 1, Math.floor(t * MOMENT_SLIDES.length));
}

/** Moments — scroll-driven location photos */
export function MomentsStage() {
  const { rootRef, local, t } = usePillarLocal();
  const active = momentSlideIndex(local);
  const slide = MOMENT_SLIDES[active];
  const labelIn = smooth(clamp((local - 0.14) / 0.2, 0, 1));

  return (
    <div ref={rootRef} className="absolute inset-0">
      <div
        className="absolute right-0 top-0 h-full w-[60%]"
        style={{
          background:
            "radial-gradient(ellipse at 70% 38%, rgba(255,120,80,0.18), transparent 55%), radial-gradient(ellipse at 55% 78%, rgba(70,120,255,0.08), transparent 50%)",
          opacity: t * 0.95,
        }}
      />

      {/* Portrait 3:4 card — height-led so the slot never forces a square */}
      <div className="absolute inset-0 flex items-center justify-center lg:inset-y-auto lg:left-auto lg:right-[8%] lg:top-[10%] lg:block lg:h-[min(72vh,560px)] lg:w-[min(46vw,420px)]">
        <div
          className="relative aspect-[3/4] h-[min(88%,360px)] w-auto max-w-[min(64vw,240px)] overflow-hidden rounded-[1.35rem] border border-white/15 shadow-[0_40px_100px_rgba(0,0,0,0.55)] sm:rounded-[1.5rem] lg:aspect-auto lg:h-full lg:max-h-none lg:w-full lg:max-w-none lg:rounded-[1.6rem]"
          style={{
            opacity: t,
            transform: `translate3d(0, ${(1 - t) * 36}px, 0) scale(${0.92 + t * 0.08})`,
          }}
        >
        {MOMENT_SLIDES.map((m, i) => (
          <div
            key={m.src}
            className="absolute inset-0 origin-center"
            style={{
              opacity: i === active ? 1 : 0,
              transition: "opacity 0.45s ease",
              animation:
                i === active
                  ? "moments-kenburns 14s ease-in-out infinite alternate"
                  : undefined,
            }}
          >
            <Image
              src={m.src}
              alt={m.location}
              fill
              className="object-cover"
              sizes="420px"
              priority={i === 0}
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ opacity: t * 0.35 }}
        >
          <div
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent"
            style={{ animation: "moments-shimmer 5.5s ease-in-out infinite" }}
          />
        </div>

        <div
          className="absolute inset-x-0 bottom-0 flex justify-center p-3 sm:p-5"
          style={{
            opacity: labelIn * t,
            transform: `translate3d(0, ${(1 - labelIn) * 16}px, 0)`,
          }}
        >
          <div className="relative inline-flex overflow-hidden rounded-full p-[2px]">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0%, transparent 58%, #ff3366 72%, #ff3366 86%, transparent 100%)",
                animation: "moments-ring-spin 2.6s linear infinite",
              }}
            />

            <div className="relative z-10 inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-2 pr-3.5 text-zinc-900 shadow-lg sm:gap-2.5 sm:py-2 sm:pl-2.5 sm:pr-4">
              <span
                className="relative flex h-7 w-7 shrink-0 items-center justify-center sm:h-8 sm:w-8"
                style={{ animation: "moments-pin-pulse 2.4s ease-in-out infinite" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-rose-500 sm:h-5 sm:w-5"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12 2.25c-3.45 0-6.25 2.72-6.25 6.07 0 4.54 5.4 10.6 5.63 10.85a.85.85 0 0 0 1.24 0c.23-.25 5.63-6.31 5.63-10.85 0-3.35-2.8-6.07-6.25-6.07Zm0 8.35a2.28 2.28 0 1 1 0-4.56 2.28 2.28 0 0 1 0 4.56Z" />
                </svg>
              </span>
              <div className="min-w-0 leading-tight">
                <p className="text-[12px] font-bold tracking-tight sm:text-[13px]">{slide.location}</p>
                <p className="mt-0.5 font-mono text-[10px] tracking-[0.08em] text-zinc-500 sm:text-[11px]">
                  {slide.time}
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

const POWER_NODE = 80; // px — keep both circles identical
const POWER_NODE_R = POWER_NODE / 2;

/** Power — flow until lock completes, then trash-delete lines + Big Tech */
export function PowerStage() {
  const { rootRef, local, t } = usePillarLocal();

  // reveal → flow+lock together → lock full → trash delete → hold
  const reveal = smooth(clamp(local / 0.16, 0, 1));
  const lock = smooth(clamp((local - 0.18) / 0.28, 0, 1)); // full ~0.46
  const trash = smooth(clamp((local - 0.46) / 0.14, 0, 1)); // starts the instant lock completes
  const stopped = smooth(clamp((local - 0.56) / 0.12, 0, 1));

  // Flow runs from early reveal through the entire lock draw; cuts when trash starts
  const flow =
    smooth(clamp((local - 0.05) / 0.12, 0, 1)) * (1 - smooth(clamp((local - 0.46) / 0.04, 0, 1)));

  const worth = Math.round(reveal * 48200);

  const youCenterPct = 8 + trash * 42; // 8% → 50% as trash clears the right side
  const techCenterPct = 92;
  const trashActive = trash > 0.02;

  return (
    <div ref={rootRef} className="absolute inset-0">
      <div
        className="absolute right-0 top-0 h-full w-[58%]"
        style={{
          background:
            "radial-gradient(ellipse at 55% 48%, rgba(184,196,255,0.12), transparent 55%), radial-gradient(ellipse at 60% 70%, rgba(255,51,102,0.06), transparent 48%)",
          opacity: t * 0.95,
        }}
      />

      <div
        className="absolute inset-y-0 left-1/2 flex w-[min(92vw,420px)] -translate-x-1/2 flex-col justify-center lg:left-auto lg:right-[7%] lg:w-[min(52vw,520px)] lg:translate-x-0"
        style={{ opacity: t }}
      >
        <div
          className="text-center"
          style={{
            opacity: 0.25 + reveal * 0.75,
            transform: `translate3d(0, ${(1 - reveal) * 18}px, 0)`,
          }}
        >
          <p className="text-[9px] uppercase tracking-[0.28em] text-white/40 sm:text-[11px]">
            Average value extracted from a user
          </p>
          <p
            className="mt-1.5 font-display text-[clamp(1.85rem,9vw,4.5rem)] font-extrabold leading-none tracking-[-0.04em] tabular-nums text-white sm:mt-3"
            style={{
              textShadow:
                stopped > 0.3
                  ? `0 0 ${24 * stopped}px rgba(255,51,102,${0.3 * stopped})`
                  : undefined,
            }}
          >
            ${worth.toLocaleString()}
          </p>
        </div>

        <div
          className="relative mx-auto mt-5 h-28 w-full max-w-[480px] scale-[0.82] sm:mt-12 sm:h-44 sm:scale-100 lg:mt-14"
          style={{ opacity: 0.25 + reveal * 0.75 }}
        >
          {/* Lines + data flow — flow until lock is full, then trash out */}
          <div
            className="absolute top-1/2 flex -translate-y-1/2 flex-col justify-center gap-7"
            style={{
              left: `calc(${youCenterPct}% + ${POWER_NODE_R}px)`,
              right: `calc(${100 - techCenterPct}% + ${POWER_NODE_R}px)`,
              opacity: trashActive ? Math.max(0, 1 - trash * 1.4) : 1,
              pointerEvents: "none",
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="relative w-full origin-center overflow-visible"
                style={{
                  opacity: i === 1 ? 1 : 0.55,
                  height: i === 1 ? 2 : 1.5,
                  transform: trashActive
                    ? `scaleX(${1 - trash * 0.85}) translateY(${trash * (18 + i * 10)}px) rotate(${(i - 1) * trash * 10}deg)`
                    : undefined,
                  filter: trashActive ? `blur(${trash * 3.5}px)` : undefined,
                }}
              >
                <div
                  className="absolute inset-0 rounded-full bg-white/35"
                  style={{
                    backgroundImage:
                      flow > 0.05 && !trashActive
                        ? "repeating-linear-gradient(90deg, rgba(255,255,255,0.15) 0 10px, rgba(255,255,255,0.55) 10px 18px, rgba(255,255,255,0.15) 18px 28px)"
                        : trashActive
                          ? `repeating-linear-gradient(90deg, rgba(255,255,255,0.4) 0 5px, transparent 5px ${5 + trash * 16}px)`
                          : undefined,
                    backgroundSize: flow > 0.05 && !trashActive ? "40px 100%" : undefined,
                    animation:
                      flow > 0.05 && !trashActive
                        ? `power-flow-dash ${1.1 + i * 0.15}s linear infinite`
                        : undefined,
                    backgroundColor: flow > 0.05 || trashActive ? "transparent" : undefined,
                  }}
                />

                {flow > 0.05 &&
                  !trashActive &&
                  [0, 1].map((p) => (
                    <span
                      key={p}
                      className="pointer-events-none absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.75)]"
                      style={{
                        opacity: flow,
                        animation: `power-flow-packet ${1.35 + i * 0.12}s linear infinite`,
                        animationDelay: `${p * 0.55 + i * 0.18}s`,
                      }}
                    />
                  ))}
              </div>
            ))}
          </div>

          {/* You */}
          <div
            className="absolute top-1/2 z-10"
            style={{
              left: `${youCenterPct}%`,
              transform: "translate(-50%, -50%)",
              width: POWER_NODE,
              height: POWER_NODE,
            }}
          >
            <div className="relative flex h-full w-full items-center justify-center">
              <svg
                className="absolute inset-0 -rotate-90"
                viewBox="0 0 100 100"
                aria-hidden
              >
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1.5"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="#ff3366"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  pathLength={1}
                  style={{
                    strokeDasharray: 1,
                    strokeDashoffset: 1 - lock,
                    opacity: 0.35 + lock * 0.65,
                    filter:
                      lock > 0.2
                        ? `drop-shadow(0 0 ${10 + lock * 14}px rgba(255,51,102,0.55))`
                        : undefined,
                  }}
                />
              </svg>
              <div
                className="relative z-10 flex h-[56px] w-[56px] items-center justify-center rounded-full border bg-[#0a0a0a]/90"
                style={{
                  borderColor:
                    lock > 0.98 ? "rgba(255,51,102,0.85)" : "rgba(255,255,255,0.25)",
                  boxShadow:
                    lock > 0.3
                      ? `0 0 ${20 + lock * 28}px rgba(255,51,102,${0.2 + lock * 0.4})`
                      : undefined,
                }}
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80">
                  You
                </span>
              </div>
            </div>
          </div>

          {/* Big Tech — trash-deletes the moment lock completes */}
          <div
            className="absolute top-1/2"
            style={{
              left: `${techCenterPct}%`,
              width: POWER_NODE,
              height: POWER_NODE,
              opacity: trashActive ? Math.max(0, 1 - trash * 1.35) : 1,
              transform: trashActive
                ? `translate(-50%, calc(-50% + ${trash * 36}px)) scale(${1 - trash * 0.82}) rotate(${trash * 22}deg)`
                : "translate(-50%, -50%)",
              filter: trashActive ? `blur(${trash * 5}px)` : undefined,
            }}
          >
            <div
              className="flex h-full w-full flex-col items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-white/10 to-white/[0.03]"
              style={{
                boxShadow:
                  flow > 0.2 && !trashActive
                    ? `0 0 ${12 + flow * 18}px rgba(255,255,255,${0.08 + flow * 0.12})`
                    : undefined,
              }}
            >
              <span className="text-center text-[10px] font-semibold uppercase leading-tight tracking-[0.14em] text-white/55">
                Big
                <br />
                Tech
              </span>
            </div>
          </div>
        </div>

        <p
          className="mt-3 text-center text-[9px] font-semibold uppercase tracking-[0.28em] sm:mt-8 sm:text-[11px]"
          style={{
            opacity: 0.08 + stopped * 0.92,
            color: stopped > 0.25 ? "#ff3366" : "rgba(255,255,255,0.35)",
          }}
        >
          Extraction stopped
        </p>
      </div>
    </div>
  );
}

export const PILLAR_STAGES = [
  { id: "people", Stage: PeopleStage },
  { id: "moments", Stage: MomentsStage },
  { id: "power", Stage: PowerStage },
] as const;
