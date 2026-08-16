import ProjectCard from './ProjectCard'
import Reveal from './Reveal'

function Projects({ projects, loading, error }) {
  return (
    <section className="projects-section" id="projects">
      <Reveal className="section-header">
        <span className="section-tag"><i className="bi bi-grid-1x2-fill"></i> My Work</span>
        <h2 className="section-title">Featured <span className="glow-text">Projects</span></h2>
        <p className="section-subtitle">A selection of the projects I've designed and built.</p>
      </Reveal>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      )}

      {error && <div className="error-message"><i className="bi bi-exclamation-triangle-fill"></i> {error}</div>}

      {!loading && !error && (
        <div className="projects-grid">
          {projects.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 90}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  )
}

export default Projects
