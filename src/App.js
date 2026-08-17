import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import CropPlanning from './components/CropPlanning';
import Weather from './components/Weather';
import SoilMonitoring from './components/SoilMonitoring';
import PestDetection from './components/PestDetection';
import ActivityLog from './components/ActivityLog';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import './App.css';

function Layout() {
  const location = useLocation();
  const hideLayout = ['/', '/login', '/register'].includes(location.pathname);
  return hideLayout ? (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  ) : (
    <div className="app-container">
      <Sidebar />
      <div className="main-layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/crop-planning" element={<CropPlanning />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/soil-monitoring" element={<SoilMonitoring />} />
            <Route path="/pest-detection" element={<PestDetection />} />
            <Route path="/activities" element={<ActivityLog />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
