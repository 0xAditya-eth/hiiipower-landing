"use client";

import React, { useState, useEffect } from "react";
import { DynamicBackground } from "@/components/dynamic-bg";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { WaitlistModal } from "@/components/waitlist-modal";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type ImageData = {
  src: string;
  isAI: boolean;
  credit: string;
  license: string;
  licenseUrl: string;
};

type GameState = "intro" | "quiz" | "end";

export default function AIOrNotPage() {
  const [gameState, setGameState] = useState<GameState>("intro");
  const [images, setImages] = useState<ImageData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastGuessCorrect, setLastGuessCorrect] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.title = "AI or Not · HiiiPower";
    fetch("/ai-or-not/manifest.json")
      .then((res) => res.json())
      .then((data: ImageData[]) => {
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setImages(shuffled);
      });
  }, []);

  const handleStart = () => {
    setGameState("quiz");
    setCurrentIndex(0);
    setScore(0);
  };

  const handleGuess = (guessAI: boolean) => {
    if (!imageLoaded) return; // Prevent guessing before image loads
    
    const correct = guessAI === images[currentIndex].isAI;
    setLastGuessCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      setImageLoaded(false); // Reset for next image
      if (currentIndex + 1 < images.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setGameState("end");
      }
    }, 1000);
  };

  const shareToTwitter = () => {
    const text = `I scored ${score}/${images.length} telling AI from real. The rest of the internet is a guessing game. HiiiPower is live camera only.`;
    const url = "https://hiiipower.app/ai-or-not";
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareToLinkedIn = () => {
    const url = "https://hiiipower.app/ai-or-not";
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <DynamicBackground />
      <Nav onJoin={() => setModalOpen(true)} hideJoinButton={true} minimalMode={true} />

      <main className="relative z-10 pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {gameState === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 leading-tight">
                  Can You Tell What&apos;s Real?
                </h1>
                <p className="mt-6 text-lg sm:text-xl text-zinc-500 leading-relaxed max-w-2xl mx-auto">
                  Feeds are full of generated faces, filters, and fake personas. Ten pictures. Tap AI or Real. See how much of the internet you can still trust with your eyes.
                </p>
                <div className="mt-10">
                  <Button size="lg" onClick={handleStart}>
                    Start
                  </Button>
                </div>
              </motion.div>
            )}

            {gameState === "quiz" && images.length > 0 && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <p className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">
                    {currentIndex + 1} of {images.length}
                  </p>
                </div>

                <div className="relative rounded-2xl border border-zinc-200 bg-white overflow-hidden">
                  <div className="relative w-full aspect-[4/3]">
                    {!imageLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-zinc-50">
                        <div className="w-8 h-8 border-2 border-zinc-300 border-t-zinc-900 rounded-full animate-spin" />
                      </div>
                    )}
                    <Image
                      src={images[currentIndex].src}
                      alt={`Image ${currentIndex + 1}`}
                      fill
                      className="object-cover"
                      priority
                      onLoad={() => setImageLoaded(true)}
                    />
                    {/* Preload next image */}
                    {currentIndex + 1 < images.length && (
                      <link
                        rel="preload"
                        as="image"
                        href={images[currentIndex + 1].src}
                      />
                    )}
                  </div>
                </div>

                {!showFeedback ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <Button
                      size="lg"
                      variant="primary"
                      onClick={() => handleGuess(true)}
                      disabled={!imageLoaded}
                      className="w-full text-lg py-6"
                    >
                      AI
                    </Button>
                    <Button
                      size="lg"
                      variant="secondary"
                      onClick={() => handleGuess(false)}
                      disabled={!imageLoaded}
                      className="w-full text-lg py-6"
                    >
                      Real
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <p
                      className={`text-2xl font-bold ${
                        lastGuessCorrect ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      {lastGuessCorrect ? "Correct" : "Wrong"}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}

            {gameState === "end" && (
              <motion.div
                key="end"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <p className="text-lg text-zinc-500 mb-4">
                    {score} of {images.length}
                  </p>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight mb-6">
                    This shouldn&apos;t be a skill.
                  </h2>
                  <p className="max-w-2xl mx-auto text-lg text-zinc-600 leading-relaxed">
                    You just interrogated a picture to decide if a person was real. That&apos;s what the other apps did to the feed.
                  </p>
                </div>

                {/* HiiiPower CTA */}
                <div className="rounded-2xl border-2 border-emerald-500 bg-gradient-to-br from-emerald-50 to-white p-8 sm:p-10">
                  <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500 mb-6">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mb-4">
                      Take Back What&apos;s Real
                    </h3>
                    <p className="text-lg text-zinc-600 mb-6 leading-relaxed">
                      Every other app made you a detective. HiiiPower is live camera. Verified humans. No uploads, no filters. You keep the moment and the data. The guessing game ends here.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button size="lg" onClick={() => setModalOpen(true)}>
                        Join the waitlist →
                      </Button>
                      <Button variant="secondary" size="lg" onClick={() => window.location.href = '/'}>
                        Learn more
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Social Sharing */}
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-zinc-900 mb-4 text-center">Share Your Results</h3>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="primary" size="md" onClick={shareToTwitter}>
                      Share to X/Twitter
                    </Button>
                    <Button variant="secondary" size="md" onClick={shareToLinkedIn}>
                      Share to LinkedIn
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
