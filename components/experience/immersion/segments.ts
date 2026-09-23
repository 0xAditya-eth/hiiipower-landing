/**
 * Segment map — local progress within each chapter.
 * Total virtual height is sum of scrollVh * window.innerHeight.
 */

export type SegmentId =
  | "intro"
  | "feed"
  | "people"
  | "moments"
  | "power"
  | "finale";

export type SegmentDef = {
  id: SegmentId;
  /** Virtual viewport heights owned by this segment */
  scrollVh: number;
};

export const SEGMENTS: SegmentDef[] = [
  { id: "intro", scrollVh: 2.8 },
  { id: "feed", scrollVh: 2.5 },
  { id: "people", scrollVh: 2.5 },
  { id: "moments", scrollVh: 3.4 },
  { id: "power", scrollVh: 3.6 },
  { id: "finale", scrollVh: 1.8 },
];

export function totalVh() {
  return SEGMENTS.reduce((s, seg) => s + seg.scrollVh, 0);
}

/** Global progress [start, end) for a segment id. */
export function segmentRange(id: SegmentId): { start: number; end: number } {
  const total = totalVh();
  let acc = 0;
  for (const seg of SEGMENTS) {
    const start = acc / total;
    const end = (acc + seg.scrollVh) / total;
    if (seg.id === id) return { start, end };
    acc += seg.scrollVh;
  }
  return { start: 0, end: 1 };
}

export type SegmentLocal = {
  id: SegmentId;
  index: number;
  local: number;
  global: number;
  def: SegmentDef;
};

export function resolveSegment(global: number): SegmentLocal {
  const g = Math.max(0, Math.min(0.99999, global));
  const total = totalVh();
  let acc = 0;
  for (let i = 0; i < SEGMENTS.length; i++) {
    const def = SEGMENTS[i];
    const start = acc / total;
    const end = (acc + def.scrollVh) / total;
    if (g < end || i === SEGMENTS.length - 1) {
      const local = (g - start) / (end - start || 1);
      return {
        id: def.id,
        index: i,
        local: Math.max(0, Math.min(1, local)),
        global: g,
        def,
      };
    }
    acc += def.scrollVh;
  }
  const last = SEGMENTS[SEGMENTS.length - 1];
  return {
    id: last.id,
    index: SEGMENTS.length - 1,
    local: 1,
    global: 1,
    def: last,
  };
}
