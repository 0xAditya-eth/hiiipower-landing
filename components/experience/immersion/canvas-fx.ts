/**
 * Scroll-reactive star field.
 * Section changes use a 3D in/out (depth) warp — not vertical streaks.
 */

type Speck = {
  x: number; // -0.5..0.5 normalized from center
  y: number;
  z: number; // depth 0.05 (near) → 1 (far)
  a: number;
  spark: boolean;
};

export type AtmosphereSection =
  | "intro"
  | "feed"
  | "people"
  | "moments"
  | "power"
  | "finale";

const SECTION_TINT: Record<AtmosphereSection, string> = {
  intro: "#d8dde8",
  feed: "#e8eadf",
  people: "#ff3366",
  moments: "#ffb59a",
  power: "#b8c4ff",
  finale: "#f2f1ec",
};

export class CanvasFx {
  private ctx: CanvasRenderingContext2D;
  private w = 0;
  private h = 0;
  private specks: Speck[] = [];
  private dpr = 1;

  private progress = 0;
  private velocity = 0;
  private strength = 0;
  private section: AtmosphereSection = "intro";
  private sectionAge = 10;
  private transition = 0;
  /** +1 = fly toward camera (out of depth), -1 = fall away into depth */
  private warpDir = 1;

  private pointerX = 0;
  private pointerY = 0;
  private pointerTX = 0;
  private pointerTY = 0;
  private driftZ = 0;
  private driftBias = 0.15;

  constructor(private canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) throw new Error("2d context unavailable");
    this.ctx = ctx;
    this.resize();
  }

  resize() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width = Math.floor(this.w * this.dpr);
    this.canvas.height = Math.floor(this.h * this.dpr);
    this.canvas.style.width = `${this.w}px`;
    this.canvas.style.height = `${this.h}px`;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.seed();
  }

  private seed() {
    const area = this.w * this.h;
    const count = Math.round(Math.min(560, 200 + area / 5200));
    this.specks = Array.from({ length: count }, () => ({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: 0.08 + Math.random() * 0.92,
      a: 0.25 + Math.random() * 0.55,
      spark: Math.random() > 0.9,
    }));
  }

  setNoise(_amount: number) {}

  setStars(amount: number) {
    this.strength = Math.max(0, Math.min(1, amount));
  }

  setScroll(progress: number) {
    this.progress = progress;
  }

  setVelocity(v: number) {
    this.velocity = v;
  }

  setPointer(nx: number, ny: number) {
    this.pointerTX = nx;
    this.pointerTY = ny;
  }

  /**
   * Section change → 3D warp.
   * Forward scroll = stars rush toward you; back = recede into depth.
   */
  setSection(id: AtmosphereSection, dir = 1) {
    if (id === this.section) return;
    this.section = id;
    this.sectionAge = 0;
    this.transition = 1;
    this.warpDir = dir >= 0 ? 1 : -1;

    const biases: Record<AtmosphereSection, number> = {
      intro: 0.08,
      feed: 0.14,
      people: 0.2,
      moments: 0.12,
      power: 0.22,
      finale: 0.1,
    };
    this.driftBias = biases[id];
  }

  shatter() {}

  frame(dt: number) {
    const { ctx, w, h } = this;
    ctx.clearRect(0, 0, w, h);

    this.sectionAge += dt;
    // ~2× slower settle (~1.8s instead of ~0.9s)
    this.transition = Math.max(0, this.transition - dt * 0.55);

    if (this.strength < 0.01 && this.transition < 0.02) return;

    this.pointerX += (this.pointerTX - this.pointerX) * Math.min(1, dt * 5);
    this.pointerY += (this.pointerTY - this.pointerY) * Math.min(1, dt * 5);

    // Depth travel — slow with scroll, gentler surge on section change
    const scrollZ = (this.velocity / Math.max(h, 1)) * 0.08;
    const surge = this.transition * this.transition * 1.1;
    this.driftZ +=
      (scrollZ * 0.35 + this.driftBias * dt * 0.12 + this.warpDir * surge * dt * 1.15);

    const strength = Math.max(this.strength, this.transition * 0.9);
    const tint = SECTION_TINT[this.section];
    const cx = w * (0.5 + this.pointerX * 0.04);
    const cy = h * (0.5 + this.pointerY * 0.03);
    const fov = Math.min(w, h) * 0.72;

    // Soft depth pulse on change
    if (this.transition > 0.04) {
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.55);
      g.addColorStop(0, this.hexAlpha(tint, 0.06 * this.transition));
      g.addColorStop(0.55, this.hexAlpha(tint, 0.02 * this.transition));
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }

    for (const s of this.specks) {
      // Advance through depth tunnel
      let z = s.z - this.driftZ * (0.35 + (1 - s.z) * 0.4);
      // Wrap in depth so field is endless
      z = ((z % 1) + 1) % 1;
      z = 0.04 + z * 0.96;

      const inv = 1 / z;
      const px = cx + s.x * fov * inv;
      const py = cy + s.y * fov * inv;

      if (px < -20 || px > w + 20 || py < -20 || py > h + 20) continue;

      const tw = 0.7 + 0.3 * Math.sin(this.progress * 6 + s.x * 20);
      const near = 1 - z;
      const alpha = s.a * strength * tw * (0.25 + near * 0.75);
      // Size grows as stars approach camera
      const size = (s.spark ? 1.4 : 0.9) * (0.5 + near * 1.8);

      // During warp: longer, softer depth trails
      if (this.transition > 0.05 && near > 0.15) {
        const prevInv = 1 / Math.min(0.98, z + this.warpDir * this.transition * 0.05);
        const ox = cx + s.x * fov * prevInv;
        const oy = cy + s.y * fov * prevInv;
        ctx.globalAlpha = alpha * this.transition * 0.45;
        ctx.strokeStyle = tint;
        ctx.lineWidth = Math.max(0.5, size * 0.3);
        ctx.beginPath();
        ctx.moveTo(ox, oy);
        ctx.lineTo(px, py);
        ctx.stroke();
      }

      ctx.globalAlpha = alpha;
      ctx.fillStyle = s.spark ? "#f7f5ef" : tint;
      ctx.fillRect(px - size * 0.5, py - size * 0.5, size, size);

      if (s.spark && near > 0.45 && alpha > 0.3) {
        ctx.globalAlpha = alpha * 0.3;
        ctx.fillRect(px - 2, py - 0.3, 4, 0.6);
        ctx.fillRect(px - 0.3, py - 2, 0.6, 4);
      }
    }

    ctx.globalAlpha = 1;
  }

  private hexAlpha(hex: string, a: number) {
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${a})`;
  }
}
