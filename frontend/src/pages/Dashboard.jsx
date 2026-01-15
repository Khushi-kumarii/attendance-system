import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const role = localStorage.getItem('role');
  const nav = useNavigate();

  const logout = () => {
    localStorage.clear();
    nav('/');
  };

  return (
    <div className="page">
      <div className="app-shell">

        <h1 className="page-title">
          {role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
        </h1>

        <div className="dashboard-grid">

          {/* Attendance for all */}
          <Link to="/attendance" className="dash-card">
            <span>📋</span>
            Attendance
          </Link>

          {/* Admin only */}
          {role === 'admin' && (
            <>
              <Link to="/admin" className="dash-card">
                <span>🛠</span>
                User Management
              </Link>

              <Link to="/reports" className="dash-card">
                <span>📊</span>
                Reports
              </Link>
            </>
          )}

          {/* User only */}
          {role === 'user' && (
            <Link to="/profile" className="dash-card">
              <span>👤</span>
              My Profile
            </Link>
          )}

          <button className="dash-card logout-card" onClick={logout}>
            <span>🚪</span>
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}
