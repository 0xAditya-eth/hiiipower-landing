"use client";

import Link from "next/link";

type JoinProps = {
  onJoin: () => void;
};

export function Join({ onJoin }: JoinProps) {
  return (
    <section
      id="join"
      className="relative overflow-hidden px-4 py-28 sm:px-6 sm:py-36 lg:px-8"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#060606_0%,#10080c_50%,#060606_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-line" />

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-accent">
          Early access
        </p>
        <h2 className="font-display mt-5 text-[clamp(2.4rem,7vw,5rem)] font-semibold leading-[1.02] tracking-tight">
          Ready to join
          <br />
          the real world?
        </h2>
        <p className="mx-auto mt-6 max-w-md text-muted">
          One email when we launch. No spam. No growth-hack drip campaigns.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onJoin}
            className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-sm font-semibold text-accent-ink transition hover:brightness-110"
          >
            Join the waitlist
          </button>
          <Link
            href="/ai-or-not"
            className="inline-flex items-center justify-center rounded-full border border-line px-8 py-4 text-sm font-medium text-foreground transition hover:border-foreground/40 hover:bg-white/5"
          >
            Play AI or Not
          </Link>
        </div>
      </div>
    </section>
  );
}
