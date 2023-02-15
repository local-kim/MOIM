import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return user ? <Navigate to='/' /> : children;
};

export default PublicRoute;