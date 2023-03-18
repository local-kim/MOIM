import React from 'react';
import { ChallengeItem, MyChallengeItem } from '../../components';
import styles from './Profile.module.css';

const CreatedChallenge = ({created}) => {
  return (
    <div>
      {/* 내가 만든 챌린지 */}
      {
        created && created.map((challenge, index) => (
          <MyChallengeItem key={index} challenge={challenge}/>
        ))
      }
      {
        created.length == 0 && 
        <div className={styles.no_content}>개설한 챌린지가 없습니다.</div>
      }
    </div>
  );
};

export default CreatedChallenge;