import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import styles from './Login.module.css';

const Home = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [state, setState] = useState(false);

  setTimeout(() => {
    setState(true);
  }, 3000);

  return (
    <div>
      {
        !state && <div className={styles.home_logo}>COBELL</div>
      }
      {
        state && user && <Navigate to="/lounge" replace={true} />
      }
      {
        state && !user && <Navigate to="/login" replace={true} />
      }
    </div>
  );
};

export default Home;