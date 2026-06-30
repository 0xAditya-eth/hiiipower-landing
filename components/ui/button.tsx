"use client";

import * as React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

const variants = {
  primary:
    "bg-zinc-900 text-white hover:bg-zinc-800 shadow-lg shadow-zinc-900/20 hover:shadow-xl hover:shadow-zinc-900/25 active:scale-[0.98]",
  secondary:
    "bg-white/80 text-zinc-900 border border-zinc-200/80 hover:bg-white hover:border-zinc-300 shadow-sm active:scale-[0.98]",
  ghost: "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

export function Button({
  className = "",
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 focus-visible:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed";
  const composedClassName = `${baseClasses} ${variants[variant]} ${sizes[size]}${className ? " " + className : ""}`;
  return <button className={composedClassName} {...props} />;
}
