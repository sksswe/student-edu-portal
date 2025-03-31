import React, { useState, useEffect } from 'react';
import './ViewReports.css';
import axios from 'axios';

function ViewReports({ onClose }) {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('https://your-backend-api.com/api/reports', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setReports(response.data);
      } catch (err) {
        setError('Failed to fetch reports');
        console.error('Error fetching reports:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleStatusUpdate = async (reportId, newStatus) => {
    try {
      await axios.patch(
        `https://your-backend-api.com/api/reports/${reportId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      setReports(reports.map(report => 
        report.id === reportId ? { ...report, status: newStatus } : report
      ));
      
      if (selectedReport?.id === reportId) {
        setSelectedReport({ ...selectedReport, status: newStatus });
      }
    } catch (err) {
      setError('Failed to update report status');
      console.error('Error updating report:', err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="view-reports-popup-overlay">
      <div className="view-reports-popup-container">
        <div className="reports-header">
          <h2>View Reports</h2>
          <button className="windows-close-button" onClick={onClose}>
            <span className="close-icon">✕</span>
          </button>
        </div>

        {isLoading ? (
          <div className="loading-message">Loading reports...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="reports-content">
            <div className="reports-list">
              <div className="list-header">
                <span>Report ID</span>
                <span>Issue Type</span>
                <span>Status</span>
                <span>Date</span>
              </div>
              {reports.map(report => (
                <div 
                  key={report.id}
                  className={`report-item ${selectedReport?.id === report.id ? 'selected' : ''}`}
                  onClick={() => setSelectedReport(report)}
                >
                  <span className="report-id">#{report.id}</span>
                  <span className="issue-type">{report.issueType}</span>
                  <span className={`status ${report.status.toLowerCase()}`}>
                    {report.status}
                  </span>
                  <span className="date">{formatDate(report.createdAt)}</span>
                </div>
              ))}
            </div>

            {selectedReport && (
              <div className="report-details">
                <div className="detail-header">
                  <h3>Report Details</h3>
                  <div className="status-actions">
                    <button 
                      className={`status-btn ${selectedReport.status === 'Open' ? 'active' : ''}`}
                      onClick={() => handleStatusUpdate(selectedReport.id, 'Open')}
                    >
                      Open
                    </button>
                    <button 
                      className={`status-btn ${selectedReport.status === 'In Progress' ? 'active' : ''}`}
                      onClick={() => handleStatusUpdate(selectedReport.id, 'In Progress')}
                    >
                      In Progress
                    </button>
                    <button 
                      className={`status-btn ${selectedReport.status === 'Resolved' ? 'active' : ''}`}
                      onClick={() => handleStatusUpdate(selectedReport.id, 'Resolved')}
                    >
                      Resolved
                    </button>
                  </div>
                </div>

                <div className="detail-content">
                  <div className="detail-row">
                    <span className="detail-label">Report ID:</span>
                    <span className="detail-value">#{selectedReport.id}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Submitted By:</span>
                    <span className="detail-value">{selectedReport.userName || 'Unknown User'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Issue Type:</span>
                    <span className="detail-value">{selectedReport.issueType}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Status:</span>
                    <span className={`detail-value status ${selectedReport.status.toLowerCase()}`}>
                      {selectedReport.status}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Date Submitted:</span>
                    <span className="detail-value">{formatDate(selectedReport.createdAt)}</span>
                  </div>
                  <div className="detail-row full-width">
                    <span className="detail-label">Description:</span>
                    <div className="detail-value description">
                      {selectedReport.description}
                    </div>
                  </div>
                  {selectedReport.fileUrl && (
                    <div className="detail-row full-width">
                      <span className="detail-label">Attachment:</span>
                      <a 
                        href={selectedReport.fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="detail-value file-link"
                      >
                        {selectedReport.fileName || 'View Attachment'}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewReports;