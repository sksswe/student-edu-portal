import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Add a confirmation dialog
    if (window.confirm('Are you sure you want to sign out?')) {
      // Clear user session or token
      localStorage.removeItem('isAuthenticated'); // Example: Remove token from localStorage
      navigate('/'); // Redirect to the home page
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Study Group Dashboard</h1>
        <button onClick={handleSignOut} className="signout-button">
          Sign Out
        </button>
      </header>
      <main className="dashboard-main">
        <div className="dashboard-card">
          <h2>Create Study Group</h2>
          <p>Start a new study group and invite members.</p>
          <Link to="/create-study-group" className="dashboard-link">
            Go to Create Study Group
          </Link>
        </div>
        <div className="dashboard-card">
          <h2>Join Study Group</h2>
          <p>Join an existing study group using a group code.</p>
          <Link to="/join-study-group" className="dashboard-link">
            Go to Join Study Group
          </Link>
        </div>
        <div className="dashboard-card">
          <h2>Group Chat</h2>
          <p>Communicate with your study group members in real-time.</p>
          <Link to="/group-chat" className="dashboard-link">
            Go to Group Chat
          </Link>
        </div>
        <div className="dashboard-card">
          <h2>Share Files</h2>
          <p>Upload and share files with your study group.</p>
          <Link to="/share-files" className="dashboard-link">
            Go to Share Files
          </Link>
        </div>
        <div className="dashboard-card">
          <h2>View Files</h2>
          <p>Access files shared by your study group members.</p>
          <Link to="/view-files" className="dashboard-link">
            Go to View Files
          </Link>
        </div>
        <div className="dashboard-card">
          <h2>Notifications</h2>
          <p>Stay updated with notifications from your study group.</p>
          <Link to="/notifications" className="dashboard-link">
            Go to Notifications
          </Link>
        </div>
        <div className="dashboard-card">
          <h2>Report Issues</h2>
          <p>Report any issues or problems you encounter.</p>
          <Link to="/report-issues" className="dashboard-link">
            Go to Report Issues
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;