import React from 'react';
import { Link } from 'react-router-dom';
import './ReportIssues.css';

function ReportIssues() {
  return (
    <div className="report-issues-container">
      <h1>Report Issues</h1>
      <p>Report any issues or problems you encounter.</p>
      <form>
        <textarea placeholder="Describe the issue..." rows="5" required />
        <button type="submit">Submit</button>
      </form>
      <Link to="/dashboard" className="back-link">
        Back to Dashboard
      </Link>
    </div>
  );
}

export default ReportIssues;