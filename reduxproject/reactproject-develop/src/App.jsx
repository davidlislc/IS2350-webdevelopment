import { useState } from 'react'
import './App.css'
import AccessRequestDashboard from './components/AccessRequestDashboard'

const LOGIN_URL = 'http://localhost:8080/login'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [message, setMessage] = useState('')
  const [userInfo, setUserInfo] = useState(() => {
    const stored = localStorage.getItem('userInfo')
    return stored ? JSON.parse(stored) : null
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.token) {
        throw new Error(data.message || 'Login failed')
      }
      localStorage.setItem('token', data.token)
      // Store user info (in real app, decode JWT to get user details)
      const user = {
        id: 1,
        username: username,
        email: username + '@example.com',
        role: username === 'admin' ? 'admin' : 'user'
      }
      localStorage.setItem('userInfo', JSON.stringify(user))
      setUserInfo(user)
      setToken(data.token)
      setMessage(data.message)
      setPassword('')
    } catch (err) {
      setError(err.message || 'Unable to reach the server')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    setToken(null)
    setUserInfo(null)
    setMessage('')
  }

  if (token && userInfo) {
    return (
      <div className="app-container">
        <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">Access Request System</span>
            <div className="d-flex align-items-center gap-3">
              <span className="text-light">Welcome, {userInfo.username}</span>
              <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                Log out
              </button>
            </div>
          </div>
        </nav>
        <div className="container-fluid mt-4">
          <AccessRequestDashboard 
            userRole={userInfo.role}
            userId={userInfo.id}
            userEmail={userInfo.email}
          />
        </div>
      </div>
    )
  }

  return (
    <form className="login card shadow-sm p-4" onSubmit={handleSubmit}>
      <h1 className="h3 text-center">Login</h1>
      <label className="form-label">
        Username
        <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus />
      </label>
      <label className="form-label">
        Password
        <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      {error && <p className="alert alert-danger mb-0" role="alert">{error}</p>}
      <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      <small className="text-muted text-center mt-3">Demo: username=user1, password=password1 (or admin for admin role)</small>
    </form>
  )
}

export default App
