import { useEffect, useRef } from 'react'
import type { CSSProperties, MouseEvent } from 'react'
import { projects } from '../data/projects'

function Projects() {
  const gridRef = useRef<HTMLDivElement>(null)

  // Slide each box in the first time it scrolls into view
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const boxes = grid.querySelectorAll('.box')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )

    boxes.forEach((box) => observer.observe(box))
    return () => observer.disconnect()
  }, [])

  // A soft light follows the mouse inside each box
  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const box = e.currentTarget
    const rect = box.getBoundingClientRect()
    box.style.setProperty('--x', `${e.clientX - rect.left}px`)
    box.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }

  return (
    <section className="section section-wide" id="projects">
      <p className="section-label">Things I've built</p>
      <h2 className="section-title">Projects</h2>

      <div className="box-grid" ref={gridRef}>
        {projects.map((project, i) => (
          <article
            className="box"
            key={project.name}
            onMouseMove={handleMove}
            style={{ '--delay': `${(i % 2) * 150}ms` } as CSSProperties}
          >
            {project.image && (
              <img
                className="box-image"
                src={project.image}
                alt={`Screenshot of ${project.name}`}
                loading="lazy"
              />
            )}

            <div className="ticket-top">
              <span className="ticket-tag">{project.tag}</span>
              <span className="ticket-status">{project.status}</span>
            </div>

            <h3 className="box-name">{project.name}</h3>
            <p className="box-desc">{project.description}</p>

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

export default Projects