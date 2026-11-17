import type { Metadata } from "next";

const title = "Need an invite?";
const description =
  "HiiiPower is invite-only right now. Got a code? Download the app and enter it there. No code? Join the waitlist, and move up by playing AI or Not or sharing it with a friend. No ranks. No scores.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://www.hiiipower.app/invite",
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

export default function InviteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
