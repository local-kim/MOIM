import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return !user ? <Navigate to='/login' /> : children;
};

export default PrivateRoute;