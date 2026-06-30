"use client";

import { motion } from "framer-motion";

const FEED_ITEMS = [
  { name: "Alex", time: "Just now", location: "Brooklyn, NY", color: "from-amber-200 to-orange-300" },
  { name: "Sam", time: "2m ago", location: "Austin, TX", color: "from-sky-200 to-blue-300" },
  { name: "Jordan", time: "5m ago", location: "Portland, OR", color: "from-emerald-200 to-teal-300" },
];

export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[320px]">
      <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-zinc-200/80 to-zinc-300/40 blur-2xl" aria-hidden />
      <motion.div
        className="relative rounded-[2.5rem] border-[6px] border-zinc-900 bg-zinc-900 p-2 shadow-2xl shadow-zinc-900/20"
        initial={{ opacity: 0, y: 40, rotate: 2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="rounded-[2rem] overflow-hidden bg-zinc-50">
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-3 pb-2">
            <span className="text-[10px] font-semibold text-zinc-900">9:41</span>
            <div className="h-5 w-20 rounded-full bg-zinc-900" />
            <div className="flex gap-0.5">
              <div className="h-2.5 w-2.5 rounded-sm bg-zinc-900" />
              <div className="h-2.5 w-3.5 rounded-sm bg-zinc-900" />
            </div>
          </div>

          {/* App header */}
          <div className="px-4 pb-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-500">Your feed</p>
              <p className="text-sm font-bold text-zinc-900">Live moments</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-zinc-900 flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">H</span>
            </div>
          </div>

          {/* Feed cards */}
          <div className="px-3 pb-4 space-y-3">
            {FEED_ITEMS.map((item, i) => (
              <motion.div
                key={item.name}
                className="rounded-2xl overflow-hidden bg-white border border-zinc-200/80 shadow-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
              >
                <div className={`h-28 bg-gradient-to-br ${item.color} relative`}>
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-2 py-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[9px] font-medium text-white">LIVE</span>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-zinc-900">{item.name}</p>
                    <p className="text-[10px] text-zinc-400">{item.time}</p>
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-0.5">📍 {item.location}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom nav */}
          <div className="border-t border-zinc-200 px-6 py-3 flex justify-around">
            {["Home", "Capture", "You"].map((tab, i) => (
              <div key={tab} className="flex flex-col items-center gap-0.5">
                <div className={`h-1 w-1 rounded-full ${i === 1 ? "bg-zinc-900" : "bg-transparent"}`} />
                <span className={`text-[9px] font-medium ${i === 1 ? "text-zinc-900" : "text-zinc-400"}`}>{tab}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating badges */}
      <motion.div
        className="absolute -left-6 top-16 glass-card rounded-xl px-3 py-2 shadow-lg text-xs font-medium text-zinc-700"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        ✓ Verified human
      </motion.div>
      <motion.div
        className="absolute -right-4 bottom-32 glass-card rounded-xl px-3 py-2 shadow-lg text-xs font-medium text-zinc-700"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        📍 Location verified
      </motion.div>
    </div>
  );
}
