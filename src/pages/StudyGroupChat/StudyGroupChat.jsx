import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './StudyGroupChat.css';

const StudyGroupChat = () => {
  const { id } = useParams(); // Get group ID from URL params
  const [username, setUsername] = useState('');
  const [groupName, setGroupName] = useState('');
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Fetch username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Fetch group details by group ID
  useEffect(() => {
    const fetchGroupDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found');
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/study/join-studygroup/${id}/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("API Response:", data);

          if (data && data.groupName) {
            setGroupName(data.groupName);
          }

          if (data && data.members) {
            const usernames = data.members.map(user => user.username);
            setUsers(usernames);
          }

          if (data && data.messages) {
            setMessages(data.messages);
          }
        } else {
          alert('Failed to fetch group details');
        }
      } catch (error) {
        alert('An error occurred while fetching group details');
        console.error('Fetch error:', error);
      }
    };

    fetchGroupDetails();
  }, [id]);

  // Handle sending messages
  const handleSendMessage = async (type, content) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/study/group/${id}/send-message/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: type,
          content: content,
        }),
      });

      if (response.ok) {
        const newMsg = await response.json();
        setMessages((prev) => [...prev, newMsg]);
        setNewMessage('');
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      alert('An error occurred while sending the message');
      console.error('Send error:', error);
    }
  };

  // Handle file uploads
  const handleFileUpload = async (e) => {
    const token = localStorage.getItem('token');
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/study/group/${id}/upload-file/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const newMsg = await response.json();
        setMessages((prev) => [...prev, newMsg]);
      } else {
        alert('Failed to upload file');
      }
    } catch (error) {
      console.error('File upload error:', error);
      alert('An error occurred while uploading the file');
    }
  };

  return (
    <div className="study-group-chat">
      {/* Left Sidebar */}
      <div className="study-group-sidebar">
        <div className="sidebar-header">
          <h3>Welcome, {username || 'User'}</h3>
        </div>
        <nav className="sidebar-nav">
          <button className="sidebar-btn" onClick={() => navigate('/user-dashboard')}>← Back to Dashboard</button>
          <button className="sidebar-btn" onClick={() => navigate('/study-group')}>🔙 Back To Group List</button>
          <button className="sidebar-btn active" onClick={() => navigate('/study-group')}>📚 My Study Groups</button>
          <button className="sidebar-btn" onClick={() => navigate('/group-chat')}>💬 Group Chats</button>
        </nav>
      </div>

      {/* Main Chat Area */}
      <div className="main-chat">
        <div className="group-name-header">
          <h1>{groupName || 'Loading...'} <span className="group-icon">📚</span></h1>
        </div>
        <div className="chat-thread">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${msg.sender === username ? 'own-message' : 'other-message'}`}
            >
              <strong>{msg.sender}:</strong>{' '}
              {msg.type === 'text' ? (
                <span>{msg.content}</span>
              ) : (
                <a href={msg.content} target="_blank" rel="noopener noreferrer">📁 File</a>
              )}
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            placeholder="Write your message here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={() => fileInputRef.current.click()}>🖼️</button>
          <button onClick={() => fileInputRef.current.click()}>📁🧷</button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <button
            onClick={() => {
              if (newMessage.trim()) {
                handleSendMessage('text', newMessage.trim());
              }
            }}
          >
            ᯓ➤
          </button>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="user-info">
        <h5>Total Members: {users.length}</h5>
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudyGroupChat;







