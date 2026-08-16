function Footer({ profile }) {
  const name = profile?.name || 'Mwalish'
  return (
    <footer className="footer">
      <div className="footer-brand">
        <i className="bi bi-lightning-charge-fill"></i>
        <span>{name}</span>
      </div>
      <p>© {new Date().getFullYear()} {name}. Built with <i className="bi bi-heart-fill heart-icon"></i> using React &amp; Django.</p>
    </footer>
  )
}

export default Footer
