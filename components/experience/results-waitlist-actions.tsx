"use client";

import { Button } from "@/components/ui/button";
import { GetAppBlock } from "@/components/experience/get-app-block";

type ResultsWaitlistActionsProps = {
  /** UTM content parameter for tracking (e.g., "ai-or-not", "your-worth") */
  utmContent: string;
};

/** Results-page CTA: shared get-the-app block, then “What’s HiiiPower?” */
export function ResultsWaitlistActions({ utmContent }: ResultsWaitlistActionsProps) {
  return (
    <div className="mt-8 flex flex-col items-center gap-5">
      <GetAppBlock utmContent={utmContent} />
      <Button
        variant="secondary"
        size="lg"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        What&apos;s HiiiPower?
      </Button>
    </div>
  );
}
