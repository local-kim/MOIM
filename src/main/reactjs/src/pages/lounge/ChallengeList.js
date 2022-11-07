import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns'
import ko from 'date-fns/locale/ko';
import styles from './ChallengeList.module.css';
import { ChallengeItem } from '../../components';

const ChallengeList = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [challenges, setChallenges] = useState();
  const [likeList, setLikeList] = useState([]);

  const getLikeList = () => {
    axios.get(`/challenge/like/list/${user.id}`)
    .then(res => {
      // console.log(res.data);
      setLikeList(res.data);
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    axios.get("/challenge/list")
    .then(res => {
      // console.log(res.data);
      setChallenges(res.data);
    }).catch(err => console.log(err));

    getLikeList();
  }, []);

  return (
    <div>
      { !user && <Navigate to="/login" replace={true} /> }
      { user && 
        <div className={styles.wrap}>
          {/* 메뉴 타이틀 */}
          <div className={styles.maintitle_box}>
            <div className={styles.maintitle}>Lounge</div>
            <div className={styles.btn_wrap}>
              <span className={`material-icons ${styles.liked_btn}`} onClick={() => navigate('/lounge/like')}>favorite_border</span>
              <span className={`material-icons ${styles.add_btn}`} onClick={() => navigate('/lounge/new')}>add</span>
              <span className={`material-icons ${styles.search_btn}`} onClick={() => navigate('/lounge/search'
              // , {state: {
              //   challenges, likeList
              //   // , getLikeList
              //   // challenges: challenges,
              //   // likeList: likeList,
              //   // getLikeList: getLikeList
              // }}
              )}>search</span>
            </div>
          </div>
          
          <div className={styles.subtitle_box}>
            <span className={styles.subtitle}>진행중인 챌린지</span>
          </div>
          
          {
            challenges && challenges.map((challenge, index) => (
              <ChallengeItem key={index} challenge={challenge} getLikeList={getLikeList} likeList={likeList}/>
            ))
          }
        </div>
      }
    </div>
  );
};

export default ChallengeList;