import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns'
import ko from 'date-fns/locale/ko';
import styles from './Lounge.module.css';

const ChallengeList = () => {
  const navigate = useNavigate();

  const [challenges, setChallenges] = useState();

  useEffect(() => {
    axios.get("/challenge/list")
    .then(res => {
      // console.log(res.data);
      setChallenges(res.data);
    }).catch(err => console.log(err));
  });

  return (
    <div>
      <h1>챌린지 목록</h1>

      <button type='button' onClick={() => navigate('/lounge/new')}>챌린지 생성</button>

      {
        challenges && challenges.map((challenge, index) => (
          <div key={index} className={styles.box}>
            <div className={styles.photo}>
              사진
              <span className={`material-icons ${styles.like}`}>favorite_border</span>
            </div>
            <div className={styles.wrap}>
              <span className={styles.title} onClick={() => navigate(`${challenge.id}`)}>{challenge.title}</span>
              <div className={styles.info}>
                <span>
                  <span className={`material-icons ${styles.icon}`}>place</span>
                  {challenge.area}
                </span>
                <span> ・ </span>
                <span>{format(new Date(challenge.planned_at), "MM.dd(eee) a hh:mm", {locale: ko})}</span>
                {/* <span> ・ </span> */}
                <span>
                  <span className={`material-icons ${styles.icon}`}>group</span>
                  {/* TODO: 참여중인 사람 수 받아오기 */}
                  1/{challenge.limit}
                </span>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default ChallengeList;