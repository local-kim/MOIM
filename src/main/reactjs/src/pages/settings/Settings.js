import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Settings.module.css';

const Settings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>Settings</div>
      {
        user && <button type='button' className={`btn btn-secondary`} onClick={() => {
          localStorage.removeItem("user");
          setUser(null);
        }}>로그아웃</button>
      }
      {
        !user &&
        <div>
          <button type='button' className={`btn btn-primary`} onClick={() => navigate('/login')}>로그인</button>
          <button type='button' className={`btn btn-secondary`} onClick={() => navigate('/join')}>회원가입</button>
        </div>
      }
    </div>
  );
};

export default Settings;