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
      {/* Header */}
      <header className="header">
        <h2>Welcome, Admin</h2>
      </header>

      {/* Sidebar */}
      <nav className="sidebar">
        <Link to="/view-reports" className="sidebar-link">
          <span className="link-icon">📊</span> View Reports
        </Link>
        <Link to="/manage-users" className="sidebar-link">
          <span className="link-icon">👥</span> Manage Users
        </Link>
        <Link to="/view-registrations" className="sidebar-link">
          <span className="link-icon">📝</span> View Registrations
        </Link>
        <Link to="/post-notice" className="sidebar-link">
          <span className="link-icon">📢</span> Post Notice
        </Link>
        <Link to="/view-notices" className="sidebar-link">
          <span className="link-icon">📜</span> View Notices
        </Link>

        {/* Sign Out Button */}
        <button onClick={handleSignOut} className="signout-button">
          Sign Out
        </button>
      </nav>

      {/* Main Content */}
      <main className="admin-main-content">
        <h1>Admin Dashboard</h1>
        <p>Select an option from the menu to get started.</p>
      </main>
    </div>
  );
}

export default AdminDashboard;