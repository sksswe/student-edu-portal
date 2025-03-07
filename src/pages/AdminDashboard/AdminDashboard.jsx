import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('role');
      navigate('/');
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <button onClick={handleSignOut} className="signout-button">
        Sign Out
      </button>
      <div className="admin-features">
        <Link to="/check-reports" className="admin-link">
          Check Reports
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;