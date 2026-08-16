import Reveal from './Reveal'

function About({ profile, loading }) {
  const bio = profile?.bio || "I'm a software engineering student passionate about building meaningful technology."
  const skills = profile?.skill_list || ['Python', 'Django', 'JavaScript', 'React', 'PostgreSQL']
  const location = profile?.location || 'Nairobi, Kenya'

  return (
    <section className="about-section" id="about">
      <Reveal className="section-header">
        <span className="section-tag"><i className="bi bi-person-fill"></i> Who I Am</span>
        <h2 className="section-title">About <span className="glow-text">Me</span></h2>
        <p className="section-subtitle">Get to know the developer behind the code.</p>
      </Reveal>

      <div className="about-grid">
        <Reveal className="about-card glass neon-border">
          <div className="about-avatar">
            {profile?.avatar_image ? (
              <img src={profile.avatar_image} alt={profile?.name} />
            ) : profile?.avatar ? (
              <img src={profile.avatar} alt={profile?.name} />
            ) : (
              <i className="bi bi-person-fill"></i>
            )}
          </div>
          <h3 className="about-name">{profile?.name || 'Mwalish'}</h3>
          <p className="about-location"><i className="bi bi-geo-alt-fill"></i> {location}</p>
          <p className="about-bio">{bio}</p>
        </Reveal>

        <Reveal className="about-info" delay={120}>
          <div className="about-text">
            <h3><i className="bi bi-lightning-charge-fill"></i> Full-Stack Development</h3>
            <p>
              I design and build complete web applications — from intuitive
              frontends with React to robust REST APIs with Django. I love the
              full journey of taking an idea from concept to deployment.
            </p>
          </div>

          <div className="skills">
            <h4><i className="bi bi-stars"></i> My Toolkit</h4>
            <div className="skill-bars">
              {skills.map((skill, idx) => (
                <div className="skill-bar" key={skill}>
                  <div className="skill-label">
                    <span>{skill}</span>
                    <span>{100 - idx * 8}%</span>
                  </div>
                  <div className="skill-track">
                    <div className="skill-fill" style={{ width: `${100 - idx * 8}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default About
