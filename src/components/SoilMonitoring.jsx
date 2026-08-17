import { useState, useEffect } from 'react'
import axios from 'axios'
import { Droplets, TrendingUp } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
const API_BASE = process.env.REACT_APP_API_URL 
function SoilMonitoring() {
  const [field, setField] = useState('Field 1')
  const [soilData, setSoilData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchSoilData()
  }, [field])

  const fetchSoilData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${API_BASE}/api/soil-moisture?field=${field}`)
      setSoilData(response.data)
    } catch (error) {
      console.error('Error fetching soil data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getMoistureStatus = (moisture) => {
    if (moisture < 40) return 'low'
    if (moisture > 60) return 'high'
    return 'good'
  }

  if (loading) {
    return <div className="loading">Loading soil data...</div>
  }

  return (
    <div className="soil-monitoring p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">🌱 Soil Moisture Monitoring</h2>
      
      <div className="field-selector mb-4">
        <label className="font-medium mr-2">Select Field:</label>
        <select
          value={field}
          onChange={(e) => setField(e.target.value)}
          className="border px-3 py-1 rounded-md"
        >
          <option value="Field 1">Field 1</option>
          <option value="Field 2">Field 2</option>
          <option value="Field 3">Field 3</option>
          <option value="Field 4">Field 4</option>
        </select>
      </div>

      {soilData && (
        <>
          <div className="moisture-overview flex items-center gap-6 mb-6">
            <div className="flex items-center gap-4">
              <Droplets
                size={48}
                className={`text-${getMoistureStatus(soilData.currentMoisture)}-500`}
              />
              <div>
                <h3 className="text-xl font-semibold">{soilData.currentMoisture}%</h3>
                <p className={`capitalize ${getMoistureStatus(soilData.currentMoisture)}`}>
                  {soilData.status}
                </p>
              </div>
            </div>
          </div>

          <div className="moisture-chart mb-6">
            <h3 className="flex items-center gap-2 font-semibold mb-2">
              <TrendingUp size={20} /> Moisture History (24 hours)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={soilData.history}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line 
                  type="monotone"
                  dataKey="moisture"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ fill: '#22c55e', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="recommendation p-4 bg-green-50 rounded-md">
            <h3 className="font-semibold mb-1">Recommendation</h3>
            <p>{soilData.recommendation}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default SoilMonitoring
