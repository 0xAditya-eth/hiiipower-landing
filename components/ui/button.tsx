"use client";

import * as React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

const variants = {
  primary:
    "bg-zinc-900 text-white hover:bg-zinc-800 active:scale-[0.98]",
  secondary:
    "bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 active:scale-[0.98]",
  ghost: "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

export function Button({
  className = "",
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 focus-visible:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none";
  const composedClassName = `${baseClasses} ${variants[variant]} ${sizes[size]}${className ? " " + className : ""}`;
  return <button className={composedClassName} {...props} />;
}
