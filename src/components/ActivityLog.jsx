import { useState, useEffect } from 'react'
import axios from 'axios'
import { Calendar, MapPin } from 'lucide-react'
const API_BASE = process.env.REACT_APP_API_URL || ''

function ActivityLog() {
  const [activities, setActivities] = useState([])
  const [newActivity, setNewActivity] = useState({
    date: new Date().toISOString().split('T')[0],
    activity: '',
    field: '',
    type: 'General'
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/activities`);
      setActivities(response.data)
    } catch (error) {
      console.error('Error fetching activities:', error)
    }
  }

  const addActivity = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
 const response = await axios.post(`${API_BASE}/api/activities`, newActivity);   
    setActivities([response.data, ...activities])
      setNewActivity({
        date: new Date().toISOString().split('T')[0],
        activity: '',
        field: '',
        type: 'General'
      })
      setLoading(false)
    } catch (error) {
      console.error('Error adding activity:', error)
      setLoading(false)
    }
  }

  const activityTypes = ['Planting', 'Fertilization', 'Irrigation', 'Harvesting', 'Pest Control', 'Maintenance', 'General']

  return (
    <div className="activity-log">
      <h2>Farm Activity Log</h2>
      
      <div className="activity-form">
        <h3>Log New Activity</h3>
        <form onSubmit={addActivity}>
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input 
                type="date" 
                value={newActivity.date}
                onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Field</label>
              <input 
                type="text" 
                value={newActivity.field}
                onChange={(e) => setNewActivity({...newActivity, field: e.target.value})}
                placeholder="e.g., North Field"
                required
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select 
                value={newActivity.type}
                onChange={(e) => setNewActivity({...newActivity, type: e.target.value})}
              >
                {activityTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Activity Description</label>
            <textarea 
              value={newActivity.activity}
              onChange={(e) => setNewActivity({...newActivity, activity: e.target.value})}
              placeholder="Describe the activity..."
              rows="3"
              required
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Adding...' : 'Add Activity'}
          </button>
        </form>
      </div>
<div className="activities-list mt-4">
  <h3 className="text-success mb-4 text-center">Recent Activities</h3>

  {activities.length === 0 ? (
    <div className="alert alert-secondary text-center" role="alert">
      No activities logged yet.
    </div>
  ) : (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {activities.map((activity) => (
        <div className="col" key={activity.id}>
          <div className="card border-success h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-success mb-3 d-flex justify-content-between align-items-center">
                <span>{activity.type}</span>
                <span className="text-muted small d-flex align-items-center gap-1">
                  <Calendar size={14} />
                  {activity.date}
                </span>
              </h5>
              <p className="card-text mb-3">{activity.activity}</p>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2 text-muted small">
                  <MapPin size={14} />
                  <span>{activity.field}</span>
                </div>
              </div>
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

export default ActivityLog
