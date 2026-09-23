/** Cinema tokens — match Immersion / globals.css */
export const STORY = {
  bg: "#060606",
  fg: "#f2f1ec",
  muted: "#8c8b85",
  accent: "#ff3366",
  surface: "#181818",
  width: 1080,
  height: 1920,
} as const;

/** Dark field + soft pink radial aura for Instagram story canvases. */
export function fillCinemaBackground(
  ctx: CanvasRenderingContext2D,
  width = STORY.width,
  height = STORY.height
) {
  ctx.fillStyle = STORY.bg;
  ctx.fillRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height * 0.42;
  const radius = Math.max(width, height) * 0.55;
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
  grad.addColorStop(0, "rgba(255, 51, 102, 0.1)");
  grad.addColorStop(0.55, "rgba(255, 51, 102, 0.03)");
  grad.addColorStop(1, "rgba(255, 51, 102, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
}

/**
 * Prefer Syne / DM Sans when the browser has them (site loads both);
 * fall back to a geometric sans stack.
 */
export function storyFont(
  weight: "500" | "600" | "700" | "800",
  size: number,
  role: "display" | "body" = "display"
): string {
  const family =
    role === "display"
      ? '"Syne", "DM Sans", system-ui, sans-serif'
      : '"DM Sans", "Syne", system-ui, sans-serif';
  return `${weight} ${size}px ${family}`;
}
