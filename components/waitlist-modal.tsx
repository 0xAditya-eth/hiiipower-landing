"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type WaitlistModalProps = {
  open: boolean;
  onClose: () => void;
};

export function WaitlistModal({ open, onClose }: WaitlistModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) {
        throw new Error("Failed to join waitlist");
      }
      setSuccess(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  function resetAndClose() {
    setName("");
    setEmail("");
    setError(null);
    setSuccess(false);
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-[var(--ink)]/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={resetAndClose}
          />
          <motion.div
            className="relative z-10 w-full max-w-md rounded-lg border border-[var(--line)] bg-[var(--paper)] p-7 sm:p-8 shadow-2xl"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            layout
          >
            <button
              onClick={resetAndClose}
              className="absolute top-4 right-4 p-1.5 rounded-md text-[var(--muted)] hover:text-[var(--ink)] hover:bg-black/[0.04] transition-colors"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <AnimatePresence mode="wait" initial={false}>
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="text-center pt-2"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-md bg-[var(--accent)] text-white text-sm font-bold tracking-wide">
                    OK
                  </div>
                  <h4 className="font-display text-2xl font-bold text-[var(--ink)] mb-2">
                    You&apos;re on the list!
                  </h4>
                  <p className="text-[var(--muted)] mb-6">We&apos;ll reach out with early access details soon.</p>
                  <Button onClick={resetAndClose}>Close</Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-center">
                    <h4 className="font-display text-2xl font-bold text-[var(--ink)]">Join the waitlist</h4>
                    <p className="mt-2 text-sm text-[var(--muted)]">Be the first to access HiiiPower.</p>
                  </div>
                  {error && (
                    <p className="text-sm text-[var(--warn)] text-center bg-[var(--warn)]/10 rounded-md px-4 py-2.5 border border-[var(--warn)]/20">
                      {error}
                    </p>
                  )}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[var(--ink)]">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-md border border-[var(--line)] bg-white px-4 py-2.5 text-[var(--ink)] placeholder:text-[var(--muted)]/70 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/25 focus:border-[var(--accent)] transition-all"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[var(--ink)]">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-md border border-[var(--line)] bg-white px-4 py-2.5 text-[var(--ink)] placeholder:text-[var(--muted)]/70 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/25 focus:border-[var(--accent)] transition-all"
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-3 pt-1">
                    <Button type="button" variant="secondary" onClick={resetAndClose}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={submitting}>
                      {submitting ? "Submitting..." : "Submit"}
                    </Button>
                  </div>
                  <p className="text-xs text-[var(--muted)] text-center">No spam. One email when we launch.</p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
