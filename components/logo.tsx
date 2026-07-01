import Image from "next/image";

type LogoProps = {
  showText?: boolean;
  className?: string;
};

export function Logo({ showText = true, className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/favicon.ico"
        alt="HiiiPower"
        width={32}
        height={32}
        className="h-8 w-8 rounded-lg"
        priority
      />
      {showText && (
        <span className="font-bold text-lg tracking-tight text-zinc-900">HiiiPower</span>
      )}
    </span>
  );
}
