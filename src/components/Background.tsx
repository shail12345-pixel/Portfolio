import { useEffect, useRef } from 'react'

const LIGHT = 420 // size of the glow that follows the cursor

function Background() {
  const auroraRef = useRef<HTMLDivElement>(null)
  const lightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const aurora = auroraRef.current
    const light = lightRef.current
    if (!aurora || !light) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      light.style.display = 'none'
      return
    }

    const blobs = Array.from(aurora.querySelectorAll<HTMLElement>('.bg-blob'))

    // Where each blob's center normally sits on screen
    let centers = blobs.map(() => ({ x: 0, y: 0 }))
    const measure = () => {
      centers = blobs.map((blob) => ({
        x: aurora.offsetLeft + blob.offsetLeft + blob.offsetWidth / 2,
        y: aurora.offsetTop + blob.offsetTop + blob.offsetHeight / 2,
      }))
    }
    measure()
    window.addEventListener('resize', measure)

    const offsets = blobs.map(() => ({ x: 0, y: 0 }))
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let x = mouseX
    let y = mouseY
    let speed = 0
    let angle = 0
    let frame = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      // The glow trails behind the mouse
      const prevX = x
      const prevY = y
      x += (mouseX - x) * 0.12
      y += (mouseY - y) * 0.12

      // How fast and which way it's moving
      const vx = x - prevX
      const vy = y - prevY
      const v = Math.hypot(vx, vy)
      speed += (v - speed) * 0.2
      if (v > 0.5) angle = (Math.atan2(vy, vx) * 180) / Math.PI

      // Stretch the glow in the direction you move, like a drop in liquid
      const stretch = Math.min(speed / 40, 0.6)
      light.style.transform =
        `translate(${x - LIGHT / 2}px, ${y - LIGHT / 2}px) ` +
        `rotate(${angle}deg) scale(${1 + stretch}, ${1 - stretch * 0.4})`

      // Push each blob of light away from the mouse, then let it ease back
      blobs.forEach((blob, i) => {
        const dx = centers[i].x - x
        const dy = centers[i].y - y
        const dist = Math.hypot(dx, dy) || 1
        const reach = blob.offsetWidth * 0.9
        const force = Math.max(0, 1 - dist / reach)
        const push = Math.min(force * (80 + speed * 6), 260)

        offsets[i].x += ((dx / dist) * push - offsets[i].x) * 0.05
        offsets[i].y += ((dy / dist) * push - offsets[i].y) * 0.05
        blob.style.transform = `translate(${offsets[i].x}px, ${offsets[i].y}px)`
      })

      frame = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    frame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <div className="bg" aria-hidden="true">
      <div className="bg-aurora" ref={auroraRef}>
        <div className="bg-blob bg-blob-1" />
        <div className="bg-blob bg-blob-2" />
        <div className="bg-blob bg-blob-3" />
      </div>
      <div className="bg-light" ref={lightRef} />
    </div>
  )
}

export default Background