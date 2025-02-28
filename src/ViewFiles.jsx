import React from 'react';
import { Link } from 'react-router-dom';
import './ViewFiles.css';

function ViewFiles() {
  // Example file list (replace with actual data from your backend)
  const files = [
    { id: 1, name: 'Lecture Notes.pdf', uploadedBy: 'User1', date: '2023-10-01' },
    { id: 2, name: 'Assignment.docx', uploadedBy: 'User2', date: '2023-10-02' },
    { id: 3, name: 'Study Guide.pptx', uploadedBy: 'User3', date: '2023-10-03' },
  ];

  return (
    <div className="view-files-container">
      <h1>View and Download Files</h1>
      <p>Access files shared by your study group members.</p>
      <div className="file-list">
        {files.map((file) => (
          <div key={file.id} className="file-item">
            <span className="file-name">{file.name}</span>
            <span className="file-details">Uploaded by {file.uploadedBy} on {file.date}</span>
            <button className="download-button">Download</button>
          </div>
        ))}
      </div>
      <Link to="/dashboard" className="back-link">
        Back to Dashboard
      </Link>
    </div>
  );
}

export default ViewFiles;