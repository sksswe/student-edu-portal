import React from 'react';
import { Link } from 'react-router-dom';
import './StudyGroupCard.css'; // Optional: Add styles for the card

function StudyGroupCard() {
  return (
    <div className="study-group-card">
      <h2>Study Group</h2>
      <p>Create or join a study group to collaborate with others.</p>
      <div className="button-container">
        <Link to="/create-study-group" className="btn btn-primary">
          Create Study Group
        </Link>
        <Link to="/join-study-group" className="btn btn-secondary">
          Join Study Group
        </Link>
      </div>
    </div>
  );
}

export default StudyGroupCard;