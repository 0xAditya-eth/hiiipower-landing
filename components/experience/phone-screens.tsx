"use client";

import Image from "next/image";

function StatusBar({ light = false }: { light?: boolean }) {
  const c = light ? "text-zinc-900" : "text-white/80";
  const pill = light ? "bg-zinc-900" : "bg-black";
  const bar = light ? "bg-zinc-900" : "bg-white/70";
  return (
    <div className={`flex items-center justify-between px-4 pb-2 pt-3 text-[10px] ${c}`}>
      <span className="font-semibold">9:41</span>
      <div className={`h-4 w-16 rounded-full ${pill}`} />
      <div className={`h-2.5 w-5 rounded-sm ${bar}`} />
    </div>
  );
}

export function FeedScreen() {
  return (
    <div className="relative h-full w-full bg-black">
      <Image
        src="/discover-feed.png"
        alt="HiiiPower discover feed"
        fill
        className="object-cover object-top"
        priority
        sizes="340px"
      />
    </div>
  );
}

/** People — verified humans, not a product screenshot */
export function PeopleScreen() {
  const people = [
    { name: "Alex Rivera", image: "/face1.jpg", status: "Verified" },
    { name: "Sam Chen", image: "/face2.jpg", status: "Verified" },
    { name: "Jordan Lee", image: "/face3.jpg", status: "Verified" },
  ];

  return (
    <div className="flex h-full flex-col bg-[#0b0b0b] text-white">
      <StatusBar />
      <div className="px-4 pb-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">Network</p>
        <p className="mt-1 font-display text-[17px] font-semibold tracking-tight">
          Humans only
        </p>
      </div>

      {/* Liveness ring concept */}
      <div className="relative mx-auto mb-4 flex h-[118px] w-[118px] items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-accent/30" />
        <div className="absolute inset-[6px] animate-pulse rounded-full border border-dashed border-accent/50" />
        <div className="relative h-[88px] w-[88px] overflow-hidden rounded-full ring-2 ring-accent/80">
          <Image
            src="/face2.jpg"
            alt="Liveness check"
            fill
            className="object-cover"
            sizes="88px"
          />
        </div>
        <span className="absolute -bottom-1 rounded-full bg-accent px-2 py-0.5 text-[9px] font-bold tracking-wide text-accent-ink">
          LIVE CHECK
        </span>
      </div>

      <div className="flex-1 space-y-2 overflow-hidden px-3 pb-3">
        {people.map((person) => (
          <div
            key={person.name}
            className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-2.5 py-2"
          >
            <Image
              src={person.image}
              alt={person.name}
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold">{person.name}</p>
              <p className="text-[10px] font-medium text-accent">{person.status} human</p>
            </div>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-ink">
              ✓
            </span>
          </div>
        ))}
        <div className="rounded-2xl border border-dashed border-white/12 px-3 py-3 text-center">
          <p className="text-[10px] text-white/35">0 bots detected</p>
        </div>
      </div>
    </div>
  );
}

/** Moments — presence with place + time */
export function MomentsScreen() {
  return (
    <div className="relative flex h-full flex-col bg-zinc-950">
      <Image
        src="/golden-gate-park.jpg"
        alt="Live outdoor moment"
        fill
        className="object-cover"
        sizes="340px"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/80" />

      <div className="relative z-10">
        <StatusBar />
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="relative h-7 w-7 overflow-hidden rounded-full ring-1 ring-white/40">
              <Image src="/face1.jpg" alt="" fill className="object-cover" sizes="28px" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-white">Alex Rivera</p>
              <p className="text-[9px] text-white/55">Just now</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-black/45 px-2 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
            <span className="text-[9px] font-semibold tracking-wider text-white">LIVE</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-auto space-y-2 p-4">
        <div className="inline-flex items-center gap-2 rounded-2xl bg-white/95 px-3 py-2 text-zinc-900 shadow-lg">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
            <span className="absolute bottom-1.5 h-1.5 w-[1.5px] bg-rose-500" />
          </span>
          <div>
            <p className="text-[9px] font-medium text-zinc-500">Captured here</p>
            <p className="text-[11px] font-bold tracking-tight">Golden Gate Park · SF</p>
          </div>
        </div>
        <p className="text-[10px] text-white/60">No uploads · No edits · No filters</p>
      </div>
    </div>
  );
}

/** Power / data — ownership, not a settings dump */
export function PowerScreen() {
  const items = [
    { label: "Your archive", value: "Encrypted", tone: "good" as const },
    { label: "Platform access", value: "You decide", tone: "good" as const },
    { label: "Ad graph", value: "Sealed", tone: "good" as const },
    { label: "Sold to brokers", value: "Never", tone: "accent" as const },
  ];

  return (
    <div className="flex h-full flex-col bg-[#0b0b0b] text-white">
      <StatusBar />
      <div className="px-4 pb-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">Custody</p>
        <p className="mt-1 font-display text-[17px] font-semibold tracking-tight">
          Your data vault
        </p>
      </div>

      {/* Vault visual */}
      <div className="mx-3 mb-4 rounded-3xl border border-accent/25 bg-gradient-to-b from-accent/15 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-accent">Owned by you</p>
            <p className="mt-1 font-display text-2xl font-semibold tracking-tight">100%</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent">
            <span className="h-4 w-3 rounded-sm border-2 border-accent-ink" />
          </div>
        </div>
        <div className="mt-4 flex gap-1.5">
          {["Spotify", "Meta", "Google"].map((p) => (
            <span
              key={p}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] text-white/60"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-2 px-3 pb-4">
        {items.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5"
          >
            <span className="text-[11px] text-white/55">{row.label}</span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                row.tone === "accent"
                  ? "bg-accent text-accent-ink"
                  : "bg-accent/15 text-accent"
              }`}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export const PHONE_SCREENS = [
  FeedScreen,
  PeopleScreen,
  MomentsScreen,
  PowerScreen,
];
