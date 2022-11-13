import React from 'react';
import { format } from 'date-fns';
import ko from 'date-fns/locale/ko';
import axios from 'axios';
import styles from './Comment.module.css';

const Comment = ({comment, setCommentList, user}) => {
  const deleteComment = () => {
    if(window.confirm("댓글을 삭제하시겠습니까?")){
      axios.delete(`/api/challenge/comment/delete`, {data: comment})
      .then(res => {
        setCommentList(res.data);
      }).catch(err => console.log(err));
    }
  }

  return (
    <div className={styles.comment_wrap}>
      <div className={styles.comment}>
        {
          comment.photo ? 
          <img src={`/resources/user_photo/${comment.photo}`} className={styles.photo} alt="" /> :
          <div className={styles.no_photo}>
            <span className={`material-icons ${styles.no_photo_icon}`}>person</span>
          </div>
        }

        <div className={styles.content_wrap}>
          <div style={{display: 'flex'}}>
            <div className={styles.nickname}>{comment.nickname}</div>
            <div className={styles.date}>
              {comment.created_at && format(new Date(comment.created_at), "MM/dd HH:mm", {locale: ko})}
            </div>
          </div>
          <div className={styles.content}>{comment.content}</div>
        </div>
      </div>

      {
        comment.user_id == user.id &&
        <span className={`material-icons ${styles.delete_btn}`} onClick={deleteComment}>clear</span>
      }
    </div>
  );
};

export default Comment;