// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import StudyGroupModal from "../Modal/StudyGroupModal";
// import ReportIssues from "../ReportIssues/ReportIssues";
// import CreateStudyGroup from "../CreateStudyGroup/CreateStudyGroup";
// import JoinStudyGroup from "../JoinStudyGroup/JoinStudyGroup";
// import "./UserDashboard.css";

// function UserDashboard() {
//   const navigate = useNavigate();
//   const [isStudyGroupModalOpen, setIsStudyGroupModalOpen] = useState(false);
//   const [isReportIssuesModalOpen, setIsReportIssuesModalOpen] = useState(false);
//   const [isCreateStudyGroupModalOpen, setIsCreateStudyGroupModalOpen] = useState(false);
//   const [isJoinStudyGroupModalOpen, setIsJoinStudyGroupModalOpen] = useState(false);

//   const [username, setUsername] = useState(""); // For storing the username

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedUsername = localStorage.getItem("username");

//     if (!token) {
//       navigate("/signin");
//     } else {
//       setUsername(storedUsername || "User");
//     }
//   }, [navigate]);

//   const handleSignOut = () => {
//     if (window.confirm("Are you sure you want to sign out?")) {
//       localStorage.removeItem("token");
//       navigate("/signin");
//     }
//   };

//   const handleStudyGroupClick = (e) => {
//     e.preventDefault();
//     setIsStudyGroupModalOpen(true);
//   };

//   const handleReportIssuesClick = (e) => {
//     e.preventDefault();
//     setIsReportIssuesModalOpen(true);
//   };

//   const handleCreateGroup = () => {
//     setIsStudyGroupModalOpen(false);
//     setIsCreateStudyGroupModalOpen(true);
//   };

//   const handleJoinGroup = () => {
//     setIsStudyGroupModalOpen(false);
//     setIsJoinStudyGroupModalOpen(true);
//   };

//   const handleSubmitReport = (reportData) => {
//     console.log("Report Data:", reportData);
//     setIsReportIssuesModalOpen(false);
//   };

//   const handleCreateStudyGroupSubmit = (groupData) => {
//     console.log("Study Group Created:", groupData);
//     setIsCreateStudyGroupModalOpen(false);
//   };

//   const handleJoinStudyGroupSuccess = (groupData) => {
//     console.log("Successfully joined:", groupData);
//     setIsJoinStudyGroupModalOpen(false);
//   };

//   return (
//     <div className="user-dashboard">
//       <header className="header">
//         <h2>Welcome, {username ? username : "User"}</h2> {/* Display username */}
//       </header>

//       <nav className="sidebar">
//         <Link
//           to="/study-group"
//           className="sidebar-link"
//           onClick={handleStudyGroupClick}
//         >
//           <span className="link-icon">📚</span> Study Group
//         </Link>
//         <Link to="/group-chat" className="sidebar-link">
//           <span className="link-icon">💬</span> Group Chat
//         </Link>
//         <Link to="/share-files" className="sidebar-link">
//           <span className="link-icon">📂</span> Share Files
//         </Link>
//         <Link to="/view-files" className="sidebar-link">
//           <span className="link-icon">👀</span> View Files
//         </Link>
//         <Link to="/notifications" className="sidebar-link">
//           <span className="link-icon">🔔</span> Notifications
//         </Link>
//         <Link
//           to="/report-issues"
//           className="sidebar-link"
//           onClick={handleReportIssuesClick}
//         >
//           <span className="link-icon">⚠️</span> Report Issues
//         </Link>

//         <button onClick={handleSignOut} className="signout-button">
//           Sign Out
//         </button>
//       </nav>

//       <main className="user-main-content">
//         <h1>User Dashboard</h1>
//         <p>Select an option from the menu to get started.</p>
//       </main>

//       {/* Study Group Modal */}
//       {isStudyGroupModalOpen && (
//         <StudyGroupModal
//           onClose={() => setIsStudyGroupModalOpen(false)}
//           onCreateGroup={handleCreateGroup}
//           onJoinGroup={handleJoinGroup}
//         />
//       )}

//       {/* Create Study Group Modal */}
//       {isCreateStudyGroupModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <CreateStudyGroup
//               onSubmit={handleCreateStudyGroupSubmit}
//               onClose={() => setIsCreateStudyGroupModalOpen(false)}
//             />
//           </div>
//         </div>
//       )}

//       {/* Join Study Group Modal */}
//       {isJoinStudyGroupModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <JoinStudyGroup
//               onClose={() => setIsJoinStudyGroupModalOpen(false)}
//               onJoin={handleJoinStudyGroupSuccess}
//             />
//           </div>
//         </div>
//       )}

//       {/* Report Issues Modal */}
//       {isReportIssuesModalOpen && (
//         <ReportIssues
//           onClose={() => setIsReportIssuesModalOpen(false)}
//           onSubmit={handleSubmitReport}
//         />
//       )}
//     </div>
//   );
// }

// export default UserDashboard;

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import StudyGroupModal from "../Modal/StudyGroupModal";
import ReportIssues from "../ReportIssues/ReportIssues";
import CreateStudyGroup from "../CreateStudyGroup/CreateStudyGroup";
import JoinStudyGroup from "../JoinStudyGroup/JoinStudyGroup";
import "./UserDashboard.css";

function UserDashboard() {
  const navigate = useNavigate();
  const [isStudyGroupModalOpen, setIsStudyGroupModalOpen] = useState(false);
  const [isReportIssuesModalOpen, setIsReportIssuesModalOpen] = useState(false);
  const [isCreateStudyGroupModalOpen, setIsCreateStudyGroupModalOpen] = useState(false);
  const [isJoinStudyGroupModalOpen, setIsJoinStudyGroupModalOpen] = useState(false);

  const [username, setUsername] = useState(""); // For storing the username

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (!token) {
      navigate("/signin");
    } else {
      setUsername(storedUsername || "User");
    }
  }, [navigate]);

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("username"); // Remove username on sign out
      navigate("/signin");
    }
  };

  const handleStudyGroupClick = (e) => {
    e.preventDefault();
    setIsStudyGroupModalOpen(true);
  };

  const handleReportIssuesClick = (e) => {
    e.preventDefault();
    setIsReportIssuesModalOpen(true);
  };

  const handleCreateGroup = () => {
    setIsStudyGroupModalOpen(false);
    setIsCreateStudyGroupModalOpen(true);
  };

  const handleJoinGroup = () => {
    setIsStudyGroupModalOpen(false);
    setIsJoinStudyGroupModalOpen(true);
  };

  const handleSubmitReport = (reportData) => {
    console.log("Report Data:", reportData);
    setIsReportIssuesModalOpen(false);
  };

  const handleCreateStudyGroupSubmit = (groupData) => {
    console.log("Study Group Created:", groupData);
    setIsCreateStudyGroupModalOpen(false);
  };

  const handleJoinStudyGroupSuccess = (groupData) => {
    console.log("Successfully joined:", groupData);
    setIsJoinStudyGroupModalOpen(false);
  };

  return (
    <div className="user-dashboard">
      <header className="header">
        <h2>Welcome, {username ? username : "User"}</h2>
      </header>

      <nav className="sidebar">
        <Link
          to="/study-group"
          className="sidebar-link"
          onClick={handleStudyGroupClick}
        >
          <span className="link-icon">📚</span> Study Group
        </Link>
        <Link to="/group-chat" className="sidebar-link">
          <span className="link-icon">💬</span> Group Chat
        </Link>
        <Link to="/share-files" className="sidebar-link">
          <span className="link-icon">📂</span> Share Files
        </Link>
        <Link to="/view-files" className="sidebar-link">
          <span className="link-icon">👀</span> View Files
        </Link>
        <Link to="/notifications" className="sidebar-link">
          <span className="link-icon">🔔</span> Notifications
        </Link>
        <Link
          to="/report-issues"
          className="sidebar-link"
          onClick={handleReportIssuesClick}
        >
          <span className="link-icon">⚠️</span> Report Issues
        </Link>

        <button onClick={handleSignOut} className="signout-button">
          Sign Out
        </button>
      </nav>

      <main className="user-main-content">
        <h1>User Dashboard</h1>
        <p>Select an option from the menu to get started.</p>
      </main>

      {/* Study Group Modal */}
      {isStudyGroupModalOpen && (
        <StudyGroupModal
          onClose={() => setIsStudyGroupModalOpen(false)}
          onCreateGroup={handleCreateGroup}
          onJoinGroup={handleJoinGroup}
        />
      )}

      {/* Create Study Group Modal */}
      {isCreateStudyGroupModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CreateStudyGroup
              onSubmit={handleCreateStudyGroupSubmit}
              onClose={() => setIsCreateStudyGroupModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Join Study Group Modal */}
      {isJoinStudyGroupModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <JoinStudyGroup
              onClose={() => setIsJoinStudyGroupModalOpen(false)}
              onJoin={handleJoinStudyGroupSuccess}
            />
          </div>
        </div>
      )}

      {/* Report Issues Modal */}
      {isReportIssuesModalOpen && (
        <ReportIssues
          onClose={() => setIsReportIssuesModalOpen(false)}
          onSubmit={handleSubmitReport}
        />
      )}
    </div>
  );
}

export default UserDashboard;
