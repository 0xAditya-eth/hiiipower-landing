"use client";

import React from "react";
import { VirtualScroll } from "@/components/experience/immersion/virtual-scroll";
import {
  resolveSegment,
  segmentRange,
  totalVh,
} from "@/components/experience/immersion/segments";
import { CanvasFx } from "@/components/experience/immersion/canvas-fx";
import { PILLAR_STAGES } from "@/components/experience/immersion/pillar-stage";
import { FeedScreen } from "@/components/experience/phone-screens";
import { EmailJoinBar } from "@/components/experience/immersion/email-join-bar";
import { SiteMenu } from "@/components/experience/site-menu";
import { BrandMark } from "@/components/experience/brand-mark";

const CHAPTER_COPY: Record<string, { title: string; body: string }> = {
  feed: {
    title: "A feed that feels like being there.",
    body: "Chronological. Real. Just what people around you actually lived.",
  },
  people: {
    title: "If you’re not alive, you’re not in.",
    body: "Liveness before entry. Brand pages and bots stay outside.",
  },
  moments: {
    title: "Presence, stamped in place and time.",
    body: "Every post is captured where you are, when you are. No gallery dumps. No after-the-fact edits. No AI-generated slop.",
  },
  power: {
    title: "Your life stays under your control.",
    body: "Your data, your attention, your emotions, your time — and the agency to decide what gets any of them. Nothing sold. Nothing steered against you.",
  },
  finale: {
    title: "Ready to join the real world?",
    body: "One email when we launch. No spam.",
  },
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

/** Shared chapter pacing — short star bridge, then content. */
const PRESENCE = { lead: 0.12, fadeIn: 0.12, fadeOut: 0.14 } as const;

/**
 * Balanced chapter timing — small lead (stars), then content, then soft exit.
 * Same shape for feed / people / moments / power so pacing feels even.
 */
function segmentPresence(
  progress: number,
  start: number,
  end: number,
  opts: { lead: number; fadeIn: number; fadeOut: number } = PRESENCE
) {
  const { lead, fadeIn, fadeOut } = opts;
  const span = end - start || 1;
  if (progress < start || progress > end) return 0;
  const local = (progress - start) / span;
  if (local < lead) return 0;
  if (local < lead + fadeIn) return smooth((local - lead) / fadeIn);
  if (local > 1 - fadeOut) return smooth((1 - local) / fadeOut);
  return 1;
}

export function Immersion() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const brandRef = React.useRef<HTMLHeadingElement>(null);
  const subRef = React.useRef<HTMLParagraphElement>(null);
  const chapterRef = React.useRef<HTMLDivElement>(null);
  const phoneRef = React.useRef<HTMLDivElement>(null);
  const stageShellRef = React.useRef<HTMLDivElement>(null);
  const stageLayerRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = React.useRef<HTMLDivElement>(null);
  const auraRef = React.useRef<HTMLDivElement>(null);
  const finaleCopyRef = React.useRef<HTMLDivElement>(null);

  const vsRef = React.useRef<VirtualScroll | null>(null);
  const fxRef = React.useRef<CanvasFx | null>(null);

  const scrollToJoin = React.useCallback(() => {
    const vs = vsRef.current;
    if (!vs) return;
    const { start, end } = segmentRange("finale");
    // Email bar appears once finale local > 0.2 — land mid-finale
    const p = start + (end - start) * 0.55;
    vs.setProgress(p, false);
  }, []);

  const [chapter, setChapter] = React.useState(CHAPTER_COPY.feed);
  const [hud, setHud] = React.useState("Scroll to begin");
  const [emailBarVisible, setEmailBarVisible] = React.useState(false);
  const chapterKeyRef = React.useRef("feed");
  const hudRef = React.useRef("Scroll to begin");
  const emailBarRef = React.useRef(false);
  const sectionRef = React.useRef<string>("intro");
  const prevProgressRef = React.useRef(0);

  React.useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const fx = new CanvasFx(canvas);
    fxRef.current = fx;

    const syncMax = () => {
      fx.resize();
      vs.setMax(totalVh() * window.innerHeight);
    };

    const vs = new VirtualScroll({
      damp: 9.5,
      onFrame: (progress, _c, _m, dt, velocity) => {
        fx.setVelocity(velocity);
        applyFrame(progress);
        fx.frame(dt);
      },
    });
    vsRef.current = vs;
    syncMax();

    const wantsJoin =
      typeof window !== "undefined" &&
      (new URLSearchParams(window.location.search).has("join") ||
        window.location.hash === "#join");
    if (wantsJoin) {
      const { start, end } = segmentRange("finale");
      vs.setProgress(start + (end - start) * 0.55, true);
      // Clean URL without reload
      window.history.replaceState(null, "", "/");
    } else {
      vs.setProgress(0, true);
    }
    vs.mount(root);

    const onPointer = (e: PointerEvent) => {
      fx.setPointer(e.clientX / window.innerWidth - 0.5, e.clientY / window.innerHeight - 0.5);
    };
    const onPointerLeave = () => fx.setPointer(0, 0);
    root.addEventListener("pointermove", onPointer);
    root.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", syncMax);

    return () => {
      vs.unmount(root);
      root.removeEventListener("pointermove", onPointer);
      root.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", syncMax);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyFrame = React.useCallback(
    (progress: number) => {
      const seg = resolveSegment(progress);
      const L = seg.local;
      const brand = brandRef.current;
      const sub = subRef.current;
      const chapterEl = chapterRef.current;
      const phone = phoneRef.current;
      const stageShell = stageShellRef.current;
      const bar = progressBarRef.current;
      const aura = auraRef.current;
      const finaleCopy = finaleCopyRef.current;
      const fx = fxRef.current;

      if (bar) bar.style.transform = `scaleX(${progress})`;
      fx?.setNoise(seg.id === "intro" ? 0.35 : seg.id === "finale" ? 0.2 : 0.1);
      fx?.setScroll(progress);

      // Background morphs when the chapter changes
      if (fx && sectionRef.current !== seg.id) {
        const dir = progress >= prevProgressRef.current ? 1 : -1;
        fx.setSection(seg.id, dir);
        sectionRef.current = seg.id;
      }
      prevProgressRef.current = progress;

      // —— Brand + tagline: sub comes in, both hold ~1+ scroll, then exit together ——
      if (brand && sub) {
        if (seg.id === "intro") {
          // Sub fades in after a short lead
          const subIn = smooth(clamp((L - 0.06) / 0.14, 0, 1));
          // Hold both on screen; exit only in the back half of intro
          const exit = smooth(clamp((L - 0.52) / 0.42, 0, 1));
          const brandOp = 1 - exit;
          brand.style.opacity = String(brandOp);
          brand.style.filter = `blur(${exit * 8}px)`;
          brand.style.transform = `translate3d(0,${lerp(0, -48, exit)}px,0) scale(${lerp(1.04, 0.92, exit)})`;
          sub.style.opacity = String(subIn * brandOp * 0.9);
          sub.style.filter = `blur(${exit * 6}px)`;
          sub.style.transform = `translate3d(0,${lerp(12, -28, exit)}px,0)`;
        } else {
          brand.style.opacity = "0";
          brand.style.filter = "blur(0px)";
          sub.style.opacity = "0";
          sub.style.filter = "blur(0px)";
        }
      }

      // —— Phone: one continuous envelope (no 0→1 pop at feed|people boundary) ——
      let phoneOpacity = 0;
      // Keep mobile vertical rhythm stable — no y-parallax under lg
      const mobileLayout = typeof window !== "undefined" && window.innerWidth < 1024;
      if (phone) {
        const feed = segmentRange("feed");
        const people = segmentRange("people");
        const feedSpan = feed.end - feed.start || 1;
        const peopleSpan = people.end - people.start || 1;
        const feedMid = (feed.start + feed.end) / 2;

        // Extends past feed.end so fade never bottoms out then jumps back up
        const phoneEnd = feed.end + peopleSpan * 0.2;
        phoneOpacity = segmentPresence(progress, feed.start, phoneEnd, {
          lead: PRESENCE.lead,
          fadeIn: PRESENCE.fadeIn,
          fadeOut: 0.28, // single long exit covering late feed → early people
        });

        const dist = (progress - feedMid) / feedSpan;
        const depth = clamp(dist * 0.9, -1, 1);
        const exitStart = phoneEnd - (phoneEnd - feed.start) * 0.28;
        const exitT =
          progress > exitStart
            ? clamp((progress - exitStart) / (phoneEnd - exitStart || 1), 0, 1)
            : 0;

        phone.style.opacity = String(clamp(phoneOpacity, 0, 1));
        const tx = mobileLayout ? 0 : depth * -24 + exitT * -36;
        const ty = mobileLayout ? 0 : depth * 14 + exitT * 20;
        const rotY = mobileLayout ? 0 : -8 + depth * 8 + exitT * 14;
        const rotX = mobileLayout ? 0 : 3 - depth * 2;
        const sc = mobileLayout ? 1 : 1 - exitT * 0.1;
        phone.style.transform = [
          `translate3d(${tx}px, ${ty}px, 0)`,
          `rotateY(${rotY}deg)`,
          `rotateX(${rotX}deg)`,
          `scale(${sc})`,
        ].join(" ");
      }

      const pillarIds = ["people", "moments", "power"] as const;
      let pillarShell = 0;

      stageLayerRefs.current.forEach((el, i) => {
        if (!el) return;
        const id = pillarIds[i];
        const range = segmentRange(id);
        const presence = segmentPresence(progress, range.start, range.end);
        const mid = (range.start + range.end) / 2;
        const span = range.end - range.start || 1;
        const dist = (progress - mid) / span;
        const local = clamp((progress - range.start) / span, 0, 1);

        pillarShell = Math.max(pillarShell, presence);

        el.style.opacity = String(presence);
        el.style.setProperty("--pillar-t", presence.toFixed(4));
        el.style.setProperty("--pillar-local", local.toFixed(4));
        if (mobileLayout) {
          el.style.transform = "translate3d(0, 0, 0) scale(1)";
        } else {
          el.style.transform = `translate3d(${dist * -40}px, ${dist * 14}px, 0) scale(${clamp(1 - Math.abs(dist) * 0.035, 0.95, 1)})`;
        }
      });

      if (stageShell) {
        stageShell.style.opacity = String(pillarShell);
      }

      const copyCandidates = ["feed", "people", "moments", "power"] as const;
      let bestKey: (typeof copyCandidates)[number] = "feed";
      let bestW = -1;
      for (const id of copyCandidates) {
        const range = segmentRange(id);
        const w = segmentPresence(progress, range.start, range.end);
        if (w > bestW) {
          bestW = w;
          bestKey = id;
        }
      }

      if (chapterKeyRef.current !== bestKey) {
        chapterKeyRef.current = bestKey;
        setChapter(CHAPTER_COPY[bestKey]);
      }

      if (chapterEl) {
        if (seg.id === "intro" && L < 0.75) {
          chapterEl.style.opacity = "0";
          chapterEl.style.transform = "translate3d(0, 20px, 0)";
        } else if (seg.id === "finale") {
          chapterEl.style.opacity = "0";
        } else {
          const range = segmentRange(bestKey);
          const w = segmentPresence(progress, range.start, range.end);
          const mid = (range.start + range.end) / 2;
          const dist = (progress - mid) / (range.end - range.start || 1);
          chapterEl.style.opacity = String(w);
          chapterEl.style.transform = mobileLayout
            ? "translate3d(0, 0, 0)"
            : `translate3d(0, ${dist * 14}px, 0)`;
        }
      }

      if (finaleCopy) {
        const show =
          seg.id === "finale" ? smooth(clamp((L - 0.08) / 0.4, 0, 1)) : 0;
        finaleCopy.style.opacity = String(show);
        finaleCopy.style.transform = `translate3d(0, ${lerp(28, 0, show)}px, 0)`;
      }

      if (aura) {
        // Keep aura nearly off on intro (pure black), then gentle
        const introFade = seg.id === "intro" ? smooth(L) * 0.35 : 0.5;
        const hue =
          seg.id === "moments" ? 0.12 : seg.id === "power" ? 0.16 : seg.id === "people" ? 0.08 : 0.05;
        aura.style.opacity = String(
          seg.id === "intro" ? introFade * 0.15 : 0.12 + hue + pillarShell * 0.04
        );
        aura.style.transform = `translate3d(${(progress - 0.5) * 24}px, ${(0.5 - progress) * 14}px, 0) scale(${1.02 + progress * 0.05})`;
      }

      // Stars: black at start → appear after scrolling past the heading
      if (fx) {
        const intro = segmentRange("intro");
        // Stay black through early heading; bloom in late intro
        const starIn = smooth(
          clamp((progress - (intro.start + (intro.end - intro.start) * 0.35)) / ((intro.end - intro.start) * 0.45), 0, 1)
        );
        const brandVis = seg.id === "intro" ? 1 - smooth(L) : 0;
        const finaleVis =
          seg.id === "finale" ? smooth(clamp((L - 0.05) / 0.45, 0, 1)) : 0;
        const filled = Math.max(phoneOpacity, pillarShell, brandVis * 0.25, finaleVis * 0.25);
        const gap = clamp(1 - filled, 0, 1);
        fx.setStars(starIn * (0.5 + gap * 0.4));
      }

      const nextHud =
        seg.id === "finale"
          ? "Enter your email below"
          : seg.id === "intro"
            ? "Scroll to begin"
            : "Scroll to continue";
      if (hudRef.current !== nextHud) {
        hudRef.current = nextHud;
        setHud(nextHud);
      }

      const showEmail = seg.id === "finale" && L > 0.2;
      if (emailBarRef.current !== showEmail) {
        emailBarRef.current = showEmail;
        setEmailBarVisible(showEmail);
      }
    },
    []
  );

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-40 touch-none overflow-hidden bg-[#050505] text-foreground"
      style={{ perspective: "1400px" }}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          ref={auraRef}
          className="absolute left-1/2 top-1/2 h-[55vmax] w-[55vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,51,102,0.045),transparent_68%)]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.65)_100%)]" />
      </div>

      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-[5]" />

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6">
        <h1
          ref={brandRef}
          className="font-display text-center text-[clamp(2.8rem,12vw,9rem)] font-extrabold leading-[0.85] tracking-[-0.05em] text-white will-change-transform"
          style={{ opacity: 1 }}
        >
          HiiiPower
        </h1>
        <p
          ref={subRef}
          className="font-display mt-6 max-w-2xl text-center text-xl text-white/80 sm:text-3xl"
          style={{ opacity: 0 }}
        >
          Social media, without the bullshit.
        </p>
      </div>

      {/*
        Mobile: equal flex gaps (top → visual → copy → bottom).
        Desktop: absolute right-lane visual + mid-left copy (unchanged).
      */}
      <div className="pointer-events-none absolute inset-0 z-[18] flex flex-col lg:block">
        <div className="min-h-0 flex-1 lg:hidden" aria-hidden />

        {/* Visual slot — height from phone aspect; stages overlay full width */}
        <div className="relative w-full shrink-0 lg:absolute lg:inset-0 lg:h-auto">
          {/* Mobile height sizer (matches phone width × aspect) */}
          <div
            className="mx-auto aspect-[9/19.5] w-[min(58vw,220px)] lg:hidden"
            aria-hidden
          />

          {/* Phone — feed */}
          <div className="absolute inset-0 z-20 flex items-center justify-center lg:justify-end lg:pr-[8%]">
            <div
              ref={phoneRef}
              className="relative aspect-[9/19.5] h-full max-h-full w-auto max-w-[min(58vw,220px)] will-change-transform lg:h-auto lg:max-h-none lg:w-[300px] lg:max-w-none"
              style={{ opacity: 0, transformStyle: "preserve-3d" }}
            >
              <div className="absolute -inset-10 rounded-full bg-accent/20 blur-3xl lg:-inset-16" />
              <div className="relative h-full rounded-[2.2rem] border-[5px] border-[#1a1a1a] bg-black p-[4px] shadow-[0_50px_140px_rgba(0,0,0,0.85)] ring-1 ring-white/15 sm:rounded-[2.4rem] sm:border-[6px] sm:p-[5px] lg:rounded-[2.6rem]">
                <div className="pointer-events-none absolute left-1/2 top-2.5 z-10 h-4 w-[72px] -translate-x-1/2 rounded-full bg-black sm:top-3 sm:h-5 sm:w-[86px]" />
                <div className="relative h-full overflow-hidden rounded-[1.75rem] bg-black sm:rounded-[1.9rem] lg:rounded-[2.05rem]">
                  <FeedScreen />
                </div>
              </div>
            </div>
          </div>

          {/* Pillars */}
          <div
            ref={stageShellRef}
            className="absolute inset-0 z-[18] overflow-hidden lg:overflow-visible"
            style={{ opacity: 0 }}
          >
            {PILLAR_STAGES.map(({ id, Stage }, i) => (
              <div
                key={id}
                ref={(el) => {
                  stageLayerRefs.current[i] = el;
                }}
                className="absolute inset-0 will-change-transform"
                style={{ opacity: 0 }}
              >
                <Stage />
              </div>
            ))}
            <div className="absolute inset-y-0 left-0 hidden w-[min(48%,420px)] bg-gradient-to-r from-[#050505]/90 via-[#050505]/55 to-transparent lg:block" />
          </div>
        </div>

        <div className="min-h-0 flex-1 lg:hidden" aria-hidden />

        <div
          ref={chapterRef}
          className="relative z-20 shrink-0 px-5 sm:px-10 lg:absolute lg:bottom-auto lg:left-10 lg:top-1/2 lg:max-w-xl lg:-translate-y-1/2 lg:px-14"
          style={{ opacity: 0 }}
        >
          <h2 className="font-display text-[1.65rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl">
            {chapter.title}
          </h2>
          <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-white/50 sm:mt-4 sm:text-base">
            {chapter.body}
          </p>
        </div>

        <div className="min-h-0 flex-1 lg:hidden" aria-hidden />
      </div>

      <div
        ref={finaleCopyRef}
        className="pointer-events-none absolute inset-x-0 top-[28%] z-20 px-6 text-center"
        style={{ opacity: 0 }}
      >
        <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Ready to join the real world?
        </h2>
        <p className="mx-auto mt-4 max-w-sm text-sm text-white/50">
          One email when we launch. No spam.
        </p>
      </div>

      <EmailJoinBar visible={emailBarVisible} />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 px-6 pb-6">
        <div
          className="mx-auto flex max-w-3xl flex-col items-center gap-3 transition-opacity duration-300"
          style={{ opacity: emailBarVisible ? 0 : 1 }}
        >
          <p className="text-[10px] tracking-[0.28em] text-white/40 uppercase">{hud}</p>
          <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
            <div
              ref={progressBarRef}
              className="h-full origin-left bg-accent"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute top-0 inset-x-0 z-40 flex items-center justify-between px-5 py-5 sm:px-8">
        <span className="inline-flex items-center gap-2 font-display text-sm font-semibold tracking-tight text-white/90">
          <BrandMark size={18} src="/icon2-inverted.png" invert={false} priority />
          HiiiPower
        </span>
        <SiteMenu onJoin={scrollToJoin} />
      </div>
    </div>
  );
}
