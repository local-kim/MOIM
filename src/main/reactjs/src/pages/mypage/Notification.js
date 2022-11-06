import React, { useEffect, useState } from 'react';
import { MenuTitle } from '../../components';
import axios from 'axios';
import styles from './Profile.module.css';
import NotificationItem from './NotificationItem';

const Notification = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [notis, setNotis] = useState([]);

  useEffect(() => {
    axios.get(`/noti/${user.id}`)
    .then(res => {
      console.log(res.data);
      setNotis(res.data);
    }).catch(err => console.log(err));
  }, []);

  return (
    <div>
      <MenuTitle title={"알림"} leftIcon={"arrow_back_ios"} visible={false}/>

      <div className={styles.noti_list}>
        {
          notis && notis.map(noti => (
            <NotificationItem noti={noti}/>
          ))
        }
      </div>
    </div>
  );
};

export default Notification;