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
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(image.src);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 0, 220], [-14, 0, 14]);
  const aiHint = useTransform(x, [-160, -40, 0], [1, 0.35, 0]);
  const realHint = useTransform(x, [0, 40, 160], [0, 0.35, 1]);
  const readySent = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    setLoaded(false);
    setError(false);
    setRetryCount(0);
    setCurrentSrc(image.src);
    readySent.current = false;
    loadedRef.current = false;
    x.set(0);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (!loadedRef.current) {
        setError(true);
      }
    }, 10000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
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

  const handleImageLoad = () => {
    loadedRef.current = true;
    setLoaded(true);
    setError(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (!readySent.current) {
      readySent.current = true;
      onReady();
    }
  };

  const handleImageError = () => {
    if (retryCount < 3) {
      setRetryCount((prev) => prev + 1);
      setCurrentSrc(`${image.src}?retry=${retryCount + 1}`);
    } else {
      const unoptimizedSrc = image.src.startsWith("/_next/")
        ? image.src
        : image.src;
      if (currentSrc !== unoptimizedSrc) {
        setCurrentSrc(unoptimizedSrc);
      } else {
        setError(true);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }
    }
  };

  const handleRetry = () => {
    setError(false);
    setLoaded(false);
    setRetryCount(0);
    setCurrentSrc(image.src);
    loadedRef.current = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (!loadedRef.current) {
        setError(true);
      }
    }, 10000);
  };

  const handleSkip = () => {
    loadedRef.current = true;
    setError(false);
    setLoaded(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (!readySent.current) {
      readySent.current = true;
      onReady();
    }
  };

  const canInteract = loaded && !disabled && !showFeedback && !error;

  return (
    <motion.div
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
        {!loaded && !error && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-accent" />
          </div>
        )}
        {error && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/70 p-6">
            <p className="text-center text-sm text-white/70">
              Failed to load image
            </p>
            <div className="flex gap-3">
              <Button size="sm" variant="secondary" onClick={handleRetry}>
                Tap to retry
              </Button>
              <Button size="sm" variant="ghost" onClick={handleSkip}>
                Skip
              </Button>
            </div>
          </div>
        )}
        <Image
          src={currentSrc}
          alt={`Image ${index + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="pointer-events-none select-none object-cover"
          priority
          draggable={false}
          onLoad={handleImageLoad}
          onError={handleImageError}
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

    const fetchManifestWithRetry = async (retries = 3): Promise<ImageData[]> => {
      for (let i = 0; i <= retries; i++) {
        try {
          const res = await fetch(`/ai-or-not/manifest.json?v=${Date.now()}`);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return await res.json();
        } catch (err) {
          console.error(`Manifest fetch attempt ${i + 1} failed:`, err);
          if (i === retries) {
            throw err;
          }
          await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, i)));
        }
      }
      throw new Error("Failed to fetch manifest");
    };

    fetchManifestWithRetry()
      .then((data: ImageData[]) => {
        const roundImages = getRoundImages(data, seed);
        setImages(roundImages);
      })
      .catch((err) => {
        console.error("Failed to load game images:", err);
      });

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  useEffect(() => {
    if (gameState === "quiz" && images.length > 0) {
      const preloadCount = 2;
      for (let i = 1; i <= preloadCount; i++) {
        const nextIndex = currentIndex + i;
        if (nextIndex < images.length) {
          const img = new window.Image();
          img.src = images[nextIndex].src;
        }
      }
    }
  }, [currentIndex, images, gameState]);

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
    return new Promise(async (resolve, reject) => {
      try {
        await document.fonts.load('700 32px Inter');
        await document.fonts.load('800 42px Inter');
        await document.fonts.load('900 150px Inter');
        await document.fonts.load('900 120px Inter');
      } catch (err) {
        console.warn('Failed to load Inter font:', err);
      }

      const canvas = document.createElement("canvas");
      canvas.width = STORY.width;
      canvas.height = STORY.height;
      const ctx = canvas.getContext("2d", { alpha: false })!;

      let bgImage: ImageData | null = null;
      if (score === 10) {
        const randomIndex = Math.floor(Math.random() * images.length);
        bgImage = images[randomIndex];
      } else {
        for (let i = 0; i < guesses.length; i++) {
          if (!guesses[i]) {
            bgImage = images[i];
            break;
          }
        }
        if (!bgImage) bgImage = images[0];
      }

      const bg = new window.Image();
      bg.crossOrigin = "anonymous";
      bg.onload = () => {
        const canvasAspect = STORY.width / STORY.height;
        const imgAspect = bg.width / bg.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgAspect > canvasAspect) {
          drawHeight = STORY.height;
          drawWidth = drawHeight * imgAspect;
          offsetX = (STORY.width - drawWidth) / 2;
          offsetY = 0;
        } else {
          drawWidth = STORY.width;
          drawHeight = drawWidth / imgAspect;
          offsetX = 0;
          offsetY = (STORY.height - drawHeight) / 2;
        }

        ctx.drawImage(bg, offsetX, offsetY, drawWidth, drawHeight);

        const gradient = ctx.createLinearGradient(0, 0, 0, STORY.height);
        gradient.addColorStop(0, "rgba(0, 0, 0, 0.73)");
        gradient.addColorStop(0.3, "rgba(0, 0, 0, 0.4)");
        gradient.addColorStop(0.46, "rgba(0, 0, 0, 0)");
        gradient.addColorStop(0.5, "rgba(0, 0, 0, 0)");
        gradient.addColorStop(0.82, "rgba(0, 0, 0, 0.87)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0.87)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, STORY.width, STORY.height);

        const logo = new window.Image();
        logo.crossOrigin = "anonymous";
        logo.onload = () => {
          let currentX, totalWidth;
          const logoX = 70;
          const logoY = 310;
          const logoHeight = 42;
          const logoWidth = (logo.width / logo.height) * logoHeight;
          
          ctx.save();
          ctx.shadowColor = "rgba(0, 0, 0, 0.56)";
          ctx.shadowBlur = 14;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 2;
          ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);
          ctx.restore();

          ctx.save();
          ctx.shadowColor = "rgba(0, 0, 0, 0.56)";
          ctx.shadowBlur = 14;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 2;
          ctx.fillStyle = "#ffffff";
          ctx.font = "800 42px Inter, sans-serif";
          ctx.textAlign = "left";
          ctx.textBaseline = "top";
          const wordmarkX = logoX + logoWidth + 16;
          const wordmark = "HiiiPower";
          currentX = wordmarkX;
          for (let i = 0; i < wordmark.length; i++) {
            ctx.fillText(wordmark[i], currentX, logoY);
            currentX += ctx.measureText(wordmark[i]).width - 1;
          }
          ctx.restore();

          const headlineX = 70;
          const headlineY = 430;
          ctx.textAlign = "left";
          ctx.textBaseline = "top";
          ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
          ctx.shadowBlur = 30;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 6;
          
          ctx.fillStyle = "#ffffff";
          ctx.font = "900 150px Inter, sans-serif";
          currentX = headlineX;
          const line1 = "Real photo";
          for (let i = 0; i < line1.length; i++) {
            ctx.fillText(line1[i], currentX, headlineY);
            currentX += ctx.measureText(line1[i]).width - 6;
          }

          currentX = headlineX;
          const line2a = "or ";
          ctx.fillStyle = "#ffffff";
          for (let i = 0; i < line2a.length; i++) {
            ctx.fillText(line2a[i], currentX, headlineY + 135);
            currentX += ctx.measureText(line2a[i]).width - 6;
          }
          
          ctx.fillStyle = "#FF3366";
          const ai = "AI";
          for (let i = 0; i < ai.length; i++) {
            ctx.fillText(ai[i], currentX, headlineY + 135);
            currentX += ctx.measureText(ai[i]).width - 6;
          }

          currentX = headlineX;
          const line3 = "photo?";
          ctx.fillStyle = "#ffffff";
          for (let i = 0; i < line3.length; i++) {
            ctx.fillText(line3[i], currentX, headlineY + 270);
            currentX += ctx.measureText(line3[i]).width - 6;
          }

          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;

          const cardX = 70;
          const cardWidth = 940;
          const cardBottom = STORY.height - 300;
          const cardRadius = 44;
          const cardPaddingTop = 44;
          const cardPaddingBottom = 46;
          
          const cardContentHeight = 120 + 14 + 44 + 30 + 56 + 30 + 32;
          const cardHeight = cardPaddingTop + cardContentHeight + cardPaddingBottom;
          const cardY = cardBottom - cardHeight;

          ctx.fillStyle = "rgba(10, 10, 10, 0.72)";
          ctx.beginPath();
          ctx.roundRect(cardX, cardY, cardWidth, cardHeight, cardRadius);
          ctx.fill();

          ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(cardX, cardY, cardWidth, cardHeight, cardRadius);
          ctx.stroke();

          let contentY = cardY + cardPaddingTop;
          
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          const centerX = cardX + cardWidth / 2;
          
          ctx.font = "900 120px Inter, sans-serif";
          const iGotPart = "I got ";
          const scorePart = `${score}/10`;
          totalWidth = 0;
          for (let i = 0; i < iGotPart.length; i++) {
            totalWidth += ctx.measureText(iGotPart[i]).width - 5;
          }
          for (let i = 0; i < scorePart.length; i++) {
            totalWidth += ctx.measureText(scorePart[i]).width - 5;
          }
          
          currentX = centerX - totalWidth / 2;
          
          ctx.fillStyle = "#ffffff";
          for (let i = 0; i < iGotPart.length; i++) {
            ctx.fillText(iGotPart[i], currentX, contentY);
            currentX += ctx.measureText(iGotPart[i]).width - 5;
          }
          
          ctx.fillStyle = "#FF3366";
          for (let i = 0; i < scorePart.length; i++) {
            ctx.fillText(scorePart[i], currentX, contentY);
            currentX += ctx.measureText(scorePart[i]).width - 5;
          }
          
          contentY += 120 + 14;

          ctx.font = "700 44px Inter, sans-serif";
          ctx.fillStyle = "#f2f1ec";
          const beatMe = "Can you beat me.";
          totalWidth = 0;
          for (let i = 0; i < beatMe.length; i++) {
            totalWidth += ctx.measureText(beatMe[i]).width - 1;
          }
          currentX = centerX - totalWidth / 2;
          for (let i = 0; i < beatMe.length; i++) {
            ctx.fillText(beatMe[i], currentX, contentY);
            currentX += ctx.measureText(beatMe[i]).width - 1;
          }
          
          contentY += 44 + 30;

          const squareSize = 56;
          const squareGap = 12;
          const squaresTotalWidth = squareSize * 10 + squareGap * 9;
          let squareX = centerX - squaresTotalWidth / 2;
          
          guesses.forEach((correct: boolean) => {
            ctx.fillStyle = correct ? "#FF3366" : "rgba(255, 255, 255, 0.18)";
            ctx.beginPath();
            ctx.roundRect(squareX, contentY, squareSize, squareSize, 12);
            ctx.fill();
            squareX += squareSize + squareGap;
          });
          
          contentY += 56 + 30;

          ctx.font = "700 32px Inter, sans-serif";
          ctx.fillStyle = "rgba(255, 255, 255, 0.63)";
          const url = "hiiipower.app/ai-or-not";
          totalWidth = 0;
          for (let i = 0; i < url.length; i++) {
            totalWidth += ctx.measureText(url[i]).width - 0.5;
          }
          currentX = centerX - totalWidth / 2;
          for (let i = 0; i < url.length; i++) {
            ctx.fillText(url[i], currentX, contentY);
            currentX += ctx.measureText(url[i]).width - 0.5;
          }

          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to create blob"));
            }
          }, "image/png");
        };
        logo.onerror = () => {
          reject(new Error("Failed to load logo"));
        };
        logo.src = "/share/tri-white.png";
      };
      bg.onerror = () => {
        reject(new Error("Failed to load background image"));
      };
      bg.src = bgImage?.src || images[0]?.src || "";
    });
  };

  const shareToInstagramStory = async () => {
    try {
      const imageBlob = await generateStoryImage();
      const file = new File([imageBlob], "ai-or-not-story.png", {
        type: "image/png",
      });

      const shareText = getShareText();
      const shareUrl = `https://hiiipower.app/ai-or-not`;

      // Copy URL to clipboard
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(shareUrl);
          // Show a temporary tip
          const tip = document.createElement("div");
          tip.textContent = "stickers → Link → paste";
          tip.style.cssText = `
            position: fixed;
            bottom: 120px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            z-index: 9999;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
          `;
          document.body.appendChild(tip);
          // Fade in
          setTimeout(() => {
            tip.style.opacity = "1";
          }, 10);
          // Fade out and remove
          setTimeout(() => {
            tip.style.opacity = "0";
            setTimeout(() => tip.remove(), 300);
          }, 2500);
        } catch (clipErr) {
          console.log("Clipboard copy failed:", clipErr);
        }
      }

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

    const fetchManifestWithRetry = async (retries = 3): Promise<ImageData[]> => {
      for (let i = 0; i <= retries; i++) {
        try {
          const res = await fetch(`/ai-or-not/manifest.json?v=${Date.now()}`);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return await res.json();
        } catch (err) {
          console.error(`Manifest fetch attempt ${i + 1} failed:`, err);
          if (i === retries) {
            throw err;
          }
          await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, i)));
        }
      }
      throw new Error("Failed to fetch manifest");
    };

    fetchManifestWithRetry()
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
      })
      .catch((err) => {
        console.error("Failed to load new round:", err);
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
                      key={`${current.src}-${currentIndex}`}
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
