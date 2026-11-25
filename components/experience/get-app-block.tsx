"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
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
  /**
   * Treat iPadOS (Macintosh UA + touch) as iOS. Off by default so the home
   * finale keeps its desktop badge pair for that UA.
   */
  includeIpadOs?: boolean;
};

/**
 * Shared visible height of the badge artwork. Apple's official SVG is the
 * artwork edge to edge. The Play PNG is 646×250 and already includes 41px of
 * clear space on every side, so the file is scaled until its artwork matches.
 */
const BADGE_ART_PX = 72;
const PLAY_FILE = { w: 646, h: 250, pad: 41 } as const;
const PLAY_ART_H = PLAY_FILE.h - PLAY_FILE.pad * 2;
const PLAY_SCALE = BADGE_ART_PX / PLAY_ART_H;
const PLAY_CSS_HEIGHT = PLAY_FILE.h * PLAY_SCALE;
const PLAY_PAD_PX = PLAY_FILE.pad * PLAY_SCALE;
/** Apple requires clear space of one quarter the badge height. */
const APPLE_CLEAR_PX = BADGE_ART_PX / 4;

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
      className="inline-flex shrink-0 transition-opacity hover:opacity-80"
      style={{ marginInline: -PLAY_PAD_PX }}
      aria-label="Get it on Google Play"
    >
      <Image
        src="/google-play-badge.png"
        alt="Get it on Google Play"
        width={PLAY_FILE.w}
        height={PLAY_FILE.h}
        className="w-auto"
        style={{ height: PLAY_CSS_HEIGHT }}
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
      className="inline-flex shrink-0"
      aria-label="Download on the App Store"
    >
      {/* Official black US/UK badge from Apple App Store Marketing Tools. Do not modify. */}
      <Image
        src="/download-on-the-app-store.svg"
        alt="Download on the App Store"
        width={120}
        height={40}
        className="w-auto"
        style={{ height: BADGE_ART_PX }}
        unoptimized
        priority
      />
    </a>
  );
}

function BadgeNote({ tightArtwork }: { tightArtwork: boolean }) {
  return (
    <p
      className="max-w-[16rem] text-balance text-center text-xs leading-snug text-white/55"
      style={{ marginTop: tightArtwork ? APPLE_CLEAR_PX : 4 }}
    >
      Invite-only.{" "}
      <Link
        href="/invite"
        className="underline decoration-white/30 underline-offset-2 transition-colors hover:text-white hover:decoration-white/70"
      >
        Don&apos;t have a code?
      </Link>
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
    return <div className={className} aria-hidden style={{ minHeight: PLAY_CSS_HEIGHT }} />;
  }

  if (device === "ios") {
    return (
      <div className={className}>
        <div className="flex flex-col items-center">
          <AppStoreBadge />
          <BadgeNote tightArtwork />
        </div>
      </div>
    );
  }

  if (device === "android") {
    return (
      <div className={className}>
        <div className="flex flex-col items-center">
          <PlayBadge playUrl={resolvedPlayUrl} />
          <BadgeNote tightArtwork={false} />
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex flex-col items-center">
        <div
          className="flex flex-wrap items-center justify-center"
          style={{ columnGap: APPLE_CLEAR_PX }}
        >
          <AppStoreBadge />
          <PlayBadge playUrl={resolvedPlayUrl} />
        </div>
        <BadgeNote tightArtwork={false} />
      </div>
    </div>
  );
}
