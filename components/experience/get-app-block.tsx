"use client";

import React from "react";
import Image from "next/image";
import { EmailJoinForm } from "@/components/experience/email-join-form";
import { playStoreUrl } from "@/lib/play-store";
import { detectDeviceClass, type DeviceClass } from "@/lib/device";
import { WAITLIST_PROMPT } from "@/lib/waitlist-copy";

type GetAppBlockProps = {
  /** UTM content parameter for tracking (e.g., "home", "ai-or-not") */
  utmContent: string;
  className?: string;
};

function AppleMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function WaitlistFields({ autoFocus }: { autoFocus?: boolean }) {
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-3">
      <p className="text-center text-xs leading-snug text-white/55">
        {WAITLIST_PROMPT}
      </p>
      <EmailJoinForm autoFocus={autoFocus} />
    </div>
  );
}

function PlayBadge({
  playUrl,
  compact,
}: {
  playUrl: string;
  compact?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <a
        href={playUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex transition-opacity hover:opacity-80"
        aria-label="Get it on Google Play"
      >
        <Image
          src="/google-play-badge.png"
          alt="Get it on Google Play"
          width={646}
          height={250}
          className={compact ? "h-[60px] w-auto" : "h-[72px] w-auto"}
          priority
        />
      </a>
      <p className="-mt-1 max-w-[16rem] text-center text-xs leading-snug text-white/55">
        Invite-only. Got an invite? Get the app.
      </p>
    </div>
  );
}

/**
 * Shared get-the-app block. Device UI is chosen after mount so SSR/hydration match.
 */
export function GetAppBlock({
  utmContent,
  className,
}: GetAppBlockProps) {
  const [device, setDevice] = React.useState<DeviceClass | null>(null);
  const [showWaitlist, setShowWaitlist] = React.useState(false);

  React.useEffect(() => {
    setDevice(detectDeviceClass());
  }, []);

  const playUrl = playStoreUrl(utmContent);

  if (!device) {
    return <div className={className} aria-hidden style={{ minHeight: 72 }} />;
  }

  if (device === "ios") {
    return (
      <div className={className}>
        <WaitlistFields />
      </div>
    );
  }

  if (device === "android") {
    return (
      <div className={className}>
        <PlayBadge playUrl={playUrl} />
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <PlayBadge playUrl={playUrl} />
          <button
            type="button"
            onClick={() => setShowWaitlist(true)}
            className="inline-flex h-12 min-w-[10.5rem] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.04] px-5 text-sm font-medium tracking-wide text-white transition-colors hover:border-white/40 hover:bg-white/[0.08]"
            aria-expanded={showWaitlist}
          >
            <AppleMark className="h-5 w-5" />
            iPhone
          </button>
        </div>
        {showWaitlist ? <WaitlistFields autoFocus /> : null}
      </div>
    </div>
  );
}
