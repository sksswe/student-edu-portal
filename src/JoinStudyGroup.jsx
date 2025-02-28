import React from 'react';
import { Link } from 'react-router-dom';
import './JoinStudyGroup.css';

function JoinStudyGroup() {
  return (
    <div className="join-study-group-container">
      <h1>Join Study Group</h1>
      <p>Join an existing study group using a group code.</p>
      <form>
        <input type="text" placeholder="Group Code" required />
        <button type="submit">Join Group</button>
      </form>
      <Link to="/dashboard" className="back-link">
        Back to Dashboard
      </Link>
    </div>
  );
}

export default JoinStudyGroup;