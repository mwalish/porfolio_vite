import { useState } from 'react'
import { login, setAuthToken } from '../api'

function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await login(username, password)
      setAuthToken(data.token)
      onLoginSuccess(data.user)
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card glass neon-border">
        <div className="admin-login-icon"><i className="bi bi-shield-lock-fill"></i></div>
        <h2>Secure Access</h2>
        <p className="admin-login-subtitle">Authorized personnel only</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label><i className="bi bi-person-fill icon-sm"></i> Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label><i className="bi bi-key-fill icon-sm"></i> Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <div className="form-error"><i className="bi bi-exclamation-triangle-fill"></i> {error}</div>}
          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? <><i className="bi bi-arrow-repeat spin"></i> Verifying...</> : <><i className="bi bi-box-arrow-in-right"></i> Sign In</>}
          </button>
        </form>
        <div className="admin-back-link">
          <a href="/"><i className="bi bi-arrow-left"></i> Back to Portfolio</a>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
