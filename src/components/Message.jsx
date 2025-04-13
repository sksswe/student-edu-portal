
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Message = () => {
  const [messages, setMessages] = useState([]);
  const currentUserId = 1; // Replace this with actual logged-in user ID

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        const response = await axios.get('http://127.0.0.1:8000/api/message/16/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="messages">
      {messages.map((msg) => {
        const isOwner = msg.sender === currentUserId;

        return (
          <div className={`message ${isOwner ? 'owner' : ''}`} key={msg.id}>
            <div className="messageInfo">
              <img
                src={
                  isOwner
                    ? 'https://cdn.pixabay.com/photo/2016/03/12/21/05/boy-1252771_1280.jpg'
                    : 'https://cdn.pixabay.com/photo/2019/07/09/08/03/boy-4326461_1280.jpg'
                }
                alt="user"
              />
              <span>
                Sender {msg.sender} • {formatTime(msg.timestamp)}
              </span>
            </div>
            <div className="messageContent">
              <p>{msg.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Message;
