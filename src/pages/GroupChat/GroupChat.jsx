import React from 'react';
import { Link } from 'react-router-dom';
import './GroupChat.css';

function GroupChat() {
  return (
    <div className="group-chat-container">
      <h1>Group Chat</h1>
      <p>Communicate with your study group members in real-time.</p>
      <div className="chat-window">
        <div className="messages">
          {/* Example messages */}
          <div className="message">
            <strong>User1:</strong> Hello everyone!
          </div>
          <div className="message">
            <strong>User2:</strong> Hi! How's it going?
          </div>
        </div>
        <div className="chat-input">
          <input type="text" placeholder="Type a message..." />
          <button>Send</button>
        </div>
      </div>
      <Link to="/dashboard" className="back-link">
        Back to Dashboard
      </Link>
    </div>
  );
}

export default GroupChat;