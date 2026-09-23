"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";

const FRAMES = [
  { src: "/face1.jpg", label: "Verified" },
  { src: "/golden-gate-park.jpg", label: "Live moment" },
  { src: "/face2.jpg", label: "Human" },
  { src: "/discover-feed.png", label: "The feed" },
  { src: "/face3.jpg", label: "Present" },
];

export function Presence() {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [80, -180]);

  return (
    <section ref={ref} className="relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto mb-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-accent">
          Presence over performance
        </p>
        <h2 className="font-display mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
          A feed should feel like somewhere you actually were.
          <span className="text-muted"> Not a highlight reel of strangers.</span>
        </h2>
      </div>

      <motion.div style={{ x }} className="flex gap-4 px-4 sm:gap-5 sm:px-6">
        {FRAMES.map((frame) => (
          <div
            key={frame.src + frame.label}
            className="relative h-[280px] w-[220px] shrink-0 overflow-hidden rounded-sm sm:h-[360px] sm:w-[280px] lg:h-[420px] lg:w-[320px]"
          >
            <Image
              src={frame.src}
              alt={frame.label}
              fill
              className="object-cover"
              sizes="320px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.2em] text-white/80">
              {frame.label}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
