"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type DataWorthCalculatorProps = {
  onJoin?: () => void;
};

// Regional PDAV values from Web3 Foundation report
const REGIONAL_VALUES = {
  usa: { central: 6563, conservative: 4594, expansive: 9188 },
  northAmerica: { central: 4643, conservative: 3250, expansive: 6500 },
  ukEurope: { central: 1604, conservative: 1123, expansive: 2246 },
  restOfWorld: { central: 265, conservative: 186, expansive: 371 },
  global: { central: 694, conservative: 486, expansive: 972 },
};

const REGIONS = [
  { value: "usa", label: "United States" },
  { value: "northAmerica", label: "Rest of North America" },
  { value: "ukEurope", label: "United Kingdom & Europe" },
  { value: "restOfWorld", label: "Rest of the World" },
  { value: "global", label: "Global Average" },
];


const USAGE_SCENARIOS = [
  { 
    value: "conservative" as const, 
    label: "Light User", 
    description: "Casual browsing, low daily screen time",
    multiplier: 0.7
  },
  { 
    value: "central" as const, 
    label: "Average User", 
    description: "Standard daily usage across platforms",
    multiplier: 1.0
  },
  { 
    value: "expansive" as const, 
    label: "Heavy User", 
    description: "Constant connectivity, power user",
    multiplier: 1.4
  },
];

type CalculationResult = {
  annual: number;
  lifetime: number;
  lifetimeInflationAdjusted: number;
  scenario: "conservative" | "central" | "expansive";
};

// Map scenario keys to user-friendly labels
const getScenarioLabel = (scenario: "conservative" | "central" | "expansive"): string => {
  const mapping = {
    conservative: "Light User",
    central: "Average User",
    expansive: "Heavy User",
  };
  return mapping[scenario];
};

export function DataWorthCalculator({ onJoin }: DataWorthCalculatorProps) {
  const [region, setRegion] = useState<keyof typeof REGIONAL_VALUES>("global");
  const [yearsActive, setYearsActive] = useState(10);
  const [usageScenario, setUsageScenario] = useState<"conservative" | "central" | "expansive">("central");
  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const resultHeroRef = useRef<HTMLDivElement>(null);

  // Detect mobile vs desktop
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };
    
    // Set initial value
    handleChange(mediaQuery);
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Scroll to results after they render
  useEffect(() => {
    if (showResults && resultHeroRef.current) {
      // Small delay to ensure the DOM has updated
      setTimeout(() => {
        resultHeroRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  }, [showResults]);

  const calculateWorth = () => {
    setIsCalculating(true);
    
    // Show calculating state for 2.5 seconds
    setTimeout(() => {
      const regionalBase = REGIONAL_VALUES[region];
      
      // Get base value for selected scenario
      const baseAnnualValue = regionalBase[usageScenario];
      
      // Always use full platform coverage (platformWeight = 1.0)
      const annualValue = baseAnnualValue * 1.0;
      const years = Math.min(yearsActive, 25);

      // Inflation adjustment: 3% annual inflation rate (common assumption in PDAV frameworks)
      const inflationRate = 0.03;
      
      // Inflation-adjusted lifetime so far (PAST years - inflate to present)
      // Data from past years is worth MORE in today's dollars
      const lifetimeInflated = Array.from({ length: years }, (_, i) => {
        // i=0 is most recent year, i=years-1 is oldest year
        const yearsAgo = years - 1 - i;
        return annualValue * Math.pow(1 + inflationRate, yearsAgo);
      }).reduce((sum, val) => sum + val, 0);

      const calculatedResult: CalculationResult = {
        annual: Math.round(annualValue),
        lifetime: Math.round(annualValue * years),
        lifetimeInflationAdjusted: Math.round(lifetimeInflated),
        scenario: usageScenario,
      };

      setResult(calculatedResult);
      setIsCalculating(false);
      setShowResults(true);
    }, 2500);
  };

  const resetCalculator = () => {
    setShowResults(false);
    setResult(null);
  };

  const shareToTwitter = () => {
    const text = `Turns out Big Tech has extracted an estimated $${result?.lifetime.toLocaleString()} from my data so far.

Curious if anyone on my timeline is worth more to platforms than me.

Find out what your data is worth 👇`;
    const url = 'https://www.hiiipower.app/your-worth';
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareToLinkedIn = () => {
    const text = `Turns out Big Tech has extracted an estimated $${result?.lifetime.toLocaleString()} from my data so far.

Curious if anyone on my timeline is worth more to platforms than me.

Find out what your data is worth 👇

https://www.hiiipower.app/your-worth`;
    window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`, '_blank');
  };

  const generateStoryImage = (): Promise<Blob> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d')!;

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, 1920);
      gradient.addColorStop(0, '#18181b');
      gradient.addColorStop(1, '#3f3f46');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1080, 1920);

      // Main content
      ctx.textAlign = 'center';
      
      // Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 48px system-ui, -apple-system, sans-serif';
      ctx.fillText('Your Data\'s Commercial Value', 540, 600);

      // Value
      ctx.font = 'bold 120px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#10b981';
      ctx.fillText(`$${result?.lifetime.toLocaleString()}`, 540, 800);

      // Description
      ctx.fillStyle = '#d4d4d8';
      ctx.font = '36px system-ui, -apple-system, sans-serif';
      const description = 'I calculated my data\'s worth';
      ctx.fillText(description, 540, 950);

      // URL
      ctx.fillStyle = '#a1a1aa';
      ctx.font = 'bold 32px system-ui, -apple-system, sans-serif';
      ctx.fillText('hiiipower.app/your-worth', 540, 1100);

      // Logo/Brand area
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 42px system-ui, -apple-system, sans-serif';
      ctx.fillText('HiiiPower', 540, 1700);

      canvas.toBlob((blob) => {
        resolve(blob!);
      }, 'image/png');
    });
  };

  const shareToInstagram = async () => {
    try {
      const blob = await generateStoryImage();
      const file = new File([blob], 'data-worth-story.png', { type: 'image/png' });

      // Check if Web Share API is available and supports files
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'My Data\'s Worth',
          text: `I calculated my data's worth: $${result?.lifetime.toLocaleString()}`,
        });
      } else {
        // Fallback: download the image
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data-worth-story.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error sharing to Instagram:', error);
      // If share fails, try download fallback
      const blob = await generateStoryImage();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data-worth-story.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  if (showResults && result) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Hero Result */}
        <div 
          ref={resultHeroRef}
          className="rounded-2xl border border-zinc-200 bg-white p-8 sm:p-12 text-center"
          style={{ scrollMarginTop: '6rem' }}
        >
          <p className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-4">
            Your Data&apos;s Commercial Value
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 mb-4">
            ${result.lifetime.toLocaleString()}
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Your personal data has generated an estimated{" "}
            <span className="font-bold text-zinc-900">${result.lifetime.toLocaleString()}</span>{" "}
            in commercial value so far based on {getScenarioLabel(result.scenario)} usage patterns.
          </p>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 hover:border-zinc-300 hover:shadow-md transition-all duration-300">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
              Annual Value
            </p>
            <p className="text-2xl font-bold text-zinc-900">
              ${result.annual.toLocaleString()}
            </p>
            <p className="text-sm text-zinc-600 mt-2">Per year</p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 hover:border-zinc-300 hover:shadow-md transition-all duration-300">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
              Lifetime So Far
            </p>
            <p className="text-2xl font-bold text-zinc-900">
              ${result.lifetime.toLocaleString()}
            </p>
            <p className="text-sm text-zinc-600 mt-2">Over {yearsActive} years (nominal)</p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 hover:border-emerald-300 hover:shadow-md transition-all duration-300">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">
              Lifetime So Far (Inflation-Adj)
            </p>
            <p className="text-2xl font-bold text-zinc-900">
              ${result.lifetimeInflationAdjusted.toLocaleString()}
            </p>
            <p className="text-sm text-zinc-600 mt-2">In today&apos;s dollars (3% inflation)</p>
          </div>
        </div>

        {/* HiiiPower CTA */}
        <div className="rounded-2xl border-2 border-emerald-500 bg-gradient-to-br from-emerald-50 to-white p-8 sm:p-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500 mb-6">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mb-4">
              Take Back Control of Your Data
            </h3>
            <p className="text-lg text-zinc-600 mb-6 leading-relaxed">
              While you can&apos;t claim this money from tech companies, <span className="font-bold text-zinc-900">you can stop them from extracting more</span>. HiiiPower helps you take back control and start earning your data&apos;s worth going forward. Join a social network where you own your data, control your privacy, and keep the value you create.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" onClick={onJoin || (() => window.location.href = '/#join')}>
                Join the Waitlist
              </Button>
              <Button variant="secondary" size="lg" onClick={() => window.location.href = '/'}>
                Learn More About HiiiPower
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
            {isMobile ? (
              <Button variant="secondary" size="md" onClick={shareToInstagram}>
                Share to Instagram
              </Button>
            ) : (
              <Button variant="secondary" size="md" onClick={shareToLinkedIn}>
                Share to LinkedIn
              </Button>
            )}
          </div>
        </div>

        {/* Transparency & Disclaimer */}
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-zinc-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="space-y-3">
              <p className="text-sm text-zinc-600 leading-relaxed">
                <span className="font-semibold text-zinc-900">Important Disclaimer:</span>{" "}
                These figures represent estimated commercial value extracted by tech corporations based on the Web3 Foundation PDAV framework, not funds directly redeemable or owed to you.
              </p>
              <p className="text-sm text-zinc-600">
                Based on{" "}
                <a
                  href="https://web3.foundation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-900 font-medium hover:underline"
                >
                  Web3 Foundation
                </a>{" "}
                &quot;The Hidden Price of Free: What Your Data Is Really Worth&quot; (May 2026) — Personal Data Annual Value (PDAV) framework.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button variant="ghost" size="lg" onClick={resetCalculator}>
            ← Recalculate
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 lg:p-10"
    >
      <div className="space-y-8">
        {/* Primary Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-zinc-900 mb-3">
              Country / Region <span className="text-red-500">*</span>
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value as keyof typeof REGIONAL_VALUES)}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/20 focus:border-zinc-900 transition-all"
            >
              {REGIONS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-900 mb-3">
              Years Active Online <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              <input
                type="range"
                min="1"
                max="25"
                value={yearsActive}
                onChange={(e) => setYearsActive(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
              />
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-zinc-900">{yearsActive} years</span>
                <span className="text-sm text-zinc-500">Roughly how many years have you been using the internet regularly?</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-900 mb-3">
              Your Usage Level <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-zinc-500 mb-4">
              Select the usage pattern that best describes your online activity
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {USAGE_SCENARIOS.map((option) => (
                <label
                  key={option.value}
                  className={`flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    usageScenario === option.value
                      ? "border-zinc-900 bg-zinc-50 shadow-sm"
                      : "border-zinc-200 hover:border-zinc-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="usage"
                    value={option.value}
                    checked={usageScenario === option.value}
                    onChange={() => setUsageScenario(option.value)}
                    className="sr-only"
                  />
                  <span className="text-sm font-bold text-zinc-900 mb-1">
                    {option.label}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {option.description}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="pt-4">
          <Button
            size="lg"
            onClick={calculateWorth}
            className="w-full"
            disabled={isCalculating}
          >
            {isCalculating ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Calculating...
              </span>
            ) : (
              "Calculate My Data's Worth"
            )}
          </Button>
          <p className="text-xs text-zinc-500 text-center mt-4">
            All calculations are performed 100% client-side. No data is collected or stored.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
