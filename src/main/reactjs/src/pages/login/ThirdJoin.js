import React from 'react';
import styles from './Join.module.css';

const hobbyList = ['러닝', '등산', '산책', '헬스', '수영', '테니스', '배드민턴', '자전거', '요가', '클라이밍', '볼링', '플로깅', '골프', '서핑', '농구', '축구', '보드', '스키'];

const ThirdJoin = ({user, handleChange, setUser, joinUser}) => {
  const handleHobby = (i, selected) => {
    if(selected){
      user.hobbyCodes.delete(i);
      setUser({
        ...user,
        hobbyCodes: new Set(user.hobbyCodes)
      });
    }
    else{
      user.hobbyCodes.add(i);
      setUser({
        ...user,
        hobbyCodes: new Set(user.hobbyCodes)
      });
    }
    console.log(user.hobbyCodes);
  }

  return (
    <div className={styles.third_join_wrap}>
      <div className={styles.wrap}>
        <div className={styles.subtitle}>관심사</div>

        <div className={styles.hobby_btn_wrap}>
          {
            user.hobbyCodes && hobbyList.map((hobby, index) => (
              user.hobbyCodes.has(index + 1) ?
              <div className={`${styles.hobby_btn} ${styles.selected}`} onClick={() => handleHobby(index + 1, true)} key={index + 1}>{hobby}</div> :
              <div className={`${styles.hobby_btn}`} onClick={() => handleHobby(index + 1, false)} key={index + 1}>{hobby}</div>
            ))
          }
        </div>
      </div>

      {
        user.hobbyCodes && user.hobbyCodes.size > 0 ?
        <div className={styles.next_btn_wrap} onClick={() => joinUser()}>
          <span className={styles.next_btn}>가입하기</span>
          <span className={`material-icons ${styles.next_icon}`}>navigate_next</span>
        </div> : ""
      }
    </div>
  );
};

export default ThirdJoin;