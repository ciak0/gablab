export default function lerp(from: number, to: number, weight: number) {
  const cw = Math.min(Math.max(weight, 0), 1);
  return from * (1 - cw) + (to * cw);
}
