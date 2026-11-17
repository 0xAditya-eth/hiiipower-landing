"use client";

import { ExperienceShell } from "@/components/experience/experience-shell";
import { GetAppBlock } from "@/components/experience/get-app-block";
import { PLAY_STORE_LISTING_URL } from "@/lib/play-store";

export default function DownloadPage() {
  return (
    <ExperienceShell>
      <main className="flex min-h-[100svh] flex-col items-center justify-center px-6 pb-16 pt-28 text-center">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Get HiiiPower
        </h1>
        <div className="pointer-events-auto relative mx-auto mt-6 w-full max-w-xl sm:mt-8">
          <GetAppBlock
            utmContent="download"
            playUrl={PLAY_STORE_LISTING_URL}
            iosPrompt="iOS is almost here. Join the waitlist and you'll be first in."
            androidNote="Have an invite code? Enter it after you sign up in the app."
            includeIpadOs
          />
        </div>
      </main>
    </ExperienceShell>
  );
}
