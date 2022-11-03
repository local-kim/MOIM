import React from 'react';
import styles from './Profile.module.css';

const NotificationItem = ({noti}) => {
  return (
    <div className={styles.noti_box}>
      {noti.challenge_title}
    </div>
  );
};

export default NotificationItem;