import { useState } from 'react'
import { createProject, updateProject } from '../api'

function AdminForm({ project, onSaved, onCancel }) {
  const [form, setForm] = useState({
    title: project?.title || '',
    description: project?.description || '',
    tech_stack: project?.tech_stack || '',
    image_url: project?.image_url || '',
    live_url: project?.live_url || '',
    github_url: project?.github_url || '',
    featured: project?.featured || false,
  })
  const [imageFile, setImageFile] = useState(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('title', form.title)
      formData.append('description', form.description)
      formData.append('tech_stack', form.tech_stack)
      formData.append('image_url', form.image_url || '')
      formData.append('live_url', form.live_url || '')
      formData.append('github_url', form.github_url || '')
      formData.append('featured', form.featured)
      if (imageFile) {
        formData.append('image', imageFile)
      }
      if (project) {
        await updateProject(project.id, formData)
      } else {
        await createProject(formData)
      }
      onSaved()
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save project. Please check your inputs.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="admin-form-container">
      <h2 className="admin-form-title">
        <i className="bi bi-plus-square-fill"></i> {project ? 'Edit Project' : 'Add New Project'}
      </h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label><i className="bi bi-card-heading"></i> Title</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} required placeholder="Project title" />
        </div>
        <div className="form-group">
          <label><i className="bi bi-text-paragraph"></i> Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} required placeholder="Describe the project..." rows="4"></textarea>
        </div>
        <div className="form-group">
          <label><i className="bi bi-stack"></i> Tech Stack (comma separated)</label>
          <input type="text" name="tech_stack" value={form.tech_stack} onChange={handleChange} required placeholder="React, Django, PostgreSQL" />
        </div>
        <div className="form-group">
          <label><i className="bi bi-image"></i> Image URL</label>
          <input type="url" name="image_url" value={form.image_url} onChange={handleChange} placeholder="https://example.com/image.png" />
        </div>
        <div className="form-group">
          <label><i className="bi bi-file-earmark-arrow-up"></i> Or Upload Image</label>
          <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className="form-group">
          <label><i className="bi bi-box-arrow-up-right"></i> Live URL</label>
          <input type="url" name="live_url" value={form.live_url} onChange={handleChange} placeholder="https://live-demo.com" />
        </div>
        <div className="form-group">
          <label><i className="bi bi-github"></i> GitHub URL</label>
          <input type="url" name="github_url" value={form.github_url} onChange={handleChange} placeholder="https://github.com/you/repo" />
        </div>
        <div className="form-check">
          <label className="checkbox-label">
            <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
            <span className="checkbox-custom"><i className="bi bi-check-lg"></i></span>
            <span>Featured project</span>
          </label>
        </div>
        {error && <div className="form-error"><i className="bi bi-exclamation-triangle-fill"></i> {error}</div>}
        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            <i className="bi bi-x-lg"></i> Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? <><i className="bi bi-arrow-repeat spin"></i> Saving...</> : <><i className="bi bi-check-lg"></i> Save Project</>}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminForm
