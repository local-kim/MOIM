import React from 'react';
import styles from './Join.module.css';

const FirstJoin = ({user, handleChange, setPage, usedEmail}) => {
  return (
    <div className={styles.first_join_wrap}>
      <div className={styles.wrap}>
        <div className={styles.subtitle}>닉네임</div>
        <input className={styles.input} type='text' name="nickname" required onChange={handleChange}/>
      </div>
      <div className={styles.wrap}>
        <div className={styles.subtitle}>이메일</div>
        <input className={styles.input} type='email' name='email' required onChange={handleChange} autoComplete="off"/>
        <div className={styles.used_email} style={ !usedEmail ? {'opacity': 0 } : {} }>가입된 이메일입니다.</div>
      </div>
      {/* <span style={{width:'2%',display:'inline-block'}}></span>
      <input type='password' required placeholder="Check password" onChange={onPassChange}/>
      <b style={{marginLeft:'15px',color:'red'}}>{passOk ? 'OK' : ''}</b> */}
      <div className={styles.wrap}>
        <div className={styles.subtitle}>비밀번호</div>
        <input className={styles.input} type='password' name="password" required onChange={handleChange} autoComplete="off" />
      </div>

      {/* 모든 항목이 입력되면 다음 회원가입 페이지로 넘어가는 버튼이 생김 */}
      {
        user.nickname && user.email && !usedEmail && user.password ?
        <div className={styles.next_btn_wrap} onClick={() => setPage(2)}>
          <span className={styles.next_btn}>다음</span>
          <span className={`material-icons ${styles.next_icon}`}>navigate_next</span>
        </div>
        : ""
      }
    </div>
  );
};

export default FirstJoin;