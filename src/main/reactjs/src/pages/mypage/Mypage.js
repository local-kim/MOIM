import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Mypage.module.css';
import { useNavigate } from 'react-router-dom';

const Mypage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [created, setCreated] = useState([]);
  const [joined, setJoined] = useState([]);
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    if(user){
      axios.get(`/mypage/created/${user.id}`)
      .then(res => {
        console.log(res.data);
        setCreated(res.data);
      }).catch(err => console.log(err));

      axios.get(`/mypage/joined/${user.id}`)
      .then(res => {
        console.log(res.data);
        setJoined(res.data);
      }).catch(err => console.log(err));

      axios.get(`/mypage/liked/${user.id}`)
      .then(res => {
        console.log(res.data);
        setLiked(res.data);
      }).catch(err => console.log(err));
    }
  }, []);

  return (
    <div className={styles.wrap}>
      {
        user &&
        <div>
          <div className={styles.profile_box}>
          {
            user.photo ? 
            <img src={`/resources/user_photo/${user.photo}`} className={styles.photo} alt="프로필 사진" /> :
            <div className={styles.no_photo}>
              <span className={`material-icons ${styles.no_photo_icon}`}>person</span>
            </div>
          }
          
          <div className={styles.info_box}>
            <div className={styles.nickname_wrap}>
              <span className={styles.nickname}>{user.nickname}</span>
              <span className={`material-icons ${styles.edit_btn}`} onClick={() => navigate('/profile/edit')}>edit</span>
            </div>
            <pre className={styles.bio}>
              {user.bio}
            </pre>
          </div>
        </div>
        
        {/* <hr/> */}
        <div className={styles.subtitle}>
          내가 만든 챌린지
        </div>
        <div>
          {
            created && created.map((challenge, index) => (
              <div key={index}>
                {challenge.title}
              </div>
            ))
          }
        </div>
        <hr/>
        <div className={styles.subtitle}>
          내가 참여한 챌린지(진행중+완료)
        </div>
        <div>
          {
            joined && joined.map((challenge, index) => (
              <div key={index}>
                {challenge.title}
              </div>
            ))
          }
        </div>
        </div>
      }
      {
        !user &&
        <div>
          <button type='button' className={`btn btn-primary`} onClick={() => navigate('/login')}>로그인</button>
          <button type='button' className={`btn btn-secondary`} onClick={() => navigate('/join')}>회원가입</button>
        </div>
      }
    </div>
  );
};

export default Mypage;