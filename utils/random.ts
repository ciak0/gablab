export function randomSort<T>(array: T[]): T[] {
  return array.slice(0).sort(() => (Math.random() < 0.5 ? 1 : -1));
}

export function randomBetween(min: number, max: number): number {
  const range = max - min;
  return min + (Math.random() * range);
}
