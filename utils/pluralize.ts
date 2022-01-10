export default function pluralize(str: string, count: number, suffix: string = 's') {
  return count <= 1 ? str : str + suffix;
}
