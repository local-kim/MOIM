import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChallengeList = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>챌린지 목록</h1>

      <button type='button' onClick={() => navigate('/lounge/new')}>챌린지 생성</button>
      <button type='button' onClick={() => navigate('/lounge/1')}>챌린지 보기</button>
    </div>
  );
};

export default ChallengeList;