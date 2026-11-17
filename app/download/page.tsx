"use client";

import React from "react";
import { ExperienceShell } from "@/components/experience/experience-shell";
import { HeroCascade } from "@/components/experience/motion";
import { EmailJoinForm } from "@/components/experience/email-join-form";
import { PLAY_STORE_LISTING_URL } from "@/lib/play-store";

const playButtonClass =
  "inline-flex cursor-pointer items-center justify-center rounded-full bg-accent px-7 py-3.5 text-base font-medium tracking-tight text-accent-ink transition-all duration-200 hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function scrollToWaitlist() {
  const el = document.getElementById("join");
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  const input = el.querySelector("input");
  if (input instanceof HTMLInputElement) {
    window.setTimeout(() => input.focus({ preventScroll: true }), 350);
  }
}

export default function DownloadPage() {
  React.useEffect(() => {
    if (window.location.hash !== "#join") return;
    const id = requestAnimationFrame(() => scrollToWaitlist());
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <ExperienceShell onJoinFromMenu={scrollToWaitlist}>
      <main>
        <section className="px-5 pt-28 pb-24 sm:px-8 sm:pt-36 sm:pb-32 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <HeroCascade>
              <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                Get HiiiPower
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-balance text-sm leading-relaxed text-white/50 sm:text-base">
                Real people. Live camera. No ads, no likes. Your data stays yours.
              </p>
            </HeroCascade>

            <div className="mt-10">
              <a
                href={PLAY_STORE_LISTING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={playButtonClass}
              >
                Get it on Google Play
              </a>
            </div>

            <p className="mx-auto mt-12 max-w-xl text-balance text-sm leading-relaxed text-white/50 sm:text-base">
              iOS is almost here. Join the waitlist and you&apos;ll be first in.
            </p>

            <div id="join" className="scroll-mt-24 mx-auto mt-6 flex justify-center">
              <EmailJoinForm />
            </div>

            <p className="mx-auto mt-8 max-w-md text-balance text-xs leading-relaxed text-white/40">
              Have an invite code? Enter it after you sign up in the app.
            </p>
          </div>
        </section>
      </main>
    </ExperienceShell>
  );
}
