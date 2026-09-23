"use client";

import * as React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "inverse";
  size?: "sm" | "md" | "lg";
};

const variants = {
  primary:
    "bg-accent text-accent-ink hover:brightness-110 active:scale-[0.98]",
  secondary:
    "bg-transparent text-foreground border border-line hover:border-foreground/40 hover:bg-white/5 active:scale-[0.98]",
  inverse:
    "bg-foreground text-background hover:bg-white active:scale-[0.98]",
  ghost: "text-muted hover:text-foreground hover:bg-white/5",
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
    "inline-flex items-center justify-center rounded-full font-medium tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer disabled:opacity-40 disabled:pointer-events-none";
  const composedClassName = `${baseClasses} ${variants[variant]} ${sizes[size]}${className ? " " + className : ""}`;
  return <button className={composedClassName} {...props} />;
}
