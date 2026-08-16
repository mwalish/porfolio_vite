import Reveal from './Reveal'

function Contact({ profile }) {
  const github = profile?.github || 'https://github.com'
  const linkedin = profile?.linkedin || 'https://linkedin.com'
  const twitter = profile?.twitter || 'https://twitter.com'
  const email = profile?.email || 'hello@mwalish.dev'

  const links = [
    { href: github, icon: 'bi-github', label: 'GitHub' },
    { href: linkedin, icon: 'bi-linkedin', label: 'LinkedIn' },
    { href: twitter, icon: 'bi-twitter-x', label: 'Twitter / X' },
    { href: `mailto:${email}`, icon: 'bi-envelope-fill', label: 'Email' },
  ]

  return (
    <section className="contact-section" id="contact">
      <Reveal className="section-header">
        <span className="section-tag"><i className="bi bi-send-fill"></i> Get In Touch</span>
        <h2 className="section-title">Let's <span className="glow-text">Connect</span></h2>
        <p className="section-subtitle">
          Have an idea or opportunity? I'm always open to discussing new projects
          and collaborations.
        </p>
      </Reveal>

      <div className="contact-grid">
        {links.map((link, idx) => (
          <Reveal
            key={link.label}
            as="a"
            delay={idx * 80}
            className="contact-link glass neon-border"
            href={link.href}
            target={link.href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noopener noreferrer"
          >
            <i className={`bi ${link.icon}`}></i>
            <span>{link.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default Contact
