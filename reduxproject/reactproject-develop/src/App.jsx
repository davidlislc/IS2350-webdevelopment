import { useState } from 'react'
import './App.css'

const LOGIN_URL = 'http://localhost:8080/login'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [message, setMessage] = useState('')

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
    setToken(null)
    setMessage('')
  }

  if (token) {
    return (
      <div className="login card shadow-sm p-4">
        <h1 className="h3">{message || 'Logged in'}</h1>
        <p className="token text-secondary">Token: {token}</p>
        <button className="btn btn-outline-secondary" onClick={handleLogout}>Log out</button>
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
    </form>
  )
}

export default App
