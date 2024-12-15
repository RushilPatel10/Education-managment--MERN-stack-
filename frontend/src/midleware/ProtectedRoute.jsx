import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token'); 
  const role = localStorage.getItem('role'); 

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If role is not found, redirect to login
  if (!role) {
    return <Navigate to="/login" />;
  }

  // If role is not authorized, redirect to unauthorized page
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  // If authorized, render the child components
  return children;
};

export default ProtectedRoute;
