import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './StudyGroupChat.css';

const StudyGroupChat = () => {
  const { id } = useParams();
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(null);
  const [groupName, setGroupName] = useState('');
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found');
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/api/user/data/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUserId(userData.id);
        } else {
          alert('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('An error occurred while fetching user data');
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchGroupDetailsAndMessages = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found');
        return;
      }

      try {
        const groupResponse = await fetch(`http://127.0.0.1:8000/api/study/join-studygroup/${id}/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (groupResponse.ok) {
          const data = await groupResponse.json();
          if (data?.groupName) setGroupName(data.groupName);
          if (data?.members) {
            const usernames = data.members.map(user => ({
              username: user.username,
              avatar: user.avatar || null
            }));
            setUsers(usernames);
          }
        } else {
          alert('Failed to fetch group details');
        }

        await fetchMessages(); // fetch messages after group data
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while loading data');
      }
    };

    fetchGroupDetailsAndMessages();

    const intervalId = setInterval(() => {
      fetchMessages();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [id]);

  const fetchMessages = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/study/group/${id}/messages/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const formatted = data.map(msg => ({
          sender: msg.sender_name,
          avatar: msg.avatar || null,
          type: msg.file ? 'file' : 'text',
          content: msg.file || msg.text,
          timestamp: msg.timestamp,
        }));
        setMessages(formatted);
      } else {
        alert('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async (type, content) => {
    if (!userId) {
      alert('User ID not found');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/study/sendmessage/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          group: id,
          sender: userId,
          text: content,
        }),
      });

      if (response.ok) {
        const newMsg = await response.json();
        const formatted = {
          sender: username,
          avatar: newMsg.avatar || null,
          type: newMsg.file ? 'file' : 'text',
          content: newMsg.file || newMsg.text,
          timestamp: newMsg.timestamp,
        };
        setMessages(prev => [...prev, formatted]);
        setNewMessage('');
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      console.error('Send error:', error);
      alert('An error occurred while sending the message');
    }
  };

  // const handleFileUpload = async (e) => {
  //   const token = localStorage.getItem('token');
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append('file', file);

  //   try {
  //     const response = await fetch(`http://127.0.0.1:8000/api/study/sendFile/`, {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //       },
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       const newMsg = await response.json();
  //       const formatted = {
  //         sender: username,
  //         avatar: newMsg.avatar || null,
  //         type: newMsg.file ? 'file' : 'text',
  //         content: newMsg.file || newMsg.text,
  //         timestamp: newMsg.timestamp,
  //       };
  //       setMessages(prev => [...prev, formatted]);
  //     } else {
  //       alert('Failed to upload file');
  //     }
  //   } catch (error) {
  //     console.error('File upload error:', error);
  //     alert('An error occurred while uploading the file');
  //   }
  // };

  const handleFileUpload = async (e) => {
    const token = localStorage.getItem('token');
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('group', id);
    formData.append('sender', userId); // Make sure you're sending sender data if required
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/study/sendFile/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // You should include this for auth
        },
        body: formData, // Don't set the Content-Type here, FormData will handle it
      });
  
      if (response.ok) {
        const newMsg = await response.json();
        const formatted = {
          sender: username,
          avatar: newMsg.avatar || null,
          type: newMsg.file ? 'file' : 'text',
          content: newMsg.file || newMsg.text,
          timestamp: newMsg.timestamp,
        };
        setMessages(prev => [...prev, formatted]);
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
      {/* Sidebar */}
      <div className="study-group-sidebar">
        <div className="sidebar-header">
          <h3>Welcome, {username || 'User'}</h3>
        </div>
        <nav className="sidebar-nav">
          <button className="sidebar-btn" onClick={() => navigate('/user-dashboard')}>← Back to Dashboard</button>
          <button className="sidebar-btn" onClick={() => navigate('/study-group')}>🔙 Back To Group List</button>
          <button className="sidebar-btn active">📚 My Study Groups</button>
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
            <div key={index} className={`message ${msg.sender === username ? 'owner' : ''}`}>
              <div className="messageInfo">
                <img
                  src={msg.avatar || 'https://cdn.pixabay.com/photo/2019/07/09/08/03/boy-4326461_1280.jpg'}
                  alt="avatar"
                />
                <strong>{msg.sender}</strong>
                <span>{msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : 'Just now'}</span>
                
              </div>
              <div className="messageContent">
                {msg.type === 'text' ? (
                  <p>{msg.content}</p>
                ) : (
                  <a href={msg.content} target="_blank" rel="noopener noreferrer">📁 {msg.content.split('/').pop()}</a>
                )}
              </div>
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
            <li key={i}>
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt="user avatar"
                  style={{ width: 24, height: 24, borderRadius: '50%', marginRight: 8 }}
                />
              )}
              {user.username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudyGroupChat;

