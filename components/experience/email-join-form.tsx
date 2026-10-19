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
  referred_by?: string;
};

/** White pill email capture — matches Immersion finale / Learn More CTA. */
export function EmailJoinForm({ className, autoFocus }: EmailJoinFormProps) {
  const [email, setEmail] = React.useState("");
  const [heardFrom, setHeardFrom] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [refCode, setRefCode] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);
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
    const ref = params.get("ref");

    if (utmSource) captured.utm_source = utmSource;
    if (utmMedium) captured.utm_medium = utmMedium;
    if (utmCampaign) captured.utm_campaign = utmCampaign;
    if (ref) captured.referred_by = ref;

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
        referred_by?: string;
        heard_from?: string;
      } = { name, email };
      
      if (sourceParams.utm_source) payload.utm_source = sourceParams.utm_source;
      if (sourceParams.utm_medium) payload.utm_medium = sourceParams.utm_medium;
      if (sourceParams.utm_campaign) payload.utm_campaign = sourceParams.utm_campaign;
      if (sourceParams.referred_by) payload.referred_by = sourceParams.referred_by;
      if (heardFrom) payload.heard_from = heardFrom;

      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setRefCode(data.ref_code || null);
      setSuccess(true);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCopy() {
    if (!refCode) return;
    const link = `https://www.hiiipower.app/?ref=${refCode}`;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Failed to copy");
    }
  }

  async function handleShare() {
    if (!refCode) return;
    const link = `https://www.hiiipower.app/?ref=${refCode}`;
    try {
      await navigator.share({
        title: "Join HiiiPower",
        text: "Bring the people you actually talk to.",
        url: link,
      });
    } catch {
      // ignore
    }
  }

  if (success && refCode) {
    const link = `https://www.hiiipower.app/?ref=${refCode}`;
    const canShare = typeof navigator !== "undefined" && !!navigator.share;
    return (
      <div className="w-full max-w-sm space-y-3">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-center">
          <p className="mb-2 text-sm font-medium text-white">
            Bring the people you actually talk to.
          </p>
          <div className="mb-3 overflow-hidden rounded bg-black/30 px-3 py-2 font-mono text-xs text-white/70">
            {link}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 rounded-md bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/15"
            >
              {copied ? "Copied!" : "Copy link"}
            </button>
            {canShare && (
              <button
                onClick={handleShare}
                className="flex-1 rounded-md bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/15"
              >
                Share
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div
        className={
          className ??
          "relative flex h-12 w-full max-w-sm items-center gap-2.5 rounded-full bg-white pl-5 pr-1 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
        }
      >
        <p className="w-full pr-4 text-center text-sm font-medium text-zinc-900">
          You&apos;re on the list
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm space-y-3">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div
          className={
            className ??
            "relative flex h-12 w-full items-center gap-2.5 rounded-full bg-white pl-5 pr-1 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
          }
        >
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
        </div>

        <div>
          <select
            value={heardFrom}
            onChange={(e) => setHeardFrom(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:border-white/30"
          >
            <option value="">Where&apos;d you hear about us?</option>
            <option value="Instagram">Instagram</option>
            <option value="Threads">Threads</option>
            <option value="X">X</option>
            <option value="A friend">A friend</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </form>

      {error && (
        <p className="text-center text-xs text-rose-300">{error}</p>
      )}
    </div>
  );
}
