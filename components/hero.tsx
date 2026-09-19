"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type HeroProps = {
  onJoin: () => void;
};

export function Hero({ onJoin }: HeroProps) {
  return (
    <section className="relative z-10 min-h-[100svh] flex flex-col justify-end overflow-hidden">
      {/* Full-bleed product plane */}
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/golden-gate-park.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center animate-hero-drift saturate-[0.85] contrast-[1.05]"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/92 to-[var(--background)]/25 sm:via-[var(--background)]/88 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-[var(--background)]/40" />
        <div
          className="absolute inset-0 opacity-40 mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "160px 160px",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-2xl">
          <motion.p
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[var(--ink)] leading-[0.95]"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            HiiiPower
          </motion.p>

          <motion.h1
            className="mt-6 sm:mt-8 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[var(--ink)] leading-snug max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            Social media, without the bullshit.
          </motion.h1>

          <motion.p
            className="mt-4 sm:mt-5 text-base sm:text-lg text-[var(--muted)] leading-relaxed max-w-md"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
          >
            Verified humans. Live camera posts. Your data, your attention — yours.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35 }}
          >
            <Button size="lg" onClick={onJoin}>
              Join the waitlist
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() =>
                document.getElementById("pillars")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              See how it works
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Edge-bleed product strip on large screens */}
      <motion.div
        className="pointer-events-none absolute right-0 top-[18%] bottom-[12%] hidden lg:block w-[42%] xl:w-[46%]"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      >
        <div className="relative h-full w-full">
          <Image
            src="/discover-feed.png"
            alt=""
            fill
            className="object-cover object-top opacity-95"
            sizes="46vw"
            priority
          />
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--background)] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[var(--background)] to-transparent" />
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[var(--background)]/80 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
