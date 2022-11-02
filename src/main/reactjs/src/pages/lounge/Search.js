import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChallengeItem } from '../../components';
import axios from 'axios';
import styles from './Search.module.css';

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [keyword, setKeyword] = useState('');
  const [searchList, setSearchList] = useState([]);

  const [challenges, setChallenges] = useState([]);
  const [likeList, setLikeList] = useState([]);

  const getLikeList = () => {
    axios.get(`/challenge/like/list/${user.id}`)
    .then(res => {
      console.log(res.data);
      setLikeList(res.data);
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    axios.get("/challenge/list")
    .then(res => {
      console.log(res.data);
      setChallenges(res.data);
    }).catch(err => console.log(err));

    getLikeList();
  }, []);

  const handleSearch = () => {
    if(keyword != '')
      setSearchList(challenges.filter(challenge => challenge.title.includes(keyword)));
  }

  return (
    <div>
      {/* 검색창 */}
      <div className={styles.search_bar}>
        <span className={`material-icons ${styles.left_icon}`} onClick={() => navigate(-1)}>arrow_back_ios</span>
        <input type='text' autoFocus onChange={(e) => setKeyword(e.target.value)}/>
        <span className={`material-icons ${styles.search_btn}`} onClick={handleSearch}>search</span>
      </div>

      {/* 결과창 */}
      <div className={styles.list_wrap}>
        {
          searchList.map((challenge, index) => (
            <ChallengeItem key={index} challenge={challenge} getLikeList={getLikeList} likeList={likeList}/>
          ))
        }
      </div>
    </div>
  );
};

export default Search;