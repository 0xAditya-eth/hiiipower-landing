"use client";

import React from "react";
import { ExperienceShell } from "@/components/experience/experience-shell";
import { HeroCascade } from "@/components/experience/motion";
import { LearnFeatures } from "@/components/experience/learn-more/features";
import { LearnWhyItMatters } from "@/components/experience/learn-more/why-it-matters";
import { LearnHowItWorks } from "@/components/experience/learn-more/how-it-works";
import { LearnCompare } from "@/components/experience/learn-more/compare";
import { LearnFaq } from "@/components/experience/learn-more/faq";
import { LearnCta } from "@/components/experience/learn-more/cta";

function scrollToJoin() {
  const el = document.getElementById("join");
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function LearnMorePage() {
  React.useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);

  return (
    <ExperienceShell onJoinFromMenu={scrollToJoin}>
      <main>
        <section className="px-5 pt-28 pb-16 sm:px-8 sm:pt-36 sm:pb-24 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <HeroCascade>
              <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                How HiiiPower works — and why.
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base">
                Features, the path in, a clear comparison, and answers to the
                questions people ask first.
              </p>
            </HeroCascade>
          </div>
        </section>

        <LearnFeatures />
        <LearnWhyItMatters />
        <LearnHowItWorks />
        <LearnCompare />
        <LearnFaq />
        <LearnCta />
      </main>
    </ExperienceShell>
  );
}
