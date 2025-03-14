import React from 'react';
import './StudyGroupModal.css'; // Import CSS from the same folder

function StudyGroupModal({ onClose, onCreateGroup, onJoinGroup }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Study Group Options</h3>
        <button onClick={onCreateGroup} className="modal-button">
          Create a New Study Group
        </button>
        <button onClick={onJoinGroup} className="modal-button">
          Join an Existing Study Group
        </button>
        <button onClick={onClose} className="modal-button close-button">
          Close
        </button>
      </div>
    </div>
  );
}

export default StudyGroupModal;