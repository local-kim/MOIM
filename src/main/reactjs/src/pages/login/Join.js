import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import styles from './Join.module.css';
import FirstJoin from './FirstJoin';
import SecondJoin from './SecondJoin';
import ThirdJoin from './ThirdJoin';

const Join = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    hobbyCodes: new Set()
  });

  const [usedEmail, setUsedEmail] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;

    setUser({
      ...user,
      [name]: value
    });

    // 이메일 중복체크
    if(name == 'email'){
      axios.post(`/api/user/check-email`, {email: value})
      .then(res => {
        console.log(res.data);
        if(res.data == 1){
          setUsedEmail(true);
        }
        else{
          setUsedEmail(false);
        }
      }).catch(err => console.log(err));
    }

    console.log(user);
  }

  const joinUser = (e) => {
    // e.preventDefault();
    console.log(user)
    
    axios.post('/api/user/join', {
      ...user,
      hobbyCodes: [...user.hobbyCodes]
    })
    .then(res => {
      // console.log('회원가입 성공');
      alert(`회원가입이 완료되었습니다.\n로그인 화면으로 이동합니다.`);
      navigate("/login", {replace: true});
    }).catch(err => console.log(err));
  }

  const [page, setPage] = useState(1);

  return (
    <div className={styles.join_wrap}>
      <div className={styles.title}>COBELL</div>

      { page == 1 ? <FirstJoin user={user} handleChange={handleChange} setPage={setPage} usedEmail={usedEmail} /> : page == 2 ? <SecondJoin user={user} handleChange={handleChange} setPage={setPage} setUser={setUser} /> : <ThirdJoin user={user} handleChange={handleChange} setUser={setUser} joinUser={joinUser} /> }
      
    </div>
  );
};

export default Join;