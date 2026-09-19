import Image from "next/image";

type LogoProps = {
  showText?: boolean;
  className?: string;
  light?: boolean;
};

export function Logo({ showText = true, className = "", light = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/favicon.ico"
        alt="HiiiPower"
        width={32}
        height={32}
        className="h-8 w-8 rounded-md"
        priority
      />
      {showText && (
        <span
          className={`font-display text-xl font-bold tracking-tight ${
            light ? "text-white" : "text-[var(--ink)]"
          }`}
        >
          HiiiPower
        </span>
      )}
    </span>
  );
}
