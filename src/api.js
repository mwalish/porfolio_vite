import axios from 'axios'

const API = axios.create({
  baseURL: '/api',
})

// Attach auth token to all requests if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('portfolio_token')
  if (token) {
    config.headers.Authorization = `Token ${token}`
  }
  return config
})

export const getProjects = async () => {
  const response = await API.get('/projects/')
  return response.data
}

export const getProject = async (id) => {
  const response = await API.get(`/projects/${id}/`)
  return response.data
}

export const createProject = async (data) => {
  const response = await API.post('/projects/', data)
  return response.data
}

export const updateProject = async (id, data) => {
  const response = await API.put(`/projects/${id}/`, data)
  return response.data
}

export const deleteProject = async (id) => {
  await API.delete(`/projects/${id}/`)
}

export const getProfile = async () => {
  const response = await API.get('/profile/')
  return response.data
}

export const updateProfile = async (data) => {
  const response = await API.put('/profile/', data)
  return response.data
}

export const login = async (username, password) => {
  const response = await API.post('/auth/login/', { username, password })
  return response.data
}

export const setAuthToken = (token) => {
  localStorage.setItem('portfolio_token', token)
}

export const getAuthToken = () => {
  return localStorage.getItem('portfolio_token')
}

export const clearAuthToken = () => {
  localStorage.removeItem('portfolio_token')
}

export const logout = () => {
  localStorage.removeItem('portfolio_token')
  localStorage.removeItem('portfolio_user')
}

export default API
