


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "./Notifications.css";
// import { Bell, FileText, MessageCircle, UserPlus } from "lucide-react";

// function Notifications() {
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     // Replace this with how you're actually storing the user's name
//     const storedUser = localStorage.getItem("username");
//     if (storedUser) {
//       setUsername(storedUser);
//     }
//   }, []);

//   const notifications = [
//     {
//       id: 1,
//       type: "file",
//       message: "User1 uploaded a new file: Lecture Notes.pdf",
//       date: "2023-10-01",
//     },
//     {
//       id: 2,
//       type: "join",
//       message: "User2 joined the study group.",
//       date: "2023-10-02",
//     },
//     {
//       id: 3,
//       type: "message",
//       message: "User3 sent a new message in the group chat.",
//       date: "2023-10-03",
//     },
//     {
//       id: 4,
//       type: "general",
//       message: "Reminder: Assignment due this Friday!",
//       date: "2023-10-04",
//     },
//   ];

//   const getIcon = (type) => {
//     switch (type) {
//       case "file":
//         return <FileText className="notification-icon" />;
//       case "join":
//         return <UserPlus className="notification-icon" />;
//       case "message":
//         return <MessageCircle className="notification-icon" />;
//       default:
//         return <Bell className="notification-icon" />;
//     }
//   };

//   return (
//     <div className="notifications-container">
//       <h2 className="welcome-heading">Welcome, {username || "User"}!</h2>
//       <h1>Notifications</h1>
//       <p className="subtitle">Stay updated with the latest activities.</p>

//       <div className="notification-list">
//         {notifications.map((notification) => (
//           <div key={notification.id} className="notification-item">
//             <div className="notification-left">
//               {getIcon(notification.type)}
//               <span className="notification-message">{notification.message}</span>
//             </div>
//             <span className="notification-date">{notification.date}</span>
//           </div>
//         ))}
//       </div>

//       <Link to="/user-dashboard" className="back-link">
//         Back to Dashboard
//       </Link>
//     </div>
//   );
// }

// export default Notifications;

































// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Notifications.css";
// import ReportIssues from "../ReportIssues/ReportIssues";

// function Notifications() {
//   const [notifications, setNotifications] = useState([]);
//   const [username, setUsername] = useState("");
//   const [isReportIssuesModalOpen, setIsReportIssuesModalOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedUsername = localStorage.getItem("username");

//     if (!token) {
//       navigate("/signup");
//     } else {
//       setUsername(storedUsername || "User");
//       // Sample notification data
//       setNotifications([
//         { id: 1, message: "Group Chat updated", date: "2025-04-11" },
//         { id: 2, message: "New file shared", date: "2025-04-10" },
//         { id: 3, message: "Issue report replied", date: "2025-04-09" },
//         { id: 1, message: "Group Chat updated", date: "2025-04-11" },
//         { id: 1, message: "Group Chat updated", date: "2025-04-11" },
//         { id: 1, message: "Group Chat updated", date: "2025-04-11" },
//         { id: 1, message: "Group Chat updated", date: "2025-04-11" },
//         { id: 1, message: "Group Chat updated", date: "2025-04-11" },
//         { id: 1, message: "Group Chat updated", date: "2025-04-11" },
//         { id: 1, message: "Group Chat updated", date: "2025-04-11" },
//         { id: 1, message: "Group Chat updated", date: "2025-04-11" },
//         { id: 1, message: "Group Chat updated", date: "2025-04-11" },
//         { id: 1, message: "Group Chat updated", date: "2025-04-11" },
//         { id: 1, message: "Group Chat updated", date: "2025-04-11" },
//         { id: 1, message: "Group Chat updated", date: "2025-04-11" },
//         { id: 1, message: "Group Chat updated", date: "2025-04-11" },
//         { id: 1, message: "Group Chat updated", date: "2025-04-11" },
//         { id: 1, message: "Group Chat updated", date: "2025-04-11" },
//         { id: 1, message: "Group Chat updated", date: "2025-04-11" },
//         { id: 1, message: "Group Chat updated", date: "2025-04-11" },
//         { id: 1, message: "Group Chat updated", date: "2025-04-11" },
//         { id: 1, message: "Group Chat updated", date: "2025-04-11" },
//         { id: 1, message: "Group Chat updated", date: "2025-04-11" },
//         { id: 1, message: "Group Chat updated", date: "2025-04-11" },
//       ]);
//     }
//   }, [navigate]);

//   const handleSignOut = () => {
//     if (window.confirm("Are you sure you want to sign out?")) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("username");
//       navigate("/signin");
//     }
//   };

//   const handleReportIssuesClick = (e) => {
//     e.preventDefault();
//     setIsReportIssuesModalOpen(true);
//   };

//   const handleSubmitReport = (reportData) => {
//     console.log("Report Data:", reportData);
//     setIsReportIssuesModalOpen(false);
//   };

//   return (
//     <div className="user-dashboard">
//       <header className="header">
//         <h2>Welcome, {username}</h2>
//       </header>

//       <nav className="user-sidebar">
//         <Link to="/study-group" className="user-sidebar-link">
//           <span className="link-icon">📚</span> Study Group
//         </Link>
//         <Link to="/group-chat" className="user-sidebar-link">
//           <span className="link-icon">💬</span> Group Chat
//         </Link>
//         <Link to="/share-files" className="user-sidebar-link">
//           <span className="link-icon">📂</span> Share Files
//         </Link>
//         <Link to="/view-files" className="user-sidebar-link">
//           <span className="link-icon">👀</span> View Files
//         </Link>
//         <Link to="/notifications" className="user-sidebar-link notification-link">
//           <span className="link-icon">🔔</span> Notifications
//         </Link>
//         <Link
//           to="/report-issues"
//           className="user-sidebar-link"
//           onClick={handleReportIssuesClick}
//         >
//           <span className="link-icon">⚠️</span> Report Issues
//         </Link>
//         <button onClick={handleSignOut} className="signout-button">
//           Sign Out
//         </button>
//       </nav>

//       <main className="user-main-content">
//         <div className="notifications-container">
//           <h1>Notifications</h1>
//           <p className="subtitle">Stay up-to-date with important updates</p>
//           <div className="notification-list">
//             {notifications.map((note) => (
//               <div key={note.id} className="notification-item">
//                 <div className="notification-left">
//                   <span className="notification-icon">🔔</span>
//                   <div className="notification-message">{note.message}</div>
//                 </div>
//                 <div className="notification-date">{note.date}</div>
//               </div>
//             ))}
//           </div>
//           <Link to="/user-dashboard" className="back-link">
//             Back to Dashboard
//           </Link>
//         </div>
//       </main>

//       {isReportIssuesModalOpen && (
//         <ReportIssues
//           onClose={() => setIsReportIssuesModalOpen(false)}
//           onSubmit={handleSubmitReport}
//         />
//       )}
//     </div>
//   );
// }

// export default Notifications;





















import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Notifications.css";
import ReportIssues from "../ReportIssues/ReportIssues";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [username, setUsername] = useState("");
  const [isReportIssuesModalOpen, setIsReportIssuesModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (!token) {
      navigate("/signup");
    } else {
      setUsername(storedUsername || "User");
      setNotifications([
        { id: 1, message: "Group Chat updated", date: "2025-04-11" },
        { id: 2, message: "New file shared", date: "2025-04-10" },
        { id: 3, message: "Issue report replied", date: "2025-04-09" },
        // Additional sample entries
        ...Array(20).fill({ id: 4, message: "Group Chat updated", date: "2025-04-11" })
      ]);
    }
  }, [navigate]);

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/signin");
    }
  };

  const handleReportIssuesClick = (e) => {
    e.preventDefault();
    setIsReportIssuesModalOpen(true);
  };

  const handleSubmitReport = (reportData) => {
    console.log("Report Data:", reportData);
    setIsReportIssuesModalOpen(false);
  };

  return (
    <div className="user-dashboard">
      <header className="header">
        <h2>Welcome, {username}</h2>
      </header>

      <nav className="user-sidebar">
        <Link to="/study-group" className="user-sidebar-link">
          <span className="link-icon">📚</span> Study Group
        </Link>
        <Link to="/group-chat" className="user-sidebar-link">
          <span className="link-icon">💬</span> Group Chat
        </Link>
        <Link to="/view-files" className="user-sidebar-link">
          <span className="link-icon">👀</span> View Files
        </Link>
        <Link to="/notifications" className="user-sidebar-link notification-link">
          <span className="link-icon">🔔</span> Notifications
        </Link>
        <Link
          to="/report-issues"
          className="user-sidebar-link"
          onClick={handleReportIssuesClick}
        >
          <span className="link-icon">⚠️</span> Report Issues
        </Link>
        <button onClick={handleSignOut} className="signout-button">
          Sign Out
        </button>
      </nav>

      <main className="user-main-content">
  <div className="notifications-container">
    <h1>Notifications</h1>
    <p className="subtitle">Stay up-to-date with important updates</p>

    {/* Scrollable notification list */}
    <div className="notification-list scrollable-list">
      {notifications.map((note, index) => (
        <div key={index} className="notification-item">
          <div className="notification-left">
            <span className="notification-icon">🔔</span>
            <div className="notification-message">{note.message}</div>
          </div>
          <div className="notification-date">{note.date}</div>
        </div>
      ))}
    </div>

    {/* Moved Return Button to Bottom */}
    <div className="bottom-return">
      <Link to="/user-dashboard" className="back-link">
        ← Return to Dashboard
      </Link>
    </div>
  </div>
</main>


      {isReportIssuesModalOpen && (
        <ReportIssues
          onClose={() => setIsReportIssuesModalOpen(false)}
          onSubmit={handleSubmitReport}
        />
      )}
    </div>
  );
}

export default Notifications;

