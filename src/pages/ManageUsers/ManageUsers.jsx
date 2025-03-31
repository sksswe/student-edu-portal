import React, { useState, useEffect } from 'react';
import './ManageUsers.css';
import axios from 'axios';

function ManageUsers({ onClose }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

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
        setError('Failed to fetch users');
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

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://your-backend-api.com/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Remove the deleted user from the state
      setUsers(users.filter(user => user.id !== userId));
      setFilteredUsers(filteredUsers.filter(user => user.id !== userId));
      setConfirmDelete(null);
    } catch (err) {
      setError('Failed to delete user');
      console.error('Error deleting user:', err);
    }
  };

  return (
    <div className="manage-users-popup-overlay">
      <div className="manage-users-popup-container">
        <div className="manage-users-header">
          <h2>Manage Users</h2>
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
          <div className="loading-message">Loading users...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="manage-users-content">
            <div className="users-list">
              <div className="list-header">
                <span className="header-id">ID</span>
                <span className="header-username">Username</span>
                <span className="header-email">Email</span>
                <span className="header-role">Role</span>
                <span className="header-date">Registered</span>
                <span className="header-actions">Actions</span>
              </div>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <div key={user.id} className="user-item">
                    <span className="user-id">{user.id}</span>
                    <span className="user-username">{user.username}</span>
                    <span className="user-email">{user.email}</span>
                    <span className={`user-role ${user.role}`}>
                      {user.role}
                    </span>
                    <span className="user-date">{formatDate(user.createdAt)}</span>
                    <span className="user-actions">
                      <button 
                        className="delete-button"
                        onClick={() => setConfirmDelete(user.id)}
                      >
                        Delete
                      </button>
                    </span>

                    {confirmDelete === user.id && (
                      <div className="confirmation-dialog">
                        <p>Are you sure you want to delete this user?</p>
                        <div className="confirmation-buttons">
                          <button 
                            className="confirm-button"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            Yes
                          </button>
                          <button 
                            className="cancel-button"
                            onClick={() => setConfirmDelete(null)}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    )}
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

export default ManageUsers;