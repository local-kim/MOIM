import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns'
import ko from 'date-fns/locale/ko';
import styles from './Components.module.css';

const LikeItem = ({challenge, likeList, setLikeList}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // console.log(likeList);

  const handleLike = (challengeId, isLiked) => {
    // 로그인한 상태에서만
    if(user){
      if(isLiked){
        // 좋아요 눌린 상태: delete
        axios.delete(`/api/challenge/like/delete`, {
          data: {
            challenge_id: challengeId,
            user_id: user.id
          }
        })
        .then(res => {
          // console.log(res.data);
          // 좋아요 목록에서 삭제
          setLikeList(likeList.filter(id => id != challengeId));
        })
        .catch(err => console.log(err));
      }
      else{
        // 좋아요 안눌린 상태: insert
        axios.post(`/api/challenge/like/insert`, {
          challenge_id: challengeId,
          user_id: user.id
        })
        .then(res => {
          // console.log(res.data);

          // 좋아요 목록에 추가
          setLikeList([
            ...likeList,
            challengeId
          ]);
        }).catch(err => console.log(err));
      }
    }
  }

  return (
    <div className={styles.challenge}>
      {/* 사진 */}
      <div className={styles.photo} style={{
        backgroundImage:`url(/resources/challenge_photo/${challenge.photo})`
      }} onClick={() => navigate(`/lounge/${challenge.id}`)}>
      </div>

      {/* 좋아요 버튼 */}
      {
        likeList.includes(challenge.id) ? 
        <span className={`material-icons ${styles.like} ${styles.like_on}`} onClick={() => handleLike(challenge.id, true)}>favorite</span> : 
        <span className={`material-icons ${styles.like} ${styles.like_off}`} onClick={() => handleLike(challenge.id, false)}>favorite_border</span>
      }
      
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
      </div>
    </div>
  );
};

export default LikeItem;