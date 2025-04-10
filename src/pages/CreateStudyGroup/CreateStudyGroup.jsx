import React, { useState } from 'react';
import './CreateStudyGroup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateStudyGroup() {
  const [showPopup, setShowPopup] = useState(true);
  const [groupName, setGroupName] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(""); // State for storing the token
  //const navigate = useNavigate();


  useEffect(() => {
    // Fetch the token from localStorage when the component mounts
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    console.log("Token from localStorage:", storedToken); // Debugging token
  }, [token]);

  const handleSubmit = async () => {
    if (!groupName.trim()) {
      alert('Group name is required');
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/study/create-groupstudy/", {
        name: groupName,
        password: password || null,
      });
      alert('Group created successfully!');
      setShowPopup(false);
      navigate('/study-group');
    } catch (error) {
      console.error('Error creating group:', error);
      alert('Failed to create group. Please try again.');
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
    navigate('/study-group');
  };

  return (
    <div className="create-group-container">
      {showPopup && (
        <div className="popup">
          <h2>Create Study Group</h2>
          <label htmlFor="groupName">Group Name<span>*</span></label>
          <input
            type="text"
            id="groupName"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <label htmlFor="password">Password <small>(optional)</small></label>
          <input
            type="password"
            id="password"
            placeholder="Enter password (if any)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="create-buttons">
            <button className="create" onClick={handleSubmit}>Create</button>
            <button className="cancel" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateStudyGroup;
