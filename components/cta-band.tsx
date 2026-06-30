"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type CtaBandProps = {
  onJoin: () => void;
};

export function CtaBand({ onJoin }: CtaBandProps) {
  return (
    <section id="join" className="relative z-10 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-zinc-900 px-8 py-16 sm:px-16 sm:py-20 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10" aria-hidden>
            <div className="absolute inset-0" style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }} />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ready to join the real world?
            </h2>
            <p className="mt-4 text-lg text-zinc-400 max-w-lg mx-auto leading-relaxed">
              Be among the first to experience social media the way it should have been from the start.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button variant="inverse" size="lg" onClick={onJoin}>
                Join the waitlist
              </Button>
            </div>
            <p className="mt-5 text-xs text-zinc-500">No spam. One email when we launch.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
