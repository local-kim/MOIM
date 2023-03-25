import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './feed.module.css';
import { CommentInput, Comment, WriterMenu } from '../../components';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { format } from 'date-fns';
import ko from 'date-fns/locale/ko';
import relativeTime from '../../utils/relativeTime';

const FeedDetail = () => {
  const {feedId} = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [feed, setFeed] = useState({});
  const [isLiked, setIsLiked] = useState(false);

  const [comment, setComment] = useState();
  const [commentList, setCommentList] = useState();

  useEffect(() => {
    axios.get(`/api/feed/${feedId}`)
    .then(res => {
      console.log(res.data);
      setFeed(res.data);
      setCommentList(res.data.comments);
    }).catch(err => console.log(err));

    // 로그인 유저의 좋아요 누른 여부
    axios.get(`/api/feed/${feedId}/like/${user.id}`)
    .then(res => {
      // console.log(res.data);
      if(res.data == 0)
        setIsLiked(false);
      else
        setIsLiked(true);
    }).catch(err => console.log(err));

    // axios.get(`/api/feed/${feedId}/comments`)
    // .then(res => {
    //   console.log(res.data);
    //   setCommentList(res.data);
    // }).catch(err => console.log(err));
  }, []);

  const deleteFeed = () => {
    if(window.confirm("정말 피드를 삭제하시겠습니까?")){
      axios.delete(`/api/feed/${feed.id}`)
      .then(res => {
        // console.log(res);
        navigate(-1, {replace: true});
      }).catch(err => console.log(err));
    }
  }

  const handleLike = () => {
    if(isLiked){
      axios.delete(`/api/feed/like`, {
        data: {
          feed_id: feedId,
          user_id: user.id
        }
      })
      .then(res => {
        setFeed({
          ...feed,
          likes: res.data
        });
        setIsLiked(false);
      }).catch(err => console.log(err));
    }
    else{
      axios.post(`/api/feed/like`, {
        feed_id: feedId,
        user_id: user.id
      })
      .then(res => {
        setFeed({
          ...feed,
          likes: res.data
        });
        setIsLiked(true);
      }).catch(err => console.log(err));
    }
  }

  const insertComment = () => {
    if(comment && comment != ''){
      setComment('');

      axios.post(`/api/feed/comment`, {
        feed_id: feedId,
        user_id: user.id,
        content: comment
      })
      .then(res => {
        console.log(res.data);
        setCommentList(res.data);
      }).catch(err => console.log(err));
    }
  }

  const copyLink = () => {
    let url = window.document.location.href;

    // 사파리에서 동작 안함
    // navigator.clipboard.writeText(url)
    // .then(() => {
    //   alert("링크를 클립보드에 복사했습니다.");
    // });

    if (navigator.clipboard) {
      // (IE는 사용 못하고, 크롬은 66버전 이상일때 사용 가능합니다.)
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert("링크를 클립보드에 복사했습니다.");
        })
        .catch(() => {
          alert("복사를 다시 시도해주세요.");
        });
    } else {
      if (!document.queryCommandSupported("copy")) {
        return alert("복사하기가 지원되지 않는 브라우저입니다.");
      }

      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.top = 0;
      textarea.style.left = 0;
      textarea.style.position = "fixed";

      document.body.appendChild(textarea);
      // focus() -> 사파리 브라우저 서포팅
      textarea.focus();
      // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      alert("링크를 클립보드에 복사했습니다.");
    }
  }

  const deleteComment = (c) => {
    if(window.confirm("댓글을 삭제하시겠습니까?")){
      axios.delete(`/api/feed/comment`, {data: c})
      .then(res => {
        setCommentList(res.data);
      }).catch(err => console.log(err));
    }
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

          <div>
            <div className={styles.user_name}>{feed.user_name}</div>
            <div className={styles.time}>{feed.created_at && relativeTime(new Date(feed.created_at))}</div>
          </div>
        </div>

        <Carousel showIndicators={feed.file_names && feed.file_names.length > 1 ? true : false} showArrows={false} showStatus={false} showThumbs={false} swipeScrollTolerance={50}>
          {
            feed.file_names && feed.file_names.map((image, idx) => (
              <div key={idx}>
                <img src={`/resources/feed_photo/${image}`} className={styles.photo} alt=''/>
              </div>
            ))
          }
        </Carousel>

        <div className={styles.btn_wrap}>
          <div>
            {
              isLiked ? 
              <span className={`material-icons ${styles.like_on}`} onClick={handleLike}>favorite</span> : 
              <span className={`material-icons ${styles.like_off}`} onClick={handleLike}>favorite_border</span>
            }
            {feed.likes > 0 && <span className={styles.count}>{feed.likes}</span>}

            <span className={`material-icons-outlined ${styles.comment_btn}`}>mode_comment</span>
            {commentList && commentList.length > 0 && <span className={styles.count} style={{marginLeft: '8px'}}>{commentList.length}</span>}
          </div>
          
          <span className={`material-icons-outlined ${styles.share_btn}`} onClick={copyLink}>share</span>
          
        </div>

        {/* <div className={styles.content_wrap}> */}
          {/* {
            feed.likes > 0 && 
            <div className={styles.likes_count}>좋아요 {feed.likes}개</div>
          } */}

          <pre className={styles.content}>{feed.content}</pre>

          {
            feed.tags && feed.tags.length > 0 && 
            <div className={styles.tag_wrap}>
              {
                feed.tags.map((tag, idx) => <div className={styles.tag} key={idx}>{tag}</div>)
              }
            </div>
          }
          
          {
            commentList && commentList.length > 0 && <div className={styles.comment_list}>
              {/* <div className={styles.subtitle}>
                댓글 {commentList && commentList.length}
              </div> */}

              {/* <div className={styles.input_wrap}>
                <input type='text' placeholder='댓글 달기...' className={styles.input_comment} value={comment} onChange={(e) => setComment(e.target.value)}/>
                <span className={`material-icons ${styles.comment_btn}`} onClick={insertComment}>reply</span>
              </div> */}
              
              {
                commentList.map((comment, index) => (
                  <Comment comment={comment} user={user} setCommentList={setCommentList} deleteComment={deleteComment} key={index}/>
                ))
              }
            </div>
          }
        {/* </div> */}

        {/* <CommentInput comment={comment} setComment={setComment} insertComment={insertComment}/> */}
      </div>


      <div className={styles.comment_box}>
        <div className={styles.input_wrap}>
          <input type='text' placeholder='댓글 달기...' className={styles.input_comment} value={comment} onChange={(e) => setComment(e.target.value)}/>
          <span className={`material-icons ${styles.comment_btn}`} onClick={insertComment}>reply</span>
        </div>
      </div>
    </div>
  );
};

export default FeedDetail;