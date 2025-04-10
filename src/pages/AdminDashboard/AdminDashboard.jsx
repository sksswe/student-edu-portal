import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ViewReports from '../ViewReports/ViewReports';
import ViewRegistrations from '../ViewRegistrations/ViewRegistrations';
import ManageUsers from '../ManageUsers/ManageUsers';
import './AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const [isViewReportsOpen, setIsViewReportsOpen] = useState(false);
  const [isViewRegistrationsOpen, setIsViewRegistrationsOpen] = useState(false);
  const [isManageUsersOpen, setIsManageUsersOpen] = useState(false);

  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('role');
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      navigate('/');
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="header">
        <h2>Welcome, Admin</h2>
      </header>

      {/* Sidebar */}
      <nav className="admin-sidebar">
        <Link 
          to="#" 
          className="sidebar-link" 
          onClick={(e) => {
            e.preventDefault();
            setIsViewReportsOpen(true);
          }}
        >
          <span className="link-icon">📊</span> View Reports
        </Link>
        <Link 
          to="#" 
          className="sidebar-link" 
          onClick={(e) => {
            e.preventDefault();
            setIsManageUsersOpen(true);
          }}
        >
          <span className="link-icon">👥</span> Manage Users
        </Link>
        <Link 
          to="#" 
          className="sidebar-link" 
          onClick={(e) => {
            e.preventDefault();
            setIsViewRegistrationsOpen(true);
          }}
        >
          <span className="link-icon">📝</span> View Registrations
        </Link>

        {/* Sign Out Button */}
        <button onClick={handleSignOut} className="signout-button">
          Sign Out
        </button>
      </nav>

      {/* Main Content */}
      <main className="admin-main-content">
        <h1>Admin Dashboard</h1>
        <p>Select an option from the menu to get started.</p>
      </main>

      {/* View Reports Popup */}
      {isViewReportsOpen && (
        <ViewReports onClose={() => setIsViewReportsOpen(false)} />
      )}

      {/* Manage Users Popup */}
      {isManageUsersOpen && (
        <ManageUsers onClose={() => setIsManageUsersOpen(false)} />
      )}

      {/* View Registrations Popup */}
      {isViewRegistrationsOpen && (
        <ViewRegistrations onClose={() => setIsViewRegistrationsOpen(false)} />
      )}
    </div>
  );
}

export default AdminDashboard;