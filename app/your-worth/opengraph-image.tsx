import { ACCENT, ogContentType, ogSize, renderOgCard } from "@/lib/og-card";

export const alt = "Find your data's worth. — What Big Tech made off your data.";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgCard({
    title: "Find your data's worth.",
    hook: "What Big Tech made off your data.",
    children: (
      <div
        style={{
          display: "flex",
          fontFamily: "Syne",
          fontSize: 148,
          fontWeight: 800,
          color: ACCENT,
          lineHeight: 0.85,
          opacity: 0.9,
          marginTop: 8,
        }}
      >
        $
      </div>
    ),
  });
}
