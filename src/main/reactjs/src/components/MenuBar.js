import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Components.module.css';

const MenuBar = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.menu}>
      <div onClick={() => navigate('/lounge')}>라운지</div>
      <div onClick={() => navigate('/report')}>리포트</div>
      <div onClick={() => navigate('/profile')}>프로필</div>
      <div onClick={() => navigate('/settings')}>설정</div>
    </div>
  );
};

export default MenuBar;