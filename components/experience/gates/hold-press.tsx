"use client";

import React from "react";
import { motion, useMotionValue } from "framer-motion";

type HoldPressProps = {
  durationMs?: number;
  label: string;
  hint?: string;
  onComplete: () => void;
  className?: string;
  size?: "md" | "lg";
};

/**
 * Press-and-hold gate control (Zero-style).
 * Works with pointer + touch. Releases reset progress.
 */
export function HoldPress({
  durationMs = 1200,
  label,
  hint = "Hold to continue",
  onComplete,
  className = "",
  size = "lg",
}: HoldPressProps) {
  const [holding, setHolding] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const progress = useMotionValue(0);
  const raf = React.useRef<number | null>(null);
  const start = React.useRef<number | null>(null);
  const completed = React.useRef(false);

  const stop = React.useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = null;
    start.current = null;
    if (!completed.current) {
      progress.set(0);
      setHolding(false);
    }
  }, [progress]);

  const tick = React.useCallback(
    (now: number) => {
      if (start.current == null) start.current = now;
      const t = Math.min(1, (now - start.current) / durationMs);
      progress.set(t);
      if (t >= 1) {
        if (!completed.current) {
          completed.current = true;
          setDone(true);
          setHolding(false);
          onComplete();
        }
        return;
      }
      raf.current = requestAnimationFrame(tick);
    },
    [durationMs, onComplete, progress]
  );

  const begin = React.useCallback(
    (e: React.PointerEvent) => {
      if (completed.current) return;
      e.preventDefault();
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
      setHolding(true);
      start.current = null;
      raf.current = requestAnimationFrame(tick);
    },
    [tick]
  );

  React.useEffect(() => () => stop(), [stop]);

  const dim = size === "lg" ? "h-36 w-36 sm:h-40 sm:w-40" : "h-28 w-28";

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <button
        type="button"
        aria-label={label}
        disabled={done}
        onPointerDown={begin}
        onPointerUp={stop}
        onPointerCancel={stop}
        onPointerLeave={stop}
        className={`relative ${dim} touch-none select-none rounded-full border border-line bg-surface/80 text-foreground shadow-[0_0_60px_rgba(255,51,102,0.12)] transition enabled:active:scale-[0.98] disabled:opacity-60`}
      >
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden>
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="rgba(242,241,236,0.12)"
            strokeWidth="2.5"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ pathLength: progress }}
          />
        </svg>
        <span className="relative z-10 px-4 text-center font-display text-sm font-semibold tracking-tight">
          {done ? "Unlocked" : holding ? "Hold…" : label}
        </span>
      </button>
      <p className="text-xs tracking-[0.18em] text-muted uppercase">
        {done ? "Continue" : hint}
      </p>
    </div>
  );
}
