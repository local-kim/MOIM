import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns'
import ko from 'date-fns/locale/ko';
import styles from './notification.module.css';
import axios from 'axios';
import relativeTime from '../../utils/relativeTime';

const NotificationItem = ({noti, setNotiList}) => {
  const navigate = useNavigate();

  const approveUser = () => {
    axios.post(`/api/challenge/approve`, noti)
    .then(res => {
      setNotiList(res.data);
    }).catch(err => {
      console.log(err);
      alert("모집 완료된 챌린지입니다.");
    });
  }

  const refuseUser = () => {
    axios.post(`/api/challenge/refuse`, noti)
    .then(res => {
      setNotiList(res.data);
    }).catch(err => console.log(err));
  }

  return (
    // 참여 알림
    noti.type == 0 ? 
    <div className={styles.noti_box} onClick={() => navigate(`/lounge/${noti.target_post_id}`)}>
      <span className={styles.noti}>
        <span className={styles.noti_wrap}>
          <span className={styles.bold}>{noti.target_user_nickname}</span>님이 '<span className={styles.bold}>{noti.target_challenge_title}</span>'에 참여했습니다.
        </span>
        {/* <span className={styles.time}>{format(new Date(noti.created_at), "MM/dd HH:mm", {locale: ko})}</span> */}
        <span className={styles.time}>{relativeTime(new Date(noti.created_at))}</span>
      </span>
    </div> : 
    // 참여 취소 알림
    noti.type == 1 ? 
    <div className={styles.noti_box} onClick={() => navigate(`/lounge/${noti.target_post_id}`)}>
      <span className={styles.noti}>
        <span className={styles.noti_wrap}>
          <span className={styles.bold}>{noti.target_user_nickname}</span>님이 '<span className={styles.bold}>{noti.target_challenge_title}</span>'의 참여를 취소했습니다.
        </span>
        {/* <span className={styles.time}>{format(new Date(noti.created_at), "MM/dd HH:mm", {locale: ko})}</span> */}
        <span className={styles.time}>{relativeTime(new Date(noti.created_at))}</span>
      </span>
    </div> : 
    // 챌린지 댓글 등록 알림
    noti.type == 2 ?
    <div className={styles.noti_box} onClick={() => navigate(`/lounge/${noti.target_post_id}`)}>
      <span className={styles.noti}>
        <span className={styles.noti_wrap}>
          <span className={styles.bold}>{noti.target_user_nickname}</span>님이 '<span className={styles.bold}>{noti.target_challenge_title}</span>'에 댓글을 남겼습니다: <span className={styles.bold}>{noti.target_comment_content}</span>
        </span>
        {/* <span className={styles.time}>{format(new Date(noti.created_at), "MM/dd HH:mm", {locale: ko})}</span> */}
        <span className={styles.time}>{relativeTime(new Date(noti.created_at))}</span>
      </span>
    </div> : 
    // 챌린지 참여 신청 알림
    noti.type == 3 ?
    <div className={styles.noti_box}>
      <span className={styles.noti}>
        <span className={styles.noti_wrap} onClick={() => navigate(`/lounge/${noti.target_post_id}`)}>
          <span className={styles.bold}>{noti.target_user_nickname}</span>님이 '<span className={styles.bold}>{noti.target_challenge_title}</span>'에 참여를 신청했습니다.
        </span>
        {/* <span className={styles.time}>{format(new Date(noti.created_at), "MM/dd HH:mm", {locale: ko})}</span> */}
        <span className={styles.time}>{relativeTime(new Date(noti.created_at))}</span>
      </span>
      <div className={styles.btn_wrap}>
        <div className={styles.btn_approve} onClick={approveUser}>승인</div>
        <div className={styles.btn_refuse} onClick={refuseUser}>거절</div>
      </div>
    </div> : 
    // 챌린지 참여 승인 알림
    noti.type == 4 ?
    <div className={styles.noti_box} onClick={() => navigate(`/lounge/${noti.target_post_id}`)}>
      <span className={styles.noti}>
        <span className={styles.noti_wrap}>
          '<span className={styles.bold}>{noti.target_challenge_title}</span>'의 참여 신청이 승인되었습니다.
        </span>
        {/* <span className={styles.time}>{format(new Date(noti.created_at), "MM/dd HH:mm", {locale: ko})}</span> */}
        <span className={styles.time}>{relativeTime(new Date(noti.created_at))}</span>
      </span>
    </div> : 
    // 챌린지 참여 거절 알림
    noti.type == 5 ?
    <div className={styles.noti_box} onClick={() => navigate(`/lounge/${noti.target_post_id}`)}>
      <span className={styles.noti}>
        <span className={styles.noti_wrap}>
          '<span className={styles.bold}>{noti.target_challenge_title}</span>'의 참여 신청이 거절되었습니다.
        </span>
        {/* <span className={styles.time}>{format(new Date(noti.created_at), "MM/dd HH:mm", {locale: ko})}</span> */}
        <span className={styles.time}>{relativeTime(new Date(noti.created_at))}</span>
      </span>
    </div> : 
    // 피드 좋아요 알림
    noti.type == 20 ? 
    <div className={styles.noti_box} onClick={() => navigate(`/feed/${noti.target_post_id}`)}>
      <span className={styles.noti}>
        <span className={styles.noti_wrap}>
          <span className={styles.bold}>{noti.target_user_nickname}</span>님이 회원님의 사진을 좋아합니다.
        </span>
        {/* <span className={styles.time}>{format(new Date(noti.created_at), "MM/dd HH:mm", {locale: ko})}</span> */}
        <span className={styles.time}>{relativeTime(new Date(noti.created_at))}</span>
      </span>
    </div> : 
    // 피드 댓글 등록 알림
    <div className={styles.noti_box} onClick={() => navigate(`/feed/${noti.target_post_id}`)}>
      <span className={styles.noti}>
        <span className={styles.noti_wrap}>
          <span className={styles.bold}>{noti.target_user_nickname}</span>님이 피드에 댓글을 남겼습니다: <span className={styles.bold}>{noti.target_comment_content}</span>
        </span>
        {/* <span className={styles.time}>{format(new Date(noti.created_at), "MM/dd HH:mm", {locale: ko})}</span> */}
        <span className={styles.time}>{relativeTime(new Date(noti.created_at))}</span>
      </span>
    </div>
  );
};

export default NotificationItem;