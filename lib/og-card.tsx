import React from "react";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getOgFonts } from "@/lib/og-fonts";

export const ogSize = { width: 1200, height: 630 } as const;
export const ogContentType = "image/png";

const BG = "#060606";
const FG = "#f2f1ec";
const MUTED = "#8c8b85";
const ACCENT = "#ff3366";

type OgCardProps = {
  title: string;
  hook: string;
  /** Center graphic below the hook */
  children?: React.ReactNode;
  /** Slightly larger title (e.g. brand name) */
  brandTitle?: boolean;
};

async function getMarkDataUrl(): Promise<string> {
  const bytes = await readFile(
    join(process.cwd(), "public/icon2-inverted.png")
  );
  return `data:image/png;base64,${bytes.toString("base64")}`;
}

/** Shared cinema OG frame — tokens match Immersion / ExperienceShell. */
export function OgCardFrame({
  title,
  hook,
  children,
  brandTitle = false,
  markSrc,
}: OgCardProps & { markSrc: string }) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: BG,
        position: "relative",
        padding: "40px 64px 36px",
      }}
    >
      {/* Soft pink aura */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 700,
          height: 700,
          marginTop: -350,
          marginLeft: -350,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,51,102,0.08) 0%, transparent 68%)",
          display: "flex",
        }}
      />

      {/* Brand chrome — reserved row so headings never collide */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          height: 40,
          flexShrink: 0,
        }}
      >
        <img
          src={markSrc}
          width={32}
          height={32}
          alt=""
          style={{ objectFit: "contain" }}
        />
        <span
          style={{
            fontFamily: "Syne",
            fontSize: 20,
            fontWeight: 800,
            color: FG,
            letterSpacing: "-0.02em",
          }}
        >
          HiiiPower
        </span>
      </div>

      {/* Content — heading locked below brand; graphic fills space under */}
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          paddingTop: 96,
        }}
      >
        <div
          style={{
            fontFamily: "Syne",
            fontSize: brandTitle ? 84 : 52,
            fontWeight: 800,
            color: FG,
            letterSpacing: "-0.03em",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: brandTitle ? 26 : 18,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontFamily: "DM Sans",
            fontSize: 28,
            fontWeight: 500,
            color: MUTED,
            textAlign: "center",
            lineHeight: 1.35,
            maxWidth: 900,
            marginBottom: children && brandTitle ? 36 : 0,
          }}
        >
          {hook}
        </div>

        {/* Brand home: keep accent mark tight under hook.
            Feature cards: center graphic in leftover space. */}
        {children && brandTitle ? children : null}
        {children && !brandTitle ? (
          <div
            style={{
              display: "flex",
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 8,
              paddingBottom: 8,
            }}
          >
            {children}
          </div>
        ) : null}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 32,
          flexShrink: 0,
          fontFamily: "DM Sans",
          fontSize: 22,
          fontWeight: 500,
          color: MUTED,
          letterSpacing: "0.04em",
        }}
      >
        hiiipower.app
      </div>
    </div>
  );
}

export async function renderOgCard({
  title,
  hook,
  children,
  brandTitle,
}: OgCardProps) {
  const [{ display, body }, markSrc] = await Promise.all([
    getOgFonts(),
    getMarkDataUrl(),
  ]);

  return new ImageResponse(
    (
      <OgCardFrame
        title={title}
        hook={hook}
        brandTitle={brandTitle}
        markSrc={markSrc}
      >
        {children}
      </OgCardFrame>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Syne", data: display, style: "normal", weight: 800 },
        { name: "DM Sans", data: body, style: "normal", weight: 500 },
      ],
      headers: {
        "Cache-Control": "public, max-age=86400, immutable",
      },
    }
  );
}

export { ACCENT, BG, FG, MUTED };
