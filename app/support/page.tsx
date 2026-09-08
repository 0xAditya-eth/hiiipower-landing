"use client";

import React from "react";
import { DynamicBackground } from "@/components/dynamic-bg";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { WaitlistModal } from "@/components/waitlist-modal";

export default function SupportPage() {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <DynamicBackground />
      <Nav onJoin={() => setModalOpen(true)} />

      <main className="relative z-10 pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-8 sm:p-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-6">
              Support
            </h1>

            <div className="prose prose-zinc max-w-none">
              <p className="text-zinc-700 leading-relaxed mb-6">
                Need help? Have questions? We&apos;re here for you.
              </p>

              <p className="text-zinc-700 leading-relaxed mb-4">
                Email us at:
              </p>

              <p className="mb-6">
                <a 
                  href="mailto:support@hiiipower.app" 
                  className="text-2xl font-semibold text-zinc-900 underline hover:text-zinc-700 transition-colors"
                >
                  support@hiiipower.app
                </a>
              </p>

              <p className="text-zinc-600 leading-relaxed">
                We typically respond within 24 hours. For safety reports, we aim to respond as quickly as possible.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
