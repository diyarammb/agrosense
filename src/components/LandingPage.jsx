import { Link } from 'react-router-dom'
import { Leaf, Cloud, Droplet, Bug, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

// Images
const heroDashboard = "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop"
const aboutFarmers = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop"
const cropImage = "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop"
const pestImage = "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop"
const weatherImage = "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?w=400&h=300&fit=crop"
const soilImage = "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=400&h=300&fit=crop"

function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-light text-dark">

      {/* Navbar */}
      <header className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-center fw-bold fs-4">
            <Leaf className="me-2 text-success" /> AgroSense
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a href="#features" className="nav-link">Features</a>
              </li>
              <li className="nav-item">
                <a href="#about" className="nav-link">About</a>
              </li>
              <li className="nav-item">
                <a href="#contact" className="nav-link">Contact</a>
              </li>
              <li className="nav-item">
                <Link to="/login" className="btn btn-outline-success me-2">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="btn btn-success">Get Started</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4">
              <h6 className="text-success text-uppercase mb-3 fw-semibold">AI-Powered Agriculture</h6>
              <h1 className="display-5 fw-bold mb-4">
                Empowering Precision Agriculture with AI
              </h1>
              <p className="lead text-muted mb-4">
                AgroSense leverages AI and real-time data to provide farmers with advanced weather insights,
                soil analytics, pest detection, and crop planning tools — all in one intuitive platform.
              </p>

              <div className="d-flex flex-wrap gap-3 mb-3">
                <Link to="/register" className="btn btn-success btn-lg">
                  Start Your Free Trial <ArrowRight size={18} className="ms-2" />
                </Link>
                <button className="btn btn-outline-secondary btn-lg">
                  Watch Demo
                </button>
              </div>

              <div className="d-flex flex-wrap gap-4">
                <div className="d-flex align-items-center">
                  <CheckCircle2 className="text-success me-2" />
                  <small>No credit card required</small>
                </div>
                <div className="d-flex align-items-center">
                  <CheckCircle2 className="text-success me-2" />
                  <small>14-day free trial</small>
                </div>
              </div>
            </div>

            <div className="col-lg-6 text-center">
              <img
                src={heroDashboard}
                alt="AgroSense Dashboard"
                className="img-fluid rounded shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5 bg-white border-top border-bottom">
        <div className="container text-center">
          <h6 className="text-success text-uppercase mb-3 fw-semibold">Our Solutions</h6>
          <h2 className="fw-bold mb-3">Our Core Features</h2>
          <p className="text-muted mb-5">
            Comprehensive tools designed to optimize every aspect of your farming operations.
          </p>

          <div className="row g-4">
            {/* Crop Planning */}
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm border-0">
                <img src={cropImage} alt="Crop Planning" className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title"><Leaf className="text-success me-2" /> Crop Planning</h5>
                  <p className="card-text text-muted">
                    Optimize yield and sustainability with AI-driven crop recommendations tailored to your soil and climate.
                  </p>
                </div>
              </div>
            </div>

            {/* Weather */}
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm border-0">
                <img src={weatherImage} alt="Weather" className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title"><Cloud className="text-success me-2" /> Weather Monitoring</h5>
                  <p className="card-text text-muted">
                    Receive real-time, location-specific weather forecasts and alerts to make informed decisions.
                  </p>
                </div>
              </div>
            </div>

            {/* Soil */}
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm border-0">
                <img src={soilImage} alt="Soil" className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title"><Droplet className="text-success me-2" /> Soil Monitoring</h5>
                  <p className="card-text text-muted">
                    Monitor soil moisture and nutrients in real-time for optimal growing conditions.
                  </p>
                </div>
              </div>
            </div>

            {/* Pest */}
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm border-0">
                <img src={pestImage} alt="Pest" className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title"><Bug className="text-success me-2" /> Pest Detection</h5>
                  <p className="card-text text-muted">
                    Identify pests and get treatment suggestions using AI-powered image analysis technology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-1 order-2">
              <img
                src={aboutFarmers}
                alt="Farmers"
                className="img-fluid rounded shadow-lg mb-4"
              />
            </div>
            <div className="col-lg-6 order-lg-2 order-1">
              <h6 className="text-success text-uppercase mb-3 fw-semibold">Our Mission</h6>
              <h2 className="fw-bold mb-3">About AgroSense</h2>
              <p className="text-muted mb-3">
                AgroSense is a cutting-edge, AI-powered platform designed to empower farmers with data-driven insights.
                Our mission is to enhance productivity, minimize waste, and promote sustainable farming practices.
              </p>
              <p className="text-muted mb-4">
                We believe that technology and agriculture can work together to create a more sustainable future.
                By providing farmers with the tools they need, we're helping to feed the world while protecting our planet.
              </p>
              <Link to="/register" className="btn btn-success btn-lg">
                Join Us Today <ArrowRight size={18} className="ms-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-white border-top py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-3">
              <h4 className="fw-bold mb-3 d-flex align-items-center">
                <Leaf className="text-success me-2" /> AgroSense
              </h4>
              <p className="text-muted small">
                Transforming agriculture with smart technology and data-driven insights.
              </p>
            </div>
            <div className="col-lg-3">
              <h6 className="fw-semibold mb-3">Quick Links</h6>
              <ul className="list-unstyled text-muted small">
                <li><a href="#features" className="text-decoration-none text-muted">Features</a></li>
                <li><a href="#about" className="text-decoration-none text-muted">About</a></li>
                <li><Link to="/login" className="text-decoration-none text-muted">Login</Link></li>
                <li><Link to="/register" className="text-decoration-none text-muted">Register</Link></li>
              </ul>
            </div>
            <div className="col-lg-3">
              <h6 className="fw-semibold mb-3">Contact Us</h6>
              <p className="text-muted small mb-1">support@agrosense.com</p>
              <p className="text-muted small">+92 310 0115838</p>
            </div>
            <div className="col-lg-3">
              <h6 className="fw-semibold mb-3">Follow Us</h6>
              <div className="d-flex gap-3">
                <a href="https://twitter.com/agrosense" className="text-muted small text-decoration-none">Twitter</a>
                <a href="https://linkedin.com/company/agrosense" className="text-muted small text-decoration-none">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="text-center mt-4 border-top pt-3 text-muted small">
            © {new Date().getFullYear()} AgroSense. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  )
}

export default LandingPage
