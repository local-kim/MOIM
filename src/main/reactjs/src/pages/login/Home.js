import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <div>
      {
        user && <Navigate to="/lounge" replace={true} />
      }
      {
        !user && <Navigate to="/login" replace={true} />
      }
    </div>
  );
};

export default Home;