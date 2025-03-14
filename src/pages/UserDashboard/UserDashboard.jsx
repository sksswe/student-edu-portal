import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import StudyGroupModal from "../Modal/StudyGroupModal";
import ReportIssues from "../ReportIssues/ReportIssues"; // Import the ReportIssues component
import "./UserDashboard.css";

function UserDashboard() {
  const navigate = useNavigate();
  const [isStudyGroupModalOpen, setIsStudyGroupModalOpen] = useState(false);
  const [isReportIssuesModalOpen, setIsReportIssuesModalOpen] = useState(false);

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("role");
      navigate("/");
    }
  };

  const handleStudyGroupClick = (e) => {
    e.preventDefault();
    setIsStudyGroupModalOpen(true);
  };

  const handleReportIssuesClick = (e) => {
    e.preventDefault();
    setIsReportIssuesModalOpen(true);
  };

  const handleCreateGroup = () => {
    setIsStudyGroupModalOpen(false);
    navigate("/create-study-group");
  };

  const handleJoinGroup = () => {
    setIsStudyGroupModalOpen(false);
    navigate("/join-study-group");
  };

  const handleSubmitReport = (reportData) => {
    console.log("Report Data:", reportData); // Handle form submission (e.g., send to an API)
    setIsReportIssuesModalOpen(false);
  };

  return (
    <div className="user-dashboard">
      <header className="header">
        <h2>Welcome, User</h2>
      </header>

      <nav className="sidebar">
        <Link
          to="/study-group"
          className="sidebar-link"
          onClick={handleStudyGroupClick}
        >
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
        <Link
          to="/report-issues"
          className="sidebar-link"
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

      {/* Study Group Modal */}
      {isStudyGroupModalOpen && (
        <StudyGroupModal
          onClose={() => setIsStudyGroupModalOpen(false)}
          onCreateGroup={handleCreateGroup}
          onJoinGroup={handleJoinGroup}
        />
      )}

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