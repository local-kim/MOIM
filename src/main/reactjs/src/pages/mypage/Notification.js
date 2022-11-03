import React from 'react';
import { MenuTitle } from '../../components';
import styles from './Profile.module.css';

const Notification = () => {
  return (
    <div>
      <MenuTitle title={"알림"} leftIcon={"arrow_back_ios"} visible={false}/>
    </div>
  );
};

export default Notification;