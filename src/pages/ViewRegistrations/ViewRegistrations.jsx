import React, { useState, useEffect } from 'react';
import './ViewRegistrations.css';
import axios from 'axios';

function ViewRegistrations({ onClose }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://your-backend-api.com/api/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (err) {
        setError('Failed to fetch user registrations');
        console.error('Error fetching users:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const results = users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="view-registrations-popup-overlay">
      <div className="view-registrations-popup-container">
        <div className="registrations-header">
          <h2>View Registrations</h2>
          <button className="windows-close-button" onClick={onClose}>
            <span className="close-icon">✕</span>
          </button>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by username, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {isLoading ? (
          <div className="loading-message">Loading registrations...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="registrations-content">
            <div className="registrations-list">
              <div className="list-header">
                <span className="header-id">ID</span>
                <span className="header-username">Username</span>
                <span className="header-email">Email</span>
                <span className="header-role">Role</span>
                <span className="header-date">Registered</span>
              </div>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <div key={user.id} className="registration-item">
                    <span className="user-id">{user.id}</span>
                    <span className="user-username">{user.username}</span>
                    <span className="user-email">{user.email}</span>
                    <span className={`user-role ${user.role}`}>
                      {user.role}
                    </span>
                    <span className="user-date">{formatDate(user.createdAt)}</span>
                  </div>
                ))
              ) : (
                <div className="no-results">No matching users found</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewRegistrations;