import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Profile.module.css';
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CreatedChallenge from './CreatedChallenge';
import JoinedChallenge from './JoinedChallenge';
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
  const [created, setCreated] = useState([]);
  const [joined, setJoined] = useState([]);
  const [liked, setLiked] = useState([]);

  // 탭
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if(user){
      axios.get(`/mypage/created/${user.id}`)
      .then(res => {
        console.log(res.data);
        setCreated(res.data);
      }).catch(err => console.log(err));

      axios.get(`/mypage/joined/${user.id}`)
      .then(res => {
        console.log(res.data);
        setJoined(res.data);
      }).catch(err => console.log(err));

      axios.get(`/mypage/liked/${user.id}`)
      .then(res => {
        console.log(res.data);
        setLiked(res.data);
      }).catch(err => console.log(err));
    }
  }, []);

  return (
    <div className={styles.wrap}>
      {
        user &&
        <div>
          <div className={styles.profile_box}>
            {
              user.photo ? 
              <img src={`/resources/user_photo/${user.photo}`} className={styles.photo} alt="" /> :
              <div className={styles.no_photo}>
                <span className={`material-icons ${styles.no_photo_icon}`}>person</span>
              </div>
            }
            
            <div className={styles.info_box}>
              <div className={styles.nickname_wrap}>
                <span className={styles.nickname}>{user.nickname}</span>
                <span className={`material-icons ${styles.edit_btn}`} onClick={() => navigate('/profile/edit')}>edit</span>
              </div>
              <pre className={styles.bio}>
                {user.bio}
              </pre>
            </div>
          </div>
          
          {/* <MuiThemeProvider theme={theme}> */}
          {/* 탭 */}
          <Tabs className={styles.tabs} value={value} onChange={handleChange} variant="fullWidth" TabIndicatorProps={{style: {background: "#17b285"}}}>
            <Tab label={
              <span className={`material-icons ${styles.icon}`}>menu</span>
            } />
            <Tab label={
              <span className={`material-icons ${styles.icon}`}>notifications</span>
            } />
          </Tabs>
          {/* </MuiThemeProvider> */}
          {
            value === 0 ? <CreatedChallenge created={created} /> : <JoinedChallenge joined={joined} />
          }
        </div>
      }
      {
        !user &&
        <div>
          <button type='button' className={`btn btn-primary`} onClick={() => navigate('/login')}>로그인</button>
          <button type='button' className={`btn btn-secondary`} onClick={() => navigate('/join')}>회원가입</button>
        </div>
      }
    </div>
  );
};

export default Profile;