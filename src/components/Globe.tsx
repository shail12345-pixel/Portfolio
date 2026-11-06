import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'
import { STOPS, PHIS, THETAS } from '../data/route'

type GlobeProps = { travel: { current: number } }

function Globe({ travel }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // travel = position along the route in "stops": 0 = NJ, 1 = Tokyo, 1.5 = halfway to Sydney
    const getTarget = () => {
      const pos = Math.min(Math.max(travel.current, 0), STOPS.length - 1)
      const i = Math.min(Math.floor(pos), STOPS.length - 2)
      const t = pos - i
      return {
        phi: PHIS[i] + (PHIS[i + 1] - PHIS[i]) * t,
        theta: THETAS[i] + (THETAS[i + 1] - THETAS[i]) * t,
      }
    }

    let time = 0
    const size = canvas.offsetWidth

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: PHIS[0],
      theta: THETAS[0],
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 5,
      baseColor: [0.25, 0.25, 0.27],
      markerColor: [1, 0.35, 0.12],
      glowColor: [0.15, 0.15, 0.17],
      markers: STOPS.map((stop, i) => ({
        location: stop.location,
        size: i === 0 ? 0.08 : 0.06,
      })),
      onRender: (state) => {
        const target = getTarget()
        if (!reduce) time += 0.01
        state.phi = target.phi + Math.sin(time) * 0.04
        state.theta = target.theta
      },
    })

    canvas.style.opacity = '1'
    return () => globe.destroy()
  }, [travel])

  return <canvas ref={canvasRef} className="globe" aria-hidden="true" />
}

export default Globe