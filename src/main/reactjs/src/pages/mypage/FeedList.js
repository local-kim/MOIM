import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';

const FeedList = ({feedList}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.feed_wrap}>
      {
        feedList && feedList.map((feed) => (
          // <img src={`/resources/feed_photo/${feed.file_names[0]}`} className={styles.feed_photo} alt=''/>
          <div style={{backgroundImage: `url(/resources/feed_photo/${feed.file_names[0]})`}} className={styles.feed_photo} onClick={() => navigate(`/feed/${feed.id}`)}>
            <div className={styles.feed_photo_inner}></div>
          </div>
        ))
      }
    </div>
  );
};

export default FeedList;