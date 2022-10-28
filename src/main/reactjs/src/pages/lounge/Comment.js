import { format } from 'date-fns';
import ko from 'date-fns/locale/ko';
import React from 'react';
import styles from './Challenge.module.css';

const Comment = ({index, comment}) => {
  const user = null;

  return (
    <div className={styles.comment}>
      {
        user && user.photo ? 
        <img src={`/resources/user_photo/${user.photo}`} className={styles.photo} alt="" /> :
        <div className={styles.no_photo}>
          <span className={`material-icons ${styles.no_photo_icon}`}>person</span>
        </div>
      }
      <div className={styles.content_wrap}>
        <div>
          <span className={styles.nickname}>닉네임</span>
          <span className={styles.date}>
            {comment.created_at && format(new Date(comment.created_at), "MM/dd HH:mm", {locale: ko})}
          </span>
        </div>
        <div>{comment.content}</div>
      </div>
    </div>
  );
};

export default Comment;