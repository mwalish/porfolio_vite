import { useState, useEffect } from 'react'
import { getProfile, updateProfile } from '../api'

function ProfileForm() {
  const [form, setForm] = useState({
    name: '',
    title: '',
    bio: '',
    location: '',
    email: '',
    github: '',
    linkedin: '',
    twitter: '',
    skills: '',
  })
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProfile()
        setForm({
          name: data.name || '',
          title: data.title || '',
          bio: data.bio || '',
          location: data.location || '',
          email: data.email || '',
          github: data.github || '',
          linkedin: data.linkedin || '',
          twitter: data.twitter || '',
          skills: data.skills || '',
        })
        setAvatarPreview(data.profile_image || data.avatar || '')
      } catch (err) {
        setError('Could not load profile.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatarFile(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    setError('')
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([key, value]) => formData.append(key, value || ''))
      if (avatarFile) {
        formData.append('profile_image', avatarFile)
      }
      const data = await updateProfile(formData)
      setAvatarPreview(data.profile_image || data.avatar || '')
      setMessage('Profile updated successfully!')
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="loading-container"><div className="loading-spinner"></div></div>
  }

  return (
    <div className="admin-form-container">
      <h2 className="admin-form-title">
        <i className="bi bi-person-badge-fill"></i> Profile Settings
      </h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label><i className="bi bi-person-circle"></i> Profile Picture</label>
          <div className="avatar-upload-row">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Profile preview" className="avatar-upload-preview" />
            ) : (
              <div className="avatar-upload-preview avatar-upload-empty"><i className="bi bi-person-fill"></i></div>
            )}
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
          </div>
        </div>

        <div className="form-group">
          <label><i className="bi bi-card-heading"></i> Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
        </div>

        <div className="form-group">
          <label><i className="bi bi-briefcase"></i> Title / Role</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Full-Stack Developer" />
        </div>

        <div className="form-group">
          <label><i className="bi bi-text-paragraph"></i> Bio</label>
          <textarea name="bio" value={form.bio} onChange={handleChange} rows="4" placeholder="Tell visitors about yourself..."></textarea>
        </div>

        <div className="form-group">
          <label><i className="bi bi-geo-alt"></i> Location</label>
          <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="City, Country" />
        </div>

        <div className="form-group">
          <label><i className="bi bi-envelope"></i> Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
        </div>

        <div className="form-group">
          <label><i className="bi bi-github"></i> GitHub URL</label>
          <input type="url" name="github" value={form.github} onChange={handleChange} placeholder="https://github.com/you" />
        </div>

        <div className="form-group">
          <label><i className="bi bi-linkedin"></i> LinkedIn URL</label>
          <input type="url" name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/you" />
        </div>

        <div className="form-group">
          <label><i className="bi bi-twitter"></i> Twitter URL</label>
          <input type="url" name="twitter" value={form.twitter} onChange={handleChange} placeholder="https://twitter.com/you" />
        </div>

        <div className="form-group">
          <label><i className="bi bi-stars"></i> Skills (comma separated)</label>
          <input type="text" name="skills" value={form.skills} onChange={handleChange} placeholder="Python, Django, React, ..." />
        </div>

        {error && <div className="form-error"><i className="bi bi-exclamation-triangle-fill"></i> {error}</div>}
        {message && <div className="form-success"><i className="bi bi-check-circle-fill"></i> {message}</div>}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? <><i className="bi bi-arrow-repeat spin"></i> Saving...</> : <><i className="bi bi-check-lg"></i> Save Profile</>}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProfileForm
