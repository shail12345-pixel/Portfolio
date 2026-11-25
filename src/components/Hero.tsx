import { useEffect, useRef, useState } from 'react'

// The things that get typed out, one after another. Keep them true.
const PHRASES = [
  'programs VEX robots.',
  'builds web apps.',
  'competes in CyberPatriot.',
  'plays drums.',
]

function Typewriter() {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const phrase = PHRASES[index]

    let delay = deleting ? 35 : 70 // typing speed, deleting is faster
    if (!deleting && text === phrase) delay = 1600 // pause on the full phrase
    if (deleting && text === '') delay = 300 // short pause before the next one

    const timer = setTimeout(() => {
      if (!deleting && text === phrase) {
        setDeleting(true)
      } else if (deleting && text === '') {
        setDeleting(false)
        setIndex((index + 1) % PHRASES.length)
      } else {
        setText(phrase.slice(0, text.length + (deleting ? -1 : 1)))
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [text, deleting, index])

  return (
    <span className="typed">
      {text}
      <span className="caret" aria-hidden="true">|</span>
    </span>
  )
}

function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const title = titleRef.current
    if (!title) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let targetX = 0.5
    let targetY = 0.5
    let x = 0.5
    let y = 0.5
    let frame = 0

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX / window.innerWidth
      targetY = e.clientY / window.innerHeight
    }

    const animate = () => {
      x += (targetX - x) * 0.08
      y += (targetY - y) * 0.08

      // Move the shine across the letters and tilt them toward the mouse
      title.style.setProperty('--mx', `${x * 100}%`)
      title.style.setProperty('--my', `${y * 100}%`)
      title.style.transform = `rotateX(${(0.5 - y) * 10}deg) rotateY(${(x - 0.5) * 14}deg)`

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
    <section className="hero" id="top">
      <h1 className="hero-title" ref={titleRef}>
        Hi, I'm Sahil.
      </h1>
      <p className="hero-sub">
        16-year-old developer from New Jersey who <Typewriter />
      </p>
      <a className="hero-scroll" href="#projects">
        Scroll ↓
      </a>
    </section>
  )
}

export default Hero