import { useState, useEffect } from 'react'
import axios from 'axios'
import { Calendar, Droplets, Leaf } from 'lucide-react'

// Base API URL
const API_BASE = process.env.REACT_APP_API_URL || ''

function CropPlanning() {
  const [crops, setCrops] = useState([])
  const [selectedCrop, setSelectedCrop] = useState('')
  const [selectedDetails, setSelectedDetails] = useState(null)
  const [area, setArea] = useState('')
  const [plantingDate, setPlantingDate] = useState('')
  const [plan, setPlan] = useState(null)
  const [savedPlans, setSavedPlans] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCrops()
    fetchSavedPlans()
  }, [])

  const fetchCrops = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/crops`)
      setCrops(response.data)
    } catch (error) {
      console.error('Error fetching crops:', error)
    }
  }

  const fetchSavedPlans = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/crop-plans`)
      setSavedPlans(response.data)
    } catch (error) {
      console.error('Error fetching saved plans:', error)
    }
  }

  const handleCropSelect = (e) => {
    const cropName = e.target.value
    setSelectedCrop(cropName)
    const cropInfo = crops.find((c) => c.name === cropName)
    setSelectedDetails(cropInfo)
  }

  const createPlan = async (e) => {
    e.preventDefault()
    if (!selectedCrop || !area || !plantingDate) return
    setLoading(true)
    try {
      const response = await axios.post(`${API_BASE}/api/crop-plan`, {
        crop: selectedCrop,
        area: parseFloat(area),
        plantingDate
      })
      setPlan(response.data)
      fetchSavedPlans()
      setLoading(false)
    } catch (error) {
      console.error('Error creating plan:', error)
      setLoading(false)
    }
  }

  // ✅ Delete a plan
  const deletePlan = async (id) => {
    if (!window.confirm('Are you sure you want to delete this plan?')) return
    try {
      await axios.delete(`${API_BASE}/api/crop-plan/${id}`)
      fetchSavedPlans()
    } catch (error) {
      console.error('Error deleting plan:', error)
    }
  }

  return (
    <div className="crop-planning">
      <h2>🌾 Crop Planning</h2>

      <div className="planning-container">
        <div className="plan-form">
          <h3>Create Crop Plan</h3>
          <form onSubmit={createPlan}>
            <div className="form-group">
              <label>Select Crop</label>
              <select
                value={selectedCrop}
                onChange={handleCropSelect}
                required
              >
                <option value="">Choose a crop...</option>
                {crops.map((crop, index) => (
                  <option key={index} value={crop.name}>
                    {crop.name.charAt(0).toUpperCase() + crop.name.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* ✅ Show crop details dynamically */}
            {selectedDetails && (
              <div className="crop-details">
                <p><strong>🌤️ Season:</strong> {selectedDetails.season}</p>
                <p><strong>⏱️ Duration:</strong> {selectedDetails.duration}</p>
                <p><strong>🌱 Soil Type:</strong> {selectedDetails.soil}</p>
                <p><strong>💧 Water Requirement:</strong> {selectedDetails.water}</p>
              </div>
            )}

            <div className="form-group">
              <label>Area (acres)</label>
              <input
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Enter area in acres"
                required
              />
            </div>

            <div className="form-group">
              <label>Planting Date</label>
              <input
                type="date"
                value={plantingDate}
                onChange={(e) => setPlantingDate(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Creating Plan...' : 'Create Plan'}
            </button>
          </form>
        </div>

        {plan && (
          <div className="plan-result">
            <h3>Crop Plan for {plan.crop}</h3>
            <div className="plan-details">
              <div className="plan-info">
                <Calendar size={20} />
                <p><strong>Planting:</strong> {plan.plantingDate}</p>
              </div>
              <div className="plan-info">
                <Leaf size={20} />
                <p><strong>Soil:</strong> {plan.soilType}</p>
              </div>
              <div className="plan-info">
                <Droplets size={20} />
                <p><strong>Water:</strong> {plan.waterRequirement}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="container my-4">
  <h3 className="mb-4 text-success fw-semibold">Saved Crop Plans</h3>

  {savedPlans.length === 0 ? (
    <div className="alert alert-secondary text-center" role="alert">
      No plans saved yet.
    </div>
  ) : (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {savedPlans.map((p) => (
        <div className="col" key={p.id}>
          <div className="card border-success h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-success mb-3">{p.crop}</h5>
              <p className="card-text mb-1"><strong>Area:</strong> {p.area} acres</p>
              <p className="card-text mb-1"><strong>Season:</strong> {p.season}</p>
              <p className="card-text mb-1"><strong>Soil:</strong> {p.soilType}</p>
              <p className="card-text mb-1"><strong>Water:</strong> {p.waterRequirement}</p>
              <p className="card-text mb-3"><strong>Planting Date:</strong> {p.plantingDate}</p>
              <button
                className="btn btn-outline-danger btn-sm w-100"
                onClick={() => deletePlan(p.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
  
    </div>
  )
}

export default CropPlanning
