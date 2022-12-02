import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styles from './user.module.css';
import { CreatedChallenge, FeedList, JoinedChallenge } from '../mypage';

const UserProfile = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const {userId} = useParams();

  // 탭
  const [value, setValue] = React.useState(searchParams.get("tab") ? Number(searchParams.get("tab")) : 0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSearchParams({tab: newValue}, {replace: true});
  };

  const [userInfo, setUserInfo] = useState({});
  const [created, setCreated] = useState([]);
  const [joined, setJoined] = useState([]);
  const [feedList, setFeedList] = useState([]);

  useEffect(() => {
    axios.get(`/api/feed/list/${userId}`)
    .then(res => {
      // console.log(res.data);
      setFeedList(res.data);
    }).catch(err => console.log(err));

    axios.get(`/api/mypage/user/${userId}`)
    .then(res => {
      // console.log(res.data);
      setUserInfo(res.data);
    }).catch(err => console.log(err));

    axios.get(`/api/mypage/created/${userId}`)
    .then(res => {
      // console.log(res.data);
      setCreated(res.data);
    }).catch(err => console.log(err));

    axios.get(`/api/mypage/joined/${userId}`)
    .then(res => {
      // console.log(res.data);
      setJoined(res.data);
    }).catch(err => console.log(err));
  }, []);
  
  return (
    <div>
      <div className={styles.menu_title}>
        <span className={`material-icons ${styles.left_icon}`} onClick={() => navigate(-1)}>arrow_back_ios</span>
        <div className={styles.title}>프로필</div>
        <button className={styles.hidden}></button>
      </div>

      <div className={styles.wrap}>
          <div className={styles.profile_box}>
            {
              userInfo.photo ? 
              <img src={`/resources/user_photo/${userInfo.photo}`} className={styles.photo} alt="" /> :
              <div className={styles.no_photo}>
                <span className={`material-icons ${styles.no_photo_icon}`}>person</span>
              </div>
            }
            
            <div className={styles.info_box}>
              <div className={styles.nickname_wrap}>
                <span className={styles.nickname}>{userInfo.nickname}</span>
              </div>
              {
                userInfo.bio &&
                <pre className={styles.bio}>
                  {userInfo.bio}
                </pre>
              }
            </div>
          </div>
          <div className={styles.btn_wrap}>
          </div>
          
          {/* <MuiThemeProvider theme={theme}> */}
          {/* 탭 */}
          <Tabs className={styles.tabs} value={value} onChange={handleChange} variant="fullWidth" TabIndicatorProps={{style: {background: "#86dbcb"}}}>
            <Tab disableFocusRipple={true} disableRipple={true} label={
              <span className={`material-icons ${styles.icon}`} style={{fontSize
              : '22px', marginBottom: '-5px'}}>grid_on</span>
            } />
            <Tab disableFocusRipple={true} disableRipple={true} label={
              // <span className={`material-icons ${styles.icon}`}>menu</span>
              <span className={`material-symbols-outlined ${styles.icon}`}>edit_square</span>
            } />
            <Tab disableFocusRipple={true} disableRipple={true} label={
              <span className={`material-icons ${styles.icon}`}>diversity_3</span>
            } />
          </Tabs>
          {/* </MuiThemeProvider> */}
          {
            value === 0 ? <FeedList feedList={feedList} /> : 
            value === 1 ? <CreatedChallenge created={created} /> : 
            <JoinedChallenge joined={joined} />
          }
        </div>
    </div>
  );
};

export default UserProfile;