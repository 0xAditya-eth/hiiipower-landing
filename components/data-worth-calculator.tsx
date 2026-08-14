"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

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
  { value: "northAmerica", label: "North America (Canada + USA)" },
  { value: "ukEurope", label: "United Kingdom & Europe" },
  { value: "restOfWorld", label: "Rest of the World" },
  { value: "global", label: "Global Average (Fallback default)" },
];

const PLATFORMS = [
  { id: "google", label: "Google / YouTube" },
  { id: "meta", label: "Meta (Facebook, Instagram, WhatsApp)" },
  { id: "amazon", label: "Amazon" },
  { id: "x", label: "X (formerly Twitter)" },
  { id: "openai", label: "OpenAI / ChatGPT" },
  { id: "tiktok", label: "TikTok" },
];

const INTENSITY_OPTIONS = [
  { value: 0.7, label: "Light", description: "Casual browsing, low daily screen time" },
  { value: 1.0, label: "Average", description: "Standard daily usage" },
  { value: 1.4, label: "Heavy", description: "Constant connectivity, power user" },
];

type CalculationResult = {
  annual: {
    conservative: number;
    central: number;
    expansive: number;
  };
  lifetime: {
    conservative: number;
    central: number;
    expansive: number;
  };
  projected60yr: {
    conservative: number;
    central: number;
    expansive: number;
  };
};

export function DataWorthCalculator() {
  const [region, setRegion] = useState<keyof typeof REGIONAL_VALUES>("global");
  const [yearsActive, setYearsActive] = useState(10);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [intensity, setIntensity] = useState(1.0);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  };

  const calculateWorth = () => {
    const regionalBase = REGIONAL_VALUES[region];
    
    // Platform coverage weight (defaults to 1.0 if no platforms selected or advanced section not used)
    const platformWeight = showAdvanced && selectedPlatforms.length > 0
      ? selectedPlatforms.length / PLATFORMS.length
      : 1.0;

    // Calculate for each scenario
    const conservative = regionalBase.conservative * platformWeight * intensity;
    const central = regionalBase.central * platformWeight * intensity;
    const expansive = regionalBase.expansive * platformWeight * intensity;

    const years = Math.min(yearsActive, 60);

    const calculatedResult: CalculationResult = {
      annual: {
        conservative: Math.round(conservative),
        central: Math.round(central),
        expansive: Math.round(expansive),
      },
      lifetime: {
        conservative: Math.round(conservative * years),
        central: Math.round(central * years),
        expansive: Math.round(expansive * years),
      },
      projected60yr: {
        conservative: Math.round(conservative * 60),
        central: Math.round(central * 60),
        expansive: Math.round(expansive * 60),
      },
    };

    setResult(calculatedResult);
    setShowResults(true);
  };

  const resetCalculator = () => {
    setShowResults(false);
    setResult(null);
  };

  const shareToTwitter = () => {
    const text = `I just calculated my data's worth. Tech platforms have extracted an estimated $${result?.lifetime.central.toLocaleString()} in value from my personal data so far. Calculate yours:`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareToLinkedIn = () => {
    const url = window.location.href;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
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
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 sm:p-12 text-center">
          <p className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-4">
            Your Data&apos;s Commercial Value
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 mb-4">
            ${result.lifetime.central.toLocaleString()}
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Your personal data has generated an estimated{" "}
            <span className="font-bold text-zinc-900">${result.lifetime.central.toLocaleString()}</span>{" "}
            in commercial value so far.
          </p>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 hover:border-zinc-300 hover:shadow-md transition-all duration-300">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
              Annual Value
            </p>
            <p className="text-2xl font-bold text-zinc-900">
              ${result.annual.central.toLocaleString()}
            </p>
            <p className="text-sm text-zinc-600 mt-2">Per year average</p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 hover:border-zinc-300 hover:shadow-md transition-all duration-300">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
              Lifetime So Far
            </p>
            <p className="text-2xl font-bold text-zinc-900">
              ${result.lifetime.central.toLocaleString()}
            </p>
            <p className="text-sm text-zinc-600 mt-2">Over {yearsActive} years</p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 hover:border-zinc-300 hover:shadow-md transition-all duration-300">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
              60-Year Projection
            </p>
            <p className="text-2xl font-bold text-zinc-900">
              ${result.projected60yr.central.toLocaleString()}
            </p>
            <p className="text-sm text-zinc-600 mt-2">Projected lifetime</p>
          </div>
        </div>

        {/* Scenario Comparison */}
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50/80 p-6 sm:p-8">
          <h3 className="text-xl font-bold text-zinc-900 mb-6">Scenario Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-zinc-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Conservative
                </span>
                <span className="text-xs text-zinc-400">(0.7×)</span>
              </div>
              <p className="text-xl font-bold text-zinc-900 mb-1">
                ${result.lifetime.conservative.toLocaleString()}
              </p>
              <p className="text-sm text-zinc-600">
                ${result.annual.conservative.toLocaleString()}/yr • ${result.projected60yr.conservative.toLocaleString()} lifetime
              </p>
            </div>

            <div className="bg-emerald-50 rounded-xl border-2 border-emerald-500 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  Central (Your Result)
                </span>
                <span className="text-xs text-emerald-600">(1.0×)</span>
              </div>
              <p className="text-xl font-bold text-zinc-900 mb-1">
                ${result.lifetime.central.toLocaleString()}
              </p>
              <p className="text-sm text-zinc-600">
                ${result.annual.central.toLocaleString()}/yr • ${result.projected60yr.central.toLocaleString()} lifetime
              </p>
            </div>

            <div className="bg-white rounded-xl border border-zinc-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Expansive
                </span>
                <span className="text-xs text-zinc-400">(1.4×)</span>
              </div>
              <p className="text-xl font-bold text-zinc-900 mb-1">
                ${result.lifetime.expansive.toLocaleString()}
              </p>
              <p className="text-sm text-zinc-600">
                ${result.annual.expansive.toLocaleString()}/yr • ${result.projected60yr.expansive.toLocaleString()} lifetime
              </p>
            </div>
          </div>
        </div>

        {/* Social Sharing */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
          <h3 className="text-lg font-bold text-zinc-900 mb-4">Share Your Results</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="primary" size="md" onClick={shareToTwitter}>
              Share to X/Twitter
            </Button>
            <Button variant="secondary" size="md" onClick={shareToLinkedIn}>
              Share to LinkedIn
            </Button>
            <Button variant="secondary" size="md" onClick={copyLink}>
              Copy Link
            </Button>
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
                max="60"
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
        </div>

        {/* Advanced Options */}
        <div className="border-t border-zinc-200 pt-6">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-between w-full text-left group"
          >
            <span className="text-sm font-semibold text-zinc-900 group-hover:text-zinc-700">
              Advanced Customization (Optional)
            </span>
            <svg
              className={`h-5 w-5 text-zinc-500 transition-transform ${showAdvanced ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="space-y-6 pt-6">
                  {/* Platforms */}
                  <div>
                    <label className="block text-sm font-semibold text-zinc-900 mb-3">
                      Platforms Used
                    </label>
                    <p className="text-sm text-zinc-500 mb-4">
                      Select the platforms you actively use. Each contributes to your total data value.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {PLATFORMS.map((platform) => (
                        <label
                          key={platform.id}
                          className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 hover:bg-zinc-50 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={selectedPlatforms.includes(platform.id)}
                            onChange={() => togglePlatform(platform.id)}
                            className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                          />
                          <span className="text-sm font-medium text-zinc-900">
                            {platform.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Usage Intensity */}
                  <div>
                    <label className="block text-sm font-semibold text-zinc-900 mb-3">
                      Usage Intensity
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {INTENSITY_OPTIONS.map((option) => (
                        <label
                          key={option.value}
                          className={`flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            intensity === option.value
                              ? "border-zinc-900 bg-zinc-50"
                              : "border-zinc-200 hover:border-zinc-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="intensity"
                            value={option.value}
                            checked={intensity === option.value}
                            onChange={() => setIntensity(option.value)}
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Calculate Button */}
        <div className="pt-4">
          <Button
            size="lg"
            onClick={calculateWorth}
            className="w-full"
          >
            Calculate My Data&apos;s Worth
          </Button>
          <p className="text-xs text-zinc-500 text-center mt-4">
            All calculations are performed 100% client-side. No data is collected or stored.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
