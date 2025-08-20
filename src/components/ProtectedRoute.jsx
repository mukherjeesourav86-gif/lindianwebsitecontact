import React from 'react';
import { Navigate } from 'react-router-dom';
import { useResources } from '../context/ResourceContext';

const ProtectedRoute = ({ children, role }) => {
  const { currentUser } = useResources();

  if (!currentUser) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  if (role && currentUser.role !== role) {
    // Logged in, but wrong role, redirect to home
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
