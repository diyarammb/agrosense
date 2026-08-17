import { useState } from 'react'
import axios from 'axios'
import { Upload, Bug, AlertTriangle, CheckCircle } from 'lucide-react'
const API_BASE = process.env.REACT_APP_API_URL || ''

function PestDetection() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzePest = async () => {
    if (!selectedImage) return

    setLoading(true)
    const formData = new FormData()
    formData.append('image', selectedImage)

    try {
      const response = await axios.post(`${API_BASE}/api/pest-detection`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setResult(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error analyzing pest:', error)
      setLoading(false)
    }
  }

  const getSeverityColor = (severity) => {
    switch(severity?.toLowerCase()) {
      case 'low': return '#22c55e'
      case 'moderate': return '#f59e0b'
      case 'high': return '#ef4444'
      default: return '#6b7280'
    }
  }

  return (
    <div className="pest-detection">
      <h2>Pest Detection</h2>
      
      <div className="detection-container">
        <div className="upload-section">
          <h3>Upload Plant Image</h3>
          <div className="upload-area">
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageSelect}
              id="image-upload"
              style={{ display: 'none' }}
            />
            <label htmlFor="image-upload" className="upload-label">
              {preview ? (
                <img src={preview} alt="Preview" className="image-preview" />
              ) : (
                <div className="upload-placeholder">
                  <Upload size={48} />
                  <p>Click to upload plant image</p>
                  <p className="upload-hint">Supports JPG, PNG</p>
                </div>
              )}
            </label>
          </div>
          <button 
            onClick={analyzePest}
            disabled={!selectedImage || loading}
            className="btn-primary"
          >
            {loading ? 'Analyzing...' : 'Analyze for Pests'}
          </button>
        </div>

        {result && (
          <div className="detection-result">
            <h3>Detection Results</h3>
            
            {result.detected ? (
              <>
                <div className="result-header">
                  <Bug size={32} color={getSeverityColor(result.severity)} />
                  <div>
                    <h4>{result.pest}</h4>
                    <div className="severity" style={{ color: getSeverityColor(result.severity) }}>
                      Severity: {result.severity}
                    </div>
                  </div>
                </div>

                <div className="confidence-bar">
                  <div className="confidence-label">
                    <span>Confidence</span>
                    <span>{result.confidence}%</span>
                  </div>
                  <div className="bar">
                    <div 
                      className="bar-fill" 
                      style={{ width: `${result.confidence}%` }}
                    ></div>
                  </div>
                </div>

                <div className="treatment-section">
                  <h4><AlertTriangle size={20} /> Recommended Treatment</h4>
                  <p>{result.treatment}</p>
                </div>

                <div className="prevention-section">
                  <h4><CheckCircle size={20} /> Preventive Measures</h4>
                  <ul>
                    {result.preventiveMeasures?.map((measure, index) => (
                      <li key={index}>{measure}</li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="no-detection">
                <CheckCircle size={48} color="#22c55e" />
                <h4>No Pests Detected</h4>
                <p>{result.analysis || 'Your plant appears healthy!'}</p>
                {result.note && <p className="note">{result.note}</p>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PestDetection
