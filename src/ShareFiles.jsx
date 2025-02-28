import React from 'react';
import { Link } from 'react-router-dom';
import './ShareFiles.css';

function ShareFiles() {
  return (
    <div className="share-files-container">
      <h1>Share Files</h1>
      <p>Upload and share files with your study group.</p>
      <form>
        <input type="file" id="file-upload" className="file-input" />
        <label htmlFor="file-upload" className="file-label">
          Choose a file
        </label>
        <button type="submit">Upload</button>
      </form>
      <Link to="/dashboard" className="back-link">
        Back to Dashboard
      </Link>
    </div>
  );
}

export default ShareFiles;