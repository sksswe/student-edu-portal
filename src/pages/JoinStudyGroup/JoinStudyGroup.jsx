// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './JoinStudyGroup.css';  // Create corresponding CSS for styling

// function JoinStudyGroup() {
//   const [groupName, setGroupName] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   // Mock API call to check if group exists and password is correct
//   const handleJoinGroup = (e) => {
//     e.preventDefault();

//     // Simulated validation
//     if (groupName === '' || password === '') {
//       setError('Please fill in both fields');
//       return;
//     }

//     // Simulated check for correct group name and password
//     if (groupName === 'Advanced Mathematics' && password === 'calculus123') {
//       setError('');
//       alert('Successfully joined the group!');
//       navigate('/group-chat/1');  // Navigate to the group chat page after joining
//     } else {
//       setError('Incorrect group name or password');
//     }
//   };

//   return (
//     <div className="join-study-group-container">
//       <div className="join-study-group-form">
//         <h2>Join Study Group</h2>
//         <form onSubmit={handleJoinGroup}>
//           <div className="form-group">
//             <label htmlFor="group-name">Group Name</label>
//             <input
//               type="text"
//               id="group-name"
//               value={groupName}
//               onChange={(e) => setGroupName(e.target.value)}
//               placeholder="Enter group name"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password (if any)</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter password"
//             />
//           </div>
//           {error && <p className="error-message">{error}</p>}
//           <button type="submit" className="join-btn">Join Group</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default JoinStudyGroup;



//--------------------------------------------------------------------



// import React, { useState } from 'react';
// import './JoinStudyGroup.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function JoinStudyGroup({ onClose }) {
//   const [groupName, setGroupName] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleJoin = async () => {
//     if (!groupName.trim()) {
//       alert('Group name is required');
//       return;
//     }

//     try {
//       // Replace with your API call to join a group
//       await axios.post("http://127.0.0.1:8000/api/study/join-groupstudy/", {
//         name: groupName,
//         password: password || null,
//       });
//       alert('Joined the group successfully!');
//       onClose();  // Close the modal after joining
//       navigate('/study-group');
//     } catch (error) {
//       console.error('Error joining group:', error);
//       alert('Failed to join the group. Please try again.');
//     }
//   };

//   const handleCancel = () => {
//     onClose(); // Close the modal without joining
//   };

//   return (
//     <div className="join-group-container">
//       <div className="popup">
//         <h2>Join Study Group</h2>
//         <label htmlFor="groupName">Group Name<span>*</span></label>
//         <input
//           type="text"
//           id="groupName"
//           placeholder="Enter group name"
//           value={groupName}
//           onChange={(e) => setGroupName(e.target.value)}
//         />
//         <label htmlFor="password">Password <small>(optional)</small></label>
//         <input
//           type="password"
//           id="password"
//           placeholder="Enter password (if any)"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <div className="join-buttons">
//           <button className="join" onClick={handleJoin}>Join</button>
//           <button className="cancel" onClick={handleCancel}>Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default JoinStudyGroup;  



//-------------------------------------------------------------------------------



// import React, { useState } from 'react';
// import './JoinStudyGroup.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function JoinStudyGroup() {
//   const [groupName, setGroupName] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleJoin = async () => {
//     if (!groupName.trim()) {
//       alert('Group name is required');
//       return;
//     }

//     try {
//       // Replace with your API call to join a group
//       await axios.post("http://127.0.0.1:8000/api/study/join-groupstudy/", {
//         name: groupName,
//         password: password || null,
//       });
//       alert('Joined the group successfully!');
//       navigate('/study-group');  // Redirect to Study Groups page after joining
//     } catch (error) {
//       console.error('Error joining group:', error);
//       alert('Failed to join the group. Please try again.');
//     }
//   };

//   return (
//     <div className="join-group-container">
//       <div className="popup">
//         <h2>Join Study Group</h2>
//         <label htmlFor="groupName">Group Name<span>*</span></label>
//         <input
//           type="text"
//           id="groupName"
//           placeholder="Enter group name"
//           value={groupName}
//           onChange={(e) => setGroupName(e.target.value)}
//         />
//         <label htmlFor="password">Password <small>(optional)</small></label>
//         <input
//           type="password"
//           id="password"
//           placeholder="Enter password (if any)"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <div className="join-buttons">
//           <button className="join" onClick={handleJoin}>Join</button>
//           <button className="cancel" onClick={() => navigate('/study-group')}>Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default JoinStudyGroup;



//--------------------------------------------------------------------

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




