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
    <div ref={containerRef} className="min-h-screen h-screen w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth relative">
      {/* Global dynamic background */}
      <DynamicBackground containerRef={containerRef} />
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-4 flex h-14 items-center justify-between rounded-full border border-black/5 bg-white/70 backdrop-blur-md px-4 shadow-sm">
            <a href="#hero" className="flex items-center gap-2 font-extrabold text-base sm:text-lg tracking-tight text-gray-900 shrink-0">
              <img src="/favicon.ico" alt="HiiiPower logo" className="h-6 w-6 rounded" />
              HiiiPower
            </a>
            <nav className="flex items-center gap-1 sm:gap-3 overflow-x-auto whitespace-nowrap min-w-0">
              <div className="hidden sm:flex items-center gap-1 sm:gap-3">
                <a href="#people" className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-gray-800 hover:text-black">
                  People
                </a>
                <a href="#moments" className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-gray-800 hover:text-black">
                  Moments
                </a>
                <a href="#power" className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-gray-800 hover:text-black">
                  Power
                </a>
              </div>
              <a href="#join" className="px-3 py-1.5 text-xs sm:text-sm font-medium text-white bg-black rounded-full hover:bg-gray-800 shrink-0">
                Join
              </a>
            </nav>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section id="hero" className="relative h-screen w-full snap-start overflow-hidden flex flex-col items-center justify-center text-center px-6 py-24">
        <motion.h1
          className="relative z-10 text-5xl sm:text-6xl md:text-8xl font-extrabold mb-8 bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent drop-shadow-lg leading-[1.1] md:leading-[1.05] pb-1"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Real People.
          <br /> Real Moments.
          <br /> Real Power.
        </motion.h1>
        <motion.p
          className="relative z-10 text-base sm:text-lg md:text-2xl max-w-3xl text-gray-700 mb-10 leading-relaxed"
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

      {/* Real People Section */}
      <section id="people" className="relative h-screen w-full snap-start overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-20">
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold mb-3 sm:mb-4 bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent drop-shadow-lg text-center leading-tight pb-1 break-words text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Real People
          </motion.h2>
          
          <motion.p
            className="text-center text-gray-600 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto leading-snug"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            No bots. No fake accounts. No catfish. Every person you connect with is verified, authentic, and human.
          </motion.p>
          
          <div className="flex min-w-0 md:grid md:grid-cols-3 gap-4 md:gap-6 will-change-transform overflow-x-auto snap-x snap-mandatory pb-2 md:overflow-visible touch-pan-x overscroll-x-contain scroll-px-6">
            {[
              {
                title: "Connect With Real Humans",
                desc: "Every conversation you have is with a verified person, not a bot or fake profile. Build genuine friendships without second-guessing who's on the other side.",
                icon: "🤝",
                tag: "100% Human"
              },
              {
                title: "No Brands, No Ads",
                desc: "Just real people sharing real moments. No corporate accounts, no influencer marketing, no sponsored content interrupting your feed.",
                icon: "🚫",
                tag: "Ad-Free Zone"
              },
              {
                title: "Build Trust Naturally",
                desc: "Know that everyone you meet is exactly who they claim to be. Real identities create real relationships and authentic connections.",
                icon: "💯",
                tag: "Verified Humans"
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                className="relative z-10 bg-white/70 backdrop-blur-md box-border p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 transform-gpu snap-start flex-none w-[80vw] sm:w-[55vw] md:w-auto"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 120, damping: 18, mass: 0.6 }}
                variants={{ hidden: { opacity: 1, y: 14, scale: 0.995 }, show: { opacity: 1, y: 0, scale: 1 } }}
              >
                <div className="mb-3 inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-black to-gray-700 text-white shadow-md">
                  <span className="text-lg sm:text-xl" aria-hidden>
                    {f.icon}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold mb-1.5 sm:mb-2 tracking-tight bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent drop-shadow-sm">
                  {f.title}
                </h3>
                <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-snug mb-2.5">
                  {f.desc}
                </p>
                <div className="inline-flex items-center px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-xs font-medium text-gray-700">
                  {f.tag}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Moments Section */}
      <section id="moments" className="relative h-screen w-full snap-start overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-20">
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold mb-3 sm:mb-4 bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent drop-shadow-lg text-center leading-tight pb-1 break-words text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Real Moments
          </motion.h2>
          
          <motion.p
            className="text-center text-gray-600 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto leading-snug"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Every post is captured in real-time. No uploads, no editing, no curated perfection—just life as it happens.
          </motion.p>
          
          <div className="flex min-w-0 md:grid md:grid-cols-3 gap-4 md:gap-6 will-change-transform overflow-x-auto snap-x snap-mandatory pb-2 md:overflow-visible touch-pan-x overscroll-x-contain scroll-px-6">
            {[
              {
                title: "Share Life as It Happens",
                desc: "Capture spontaneous moments right from your camera. No more scrolling through your gallery to find the 'perfect' shot—just share what's happening now.",
                icon: "📸",
                detail: "Real-time only"
              },
              {
                title: "Trust What You See",
                desc: "Know that every post is from where people say they are. No more fake vacation photos or misleading locations.",
                icon: "📍",
                detail: "Location verified"
              },
              {
                title: "Stop Comparing, Start Living",
                desc: "No filters means no pressure to look perfect. Share your real face, your real day, your real life—and feel good about it.",
                icon: "✨",
                detail: "Zero filters"
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                className="relative z-10 bg-white/70 backdrop-blur-md box-border p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 transform-gpu snap-start flex-none w-[80vw] sm:w-[55vw] md:w-auto"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 120, damping: 18, mass: 0.6 }}
                variants={{ hidden: { opacity: 1, y: 14, scale: 0.995 }, show: { opacity: 1, y: 0, scale: 1 } }}
              >
                <div className="mb-3 inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-black to-gray-700 text-white shadow-md">
                  <span className="text-lg sm:text-xl" aria-hidden>
                    {f.icon}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold mb-1.5 sm:mb-2 tracking-tight bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent drop-shadow-sm">
                  {f.title}
                </h3>
                <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-snug mb-2.5">
                  {f.desc}
                </p>
                <div className="inline-flex items-center px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-xs font-medium text-gray-700">
                  {f.detail}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Power Section */}
      <section id="power" className="relative h-screen w-full snap-start flex flex-col items-center justify-center text-center px-4 sm:px-6 py-16 sm:py-20 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold mb-3 sm:mb-4 bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent drop-shadow-lg leading-tight pb-1 break-words text-balance"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Real Power
          </motion.h2>
          <motion.p
            className="mt-2 sm:mt-3 mx-auto max-w-2xl text-gray-600 text-sm sm:text-base md:text-lg leading-snug mb-6 sm:mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            Take back control. Your data, your attention, your mental health—it all belongs to you, not to algorithms designed to exploit you.
          </motion.p>

          <div className="flex min-w-0 md:grid md:grid-cols-3 gap-4 md:gap-6 text-left will-change-transform overflow-x-auto snap-x snap-mandatory pb-2 md:overflow-visible touch-pan-x overscroll-x-contain scroll-px-6">
            {[
              {
                title: "Finally, Your Data Works for You",
                desc: "Control who sees your information and even earn from it if you want. Stop making tech companies rich off your life—you own this.",
                icon: "⛓️",
                benefit: "You own everything"
              },
              {
                title: "You're Enough, Just as You Are",
                desc: "No likes to chase. No follower count to obsess over. Your value isn't a number—just be yourself and connect. No endless scrolling or addictive algorithms.",
                icon: "💎",
                benefit: "No metrics game"
              },
              {
                title: "Have Real Conversations Again",
                desc: "Remember when you actually talked to people instead of just reacting with emojis? We're bringing genuine dialogue back to social media.",
                icon: "💬",
                benefit: "Genuine dialogue"
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="relative z-10 bg-white/70 backdrop-blur-md box-border p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 transform-gpu snap-start flex-none w-[80vw] sm:w-[55vw] md:w-auto"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 120, damping: 18, mass: 0.6 }}
                variants={{ hidden: { opacity: 1, y: 14, scale: 0.995 }, show: { opacity: 1, y: 0, scale: 1 } }}
              >
                <div className="mb-3 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-br from-black to-gray-700 text-white shadow">
                  <span className="text-lg sm:text-xl" aria-hidden>
                    {item.icon}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent mb-1.5 sm:mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-snug mb-2.5">
                  {item.desc}
                </p>
                <div className="inline-flex items-center px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-xs font-medium text-gray-700">
                  {item.benefit}
                </div>
              </motion.div>
            ))}
          </div>
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
