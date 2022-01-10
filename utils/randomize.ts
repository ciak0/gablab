export default function randomize<T>(array: T[]): T[] {
  return array.slice(0).sort(() => (Math.random() < 0.5 ? 1 : -1));
}
