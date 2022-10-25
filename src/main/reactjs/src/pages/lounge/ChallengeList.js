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

  const handleLike = () => {
    // if(isLiked){
    //   // 좋아요 눌린 상태: delete
    //   axios.delete(`/challenge/like/delete`, {
    //     data: {
    //       challenge_id: challengeId,
    //       user_id: loggedId
    //     }
    //   })
    //   .then(res => {
    //     console.log(res.data);
    //     setIsLiked(false);
    //   })
    //   .catch(err => console.log(err));
    // }
    // else{
    //   // 좋아요 안눌린 상태: insert
    //   axios.post(`/challenge/like/insert`, {
    //     challenge_id: challengeId,
    //     user_id: loggedId
    //   })
    //   .then(res => {
    //     console.log(res.data);
    //     setIsLiked(true);
    //   }).catch(err => console.log(err));
    // }
  }

  useEffect(() => {
    axios.get("/challenge/list")
    .then(res => {
      console.log(res.data);
      setChallenges(res.data);
    }).catch(err => console.log(err));

    // 로그인한 상태에서만
    if(user){
      axios.get(`/challenge/like/list/${user.id}`)
      .then(res => {
        console.log(res.data);
        setLikeList(res.data);
      }).catch(err => console.log(err));
    }
  }, []);

  return (
    <div>
      <h1>챌린지 목록</h1>

      <button type='button' onClick={() => navigate('/lounge/new')}>챌린지 생성</button>

      {
        challenges && challenges.map((challenge, index) => (
          <div key={index} className={styles.box}>
            <div className={styles.photo}>
              {/* 사진 */}
              {
                likeList.includes(challenge.id) ? 
                <span className={`material-icons ${styles.like_on}`} onClick={handleLike}>favorite</span> : 
                <span className={`material-icons ${styles.like_off}`} onClick={handleLike}>favorite_border</span>
              }
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
                <span>&nbsp;&nbsp;&nbsp;</span>
                <span>
                  <span className={`material-icons ${styles.icon}`}>group</span>
                  {/* 참여중인 사람 수 받아오기 */}
                  {challenge.joined_users}/{challenge.limit}
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