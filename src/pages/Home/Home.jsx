import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="fixed-top navbar navbar-light navbar-expand-lg moodle-has-zindex p-0 greedy">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Home</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/guidelines">Guidelines</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signin">Log in</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Create new account</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="home-content">
        <h1>Welcome to Student Education Portal</h1>
        <p className="lead">Join us to experience a blend of traditional and digital learning tools.</p>
        <div className="button-group">
          <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          <Link to="/signin" className="btn btn-secondary">Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;