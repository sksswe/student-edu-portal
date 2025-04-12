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
  
      fetch("http://127.0.0.1:8000/api/study/my-files/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched Data:", data);
          if (Array.isArray(data) && data.length > 0) {
            setFiles(data);
          } else {
            console.log("No files found in the response");
            setFiles([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching files:", error);
        });
    }
  }, []);
  

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

  const handleView = (fileUrl) => {
    console.log("Opening file:", fileUrl); // Debugging the file URL
    window.open(fileUrl, "_blank");
  };

  const handleDownload = (fileUrl, fileName) => {
    console.log("Downloading file:", fileUrl, fileName); // Debugging the file URL and name
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
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
            {files.length === 0 ? (
              <p>No files found.</p>
            ) : (
              files.map((file) => (
                <div key={file.id} className="file-item">
                  <div className="file-info">
                    <span className="file-icon">📄</span>
                    <div className="file-name">
                      {file.file_name} <br />
                      <small>From Group {file.group_name} by {file.sender_name}</small><br />
                      <small>{formatDate(file.timestamp)}</small>
                    </div>
                  </div>
                  <div className="file-actions">
                    <button
                      onClick={() => handleView(file.file_url)} // Access file_url from the JSON
                      className="file-button"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDownload(file.file_url, file.file_name)} // Access file_url and file_name
                      className="file-button"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))
            )}
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
