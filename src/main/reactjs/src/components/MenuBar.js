import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Components.module.css';

const MenuBar = () => {
  const navigate = useNavigate();

  // 챌린지 생성, 상세, 프로필 수정 페이지에서 메뉴바 숨기기
  // if(window.location.pathname.startsWith('/lounge/') || window.location.pathname == '/profile/edit' || window.location.pathname == '/login' || window.location.pathname == '/join') return null;

  if(window.location.pathname == '/lounge' || window.location.pathname == '/report' || window.location.pathname == '/profile' || window.location.pathname == '/settings')
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