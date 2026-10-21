export type WaitlistUtm = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

const STORAGE_KEY = "hiiipower_source";

/** Capture UTM from the URL once per session — same behavior as #22 waitlist tracking. */
export function captureWaitlistUtm(): WaitlistUtm {
  if (typeof window === "undefined") return {};

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as WaitlistUtm;
      if (parsed && typeof parsed === "object") return parsed;
    }
  } catch {
    // ignore
  }

  const params = new URLSearchParams(window.location.search);
  const captured: WaitlistUtm = {};
  const utmSource = params.get("utm_source");
  const utmMedium = params.get("utm_medium");
  const utmCampaign = params.get("utm_campaign");

  if (utmSource) captured.utm_source = utmSource;
  if (utmMedium) captured.utm_medium = utmMedium;
  if (utmCampaign) captured.utm_campaign = utmCampaign;

  if (Object.keys(captured).length > 0) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(captured));
    } catch {
      // ignore
    }
  }

  return captured;
}
