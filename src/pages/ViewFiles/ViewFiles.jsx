import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ViewFiles.css";
import ReportIssues from "../ReportIssues/ReportIssues";

function ViewFiles() {
  const [username, setUsername] = useState("");
  const [isReportIssuesModalOpen, setIsReportIssuesModalOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (!token) {
      navigate("/signup");
    } else {
      setUsername(storedUsername || "User");
      // Sample files
      setFiles([
        { id: 1, name: "Lecture Notes.pdf", type: "pdf", date: "2025-04-11" },
        { id: 2, name: "Assignment.docx", type: "doc", date: "2025-04-10" },
        { id: 2, name: "Assignment.docx", type: "doc", date: "2025-04-10" },
        { id: 2, name: "Assignment.docx", type: "doc", date: "2025-04-10" },
        { id: 2, name: "Assignment.docx", type: "doc", date: "2025-04-10" },
        { id: 2, name: "Assignment.docx", type: "doc", date: "2025-04-10" },
        { id: 2, name: "Assignment.docx", type: "doc", date: "2025-04-10" },
        { id: 2, name: "Assignment.docx", type: "doc", date: "2025-04-10" },
        { id: 2, name: "Assignment.docx", type: "doc", date: "2025-04-10" },
        { id: 2, name: "Assignment.docx", type: "doc", date: "2025-04-10" },
        { id: 2, name: "Assignment.docx", type: "doc", date: "2025-04-10" },
        { id: 2, name: "Assignment.docx", type: "doc", date: "2025-04-10" },
        { id: 2, name: "Assignment.docx", type: "doc", date: "2025-04-10" },
        { id: 2, name: "Assignment.docx", type: "doc", date: "2025-04-10" },
        { id: 2, name: "Assignment.docx", type: "doc", date: "2025-04-10" },
        { id: 2, name: "Assignment.docx", type: "doc", date: "2025-04-10" },
        { id: 2, name: "Assignment.docx", type: "doc", date: "2025-04-10" },
        { id: 2, name: "Assignment.docx", type: "doc", date: "2025-04-10" },
      ]);
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

  const handleView = (fileName) => {
    alert(`View file: ${fileName}`);
  };

  const handleDownload = (fileName) => {
    alert(`Download file: ${fileName}`);
  };

  return (
    <div className="user-dashboard">
      <header className="header">
        <h2>Welcome, {username}</h2>
      </header>

      <nav className="user-sidebar">
        <Link to="/study-group" className="user-sidebar-link">
          <span className="link-icon">📚</span> Study Group
        </Link>
        <Link to="/group-chat" className="user-sidebar-link">
          <span className="link-icon">💬</span> Group Chat
        </Link>
        <Link to="/share-files" className="user-sidebar-link">
          <span className="link-icon">📂</span> Share Files
        </Link>
        <Link to="/view-files" className="user-sidebar-link viewfiles-link">
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
        <div className="viewfiles-container">
          <h1>View Files</h1>
          <p className="subtitle">Access your shared documents and resources</p>
          <div className="file-list">
            {files.map((file) => (
              <div key={file.id} className="file-item">
                <div className="file-info">
                  <span className="file-icon">📄</span>
                  <div className="file-name">{file.name}</div>
                </div>
                <div className="file-actions">
                  <button onClick={() => handleView(file.name)} className="file-button">View</button>
                  <button onClick={() => handleDownload(file.name)} className="file-button">Download</button>
                </div>
              </div>
            ))}
          </div>
          <Link to="/user-dashboard" className="back-link">
            Return to Dashboard
          </Link>
        </div>
      </main>

      {isReportIssuesModalOpen && (
        <ReportIssues
          onClose={() => setIsReportIssuesModalOpen(false)}
          onSubmit={(data) => console.log("Report Submitted:", data)}
        />
      )}
    </div>
  );
}

export default ViewFiles;
