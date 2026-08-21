"use client";

import React, { useState, useEffect } from "react";
import { DynamicBackground } from "@/components/dynamic-bg";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
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

  const handlePlayAgain = () => {
    const shuffled = [...images].sort(() => Math.random() - 0.5);
    setImages(shuffled);
    setGameState("quiz");
    setCurrentIndex(0);
    setScore(0);
    setImageLoaded(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <DynamicBackground />
      <Nav onJoin={() => {}} hideJoinButton={true} minimalMode={true} />

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
                  AI or Not
                </h1>
                <p className="mt-6 text-lg sm:text-xl text-zinc-500 leading-relaxed max-w-2xl mx-auto">
                  Can you tell what&apos;s real? Tap AI or Real.
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
                    {score} of {images.length}. Now forget the score.
                  </p>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight mb-6">
                    This question shouldn&apos;t exist.
                  </h2>
                  <div className="max-w-2xl mx-auto space-y-4 text-lg text-zinc-600 leading-relaxed">
                    <p>Every other feed is a guessing game. Filters, fakes, AI faces.</p>
                    <p>
                      HiiiPower is live camera. Verified humans. The question goes away.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                  <Button
                    size="lg"
                    onClick={() =>
                      (window.location.href = "https://www.hiiipower.app?source=ai-or-not")
                    }
                  >
                    Join the waitlist
                  </Button>
                  <Button
                    size="lg"
                    variant="secondary"
                    onClick={handlePlayAgain}
                  >
                    Play again
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
