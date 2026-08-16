import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminPage from './pages/AdminPage'
import { getProjects, getProfile } from './api'

// Secret admin access code — only you know this
const SECRET_ADMIN_CODE = 'mwalish-2026'

function Home() {
  const [projects, setProjects] = useState([])
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projData, profData] = await Promise.all([getProjects(), getProfile()])
        setProjects(projData.results || projData)
        setProfile(profData)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Could not load data. Please try again later.')
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <Navbar />
      <Hero profile={profile} loading={loading} />
      <Projects projects={projects} loading={loading} error={error} />
      <About profile={profile} loading={loading} />
      <Contact profile={profile} />
      <Footer profile={profile} />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path={`/${SECRET_ADMIN_CODE}`}
          element={<AdminPage />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
