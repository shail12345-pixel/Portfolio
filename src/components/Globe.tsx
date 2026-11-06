import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'

type Stop = { name: string; location: [number, number] }

// The trip, in order. Change or add stops anytime.
const STOPS: Stop[] = [
  { name: 'Rockaway, NJ', location: [40.9, -74.51] },
  { name: 'London', location: [51.51, -0.13] },
  { name: 'Algiers', location: [36.75, 3.06] },
  { name: 'Cairo', location: [30.04, 31.24] },
  { name: 'Tokyo', location: [35.68, 139.69] },
]

// Turn a longitude/latitude into the globe's spin (phi) and tilt (theta)
const toPhi = (long: number) => Math.PI - ((long * Math.PI) / 180 - Math.PI / 2)
const toTheta = (lat: number) => (lat * Math.PI) / 180

// Make every stop spin further east, so the globe never spins backwards between stops
const phis: number[] = []
STOPS.forEach((stop, i) => {
  let p = toPhi(stop.location[1])
  if (i > 0) {
    while (p > phis[i - 1]) p -= Math.PI * 2
  }
  phis.push(p)
})
const thetas = STOPS.map((stop) => toTheta(stop.location[0]))

function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Where the globe should be, based on how far down the page you've scrolled
    const getTarget = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      const pos = progress * (STOPS.length - 1)
      const i = Math.min(Math.floor(pos), STOPS.length - 2)
      const t = pos - i
      const ease = t * t * (3 - 2 * t) // slows down near each stop
      return {
        phi: phis[i] + (phis[i + 1] - phis[i]) * ease,
        theta: thetas[i] + (thetas[i + 1] - thetas[i]) * ease,
      }
    }

    const start = getTarget()
    let phi = start.phi
    let theta = start.theta
    let time = 0
    let dimmed = false
    const size = canvas.offsetWidth

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi,
      theta,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 5,
      baseColor: [0.25, 0.25, 0.27],
      markerColor: [1, 0.35, 0.12],
      glowColor: [0.15, 0.15, 0.17],
      markers: STOPS.map((stop, i) => ({
        location: stop.location,
        size: i === 0 ? 0.08 : 0.05,
      })),
      onRender: (state) => {
        const target = getTarget()
        phi += (target.phi - phi) * 0.08
        theta += (target.theta - theta) * 0.08

        // A gentle sway so it never looks frozen
        if (!reduce) time += 0.01
        const sway = Math.sin(time) * 0.12

        state.phi = phi + sway
        state.theta = theta

        // Dim the globe after the hero so text stays readable
        const shouldDim = window.scrollY > window.innerHeight * 0.5
        if (shouldDim !== dimmed) {
          dimmed = shouldDim
          canvas.style.opacity = dimmed ? '0.4' : '1'
        }
      },
    })

    canvas.style.opacity = '1'

    return () => globe.destroy()
  }, [])

  return <canvas ref={canvasRef} className="globe" aria-hidden="true" />
}

export default Globe