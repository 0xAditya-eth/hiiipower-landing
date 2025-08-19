"use client";

import React, { useEffect, RefObject } from "react";
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";

type Props = {
  containerRef?: RefObject<HTMLElement>;
};

export function DynamicBackground({ containerRef }: Props) {
  // Prefer container scroll if provided, else fallback to viewport scroll
  const { scrollYProgress: containerProgress } = useScroll({ container: containerRef });
  const { scrollYProgress: viewportProgress } = useScroll();
  const framerScroll = containerRef?.current ? containerProgress : viewportProgress;
  // Manual scroll progress to ensure responsiveness with custom scroll containers
  const manualProgress = useMotionValue(0);
  useEffect(() => {
    const el: HTMLElement | Window | null = containerRef?.current ?? window;
    if (!el) return;
    const update = () => {
      try {
        if (el instanceof Window) {
          const doc = document.documentElement;
          const scrollTop = window.scrollY || doc.scrollTop || 0;
          const max = (doc.scrollHeight - doc.clientHeight) || 1;
          manualProgress.set(Math.min(1, Math.max(0, scrollTop / max)));
        } else {
          const max = (el.scrollHeight - el.clientHeight) || 1;
          manualProgress.set(Math.min(1, Math.max(0, el.scrollTop / max)));
        }
      } catch {}
    };
    update();
    el.addEventListener('scroll', update, { passive: true } as AddEventListenerOptions);
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update as any);
      window.removeEventListener('resize', update);
    };
  }, [containerRef, manualProgress]);
  // Use manual signal primarily; fall back to framer's
  const scrollYProgress = manualProgress;

  // Scroll-driven color shifts (more aggressive)
  const hue1 = useTransform(scrollYProgress, [0, 1], [200, 360]);
  const hue2 = useTransform(scrollYProgress, [0, 1], [160, 320]);
  const hueRotate = useTransform(scrollYProgress, [0, 1], ["0deg", "360deg"]);

  // Pointer + scroll-driven gradient center (scroll weighted more than pointer)
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.35);
  const centerX = useTransform([x, scrollYProgress], ([xp, s]) => 0.5 + (xp - 0.5) * 0.2 + (s as number - 0.5) * 0.25);
  const centerY = useTransform([y, scrollYProgress], ([yp, s]) => 0.25 + (yp - 0.25) * 0.25 + (s as number) * 0.55);
  const xPct = useTransform(centerX, [0, 1], ["0%", "100%"]);
  const yPct = useTransform(centerY, [0, 1], ["0%", "100%"]);

  // Click pulse/scale
  const scale = useSpring(1, { stiffness: 120, damping: 16, mass: 0.3 });
  const time = useMotionValue(0);

  useEffect(() => {
    function handleMove(e: PointerEvent) {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      x.set(Math.min(1, Math.max(0, e.clientX / w)));
      y.set(Math.min(1, Math.max(0, e.clientY / h)));
    }
    function handleClick() {
      scale.set(1.045);
      const id = setTimeout(() => scale.set(1), 160);
      return () => clearTimeout(id);
    }
    let raf = 0;
    const loop = (ts: number) => {
      time.set(ts / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(raf);
    };
  }, [scale, x, y, time]);

  // Increase tint and contrast for clearer visibility
  const background = useMotionTemplate`radial-gradient(120vmax 120vmax at ${xPct} ${yPct}, hsl(${hue1} 70% 95% / 1), hsl(${hue2} 65% 96% / 1) 60%, #ffffff)`;

  // Parallax/oscillation for background blobs
  const blob1X = useTransform([x, time, scrollYProgress], ([xp, t, s]) => (xp - 0.5) * 100 + Math.sin(t * 0.6) * 24 + (s as number) * 150);
  const blob1Y = useTransform([y, time, scrollYProgress], ([yp, t, s]) => (yp - 0.5) * 90 + Math.cos(t * 0.4) * 22 + (s as number) * -250);
  const blob2X = useTransform([x, time, scrollYProgress], ([xp, t, s]) => (0.5 - xp) * 95 + Math.cos(t * 0.5) * 22 + (s as number) * -170);
  const blob2Y = useTransform([y, time, scrollYProgress], ([yp, t, s]) => (0.5 - yp) * 120 + Math.sin(t * 0.35) * 24 + (s as number) * 300);
  const blob3X = useTransform([x, time, scrollYProgress], ([xp, t, s]) => (xp - 0.5) * 80 + Math.sin(t * 0.25) * 20 + (s as number) * 100);
  const blob3Y = useTransform([y, time, scrollYProgress], ([yp, t, s]) => (yp - 0.5) * 80 + Math.cos(t * 0.2) * 20 + (s as number) * -180);

  const filterStr = useMotionTemplate`saturate(1.15) hue-rotate(${hueRotate})`;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background, scale, filter: filterStr }}
      />
      {/* Parallax blobs (higher opacity to be more visible) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-0 h-[55vmax] w-[55vmax] rounded-full"
        style={{
          x: blob1X,
          y: blob1Y,
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.98), rgba(200,220,255,0.88))",
          filter: "blur(28px)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-0 h-[45vmax] w-[45vmax] rounded-full"
        style={{
          x: blob2X,
          y: blob2Y,
          background: "radial-gradient(circle at 70% 60%, rgba(255,255,255,0.98), rgba(255,220,240,0.85))",
          filter: "blur(26px)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-0 h-[35vmax] w-[35vmax] rounded-full"
        style={{
          x: blob3X,
          y: blob3Y,
          background: "radial-gradient(circle at 40% 70%, rgba(255,255,255,0.98), rgba(230,245,255,0.85))",
          filter: "blur(24px)",
        }}
      />
    </>
  );
}


