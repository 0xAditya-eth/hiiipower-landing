"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { GetAppBlock } from "@/components/experience/get-app-block";

type ResultsWaitlistActionsProps = {
  joinLabel?: string;
  /** UTM content parameter for tracking (e.g., "ai-or-not", "your-worth") */
  utmContent: string;
};

/**
 * Results-page CTA: Get the app or join the waitlist.
 */
export function ResultsWaitlistActions({
  joinLabel = "Get the app or join the waitlist",
  utmContent,
}: ResultsWaitlistActionsProps) {
  const [expanded, setExpanded] = React.useState(false);

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

  if (expanded) {
    return (
      <div className="mt-8 flex flex-col items-center gap-4">
        <GetAppBlock utmContent={utmContent} mode="full" />
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
