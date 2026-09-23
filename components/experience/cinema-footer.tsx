"use client";

import Link from "next/link";

export function CinemaFooter() {
  return (
    <footer className="border-t border-line px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-xl font-semibold tracking-tight">HiiiPower</p>
          <p className="mt-2 max-w-sm text-sm text-muted">
            The social network where authenticity wins.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          <Link href="/privacy" className="hover:text-foreground">
            Privacy
          </Link>
          <Link href="/tos" className="hover:text-foreground">
            Terms
          </Link>
          <Link href="/support" className="hover:text-foreground">
            Support
          </Link>
          <a
            href="https://docs.hiiipower.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            Docs
          </a>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-7xl text-xs text-muted/60">
        © {new Date().getFullYear()} HiiiPower Technologies Private Limited.
      </p>
    </footer>
  );
}
