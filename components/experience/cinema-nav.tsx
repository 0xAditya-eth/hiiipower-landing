"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

type CinemaNavProps = {
  onJoin: () => void;
};

export function CinemaNav({ onJoin }: CinemaNavProps) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-line bg-background/75 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <Image
            src="/icon2-inverted.png"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 rounded-md"
            priority
          />
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">
            HiiiPower
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          <a href="#journey" className="transition hover:text-foreground">
            Experience
          </a>
          <Link href="/your-worth" className="transition hover:text-foreground">
            Your Worth
          </Link>
          <Link href="/ai-or-not" className="transition hover:text-foreground">
            AI or Not
          </Link>
        </nav>

        <button
          type="button"
          onClick={onJoin}
          className="rounded-full border border-line px-4 py-2 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
        >
          Join waitlist
        </button>
      </div>
    </header>
  );
}
