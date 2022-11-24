import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ChallengeItem } from '../../components';
import axios from 'axios';
import styles from './Search.module.css';

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [keyword, setKeyword] = useState('');
  const [searchList, setSearchList] = useState([]);

  const [challenges, setChallenges] = useState([]);
  const [likeList, setLikeList] = useState([]);

  const getLikeList = () => {
    axios.get(`/api/challenge/like/list/${user.id}`)
    .then(res => {
      // console.log(res.data);
      setLikeList(res.data);
    }).catch(err => console.log(err));
  }

  const handleEnter = (e) => {
    if(e.key === 'Enter')
      handleSearch();
  }

  useEffect(() => {
    axios.get("/api/challenge/list")
    .then(res => {
      // console.log(res.data);
      setChallenges(res.data);

      // if(sessionStorage.getItem("keyword")){
      //   setKeyword(sessionStorage.getItem("keyword"));
      //   setSearchList(res.data.filter(challenge => challenge.title.includes(sessionStorage.getItem("keyword"))));
      // }

      // query string이 있으면
      if(searchParams.get("keyword")){
          setKeyword(searchParams.get("keyword"));
          setSearchList(res.data.filter(challenge => challenge.title.includes(searchParams.get("keyword"))));
      }
    }).catch(err => console.log(err));
    
    getLikeList();
  }, []);

  const handleSearch = () => {
    if(keyword != ''){
      setSearchList(challenges.filter(challenge => challenge.title.includes(keyword)));
      // sessionStorage.setItem("keyword", keyword);
      // sessionStorage.setItem("searchList", challenges.filter(challenge => challenge.title.includes(keyword)));
      // sessionStorage.setItem("likeList", likeList);

      // query string 추가
      setSearchParams({keyword: keyword}, {replace: true});
    }
  }

  return (
    <div>
      {/* 검색창 */}
      <div className={styles.search_bar}>
        <span className={`material-icons ${styles.left_icon}`} onClick={() => navigate('/lounge')}>arrow_back_ios</span>
        <input type='text' autoFocus onChange={(e) => setKeyword(e.target.value)} onKeyUp={handleEnter} defaultValue={keyword}/>
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