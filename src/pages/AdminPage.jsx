import { useState, useEffect } from 'react'
import AdminLogin from '../components/AdminLogin'
import AdminDashboard from '../components/AdminDashboard'
import { getAuthToken, clearAuthToken } from '../api'

function AdminPage() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = getAuthToken()
    if (token) {
      // Simple restore: just show dashboard with stored user
      const storedUser = localStorage.getItem('portfolio_user')
      if (storedUser) {
        setUser(storedUser)
      }
    }
  }, [])

  const handleLoginSuccess = (username) => {
    setUser(username)
    localStorage.setItem('portfolio_user', username)
  }

  const handleLogout = () => {
    clearAuthToken()
    localStorage.removeItem('portfolio_user')
    setUser(null)
  }

  if (!user) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />
  }

  return <AdminDashboard user={user} onLogout={handleLogout} />
}

export default AdminPage
