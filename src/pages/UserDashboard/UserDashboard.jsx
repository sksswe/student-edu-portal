import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ReportIssues from "../ReportIssues/ReportIssues";
import "./UserDashboard.css";

function UserDashboard() {
  const navigate = useNavigate();
  const [isReportIssuesModalOpen, setIsReportIssuesModalOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem("username");

    if (!token) {
      navigate("/signup");
    } else {
      setUsername(storedUsername || "User");
    }
  }, [navigate]);

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/signin");
    }
  };

  const handleReportIssuesClick = (e) => {
    e.preventDefault();
    setIsReportIssuesModalOpen(true);
  };

  const handleSubmitReport = (reportData) => {
    console.log("Report Data:", reportData);
    setIsReportIssuesModalOpen(false);
  };

  return (
    <div className="user-dashboard">
      <header className="header">
        <h2>Welcome, {username ? username : "User"}</h2>
      </header>

      <nav className="user-sidebar">
        <Link to="/study-group" className="user-sidebar-link">
          <span className="link-icon">📚</span> Study Group
        </Link>
        <Link to="/group-chat" className="user-sidebar-link">
          <span className="link-icon">💬</span> Group Chat
        </Link>
        <Link to="/view-files" className="user-sidebar-link">
          <span className="link-icon">👀</span> View Files
        </Link>
        <Link to="/notifications" className="user-sidebar-link">
          <span className="link-icon">🔔</span> Notifications
        </Link>
        <Link
          to="/report-issues"
          className="user-sidebar-link"
          onClick={handleReportIssuesClick}
        >
          <span className="link-icon">⚠️</span> Report Issues
        </Link>

        <button onClick={handleSignOut} className="signout-button">
          Sign Out
        </button>
      </nav>

      <main className="user-main-content">
        <h1>User Dashboard</h1>
        <p>Select an option from the menu to get started.</p>
      </main>

      {/* Report Issues Modal */}
      {isReportIssuesModalOpen && (
        <ReportIssues
          onClose={() => setIsReportIssuesModalOpen(false)}
          onSubmit={handleSubmitReport}
        />
      )}
    </div>
  );
}

export default UserDashboard;