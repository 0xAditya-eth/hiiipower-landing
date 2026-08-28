import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
