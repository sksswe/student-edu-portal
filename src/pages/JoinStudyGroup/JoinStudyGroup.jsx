import React, { useState, useEffect } from 'react';
import './JoinStudyGroup.css';

function JoinStudyGroup({ onClose, onJoin }) {
  const [studyGroups, setStudyGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStudyGroups = async () => {
      try {
        const response = await fetch('https://your-backend-api.com/study-groups');
        if (!response.ok) throw new Error('Failed to fetch study groups');
        const data = await response.json();
        setStudyGroups(data);
      } catch (error) {
        console.error('Error fetching study groups:', error);
        setError('Failed to load study groups. Please try again.');
      }
    };

    fetchStudyGroups();
  }, []);

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    setPassword('');
    setError('');
  };

  const handleJoin = async () => {
    if (!password) {
      setError('Please enter the group password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`https://your-backend-api.com/study-groups/${selectedGroup.id}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) throw new Error('Failed to join study group');

      const data = await response.json();
      onJoin(data);
      onClose();
    } catch (error) {
      console.error('Error joining study group:', error);
      setError('Invalid password or error joining group');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="join-study-group-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Join a Study Group</h2>
        
        {!selectedGroup ? (
          <div className="group-list">
            <h3>Available Study Groups</h3>
            {studyGroups.length === 0 ? (
              <p>No study groups available</p>
            ) : (
              <ul>
                {studyGroups.map((group) => (
                  <li key={group.id} onClick={() => handleGroupSelect(group)}>
                    {group.name}
                  </li>
                ))}
              </ul>
            )}
            <div className="cancel-button-container">
              <button className="cancel-button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="password-prompt">
            <h3>Join: {selectedGroup.name}</h3>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter group password"
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="button-group">
              <button onClick={() => setSelectedGroup(null)}>Back</button>
              <button onClick={handleJoin} disabled={isLoading}>
                {isLoading ? 'Joining...' : 'Join Group'}
              </button>
              <button className="cancel-button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JoinStudyGroup;