"use client";

import React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

type SiteMenuProps = {
  onJoin: () => void;
  /** Optional class for the trigger button (Immersion uses white chrome). */
  triggerClassName?: string;
};

type MenuLink =
  | { label: string; href: string; external?: boolean }
  | { label: string; action: "join" };

const MENU_GROUPS: { heading?: string; links: MenuLink[] }[] = [
  {
    links: [
      { label: "Home", href: "/" },
      { label: "Learn More", href: "/learn-more" },
      { label: "Your Worth", href: "/your-worth" },
      { label: "AI or Not", href: "/ai-or-not" },
      { label: "Join waitlist", action: "join" },
    ],
  },
  {
    heading: "Resources",
    links: [
      {
        label: "Documentation",
        href: "https://docs.hiiipower.app",
        external: true,
      },
      { label: "Terms of Service", href: "/tos" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    heading: "Connect",
    links: [
      {
        label: "Instagram",
        href: "https://instagram.com/hiiipower_app",
        external: true,
      },
      {
        label: "X (Twitter)",
        href: "https://x.com/hiiipower_zk",
        external: true,
      },
      { label: "Support", href: "/support" },
    ],
  },
];

const ease = [0.22, 1, 0.36, 1] as const;
const morph = { type: "spring" as const, stiffness: 480, damping: 38, mass: 0.8 };

const defaultTriggerClass =
  "inline-flex min-w-[4.75rem] items-center justify-center rounded-full border border-white/20 px-4 py-2 text-xs tracking-wide text-white/80 transition-[border-color,color] duration-300 hover:border-accent hover:text-accent";

export function SiteMenu({ onJoin, triggerClassName }: SiteMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const triggerWrapRef = React.useRef<HTMLSpanElement>(null);
  const [anchor, setAnchor] = React.useState({
    top: 0,
    left: 0,
    width: 76,
    height: 34,
  });

  const measure = React.useCallback(() => {
    const el = triggerWrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setAnchor({
      top: r.top,
      left: r.left,
      width: r.width,
      height: r.height,
    });
  }, []);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [measure, open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const openMenu = () => {
    measure();
    setOpen(true);
  };

  const close = () => setOpen(false);

  const handleJoin = () => {
    close();
    onJoin();
  };

  const btnClass = triggerClassName ?? defaultTriggerClass;

  const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
  const panelWidth = Math.min(300, vw - 24);
  const panelLeft = Math.max(12, anchor.left + anchor.width - panelWidth);
  const panelTop = Math.max(12, anchor.top);

  const overlay =
    mounted &&
    createPortal(
      <AnimatePresence>
        {open && (
          <motion.div key="menu-layer" className="contents">
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-[200] cursor-default bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease }}
              onClick={close}
            />

            <motion.div
              layoutId="site-menu-shell"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="fixed z-[201] overflow-hidden border border-line bg-surface text-foreground shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
              style={{
                top: panelTop,
                left: panelLeft,
                width: panelWidth,
                borderRadius: 16,
              }}
              transition={morph}
            >
              <div className="relative px-4 pt-3 pb-4">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div>
                    <p className="font-display text-sm font-semibold tracking-tight">
                      HiiiPower
                    </p>
                    <p className="mt-1 max-w-[12rem] text-[11px] leading-snug text-muted">
                      Built for humans.
                    </p>
                  </div>
                  <span
                    className={`${btnClass} pointer-events-none select-none !min-w-[4.75rem] shrink-0 opacity-90`}
                    aria-hidden
                  >
                    Close
                  </span>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="space-y-4"
                >
                  {MENU_GROUPS.map((group, gi) => (
                    <div key={group.heading ?? `group-${gi}`}>
                      {group.heading ? (
                        <h4 className="mb-1.5 text-[9px] font-semibold tracking-[0.22em] text-muted uppercase">
                          {group.heading}
                        </h4>
                      ) : null}
                      <ul className="space-y-1">
                        {group.links.map((link) => (
                          <li key={link.label}>
                            {"action" in link ? (
                              <button
                                type="button"
                                onClick={handleJoin}
                                className="block py-0.5 text-left text-[13px] text-foreground/85 transition-colors hover:text-accent"
                              >
                                {link.label}
                              </button>
                            ) : link.external ? (
                              <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={close}
                                className="block py-0.5 text-[13px] text-foreground/85 transition-colors hover:text-accent"
                              >
                                {link.label}
                              </a>
                            ) : (
                              <Link
                                href={link.href}
                                onClick={close}
                                className="block py-0.5 text-[13px] text-foreground/85 transition-colors hover:text-accent"
                              >
                                {link.label}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <p className="pt-1 text-[9px] text-muted/40">
                    © {new Date().getFullYear()} HiiiPower Technologies
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Invisible hit target — same place as Menu */}
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="fixed z-[202]"
              style={{
                top: anchor.top,
                left: anchor.left,
                width: Math.max(anchor.width, 76),
                height: Math.max(anchor.height, 32),
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    );

  return (
    <>
      <span ref={triggerWrapRef} className="relative inline-flex">
        {/* Spacer keeps chrome layout stable while shell morphs */}
        <span
          className={`${btnClass} pointer-events-none invisible`}
          aria-hidden
        >
          Menu
        </span>
        <AnimatePresence initial={false}>
          {!open && (
            <motion.button
              key="menu-trigger"
              type="button"
              layoutId="site-menu-shell"
              onClick={openMenu}
              aria-expanded={open}
              aria-haspopup="dialog"
              className={`${btnClass} pointer-events-auto absolute inset-0`}
              style={{ borderRadius: 999 }}
              transition={morph}
            >
              Menu
            </motion.button>
          )}
        </AnimatePresence>
      </span>
      {overlay}
    </>
  );
}
