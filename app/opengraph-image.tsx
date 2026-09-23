import { ACCENT, ogContentType, ogSize, renderOgCard } from "@/lib/og-card";

export const alt = "HiiiPower — Social media, without the bullshit.";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgCard({
    title: "HiiiPower",
    hook: "Social media, without the bullshit.",
    brandTitle: true,
    children: (
      <div
        style={{
          display: "flex",
          width: 120,
          height: 6,
          borderRadius: 999,
          backgroundColor: ACCENT,
          marginTop: 8,
        }}
      />
    ),
  });
}
