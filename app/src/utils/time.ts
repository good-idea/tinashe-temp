// Adapted from:
// https://stackoverflow.com/a/57120772/6402238

export function formatTimeDistance(t0: Date, t1: Date): string {
  const d = t1.getTime() - t0.getTime()
  const weekdays = Math.floor(d / 1000 / 60 / 60 / 24 / 7)
  const days = Math.floor(d / 1000 / 60 / 60 / 24 - weekdays * 7)
  const hours = Math.floor(d / 1000 / 60 / 60 - weekdays * 7 * 24 - days * 24)
  const minutes = Math.floor(
    d / 1000 / 60 - weekdays * 7 * 24 * 60 - days * 24 * 60 - hours * 60
  )
  const seconds = Math.floor(
    d / 1000 -
      weekdays * 7 * 24 * 60 * 60 -
      days * 24 * 60 * 60 -
      hours * 60 * 60 -
      minutes * 60
  )
  return [
    days > 0 ? `${days}d` : null,
    hours > 0 ? `${hours}h` : null,
    minutes > 0 ? `${minutes}m` : null,
    seconds > 0 ? `${seconds}s` : null,
  ]
    .filter(Boolean)
    .join(' ')
}
