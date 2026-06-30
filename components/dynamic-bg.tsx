"use client";

import React, { useEffect, RefObject } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";

type Props = {
  containerRef?: RefObject<HTMLElement | null>;
};

export function DynamicBackground({ containerRef }: Props) {
  const manualProgress = useMotionValue(0);

  useEffect(() => {
    const el: HTMLElement | Window | null = containerRef?.current ?? window;
    if (!el) return;
    const update = () => {
      try {
        if (el instanceof Window) {
          const doc = document.documentElement;
          const scrollTop = window.scrollY || doc.scrollTop || 0;
          const max = doc.scrollHeight - doc.clientHeight || 1;
          manualProgress.set(Math.min(1, Math.max(0, scrollTop / max)));
        } else {
          const max = el.scrollHeight - el.clientHeight || 1;
          manualProgress.set(Math.min(1, Math.max(0, el.scrollTop / max)));
        }
      } catch {}
    };
    update();
    el.addEventListener("scroll", update, { passive: true } as AddEventListenerOptions);
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update as EventListener);
      window.removeEventListener("resize", update);
    };
  }, [containerRef, manualProgress]);

  const scrollYProgress = manualProgress;

  const hue1 = useTransform(scrollYProgress, [0, 0.5, 1], [240, 270, 300]);
  const hue2 = useTransform(scrollYProgress, [0, 0.5, 1], [220, 250, 280]);
  const hueRotate = useTransform(scrollYProgress, [0, 1], ["0deg", "45deg"]);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.35);
  const centerX = useTransform([x, scrollYProgress], (vals) => {
    const [xp, s] = vals as [number, number];
    return 0.5 + (xp - 0.5) * 0.2 + (s - 0.5) * 0.25;
  });
  const centerY = useTransform([y, scrollYProgress], (vals) => {
    const [yp, s] = vals as [number, number];
    return 0.25 + (yp - 0.25) * 0.25 + s * 0.55;
  });
  const xPct = useTransform(centerX, [0, 1], ["0%", "100%"]);
  const yPct = useTransform(centerY, [0, 1], ["0%", "100%"]);

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
      scale.set(1.03);
      const id = setTimeout(() => scale.set(1), 200);
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

  const background = useMotionTemplate`radial-gradient(ellipse 120vmax 100vmax at ${xPct} ${yPct}, hsl(${hue1} 80% 97% / 1), hsl(${hue2} 70% 96% / 0.9) 50%, #fafafa)`;

  const blob1X = useTransform([x, time, scrollYProgress], (vals) => {
    const [xp, t, s] = vals as [number, number, number];
    return (xp - 0.5) * 80 + Math.sin(t * 0.5) * 30 + s * 120;
  });
  const blob1Y = useTransform([y, time, scrollYProgress], (vals) => {
    const [yp, t, s] = vals as [number, number, number];
    return (yp - 0.5) * 70 + Math.cos(t * 0.35) * 28 + s * -200;
  });
  const blob2X = useTransform([x, time, scrollYProgress], (vals) => {
    const [xp, t, s] = vals as [number, number, number];
    return (0.5 - xp) * 90 + Math.cos(t * 0.4) * 26 + s * -140;
  });
  const blob2Y = useTransform([y, time, scrollYProgress], (vals) => {
    const [yp, t, s] = vals as [number, number, number];
    return (0.5 - yp) * 100 + Math.sin(t * 0.3) * 28 + s * 250;
  });
  const blob3X = useTransform([x, time, scrollYProgress], (vals) => {
    const [xp, t, s] = vals as [number, number, number];
    return (xp - 0.5) * 60 + Math.sin(t * 0.2) * 22 + s * 80;
  });
  const blob3Y = useTransform([y, time, scrollYProgress], (vals) => {
    const [yp, t, s] = vals as [number, number, number];
    return (yp - 0.5) * 70 + Math.cos(t * 0.18) * 22 + s * -150;
  });

  const filterStr = useMotionTemplate`saturate(1.1) hue-rotate(${hueRotate})`;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background, scale, filter: filterStr }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-0 h-[60vmax] w-[60vmax] rounded-full"
        style={{
          x: blob1X,
          y: blob1Y,
          background:
            "radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.18), rgba(129, 140, 248, 0.08) 60%, transparent 80%)",
          filter: "blur(40px)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-0 h-[50vmax] w-[50vmax] rounded-full"
        style={{
          x: blob2X,
          y: blob2Y,
          background:
            "radial-gradient(circle at 70% 60%, rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.06) 60%, transparent 80%)",
          filter: "blur(36px)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-0 h-[40vmax] w-[40vmax] rounded-full"
        style={{
          x: blob3X,
          y: blob3Y,
          background:
            "radial-gradient(circle at 40% 70%, rgba(59, 130, 246, 0.12), rgba(99, 102, 241, 0.05) 60%, transparent 80%)",
          filter: "blur(32px)",
        }}
      />
      <div className="noise-overlay" aria-hidden />
    </>
  );
}
