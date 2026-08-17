import { useState } from 'react'
import { Sprout } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'

const API_BASE = process.env.REACT_APP_API_URL || ''

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')        // 👈 new state for message
  const [messageType, setMessageType] = useState('') // 👈 "success" or "error"

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("⚠️ All fields are required");
      setMessageType("error");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        if (data.token) 
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.user.username);
        setMessage("✅ Login successful! Redirecting...");
        setMessageType("success");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMessage(data.error || "Invalid credentials");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage(" Something went wrong. Please try again.");
      setMessageType("error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <Sprout size={36} className="auth-icon" />
          <h1>AgroSense</h1>
        </div>
        <h2>Login to Your Account</h2>

        {/* Message Display */}
        {message && (
          <div className={`auth-message ${messageType}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-btn">Login</button>
        </form>

        <p className="auth-footer">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  )
}
