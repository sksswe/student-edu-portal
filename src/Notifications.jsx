import React from 'react';
import { Link } from 'react-router-dom';
import './Notifications.css';

function Notifications() {
  // Example notifications (replace with actual data from your backend)
  const notifications = [
    { id: 1, message: 'User1 uploaded a new file: Lecture Notes.pdf', date: '2023-10-01' },
    { id: 2, message: 'User2 joined the study group.', date: '2023-10-02' },
    { id: 3, message: 'User3 sent a new message in the group chat.', date: '2023-10-03' },
  ];

  return (
    <div className="notifications-container">
      <h1>Notifications</h1>
      <p>Stay updated with notifications from your study group.</p>
      <div className="notification-list">
        {notifications.map((notification) => (
          <div key={notification.id} className="notification-item">
            <span className="notification-message">{notification.message}</span>
            <span className="notification-date">{notification.date}</span>
          </div>
        ))}
      </div>
      <Link to="/dashboard" className="back-link">
        Back to Dashboard
      </Link>
    </div>
  );
}

export default Notifications;