"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type HeroProps = {
  onJoin: () => void;
};

export function Hero({ onJoin }: HeroProps) {
  return (
    <section className="relative z-10 pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div className="max-w-xl lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-600 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Now accepting waitlist signups
              </span>
            </motion.div>

            <motion.h1
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-zinc-900 leading-[1.08]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Social media,{" "}
              <span className="text-zinc-400">without the</span>{" "}
              bullshit.
            </motion.h1>

            <motion.p
              className="mt-6 text-lg sm:text-xl text-zinc-500 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              HiiiPower is a social network built on three pillars — real people, real moments, and real power over your data and attention.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <Button size="lg" onClick={onJoin}>
                Join the waitlist
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              >
                See how it works
              </Button>
            </motion.div>

            <motion.div
              className="mt-10 flex items-center gap-6 text-sm text-zinc-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Free to join
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                No spam, ever
              </div>
            </motion.div>
          </div>

          {/* Product preview */}
          <div className="relative lg:pl-8">
            <motion.div
              className="relative mx-auto w-full max-w-[340px]"
              initial={{ opacity: 0, y: 40, rotate: 2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-zinc-200/80 to-zinc-300/40 blur-2xl" aria-hidden />
              
              {/* Phone container */}
              <div className="relative rounded-[3rem] border-[8px] border-zinc-900 bg-zinc-900 p-2 shadow-2xl shadow-zinc-900/30">
                <div className="rounded-[2.25rem] overflow-hidden bg-white">
                  <Image
                    src="/discover-feed.png"
                    alt="HiiiPower Discover feed"
                    width={340}
                    height={735}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
