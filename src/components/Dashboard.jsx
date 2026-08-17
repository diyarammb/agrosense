import { useState, useEffect } from "react";
import axios from "axios";
import {
  AlertTriangle,
  CheckCircle,
  Calendar,
  Sprout,
  ClipboardList,
  Tractor,
} from "lucide-react";

const API_BASE = process.env.REACT_APP_API_URL || '';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/dashboard`);
      setDashboardData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5 text-muted">
        <div className="spinner-border text-success mb-3" role="status"></div>
        <div>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="fw-bold text-success">🌾 Agrosense Dashboard</h2>
        <p className="text-muted">Overview of your farm’s performance & tasks</p>
      </div>

      {/* Stat Cards */}
      <div className="row g-4 mb-5">
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100 text-center p-3">
            <Tractor className="text-success mb-2" size={28} />
            <h6 className="text-uppercase text-muted">Total Area</h6>
            <h3 className="fw-bold">{dashboardData?.totalArea} acres</h3>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100 text-center p-3">
            <Sprout className="text-success mb-2" size={28} />
            <h6 className="text-uppercase text-muted">Active Crops</h6>
            <h3 className="fw-bold">{dashboardData?.activeCrops}</h3>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100 text-center p-3">
            <AlertTriangle className="text-danger mb-2" size={28} />
            <h6 className="text-uppercase text-muted">Alerts</h6>
            <h3 className="fw-bold text-danger">{dashboardData?.alerts}</h3>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100 text-center p-3">
            <ClipboardList className="text-warning mb-2" size={28} />
            <h6 className="text-uppercase text-muted">Pending Tasks</h6>
            <h3 className="fw-bold">{dashboardData?.tasks}</h3>
          </div>
        </div>
      </div>

      {/* Recent Alerts Section */}
      <div className="mb-5">
        <h4 className="text-success mb-3 d-flex align-items-center gap-2">
          <AlertTriangle size={20} /> Recent Alerts
        </h4>
        {dashboardData?.recentAlerts.length === 0 ? (
          <div className="alert alert-secondary text-center">
            No alerts at the moment.
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
            {dashboardData?.recentAlerts.map((alert) => (
              <div key={alert.id} className="col">
                <div
                  className={`card h-100 shadow-sm border-${
                    alert.severity === "high"
                      ? "danger"
                      : alert.severity === "medium"
                      ? "warning"
                      : "success"
                  }`}
                >
                  <div className="card-body">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <AlertTriangle
                        className={`text-${
                          alert.severity === "high"
                            ? "danger"
                            : alert.severity === "medium"
                            ? "warning"
                            : "success"
                        }`}
                        size={18}
                      />
                      <strong>{alert.severity.toUpperCase()}</strong>
                    </div>
                    <p className="text-muted mb-0">{alert.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Tasks Section */}
      <div>
        <h4 className="text-success mb-3 d-flex align-items-center gap-2">
          <Calendar size={20} /> Upcoming Tasks
        </h4>
        {dashboardData?.upcomingTasks.length === 0 ? (
          <div className="alert alert-secondary text-center">
            No upcoming tasks.
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
            {dashboardData?.upcomingTasks.map((task) => (
              <div key={task.id} className="col">
                <div className="card h-100 shadow-sm border-success">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <CheckCircle className="text-success" size={18} />
                      <span className="badge bg-light text-success border border-success">
                        Due: {task.dueDate}
                      </span>
                    </div>
                    <p className="fw-semibold mb-1">{task.task}</p>
                    <p className="text-muted small mb-0">
                      Priority: {task.priority || "Normal"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
