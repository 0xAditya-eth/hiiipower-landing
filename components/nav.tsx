"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

const LINKS = [
  { href: "#pillars", label: "Pillars" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#compare", label: "Compare" },
  { href: "/ai-or-not", label: "Real or AI?" },
  { href: "/your-worth", label: "Your Worth" },
];

type NavProps = {
  onJoin: () => void;
  hideJoinButton?: boolean;
  minimalMode?: boolean;
};

export function Nav({ onJoin, hideJoinButton = false, minimalMode = false }: NavProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--paper)]/85 backdrop-blur-xl border-b border-[var(--line)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>

        {!minimalMode ? (
          <>
            <nav className="hidden lg:flex items-center gap-0.5">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://docs.hiiipower.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
              >
                Docs
              </a>
            </nav>

            <div className="flex items-center gap-2">
              {!hideJoinButton && (
                <Button size="sm" onClick={onJoin} className="hidden sm:inline-flex">
                  Join waitlist
                </Button>
              )}
              <button
                type="button"
                className="lg:hidden p-2 rounded-md text-[var(--muted)] hover:bg-black/[0.04]"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                  {menuOpen ? (
                    <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  ) : (
                    <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  )}
                </svg>
              </button>
            </div>
          </>
        ) : (
          <a
            href="https://docs.hiiipower.app"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
          >
            Docs
          </a>
        )}
      </div>

      {menuOpen && !minimalMode && (
        <div className="lg:hidden border-t border-[var(--line)] bg-[var(--paper)]/95 backdrop-blur-xl px-4 py-4 space-y-1">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-[var(--ink)] hover:bg-black/[0.04] rounded-md"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://docs.hiiipower.app"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2.5 text-sm font-medium text-[var(--ink)] hover:bg-black/[0.04] rounded-md"
          >
            Docs
          </a>
          {!hideJoinButton && (
            <Button size="sm" onClick={() => { setMenuOpen(false); onJoin(); }} className="w-full mt-2">
              Join waitlist
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
