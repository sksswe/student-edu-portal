import React, { useState } from "react";
import "./ReportIssues.css";

function ReportIssues({ onClose, onSubmit }) {
  const [reportId, setReportId] = useState("");
  const [issue, setIssue] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate form submission (replace with actual API call)
    try {
      // Example: Send data to an API
      // const response = await fetch("/api/report-issues", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ reportId, issue, problemDescription }),
      // });

      // if (response.ok) {
      //   setSubmissionMessage("Submitted Successfully!");
      // } else {
      //   throw new Error("Submission failed");
      // }

      // Simulate a successful submission
      setSubmissionMessage("Submitted Successfully!");
      setTimeout(() => {
        onClose(); // Close the modal after 2 seconds
      }, 2000);
    } catch (error) {
      setSubmissionMessage("Task Failed! Please Try Again!");
    }
  };

  return (
    <div className="report-issues-modal-overlay">
      <div className="report-issues-modal-content">
        <h3>Report Issues</h3>
        {submissionMessage ? (
          <div className="submission-message">{submissionMessage}</div>
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
              <label htmlFor="issue">Issue</label>
              <input
                type="text"
                id="issue"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="problemDescription">Problem Description</label>
              <textarea
                id="problemDescription"
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="submit-button">
                Submit
              </button>
              <button type="button" onClick={onClose} className="close-button">
                Close
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ReportIssues;