import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './UserDashboard.css';

function UserDashboard() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('role');
      navigate('/');
    }
  };

  return (
    <div className="user-dashboard">
      {/* Header */}
      <header className="header">
        <h2>Welcome, User</h2>
      </header>

      {/* Sidebar */}
      <nav className="sidebar">
        <Link to="/study-group" className="sidebar-link">
          <span className="link-icon">📚</span> Study Group
        </Link>
        <Link to="/group-chat" className="sidebar-link">
          <span className="link-icon">💬</span> Group Chat
        </Link>
        <Link to="/share-files" className="sidebar-link">
          <span className="link-icon">📂</span> Share Files
        </Link>
        <Link to="/view-files" className="sidebar-link">
          <span className="link-icon">👀</span> View Files
        </Link>
        <Link to="/notifications" className="sidebar-link">
          <span className="link-icon">🔔</span> Notifications
        </Link>
        <Link to="/report-issues" className="sidebar-link">
          <span className="link-icon">⚠️</span> Report Issues
        </Link>

        {/* Sign Out Button */}
        <button onClick={handleSignOut} className="signout-button">
          Sign Out
        </button>
      </nav>

      {/* Main Content */}
      <main className="user-main-content">
        <h1>User Dashboard</h1>
        <p>Select an option from the menu to get started.</p>
      </main>
    </div>
  );
}

export default UserDashboard;