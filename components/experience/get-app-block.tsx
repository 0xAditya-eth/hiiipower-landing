"use client";

import React from "react";
import Image from "next/image";
import { EmailJoinForm } from "@/components/experience/email-join-form";
import { playStoreUrl } from "@/lib/play-store";

type GetAppBlockProps = {
  /** UTM content parameter for tracking (e.g., "home", "ai-or-not") */
  utmContent: string;
  /** Tighter stack for the site menu / support inset. */
  compact?: boolean;
  className?: string;
};

/**
 * Shared "get the app" block used wherever a waitlist CTA used to appear.
 * Device order is applied after mount so SSR/hydration always match (desktop).
 */
export function GetAppBlock({
  utmContent,
  compact = false,
  className,
}: GetAppBlockProps) {
  const [device, setDevice] = React.useState<"android" | "ios" | "desktop">(
    "desktop"
  );

  React.useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (/android/.test(ua)) {
      setDevice("android");
    } else if (/iphone|ipad|ipod/.test(ua)) {
      setDevice("ios");
    } else {
      setDevice("desktop");
    }
  }, []);

  const playUrl = playStoreUrl(utmContent);
  const ios = device === "ios";

  const playBadge = (
    <div className="flex flex-col items-center">
      {/*
        Official generic badge PNG includes Google's clear-space padding.
        h-[72px] keeps the painted badge well above the 28px minimum.
      */}
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

  const waitlistAction = (
    <div className="flex w-full max-w-sm flex-col items-center gap-3">
      <p className="text-center text-xs leading-snug text-white/55">
        No invite yet, or on iPhone? Join the waitlist.
      </p>
      <EmailJoinForm />
    </div>
  );

  const androidLinkSmall = (
    <a
      href={playUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-center text-xs text-white/45 underline decoration-white/20 underline-offset-2 transition-colors hover:text-white/70 hover:decoration-white/40"
    >
      On Android? Get it on Google Play
    </a>
  );

  return (
    <div className={className}>
      <div
        className={`flex flex-col items-center ${compact ? "gap-4" : "gap-5"}`}
      >
        {ios ? (
          <>
            {waitlistAction}
            {androidLinkSmall}
          </>
        ) : (
          <>
            {playBadge}
            {waitlistAction}
          </>
        )}
      </div>
    </div>
  );
}
