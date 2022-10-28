import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns'
import ko from 'date-fns/locale/ko';
import styles from './Components.module.css';

const ProfileChallengeItem = ({challenge}) => {
  const navigate = useNavigate();
  
  return (
    <div className={styles.challenge}>
      <div className={styles.photo} style={{
        backgroundImage:`url(/resources/challenge_photo/${challenge.photo})`
      }}>
        {/* 사진 */}
      </div>
      <div className={styles.info_wrap}>
        <div className={styles.title} onClick={() => navigate(`${challenge.id}`)}>{challenge.title}</div>
        <div className={styles.info}>
          <span className={`material-icons ${styles.icon} ${styles.place_icon}`}>place</span>
          <span>{challenge.area}</span>
          <span>&nbsp;・&nbsp;</span>
          <span>{format(new Date(challenge.planned_at), "MM.dd(eee) a hh:mm", {locale: ko})}</span>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <span className={`material-icons ${styles.icon} ${styles.group_icon}`}>group</span>
          <span>
            {/* 참여중인 사람 수 받아오기 */}
            {challenge.joined_users}/{challenge.limit}명
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileChallengeItem;