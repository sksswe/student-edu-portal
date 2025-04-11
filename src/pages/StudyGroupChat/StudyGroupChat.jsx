
//--------------------------------------------------------------------------------------5 (also can't fetch grp name) effective from below this line.

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './StudyGroupChat.css';

const StudyGroupChat = () => {
  const { id } = useParams(); // Get group ID from URL params
  const [username, setUsername] = useState('');
  const [groupName, setGroupName] = useState(''); // State to store the group name
  const navigate = useNavigate();

  // Get the currently logged-in username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Fetch the group details (including the group name) based on the group ID
  useEffect(() => {
    const fetchGroupDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found');
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/study/group/${id}/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("API Response:", data); // Add this to check the response
          
          // Check if data has groupName
          if (data && data.groupName) {
            setGroupName(data.groupName); // Set the group name from the response
          } else {
            alert('Group name not found in the response');
          }
        } else {
          alert('Failed to fetch group details');
        }
      } catch (error) {
        alert('An error occurred while fetching group details');
        console.error('Fetch error:', error); // Log error for debugging
      }
    };

    fetchGroupDetails();
  }, [id]); // Fetch group details when the group ID changes

  return (
    <div className="study-group-chat">
      {/* Left Sidebar */}
      <div className="study-group-sidebar">
        <div className="sidebar-header">
          <h3>Welcome, {username || 'User'}</h3>
        </div>
        <nav className="sidebar-nav">
          <button 
            className="sidebar-btn"
            onClick={() => navigate('/user-dashboard')}
          >
            ← Back to Dashboard
          </button>
          <button 
            className="sidebar-btn"
            onClick={() => navigate('/study-group')}
          >
            🔙 Back To Group List
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

      {/* Main Chat Area */}
      <div className="main-chat">
        <div className="group-name-header">
          {/* Display the group name dynamically */}
          <h1>{groupName || 'Loading...'} <span className="group-icon">📚</span></h1>
        </div>
        <div className="chat-thread">
          {/* Messages will display here */}
          <p>Chat messages...</p>
        </div>
        <div className="message-input">
          <input type="text" placeholder="Write your message here..." />
          <button>🖼️</button>
          <button>📁🧷</button>
          <button>ᯓ➤</button>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="user-info">
        <h2>Total Users: 0</h2>
        <ul>
          {/* List of Usernames */}
          <li>Username1</li>
          <li>Username2</li>
        </ul>
      </div>
    </div>
  );
};

export default StudyGroupChat;

























// ----------------------------------------------------------------------------------------------------------7 (can send message but nothing else)

// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import './StudyGroupChat.css';

// const StudyGroupChat = () => {
//   const { id } = useParams(); // Get group ID from URL params
//   const [username, setUsername] = useState('');
//   const [groupName, setGroupName] = useState(''); // State to store the group name
//   const [groupUsers, setGroupUsers] = useState([]); // State to store group users
//   const [messages, setMessages] = useState([]); // State to store messages
//   const [newMessage, setNewMessage] = useState(''); // State for new message input
//   const navigate = useNavigate();

//   // Get the currently logged-in username from localStorage
//   useEffect(() => {
//     const storedUsername = localStorage.getItem('username');
//     if (storedUsername) {
//       setUsername(storedUsername);
//     }
//   }, []);

//   // Fetch the group details (including the group name and users) based on the group ID
//   useEffect(() => {
//     const fetchGroupDetails = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         alert('No token found');
//         return;
//       }

//       try {
//         const response = await fetch(`http://127.0.0.1:8000/api/study/group/${id}/`, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           console.log("API Response:", data); // Add this to check the response

//           if (data && data.groupName) {
//             setGroupName(data.groupName); // Set the group name from the response
//           } else {
//             alert('Group name not found in the response');
//           }

//           if (data && data.users) {
//             setGroupUsers(data.users);
//           }

//           if (data && data.messages) {
//             setMessages(data.messages);
//           }
//         } else {
//           alert('Failed to fetch group details');
//         }
//       } catch (error) {
//         alert('An error occurred while fetching group details');
//         console.error('Fetch error:', error); // Log error for debugging
//       }
//     };

//     fetchGroupDetails();
//   }, [id]);

//   const handleSendMessage = () => {
//     if (newMessage.trim() === '') return;

//     const messageData = {
//       username: username,
//       text: newMessage,
//     };

//     setMessages(prevMessages => [...prevMessages, messageData]);
//     setNewMessage('');
//   };

//   return (
//     <div className="study-group-chat">
//       {/* Left Sidebar */}
//       <div className="study-group-sidebar">
//         <div className="sidebar-header">
//           <h3>Welcome, {username || 'User'}</h3>
//         </div>
//         <nav className="sidebar-nav">
//           <button 
//             className="sidebar-btn"
//             onClick={() => navigate('/user-dashboard')}
//           >
//             ← Back to Dashboard
//           </button>
//           <button 
//             className="sidebar-btn"
//             onClick={() => navigate('/study-group')}
//           >
//             🔙 Back To Group List
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

//       {/* Main Chat Area */}
//       <div className="main-chat">
//         <div className="group-name-header">
//           <h1>{groupName || 'Loading...'} <span className="group-icon">📚</span></h1>
//         </div>
//         <div className="chat-thread">
//           {messages.map((msg, index) => (
//             <div 
//               key={index} 
//               className={`chat-message ${msg.username === username ? 'my-message' : 'other-message'}`}
//             >
//               <strong>{msg.username}:</strong> {msg.text}
//             </div>
//           ))}
//         </div>
//         <div className="message-input">
//           <input 
//             type="text" 
//             placeholder="Write your message here..." 
//             value={newMessage} 
//             onChange={(e) => setNewMessage(e.target.value)}
//           />
//           <button>🖼️</button>
//           <button>📁🧷</button>
//           <button onClick={handleSendMessage}>ᯓ➤</button>
//         </div>
//       </div>

//       {/* Right Sidebar */}
//       <div className="user-info">
//         <h2>Total Users: {groupUsers.length}</h2>
//         <ul>
//           {groupUsers.map((user, index) => (
//             <li key={index}>{user.username || user}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default StudyGroupChat;


















//-------------------------------------------------------------------------------------------------------------8 (works but has api problems)


// import React, { useEffect, useState, useRef } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import './StudyGroupChat.css';

// const StudyGroupChat = () => {
//   const { id } = useParams(); // Get group ID from URL params
//   const [username, setUsername] = useState('');
//   const [groupName, setGroupName] = useState('');
//   const [users, setUsers] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     const storedUsername = localStorage.getItem('username');
//     if (storedUsername) {
//       setUsername(storedUsername);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchGroupDetails = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         alert('No token found');
//         return;
//       }

//       try {
//         const response = await fetch(`http://127.0.0.1:8000/api/study/group/${id}/`, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           console.log("API Response:", data);

//           if (data && data.groupName) {
//             setGroupName(data.groupName);
//           }

//           if (data && data.users) {
//             setUsers(data.users);
//           }

//           if (data && data.messages) {
//             setMessages(data.messages);
//           }
//         } else {
//           alert('Failed to fetch group details');
//         }
//       } catch (error) {
//         alert('An error occurred while fetching group details');
//         console.error('Fetch error:', error);
//       }
//     };

//     fetchGroupDetails();
//   }, [id]);

//   const handleSendMessage = async (type, content) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('No token found');
//       return;
//     }

//     try {
//       const response = await fetch(`http://127.0.0.1:8000/api/study/group/${id}/send-message/`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           type: type,
//           content: content,
//         }),
//       });

//       if (response.ok) {
//         const newMsg = await response.json();
//         setMessages((prev) => [...prev, newMsg]);
//         setNewMessage('');
//       } else {
//         alert('Failed to send message');
//       }
//     } catch (error) {
//       alert('An error occurred while sending the message');
//       console.error('Send error:', error);
//     }
//   };

//   const handleFileUpload = async (e) => {
//     const token = localStorage.getItem('token');
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await fetch(`http://127.0.0.1:8000/api/study/group/${id}/upload-file/`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       if (response.ok) {
//         const newMsg = await response.json();
//         setMessages((prev) => [...prev, newMsg]);
//       } else {
//         alert('Failed to upload file');
//       }
//     } catch (error) {
//       console.error('File upload error:', error);
//       alert('An error occurred while uploading the file');
//     }
//   };

//   return (
//     <div className="study-group-chat">
//       {/* Left Sidebar */}
//       <div className="study-group-sidebar">
//         <div className="sidebar-header">
//           <h3>Welcome, {username || 'User'}</h3>
//         </div>
//         <nav className="sidebar-nav">
//           <button className="sidebar-btn" onClick={() => navigate('/user-dashboard')}>← Back to Dashboard</button>
//           <button className="sidebar-btn" onClick={() => navigate('/study-group')}>🔙 Back To Group List</button>
//           <button className="sidebar-btn active" onClick={() => navigate('/study-group')}>📚 My Study Groups</button>
//           <button className="sidebar-btn" onClick={() => navigate('/group-chat')}>💬 Group Chats</button>
//         </nav>
//       </div>

//       {/* Main Chat Area */}
//       <div className="main-chat">
//         <div className="group-name-header">
//           <h1>{groupName || 'Loading...'} <span className="group-icon">📚</span></h1>
//         </div>
//         <div className="chat-thread">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`chat-message ${msg.sender === username ? 'own-message' : 'other-message'}`}
//             >
//               <strong>{msg.sender}:</strong>{' '}
//               {msg.type === 'text' ? (
//                 <span>{msg.content}</span>
//               ) : (
//                 <a href={msg.content} target="_blank" rel="noopener noreferrer">📁 File</a>
//               )}
//             </div>
//           ))}
//         </div>
//         <div className="message-input">
//           <input
//             type="text"
//             placeholder="Write your message here..."
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//           />
//           <button onClick={() => fileInputRef.current.click()}>🖼️</button>
//           <button onClick={() => fileInputRef.current.click()}>📁🧷</button>
//           <input
//             type="file"
//             ref={fileInputRef}
//             style={{ display: 'none' }}
//             onChange={handleFileUpload}
//           />
//           <button
//             onClick={() => {
//               if (newMessage.trim()) {
//                 handleSendMessage('text', newMessage.trim());
//               }
//             }}
//           >
//             ᯓ➤
//           </button>
//         </div>
//       </div>

//       {/* Right Sidebar */}
//       <div className="user-info">
//         <h2>Total Users: {users.length}</h2>
//         <ul>
//           {users.map((user, i) => (
//             <li key={i}>{user}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

//export default StudyGroupChat;








