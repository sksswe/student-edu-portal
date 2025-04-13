import React, { useState } from 'react';
import './JoinStudyGroup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function JoinStudyGroup() {
  const [inviteCode, setInviteCode] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleJoin = async () => {
    if (!inviteCode.trim()) {
      alert('Invite code is required');
      return;
    }

    const token = localStorage.getItem('token'); // Get Bearer token from localStorage
    if (!token) {
      alert('You must be logged in to join a study group.');
      return;
    }

    try {
      // Make the API call to join the group with the invite code and optional password
      const response = await axios.post("http://127.0.0.1:8000/api/study/join-groupstudy/", {
        invite_code: inviteCode,
        password: password || null,  // Send null if no password
      }, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include Bearer token in the headers
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        alert('Joined the group successfully!');
        navigate('/study-group');  // Redirect to Study Groups page after joining
      }
    } catch (error) {
      console.error('Error joining group:', error);
      alert('Failed to join the group. Please try again.');
    }
  };

  return (
    <div className="join-group-container">
      <div className="popup">
        <h2>Join Study Group</h2>
        <label htmlFor="inviteCode">Invite Code<span>*</span></label>
        <input
          type="text"
          id="inviteCode"
          placeholder="Enter invite code"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
        />
        <label htmlFor="password">Password <small>(optional)</small></label>
        <input
          type="password"
          id="password"
          placeholder="Enter password (if any)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="join-buttons">
          <button className="join" onClick={handleJoin}>Join</button>
          <button className="cancel" onClick={() => navigate('/study-group')}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default JoinStudyGroup;




