import React from 'react';
import styles from './Join.module.css';

const SecondJoin = ({user, handleChange, setUser, joinUser}) => {
  return (
    <div className={styles.second_join_wrap}>
      <div className={styles.box}>
        <div className={styles.subtitle}>성별</div>
        <div className={styles.gender_btn_box}>
          <div className={user.gender == 1 ? `${styles.gender} ${styles.active}` : `${styles.gender}` } onClick={() => {
            setUser({
              ...user,
              gender: 1
            })
          }}>남성</div>
          <div className={user.gender == 2 ? `${styles.gender} ${styles.active}` : `${styles.gender}` } onClick={() => {
            setUser({
              ...user,
              gender: 2
            })
          }}>여성</div>
        </div>
      </div>
      
      <div className={styles.box}>
        <div className={styles.subtitle}>나이</div>
        <div className={styles.input_wrap}>
          <input className={styles.narrow_input} type='number' name="age" required onChange={handleChange}/>
          <span>세</span>
        </div>
      </div>
      
      <div className={styles.box}>
        <div className={styles.subtitle}>키</div>
        <div className={styles.input_wrap}>
          <input className={styles.narrow_input} type='number' name="height" required onChange={handleChange}/>
          <span>cm</span>
        </div>
      </div>

      <div className={styles.box}>
        <div className={styles.subtitle}>몸무게</div>
        <div className={styles.input_wrap}>
          <input className={styles.narrow_input} type='number' name="weight" required onChange={handleChange}/>
          <span>kg</span>
        </div>
      </div>

      {
        user.gender && user.age && user.height && user.weight ?
        <div className={styles.next_btn_wrap} onClick={() => joinUser()}>
          <span className={styles.next_btn}>가입하기</span>
          <span className={`material-icons ${styles.next_icon}`}>navigate_next</span>
        </div> : ""
      }

      {/* <label>
        <input type='radio' name="goal" value='0' required onChange={handleChange}/>다이어트
      </label>
      <label>
        <input type='radio' name="goal" value='1' required onChange={handleChange}/>근력증가
      </label>
      <label>
        <input type='radio' name="goal" value='2' required onChange={handleChange}/>기타
      </label> */}
    </div>
  );
};

export default SecondJoin;