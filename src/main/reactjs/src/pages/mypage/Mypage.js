import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Mypage.module.css';

const Mypage = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [created, setCreated] = useState([]);

  useEffect(() => {
    axios.get(`/mypage/created/${user.id}`)
    .then(res => {
      console.log(res.data);
      setCreated(res.data);
    }).catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>마이페이지</h1>

      <div className={styles.nickname}>{user.nickname}</div>
      <div>자기소개</div>
      
      <hr/>
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
        내가 참여한 챌린지(진행중, 완료)
      </div>
      <hr/>
      <div className={styles.subtitle}>
        좋아요 누른 챌린지
      </div>
    </div>
  );
};

export default Mypage;