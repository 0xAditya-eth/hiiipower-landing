const ITEMS = [
  "No bots",
  "No ads",
  "No filters",
  "No algorithms",
  "Real-time content only",
  "Verified humans",
  "You own your data",
  "No follower counts",
];

export function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <section className="relative z-10 border-y border-zinc-200/60 bg-zinc-50/80 backdrop-blur-sm py-4 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center mx-6 text-sm font-medium text-zinc-500">
            <span className="mr-6 text-zinc-300">✦</span>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
