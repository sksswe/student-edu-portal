import React from 'react';
import { Link } from 'react-router-dom';
import './CheckReports.css';

function CheckReports() {
  return (
    <div className="check-reports-container">
      <h1>Check Reports</h1>
      <p>View and manage reports submitted by users.</p>
      <div className="reports-list">
        {/* Example reports */}
        <div className="report-item">
          <span className="report-title">Report #1</span>
          <span className="report-date">2023-10-01</span>
          <button className="view-button">View Details</button>
        </div>
        <div className="report-item">
          <span className="report-title">Report #2</span>
          <span className="report-date">2023-10-02</span>
          <button className="view-button">View Details</button>
        </div>
      </div>
      <Link to="/admin-dashboard" className="back-link">
        Back to Admin Dashboard
      </Link>
    </div>
  );
}

export default CheckReports;