function Contact({ profile }) {
  const github = profile?.github || 'https://github.com'
  const linkedin = profile?.linkedin || 'https://linkedin.com'
  const twitter = profile?.twitter || 'https://twitter.com'
  const email = profile?.email || 'hello@mwalish.dev'

  return (
    <section className="contact-section" id="contact">
      <div className="section-header">
        <span className="section-tag"><i className="bi bi-send-fill"></i> Get In Touch</span>
        <h2 className="section-title">Let's <span className="glow-text">Connect</span></h2>
        <p className="section-subtitle">
          Have an idea or opportunity? I'm always open to discussing new projects
          and collaborations.
        </p>
      </div>

      <div className="contact-grid">
        <a href={github} target="_blank" rel="noopener noreferrer" className="contact-link glass neon-border">
          <i className="bi bi-github"></i>
          <span>GitHub</span>
        </a>
        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="contact-link glass neon-border">
          <i className="bi bi-linkedin"></i>
          <span>LinkedIn</span>
        </a>
        <a href={twitter} target="_blank" rel="noopener noreferrer" className="contact-link glass neon-border">
          <i className="bi bi-twitter-x"></i>
          <span>Twitter / X</span>
        </a>
        <a href={`mailto:${email}`} className="contact-link glass neon-border">
          <i className="bi bi-envelope-fill"></i>
          <span>Email</span>
        </a>
      </div>
    </section>
  )
}

export default Contact
