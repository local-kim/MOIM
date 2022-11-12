import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './feed.module.css';
import { WriterMenu } from '../../components';

const FeedDetail = () => {
  const {feedId} = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [feed, setFeed] = useState({});
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    axios.get(`/feed/${feedId}`)
    .then(res => {
      console.log(res.data);
      setFeed(res.data);
    }).catch(err => console.log(err));
  }, []);

  const deleteFeed = () => {

  }

  const handleLike = () => {

  }

  return (
    <div className={styles.feed_detail}>
      <div className={styles.menu_title}>
        <span className={`material-icons ${styles.left_icon}`} onClick={() => navigate(-1)}>arrow_back_ios</span>
        <div className={styles.title}>피드</div>
        {
          // 개설한 유저에게만 보이는 메뉴
          feed.user_id == user.id ? 
          <WriterMenu handleDelete={deleteFeed} /> :
          <button className={styles.hidden}></button>
        }
      </div>

      <div className={styles.wrap}>
        {/* <img src={`/resources/user_photo/${feed.user_photo}`} className={styles.user_photo} alt=''/> */}
        <div className={styles.user_wrap}>
          {
            feed.user_photo && feed.user_photo ? 
            <img src={`/resources/user_photo/${feed.user_photo}`} className={styles.user_photo} alt="" /> :
            <div className={styles.no_photo}>
              <span className={`material-icons ${styles.no_photo_icon}`}>person</span>
            </div>
          }
          <div className={styles.user_name}>{feed.user_name}</div>
        </div>

        {
          feed.file_names && <img src={`/resources/feed_photo/${feed.file_names[0]}`} className={styles.photo} alt=''/>
        }

        <div className={styles.content_wrap}>
          {/* <div className={styles.btn_wrap}>
            {
              isLiked ? 
              <span className={`material-icons ${styles.like_on}`} onClick={handleLike}>favorite</span> : 
              <span className={`material-icons ${styles.like_off}`} onClick={handleLike}>favorite_border</span>
            }
          </div> */}

          <div className={styles.content}>{feed.content}</div>

          <div className={styles.tag_wrap}>
            {
              feed.tags && feed.tags.map(tag => <div className={styles.tag}>{tag}</div>)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedDetail;