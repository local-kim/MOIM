import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';

const FeedList = ({feedList}) => {
  const navigate = useNavigate();

  return (
    <div>
      {
        feedList.length > 0 && 
        <div className={styles.feed_wrap}>
          {
            feedList.map((feed) => (
              // <img src={`/resources/feed_photo/${feed.file_names[0]}`} className={styles.feed_photo} alt=''/>
              <div style={{backgroundImage: `url(/resources/feed_photo/${feed.file_names[0]})`}} className={styles.feed_photo} onClick={() => navigate(`/feed/${feed.id}`)} key={feed.id}>
                <div className={styles.feed_photo_inner}></div>
              </div>
            ))
          }
        </div>
      }
      {
        feedList.length == 0 && 
        <div className={styles.no_content}>작성한 피드가 없습니다.</div>
      }
    </div>
  );
};

export default FeedList;