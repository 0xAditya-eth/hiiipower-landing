import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Worth?",
  description: "What Big Tech made off your data.",
  openGraph: {
    title: "Your Worth?",
    description: "What Big Tech made off your data.",
    url: "https://www.hiiipower.app/your-worth",
    siteName: "HiiiPower",
    images: [
      {
        url: "/your-worth/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Your Worth? — What Big Tech made off your data.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Worth?",
    description: "What Big Tech made off your data.",
    images: ["/your-worth/opengraph-image"],
    creator: "@hiiipower_zk",
  },
};

export default function YourWorthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
