import React from 'react';
import styles from './Comment.module.css';

const CommentInput = ({comment, setComment, insertComment}) => {
  return (
    <div className={styles.input_wrap}>
      <input type='text' placeholder='댓글 달기...' className={styles.input_comment} value={comment} onChange={(e) => setComment(e.target.value)}/>
      <span className={`material-icons ${styles.comment_btn}`} onClick={insertComment}>reply</span>
    </div>
  );
};

export default CommentInput;