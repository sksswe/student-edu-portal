import React from 'react';
import { Link } from 'react-router-dom';
import './Guidelines.css';

function Guidelines() {
  return (
    <div className="guidelines-wrapper">
      {/* Fixed Header */}
      <header className="fixed-header">
        <div className="header-content">
          <Link to="/" className="header-logo">Home</Link>
          <nav className="nav-links">
            <Link to="/guidelines" className="nav-link active">Guidelines</Link>
            <Link to="/signin" className="nav-link">Log in</Link>
            <Link to="/signup" className="nav-link">Create new account</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="content-area">
        <div className="content-container">
          <h1 className="page-title">Student Education Portal Guidelines</h1>
          
          <section className="guideline-section">
            <h2 className="section-title">1. Getting Started</h2>
            <div className="guideline-card">
              <h3 className="card-title">Account Creation</h3>
              <ul className="feature-list">
                <li>Click "Create new account" in the navigation bar</li>
                <li>Fill in your details (name, email, password)</li>
                <li>Verify your email address</li>
                <li>Log in with your credentials</li>
              </ul>
            </div>
          </section>

          <section className="guideline-section">
            <h2 className="section-title">2. Group Chat Features</h2>
            <div className="guideline-card">
              <p className="card-text">Each study group has a dedicated chat:</p>
              <ul className="feature-list">
                <li>Send text messages to communicate</li>
                <li>Share files using the attachment icon</li>
                <li>Download shared files by clicking them</li>
              </ul>
            </div>
          </section>

          <section className="guideline-section">
            <h2 className="section-title">3. Administration</h2>
            <div className="guideline-card">
              <h3 className="card-title">User Management (Admin Only)</h3>
              <ul className="feature-list">
                <li>View all registered users</li>
                <li>Search users by name, email, or ID</li>
                <li>Remove users if necessary</li>
              </ul>
            </div>
          </section>

          <div className="support-section">
            <h3 className="support-title">Need Help?</h3>
            <p className="support-text">Contact support at <a href="mailto:support@educationportal.com" className="support-link">support@educationportal.com</a></p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Guidelines;