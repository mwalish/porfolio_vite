import ProjectCard from './ProjectCard'

function Projects({ projects, loading, error }) {
  return (
    <section className="projects-section" id="projects">
      <div className="section-header">
        <span className="section-tag"><i className="bi bi-grid-1x2-fill"></i> My Work</span>
        <h2 className="section-title">Featured <span className="glow-text">Projects</span></h2>
        <p className="section-subtitle">A selection of the projects I've designed and built.</p>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      )}

      {error && <div className="error-message"><i className="bi bi-exclamation-triangle-fill"></i> {error}</div>}

      {!loading && !error && (
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Projects
