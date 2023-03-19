import React from 'react';
import styles from './ChallengeList.module.css';

const categoryList = ['러닝', '등산', '산책', '헬스', '수영', '테니스', '배드민턴', '자전거', '요가', '클라이밍', '볼링', '플로깅', '골프', '서핑', '농구', '축구', '보드'];

const Category = ({categoryCode, setCategoryCode}) => {

  const handleCategory = (code, selected) => {
    if(selected){
      setCategoryCode(0);
    }
    else{
      setCategoryCode(code);
    }
  }

  return (
    <div className={styles.category_btn_wrap}>
      {
        categoryList.map((category, index) => (
          categoryCode == index + 1 ? 
          <div className={`${styles.category_btn} ${styles.selected}`} onClick={() => handleCategory(index + 1, true)} key={index + 1}>{category}</div> : 
          <div className={styles.category_btn} onClick={() => handleCategory(index + 1, false)} key={index + 1}>{category}</div>
        ))
      }
    </div>
  );
};

export default Category;