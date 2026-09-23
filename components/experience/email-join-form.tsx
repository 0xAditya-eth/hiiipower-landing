"use client";

import React from "react";

type EmailJoinFormProps = {
  className?: string;
  /** Auto-focus the email input when mounted (e.g. after expanding from a CTA). */
  autoFocus?: boolean;
};

/** White pill email capture — matches Immersion finale / Learn More CTA. */
export function EmailJoinForm({ className, autoFocus }: EmailJoinFormProps) {
  const [email, setEmail] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email.");
      return;
    }
    setSubmitting(true);
    try {
      const name = email.split("@")[0] || "Friend";
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) throw new Error("Failed");
      setSuccess(true);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={
        className ??
        "relative flex h-12 w-full max-w-sm items-center gap-2.5 rounded-full bg-white pl-5 pr-1 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
      }
    >
      {success ? (
        <p className="w-full pr-4 text-center text-sm font-medium text-zinc-900">
          You&apos;re on the list
        </p>
      ) : (
        <>
          <input
            ref={inputRef}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            placeholder="enter your email"
            className="min-w-0 flex-1 border-0 bg-transparent text-[15px] text-zinc-900 outline-none placeholder:text-zinc-400"
          />
          <button
            type="submit"
            disabled={submitting}
            className="shrink-0 rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold tracking-wide text-white transition hover:bg-zinc-800 disabled:opacity-60"
          >
            {submitting ? "…" : "Join"}
          </button>
        </>
      )}
      {error && (
        <p className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-rose-300">
          {error}
        </p>
      )}
    </form>
  );
}
