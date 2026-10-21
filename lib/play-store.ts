export const PLAY_STORE_PACKAGE = "com.hiiipower.social";
export const PLAY_STORE_LISTING_URL =
  "https://play.google.com/store/apps/details?id=com.hiiipower.social";

/** Google Play campaign referrer: utm_source=site&utm_content=<page> */
export function playStoreUrl(utmContent: string): string {
  const referrer = `utm_source=site&utm_content=${utmContent}`;
  return `${PLAY_STORE_LISTING_URL}&referrer=${encodeURIComponent(referrer)}`;
}
