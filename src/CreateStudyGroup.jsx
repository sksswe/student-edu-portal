import React from 'react';
import { Link } from 'react-router-dom';
import './CreateStudyGroup.css';

function CreateStudyGroup() {
  return (
    <div className="create-study-group-container">
      <h1>Create Study Group</h1>
      <p>Start a new study group and invite members.</p>
      <form>
        <input type="text" placeholder="Group Name" required />
        <input type="text" placeholder="Group Description" required />
        <button type="submit">Create Group</button>
      </form>
      <Link to="/dashboard" className="back-link">
        Back to Dashboard
      </Link>
    </div>
  );
}

export default CreateStudyGroup;