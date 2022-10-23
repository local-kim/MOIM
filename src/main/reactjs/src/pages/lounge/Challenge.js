import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './Challenge.module.css';

const Challenge = () => {
  const {challengeId} = useParams();
  const [challenge, setChallenge] = useState({});
  const [users, setUsers] = useState([]);
  const loggedId = JSON.parse(localStorage.getItem("user")).id;
  const [isJoined, setIsJoined] = useState();

  const [comment, setComment] = useState();

  const joinUser = () => {
    axios.get(`/challenge/join/${challengeId}/${loggedId}`)
    .then(res => {
      // 챌린지에 참여 중인 유저 정보 다시 받아오기
      setUsers(res.data);
    }).catch(err => console.log(err));
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
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    // 챌린지 정보
    axios.get(`/challenge/${challengeId}`)
    .then(res => {
      console.log(res.data);
      setChallenge(res.data);
    }).catch(err => console.log(err));

    // 챌린지에 참여 중인 유저 정보
    axios.get(`/challenge/users/${challengeId}`)
    .then(res => {
      console.log(res.data);
      setUsers(res.data);
    }).catch(err => console.log(err));

    // 로그인한 유저의 챌린지 참여 여부 -> 유저 리스트에 있는지?
    axios.get(`/challenge/joined/${challengeId}/${loggedId}`)
    .then(res => {
      console.log(res.data);
      if(res.data == 0)
        setIsJoined(false);
      else
        setIsJoined(true);
    }).catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>챌린지 상세</h1>
      <div className={styles.photo}>사진</div>
      <div className={styles.title}>{challenge.title}</div>
      <div>클럽장 {users[0] && users[0].nickname}</div>
      <div>
        <span className={`material-icons ${styles.icon}`}>group</span>
        {/* 챌린지에 참여한 유저수 */}
        {users.length}/{challenge.limit}명
      </div>
      <hr/>
      <div className={styles.subtitle}>클럽 소개</div>
      <div><pre>{challenge.content}</pre></div>
      {/* 챌린지에 참여한 유저 목록 */}
      <hr/>
      <div className={styles.subtitle}>가입 멤버</div>
      {
        users && users.map((user, index) => (
          <div key={index}>
            {index == 0 && '*'}
            {user.nickname}
          </div>
        ))
      }
      <hr/>
      {
        users.length == challenge.limit && !isJoined && <button type='button'>모집완료</button>
      }
      {
        users.length == challenge.limit && isJoined && <button type='button'>참여중</button>
      }
      {
        users.length < challenge.limit && !isJoined && <button type='button' onClick={joinUser}>참여하기</button>
      }
      {
        users.length < challenge.limit && isJoined && <button type='button'>참여중</button>
      }
      <hr/>
      <div className={styles.subtitle}>
        댓글 
      </div>
      <input type='text' value={comment} onChange={(e) => setComment(e.target.value)}/>
      <button type='button' onClick={insertComment}>등록</button>
    </div>
  );
};

export default Challenge;