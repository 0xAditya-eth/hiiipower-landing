"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { EmailJoinForm } from "@/components/experience/email-join-form";

type ResultsWaitlistActionsProps = {
  joinLabel?: string;
};

/**
 * Results-page CTA pair: Join expands into the home-style email field;
 * “What’s HiiiPower?” moves below once expanded.
 */
export function ResultsWaitlistActions({
  joinLabel = "Join the waitlist",
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
        <EmailJoinForm autoFocus />
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
