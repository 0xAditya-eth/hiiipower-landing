import { ACCENT, MUTED, ogContentType, ogSize, renderOgCard } from "@/lib/og-card";

export const alt = "Real or AI? — 10 photos. Half are Slop.";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgCard({
    title: "Real or AI?",
    hook: "10 photos. Half are Slop.",
    children: (
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              backgroundColor: i < 3 ? ACCENT : "#181818",
              border: i < 3 ? "none" : `1px solid ${MUTED}33`,
            }}
          />
        ))}
      </div>
    ),
  });
}
