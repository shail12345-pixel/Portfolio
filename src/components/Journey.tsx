import { useEffect, useRef } from 'react'
import Hero from './Hero'
import Globe from './Globe'
import { projects } from '../data/projects'
import { HEADINGS } from '../data/route'

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))
const smoothstep = (t: number) => t * t * (3 - 2 * t)

const PLANE_PATH =
  'M 20 0 C 20 -1.5 18 -2.5 15 -2.5 L 4 -2.5 L -6 -18 L -10 -18 L -4 -2.5 L -13 -2.5 L -17 -8 L -19.5 -8 L -17.5 -2 L -19 -1 L -19 1 L -17.5 2 L -19.5 8 L -17 8 L -13 2.5 L -4 2.5 L -10 18 L -6 18 L 4 2.5 L 15 2.5 C 18 2.5 20 1.5 20 0 Z'

function Journey() {
  const sectionRef = useRef<HTMLElement>(null)
  const passRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<HTMLDivElement>(null)
  const planeRef = useRef<SVGSVGElement>(null)
  const panelRefs = useRef<(HTMLElement | null)[]>([])
  const travel = useRef(0)

  useEffect(() => {
    const section = sectionRef.current
    const pass = passRef.current
    const globe = globeRef.current
    const plane = planeRef.current
    if (!section || !pass || !globe || !plane) return

    const legs = projects.length
    let zoom = 0
    let legPos = 0
    let frame = 0

    const animate = () => {
      const vh = window.innerHeight
      const scrolled = -section.getBoundingClientRect().top

      // ---- 1. Zoom out of the boarding pass (first screen of scrolling) ----
      zoom += (clamp(scrolled / vh, 0, 1) - zoom) * 0.15

      pass.style.transform = `scale(${1 - zoom * 0.95})`
      const passOpacity = zoom < 0.8 ? 1 : 1 - (zoom - 0.8) / 0.2
      pass.style.opacity = `${passOpacity}`
      pass.style.pointerEvents = passOpacity < 0.1 ? 'none' : 'auto'

      // ---- 2. The trip (rest of the section) ----
      // legPos: 0 = at NJ, 1 = landed in Tokyo, 2 = landed in Sydney...
      const travelDistance = Math.max(1, section.offsetHeight - vh * 2)
      const legTarget = clamp((scrolled - vh) / travelDistance, 0, 1) * legs
      legPos += (legTarget - legPos) * 0.12

      const leg = Math.min(Math.floor(legPos), legs - 1)
      const t = legPos - leg

      // Each leg: depart (0-15%), fly (15-70%), land (70-85%), stay (85-100%)
      const depart = clamp(t / 0.15, 0, 1)
      const fly = clamp((t - 0.15) / 0.55, 0, 1)
      const landed = clamp((t - 0.7) / 0.15, 0, 1)

      travel.current = leg + smoothstep(fly)

      // The globe pulls back during the zoom, and slides left while a project is showing
      const shift = leg > 0 ? 1 - depart + landed : landed
      globe.style.transform = `translateX(${-shift * 16}vw) scale(${1.8 - zoom * 0.8})`

      // The plane points along this leg and "climbs" in the middle of the flight
      const flying = fly > 0 && fly < 1
      const climb = 1 + Math.sin(fly * Math.PI) * 0.35
      plane.style.transform = `rotate(${HEADINGS[leg]}deg) scale(${climb})`
      plane.style.opacity = flying ? '1' : '0'

      // Only the project you've landed at shows. The last one fades as you take off.
      panelRefs.current.forEach((panel, j) => {
        if (!panel) return
        let a = 0
        if (j === leg) a = landed
        else if (j === leg - 1) a = 1 - depart
        panel.style.opacity = `${a}`
        panel.style.transform = `translateY(${(1 - a) * 24}px) scale(${0.94 + a * 0.06})`
        panel.style.pointerEvents = a > 0.5 ? 'auto' : 'none'
      })

      frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <section
      className="journey"
      ref={sectionRef}
      style={{ height: `${(projects.length + 2) * 100}vh` }}
    >
      <div className="journey-stage">
        <div className="journey-globe" ref={globeRef}>
          <Globe travel={travel} />
          <svg className="journey-plane" ref={planeRef} viewBox="-24 -24 48 48" aria-hidden="true">
            <path d={PLANE_PATH} />
          </svg>
        </div>

        <div className="journey-pass" ref={passRef}>
          <Hero />
        </div>

        {projects.map((project, j) => (
          <article
            className="landing"
            key={project.name}
            ref={(el) => {
              panelRefs.current[j] = el
            }}
          >
            <p className="landing-arrived">Arrived · {project.place}</p>

            {project.image && (
              <img
                className="landing-image"
                src={project.image}
                alt={`Screenshot of ${project.name}`}
              />
            )}

            <div className="ticket-top">
              <span className="ticket-tag">{project.tag}</span>
              <span className="ticket-status">{project.status}</span>
            </div>

            <h3 className="landing-name">{project.name}</h3>
            <p className="landing-desc">{project.description}</p>

            <ul className="ticket-tech">
              {project.tech.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="ticket-links">
              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer">
                  Visit ↗
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer">
                  Code ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Journey