import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns'
import ko from 'date-fns/locale/ko';
import styles from './Profile.module.css';

const NotificationItem = ({noti}) => {
  const navigate = useNavigate();

  return (
    // 참여 알림
    noti.type == 0 ? 
    <div className={styles.noti_box} onClick={() => navigate(`/lounge/${noti.challenge_id}`)}>
      <span className={styles.noti}>
        <span className={styles.noti_wrap}>
          <span className={styles.bold}>{noti.target_user_nickname}</span>님이 '<span className={styles.bold}>{noti.challenge_title}</span>'에 참여했습니다.
        </span>
        <span className={styles.time}>{format(new Date(noti.created_at), "MM/dd HH:mm", {locale: ko})}</span>
      </span>
    </div> : 
    // 참여 취소 알림
    noti.type == 1 ? 
    <div className={styles.noti_box} onClick={() => navigate(`/lounge/${noti.challenge_id}`)}>
      <span className={styles.noti}>
        <span className={styles.noti_wrap}>
          <span className={styles.bold}>{noti.target_user_nickname}</span>님이 '<span className={styles.bold}>{noti.challenge_title}</span>'의 참여를 취소했습니다.
        </span>
        <span className={styles.time}>{format(new Date(noti.created_at), "MM/dd HH:mm", {locale: ko})}</span>
      </span>
    </div> : 
    // 댓글 등록 알림
    <div className={styles.noti_box} onClick={() => navigate(`/lounge/${noti.challenge_id}`)}>
      <span className={styles.noti}>
        <span className={styles.noti_wrap}>
          <span className={styles.bold}>{noti.target_user_nickname}</span>님이 '<span className={styles.bold}>{noti.challenge_title}</span>'에 댓글을 남겼습니다.
        </span>
        <span className={styles.time}>{format(new Date(noti.created_at), "MM/dd HH:mm", {locale: ko})}</span>
      </span>
    </div>
  );
};

export default NotificationItem;