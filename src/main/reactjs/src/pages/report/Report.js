import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Report.module.css';
import axios from 'axios';
import { format } from 'date-fns'
import ko from 'date-fns/locale/ko';

const Report = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("user") ? true : false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [bmi, setBmi] = useState();
  const [weights, setWeights] = useState();

  const [newWeight, setNewWeight] = useState();

  const addWeight = () => {
    setNewWeight('');

    axios.post(`/user/weight/new`, {
      weight: newWeight,
      user_id: user.id
    })
    .then(res => {
      console.log(res.data);
      setWeights(res.data);
    })
  }

  useEffect(() => {
    if(loggedIn){
      axios.get(`/user/weight/${user.id}`)
      .then(res => {
        console.log(res.data);
        setWeights(res.data);
        setBmi((res.data[res.data.length - 1].weight / ((user.height / 100) * (user.height / 100))).toFixed(2));
      }).catch(err => console.log(err));
    }
    
  }, []);

  return (
    <div>
      <h1>메인 페이지</h1>
      {
        loggedIn && <button type='button' onClick={() => {
          localStorage.removeItem("user");
          setLoggedIn(false);
        }}>로그아웃</button>
      }
      {
        !loggedIn && 
        <div>
          <button type='button' onClick={() => navigate('/login')}>로그인</button>
          <button type='button' onClick={() => navigate('/join')}>회원가입</button>
        </div>
      }

      <button type='button' onClick={() => navigate('/lounge')}>라운지(챌린지 목록)</button>

      <button type='button' onClick={() => navigate('/mypage')}>마이페이지</button>

      <hr/>
      
      {
        loggedIn && 
        <div>
          <div className={styles.subtitle}>내 BMI</div>
          <div>{weights && weights[weights.length - 1].weight}kg</div>
          <div>{user.height}cm</div>
          <div>{bmi} BMI</div>
          {
            bmi <= 18.5 ? (
              <div>저체중</div>
            ) : bmi <= 22.9 ? (
              <div>정상</div>
            ) : bmi <= 24.9 ? (
              <div>과체중</div>
            ) : (
              <div>비만</div>
            )
          }
          <hr/>
          <div className={styles.subtitle}>몸무게 변화</div>
          {
            weights && weights.map((weight, index) => (
              <div key={index}>
                <span>{weight.weight}kg</span>
                (
                <span>{format(new Date(weight.created_at), "MM/dd HH:mm", {locale: ko})}</span>
                )
              </div>
            ))
          }
          <input type='number' value={newWeight} onChange={(e) => setNewWeight(e.target.value)}/>
          <button type='button' onClick={addWeight}>몸무게 추가</button>
        </div>
      }
      
    </div>
  );
};

export default Report;