import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Report = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("user") ? true : false);

  return (
    <div>
      <h1>메인 페이지</h1>
      {
        loggedIn && <button type='button' onClick={() => {
          localStorage.removeItem("user");
          setLoggedIn(false);
        }}>로그아웃</button>
      }
      {
        !loggedIn && 
        <div>
          <button type='button' onClick={() => navigate('/login')}>로그인</button>
          <button type='button' onClick={() => navigate('/join')}>회원가입</button>
        </div>
      }

      <button type='button' onClick={() => navigate('/lounge')}>라운지(챌린지 목록)</button>

      <button type='button' onClick={() => navigate('/mypage')}>마이페이지</button>
    </div>
  );
};

export default Report;