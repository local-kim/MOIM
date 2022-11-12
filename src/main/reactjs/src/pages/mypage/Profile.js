import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Profile.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CreatedChallenge from './CreatedChallenge';
import JoinedChallenge from './JoinedChallenge';
import FeedList from './FeedList';
// import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// const theme = createMuiTheme({
//   overrides: {
//     // MuiTabs: {
//     //   indicator: {
//     //     backgroundColor: orange[700]
//     //   }
//     // },
//     MuiTab: {
//       root: {
//         "&:hover": {
//           // backgroundColor: pink[100],
//           color: '#00ff00'
//         }
//       },
//       selected: {
//         // backgroundColor: orange[100],
//         color: '#ff0000',
//         "&:hover": {
//           // backgroundColor: green[100],
//           color: '#ffff00'
//         }
//       }
//     }
//   }
// });

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [userInfo, setUserInfo] = useState({});
  const [created, setCreated] = useState([]);
  const [joined, setJoined] = useState([]);
  const [feedList, setFeedList] = useState([]);

  // 탭
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    axios.get(`/feed/list/${user.id}`)
    .then(res => {
      console.log(res.data);
      setFeedList(res.data);
    }).catch(err => console.log(err));

    axios.get(`/mypage/user/${user.id}`)
    .then(res => {
      // console.log(res.data);
      setUserInfo(res.data);
    }).catch(err => console.log(err));

    axios.get(`/mypage/created/${user.id}`)
    .then(res => {
      // console.log(res.data);
      setCreated(res.data);
    }).catch(err => console.log(err));

    axios.get(`/mypage/joined/${user.id}`)
    .then(res => {
      // console.log(res.data);
      setJoined(res.data);
    }).catch(err => console.log(err));
  }, []);

  return (
    <div>
      { !user && <Navigate to="/login" replace={true} /> }
      { user &&
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
                <span className={styles.nickname}>{user.nickname}</span>
                {/* <span className={`material-icons ${styles.edit_btn}`} onClick={() => navigate('/profile/edit')}>edit</span> */}
                <span className={`material-icons ${styles.edit_btn}`} onClick={() => navigate('/profile/edit')}>settings</span>
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
            <span className={`material-icons-outlined ${styles.add_btn}`} onClick={() => navigate('/feed/new')}>add_box</span>
            <span className={`material-icons-outlined ${styles.noti_btn}`} onClick={() => navigate('/notification')}>notifications</span>
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
      }
    </div>
  );
};

export default Profile;