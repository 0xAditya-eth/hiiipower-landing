"use client";

import React from "react";
import { DynamicBackground } from "@/components/dynamic-bg";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { FeatureShowcase } from "@/components/feature-showcase";
import { BentoGrid } from "@/components/bento-grid";
import { HowItWorks } from "@/components/how-it-works";
import { Comparison } from "@/components/comparison";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { Footer } from "@/components/footer";
import { WaitlistModal } from "@/components/waitlist-modal";

export default function LandingPage() {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <DynamicBackground />
      <Nav onJoin={() => setModalOpen(true)} />

      <main>
        <Hero onJoin={() => setModalOpen(true)} />
        <Marquee />
        <FeatureShowcase />
        <BentoGrid />
        <HowItWorks />
        <Comparison />
        <Faq />
        <CtaBand onJoin={() => setModalOpen(true)} />
      </main>

      <Footer />
      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
