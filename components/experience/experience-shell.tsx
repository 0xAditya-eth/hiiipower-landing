"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SiteMenu } from "@/components/experience/site-menu";
import { BrandMark } from "@/components/experience/brand-mark";
import { WaitlistModal } from "@/components/waitlist-modal";

type ExperienceShellProps = {
  children: React.ReactNode;
  /** Menu "Join waitlist" — defaults to navigating home with ?join=1 */
  onJoinFromMenu?: () => void;
  /** When true, menu join opens local waitlist modal */
  localJoin?: boolean;
  waitlistOpen?: boolean;
  onWaitlistOpenChange?: (open: boolean) => void;
};

/**
 * Immersion-matched chrome for secondary pages:
 * floating brand + SiteMenu, soft aura, no sticky header / footer.
 */
export function ExperienceShell({
  children,
  onJoinFromMenu,
  localJoin = false,
  waitlistOpen,
  onWaitlistOpenChange,
}: ExperienceShellProps) {
  const router = useRouter();
  const [internalOpen, setInternalOpen] = React.useState(false);

  const controlled =
    waitlistOpen !== undefined && onWaitlistOpenChange !== undefined;
  const modalOpen = controlled ? waitlistOpen : internalOpen;
  const setModalOpen = controlled ? onWaitlistOpenChange : setInternalOpen;

  const handleMenuJoin =
    onJoinFromMenu ??
    (() => {
      if (localJoin) {
        setModalOpen(true);
        return;
      }
      router.push("/?join=1");
    });

  return (
    <div className="relative min-h-[100svh] overflow-x-hidden bg-[#050505] text-foreground">
      {/* Atmosphere — same language as Immersion */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <div className="absolute left-1/2 top-1/2 h-[55vmax] w-[55vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,51,102,0.045),transparent_68%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.65)_100%)]" />
      </div>

      {/* Floating chrome — matches Immersion top bar */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-5 sm:px-8">
        <Link
          href="/"
          className="pointer-events-auto inline-flex items-center gap-2 font-display text-sm font-semibold tracking-tight text-white/90 transition-colors hover:text-white"
        >
          <BrandMark size={18} src="/icon2-inverted.png" invert={false} />
          HiiiPower
        </Link>
        <div className="pointer-events-auto">
          <SiteMenu onJoin={handleMenuJoin} />
        </div>
      </div>

      <div className="relative z-10">{children}</div>

      {(localJoin || controlled) && (
        <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}
