import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './Challenge.module.css';

const Challenge = () => {
  const {challengeId} = useParams();
  const [challenge, setChallenge] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`/challenge/${challengeId}`)
    .then(res => {
      console.log(res.data);
      setChallenge(res.data);
    }).catch(err => console.log(err));

    axios.get(`/challenge/users/${challengeId}`)
    .then(res => {
      console.log(res.data);
      setUsers(res.data);
    }).catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>챌린지 상세</h1>
      <div className={styles.photo}>사진</div>
      <div className={styles.title}>{challenge.title}</div>
      <div>
        <span className={`material-icons ${styles.icon}`}>group</span>
        {/* 챌린지에 참여한 유저수 */}
        {challenge.joined_users}/{challenge.limit}명
      </div>
      <hr/>
      <div className={styles.subtitle}>클럽 소개</div>
      <div>{challenge.content}</div>
      {/* TODO: 챌린지에 참여한 유저 목록 */}
      <hr/>
      <div className={styles.subtitle}>가입 멤버</div>
      {
        users && users.map((user, index) => (
          <div key={index}>
            {user.nickname}
          </div>
        ))
      }
    </div>
  );
};

export default Challenge;