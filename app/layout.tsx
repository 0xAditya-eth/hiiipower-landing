import type { Metadata } from "next";
import { Syne, DM_Sans, Inter } from "next/font/google";
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

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
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
  itunes: {
    appId: "6812477449",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appDescription =
    "Social media, without the bullshit. Real people. Real moments. Real power over your data and attention.";
  const publisher = {
    "@type": "Organization",
    name: "HiiiPower Technologies Private Limited",
  };
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "HiiiPower",
        operatingSystem: "iOS",
        applicationCategory: "SocialNetworkingApplication",
        url: "https://apps.apple.com/app/hiiipower/id6812477449",
        downloadUrl: "https://apps.apple.com/app/hiiipower/id6812477449",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description: appDescription,
        publisher,
      },
      {
        "@type": "SoftwareApplication",
        name: "HiiiPower",
        operatingSystem: "Android",
        applicationCategory: "SocialNetworkingApplication",
        url: "https://play.google.com/store/apps/details?id=com.hiiipower.social",
        downloadUrl: "https://play.google.com/store/apps/details?id=com.hiiipower.social",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description: appDescription,
        publisher,
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${display.variable} ${body.variable} ${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
