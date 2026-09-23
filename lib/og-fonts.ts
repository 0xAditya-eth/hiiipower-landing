/** Load a Google Font as ArrayBuffer for next/og (Satori). */
export async function loadGoogleFont(
  family: string,
  weight: number
): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`,
    {
      headers: {
        // Request TTF/OTF — Satori does not support woff2.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    }
  ).then((res) => res.text());

  const match = css.match(/src: url\(([^)]+)\) format\('(opentype|truetype)'\)/);
  if (!match?.[1]) {
    throw new Error(`Failed to locate font file for ${family} ${weight}`);
  }

  return fetch(match[1]).then((res) => res.arrayBuffer());
}

export type OgFonts = {
  display: ArrayBuffer;
  body: ArrayBuffer;
};

let fontsPromise: Promise<OgFonts> | null = null;

/** Cached Syne + DM Sans for all OG routes. */
export function getOgFonts(): Promise<OgFonts> {
  if (!fontsPromise) {
    fontsPromise = Promise.all([
      loadGoogleFont("Syne", 800),
      loadGoogleFont("DM Sans", 500),
    ]).then(([display, body]) => ({ display, body }));
  }
  return fontsPromise;
}
