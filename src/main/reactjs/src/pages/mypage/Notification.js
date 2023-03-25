import React, { useEffect, useState } from 'react';
import { MenuTitle } from '../../components';
import axios from 'axios';
import styles from './notification.module.css';
import NotificationItem from './NotificationItem';

const Notification = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [notiList, setNotiList] = useState([]);

  useEffect(() => {
    axios.get(`/api/notis/user/${user.id}`)
    .then(res => {
      // console.log(res.data);
      setNotiList(res.data);
    }).catch(err => console.log(err));
  }, []);

  return (
    <div>
      <MenuTitle title={"알림"} leftIcon={"arrow_back_ios"} visible={false}/>

      {
        notiList && notiList.length > 0 ?
        <div className={styles.noti_list}>
          {
            notiList.map(noti => (
              <NotificationItem noti={noti} setNotiList={setNotiList} key={noti.id}/>
            ))
          }
        </div> :
        <div className={styles.no_content}>받은 알림이 없습니다.</div>
      }
    </div>
  );
};

export default Notification;