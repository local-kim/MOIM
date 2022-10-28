import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns'
import ko from 'date-fns/locale/ko';
import styles from './Challenge.module.css';
import Comment from './Comment';
import { MenuTitle } from '../../components';

const Challenge = () => {
  const navigate = useNavigate();
  const {challengeId} = useParams();
  const [challenge, setChallenge] = useState({});
  const [users, setUsers] = useState([]);
  const loggedId = JSON.parse(localStorage.getItem("user")).id;
  const [isJoined, setIsJoined] = useState();
  const [isLiked, setIsLiked] = useState();

  const [comment, setComment] = useState();
  const [commentList, setCommmentList] = useState();

  const joinUser = () => {
    axios.get(`/challenge/join/${challengeId}/${loggedId}`)
    .then(res => {
      // 챌린지에 참여 중인 유저 정보 다시 받아오기
      setUsers(res.data);
      isJoined(true);
    }).catch(err => console.log(err));
  }

  const handleLike = () => {
    if(isLiked){
      // 좋아요 눌린 상태: delete
      axios.delete(`/challenge/like/delete`, {
        data: {
          challenge_id: challengeId,
          user_id: loggedId
        }
      })
      .then(res => {
        console.log(res.data);
        setIsLiked(false);
      })
      .catch(err => console.log(err));
    }
    else{
      // 좋아요 안눌린 상태: insert
      axios.post(`/challenge/like/insert`, {
        challenge_id: challengeId,
        user_id: loggedId
      })
      .then(res => {
        console.log(res.data);
        setIsLiked(true);
      }).catch(err => console.log(err));
    }
  }

  const insertComment = () => {
    setComment('');
    axios.post(`/challenge/comment/new`, {
      challenge_id: challengeId,
      user_id: loggedId,
      content: comment
    })
    .then(res => {
      console.log(res.data);
      setCommmentList(res.data);
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    // 챌린지 정보
    axios.get(`/challenge/${challengeId}`)
    .then(res => {
      console.log(res.data);
      setChallenge(res.data);
    }).catch(err => console.log(err));

    // 챌린지에 참여 중인 유저 리스트
    axios.get(`/challenge/users/${challengeId}`)
    .then(res => {
      console.log(res.data);
      setUsers(res.data);
    }).catch(err => console.log(err));

    // 로그인한 유저의 챌린지 참여 여부
    axios.get(`/challenge/joined/${challengeId}/${loggedId}`)
    .then(res => {
      console.log(res.data);
      if(res.data == 0)
        setIsJoined(false);
      else
        setIsJoined(true);
    }).catch(err => console.log(err));

    // 댓글 리스트
    axios.get(`/challenge/comment/list/${challengeId}`)
    .then(res => {
      console.log(res.data);
      setCommmentList(res.data);
    }).catch(err => console.log(err));

    // 좋아요 여부
    axios.get(`/challenge/like/${challengeId}/${loggedId}`)
    .then(res => {
      console.log(res.data);
      if(res.data == 0)
        setIsLiked(false);
      else
        setIsLiked(true);
    }).catch(err => console.log(err));

  }, []);

  return (
    <div className={styles.wrap}>
      {/* 메뉴 타이틀 */}
      {/* <div className={styles.title_box}>
        <span className={`material-icons ${styles.back_icon}`} onClick={() => navigate('/lounge')}>arrow_back_ios</span>
        <div className={styles.title}>챌린지</div>
        <div style={{width:'24px'}}></div>
      </div> */}
      <MenuTitle title={"챌린지"} leftIcon={"arrow_back_ios"} history={"lounge"} visible={false} />

      {/* 사진 */}
      <div className={styles.challenge_photo} style={{
        backgroundImage:`url(/resources/challenge_photo/${challenge.photo})`
      }}>
        {
          isLiked ? 
          <span className={`material-icons ${styles.like_on}`} onClick={handleLike}>favorite</span> : 
          <span className={`material-icons ${styles.like_off}`} onClick={handleLike}>favorite_border</span>
        }
        <div className={styles.challenge_title}>{challenge.title}</div>
      </div>

      <div className={styles.profile_wrap}>
        {
          users[0] && users[0].photo ? 
          <img src={`/resources/user_photo/${users[0].photo}`} className={styles.photo} alt="" /> :
          <div className={styles.no_photo}>
            <span className={`material-icons ${styles.no_photo_icon}`}>person</span>
          </div>
        }
        <div className={styles.nickname}>{users[0] && users[0].nickname}</div>
      </div>

      <div className={styles.info_wrap}>
        <span className={`material-icons ${styles.icon} ${styles.place_icon}`}>event</span>
        <span>{challenge.planned_at && format(new Date(challenge.planned_at), "MM.dd(eee) a hh:mm", {locale: ko})}</span>
        &nbsp;・&nbsp;
        <span className={`material-icons ${styles.icon} ${styles.place_icon}`}>place</span>
        <span>{challenge.area}</span>
        &nbsp;・&nbsp;
        <span className={`material-icons ${styles.icon}`}>group</span>
        {/* 챌린지에 참여한 유저수 */}
        <span>{users.length}/{challenge.limit}명</span>
        &nbsp;・&nbsp;
        <span>{challenge.age}대</span>
      </div>

      {/* 챌린지 내용 */}
      <pre className={styles.content}>{challenge.content}</pre>

      {/* 챌린지에 참여한 유저 목록 */}
      <div className={styles.users_wrap}>
        {
          users && users.map((user, index) => (
            <div key={index} className={styles.user}>
              {
                user && user.photo ? 
                <img src={`/resources/user_photo/${user.photo}`} className={styles.photo} alt="" /> :
                <div className={styles.no_photo}>
                  <span className={`material-icons ${styles.no_photo_icon}`}>person</span>
                </div>
              }
              {/* <img src={`/resources/user_photo/${user.photo}`} className={styles.photo} alt="" /> */}
              {/* {index == 0 && <span>*</span>} */}
              <span className={styles.nickname}>{user.nickname}</span>
            </div>
          ))
        }
      </div>

      {/* 댓글 */}
      <div className={styles.comment_wrap}>
        <div className={styles.subtitle}>
          댓글 {commentList && commentList.length}
        </div>

        <div className={styles.input_wrap}>
          <input type='text' placeholder='댓글 달기...' className={styles.input_comment} value={comment} onChange={(e) => setComment(e.target.value)}/>
          <button type='button' className={styles.comment_btn} onClick={insertComment}>+</button>
        </div>

        {
          commentList && commentList.map((comment, index) => (
            <Comment comment={comment} key={index}/>
          ))
        }
      </div>
      
      {/* 참여 버튼 */}
      <div className={styles.btn_box}>
        {
          users.length == challenge.limit && !isJoined && <button type='button' className={`${styles.join_btn} ${styles.gray_btn}`}>모집완료</button>
        }
        {
          users.length == challenge.limit && isJoined && <button type='button' className={`${styles.join_btn} ${styles.gray_btn}`}>참여중</button>
        }
        {
          users.length < challenge.limit && !isJoined && <button type='button' className={`${styles.join_btn} ${styles.green_btn}`} onClick={joinUser}>참여하기</button>
        }
        {
          users.length < challenge.limit && isJoined && <button type='button' className={`${styles.join_btn} ${styles.gray_btn}`}>참여중</button>
        }
      </div>
    </div>
  );
};

export default Challenge;