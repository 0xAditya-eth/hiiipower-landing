import type { Metadata } from "next";

const title = "Get HiiiPower";
const description =
  "Real people. Live camera. No ads, no likes. Your data stays yours.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://www.hiiipower.app/download",
    siteName: "HiiiPower",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@hiiipower_zk",
  },
};

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
