"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExperienceShell } from "@/components/experience/experience-shell";
import { HeroCascade } from "@/components/experience/motion";
import { EmailJoinForm } from "@/components/experience/email-join-form";
import { Button } from "@/components/ui/button";
import { directStore } from "@/lib/device";
import { APP_STORE_LISTING_URL } from "@/lib/app-store";
import { PLAY_STORE_LISTING_URL } from "@/lib/play-store";

const SHARE_URL = "https://hiiipower.app/ai-or-not";
const INVITE_SUCCESS = "You're on the list. We'll let you know when you're in.";

const textLinkClass =
  "text-sm text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent";

function scrollToWaitlist() {
  const el = document.getElementById("join");
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  const input = el.querySelector("input");
  if (input instanceof HTMLInputElement) {
    window.setTimeout(() => input.focus({ preventScroll: true }), 350);
  }
}

export default function InvitePage() {
  const router = useRouter();
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (window.location.hash !== "#join") return;
    const id = requestAnimationFrame(() => scrollToWaitlist());
    return () => cancelAnimationFrame(id);
  }, []);

  function onDownload() {
    // iPhone, iPad, and iPadOS open the App Store. Android opens Play.
    // Desktop goes to /download, which shows both badges.
    const store = directStore();
    if (store === "ios") {
      window.open(APP_STORE_LISTING_URL, "_blank", "noopener,noreferrer");
      return;
    }
    if (store === "android") {
      window.open(PLAY_STORE_LISTING_URL, "_blank", "noopener,noreferrer");
      return;
    }
    router.push("/download");
  }

  async function onShare() {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ url: SHARE_URL });
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
      }
    }

    let copiedLink = false;
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      copiedLink = true;
    } catch {
      copiedLink = false;
    }

    if (!copiedLink) {
      const field = document.createElement("textarea");
      field.value = SHARE_URL;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.left = "-9999px";
      document.body.appendChild(field);
      field.select();
      copiedLink = document.execCommand("copy");
      field.remove();
    }

    if (!copiedLink) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  }

  return (
    <ExperienceShell onJoinFromMenu={scrollToWaitlist}>
      <main>
        <section className="px-5 pt-28 pb-10 sm:px-8 sm:pt-36 sm:pb-16 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <HeroCascade>
              <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                Need an invite?
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-balance text-sm leading-relaxed text-white/50 sm:text-base">
                HiiiPower is invite-only right now.
              </p>
            </HeroCascade>

            <div className="mx-auto mt-10 max-w-xl">
              <p className="text-balance text-sm leading-relaxed text-white/50 sm:text-base">
                No code? Join the waitlist, and play AI or Not while you wait.
              </p>
              <div id="join" className="scroll-mt-24 mx-auto mt-6 flex justify-center">
                <EmailJoinForm successMessage={INVITE_SUCCESS} />
              </div>
              <div className="mt-8 flex flex-col items-center gap-3">
                <Link href="/ai-or-not" className={textLinkClass}>
                  Play AI or Not
                </Link>
                <button type="button" onClick={onShare} className={textLinkClass}>
                  Share with a friend
                </button>
                <p className="min-h-4 text-xs text-white/50" role="status" aria-live="polite">
                  {copied ? "Link copied" : ""}
                </p>
              </div>
            </div>

            <div className="mx-auto mt-14 max-w-xl">
              <p className="text-balance text-sm leading-relaxed text-white/50 sm:text-base">
                Got a code? Download the app and enter it there.
              </p>
              <div className="mt-6">
                <Button type="button" size="lg" variant="secondary" onClick={onDownload}>
                  Download the app
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ExperienceShell>
  );
}
