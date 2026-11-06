import { useEffect, useRef } from 'react'

const SIZE = 500 // size of the lit-up circle around the cursor

function Background() {
  const litRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lit = litRef.current
    if (!lit) return
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

      const left = x - SIZE / 2
      const top = y - SIZE / 2

      // Move the circle, and shift its dots the opposite way so they line up with the grid
      lit.style.transform = `translate(${left}px, ${top}px)`
      lit.style.backgroundPosition = `${-left}px ${-top}px, 0 0`

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
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />
      <div className="bg-dots" />
      <div className="bg-lit" ref={litRef} />
    </div>
  )
}

export default Background