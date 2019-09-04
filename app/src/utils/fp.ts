export function head<T>(arr: T[]): T | void {
  return arr.length ? arr[0] : undefined
}
