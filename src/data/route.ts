import { projects } from './projects'

export type Stop = { name: string; location: [number, number] }

// Home first, then every project's location, in order
export const STOPS: Stop[] = [
  { name: 'Rockaway, NJ', location: [40.9, -74.51] },
  ...projects.map((p) => ({ name: p.place, location: p.location })),
]

const toPhi = (long: number) => Math.PI - ((long * Math.PI) / 180 - Math.PI / 2)
const toTheta = (lat: number) => (lat * Math.PI) / 180

// Globe spin for each stop, taking the shortest way around
export const PHIS: number[] = []
STOPS.forEach((stop, i) => {
  let p = toPhi(stop.location[1])
  if (i > 0) {
    const prev = PHIS[i - 1]
    while (p - prev > Math.PI) p -= Math.PI * 2
    while (prev - p > Math.PI) p += Math.PI * 2
  }
  PHIS.push(p)
})

// Globe tilt for each stop
export const THETAS = STOPS.map((stop) => toTheta(stop.location[0]))

// Which way the plane points on each leg, in degrees.
// Spinning west (phi going up) = plane faces left. Tilting north = plane faces up.
export const HEADINGS = STOPS.slice(1).map((_, i) => {
  const dx = -(PHIS[i + 1] - PHIS[i])
  const dy = -(THETAS[i + 1] - THETAS[i])
  return (Math.atan2(dy, dx) * 180) / Math.PI
})