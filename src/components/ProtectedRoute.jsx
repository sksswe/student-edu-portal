import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ role }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('role');

  // Debugging: Log the authentication status and user role
  console.log('isAuthenticated:', isAuthenticated);
  console.log('userRole:', userRole);
  console.log('requiredRole:', role);

  if (!isAuthenticated) {
    console.log('User is not authenticated. Redirecting to /signin');
    return <Navigate to="/signin" />; // Redirect to sign-in if not authenticated
  }

  if (role && userRole !== role) {
    console.log('User role does not match. Redirecting to /');
    return <Navigate to="/" />; // Redirect to home if role doesn't match
  }

  console.log('User is authenticated and role matches. Rendering the component.');
  return <Outlet />; // Render the child routes if authenticated and role matches
};

export default ProtectedRoute;