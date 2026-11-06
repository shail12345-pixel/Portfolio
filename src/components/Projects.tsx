import { projects } from '../data/projects'

function Projects() {
  return (
    <section className="section" id="projects">
      <p className="section-label">Destinations</p>
      <h2 className="section-title">Projects</h2>

      <div className="project-grid">
        {projects.map((project) => (
          <article className="ticket" key={project.name}>
            {project.image && (
             <img
               className="ticket-image"
               src={project.image}
               alt={`Screenshot of ${project.name}`}
              loading="lazy"
             />
        )}
            <div className="ticket-top">
              <span className="ticket-tag">{project.tag}</span>
              <span className="ticket-status">{project.status}</span>
            </div>

            <h3 className="ticket-name">{project.name}</h3>
            <p className="ticket-desc">{project.description}</p>

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