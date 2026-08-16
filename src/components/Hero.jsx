import { useState, useEffect } from 'react'

function Hero({ profile, loading }) {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    const words = ['full-stack developer.', 'problem solver.', 'tech enthusiast.', 'creator.']
    let wordIndex = 0
    let charIndex = 0
    let deleting = false

    const type = () => {
      const current = words[wordIndex]
      if (!deleting) {
        charIndex++
        setTyped(current.slice(0, charIndex))
        if (charIndex === current.length) {
          deleting = true
          setTimeout(type, 1800)
          return
        }
      } else {
        charIndex--
        setTyped(current.slice(0, charIndex))
        if (charIndex === 0) {
          deleting = false
          wordIndex = (wordIndex + 1) % words.length
        }
      }
      const delay = deleting ? 40 : 90
      setTimeout(type, delay)
    }
    type()
    return () => clearTimeout()
  }, [])

  const name = profile?.name || 'Mwalish'
  const title = profile?.title || 'Software Engineering Student'

  return (
    <section className="hero" id="home">
      <div className="hero-grid-overlay"></div>
      <div className="hero-content">
        <div className="hero-badge glass-chip">
          <i className="bi bi-robot"></i>
          <span>{loading ? 'Loading...' : title}</span>
        </div>
        <h1 className="hero-title">
          Hi, I'm <span className="glow-text">{name}</span>
          <span className="hero-type-wrap">
            <br />
            <span className="typewriter">{typed}|</span>
          </span>
        </h1>
        <p className="hero-description">
          I craft <span className="neon">innovative</span> digital experiences —
          turning ideas into powerful, full-stack applications that solve real
          problems. Welcome to my futuristic project universe.
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="btn btn-primary">
            <i className="bi bi-rocket-takeoff-fill"></i> Explore Projects
          </a>
          <a href="#contact" className="btn btn-ghost">
            <i className="bi bi-chat-dots-fill"></i> Connect With Me
          </a>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <i className="bi bi-briefcase-fill"></i>
            <span>Projects</span>
          </div>
          <div className="hero-stat">
            <i className="bi bi-code-slash"></i>
            <span>Clean Code</span>
          </div>
          <div className="hero-stat">
            <i className="bi bi-lightning-fill"></i>
            <span>Fast</span>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <span>Scroll Down</span>
        <i className="bi bi-chevron-double-down scroll-arrow"></i>
      </div>
    </section>
  )
}

export default Hero
