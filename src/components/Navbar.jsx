import { useEffect, useState } from 'react'
import { Bell, User, LogOut } from 'lucide-react'
// import axios from 'axios'
import './Navbar.css'
// const API_BASE = process.env.REACT_APP_API_URL

export default function Navbar() {
  // const [user, setUser] = useState(null)
  const [username, setUserName] = useState(null)


  useEffect(() => {
    const username = localStorage.getItem("username")
    setUserName(username)
    // if (!token) return
    // axios
      // .get(`${API_BASE}/api/profile`, {
        // headers: {
          // Authorization: `Bearer ${token}`,
        // },
      // })
      // .then((res) => {
        // if (res.data && res.data.name) {
          // setUser(user)
        // }
      // })
      // .catch((err) => {
        // console.error("Error fetching user:", err)
      // })
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm border-bottom" style={{ left: '240px' }}>
      <div className="container-fluid d-flex justify-content-between align-items-center px-4">
        {/* Left Section */}
        <div className="navbar-brand m-0">
          <h5 className="mb-0 fw-semibold text-dark">
            Welcome Back,{" "}
            <span className="text-success">
              {username ? username : "Loading..."}
            </span>
          </h5>
        </div>

        {/* Right Section */}
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-link text-secondary p-0">
            <Bell size={20} />
          </button>

          <div className="d-flex align-items-center bg-light rounded-pill px-3 py-1">
            <User size={20} className="text-success me-2" />
            <span className="fw-medium">{username ? username : "..."}</span>
          </div>

          <button className="btn btn-success d-flex align-items-center gap-1 px-3 py-1" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
