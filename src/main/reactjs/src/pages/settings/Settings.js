import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styles from './Settings.module.css';

const Settings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <div>
      { !user && <Navigate to="/login" replace={true} /> }
      { user &&
        <div className={styles.wrap}>
          <div className={styles.title}>Settings</div>
          <button type='button' className={`btn btn-secondary`} onClick={() => {
            localStorage.removeItem("user");
            setUser(null);
          }}>로그아웃</button>
        </div>
      }
    </div>
  );
};

export default Settings;