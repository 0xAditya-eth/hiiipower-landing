"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HoldPress } from "@/components/experience/gates/hold-press";

export type JourneyGateId = "verify" | "capture" | "claim";

type GateOverlayProps = {
  gate: JourneyGateId | null;
  onUnlock: (gate: JourneyGateId) => void;
};

const COPY: Record<
  JourneyGateId,
  { index: string; title: string; body: string }
> = {
  verify: {
    index: "Gate 01",
    title: "Prove they’re human.",
    body: "Hold to verify. Bots don’t make it through.",
  },
  capture: {
    index: "Gate 02",
    title: "Capture what’s happening.",
    body: "Hold the shutter. Live only — no camera roll.",
  },
  claim: {
    index: "Gate 03",
    title: "Take control of your data.",
    body: "Pull what’s yours into the vault. Likes, ads, tracking — reclaim the basics.",
  },
};

function VerifyGate({ onDone }: { onDone: () => void }) {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-8">
      <div className="flex -space-x-3">
        {["/face1.jpg", "/face2.jpg", "/face3.jpg"].map((src) => (
          <div
            key={src}
            className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-background ring-1 ring-accent/40"
          >
            <Image src={src} alt="" fill className="object-cover" sizes="56px" />
          </div>
        ))}
      </div>
      <HoldPress label="Verify" hint="Hold to verify humans" onComplete={onDone} />
    </div>
  );
}

function CaptureGate({ onDone }: { onDone: () => void }) {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-8">
      <div className="relative h-40 w-40 overflow-hidden rounded-full border border-white/10">
        <Image
          src="/golden-gate-park.jpg"
          alt=""
          fill
          className="object-cover opacity-80"
          sizes="160px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <span className="absolute bottom-3 left-0 right-0 text-center text-[10px] tracking-[0.2em] text-white/70 uppercase">
          Live preview
        </span>
      </div>
      <HoldPress label="Capture" hint="Hold the shutter" onComplete={onDone} />
    </div>
  );
}

const CHIPS = [
  { id: "likes", label: "Likes" },
  { id: "ads", label: "Ad graph" },
  { id: "track", label: "Tracking" },
  { id: "reach", label: "Reach" },
];

function ClaimGate({ onDone }: { onDone: () => void }) {
  const [claimed, setClaimed] = React.useState<string[]>([]);
  const vaultRef = React.useRef<HTMLDivElement>(null);

  const remaining = CHIPS.filter((c) => !claimed.includes(c.id));
  const complete = claimed.length === CHIPS.length;

  React.useEffect(() => {
    if (complete) {
      const t = window.setTimeout(onDone, 450);
      return () => window.clearTimeout(t);
    }
  }, [complete, onDone]);

  const claimOne = (id: string) => {
    setClaimed((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/chip");
    if (id) claimOne(id);
  };

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-8">
      <div
        ref={vaultRef}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className={`relative flex min-h-[120px] w-full flex-wrap items-center justify-center gap-2 rounded-2xl border border-dashed px-4 py-6 transition ${
          complete
            ? "border-accent bg-accent/10"
            : "border-white/20 bg-white/[0.03]"
        }`}
      >
        <p className="absolute top-3 left-4 text-[10px] tracking-[0.2em] text-muted uppercase">
          Yours
        </p>
        {claimed.length === 0 ? (
          <p className="text-sm text-muted">Drop or tap chips into your vault</p>
        ) : (
          claimed.map((id) => {
            const chip = CHIPS.find((c) => c.id === id)!;
            return (
              <span
                key={id}
                className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-ink"
              >
                {chip.label}
              </span>
            );
          })
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {remaining.map((chip) => (
          <button
            key={chip.id}
            type="button"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/chip", chip.id)}
            onClick={() => claimOne(chip.id)}
            className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-foreground transition hover:border-accent hover:text-accent"
          >
            {chip.label}
          </button>
        ))}
      </div>

      <p className="text-xs tracking-[0.18em] text-muted uppercase">
        {complete ? "Data claimed" : "Tap or drag each into Yours"}
      </p>
    </div>
  );
}

export function GateOverlay({ gate, onUnlock }: GateOverlayProps) {
  if (!gate) return null;
  const copy = COPY[gate];

  return (
    <AnimatePresence>
      <motion.div
        key={gate}
        className="absolute inset-0 z-40 flex items-center justify-center bg-background/80 px-4 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      >
        <motion.div
          className="flex w-full max-w-xl flex-col items-center text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] font-medium tracking-[0.28em] text-accent uppercase">
            {copy.index}
          </p>
          <h3 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {copy.title}
          </h3>
          <p className="mt-3 max-w-md text-sm text-muted sm:text-base">{copy.body}</p>
          <div className="mt-10 w-full">
            {gate === "verify" && <VerifyGate onDone={() => onUnlock("verify")} />}
            {gate === "capture" && <CaptureGate onDone={() => onUnlock("capture")} />}
            {gate === "claim" && <ClaimGate onDone={() => onUnlock("claim")} />}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
