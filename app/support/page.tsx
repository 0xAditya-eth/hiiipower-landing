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
              <h2 className="text-2xl font-semibold text-zinc-900 mt-0 mb-4">
                How can we help?
              </h2>

              <p className="text-zinc-700 leading-relaxed mb-6">
                Email <strong>support@hiiipower.app</strong> for account help, safety reports, privacy requests, and general product questions.
              </p>

              <h3 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">
                Safety &amp; reports
              </h3>
              <p className="text-zinc-700 leading-relaxed mb-6">
                If you report content or a user in the app, we aim to review and act within <strong>2–3 business days</strong>. You can also email the same address with details.
              </p>

              <h3 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">
                Account &amp; data
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-zinc-700 leading-relaxed mb-6">
                <li><strong>Deactivate or delete your account:</strong> In the app, open <strong>Settings → Deactivate or Delete Account</strong>.</li>
                <li><strong>Privacy questions / data requests:</strong> Email support@hiiipower.app (see also our{" "}
                  <a href="/privacy" className="text-zinc-900 underline hover:text-zinc-700 transition-colors">
                    Privacy Policy
                  </a>).
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">
                Legal
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-zinc-700 leading-relaxed mb-6">
                <li>
                  <a href="/tos" className="text-zinc-900 underline hover:text-zinc-700 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-zinc-900 underline hover:text-zinc-700 transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>

              <hr className="border-t border-zinc-200 my-8" />

              <p className="text-sm text-zinc-600">
                <strong>Operator:</strong> HiiiPower<br />
                <strong>App:</strong> HiiiPower (<code className="text-xs bg-zinc-100 px-2 py-1 rounded">com.HiiiPower.social</code>)
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
