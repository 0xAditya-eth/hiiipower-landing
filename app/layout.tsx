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
  title: "HiiiPower — Social media, without the bullshit.",
  description:
    "Social media, without the bullshit. Real people. Real moments. Real power over your data and attention.",
  metadataBase: new URL("https://www.hiiipower.app"),
  openGraph: {
    title: "HiiiPower — Social media, without the bullshit.",
    description:
      "Social media, without the bullshit. Real people. Real moments. Real power over your data and attention.",
    url: "https://www.hiiipower.app",
    siteName: "HiiiPower",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "HiiiPower — Social media, without the bullshit.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HiiiPower — Social media, without the bullshit.",
    description:
      "Social media, without the bullshit. Real people. Real moments. Real power over your data and attention.",
    images: ["/opengraph-image"],
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
