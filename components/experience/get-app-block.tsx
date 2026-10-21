"use client";

import React from "react";
import Image from "next/image";
import { EmailJoinForm } from "@/components/experience/email-join-form";

type GetAppBlockProps = {
  /** UTM content parameter for tracking (e.g., "home", "ai-or-not") */
  utmContent: string;
  /** Display mode: "full" shows both badge and waitlist, "compact" shows badge and small link */
  mode?: "full" | "compact";
  /** Optional className for the container */
  className?: string;
};

/**
 * Shared "get the app" block used across site where waitlist CTAs appear.
 * Device-aware ordering: Android shows Play first, iOS shows waitlist first with Android link.
 */
export function GetAppBlock({ utmContent, mode = "full", className }: GetAppBlockProps) {
  const [device, setDevice] = React.useState<"android" | "ios" | "desktop">("desktop");

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

  const playUrl = `https://play.google.com/store/apps/details?id=com.hiiipower.social&referrer=utm_source%3Dsite%26utm_content%3D${encodeURIComponent(utmContent)}`;

  const playBadge = (
    <div className="flex flex-col items-center gap-2">
      <a
        href={playUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-opacity hover:opacity-80"
        aria-label="Get it on Google Play"
      >
        <Image
          src="/google-play-badge.png"
          alt="Get it on Google Play"
          width={135}
          height={40}
          className="h-10 w-auto"
          priority
        />
      </a>
      <p className="text-xs text-white/50">
        invite-only. got an invite? get the app.
      </p>
    </div>
  );

  const waitlistAction = (
    <div className="flex flex-col items-center gap-3">
      <p className="text-xs text-white/50">
        no invite yet, or on iphone? join the waitlist.
      </p>
      <EmailJoinForm />
    </div>
  );

  const androidLinkSmall = (
    <a
      href={playUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs text-white/40 underline decoration-white/20 transition-colors hover:text-white/60 hover:decoration-white/40"
    >
      on android? get it on google play
    </a>
  );

  if (mode === "compact") {
    return (
      <div className={className}>
        {device === "ios" ? (
          <div className="flex flex-col items-center gap-3">
            <EmailJoinForm />
            {androidLinkSmall}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            {playBadge}
            <p className="text-xs text-white/40">
              no invite? join the waitlist instead
            </p>
          </div>
        )}
      </div>
    );
  }

  // Full mode with both actions
  return (
    <div className={className}>
      <div className="flex flex-col items-center gap-6">
        {device === "ios" ? (
          <>
            {waitlistAction}
            <div className="h-px w-16 bg-white/10" />
            {androidLinkSmall}
          </>
        ) : (
          <>
            {playBadge}
            <div className="h-px w-16 bg-white/10" />
            {waitlistAction}
          </>
        )}
      </div>
    </div>
  );
}
