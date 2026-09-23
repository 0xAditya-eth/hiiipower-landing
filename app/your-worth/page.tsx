"use client";

import React from "react";
import { ExperienceShell } from "@/components/experience/experience-shell";
import { HeroCascade } from "@/components/experience/motion";
import { DataWorthCalculator } from "@/components/data-worth-calculator";

export default function YourWorthPage() {
  return (
    <ExperienceShell>
      <main>
        <section className="px-5 pt-28 pb-12 sm:px-8 sm:pt-32 sm:pb-16 lg:px-12">
          <div className="mx-auto max-w-3xl text-center sm:text-left">
            <HeroCascade titleIndex={1}>
              <p className="mb-4 text-[10px] font-semibold tracking-[0.28em] text-white/40 uppercase">
                Your worth
              </p>
              <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                What&apos;s your data{" "}
                <span className="text-white/50">really worth?</span>
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/50 sm:text-base">
                Discover the commercial value tech platforms extract from your
                personal data. This calculator uses the Web3 Foundation&apos;s
                PDAV framework to estimate your digital footprint&apos;s value.
              </p>
            </HeroCascade>
          </div>
        </section>

        <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
          <div className="mx-auto max-w-3xl">
            <DataWorthCalculator />
          </div>
        </section>
      </main>
    </ExperienceShell>
  );
}
