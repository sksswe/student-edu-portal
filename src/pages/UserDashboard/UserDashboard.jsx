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
      <h1>User Dashboard</h1>
      <button onClick={handleSignOut} className="signout-button">
        Sign Out
      </button>
      <div className="user-features">
        <Link to="/create-study-group" className="user-link">
          Create Study Group
        </Link>
        <Link to="/join-study-group" className="user-link">
          Join Study Group
        </Link>
        <Link to="/group-chat" className="user-link">
          Group Chat
        </Link>
        <Link to="/share-files" className="user-link">
          Share Files
        </Link>
        <Link to="/view-files" className="user-link">
          View Files
        </Link>
        <Link to="/notifications" className="user-link">
          Notifications
        </Link>
        <Link to="/report-issues" className="user-link">
          Report Issues
        </Link>
      </div>
    </div>
  );
}

export default UserDashboard;