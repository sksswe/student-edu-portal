import React, { useState } from 'react';
import axios from 'axios';
import './MessageGroupModal.css'; // optional CSS styling

const CreateGroupModal = ({ onClose }) => {
  const [groupName, setGroupName] = useState('');

  const handleCreateGroup = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://127.0.0.1:8000/api/message/create-group/',
        { group_name: groupName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      onClose(); // close modal on success
      window.location.reload(); // reload to show updated group list
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <div className="modalBackdrop">
      <div className="modalContent">
        <h2>Create New Group</h2>
        <input
          type="text"
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <div className="modalActions">
          <button onClick={handleCreateGroup}>Create</button>
          <button className="cancelBtn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;
