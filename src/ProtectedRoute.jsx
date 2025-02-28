import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'; // Check authentication status
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />; // Redirect to sign-in if not authenticated
};

export default ProtectedRoute;