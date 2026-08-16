function ProjectCard({ project }) {
  // DRF ImageField already returns the full URL (e.g. /media/projects/xxx.png)
  const image = project.image ? project.image : (project.image_url || null)

  return (
    <div className="project-card glass neon-border">
      {project.featured && <span className="featured-badge"><i className="bi bi-star-fill"></i> Featured</span>}
      <div className="project-card-image">
        {image ? (
          <img src={image} alt={project.title} loading="lazy" />
        ) : (
          <span className="project-placeholder"><i className="bi bi-code-slash"></i></span>
        )}
      </div>
      <div className="project-card-body">
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-description">{project.description}</p>
        <div className="project-card-tech">
          {(project.tech_list || []).map((tech) => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>
        <div className="project-card-links">
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="link-live">
              <i className="bi bi-box-arrow-up-right"></i> Live Demo
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="link-github">
              <i className="bi bi-github"></i> Code
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
