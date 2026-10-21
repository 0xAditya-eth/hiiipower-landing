"use client";

import React from "react";

type EmailJoinFormProps = {
  className?: string;
  /** Auto-focus the email input when mounted (e.g. after expanding from a CTA). */
  autoFocus?: boolean;
};

type SourceParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

/** White pill email capture — matches Immersion finale / Learn More CTA. */
export function EmailJoinForm({ className, autoFocus }: EmailJoinFormProps) {
  const [email, setEmail] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [sourceParams, setSourceParams] = React.useState<SourceParams>({});
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = sessionStorage.getItem("hiiipower_source");
    if (stored) {
      try {
        setSourceParams(JSON.parse(stored));
        return;
      } catch {
        // ignore
      }
    }

    const params = new URLSearchParams(window.location.search);
    const captured: SourceParams = {};
    
    const utmSource = params.get("utm_source");
    const utmMedium = params.get("utm_medium");
    const utmCampaign = params.get("utm_campaign");

    if (utmSource) captured.utm_source = utmSource;
    if (utmMedium) captured.utm_medium = utmMedium;
    if (utmCampaign) captured.utm_campaign = utmCampaign;

    if (Object.keys(captured).length > 0) {
      sessionStorage.setItem("hiiipower_source", JSON.stringify(captured));
      setSourceParams(captured);
    }
  }, []);

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
      const payload: {
        name: string;
        email: string;
        utm_source?: string;
        utm_medium?: string;
        utm_campaign?: string;
      } = { name, email };
      
      if (sourceParams.utm_source) payload.utm_source = sourceParams.utm_source;
      if (sourceParams.utm_medium) payload.utm_medium = sourceParams.utm_medium;
      if (sourceParams.utm_campaign) payload.utm_campaign = sourceParams.utm_campaign;

      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
