import React, { useState, useEffect, useRef } from 'react';
import './StudyGroup.css';
import axios from 'axios';

function StudyGroup({ groupId, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [groupInfo, setGroupInfo] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const [groupResponse, messagesResponse] = await Promise.all([
          axios.get(`https://your-backend-api.com/study-groups/${groupId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }),
          axios.get(`https://your-backend-api.com/study-groups/${groupId}/messages`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
        ]);
        
        setGroupInfo(groupResponse.data);
        setMessages(messagesResponse.data);
      } catch (err) {
        setError('Failed to load group data');
        console.error(err);
      }
    };

    fetchGroupData();
    const interval = setInterval(fetchGroupData, 5000);
    return () => clearInterval(interval);
  }, [groupId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() && !file) return;

    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('content', newMessage);
      formData.append('senderId', localStorage.getItem('id'));
      formData.append('senderName', localStorage.getItem('username') || 'User');
      if (file) {
        formData.append('file', file);
      }

      const response = await axios.post(
        `https://your-backend-api.com/study-groups/${groupId}/messages`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      setMessages([...messages, response.data]);
      setNewMessage('');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      setError('Failed to send message');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const downloadFile = (fileUrl, fileName) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!groupInfo) {
    return (
      <div className="study-group-popup-overlay">
        <div className="study-group-popup-container">
          <div className="loading-message">Loading study group...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="study-group-popup-overlay">
      <div className="study-group-popup-container">
        <div className="chat-header">
          <h2>{groupInfo.name} Study Group</h2>
          <button className="windows-close-button" onClick={onClose}>
            <span className="close-icon">✕</span>
          </button>
        </div>

        <div className="group-info">
          <p><strong>Subject:</strong> {groupInfo.subject}</p>
          <p><strong>Description:</strong> {groupInfo.description}</p>
          <p><strong>Members:</strong> {groupInfo.memberCount}</p>
        </div>

        <div className="messages-container">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`message ${message.senderId === localStorage.getItem('id') ? 'sent' : 'received'}`}
            >
              <div className="message-header">
                <span className="sender-name">{message.senderName}</span>
                <span className="message-time">{formatDate(message.timestamp)}</span>
              </div>
              
              {message.content && <div className="message-content">{message.content}</div>}
              
              {message.fileUrl && (
                <div className="message-file">
                  {message.fileType === 'image' ? (
                    <img 
                      src={message.fileUrl} 
                      alt="Shared content" 
                      onClick={() => downloadFile(message.fileUrl, message.fileName)}
                    />
                  ) : (
                    <div className="file-download" onClick={() => downloadFile(message.fileUrl, message.fileName)}>
                      <span className="file-icon">📄</span>
                      <span className="file-name">{message.fileName}</span>
                      <span className="download-text">Click to download</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="message-input-form" onSubmit={handleSendMessage}>
          <div className="input-container">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Message ${groupInfo.name} group...`}
              className="message-input"
              rows="1"
            />
            <div className="action-buttons">
              <label htmlFor="file-upload" className="file-upload-button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 15V3M12 3L8 7M12 3L16 7M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </label>
              <input
                id="file-upload"
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <button 
                type="submit" 
                className="send-button"
                disabled={isLoading || (!newMessage.trim() && !file)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudyGroup;