import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support | HiiiPower",
  description: "Get help with HiiiPower. Contact our support team.",
  openGraph: {
    title: "Support | HiiiPower",
    description: "Get help with HiiiPower. Contact our support team.",
    url: "https://www.hiiipower.app/support",
    siteName: "HiiiPower",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Support | HiiiPower",
    description: "Get help with HiiiPower. Contact our support team.",
    creator: "@hiiipower_zk",
  },
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
