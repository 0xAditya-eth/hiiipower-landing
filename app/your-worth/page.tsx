"use client";

import React from "react";
import { DynamicBackground } from "@/components/dynamic-bg";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { DataWorthCalculator } from "@/components/data-worth-calculator";
import { WaitlistModal } from "@/components/waitlist-modal";

export default function YourWorthPage() {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <DynamicBackground />
      <Nav onJoin={() => setModalOpen(true)} hideJoinButton={true} />
      
      <main className="relative z-10 pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              What&apos;s Your Data{" "}
              <span className="text-zinc-400">Really Worth?</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-zinc-500 leading-relaxed max-w-2xl mx-auto">
              Discover the commercial value tech platforms extract from your personal data. This calculator uses the Web3 Foundation&apos;s PDAV framework to estimate your digital footprint&apos;s value.
            </p>
          </div>

          <DataWorthCalculator onJoin={() => setModalOpen(true)} />
        </div>
      </main>

      <Footer />
      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
