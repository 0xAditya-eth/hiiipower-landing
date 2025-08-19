"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WaitlistModal } from "@/components/waitlist-modal";
import { DynamicBackground } from "@/components/dynamic-bg";

export default function LandingPage() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  return (
    <div ref={containerRef} className="min-h-screen h-screen w-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth relative">
      {/* Global dynamic background */}
      <DynamicBackground containerRef={containerRef} />
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-4 flex h-14 items-center justify-between rounded-full border border-black/5 bg-white/70 backdrop-blur-md px-4 shadow-sm">
            <a href="#hero" className="flex items-center gap-2 font-extrabold text-lg tracking-tight text-gray-900">
              <img src="/favicon.ico" alt="HiiiPower logo" className="h-6 w-6 rounded" />
              HiiiPower
            </a>
            <nav className="flex items-center gap-2 sm:gap-3">
              <a href="#features" className="px-3 py-1.5 text-sm font-medium text-gray-800 hover:text-black">
                Features
              </a>
              <a href="#manifesto" className="px-3 py-1.5 text-sm font-medium text-gray-800 hover:text-black">
                Manifesto
              </a>
              <a href="#join" className="px-3 py-1.5 text-sm font-medium text-white bg-black rounded-full hover:bg-gray-800">
                Join
              </a>
            </nav>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section id="hero" className="relative h-screen w-full snap-start overflow-hidden flex flex-col items-center justify-center text-center px-6 py-24">
        <motion.h1
          className="relative z-10 text-6xl md:text-8xl font-extrabold mb-8 bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent drop-shadow-lg leading-[1.1] md:leading-[1.05] pb-1"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Real People.
          <br /> Real Moments.
          <br /> Real Power.
        </motion.h1>
        <motion.p
          className="relative z-10 text-xl md:text-2xl max-w-3xl text-gray-700 mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          HiiiPower is the social network where authenticity wins.<br /> No bots. No filters. Just you — raw, real, and in control.
        </motion.p>
        <motion.div className="relative z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <Button onClick={() => setModalOpen(true)} className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full bg-black text-white hover:bg-gray-800 shadow-lg">
            Join the Waitlist
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative h-screen w-full snap-start overflow-hidden flex flex-col items-center justify-center px-6 py-24">
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.h2
            className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent drop-shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Built for Real Life
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 will-change-transform">
            {[
              {
                title: "Biometric Verification",
                desc: "One person. One identity. No bots. Everyone is verified through biometrics.",
                icon: "🔒",
              },
              {
                title: "Camera-Only Posts",
                desc: "Post only what your camera sees. No uploads, no filters, just reality.",
                icon: "📷",
              },
              {
                title: "Location Proof",
                desc: "Post verification includes your real-time location for authenticity.",
                icon: "📍",
              },
              {
                title: "Blockchain-Backed Data",
                desc: "Your data is encrypted, stored on-chain, and belongs to you. Use it or monetize it — your choice",
                icon: "⛓️",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                className="relative z-10 bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 transform-gpu"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 120, damping: 18, mass: 0.6 }}
                variants={{ hidden: { opacity: 1, y: 14, scale: 0.995 }, show: { opacity: 1, y: 0, scale: 1 } }}
              >
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-black to-gray-700 text-white shadow-md">
                  <span className="text-xl" aria-hidden>
                    {f.icon}
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold mb-2 tracking-tight bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent drop-shadow-sm">
                  {f.title}
                </h3>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section id="manifesto" className="relative h-screen w-full snap-start flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.span
            className="inline-block rounded-full border border-black/10 bg-white/70 backdrop-blur px-3 py-1 text-[11px] font-semibold tracking-wider uppercase text-gray-700"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Manifesto
          </motion.span>
          <motion.h2
            className="mt-4 text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent drop-shadow-lg leading-[1.1] md:leading-[1.05] pb-1"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Own your identity. Own your time. Own your power.
          </motion.h2>
          <motion.p
            className="mt-5 mx-auto max-w-3xl text-gray-700 text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            Your identity, your attention, your data—reclaimed.
          </motion.p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left will-change-transform">
            {[
              {
                title: "Authenticity first",
                desc: "Live captures and biometric verification keep it human—always.",
                icon: "✨",
              },
              {
                title: "Healthy design philosophy",
                desc: "No dark patterns. Thoughtful design that respects attention and well‑being.",
                icon: "🌿",
              },
              {
                title: "Your data, your rules",
                desc: "In a world that profits from your attention and data, we hand the power back to you.",
                icon: "🔐",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="relative z-10 bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 transform-gpu"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 120, damping: 18, mass: 0.6 }}
                variants={{ hidden: { opacity: 1, y: 14, scale: 0.995 }, show: { opacity: 1, y: 0, scale: 1 } }}
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-black to-gray-700 text-white shadow">
                  <span className="text-base" aria-hidden>
                    {item.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold tracking-tight bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-700 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.blockquote
            className="mt-12 mx-auto max-w-3xl text-gray-800 text-lg md:text-xl italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            “Real is rare. We’re here to protect it.”
          </motion.blockquote>
        </div>
      </section>

      {/* Call to Action */}
      <section id="join" className="relative h-screen w-full snap-start overflow-hidden flex flex-col items-center justify-center px-6 py-24">
        {/* Background accents removed to keep consistency with global bg */}

        <div className="relative z-10 mx-auto w-full max-w-3xl">
          <motion.div
            className="rounded-3xl border border-white/50 bg-white/70 backdrop-blur-md shadow-xl p-8 md:p-12 text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[11px] font-semibold tracking-wider uppercase text-gray-700">
              Early Access
            </span>
            <h3 className="mt-4 text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent drop-shadow-lg leading-[1.1] md:leading-[1.05] pb-1">
              Ready to Join the Real World?
            </h3>
            <p className="mt-4 text-gray-700 text-lg md:text-xl leading-relaxed">
              Join the waitlist to help shape HiiiPower with us. No fluff—just real people building something better.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button onClick={() => setModalOpen(true)} className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full bg-black text-white hover:bg-gray-800 shadow-lg">
                Join the Waitlist
              </Button>
            </div>
            <p className="mt-4 text-xs text-gray-600">
              No spam. We’ll email you once with early access details.
            </p>
          </motion.div>
        </div>
      </section>
      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
