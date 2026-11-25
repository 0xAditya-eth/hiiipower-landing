export type DeviceClass = "android" | "ios" | "desktop";

export function detectDeviceClass(): DeviceClass {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent.toLowerCase();
  if (/android/.test(ua)) return "android";
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  return "desktop";
}

/** iPadOS Safari reports a Macintosh UA. Touch points separate it from a Mac. */
export function isIpadOsDesktopUa(): boolean {
  if (typeof navigator === "undefined") return false;
  return /macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1;
}

/**
 * Store to open directly. iPhone, iPad, and iPadOS return "ios".
 * Android returns "android". Desktop, including a Mac, returns null.
 */
export function directStore(): "ios" | "android" | null {
  if (typeof navigator === "undefined") return null;
  if (isIpadOsDesktopUa() || detectDeviceClass() === "ios") return "ios";
  if (detectDeviceClass() === "android") return "android";
  return null;
}
