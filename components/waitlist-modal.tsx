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
    } catch (err: any) {
      setError(err?.message || "Something went wrong.");
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
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={resetAndClose}
          />
          <motion.div
            className="relative z-10 w-full max-w-md rounded-2xl border border-white/50 bg-white/80 backdrop-blur-md p-6 shadow-xl"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            layout
          >
            <AnimatePresence mode="wait" initial={false}>
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center"
                >
                  <h4 className="text-2xl font-extrabold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent mb-2">
                    You’re on the list 🎉
                  </h4>
                  <p className="text-gray-700 mb-6">
                    We’ll reach out with early access details soon.
                  </p>
                  <Button className="px-6 py-3 rounded-full bg-black text-white hover:bg-gray-800" onClick={resetAndClose}>
                    Close
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="text-center">
                    <span className="inline-block rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[11px] font-semibold tracking-wider uppercase text-gray-700">
                      Join the waitlist
                    </span>
                    <h4 className="mt-3 text-2xl font-extrabold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
                      Be the first to know
                    </h4>
                  </div>
                  {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-800">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-md border border-black/10 bg-white/90 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/20"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-800">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-md border border-black/10 bg-white/90 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/20"
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <Button
                      type="button"
                      className="px-5 py-2.5 rounded-full border border-black/10 bg-white/80 text-gray-900 hover:bg-white"
                      onClick={resetAndClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-black text-white hover:bg-gray-800 disabled:opacity-60"
                      disabled={submitting}
                    >
                      {submitting ? "Submitting..." : "Submit"}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


