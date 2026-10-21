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

type DesktopPlatform = "android" | "iphone";

const DESKTOP_TABS: { id: DesktopPlatform; label: string }[] = [
  { id: "android", label: "Android" },
  { id: "iphone", label: "iPhone" },
];

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

function DesktopGetApp({ playUrl }: { playUrl: string }) {
  const reactId = React.useId();
  const [platform, setPlatform] = React.useState<DesktopPlatform>("android");
  const [focusWaitlist, setFocusWaitlist] = React.useState(false);
  const tabRefs = React.useRef<Partial<Record<DesktopPlatform, HTMLButtonElement | null>>>(
    {}
  );

  function select(
    next: DesktopPlatform,
    opts: { focusTab?: boolean; focusForm?: boolean } = {}
  ) {
    setPlatform(next);
    setFocusWaitlist(next === "iphone" && !!opts.focusForm);
    if (opts.focusTab) {
      requestAnimationFrame(() => tabRefs.current[next]?.focus());
    }
  }

  function onTabListKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const order = DESKTOP_TABS.map((tab) => tab.id);
    const index = order.indexOf(platform);
    let next: DesktopPlatform | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      next = order[(index + 1) % order.length];
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      next = order[(index - 1 + order.length) % order.length];
    } else if (e.key === "Home") {
      next = order[0];
    } else if (e.key === "End") {
      next = order[order.length - 1];
    }
    if (!next || next === platform) return;
    e.preventDefault();
    select(next, { focusTab: true });
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        role="tablist"
        aria-label="Choose platform"
        className="inline-grid grid-cols-2 rounded-full border border-white/20 bg-white/[0.04] p-0.5"
        onKeyDown={onTabListKeyDown}
      >
        {DESKTOP_TABS.map((tab) => {
          const selected = platform === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              type="button"
              role="tab"
              id={`${reactId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${reactId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(tab.id, { focusForm: tab.id === "iphone" })}
              className={`rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                selected
                  ? "bg-white text-zinc-900"
                  : "text-white/55 hover:text-white/80"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="relative w-full min-h-[7.5rem]">
        {DESKTOP_TABS.map((tab) => {
          const active = platform === tab.id;
          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={`${reactId}-panel-${tab.id}`}
              aria-labelledby={`${reactId}-tab-${tab.id}`}
              inert={!active || undefined}
              aria-hidden={!active}
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-out ${
                active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              {tab.id === "android" ? (
                <PlayBadge playUrl={playUrl} />
              ) : (
                <WaitlistFields autoFocus={focusWaitlist} />
              )}
            </div>
          );
        })}
      </div>
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
      <DesktopGetApp playUrl={playUrl} />
    </div>
  );
}
