
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudyGroup.css';

function StudyGroup() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('User');
  const navigate = useNavigate();

  // Get username from localStorage (set during login)
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Mock data for groups
  const mockGroups = [
    {
      id: 'group1',
      name: 'Advanced Mathematics',
      description: 'For students taking Calculus and Linear Algebra',
      members: 12,
      createdAt: '2023-10-15'
    },
    {
      id: 'group2',
      name: 'Computer Science Fundamentals',
      description: 'Data Structures and Algorithms study group',
      members: 8,
      createdAt: '2023-11-02'
    }
  ];

  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setGroups(mockGroups);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="study-group-loading">
        <div className="loading-spinner"></div>
        <p>Loading your study groups...</p>
      </div>
    );
  }

  return (
    <div className="study-group-page-container">
      {/* Sidebar */}
      <div className="study-group-sidebar">
        <div className="sidebar-header">
          <h3>Welcome, {username}</h3>
        </div>
        <nav className="sidebar-nav">
          <button 
            className="sidebar-btn"
            onClick={() => navigate('/user-dashboard')}
          >
            ← Back to Dashboard
          </button>
          <button 
            className="sidebar-btn active"
            onClick={() => navigate('/study-group')}
          >
            📚 My Study Groups
          </button>
          <button 
            className="sidebar-btn"
            onClick={() => navigate('/group-chat')}
          >
            💬 Group Chats
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="study-group-main-content">
        <div className="study-group-header">
          <h1>Study Groups</h1>
          <div className="group-buttons">
            <button 
              className="small-btn create-group-btn"
              onClick={() => navigate('/create-study-group')}
            >
              Create New Group
            </button>
            <button 
              className="small-btn join-group-btn"
              onClick={() => navigate('/join-study-group')}
            >
              Join Study Group
            </button>
          </div>
        </div>

        <div className="groups-list">
          {groups.map((group) => (
            <div key={group.id} className="group-card">
              <div className="group-info">
                <h3>{group.name}</h3>
                <p>{group.description}</p>
                <div className="group-meta">
                  <span>👥 {group.members} members</span>
                  <span>🕒 Created {group.createdAt}</span>
                </div>
              </div>
              <div className="group-actions">
                <button 
                  className="view-btn"
                  onClick={() => navigate(`/group-chat/${group.id}`)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudyGroup;















//----------------------------------------------------------------------------------



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './StudyGroup.css';
// import JoinStudyGroupModal from '../JoinStudyGroup/JoinStudyGroup'; // Import the new modal

// function StudyGroup() {
//   const [groups, setGroups] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [username, setUsername] = useState('User');
//   const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
//   const navigate = useNavigate();

//   // Get username from localStorage (set during login)
//   useEffect(() => {
//     const storedUsername = localStorage.getItem('username');
//     if (storedUsername) {
//       setUsername(storedUsername);
//     }
//   }, []);

//   // Mock data for groups
//   const mockGroups = [
//     {
//       id: 'group1',
//       name: 'Advanced Mathematics',
//       description: 'For students taking Calculus and Linear Algebra',
//       members: 12,
//       createdAt: '2023-10-15'
//     },
//     {
//       id: 'group2',
//       name: 'Computer Science Fundamentals',
//       description: 'Data Structures and Algorithms study group',
//       members: 8,
//       createdAt: '2023-11-02'
//     }
//   ];

//   // Simulate API loading
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setGroups(mockGroups);
//       setLoading(false);
//     }, 800);

//     return () => clearTimeout(timer);
//   }, []);

//   const openJoinModal = () => setIsModalOpen(true); // Open the modal
//   const closeJoinModal = () => setIsModalOpen(false); // Close the modal

//   if (loading) {
//     return (
//       <div className="study-group-loading">
//         <div className="loading-spinner"></div>
//         <p>Loading your study groups...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="study-group-page-container">
//       {/* Sidebar */}
//       <div className="study-group-sidebar">
//         <div className="sidebar-header">
//           <h3>Welcome, {username}</h3>
//         </div>
//         <nav className="sidebar-nav">
//           <button 
//             className="sidebar-btn"
//             onClick={() => navigate('/user-dashboard')}
//           >
//             ← Back to Dashboard
//           </button>
//           <button 
//             className="sidebar-btn active"
//             onClick={() => navigate('/study-group')}
//           >
//             📚 My Study Groups
//           </button>
//           <button 
//             className="sidebar-btn"
//             onClick={() => navigate('/group-chat')}
//           >
//             💬 Group Chats
//           </button>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="study-group-main-content">
//         <div className="study-group-header">
//           <h1>Study Groups</h1>
//           <div className="group-buttons">
//             <button 
//               className="small-btn create-group-btn"
//               onClick={() => navigate('/create-study-group')}
//             >
//               Create New Group
//             </button>
//             <button 
//               className="small-btn join-group-btn"
//               onClick={openJoinModal} // Trigger the modal
//             >
//               Join Study Group
//             </button>
//           </div>
//         </div>

//         <div className="groups-list">
//           {groups.map((group) => (
//             <div key={group.id} className="group-card">
//               <div className="group-info">
//                 <h3>{group.name}</h3>
//                 <p>{group.description}</p>
//                 <div className="group-meta">
//                   <span>👥 {group.members} members</span>
//                   <span>🕒 Created {group.createdAt}</span>
//                 </div>
//               </div>
//               <div className="group-actions">
//                 <button 
//                   className="view-btn"
//                   onClick={() => navigate(`/group-chat/${group.id}`)}
//                 >
//                   View
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Modal Component for Joining a Group */}
//       {isModalOpen && <JoinStudyGroupModal onClose={closeJoinModal} />}
//     </div>
//   );
// }

// export default StudyGroup;
