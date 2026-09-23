import Image from "next/image";

type BrandMarkProps = {
  /** Pixel size when not filling a parent. Ignored when `fill` is true. */
  size?: number;
  /** Fill the parent (parent must be `relative` with explicit size). */
  fill?: boolean;
  className?: string;
  /** Invert black PNG to white for dark backgrounds. */
  invert?: boolean;
  priority?: boolean;
  /** Image path. Default is the hero mark; pass `/icon2-inverted.png` for chrome. */
  src?: string;
};

export function BrandMark({
  size = 28,
  fill = false,
  className = "",
  invert = true,
  priority = false,
  src = "/brand-mark.png",
}: BrandMarkProps) {
  return (
    <Image
      src={src}
      alt=""
      {...(fill
        ? { fill: true as const, sizes: "160px" }
        : { width: size, height: size })}
      priority={priority}
      className={`object-contain ${invert ? "invert" : ""} ${className}`}
      aria-hidden
    />
  );
}
