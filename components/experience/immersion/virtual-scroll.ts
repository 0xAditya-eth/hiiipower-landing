/**
 * Virtual scroll — one eased progress drives the experience.
 * Exposes velocity so atmosphere can respond to wheel / touch.
 */

export type VirtualScrollOptions = {
  /** Higher = snappier. ~8–14 feels cinematic. */
  damp?: number;
  wheelScale?: number;
  touchScale?: number;
  /** Momentum decay per second after a flick (higher = stops sooner). */
  coastDecay?: number;
  onFrame: (
    progress: number,
    current: number,
    max: number,
    dt: number,
    velocity: number
  ) => void;
};

export class VirtualScroll {
  target = 0;
  current = 0;
  max = 1;
  locked = false;
  /** px/sec of virtual scroll (smoothed) */
  velocity = 0;
  private damp: number;
  private wheelScale: number;
  private touchScale: number;
  private coastDecay: number;
  private onFrame: VirtualScrollOptions["onFrame"];
  private raf = 0;
  private last = 0;
  private touchY = 0;
  private touchLastT = 0;
  private touchVel = 0;
  private coastVel = 0;
  private coastLeft = 0;
  private mounted = false;
  private prev = 0;

  constructor(opts: VirtualScrollOptions) {
    this.damp = opts.damp ?? 10.5;
    this.wheelScale = opts.wheelScale ?? 1.05;
    this.touchScale = opts.touchScale ?? 1.4;
    this.coastDecay = opts.coastDecay ?? 3.2;
    this.onFrame = opts.onFrame;
  }

  setMax(px: number) {
    this.max = Math.max(1, px);
    this.target = Math.min(this.target, this.max);
    this.current = Math.min(this.current, this.max);
  }

  lock(at = this.current) {
    this.locked = true;
    this.target = at;
    this.current = at;
    this.velocity = 0;
    this.coastVel = 0;
    this.coastLeft = 0;
  }

  unlock() {
    this.locked = false;
  }

  setProgress(p: number, hard = false) {
    const v = Math.max(0, Math.min(1, p)) * this.max;
    this.target = v;
    this.coastVel = 0;
    this.coastLeft = 0;
    if (hard) {
      this.current = v;
      this.prev = v;
      this.velocity = 0;
    }
  }

  get progress() {
    return this.current / this.max;
  }

  private onWheel = (e: WheelEvent) => {
    if (this.locked) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    this.coastVel = 0;
    this.coastLeft = 0;
    this.target = Math.max(
      0,
      Math.min(this.max, this.target + e.deltaY * this.wheelScale)
    );
  };

  private onTouchStart = (e: TouchEvent) => {
    this.touchY = e.touches[0]?.clientY ?? 0;
    this.touchLastT = performance.now();
    this.touchVel = 0;
    this.coastVel = 0;
    this.coastLeft = 0;
  };

  private onTouchMove = (e: TouchEvent) => {
    if (this.locked) {
      e.preventDefault();
      return;
    }
    const y = e.touches[0]?.clientY ?? 0;
    const now = performance.now();
    const dy = this.touchY - y;
    const dt = Math.max(0.008, (now - this.touchLastT) / 1000);
    this.touchY = y;
    this.touchLastT = now;
    if (Math.abs(dy) > 0) e.preventDefault();

    const scaled = dy * this.touchScale;
    this.target = Math.max(0, Math.min(this.max, this.target + scaled));
    // Instant finger velocity in virtual-px / sec (EMA)
    const instant = scaled / dt;
    this.touchVel += (instant - this.touchVel) * Math.min(1, dt * 18);
  };

  private onTouchEnd = () => {
    if (this.locked) return;
    // Short capped coast — a flick advances at most ~18% of the journey
    const speed = Math.abs(this.touchVel);
    if (speed > 480) {
      const sign = Math.sign(this.touchVel);
      const budget = Math.min(speed * 0.18, this.max * 0.18);
      this.coastLeft = sign * budget;
      this.coastVel = sign * Math.min(speed * 0.4, 1600);
    }
    this.touchVel = 0;
  };

  private tick = (now: number) => {
    const dt = Math.min(0.05, (now - this.last) / 1000 || 0.016);
    this.last = now;
    if (!this.locked) {
      if (this.coastLeft !== 0 && this.coastVel !== 0) {
        const step = this.coastVel * dt;
        const applied =
          Math.sign(this.coastLeft) === Math.sign(step)
            ? Math.sign(step) * Math.min(Math.abs(step), Math.abs(this.coastLeft))
            : 0;
        this.target = Math.max(0, Math.min(this.max, this.target + applied));
        this.coastLeft -= applied;
        this.coastVel *= Math.exp(-this.coastDecay * dt);
        if (Math.abs(this.coastLeft) < 2 || Math.abs(this.coastVel) < 40) {
          this.coastLeft = 0;
          this.coastVel = 0;
        }
      }
      const k = 1 - Math.exp(-this.damp * dt);
      this.current += (this.target - this.current) * k;
      if (Math.abs(this.target - this.current) < 0.08) this.current = this.target;
    }
    const instant = (this.current - this.prev) / (dt || 0.016);
    this.prev = this.current;
    // Smooth velocity so atmosphere doesn't jitter
    this.velocity += (instant - this.velocity) * Math.min(1, dt * 14);
    this.onFrame(this.current / this.max, this.current, this.max, dt, this.velocity);
    this.raf = requestAnimationFrame(this.tick);
  };

  mount(el: HTMLElement) {
    if (this.mounted) return;
    this.mounted = true;
    el.addEventListener("wheel", this.onWheel, { passive: false });
    el.addEventListener("touchstart", this.onTouchStart, { passive: true });
    el.addEventListener("touchmove", this.onTouchMove, { passive: false });
    el.addEventListener("touchend", this.onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", this.onTouchEnd, { passive: true });
    this.last = performance.now();
    this.prev = this.current;
    this.raf = requestAnimationFrame(this.tick);
  }

  unmount(el: HTMLElement) {
    this.mounted = false;
    cancelAnimationFrame(this.raf);
    el.removeEventListener("wheel", this.onWheel);
    el.removeEventListener("touchstart", this.onTouchStart);
    el.removeEventListener("touchmove", this.onTouchMove);
    el.removeEventListener("touchend", this.onTouchEnd);
    el.removeEventListener("touchcancel", this.onTouchEnd);
  }
}
