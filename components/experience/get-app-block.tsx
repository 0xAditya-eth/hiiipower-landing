"use client";

import React from "react";
import Image from "next/image";
import { playStoreUrl } from "@/lib/play-store";
import { APP_STORE_LISTING_URL } from "@/lib/app-store";
import { detectDeviceClass, isIpadOsDesktopUa, type DeviceClass } from "@/lib/device";

type GetAppBlockProps = {
  /** UTM content parameter for tracking (e.g., "home", "ai-or-not") */
  utmContent: string;
  className?: string;
  /**
   * Play listing URL. Omit to keep the existing campaign referrer built from utmContent.
   */
  playUrl?: string;
  /** Line under the store badge(s). Defaults to the home-page note. */
  androidNote?: string;
  /**
   * Treat iPadOS (Macintosh UA + touch) as iOS. Off by default so the home
   * finale keeps its desktop badge pair for that UA.
   */
  includeIpadOs?: boolean;
};

const DEFAULT_NOTE = "Invite-only. Got an invite? Get the app.";

const badgeImgClass = "h-[72px] w-auto";

function PlayBadge({
  playUrl,
}: {
  playUrl: string;
}) {
  return (
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
        className={badgeImgClass}
        priority
      />
    </a>
  );
}

function AppStoreBadge() {
  return (
    <a
      href={APP_STORE_LISTING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex"
      aria-label="Download on the App Store"
    >
      {/* Official black US/UK badge from Apple App Store Marketing Tools. Do not modify. */}
      <Image
        src="/download-on-the-app-store.svg"
        alt="Download on the App Store"
        width={120}
        height={40}
        className={badgeImgClass}
        unoptimized
        priority
      />
    </a>
  );
}

function BadgeNote({ note }: { note: string }) {
  return (
    <p className="mt-1 max-w-[16rem] text-balance text-center text-xs leading-snug text-white/55">
      {note}
    </p>
  );
}

/**
 * Shared get-the-app block. Device UI is chosen after mount so SSR/hydration match.
 * iOS: App Store badge. Android: Play badge. Desktop: both, App Store first.
 */
export function GetAppBlock({
  utmContent,
  className,
  playUrl,
  androidNote = DEFAULT_NOTE,
  includeIpadOs = false,
}: GetAppBlockProps) {
  const [device, setDevice] = React.useState<DeviceClass | null>(null);

  React.useEffect(() => {
    if (includeIpadOs && isIpadOsDesktopUa()) {
      setDevice("ios");
      return;
    }
    setDevice(detectDeviceClass());
  }, [includeIpadOs]);

  const resolvedPlayUrl = playUrl ?? playStoreUrl(utmContent);

  if (!device) {
    return <div className={className} aria-hidden style={{ minHeight: 72 }} />;
  }

  if (device === "ios") {
    return (
      <div className={className}>
        <div className="flex flex-col items-center">
          <AppStoreBadge />
          <BadgeNote note={androidNote} />
        </div>
      </div>
    );
  }

  if (device === "android") {
    return (
      <div className={className}>
        <div className="flex flex-col items-center">
          <PlayBadge playUrl={resolvedPlayUrl} />
          <BadgeNote note={androidNote} />
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap items-center justify-center gap-5">
          <AppStoreBadge />
          <PlayBadge playUrl={resolvedPlayUrl} />
        </div>
        <BadgeNote note={androidNote} />
      </div>
    </div>
  );
}
