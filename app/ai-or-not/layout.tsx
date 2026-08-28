import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI or Not — Can you tell what's real?",
  description: "10 photos. Half are AI. Play the same round as your friend.",
  openGraph: {
    title: "AI or Not — Can you tell what's real?",
    description: "10 photos. Half are AI. Play the same round as your friend.",
    url: "https://www.hiiipower.app/ai-or-not",
    siteName: "HiiiPower",
    images: [
      {
        url: "/ai-or-not/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AI or Not — Can you tell what's real?",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI or Not — Can you tell what's real?",
    description: "10 photos. Half are AI. Play the same round as your friend.",
    images: ["/ai-or-not/opengraph-image"],
    creator: "@hiiipower_zk",
  },
};

export default function AIOrNotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
