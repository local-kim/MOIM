import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChallengeList = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/challenge/list")
    .then(res => {
      console.log(res.data);
    }).catch(err => console.log(err));
  });

  return (
    <div>
      <h1>챌린지 목록</h1>

      <button type='button' onClick={() => navigate('/lounge/new')}>챌린지 생성</button>
      <button type='button' onClick={() => navigate('/lounge/1')}>챌린지 보기</button>


    </div>
  );
};

export default ChallengeList;