import { useState, useEffect } from 'react'
import { getProjects, deleteProject, logout } from '../api'
import AdminForm from './AdminForm'
import ProfileForm from './ProfileForm'

function AdminDashboard({ user, onLogout }) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [activeTab, setActiveTab] = useState('projects')
  const [error, setError] = useState('')

  const loadProjects = async () => {
    setLoading(true)
    try {
      const data = await getProjects()
      setProjects(data.results || data)
      setError('')
    } catch (err) {
      setError('Could not load projects.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const handleAdd = () => {
    setEditingProject(null)
    setShowForm(true)
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    setShowForm(true)
  }

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete "${title}"? This cannot be undone.`)) {
      try {
        await deleteProject(id)
        loadProjects()
      } catch (err) {
        setError('Failed to delete project.')
      }
    }
  }

  const handleLogout = () => {
    logout()
    onLogout()
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header glass">
        <div className="admin-header-left">
          <div className="admin-logo"><i className="bi bi-code-slash"></i></div>
          <div>
            <h1>Project Manager</h1>
            <p>Welcome back, <strong>{user}</strong></p>
          </div>
        </div>
<div className="admin-header-actions">
          {activeTab === 'projects' ? (
            <button className="btn btn-primary" onClick={handleAdd}>
              <i className="bi bi-plus-lg"></i> Add Project
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => setActiveTab('projects')}>
              <i className="bi bi-grid-1x2-fill"></i> Manage Projects
            </button>
          )}
          <button
            className={`btn btn-ghost ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <i className="bi bi-person-badge"></i> Profile Settings
          </button>
          <button className="btn btn-ghost" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
          <a href="/" className="btn btn-ghost"><i className="bi bi-eye"></i> View Site</a>
        </div>
      </header>

      {error && <div className="error-message"><i className="bi bi-exclamation-triangle-fill"></i> {error}</div>}

      {activeTab === 'profile' ? (
        <ProfileForm />
      ) : (
        <>
          {showForm && (
            <AdminForm
              project={editingProject}
              onSaved={() => {
                setShowForm(false)
                setEditingProject(null)
                loadProjects()
              }}
              onCancel={() => {
                setShowForm(false)
                setEditingProject(null)
              }}
            />
          )}

          <div className="admin-stats">
            <div className="admin-stat glass">
              <i className="bi bi-collection-fill"></i>
              <div><h3>{projects.length}</h3><span>Total Projects</span></div>
            </div>
            <div className="admin-stat glass">
              <i className="bi bi-star-fill"></i>
              <div><h3>{projects.filter((p) => p.featured).length}</h3><span>Featured</span></div>
            </div>
          </div>

          <div className="admin-projects">
            <h2><i className="bi bi-grid-1x2-fill"></i> Manage Projects</h2>
            {loading ? (
              <div className="loading-container"><div className="loading-spinner"></div></div>
            ) : (
              <div className="admin-project-list">
                {projects.map((project) => (
                  <div className="admin-project-item glass" key={project.id}>
                    <div className="admin-project-info">
                      {project.featured && <span className="featured-badge2"><i className="bi bi-star-fill"></i></span>}
                      <h4>{project.title}</h4>
                      <p>{project.description.slice(0, 100)}...</p>
                    </div>
                    <div className="admin-project-actions">
                      <button className="btn-icon" onClick={() => handleEdit(project)} title="Edit">
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button className="btn-icon danger" onClick={() => handleDelete(project.id, project.title)} title="Delete">
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default AdminDashboard
