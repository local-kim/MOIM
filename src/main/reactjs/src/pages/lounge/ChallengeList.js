import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns'
import ko from 'date-fns/locale/ko';
import styles from './ChallengeList.module.css';

const ChallengeList = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [challenges, setChallenges] = useState();
  const [likeList, setLikeList] = useState([]);

  const handleLike = (challengeId, isLiked) => {
    // 로그인한 상태에서만
    if(user){
      if(isLiked){
        // 좋아요 눌린 상태: delete
        axios.delete(`/challenge/like/delete`, {
          data: {
            challenge_id: challengeId,
            user_id: user.id
          }
        })
        .then(res => {
          console.log(res.data);
          // setIsLiked(false);
          // 좋아요 목록에서 삭제
          // setLikeList(likeList.filter(id => id != challengeId));
          getLikeList();
        })
        .catch(err => console.log(err));
      }
      else{
        // 좋아요 안눌린 상태: insert
        axios.post(`/challenge/like/insert`, {
          challenge_id: challengeId,
          user_id: user.id
        })
        .then(res => {
          console.log(res.data);
          // setIsLiked(true);
          // likeList.push(challengeId);
          getLikeList();
        }).catch(err => console.log(err));
      }
    }
  }

  const getLikeList = () => {
    axios.get(`/challenge/like/list/${user.id}`)
    .then(res => {
      console.log(res.data);
      setLikeList(res.data);
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    axios.get("/challenge/list")
    .then(res => {
      console.log(res.data);
      setChallenges(res.data);
    }).catch(err => console.log(err));

    // 로그인한 상태에서만
    if(user){
      // axios.get(`/challenge/like/list/${user.id}`)
      // .then(res => {
      //   console.log(res.data);
      //   setLikeList(res.data);
      // }).catch(err => console.log(err));
      getLikeList();
    }
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.maintitle}>Lounge</div>

      <div className={styles.subtitle_box}>
        <span className={styles.subtitle}>진행중인 챌린지</span>
        <span className={`material-icons ${styles.add_btn}`} onClick={() => navigate('/lounge/new')}>add</span>
      </div>
      

      {
        challenges && challenges.map((challenge, index) => (
          <div key={index} className={styles.box}>
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
        ))
      }
    </div>
  );
};

export default ChallengeList;