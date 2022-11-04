import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns'
import ko from 'date-fns/locale/ko';
import styles from './Challenge.module.css';
import Comment from './Comment';
import { MenuTitle } from '../../components';
import { ChallengeMenu } from '.';

const Challenge = () => {
  const navigate = useNavigate();
  const {challengeId} = useParams();
  const [challenge, setChallenge] = useState({});
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isJoined, setIsJoined] = useState();
  const [isLiked, setIsLiked] = useState();

  const [comment, setComment] = useState();
  const [commentList, setCommentList] = useState();

  const joinUser = () => {
    axios.get(`/challenge/join/${challengeId}/${user.id}`)
    .then(res => {
      // 챌린지에 참여 중인 유저 정보 다시 받아오기
      setUsers(res.data);
      setIsJoined(true);
    }).catch(err => console.log(err));
  }

  const unjoinUser = () => {
    axios.get(`/challenge/unjoin/${challengeId}/${user.id}`)
    .then(res => {
      // 챌린지에 참여 중인 유저 정보 다시 받아오기
      setUsers(res.data);
      setIsJoined(false);
    }).catch(err => console.log(err));
  }

  const handleLike = () => {
    if(isLiked){
      // 좋아요 눌린 상태: delete
      axios.delete(`/challenge/like/delete`, {
        data: {
          challenge_id: challengeId,
          user_id: user.id
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
        user_id: user.id
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
      user_id: user.id,
      content: comment
    })
    .then(res => {
      console.log(res.data);
      setCommentList(res.data);
    }).catch(err => console.log(err));
  }

  const deleteComment = () => {
    axios.delete(`/challenge/comment/delete`, {data: comment})
    .then(res => {
      setCommentList(res.data);
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
    axios.get(`/challenge/joined/${challengeId}/${user.id}`)
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
      setCommentList(res.data);
    }).catch(err => console.log(err));

    // 좋아요 여부
    axios.get(`/challenge/like/${challengeId}/${user.id}`)
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
      <div className={styles.menu_title}>
        <span className={`material-icons ${styles.left_icon}`} onClick={() => navigate(-1)}>arrow_back_ios</span>
        <div className={styles.title}>챌린지</div>
        {
          // 개설한 유저에게만 보이는 메뉴
          challenge.leader_id == user.id ? 
          <ChallengeMenu challenge={challenge} user={user}/> :
          <button className={styles.hidden}></button>
        }
      </div>
      {/* <MenuTitle title={"챌린지"} leftIcon={"arrow_back_ios"} history={"lounge"} visible={false} /> */}

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

      {/* 리더 프로필 */}
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
        <span className={`material-icons ${styles.icon} ${styles.place_icon}`}>place</span>
        <span>
          {
            challenge.area ? challenge.area : "온라인"
          }
        </span>
        &nbsp;・&nbsp;
        <span className={`material-icons ${styles.icon} ${styles.place_icon}`} style={{marginRight: '3px'}}>event</span>
        <span>{challenge.planned_at && format(new Date(challenge.planned_at), "MM.dd(eee) a hh:mm", {locale: ko})}</span>
        &nbsp;・&nbsp;
        <span>
          {
            challenge.age ? `${challenge.age}대` : "연령 무관"
          }
        </span>
        &nbsp;
        <span>
          {
            challenge.gender == 0 ? "혼성" : challenge.gender == 1 ? "남성" : "여성"
          }
        </span>
      </div>

      {/* 챌린지 내용 */}
      <pre className={styles.content}>{challenge.content}</pre>

      {/* 챌린지에 참여한 유저 목록 */}
      <div className={styles.joined_user}>
        <div className={styles.subtitle_wrap}>
          <span className={styles.subtitle}>참여한 유저</span>

          {/* 챌린지에 참여한 유저수 */}
          <span className={styles.count_wrap}>
            <span className={`material-icons ${styles.icon}`}>group</span>
            <span className={styles.count}>{users.length}/{challenge.limit}명</span>
          </span>
        </div>
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
      </div>

      {/* 댓글 */}
      <div className={styles.comment_list}>
        <div className={styles.subtitle}>
          댓글 {commentList && commentList.length}
        </div>

        <div className={styles.input_wrap}>
          <input type='text' placeholder='댓글 달기...' className={styles.input_comment} value={comment} onChange={(e) => setComment(e.target.value)}/>
          <span className={`material-icons ${styles.comment_btn}`} onClick={insertComment}>reply</span>
        </div>

        {
          commentList && commentList.map((comment, index) => (
            <Comment comment={comment} user={user} setCommentList={setCommentList} key={index}/>
          ))
        }
      </div>
      
      {/* 참여 버튼 */}
      <div className={styles.btn_box}>
        {
          // 챌린지 날짜 지남
          new Date(challenge.planned_at) <= new Date() ? <div className={`${styles.join_btn} ${styles.dark_btn}`}>종료</div> : 
          // 리더일 경우, 인원 안 참
          challenge.leader_id == user.id && users.length < challenge.limit ? <div className={`${styles.join_btn} ${styles.mint_btn}`}>모집중</div> : 
          // 리더일 경우, 인원 참
          challenge.leader_id == user.id && users.length == challenge.limit ? <div className={`${styles.join_btn} ${styles.light_btn}`}>모집완료</div> : 
          // 참여자일 경우, 참여 중
          isJoined ? <div className={`${styles.join_btn} ${styles.click_btn}`} onClick={unjoinUser}>참여중</div> : 
          // 참여자일 경우, 인원 참
          users.length == challenge.limit ? <div className={`${styles.join_btn} ${styles.light_btn}`}>모집완료</div> : 
          // 참여자일 경우, 인원 안 참
          users.length < challenge.limit ? <div className={`${styles.join_btn} ${styles.click_btn}`} onClick={joinUser}>참여하기</div> : 
          <div style={{display: 'none'}}></div>
        }
      </div>
    </div>
  );
};

export default Challenge;