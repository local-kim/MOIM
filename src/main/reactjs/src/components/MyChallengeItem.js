import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns'
import ko from 'date-fns/locale/ko';
import styles from './Components.module.css';

const MyChallengeItem = ({challenge}) => {
  const navigate = useNavigate();
  
  return (
    <div className={styles.profile_challenge}>
      <div className={styles.photo} style={{
        backgroundImage:`url(/resources/challenge_photo/${challenge.photo})`
      }} onClick={() => navigate(`/lounge/${challenge.id}`)}>
        {/* 사진 */}
      </div>
      <div className={styles.info_wrap} onClick={() => navigate(`/lounge/${challenge.id}`)}>
        <div className={styles.title}>{challenge.title}</div>
        <div className={styles.info}>
          <span className={`material-icons ${styles.icon} ${styles.place_icon}`}>place</span>
          <span>
            {
              challenge.area ? challenge.area : "온라인"
            }
          </span>
          <span>&nbsp;・&nbsp;</span>
          <span>{format(new Date(challenge.planned_at), "MM.dd(eee) a hh:mm", {locale: ko})}</span>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <span className={`material-icons ${styles.icon} ${styles.group_icon}`}>group</span>
          <span>
            {challenge.joined_users}/{challenge.limit}
          </span>
        </div>
        <div>
          {
            new Date(challenge.planned_at) <= new Date() ? <span className={`${styles.status} ${styles.gray}`}>종료</span> : challenge.joined_users == challenge.limit ? <span className={`${styles.status} ${styles.gray}`}>모집완료</span>: <span className={`${styles.status} ${styles.activate}`}>모집중</span>
          }
        </div>
      </div>
    </div>
  );
};

export default MyChallengeItem;