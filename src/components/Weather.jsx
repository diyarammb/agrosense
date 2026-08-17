import { useState, useEffect } from 'react'
import axios from 'axios'
import { Cloud, Droplets, Wind, Thermometer, MapPin, AlertCircle } from 'lucide-react'
const API_BASE = process.env.REACT_APP_API_URL || ''

function Weather() {
  const [location, setLocation] = useState('Hyderabad,Sindh,PK')
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [inputLocation, setInputLocation] = useState('Hyderabad,Sindh,PK')

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${API_BASE}/api/weather?location=${location}`)
        setWeatherData(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching weather:', error)
        setLoading(false)
      }
    }

    fetchWeather()
  }, [location])

  const handleLocationChange = (e) => {
    e.preventDefault()
    setLocation(inputLocation)
  }

  if (loading) {
    return <div className="loading">Loading weather data...</div>
  }

  return (
    <div className="weather">
      <h2>Weather Updates</h2>
      
      <form onSubmit={handleLocationChange} className="location-form">
        <div className="form-group">
          <MapPin size={20} />
          <input 
            type="text"
            value={inputLocation}
            onChange={(e) => setInputLocation(e.target.value)}
            placeholder="Enter location"
          />
          <button type="submit" className="btn-primary">Update</button>
        </div>
      </form>

      {weatherData?.alert && (
        <div className="weather-alert">
          <AlertCircle size={20} />
          <span>{weatherData.alert}</span>
        </div>
      )}

      {weatherData && (
        <>
          <div className="current-weather">
            <h3>Current Weather - {weatherData.location}</h3>
            <div className="weather-grid">
              <div className="weather-card">
                <Thermometer size={32} />
                <div>
                  <p className="weather-value">{weatherData.current?.temperature}°C</p>
                  <p className="weather-label">Temperature</p>
                </div>
              </div>
              <div className="weather-card">
                <Cloud size={32} />
                <div>
                  <p className="weather-value">{weatherData.current?.condition}</p>
                  <p className="weather-label">Condition</p>
                </div>
              </div>
              <div className="weather-card">
                <Droplets size={32} />
                <div>
                  <p className="weather-value">{weatherData.current?.humidity}%</p>
                  <p className="weather-label">Humidity</p>
                </div>
              </div>
              <div className="weather-card">
                <Wind size={32} />
                <div>
                  <p className="weather-value">{weatherData.current?.windSpeed} km/h</p>
                  <p className="weather-label">Wind Speed</p>
                </div>
              </div>
            </div>
          </div>

          {weatherData.forecast && (
            <div className="forecast">
              <h3>7-Day Forecast</h3>
              <div className="forecast-grid">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="forecast-card">
                    <p className="day">{day.day}</p>
                    <Cloud size={24} />
                    <p className="temp">{day.temp}°C</p>
                    <p className="condition">{day.condition}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Weather
