import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Challenge = () => {
  const {challengeId} = useParams();
  const [challenge, setChallenge] = useState({});

  useEffect(() => {
    axios.get(`/challenge/${challengeId}`)
    .then(res => {
      console.log(res.data);
      setChallenge(res.data);
    }).catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>챌린지 상세</h1>
      {challenge.title}
    </div>
  );
};

export default Challenge;