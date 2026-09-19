"use client";

import * as React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "inverse" | "ghost";
  size?: "sm" | "md" | "lg";
};

const variants = {
  primary:
    "bg-[var(--ink)] text-[var(--paper)] hover:bg-[#252a27] active:scale-[0.98]",
  secondary:
    "bg-transparent text-[var(--ink)] border border-[var(--line)] hover:border-[var(--ink)] hover:bg-white/50 active:scale-[0.98]",
  inverse:
    "bg-[var(--paper)] text-[var(--ink)] hover:bg-white active:scale-[0.98]",
  ghost: "text-[var(--muted)] hover:text-[var(--ink)] hover:bg-black/[0.04]",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function Button({
  className = "",
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] cursor-pointer disabled:opacity-50 disabled:pointer-events-none";
  const composedClassName = `${baseClasses} ${variants[variant]} ${sizes[size]}${className ? " " + className : ""}`;
  return <button className={composedClassName} {...props} />;
}
