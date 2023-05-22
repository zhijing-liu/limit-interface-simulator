export const random = (count: number, start = 0): number => {
  return Math.round(start + Math.random() * count)
}
