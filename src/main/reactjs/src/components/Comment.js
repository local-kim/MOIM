import React from 'react';
import { format } from 'date-fns';
import ko from 'date-fns/locale/ko';
import axios from 'axios';
import styles from './Comment.module.css';
import { useNavigate } from 'react-router-dom';

const Comment = ({comment, setCommentList, user, deleteComment}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.comment_wrap}>
      <div className={styles.comment}>
        {
          comment.photo ? 
          <img src={`/resources/user_photo/${comment.photo}`} className={styles.photo} alt="" onClick={() => navigate(`/user/${comment.user_id}`)} /> :
          <div className={styles.no_photo} onClick={() => navigate(`/user/${comment.user_id}`)}>
            <span className={`material-icons ${styles.no_photo_icon}`}>person</span>
          </div>
        }

        <div className={styles.content_wrap}>
          <div style={{display: 'flex'}}>
            <div className={styles.nickname} onClick={() => navigate(`/user/${comment.user_id}`)}>{comment.nickname}</div>
            <div className={styles.date}>
              {comment.created_at && format(new Date(comment.created_at), "MM/dd HH:mm", {locale: ko})}
            </div>
          </div>
          <div className={styles.content}>{comment.content}</div>
        </div>
      </div>

      {
        comment.user_id == user.id &&
        <span className={`material-icons ${styles.delete_btn}`} onClick={() => deleteComment(comment)}>clear</span>
      }
    </div>
  );
};

export default Comment;