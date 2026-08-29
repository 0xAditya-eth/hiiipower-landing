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

function seededShuffle<T>(array: T[], seed: number): T[] {
  const arr = [...array];
  let currentSeed = seed;
  
  const seededRandom = () => {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    return currentSeed / 233280;
  };
  
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  
  return arr;
}

function generateRandomSeed(): number {
  return Math.floor(Math.random() * 1000000);
}

function getRoundImages(allImages: ImageData[], seed: number): ImageData[] {
  // Separate AI and real images
  const aiImages = allImages.filter(img => img.isAI);
  const realImages = allImages.filter(img => !img.isAI);
  
  // Shuffle each group with the seed
  const shuffledAI = seededShuffle(aiImages, seed);
  const shuffledReal = seededShuffle(realImages, seed);
  
  // Take first 5 from each group
  const selectedAI = shuffledAI.slice(0, 5);
  const selectedReal = shuffledReal.slice(0, 5);
  
  // Combine and shuffle with seed+1
  const combined = [...selectedAI, ...selectedReal];
  return seededShuffle(combined, seed + 1);
}

export default function AIOrNotPage() {
  const [gameState, setGameState] = useState<GameState>("intro");
  const [images, setImages] = useState<ImageData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [guesses, setGuesses] = useState<boolean[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastGuessCorrect, setLastGuessCorrect] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSeed, setCurrentSeed] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.title = "AI or Not · HiiiPower";
    
    const urlParams = new URLSearchParams(window.location.search);
    const roundParam = urlParams.get('r');
    const seed = roundParam ? parseInt(roundParam, 10) : generateRandomSeed();
    setCurrentSeed(seed);
    
    fetch("/ai-or-not/manifest.json")
      .then((res) => res.json())
      .then((data: ImageData[]) => {
        const roundImages = getRoundImages(data, seed);
        setImages(roundImages);
      });

    // Mobile/desktop detection
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    setIsMobile(mediaQuery.matches);
    
    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  const handleStart = () => {
    setGameState("quiz");
    setCurrentIndex(0);
    setScore(0);
    setGuesses([]);
  };

  const handleGuess = (guessAI: boolean) => {
    if (!imageLoaded) return;
    
    const correct = guessAI === images[currentIndex].isAI;
    setLastGuessCorrect(correct);
    const newGuesses = [...guesses, correct];
    setGuesses(newGuesses);
    
    if (correct) {
      setScore(score + 1);
    }
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      setImageLoaded(false);
      if (currentIndex + 1 < images.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setGameState("end");
      }
    }, 1000);
  };

  const getShareText = (): string => {
    const grid = guesses.map((correct: boolean) => correct ? '🟩' : '⬛').join('');
    return `${grid}\n\nScored ${score}/${images.length} on the Real or Slop test.\n\nNGL, it's getting scary hard to tell what's actually real.\n\nCurious if anyone on my timeline can pull off 100%.\n\nTake the challenge here 👇`;
  };

  const shareToX = () => {
    const shareText = getShareText();
    const shareUrl = `https://www.hiiipower.app/ai-or-not?r=${currentSeed}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToLinkedIn = () => {
    const shareText = getShareText();
    const shareUrl = `https://www.hiiipower.app/ai-or-not?r=${currentSeed}`;
    const fullText = `${shareText}\n\n${shareUrl}`;
    window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(fullText)}`, '_blank');
  };

  const generateStoryImage = (): Promise<Blob> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d')!;

      // Background - near black
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, 1080, 1920);

      // Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 96px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('AI or Not', 540, 600);

      // Hook line
      ctx.fillStyle = '#a1a1aa';
      ctx.font = '42px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('Can you tell which are fake?', 540, 700);

      // Score text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 64px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(`You got ${score}/10.`, 540, 860);

      // Draw result grid as rectangles (one row of 10)
      const boxSize = 60;
      const gap = 12;
      const totalWidth = (boxSize * 10) + (gap * 9);
      const startX = (1080 - totalWidth) / 2;
      const startY = 940;

      guesses.forEach((correct: boolean, index: number) => {
        ctx.fillStyle = correct ? '#22c55e' : '#27272a';
        const x = startX + (index * (boxSize + gap));
        ctx.fillRect(x, startY, boxSize, boxSize);
      });

      // CTA text
      ctx.fillStyle = '#a1a1aa';
      ctx.font = '38px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('Play this round →', 540, 1200);

      // URL
      ctx.fillStyle = '#71717a';
      ctx.font = '36px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('hiiipower.app/ai-or-not', 540, 1270);

      canvas.toBlob((blob) => {
        resolve(blob!);
      }, 'image/png');
    });
  };

  const shareToInstagramStory = async () => {
    try {
      const imageBlob = await generateStoryImage();
      const file = new File([imageBlob], 'ai-or-not-story.png', { type: 'image/png' });

      const shareText = `Can you tell which are fake? I got ${score}/10.\n\nhttps://www.hiiipower.app/ai-or-not?r=${currentSeed}`;

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'AI or Not',
          text: shareText
        });
      } else {
        // Fallback: download the image
        const url = URL.createObjectURL(imageBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ai-or-not-story.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Failed to share to Instagram Story:', err);
    }
  };

  const playAnotherRound = () => {
    const newSeed = generateRandomSeed();
    setCurrentSeed(newSeed);
    
    fetch("/ai-or-not/manifest.json")
      .then((res) => res.json())
      .then((data: ImageData[]) => {
        const roundImages = getRoundImages(data, newSeed);
        setImages(roundImages);
        setGameState("intro");
        setCurrentIndex(0);
        setScore(0);
        setGuesses([]);
        setImageLoaded(false);
        
        window.history.pushState({}, '', `/ai-or-not?r=${newSeed}`);
      });
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
                {/* Score */}
                <div className="text-center">
                  <p className="text-lg text-zinc-500 mb-4">
                    You got {score}/{images.length}.
                  </p>
                </div>

                {/* Result Grid */}
                <div className="flex justify-center">
                  <div className="flex flex-nowrap gap-1 sm:gap-1.5">
                    {guesses.map((correct, index) => (
                      <div
                        key={index}
                        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-sm ${
                          correct ? 'bg-[#22c55e]' : 'bg-zinc-900'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Heading and Body */}
                <div className="text-center">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight mb-6">
                    This shouldn&apos;t be a skill.
                  </h2>
                  <p className="max-w-2xl mx-auto text-lg text-zinc-600 leading-relaxed">
                    You shouldn&apos;t have to guess what&apos;s real.
                    <br />
                    They let AI in so you&apos;d stop knowing the difference.
                  </p>
                </div>

                {/* Green Waitlist Box */}
                <div className="rounded-2xl border-2 border-emerald-500 bg-gradient-to-br from-emerald-50 to-white p-8 sm:p-10">
                  <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500 mb-6">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mb-4">
                      Take back your reality.
                    </h3>
                    <p className="text-lg text-zinc-600 mb-6 leading-relaxed">
                      Switch to a feed that&apos;s real, that doesn&apos;t wear on your mental well-being with addictive algorithms, and never uses your content to train AI.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button size="lg" onClick={() => setModalOpen(true)}>
                        Join the waitlist
                      </Button>
                      <Button variant="secondary" size="lg" onClick={() => window.location.href = '/'}>
                        Learn More About HiiiPower
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="primary" size="lg" onClick={shareToX}>
                      Share to X
                    </Button>
                    {isMobile ? (
                      <Button variant="secondary" size="lg" onClick={shareToInstagramStory}>
                        Share to Instagram
                      </Button>
                    ) : (
                      <Button variant="secondary" size="lg" onClick={shareToLinkedIn}>
                        Share to LinkedIn
                      </Button>
                    )}
                  </div>
                </div>

                {/* Play Another Round */}
                <div className="text-center">
                  <Button variant="ghost" size="lg" onClick={playAnotherRound}>
                    Play another round
                  </Button>
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
