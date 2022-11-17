import React, { useState } from 'react';
import { format } from 'date-fns'
import ko from 'date-fns/locale/ko';
import styles from './Components.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChallengeItem = ({challenge, likeList, getLikeList}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

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
          // setIsLiked(false);
          // 좋아요 목록에서 삭제
          // setLikeList(likeList.filter(id => id != challengeId));
          getLikeList();
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
          // setIsLiked(true);
          // likeList.push(challengeId);
          getLikeList();
        }).catch(err => console.log(err));
      }
    }
  }

  return (
    <div className={styles.challenge}>
      <div className={styles.photo} style={{
        backgroundImage:`url(/resources/challenge_photo/${challenge.photo})`
      }}>
        {/* 사진 */}
        {
          likeList.includes(challenge.id) ? 
          <span className={`material-icons ${styles.like} ${styles.like_on}`} onClick={() => handleLike(challenge.id, true)}>favorite</span> : 
          <span className={`material-icons ${styles.like} ${styles.like_off}`} onClick={() => handleLike(challenge.id, false)}>favorite_border</span>
        }
      </div>
      <div className={styles.info_wrap}>
        <div className={styles.title} onClick={() => navigate(`/lounge/${challenge.id}`)}>{challenge.title}</div>
        <div className={styles.info}>
          {/* <div className={`material-icons ${styles.icon} ${styles.place_icon}`}>place</div>
          <div>
            {
              challenge.area ? challenge.area : "온라인"
            }
          </div>
          <div>&nbsp;・&nbsp;</div>
          <div>{format(new Date(challenge.planned_at), "MM.dd(eee) a hh:mm", {locale: ko})}</div>
          <div>&nbsp;&nbsp;&nbsp;</div>
          <div className={`material-icons ${styles.icon} ${styles.group_icon}`}>group</div>
          <div>
            {challenge.joined_users}/{challenge.limit}
          </div> */}
          
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

          {/* <span className={`material-icons ${styles.icon} ${styles.place_icon}`}>place</span>
          {
              challenge.area ? challenge.area : "온라인"
            }
          &nbsp;・&nbsp;
          {format(new Date(challenge.planned_at), "MM.dd(eee) a hh:mm", {locale: ko})}
          &nbsp;&nbsp;&nbsp;
          <span className={`material-icons ${styles.icon} ${styles.group_icon}`}>group</span>
          
          {challenge.joined_users}/{challenge.limit} */}
          
        </div>
      </div>
    </div>
  );
};

export default ChallengeItem;