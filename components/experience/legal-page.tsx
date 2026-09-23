"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExperienceShell } from "@/components/experience/experience-shell";

const ease = [0.22, 1, 0.36, 1] as const;

const linkClass =
  "text-white underline decoration-white/20 underline-offset-2 transition-colors hover:text-accent hover:decoration-accent";

export function LegalLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  if (external || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a
        href={href}
        className={linkClass}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={linkClass}>
      {children}
    </Link>
  );
}

export function LegalPageLayout({
  eyebrow,
  title,
  meta,
  children,
}: {
  eyebrow: string;
  title: string;
  meta?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <ExperienceShell>
      <main>
        <section className="px-5 pt-28 pb-12 sm:px-8 sm:pt-32 sm:pb-16 lg:px-12">
          <div className="mx-auto max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-4 text-[10px] font-semibold tracking-[0.28em] text-white/40 uppercase"
            >
              {eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05, ease }}
              className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl"
            >
              {title}
            </motion.h1>
            {meta && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.12 }}
                className="mt-4 text-sm text-white/50"
              >
                {meta}
              </motion.div>
            )}
          </div>
        </section>

        <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
          <div className="cinema-prose mx-auto max-w-3xl">{children}</div>
        </section>
      </main>
    </ExperienceShell>
  );
}

/** Shared class names for legal body content */
export const legal = {
  p: "mb-6 text-sm leading-relaxed text-white/50 sm:text-base",
  h2: "font-display mt-10 mb-4 text-xl font-semibold tracking-tight text-white first:mt-0 sm:text-2xl",
  h3: "font-display mt-8 mb-3 text-lg font-semibold tracking-tight text-white",
  ul: "mb-6 list-disc space-y-2 pl-6 text-sm leading-relaxed text-white/50 sm:text-base",
  strong: "font-semibold text-white",
  hr: "my-10 border-t border-white/10",
  meta: "mb-6 text-sm leading-relaxed text-white/50",
  code: "rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-xs text-white",
  upper: "mb-6 text-xs leading-relaxed text-white/50 uppercase sm:text-sm",
};
