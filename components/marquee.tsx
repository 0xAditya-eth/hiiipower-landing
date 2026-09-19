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
    <section className="relative z-10 border-y border-[var(--line)] py-3.5 overflow-hidden bg-[var(--surface)]/60">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center mx-5 text-sm font-medium tracking-wide text-[var(--muted)]"
          >
            <span className="mr-5 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
