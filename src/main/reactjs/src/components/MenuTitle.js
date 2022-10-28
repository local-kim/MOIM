import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Components.module.css';

const MenuTitle = ({title, leftIcon, rightButton, history, visible, handleSubmit}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.menu_title}>
      <span className={`material-icons ${styles.left_icon}`} onClick={() => navigate(-1)}>{leftIcon}</span>
      <div className={styles.title}>{title}</div>
      {
        visible ? <button type="submit" className={styles.submit_btn} onClick={handleSubmit}>{rightButton}</button> : <button className={styles.hidden}></button>
      }
      
    </div>
  );
};

export default MenuTitle;