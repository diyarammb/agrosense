import { NavLink } from 'react-router-dom'
import { Home, Sprout, Cloud, Droplets, Bug, Activity } from 'lucide-react'

export default function Sidebar() {
  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: <Home size={18} /> },
    { to: '/crop-planning', label: 'Crop Planning', icon: <Sprout size={18} /> },
    { to: '/weather', label: 'Weather', icon: <Cloud size={18} /> },
    { to: '/soil-monitoring', label: 'Soil Monitoring', icon: <Droplets size={18} /> },
    { to: '/pest-detection', label: 'Pest Detection', icon: <Bug size={18} /> },
    { to: '/activities', label: 'Activities', icon: <Activity size={18} /> },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Sprout size={26} className="logo-icon" />
        <h1 className="logo-text">AgroSense</h1>
      </div>

      <ul className="sidebar-links">
        {links.map(({ to, label, icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end
              className={({ isActive }) =>
                isActive ? 'sidebar-link active' : 'sidebar-link'
              }
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">© 2025 AgroSense</div>
    </aside>
  )
}
