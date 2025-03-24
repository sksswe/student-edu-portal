import React, { useState } from "react";
import "./ReportIssues.css";

function ReportIssues({ onClose, onSubmit }) {
  const [reportId, setReportId] = useState("");
  const [issue, setIssue] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSubmissionMessage("");

    try {
      // Get the user's authentication token from localStorage
      const token = localStorage.getItem('token');
      
      const response = await fetch("https://your-backend-api.com/api/report-issues", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Include auth token
        },
        body: JSON.stringify({ 
          reportId, 
          issue, 
          problemDescription,
          userId: localStorage.getItem('id'), // Include user ID
          role: localStorage.getItem('role') // Include user role
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit report");
      }

      setSubmissionMessage("Submitted Successfully!");
      if (typeof onSubmit === 'function') {
        onSubmit(data); // Pass the response data to parent component
      }
      
      // Clear form fields after successful submission
      setReportId("");
      setIssue("");
      setProblemDescription("");

      // Close the modal after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Report submission error:", error);
      setError(error.message || "Task Failed! Please Try Again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="report-issues-modal-overlay">
      <div className="report-issues-modal-content">
        <button className="modal-close-button" onClick={onClose}>×</button>
        <h3>Report Issues</h3>
        
        {error && <div className="error-message">{error}</div>}
        {submissionMessage ? (
          <div className="submission-message success">{submissionMessage}</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="reportId">Report ID</label>
              <input
                type="text"
                id="reportId"
                value={reportId}
                onChange={(e) => setReportId(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="issue">Issue Type</label>
              <select
                id="issue"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                required
              >
                <option value="">Select an issue</option>
                <option value="Technical">Technical</option>
                <option value="Content">Content</option>
                <option value="Access">Access</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="problemDescription">Problem Description</label>
              <textarea
                id="problemDescription"
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                required
                rows="5"
              />
            </div>
            <div className="form-buttons">
              <button 
                type="submit" 
                className="submit-button"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
              <button 
                type="button" 
                onClick={onClose} 
                className="close-button"
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ReportIssues;