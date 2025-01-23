import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdminRoute }) => {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const adminUsernames = ['safee@admin']; // Add your admin usernames here

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (isAdminRoute && !adminUsernames.includes(username)) {
    return <Navigate to="/dashboard" />;
  }

  if (!isAdminRoute && adminUsernames.includes(username)) {
    return <Navigate to="/admin-dashboard" />;
  }

  return children;
};

export default ProtectedRoute;