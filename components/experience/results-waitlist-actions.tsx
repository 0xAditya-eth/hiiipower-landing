"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { EmailJoinForm } from "@/components/experience/email-join-form";
import { GetAppBlock } from "@/components/experience/get-app-block";
import { detectDeviceClass, type DeviceClass } from "@/lib/device";

type ResultsWaitlistActionsProps = {
  /** UTM content parameter for tracking (e.g., "ai-or-not", "your-worth") */
  utmContent: string;
  joinLabel?: string;
};

/** Main-branch email pill — used only for the iPhone results reveal. */
const MAIN_EMAIL_PILL_CLASS =
  "relative flex h-12 w-full max-w-sm items-center gap-2.5 rounded-full bg-white pl-5 pr-1 shadow-[0_12px_40px_rgba(0,0,0,0.45)]";

/**
 * Results-page CTAs.
 * iPhone matches main: Join waitlist expands into the email field.
 * Android / desktop keep the Play launch block. Pre-mount renders the
 * main Join button so iPhone hydrates without a flash.
 */
export function ResultsWaitlistActions({
  utmContent,
  joinLabel = "Join the waitlist",
}: ResultsWaitlistActionsProps) {
  const [device, setDevice] = React.useState<DeviceClass | null>(null);
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    setDevice(detectDeviceClass());
  }, []);

  const learnMore = (
    <Button
      variant="secondary"
      size="lg"
      onClick={() => {
        window.location.href = "/";
      }}
    >
      What&apos;s HiiiPower?
    </Button>
  );

  if (device === "android" || device === "desktop") {
    return (
      <div className="mt-8 flex flex-col items-center gap-5">
        <GetAppBlock utmContent={utmContent} />
        {learnMore}
      </div>
    );
  }

  if (expanded) {
    return (
      <div className="mt-8 flex flex-col items-center gap-4">
        <EmailJoinForm autoFocus className={MAIN_EMAIL_PILL_CLASS} />
        {learnMore}
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
      <Button size="lg" onClick={() => setExpanded(true)}>
        {joinLabel}
      </Button>
      {learnMore}
    </div>
  );
}
