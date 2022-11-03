import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns'
import ko from 'date-fns/locale/ko';
import styles from './Profile.module.css';

const NotificationItem = ({noti}) => {
  const navigate = useNavigate();

  return (
    noti.type == 0 ? 
    <div className={styles.noti_box} onClick={() => navigate(`/lounge/${noti.challenge_id}`)}>
      <span className={styles.noti}>
        <span className={styles.bold}>{noti.target_user_nickname}</span>님이 '<span className={styles.bold}>{noti.challenge_title}</span>'에 참여했습니다.
        <span className={styles.time}>{format(new Date(noti.created_at), "MM/dd HH:mm", {locale: ko})}</span>
      </span>
    </div> : 
    <div>댓글 알림</div>
  );
};

export default NotificationItem;