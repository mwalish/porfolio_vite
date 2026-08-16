import { useState, useEffect } from 'react'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-brand">
        <i className="bi bi-lightning-charge-fill"></i>
        <span>Mwalish<span className="brand-dot">.</span></span>
      </div>
      <ul className="navbar-links">
        <li><a href="#home"><i className="bi bi-house-door icon-sm"></i> Home</a></li>
        <li><a href="#projects"><i className="bi bi-grid icon-sm"></i> Projects</a></li>
        <li><a href="#about"><i className="bi bi-person icon-sm"></i> About</a></li>
        <li><a href="#contact"><i className="bi bi-envelope icon-sm"></i> Contact</a></li>
        <li><a href="/mwalish-2026" className="navbar-admin"><i className="bi bi-shield-lock icon-sm"></i> Admin</a></li>
      </ul>
    </nav>
  )
}

export default Navbar
