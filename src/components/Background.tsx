import { useEffect, useRef } from 'react'

const SIZE = 600 // size of the lit-up circle around the cursor

function Background() {
  const litRef = useRef<HTMLDivElement>(null)
  const auroraRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lit = litRef.current
    const aurora = auroraRef.current
    if (!lit || !aurora) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      lit.style.display = 'none'
      return
    }

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 3
    let x = targetX
    let y = targetY
    let frame = 0

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const animate = () => {
      x += (targetX - x) * 0.1
      y += (targetY - y) * 0.1

      // The lit dots follow the cursor
      const left = x - SIZE / 2
      const top = y - SIZE / 2
      lit.style.transform = `translate(${left}px, ${top}px)`
      lit.style.backgroundPosition = `${-left}px ${-top}px, 0 0`

      // The blue light underneath drifts slightly away from the mouse
      const dx = (x - window.innerWidth / 2) * -0.03
      const dy = (y - window.innerHeight / 2) * -0.03
      aurora.style.transform = `translate(${dx}px, ${dy}px)`

      frame = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    frame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div className="bg" aria-hidden="true">
      <div className="bg-aurora" ref={auroraRef}>
        <div className="bg-blob bg-blob-1" />
        <div className="bg-blob bg-blob-2" />
        <div className="bg-blob bg-blob-3" />
      </div>
      <div className="bg-dots" />
      <div className="bg-lit" ref={litRef} />
    </div>
  )
}

export default Background