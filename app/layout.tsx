import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "HiiiPower — Real People. Real Moments. Real Power.",
  description:
    "HiiiPower is the social network where authenticity wins. No bots. No filters. Just you — raw, real, and in control.",
  metadataBase: new URL("https://www.hiiipower.app"),
  openGraph: {
    title: "HiiiPower — Real People. Real Moments. Real Power.",
    description:
      "HiiiPower is the social network where authenticity wins. No bots. No filters. Just you — raw, real, and in control.",
    url: "https://hiiipower.app",
    siteName: "HiiiPower",
    images: [
      {
        url: "/discover-feed.png",
        width: 340,
        height: 735,
        alt: "HiiiPower social network",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HiiiPower — Real People. Real Moments. Real Power.",
    description:
      "HiiiPower is the social network where authenticity wins. No bots. No filters. Just you — raw, real, and in control.",
    images: ["/discover-feed.png"],
    creator: "@hiiipower_zk",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
