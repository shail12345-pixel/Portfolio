import { useEffect, useRef } from 'react'

const ROUTE = 'M 500 0 C 950 120, 50 260, 40 400'

function FlightPath() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const routeRef = useRef<SVGPathElement>(null)
  const trailRef = useRef<SVGPathElement>(null)
  const planeRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const route = routeRef.current
    const trail = trailRef.current
    const plane = planeRef.current
    if (!wrap || !route || !trail || !plane) return

    const length = route.getTotalLength()
    trail.style.strokeDasharray = `${length}`

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let progress = 0
    let frame = 0

    const animate = () => {
      // How far through this section have we scrolled? (0 = start, 1 = end)
      const rect = wrap.getBoundingClientRect()
      const vh = window.innerHeight
      const target = Math.min(1, Math.max(0, (vh * 0.75 - rect.top) / rect.height))

      progress += (target - progress) * (reduce ? 1 : 0.15)

      // Find the point on the curve, and which way the curve is heading there
      const at = progress * length
      const point = route.getPointAtLength(at)
      const ahead = route.getPointAtLength(Math.min(length, at + 1))
      const behind = route.getPointAtLength(Math.max(0, at - 1))
      const angle = (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI

      plane.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${angle})`)
      trail.style.strokeDashoffset = `${length * (1 - progress)}`

      frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="flight" ref={wrapRef} aria-hidden="true">
      <svg className="flight-svg" viewBox="0 0 1000 400">
        <path ref={routeRef} className="flight-route" d={ROUTE} />
        <path ref={trailRef} className="flight-trail" d={ROUTE} />
        <g ref={planeRef}>
          <path className="flight-plane" d="M 16 0 L -12 -11 L -6 0 L -12 11 Z" />
        </g>
      </svg>
    </div>
  )
}

export default FlightPath