"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WaitlistModal } from "@/components/waitlist-modal";
import { DynamicBackground } from "@/components/dynamic-bg";

type Feature = {
  title: string;
  desc: string;
  icon: string;
  tag: string;
};

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  return (
    <motion.div
      className="group relative z-10 glass-card gradient-border box-border p-5 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl shadow-lg shadow-indigo-500/5 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 transition-all duration-300 transform-gpu snap-start flex-none w-[82vw] sm:w-[55vw] md:w-auto"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100, damping: 20 }}
      variants={{ hidden: { opacity: 0, y: 20, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1 } }}
    >
      <div className="mb-4 inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25 group-hover:scale-110 transition-transform duration-300">
        <span className="text-lg sm:text-xl" aria-hidden>
          {feature.icon}
        </span>
      </div>
      <h3 className="text-lg sm:text-xl font-bold mb-2 tracking-tight text-zinc-900">{feature.title}</h3>
      <p className="text-zinc-600 text-sm sm:text-base leading-relaxed mb-4">{feature.desc}</p>
      <div className="inline-flex items-center px-3 py-1 rounded-full shimmer-badge border border-indigo-200/50 text-xs font-semibold text-indigo-700">
        {feature.tag}
      </div>
    </motion.div>
  );
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="text-center mb-8 sm:mb-10">
      <motion.span
        className="inline-block rounded-full border border-indigo-200/60 bg-indigo-50/80 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-indigo-600 mb-4"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 gradient-text drop-shadow-sm text-center leading-[1.1] pb-1 break-words text-balance"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {title}
      </motion.h2>
      <motion.p
        className="text-center text-zinc-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, duration: 0.6 }}
      >
        {description}
      </motion.p>
    </div>
  );
}

const NAV_LINKS = [
  { href: "#people", label: "People" },
  { href: "#moments", label: "Moments" },
  { href: "#power", label: "Power" },
];

export default function LandingPage() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={containerRef}
      className="min-h-screen h-screen w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth relative"
    >
      <DynamicBackground containerRef={containerRef} />

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-4 flex h-14 items-center justify-between glass-card gradient-border rounded-2xl px-4 sm:px-5 shadow-lg shadow-indigo-500/5">
            <a
              href="#hero"
              className="flex items-center gap-2.5 font-bold text-base sm:text-lg tracking-tight text-zinc-900 shrink-0"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-xs font-extrabold shadow-md shadow-indigo-500/30">
                H
              </div>
              HiiiPower
            </a>
            <nav className="flex items-center gap-1 sm:gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hidden sm:inline-flex px-3 py-1.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 rounded-lg hover:bg-zinc-100/80 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://docs.hiiipower.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                Docs
              </a>
              <Button size="sm" onClick={() => setModalOpen(true)} className="shrink-0">
                Join
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        id="hero"
        className="relative h-screen w-full snap-start overflow-hidden flex flex-col items-center justify-center text-center px-6 py-24"
      >
        <motion.div
          className="relative z-10 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/80 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-indigo-600 shimmer-badge">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            Coming Soon
          </span>
        </motion.div>

        <motion.h1
          className="relative z-10 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-[1.05] md:leading-[1.02] pb-1 max-w-5xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="gradient-text">Real People.</span>
          <br />
          <span className="gradient-text-accent">Real Moments.</span>
          <br />
          <span className="gradient-text">Real Power.</span>
        </motion.h1>

        <motion.p
          className="relative z-10 text-base sm:text-lg md:text-xl max-w-2xl text-zinc-500 mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
        >
          The social network where authenticity wins. No bots. No filters. Just you — raw, real, and in
          control.
        </motion.p>

        <motion.div
          className="relative z-10 flex flex-col sm:flex-row items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          <Button size="lg" onClick={() => setModalOpen(true)}>
            Join the Waitlist
          </Button>
          <Button variant="secondary" size="lg" onClick={() => document.getElementById("people")?.scrollIntoView({ behavior: "smooth" })}>
            Learn More
          </Button>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-zinc-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
          <div className="animate-bounce-subtle">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M10 4v12M4 10l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Real People */}
      <section
        id="people"
        className="relative h-screen w-full snap-start overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-20"
      >
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <SectionHeader
            eyebrow="Authenticity"
            title="Real People"
            description="No bots. No fake accounts. No catfish. Every person you connect with is verified, authentic, and human."
          />
          <div className="flex min-w-0 md:grid md:grid-cols-3 gap-4 md:gap-5 will-change-transform overflow-x-auto snap-x snap-mandatory pb-2 md:overflow-visible touch-pan-x overscroll-x-contain scroll-px-6 hide-scrollbar">
            {[
              {
                title: "Connect With Real Humans",
                desc: "Every conversation is with a verified person, not a bot or fake profile. Build genuine friendships without second-guessing who's on the other side.",
                icon: "🤝",
                tag: "100% Human",
              },
              {
                title: "No Brands, No Ads",
                desc: "Just real people sharing real moments. No corporate accounts, no influencer marketing, no sponsored content interrupting your feed.",
                icon: "🚫",
                tag: "Ad-Free Zone",
              },
              {
                title: "Build Trust Naturally",
                desc: "Know that everyone you meet is exactly who they claim to be. Real identities create real relationships and authentic connections.",
                icon: "💯",
                tag: "Verified Humans",
              },
            ].map((f, i) => (
              <FeatureCard key={i} feature={f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Real Moments */}
      <section
        id="moments"
        className="relative h-screen w-full snap-start overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-20"
      >
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <SectionHeader
            eyebrow="In the Moment"
            title="Real Moments"
            description="Every post is captured in real-time. No uploads, no editing, no curated perfection — just life as it happens."
          />
          <div className="flex min-w-0 md:grid md:grid-cols-3 gap-4 md:gap-5 will-change-transform overflow-x-auto snap-x snap-mandatory pb-2 md:overflow-visible touch-pan-x overscroll-x-contain scroll-px-6 hide-scrollbar">
            {[
              {
                title: "Share Life as It Happens",
                desc: "Capture spontaneous moments right from your camera. No more scrolling through your gallery to find the 'perfect' shot — just share what's happening now.",
                icon: "📸",
                tag: "Real-time only",
              },
              {
                title: "Trust What You See",
                desc: "Know that every post is from where people say they are. No more fake vacation photos or misleading locations.",
                icon: "📍",
                tag: "Location verified",
              },
              {
                title: "Stop Comparing, Start Living",
                desc: "No filters means no pressure to look perfect. Share your real face, your real day, your real life — and feel good about it.",
                icon: "✨",
                tag: "Zero filters",
              },
            ].map((f, i) => (
              <FeatureCard key={i} feature={f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Real Power */}
      <section
        id="power"
        className="relative h-screen w-full snap-start flex flex-col items-center justify-center text-center px-4 sm:px-6 py-16 sm:py-20 overflow-hidden"
      >
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <SectionHeader
            eyebrow="Your Control"
            title="Real Power"
            description="Take back control. Your data, your attention, your mental health — it all belongs to you, not to algorithms designed to exploit you."
          />
          <div className="flex min-w-0 md:grid md:grid-cols-3 gap-4 md:gap-5 text-left will-change-transform overflow-x-auto snap-x snap-mandatory pb-2 md:overflow-visible touch-pan-x overscroll-x-contain scroll-px-6 hide-scrollbar">
            {[
              {
                title: "Your Data Works for You",
                desc: "Control who sees your information and even earn from it if you want. Stop making tech companies rich off your life — you own this.",
                icon: "⛓️",
                tag: "You own everything",
              },
              {
                title: "You're Enough, Just as You Are",
                desc: "No likes to chase. No follower count to obsess over. Your value isn't a number — just be yourself and connect authentically.",
                icon: "💎",
                tag: "No metrics game",
              },
              {
                title: "Real Conversations Again",
                desc: "Remember when you actually talked to people instead of just reacting with emojis? We're bringing genuine dialogue back to social media.",
                icon: "💬",
                tag: "Genuine dialogue",
              },
            ].map((f, i) => (
              <FeatureCard key={i} feature={f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="join"
        className="relative h-screen w-full snap-start overflow-hidden flex flex-col items-center justify-center px-6 py-24"
      >
        <div className="relative z-10 mx-auto w-full max-w-3xl">
          <motion.div
            className="glass-card gradient-border rounded-3xl shadow-2xl shadow-indigo-500/10 p-8 md:p-14 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block rounded-full border border-indigo-200/60 bg-indigo-50/80 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-indigo-600 shimmer-badge">
              Early Access
            </span>
            <h3 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold gradient-text leading-[1.1] pb-1">
              Ready to Join the Real World?
            </h3>
            <p className="mt-4 text-zinc-500 text-base md:text-lg leading-relaxed max-w-lg mx-auto">
              Join the waitlist to help shape HiiiPower with us. No fluff — just real people building
              something better.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" onClick={() => setModalOpen(true)}>
                Join the Waitlist
              </Button>
            </div>
            <p className="mt-5 text-xs text-zinc-400">No spam. We&apos;ll email you once with early access details.</p>
          </motion.div>
        </div>

        <footer className="absolute bottom-6 left-0 right-0 z-10 text-center">
          <p className="text-xs text-zinc-400">
            &copy; {new Date().getFullYear()} HiiiPower. Built for real people.
          </p>
        </footer>
      </section>

      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
