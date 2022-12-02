import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ChallengeList.module.css';
import axios from 'axios';
import { MenuTitle, LikeItem } from '../../components';

const Liked = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [liked, setLiked] = useState();
  const [likeList, setLikeList] = useState([]);

  useEffect(() => {
    if(user){
      axios.get(`/api/mypage/liked/${user.id}`)
      .then(res => {
        // console.log(res.data);
        setLiked(res.data);
        setLikeList(res.data.map(c => c.id));
      }).catch(err => console.log(err));
    }
  }, []);

  return (
    <div>
      {/* 상단 메뉴 타이틀 */}
      <MenuTitle title={"저장한 챌린지"} leftIcon={"arrow_back_ios"} rightButton={""} history={"lounge"}/>

      {/* 좋아요 목록 */}
      {
        liked && liked.length == 0 ? <div className={styles.no_result}>저장한 챌린지가 없습니다.</div> :
        <div className={styles.liked_wrap}>
          {
            liked && liked.map((challenge, index) => (
              <LikeItem key={index} challenge={challenge} likeList={likeList} setLikeList={setLikeList} />
            ))
          }
        </div>
      }
      
    </div>
  );
};

export default Liked;