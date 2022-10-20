import React from 'react';
import { useNavigate } from 'react-router-dom';

const Report = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>메인 페이지</h1>

      <button type='button' onClick={() => navigate('/login')}>로그인</button>
      <button type='button' onClick={() => navigate('/join')}>회원가입</button>

      <button type='button' onClick={() => navigate('/lounge')}>라운지(챌린지 목록)</button>

      <button type='button' onClick={() => navigate('/mypage')}>마이페이지</button>
    </div>
  );
};

export default Report;