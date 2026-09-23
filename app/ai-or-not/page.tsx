"use client";

import React, { useState, useEffect, useRef } from "react";
import { ExperienceShell } from "@/components/experience/experience-shell";
import { Button } from "@/components/ui/button";
import {
  HeroCascade,
  cinemaEase,
  staggerItem,
  staggerItemSoft,
} from "@/components/experience/motion";
import { ResultsWaitlistActions } from "@/components/experience/results-waitlist-actions";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import Image from "next/image";
import {
  STORY,
  fillCinemaBackground,
  storyFont,
} from "@/lib/story-canvas";

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
  const aiImages = allImages.filter((img) => img.isAI);
  const realImages = allImages.filter((img) => !img.isAI);

  const shuffledAI = seededShuffle(aiImages, seed);
  const shuffledReal = seededShuffle(realImages, seed);

  const selectedAI = shuffledAI.slice(0, 5);
  const selectedReal = shuffledReal.slice(0, 5);

  const combined = [...selectedAI, ...selectedReal];
  return seededShuffle(combined, seed + 1);
}

function QuizCard({
  image,
  index,
  showFeedback,
  lastGuessCorrect,
  onGuess,
  disabled,
  onReady,
}: {
  image: ImageData;
  index: number;
  showFeedback: boolean;
  lastGuessCorrect: boolean;
  onGuess: (guessAI: boolean) => void;
  disabled: boolean;
  onReady: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 0, 220], [-14, 0, 14]);
  const aiHint = useTransform(x, [-160, -40, 0], [1, 0.35, 0]);
  const realHint = useTransform(x, [0, 40, 160], [0, 0.35, 1]);
  const readySent = useRef(false);

  useEffect(() => {
    setLoaded(false);
    readySent.current = false;
    x.set(0);
  }, [image.src, x]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (disabled || showFeedback || !loaded) return;
    const threshold = 110;
    if (info.offset.x > threshold || info.velocity.x > 650) {
      onGuess(false);
    } else if (info.offset.x < -threshold || info.velocity.x < -650) {
      onGuess(true);
    }
  };

  const canInteract = loaded && !disabled && !showFeedback;

  return (
    <motion.div
      // Opacity enter/exit lives on the SAME node as drag transforms to
      // avoid the parent-opacity + child-transform compositor flash.
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{ x, rotate }}
      drag={canInteract ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      className="absolute inset-0 touch-pan-y"
    >
      <div className="relative h-full w-full overflow-hidden border border-white/10 bg-[#111]">
        {!loaded && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-accent" />
          </div>
        )}
        <Image
          src={image.src}
          alt={`Image ${index + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="pointer-events-none select-none object-cover"
          priority
          draggable={false}
          onLoad={() => {
            setLoaded(true);
            if (!readySent.current) {
              readySent.current = true;
              onReady();
            }
          }}
        />

        <motion.div
          style={{ opacity: aiHint }}
          className="pointer-events-none absolute inset-0 z-20 flex items-start justify-start bg-gradient-to-br from-white/10 to-transparent p-5"
        >
          <span className="rotate-[-8deg] rounded-sm border-2 border-white/80 px-3 py-1 font-display text-xl font-semibold tracking-wide text-white uppercase">
            AI
          </span>
        </motion.div>
        <motion.div
          style={{ opacity: realHint }}
          className="pointer-events-none absolute inset-0 z-20 flex items-start justify-end bg-gradient-to-bl from-accent/20 to-transparent p-5"
        >
          <span className="rotate-[8deg] rounded-sm border-2 border-accent px-3 py-1 font-display text-xl font-semibold tracking-wide text-accent uppercase">
            Real
          </span>
        </motion.div>

        {showFeedback && (
          <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-black/50">
            <p
              className={`font-display text-3xl font-semibold sm:text-4xl ${
                lastGuessCorrect ? "text-accent" : "text-white/55"
              }`}
            >
              {lastGuessCorrect ? "Correct" : "Wrong"}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function AIOrNotPage() {
  const [gameState, setGameState] = useState<GameState>("intro");
  const [images, setImages] = useState<ImageData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [guesses, setGuesses] = useState<boolean[]>([]);
  const [feedback, setFeedback] = useState<{
    src: string;
    correct: boolean;
  } | null>(null);
  const [readySrc, setReadySrc] = useState<string | null>(null);
  const [currentSeed, setCurrentSeed] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const advancingRef = useRef(false);
  const finishingRef = useRef(false);

  useEffect(() => {
    document.title = "AI or Not · HiiiPower";

    const urlParams = new URLSearchParams(window.location.search);
    const roundParam = urlParams.get("r");
    const seed = roundParam ? parseInt(roundParam, 10) : generateRandomSeed();
    setCurrentSeed(seed);

    fetch("/ai-or-not/manifest.json")
      .then((res) => res.json())
      .then((data: ImageData[]) => {
        const roundImages = getRoundImages(data, seed);
        setImages(roundImages);
      });

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const handleStart = () => {
    setGameState("quiz");
    setCurrentIndex(0);
    setScore(0);
    setGuesses([]);
    setReadySrc(null);
    setFeedback(null);
    setFinishing(false);
    finishingRef.current = false;
    advancingRef.current = false;
  };

  const handleGuess = (guessAI: boolean) => {
    const currentImg = images[currentIndex];
    if (
      !currentImg ||
      readySrc !== currentImg.src ||
      feedback ||
      advancingRef.current ||
      finishing
    ) {
      return;
    }
    advancingRef.current = true;

    const correct = guessAI === currentImg.isAI;
    setGuesses((prev) => [...prev, correct]);
    if (correct) setScore((s) => s + 1);
    // Lock feedback to this src so the leaving card keeps Correct/Wrong
    // even after we advance the index.
    setFeedback({ src: currentImg.src, correct });

    const isLast = currentIndex + 1 >= images.length;

    window.setTimeout(() => {
      if (isLast) {
        finishingRef.current = true;
        setFinishing(true);
        return;
      }

      // Advance first; keep feedback.src on the leaving image so the exit
      // fade can't lose Correct/Wrong or flash a blank/spinner state.
      setCurrentIndex((i) => i + 1);
      advancingRef.current = false;
      window.setTimeout(() => setFeedback(null), 280);
    }, 900);
  };

  const getShareText = (): string => {
    const grid = guesses
      .map((correct: boolean) => (correct ? "🟩" : "⬛"))
      .join("");
    return `${grid}\n\nScored ${score}/${images.length} on the Real or Slop test.\n\nNGL, it's getting scary hard to tell what's actually real.\n\nCurious if anyone on my timeline can pull off 100%.\n\nTake the challenge here 👇`;
  };

  const shareToX = () => {
    const shareText = getShareText();
    const shareUrl = `https://www.hiiipower.app/ai-or-not?r=${currentSeed}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const shareToLinkedIn = () => {
    const shareText = getShareText();
    const shareUrl = `https://www.hiiipower.app/ai-or-not?r=${currentSeed}`;
    const fullText = `${shareText}\n\n${shareUrl}`;
    window.open(
      `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(fullText)}`,
      "_blank"
    );
  };

  const generateStoryImage = (): Promise<Blob> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      canvas.width = STORY.width;
      canvas.height = STORY.height;
      const ctx = canvas.getContext("2d")!;

      fillCinemaBackground(ctx);
      ctx.textAlign = "center";

      ctx.fillStyle = STORY.fg;
      ctx.font = storyFont("800", 84, "display");
      ctx.fillText("Real or AI?", 540, 320);

      ctx.fillStyle = STORY.muted;
      ctx.font = storyFont("500", 38, "body");
      ctx.fillText("10 photos. Half are Slop.", 540, 390);

      ctx.fillStyle = STORY.accent;
      ctx.font = storyFont("800", 180, "display");
      ctx.fillText(`${score}/10`, 540, 620);

      const boxSize = 58;
      const gap = 10;
      const totalWidth = boxSize * 10 + gap * 9;
      const startX = (STORY.width - totalWidth) / 2;
      const startY = 720;
      const radius = 8;

      guesses.forEach((correct: boolean, index: number) => {
        const x = startX + index * (boxSize + gap);
        ctx.fillStyle = correct ? STORY.accent : STORY.surface;
        ctx.beginPath();
        ctx.roundRect(x, startY, boxSize, boxSize, radius);
        ctx.fill();
      });

      ctx.fillStyle = STORY.fg;
      ctx.font = storyFont("500", 36, "body");
      ctx.fillText("NGL, it's getting scary hard to tell", 540, 1100);
      ctx.fillText("what's actually real.", 540, 1160);
      ctx.fillText("Curious if anyone on my timeline", 540, 1260);
      ctx.fillText("can pull off 100%.", 540, 1320);

      ctx.fillStyle = STORY.muted;
      ctx.font = storyFont("600", 28, "body");
      ctx.fillText("hiiipower.app/ai-or-not", 540, 1650);

      canvas.toBlob((blob) => {
        resolve(blob!);
      }, "image/png");
    });
  };

  const shareToInstagramStory = async () => {
    try {
      const imageBlob = await generateStoryImage();
      const file = new File([imageBlob], "ai-or-not-story.png", {
        type: "image/png",
      });

      const shareText = getShareText();
      const shareUrl = `https://www.hiiipower.app/ai-or-not?r=${currentSeed}`;
      const fullText = `${shareText}\n\n${shareUrl}`;

      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: "Real or AI?",
          text: fullText,
        });
      } else {
        const url = URL.createObjectURL(imageBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "ai-or-not-story.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error("Failed to share to Instagram Story:", err);
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
        setReadySrc(null);
        setFeedback(null);
        setFinishing(false);
        finishingRef.current = false;
        advancingRef.current = false;

        window.history.pushState({}, "", `/ai-or-not?r=${newSeed}`);
      });
  };

  const current = images[currentIndex];
  const imageReady = !!current && readySrc === current.src;
  const showingFeedback = !!feedback && !!current && feedback.src === current.src;

  return (
    <ExperienceShell>
      <main className="px-5 pt-28 pb-16 sm:px-8 sm:pt-32 sm:pb-20 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <AnimatePresence
            mode="wait"
            onExitComplete={() => {
              if (!finishingRef.current) return;
              finishingRef.current = false;
              setGameState("end");
              setFeedback(null);
              setFinishing(false);
              advancingRef.current = false;
            }}
          >
            {gameState === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: cinemaEase }}
                className="text-center"
              >
                <HeroCascade titleIndex={1} className="text-center">
                  <p className="mb-4 text-[10px] font-semibold tracking-[0.28em] text-white/40 uppercase">
                    AI or not
                  </p>
                  <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                    Can you tell what&apos;s real?
                  </h1>
                  <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/50 sm:text-base">
                    Feeds are full of generated faces, filters, and fake
                    personas. Ten pictures. Tap AI or Real — or swipe left for
                    AI, right for Real. See how much of the internet you can
                    still trust with your eyes.
                  </p>
                  <div className="mt-10 flex justify-center">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button size="lg" onClick={handleStart}>
                        Start
                      </Button>
                    </motion.div>
                  </div>
                </HeroCascade>
              </motion.div>
            )}

            {gameState === "quiz" && current && !finishing && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.25, ease: cinemaEase },
                }}
                transition={{ duration: 0.4, ease: cinemaEase }}
                className="mx-auto w-full max-w-3xl space-y-8 overflow-x-hidden text-center"
              >
                <div className="text-center">
                  <p className="text-[10px] font-semibold tracking-[0.28em] text-white/40 uppercase">
                    {currentIndex + 1} of {images.length}
                  </p>
                  <motion.div
                    className="mx-auto mt-3 h-px max-w-[8rem] origin-center bg-accent"
                    initial={false}
                    animate={{ scaleX: (currentIndex + 1) / images.length }}
                    transition={{ duration: 0.45, ease: cinemaEase }}
                  />
                </div>

                {/* Stable stage — only the card crossfades. Avoid remounting the
                    whole quiz (that was flashing every image on exit). */}
                <div className="relative mx-auto aspect-[4/3] w-full">
                  <AnimatePresence mode="wait" initial={false}>
                    <QuizCard
                      key={current.src}
                      image={current}
                      index={currentIndex}
                      showFeedback={!!feedback && feedback.src === current.src}
                      lastGuessCorrect={
                        feedback?.src === current.src && !!feedback.correct
                      }
                      onGuess={handleGuess}
                      disabled={showingFeedback}
                      onReady={() => setReadySrc(current.src)}
                    />
                  </AnimatePresence>
                </div>

                <div className="mx-auto w-full max-w-md space-y-3">
                  {!showingFeedback ? (
                    <div className="grid grid-cols-2 gap-4">
                      <motion.div
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Button
                          size="lg"
                          variant="primary"
                          onClick={() => handleGuess(true)}
                          disabled={!imageReady}
                          className="w-full py-6 text-lg"
                        >
                          AI
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Button
                          size="lg"
                          variant="secondary"
                          onClick={() => handleGuess(false)}
                          disabled={!imageReady}
                          className="w-full py-6 text-lg"
                        >
                          Real
                        </Button>
                      </motion.div>
                    </div>
                  ) : (
                    <div className="flex min-h-[4.5rem] items-center justify-center py-2">
                      <p
                        className={`font-display text-2xl font-semibold sm:text-3xl ${
                          feedback?.correct ? "text-accent" : "text-white/45"
                        }`}
                      >
                        {feedback?.correct ? "Correct" : "Wrong"}
                      </p>
                    </div>
                  )}
                  <p className="text-center text-[11px] tracking-wide text-white/35">
                    Swipe left = AI · Swipe right = Real
                  </p>
                </div>
              </motion.div>
            )}

            {gameState === "end" && (
              <motion.div
                key="end"
                initial="hidden"
                animate="show"
                exit={{ opacity: 0 }}
                variants={{
                  hidden: {},
                  show: {
                    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
                  },
                }}
                className="mx-auto w-full max-w-3xl space-y-8 text-center"
              >
                <motion.div variants={staggerItem} className="text-center">
                  <p className="mb-2 text-[10px] font-semibold tracking-[0.28em] text-white/40 uppercase">
                    Your score
                  </p>
                  <motion.p
                    initial={{
                      opacity: 0,
                      y: 36,
                      filter: "blur(14px)",
                      scale: 0.9,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      scale: 1,
                    }}
                    transition={{ delay: 0.15, duration: 0.85, ease: cinemaEase }}
                    className="font-display text-4xl font-semibold text-accent sm:text-5xl"
                  >
                    {score}/{images.length}
                  </motion.p>
                </motion.div>

                <motion.div
                  variants={staggerItemSoft}
                  className="flex justify-center"
                >
                  <div className="flex flex-nowrap justify-center gap-1 sm:gap-1.5">
                    {guesses.map((correct, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.5, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                          delay: 0.35 + index * 0.04,
                          duration: 0.35,
                          ease: cinemaEase,
                        }}
                        className={`h-6 w-6 rounded-sm sm:h-8 sm:w-8 ${
                          correct ? "bg-accent" : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={staggerItem} className="text-center">
                  <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    This shouldn&apos;t be a skill.
                  </h2>
                  <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/50 sm:text-base">
                    You shouldn&apos;t have to guess what&apos;s real.
                    <br />
                    They let AI in so you&apos;d stop knowing the difference.
                  </p>
                </motion.div>

                <motion.div
                  variants={staggerItem}
                  className="border border-white/10 bg-white/[0.03] px-6 py-10 sm:px-10"
                >
                  <div className="mx-auto max-w-2xl text-center">
                    <p className="mb-3 text-[10px] font-semibold tracking-[0.28em] text-accent uppercase">
                      Take back reality
                    </p>
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      Take back your reality.
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-white/50 sm:text-base">
                      Switch to a feed that&apos;s real, that doesn&apos;t wear
                      on your mental well-being with addictive algorithms, and
                      never uses your content to train AI.
                    </p>
                    <ResultsWaitlistActions />
                  </div>
                </motion.div>

                <motion.div
                  variants={staggerItemSoft}
                  className="border border-white/10 bg-white/[0.03] px-6 py-8 text-center sm:px-8"
                >
                  <h3 className="font-display mb-4 text-lg font-semibold text-white">
                    Share your results
                  </h3>
                  <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button variant="primary" size="md" onClick={shareToX}>
                      Share to X/Twitter
                    </Button>
                    {isMobile ? (
                      <Button
                        variant="secondary"
                        size="md"
                        onClick={shareToInstagramStory}
                      >
                        Share to Instagram
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        size="md"
                        onClick={shareToLinkedIn}
                      >
                        Share to LinkedIn
                      </Button>
                    )}
                  </div>
                </motion.div>

                <motion.div variants={staggerItemSoft} className="text-center">
                  <Button variant="ghost" size="lg" onClick={playAnotherRound}>
                    Play another round
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </ExperienceShell>
  );
}
